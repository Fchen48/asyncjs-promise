/* eslint-disable no-unused-expressions, no-undef, global-require, no-invalid-this, no-empty-function */
const expect = require("chai").expect;
const async = require("../app.js");

describe("asyncjs-promise", () => {
    describe("general", () => {

        it("load module", () => {
            expect(async).a("object");
        });
        it("check if .each is defined", () => {
            expect(async.each).a("function");
        });
        it("check if .until is defined", () => {
            expect(async.until).a("function");
        });
        it("check if .retry is defined", () => {
            expect(async.retry).a("function");
        });
    });

    describe(".each", () => {
        it("iterate thru array with an delay of 250ms", () => {
            const testArray = [1, 2, 3];

            return async.each(testArray, (item, index, next) => {
                setTimeout(() => {
                    next();
                }, 250);
            })
            .catch(console.error);
        });

        it("iterate thru set with an delay of 250ms", () => {
            const testSet = new Set();
            testSet.add("value");
            testSet.add(48);
            testSet.add({ name: "Herbert" });

            return async.each(testSet, (item, index, next) => {
                setTimeout(() => {
                    next();
                }, 250);
            })
            .catch(console.error);
        });

        it("iterate thru map with an delay of 250ms", () => {
            const testMap = new Map();
            testMap.set("5", 123);
            testMap.set(456, true);
            testMap.set("no", null);

            return async.each(testMap, (item, index, next) => {
                setTimeout(() => {
                    next();
                }, 250);
            })
            .catch(console.error);
        });
    });

    describe(".until", () => {
        it("iterate 3 times and stop afterwards", () => {
            let counter = 0;
            let finished = false;

            return async.until(() => finished, next => {
                setTimeout(() => {
                    counter++;
                    if(counter >= 3) finished = true;

                    next();
                }, 250);
            })
            .catch(console.error);
        });
    });

    describe(".retry", () => {
        it("retries 5 times and stop with error", () => async.retry(() => Promise.reject(), 5, 100)
        .catch(() => true));

        it("finish in the first try and stop afterwards", () => async.retry(() => Promise.resolve(), 5, 50));

        it("retry 1 more and succeed afterwards", () => {
            let counter = 0;

            return async.retry(() => {
                if(++counter <= 1) return Promise.reject();
                return Promise.resolve();
            }, 5, 50);
        });
    });
});