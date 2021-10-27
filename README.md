# asyncjs-promise

Simple async methods with promise support.

## Installation

Installation is done using the `npm install` command:

```bash
$ npm install --save asyncjs-promise
```

## Upgrade from **v0.x.x** to **v1.x.x**

In **v1.0.0**, custom functions have been added which cause previous code executions to no longer work.  
The function itself has not changed.

Regarding this, the module was also renamed to `asyncjs-promise`.

*Previous:*
```js
const forEach = require("asyncforeach-promise");

const array = [34, 24, 54];
forEach(array, (element, index, next) => {
    console.log(element);
    next()
})
.then(() => {
    console.log("finished");
})
.catch(console.error);
```
*Now:*
```js
const async = require("asyncjs-promise");

const array = [34, 24, 54];
async.each(array, (element, index, next) => {
    console.log(element);

    return next();
})
.then(() => {
    console.log("finished");
})
.catch(console.error);
```
## Usage

### `.each(arrayOrIterableElement, callbackFunction)`

Example:
```js
const async = require("asyncjs-promise");

const array = [34, 24, 54];
async.each(array, (element, index, next) => {
    console.log(element);

    return next();
})
.then(() => {
    console.log("finished");
})
.catch(console.error);
```

Output:
```bash
34
24
54
finished
```

This will be super useful if you try to interact with a database or a web API and try to process a set of data.
A normal forEach would end up in multiple parallel executing tasks, ...

---
### `.until(conditionFunction, callbackFunction)`
Example:
```js
const async = require("asyncjs-promise");

let counter = 0;
async.until(() => counter >= 5), next => {
    counter++;
    console.log(counter);

    return next();
})
.then(() => {
    console.log("finished");
})
.catch(console.error);
```

Output:
```bash
1
2
3
4
5
finished
```

This will be super useful if you try to interact with a database or a web API and try to get an undefined length of data.
A normal while would end up in multiple parallel executing tasks, ...

---
## License

[MIT](LICENSE)