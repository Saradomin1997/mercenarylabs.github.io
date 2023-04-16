'use strict';

/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4:
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * # hasLocalStorage()
 *
 * returns `true` or `false` depending on whether localStorage is supported or not.
 * Beware that some browsers like Safari do not support localStorage in private mode.
 *
 * inspired by this cappuccino commit
 * https://github.com/cappuccino/cappuccino/commit/063b05d9643c35b303568a28809e4eb3224f71ec
 *
 * @returns {Boolean}
 */
function hasLocalStorage() {
  try {
    // we've to put this in here. I've seen Firefox throwing `Security error: 1000`
    // when cookies have been disabled
    if (typeof localStorage === 'undefined') {
      return false;
    } // Just because localStorage exists does not mean it works. In particular it might be disabled
    // as it is when Safari's private browsing mode is active.


    localStorage.setItem('Storage-Test', '1'); // that should not happen ...

    if (localStorage.getItem('Storage-Test') !== '1') {
      return false;
    } // okay, let's clean up if we got here.


    localStorage.removeItem('Storage-Test');
  } catch (_error) {
    // in case of an error, like Safari's Private Mode, return false
    return false;
  } // we're good.


  return true;
}

if (( false ? 0 : _typeof(exports)) === 'object') {
  module.exports = hasLocalStorage;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var has_localstorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var has_localstorage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(has_localstorage__WEBPACK_IMPORTED_MODULE_0__);

var _window = window,
    $ = _window.jQuery,
    cplPreloaderData = _window.cplPreloaderData;
var $doc = $(document);
var $html = $('html');
var $wnd = $(window); // 400ms for logo animation + 600ms for logo show delay + 200 additional delay for better transition.

var MIN_TIME = 1200;
var MAX_TIME = 7000;
var disabled = false; // We need this to prevent JS error in the iframe in Incognito mode.

var localStorage = has_localstorage__WEBPACK_IMPORTED_MODULE_0___default()() ? window.localStorage : false;
/*
 * Display Once option.
 */

if (cplPreloaderData.show_once && localStorage) {
  // Disable preloaded if user already saw it.
  if (localStorage.getItem('cplPreloaderSeen')) {
    $html.addClass('cpl-preloader-disabled');
    disabled = true;
  } else {
    localStorage.setItem('cplPreloaderSeen', new Date());
  }
}
/*
 * Hide preloader when page loaded.
 */


function initPreloader() {
  var $preloader = $('.cpl-preloader');
  var $preloaderLogo = $('.cpl-preloader-logo');
  var $preloaderLogoImg = $html.hasClass('cpl-night-mode') ? $preloaderLogo.children('.cpl-logo-night') : $preloaderLogo.children('.cpl-logo');
  var startTime = new Date();
  var isPageLoaded = false;
  var isLogoLoaded = false;
  var requestedClose = false;

  function maybeClosePreloader() {
    if (requestedClose || !isPageLoaded || !isLogoLoaded) {
      return;
    }

    requestedClose = true;
    var timePassed = new Date() - startTime;
    setTimeout(function () {
      $preloader.addClass('cpl-preloader-hide');
      $doc.trigger('hidePreloader.cpl');
      setTimeout(function () {
        $preloader.hide();
      }, 1000);
    }, Math.max(10, MIN_TIME - timePassed));
  } // Process preloader only after logo loaded.


  $preloaderLogo.imagesLoaded(function () {
    // Show logo.
    setTimeout(function () {
      $preloaderLogo.css('width', $preloaderLogoImg.outerWidth(true));
      isLogoLoaded = true;
      maybeClosePreloader();
    }, 600); // If nothing loaded, we need to force hide preloader.

    setTimeout(function () {
      isPageLoaded = true;
      isLogoLoaded = true;
      maybeClosePreloader();
    }, MAX_TIME);
  }); // Page loaded.

  $wnd.on('load', function () {
    isPageLoaded = true;
    maybeClosePreloader();
  });
}

if (!disabled) {
  // Check when preloader ready.
  if ($('.cpl-preloader').length) {
    initPreloader();
  } else {
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i += 1) {
        for (var j = 0; j < mutations[i].addedNodes.length; j += 1) {
          // We're iterating through _all_ the elements as the parser parses them,
          // deciding if they're the preloader.
          if (mutations[i].addedNodes[j].matches && mutations[i].addedNodes[j].matches('.cpl-preloader')) {
            initPreloader();
            observer.disconnect();
          }
        }
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
  /*
   * Support for Ghost Kit SR extension.
   */


  var gktObj = false;
  $doc.on('beforeInit.ghostkit', function (evt, classObject) {
    gktObj = classObject;
    gktObj.oldPrepareSR = gktObj.prepareSR;
    gktObj.oldIsElementInViewport = gktObj.isElementInViewport;

    gktObj.prepareSR = function () {};

    gktObj.isElementInViewport = function () {
      return false;
    };
  });
  $doc.one('hidePreloader.cpl', function () {
    if (gktObj) {
      setTimeout(function () {
        gktObj.prepareSR = gktObj.oldPrepareSR;
        gktObj.isElementInViewport = gktObj.oldIsElementInViewport;
        delete gktObj.oldPrepareSR;
        delete gktObj.oldIsElementInViewport;
        gktObj.prepareSR(); // isElementInViewport function used inside throttle scroll callback only, so we need to run it.

        $wnd.trigger('throttlescroll.ghostkit');
      }, 500);
    }
  });
}
}();
/******/ })()
;