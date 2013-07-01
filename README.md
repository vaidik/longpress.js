# longpress.js

Provides a desktop and mobile compatible longpress event.

## Usage

Check [`index.html`][index] for sample. [Working demo][WD] is also available.

## Defaults

* `duration`: 500 ms

## Overriding Defaults

Add a `longpress_config` object in the source before inserting `longpress.js`
like so:

```
var longpress_config = {
    duration: 600,
};
```

Example available in [`index.html`][index].

[WD]: http://vaidik.github.io/longpress.js/
[index]: https://github.com/vaidik/longpress/blob/master/index.html
