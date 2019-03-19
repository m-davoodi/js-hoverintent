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
