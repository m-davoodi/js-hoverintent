# HoverIntent in javascript

HoverIntent is a tiny javascript library which detects
if user wants to stay on a specific DOM element or just cross over it fast.

[![Build Status](https://travis-ci.org/m-davoodi/js-hoverintent.svg?branch=master)](https://travis-ci.org/m-davoodi/js-hoverintent)
[![dependencies Status](https://david-dm.org/m-davoodi/js-hoverintent/status.svg)](https://david-dm.org/m-davoodi/js-hoverintent)
[![devDependencies Status](https://david-dm.org/m-davoodi/js-hoverintent/dev-status.svg)](https://david-dm.org/m-davoodi/js-hoverintent?type=dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Known Vulnerabilities](https://snyk.io/test/github/m-davoodi/js-hoverintent/badge.svg?targetFile=package.json)](https://snyk.io/test/github/m-davoodi/js-hoverintent?targetFile=package.json)
[![npm downloads](https://img.shields.io/npm/dm/js-hoverintent.svg?style=flat-square)](https://www.npmjs.com/package/js-hoverintent)

## Installation

To install the stable version:

```sh
npm install --save js-hoverintent
```

You can consume HoverIntent as a collection of [CommonJS](https://github.com/webpack/docs/wiki/commonjs) modules.
These modules are what you get when you import `js-hoverintent` in a [Webpack](https://webpack.js.org/), [Browserify](http://browserify.org/),
or [Rollup](https://rollupjs.org).

```javascript
import HoverIntent from 'js-hoverintent'
```

If you don't use a module bundler, it's also fine. The `js-hoverintent` npm package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`umd` folder](https://unpkg.com/js-hoverintent/build/umd/).
They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments.
For example, you can drop a UMD build as a [`<script>` tag](https://unpkg.com/js-hoverintent/build/umd/hoverintent.min.js) on the page.
The UMD builds make HoverIntent available as a `window.HoverIntent` global variable.

```html
<script
  type="text/javascript"
  src="https://unpkg.com/js-hoverintent/build/umd/hoverintent.min.js"
></script>
<script>
  // in umd build, the HoverIntent library is available as a global variable
  var intent = window.HoverIntent
</script>
```

## API

HoverIntent has two methods, `enter` and `leave`

### `enter(elements, callback, wait)`

Add mouseenter and mouseleave listeners to the given elements to determine mouse has entered
the elements and did not leave it quickly.

#### Arguments

1. `elements` _(HTMLElement|HTMLElement[])_: An HTMLElement object or array of it.

2. `callback` _(Function)_: A function which is called when the mouse pointer entered
   the Html elements and after the wait time, the pointer still hovers on the element.
   this function can take an event argument which is an instance of [_MouseEvent_](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent).

3. [`wait`] _(Number)_: A delay time. after this time if the pointer still hovers on the element, the callback method will be called.

#### Returns

_(Object)_: An object holding `cancel` method to remove event listeners from the given elements.

### `leave(elements, callback, wait)`

It's similar to the enter method but used for determining the mouse has leaved the elements and did not enter it quickly again.

#### Arguments

1. `elements` _(HTMLElement|HTMLElement[])_: An HTMLElement object or array of it.

2. `callback` _(Function)_: A function which is called when the mouse pointer leaved
   the Html elements and after the wait time, the pointer dose not come back on the element and hovers on it.
   this function can take an event argument which is an instance of [_MouseEvent_](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent).

3. [`wait`] _(Number)_: A delay time. after this time if the pointer dose not come back on the element, the callback method will be called.

#### Returns

_(Object)_: An object holding `cancel` method to remove event listeners from the given elements.

## Usage

This simple code demonstrates adding _isHover_ class to a button element class list when the mouse pointer
enters the button and remove it from the its class list when the mouse pointer leaves the button.

```javascript
import { enter, leave } from 'js-hoverintent'

const btn = document.querySelector('button')

const enterIntent = enter(
  btn,
  function(event) {
    // event is instance of MouseEvent
    event.target.classList.add('isHover')
    // OR
    this.classList.add('isHover')
  },
  100
)
const leaveIntent = leave(
  btn,
  function(event) {
    // event is instance of MouseEvent
    event.target.classList.remove('isHover')
    // OR
    this.classList.remove('isHover')
  },
  100
)

// if you want cancel hover intent just call cancel method of return object
enterIntent.cancel()
leaveIntent.cancel()
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
