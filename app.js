module.exports = (input, cb) => new Promise((resolve, reject) => {
    const next = (input, index) => {
        switch (input.constructor.name) {
            case "Array":
                if(!input.length) return reject("undefined length");
                if(input.length <= 0) return reject("input length < 1");
                if(index === input.length) return resolve();
                return cb(input[index], index, () => {
                    next(input, index + 1, cb);
                });

            case "CoreDocumentArray":
                if(!input.length) return reject("undefined length");
                if(input.length <= 0) return reject("input length < 1");
                if(index === input.length) return resolve();
                return cb(input[index], index, () => {
                    next(input, index + 1, cb);
                });

            case "Set":
                if(!input.size) return reject("undefined length");
                if(input.size <= 0) return reject("input length < 1");
                if(index === input.size) return resolve();
                return cb(Array.from(input)[index], index, () => {
                    next(input, index + 1, cb);
                });

            case "Map":
                if(!input.size) return reject("undefined length");
                if(input.size <= 0) return reject("input length < 1");
                if(index === input.size) return resolve();
                return cb(Array.from(input)[index], index, () => {
                    next(input, index + 1, cb);
                });

            default:
                return reject("undefined iterable type: " + input.constructor);
        }
    };

    next(input, 0, cb);
});