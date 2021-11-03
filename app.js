
module.exports = {

    /**
     * eachCallback
     * @callback eachCallback
     * @param {*} element - single element of iterable object.
     * @param {number} index - current index.
     * @param {function} next - next() function to execute next element of array.
     */

    /**
     * Async each function
     * @param {(array|Set|Map)} input - Iterable object.
     * @param {eachCallback} cb - Callback which have to be executed if async function is finished.
     * @returns {Promise} Promise
     */

    each(input, cb) {
        return new Promise((resolve, reject) => {
            const next = (input, index) => {
                switch(input.constructor.name) {
                    case "Array":
                        if(!input.length) return reject("undefined length");
                        if(input.length <= 0) return reject("input length < 1");
                        if(index === input.length) return resolve();
                        return cb(input[index], index, () => next(input, index + 1, cb));

                    case "Set":
                        if(!input.size) return reject("undefined length");
                        if(input.size <= 0) return reject("input length < 1");
                        if(index === input.size) return resolve();
                        return cb(Array.from(input)[index], index, () => next(input, index + 1, cb));

                    case "Map":
                        if(!input.size) return reject("undefined length");
                        if(input.size <= 0) return reject("input length < 1");
                        if(index === input.size) return resolve();
                        return cb(Array.from(input)[index], index, () => next(input, index + 1, cb));

                    default:
                        if(!input.length) return reject("undefined iterable type: " + input.constructor.name);
                        if(input.length <= 0) return reject("input length < 1");
                        if(index === input.length) return resolve();
                        return cb(input[index], index, () => next(input, index + 1, cb));
                }
            };

            next(input, 0, cb);
        });
    },

    /**
     * Async until function
     * @param {function} condition - Until will stop if condition returns true.
     * @param {Promise} cb - Async function which will execute.
     * @returns {Promise} Promise
     */

    until(condition, cb) {
        return new Promise((resolve, reject) => {
            if(typeof condition !== "function") return reject("condition has to be a function");
            if(typeof cb !== "function") return reject("callback has to be a function");

            const next = () => {
                if(condition()) return resolve();
                return cb(() => next());
            };

            return next();
        });
    },

    /**
     * Async retry function
     * @param {Promise} cb - Async function which will execute.
     * @param {number} [limit] - Number of retries, default = `1`.
     * @param {number} [delay] - Delay between retries.
     * @param {function(number, Error)} [retryCallback] - Callback if `cb` failed and retry in progress, returns remaining retries and error.
     * @returns {Promise} Promise
     */

    /*eslint max-params: ["error", 4]*/
    retry(cb, limit = 1, delay = 0, retryCallback) {
        let _limit = limit;
        return new Promise((resolve, reject) => {
            if(typeof limit !== "number") return reject("limit has to be a number");
            if(typeof cb !== "function") return reject("callback has to be a function");

            const next = () => cb()
            .then(result => resolve(result))
            .catch(error => {
                if(_limit-- <= 0) return reject(error);
                setTimeout(() => {
                    if(typeof retryCallback === "function") retryCallback(_limit, error);
                    return next();
                }, delay);
            });

            return next();
        });
    }
};