module.exports = (array, cb) => new Promise((resolve, reject) => {
    const next = (array, index) => {
        if(index === array.length) return resolve();
        cb(array[index], index, () => {
            next(array, index + 1, cb);
        });
    };

    next(array, 0, cb);
});