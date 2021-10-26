# asyncjs-promise

simple async methods with promise support.

## Installation

Installation is done using the `npm install` command:

```bash
$ npm install --save asyncjs-promise
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

This will be super useful if you try to interact with a database or a web API.
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

This will be super useful if you try to interact with a database or a web API.
A normal while would end up in multiple parallel executing tasks, ...

---
## License

[MIT](LICENSE)
