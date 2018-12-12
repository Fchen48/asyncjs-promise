# asyncForEach-promise

simple async forEach method with promise support.

## Installation

Installation is done using the `npm install` command: 
```bash
$ npm install --save asyncforeach-promise
```

## Usage

**forEach(arrayOr)**

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
### Output: 
```bash
34
24
54
finished
```

This will be super usefull if you try to interact with a database or a web API. 
A normal foreach would end up in multiple parralell executing tasks, ...

## License

[MIT](LICENSE)