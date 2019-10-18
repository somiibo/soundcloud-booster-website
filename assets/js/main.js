/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		4: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"0":"vendors~firebase-app~firebase-auth~firebase-firestore~firebase-messaging","1":"cookieconsent","2":"firebase-app","3":"lazysizes","5":"vendors~@sentry/browser","6":"vendors~firebase-auth","7":"vendors~firebase-firestore","8":"vendors~firebase-messaging"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/js/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
*/

function Utilities(utilObj) {
  this.utilities = utilObj;
}

/* https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf */
Utilities.get = function(obj, path, def) {
  var fullPath = (path || '')
    .replace(/\[/g, '.')
    .replace(/]/g, '')
    .split('.')
    .filter(Boolean);

  return fullPath.every(everyFunc) ? obj : def;

  function everyFunc(step) {
    // return !(step && (obj = obj[step]) === undefined);
    // console.log(' CHECK > ', !(step && (obj = obj[step]) === undefined));
    // console.log('step', step, 'obj', obj, 'objstep', obj[step]);
    // return !(step && (obj = obj[step]) === undefined);
    return !(step && (obj = obj[step]) === undefined);
  }
}

/* https://stackoverflow.com/questions/54733539/javascript-implementation-of-lodash-set-method */
Utilities.set = function(obj, path, value) {
  if (Object(obj) !== obj) {
    return obj;
  }; // When obj is not an object

  var p = (path || '').split("."); // Get the keys from the path

  p.slice(0, -1).reduce(function (a, c, i) {
    return (// Iterate all of them except the last one
      Object(a[c]) === a[c] // Does the key exist and is its value an object?
      // Yes: then follow that path
      ? a[c] // No: create the key. Is the next key a potential array-index?
      : a[c] = Math.abs(p[i + 1]) >> 0 === +p[i + 1] ? [] // Yes: assign a new array object
      : {}
    );
  }, // No: assign a new plain object
  obj)[p.pop()] = value; // Finally assign the value to the last key

  return obj; // Return the top-level object to allow chaining
}

// https://dzone.com/articles/cross-browser-javascript-copy-and-paste
// https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
Utilities.clipboardCopy = function(input) {
  var el = document.createElement('textarea');
  el.setAttribute('style','width:1px;border:0;opacity:0;');
  el.value = input && input.nodeType ? input.innerHTML : input;
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand('copy');
  } catch (e) {
    alert('Please press Ctrl/Cmd+C to copy');
  }
  document.body.removeChild(el);
}

module.exports = Utilities;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Manager = new (require('web-manager'));
Manager = new (__webpack_require__(3));

Manager.init(Configuration, function() {
  Manager.log('Init main.js');
  var app = __webpack_require__(8);
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/

JQUERY Ready
https://github.com/jquery/jquery/blob/master/src/core/ready.js
https://github.com/julienschmidt/contentloaded/blob/master/contentloaded.js
https://github.com/dperini/ContentLoaded/blob/master/src/contentloaded.js
https://github.com/pirxpilot/domready/blob/master/index.js
* https://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/

*/
/**
 * DEPENDENCIES
 */
// @TODO: code split these: http://jonathancreamer.com/advanced-webpack-part-2-code-splitting/
var ajax = __webpack_require__(4);
var dom = __webpack_require__(5);
var query = __webpack_require__(6);
var utilities = __webpack_require__(0);
var storage = __webpack_require__(7);
var debug;

// var ajax;
// var dom;
// var query;
// var utilities;
// var storage;


/**
* MODULE
*/

function Manager() {
  /**
  * OPTIONS
  */
  // Should this be changed?
  // var parseDELETE = function (req) {
  //   var result;
  //   try {
  //     result = JSON.parse(req.responseText);
  //   } catch (e) {
  //     result = req.responseText;
  //   }
  //   return [result, req];
  // };


  this.extra = '16'; //@@@ Delete later

  this.properties = {
    options: {
      page: {},
      global: {},
    },
    page: {
      code: '',
      url: '',
      status: {
        ready: false,
        initilizing: false,
        authReady: false,
        masterSWRegistered: false,

        DOMContentLoaded: false,
        eventHandlersSet: false,
      },
      // initReady: false,
      // initSecondaryReady: false,
      queryString: {
        data: {},
        exists: undefined,
      },

      // auth: {
      //   status: undefined,
      //   lastAction: 'unknown',
      // },
    },
    global: {
      version: '',
      url: '',
      cacheBreaker: '',
      brand: {
        name: 'default',
      },
      // preferences: {
      //   // firebase: {
      //   //   enabled: false
      //   // },
      //   // pushNotifications: {
      //   //   enabled: false
      //   // },
      //   // load: {
      //   //   variables: '',
      //   //   functionsFirebase: '',
      //   // },
      //   // auth: {
      //   //   prohibitedReturnURL: '',
      //   //   requiredReturnURL: '',
      //   // },
      // },
    },
    auth: {
      user: false,
    },
    references: {
      serviceWorker: undefined
    },
    // firebase: {
    //   user: {
    //     exists: false,
    //     authStateChangeRan: false,
    //     authObject: {}
    //   },
    //   config: {
    //     apiKey: '',
    //     authDomain: '',
    //     databaseURL: '',
    //     projectId: '',
    //     storageBucket: '',
    //     messagingSenderId: '',
    //   },
    //   functions: {
    //     auth: undefined,
    //     messaging: undefined,
    //     database: undefined,
    //     firestore: undefined,
    //   },
    // },
    meta: {
      environment: 'production'
    }
  };

  try {
    // set(this, 'properties.options.page', pageOptions);
    // set(this, 'properties.options.global', globalOptions);
    // set(this, 'properties.global.domain', document.location.hostname);
    // set(this, 'properties.page.url', document.location.href);
    // this.properties.options.page = pageOptions || {};
    // this.properties.options.global = globalOptions || {};]
    // this.properties.global.urlRoot = window.location.protocol + '//' + window.location.hostname;
    this.properties.page.url = window.location.href;
  } catch (e) {

  }

}

  /**
  * METHODS
  */
  Manager.prototype.get = function(path) {
    return utilities.get(this, 'properties.' + path);
  }

  Manager.prototype.set = function(path, value) {
   return utilities.set(this, 'properties.' + path, value);
  }

  Manager.prototype.setEventListeners = function() {
    if (utilities.get(this, 'properties.page.status.eventHandlersSet', false) == false) {
      this.properties.page.status.eventHandlersSet = true;
      var This = this;
      // document.addEventListener('click', function (event) {
      This.dom().select('body').on('click', function (event) {
        This.log('Clicked', event.target);
        // auth events
        if (event.target.matches('.auth-signin-email-btn')) {
          This.auth().signIn('email');
        } else if (event.target.matches('.auth-signup-email-btn')) {
          This.auth().signUp('email');
        } else if (event.target.matches('.auth-signout-all-btn')) {
          This.auth().signOut();
        } else if (event.target.matches('.auth-forgot-email-btn')) {
          This.auth().forgot();
        }

        // push notification events
        if (event.target.matches('.auth-subscribe-push-notifications-btn')) {
          This.notifications().subscribe()
          .catch(function (e) {
            console.error(e);
          });
        } else if (false) {}

      }, false);
    }
  }

  // Manager.prototype.signIn = function(method, email, password) {
  //   method = method || 'email';
  //   email = email || this.dom().select('.auth-email-input').getValue();
  //   password = password || this.dom().select('.auth-password-input').getValue();
  //   var This = this;
  //   This.log('Signin attempt: ', method, email, password);
  //   if (method == 'email') {
  //     firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(function(credential) {
  //       This.log('Good signin');
  //       This.properties.options.auth.signIn(false, credential.user);
  //     })
  //     .catch(function(error) {
  //       This.dom().select('.auth-error-message-element').show().setInnerHTML(error.message);
  //       This.log('error', error.message);
  //       This.properties.options.auth.signIn(error);
  //     });
  //   }
  // }

  // Manager.prototype.signUp = function(method, email, password, passwordConfirm) {
  //   method = method || 'email';
  //   email = email || this.dom().select('.auth-email-input').getValue();
  //   password = password || this.dom().select('.auth-password-input').getValue();
  //   passwordConfirm = passwordConfirm || this.dom().select('.auth-password-confirm-input').getValue();
  //   var This = this;
  //   This.log('Signup attempt: ', method, email, password, passwordConfirm);
  //   if (method == 'email') {
  //     firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then(function(credential) {
  //       This.log('Good signup');
  //       This.properties.options.auth.signUp(false, credential.user);
  //     })
  //     .catch(function(error) {
  //       This.dom().select('.auth-error-message-element').show().setInnerHTML(error.message);
  //       This.log('error', error.message);
  //       This.properties.options.auth.signUp(error);
  //     });
  //   }
  // }

  // Manager.prototype.signOut = function() {
  //   this.log('signOut');
  //   var This = this;
  //   firebase.auth().signOut()
  //   .then(function() {
  //     This.log('signOut success.');
  //     This.properties.options.auth.signOut();
  //   })
  //   .catch(function(error) {
  //     This.log('signOut failed: ', error);
  //     This.properties.options.auth.signOut(error);
  //   });
  // }

  // Manager.prototype.forgot = function(email) {
  //   email = email || this.dom().select('.auth-email-input').getValue();
  //   this.log('forgot');
  //   var This = this;
  //
  //   firebase.auth().sendPasswordResetEmail(email)
  //   .then(function() {
  //     This.log('forgot success.');
  //     This.properties.options.auth.forgot();
  //   })
  //   .catch(function(error) {
  //     This.log('forgot failed: ', error);
  //     This.dom().select('.auth-error-message-element').show().setInnerHTML(error.message);
  //     This.properties.options.auth.forgot(error);
  //   });
  //
  // }

  function _authStateHandler(This, user) {
    // var This = this;
    This.log('authStateHandler', user);
    if (user != null) {
      if (user.isAnonymous === false) {
        _authHandle_in(This, user);
      } else {
        _authHandle_out(This);
      }
      This.properties.options.auth.authStateHandler(user);
    } else {
      // firebase.auth().signInAnonymously()
      // .then(function(user) {
      //   This.log('signInAnonymously', user);
      // })
      // .catch(function(error) {
      //   This.log('signInAnonymously error:', error);
      //   _authHandle_out(This);
      //   This.properties.options.auth.authStateHandler(user);
      // });
      _authHandle_out(This);
      This.properties.options.auth.authStateHandler(user);
    }
  }

  function _authHandle_in(This, user) {
    This.log('_authHandle_in', user);
    var returnUrl = This.query().create(window.location.href).get('redirect');
    if (returnUrl) {
      window.location.href = decodeURIComponent(returnUrl);
      return;
    }
    if (This.properties.options.auth.state == 'prohibited') {
      window.location.href = This.properties.options.auth.sends.prohibited;
      return;
    }
    This.dom().select('.auth-signedin-true-element').show();
    This.dom().select('.auth-signedin-false-element').hide();
    This.dom().select('.auth-email-element').each(function(i, e) {
      if (e.tagName == 'INPUT') {
        This.dom().select(e).setValue(user.email)
      } else {
        This.dom().select(e).setInnerHTML(user.email)
      }
    });
    This.dom().select('.auth-uid-element').each(function(i, e) {
      if (e.tagName == 'INPUT') {
        This.dom().select(e).setValue(user.uid)
      } else {
        This.dom().select(e).setInnerHTML(user.uid)
      }
    });
  }

  function _authHandle_out(This) {
    This.log('_authHandle_out: ', This.properties.options.auth.state);
    if (This.properties.options.auth.state == 'required') {
      window.location.href = This.query().create(This.properties.options.auth.sends.required).set('redirect', encodeURIComponent(window.location.href)).getUrl();
      return;
    }
    This.dom().select('.auth-signedin-true-element').hide();
    This.dom().select('.auth-signedin-false-element').show();
  }

  Manager.prototype.ready = function(fn, options) {
    options = options || {};
    options.retryInterval = options.retryInterval || 100;
    var This = this;
    // if ( (This.get(this, 'page.status.ready', false) == false) ) {
    // Manager.log('--- ready() REAL');
    if ( (utilities.get(this, 'properties.page.status.ready', false) == false) ) {
      setTimeout(function () {
        This.ready(fn, options);
      }, options.retryInterval);
    } else {
      // Performance
      This.performance().mark('manager_ready');

      // This.log('--- ready() REAL ***DONE***');
      return fn();
      // return checkDOMLoaded(window, fn);
    }
  }

  // Manager.prototype.authReady = function(fn, options) {
  //   options = options || {};
  //   options.retryInterval = options.retryInterval || 100;
  //   var This = this;
  //   if ( (utilities.get(this, 'properties.page.status.authReady', false) == false) ) {
  //     setTimeout(function () {
  //       This.authReady(fn, options);
  //     }, options.retryInterval);
  //   } else {
  //     // Performance
  //     if ('performance' in window) {
  //       window.performance.mark('manager_authReady');
  //     }
  //     return fn();
  //   }
  // }

  Manager.prototype.serviceWorker = function() {
    var This = this;
    var SWAvailable = (('serviceWorker' in navigator));
    if (SWAvailable) {
      try {
        var swref = This.properties.references.serviceWorker.active || navigator.serviceWorker.controller;
      } catch (e) {}
    }
    return {
      postMessage: function() {
        // var args = getArgs(arguments);
        var args = arguments;
        if (!SWAvailable) {return};

        try {
          var messageChannel = new MessageChannel();
          messageChannel.port1.onmessage = function(event) {
            if (!event.data.error && args[1]) {
              args[1](event.data);
            }
          };
          // navigator.serviceWorker.controller.postMessage(args[0], [messageChannel.port2]);
          swref.postMessage(args[0], [messageChannel.port2]);
        } catch (e) {
          console.error(e);
        }

        // if (!navigator.serviceWorker.controller) {
        //   This.log('postMessage...');
        //   setTimeout(function () {
        //     This.serviceWorker().postMessage(args[0], args[1]);
        //   }, 100);
        // } else {
        //   // post message: https://stackoverflow.com/questions/30177782/chrome-serviceworker-postmessage
        //   var messageChannel = new MessageChannel();
        //   messageChannel.port1.onmessage = function(event) {
        //     if (!event.data.error && args[1]) {
        //       args[1](event.data);
        //     }
        //   };
        //   navigator.serviceWorker.controller.postMessage(args[0], [messageChannel.port2])
        // }
      }
    }

  }

  // navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
  //   // Let's see if you have a subscription already
  //   console.log('&&& GET SUB');
  //   return serviceWorkerRegistration.pushManager.getSubscription();
  // })
  // .then(function(subscription) {
  //   if (!subscription) {
  //     // You do not have subscription
  //     console.log('&&& NO SUBSCRIPTION');
  //   } else {
  //     console.log('&&& YES SUBSCRIPTION');
  //
  //   }
  //
  //   // You have subscription.
  //   // Send data to service worker
  //   // navigator.serviceWorker.controller.postMessage({'data': dataToServiceWorker});
  //
  // })

  // navigator.serviceWorker.ready.then(() => {
  //   // I thought the page would be controlled at this point, thanks to clients.claim()
  //   console.log('.ready resolved, and navigator.serviceWorker.controller is', navigator.serviceWorker.controller);
  //   navigator.serviceWorker.addEventListener('controllerchange', () => {
  //     console.log('Okay, now things are under control. navigator.serviceWorker.controller is', navigator.serviceWorker.controller);
  //   });
  // });

  // Manager.prototype.init = async function() {
  // Manager.prototype.init = function() {
  //   if ((get(this, 'properties.page.status.ready', false) == false) && ((get(this, 'properties.page.status.initializing', false) == false))) {
  //     set(this, 'properties.page.status.initializing', true);
  //     console.log('INIT Called');
  //     // await wait(300,100);
  //     console.log('INIT finished waiting');
  //     // this.testFunction();
  //
  //     // setup
  //     this.setEventListeners();
  //
  //     // make sure firebase etc is loaded and elements on page are updated to reflect user's auth status
  //     // also update properties so that it reflects whether the user is logged inspect
  //
  //     // check that navigator exists
  //
  //     //check local storage exists
  //
  //     // parse query string
  //
  //     // add cookie thing with settings
  //     // _ready = true;
  //     set(this, 'properties.page.status.initializing', false);
  //     set(this, 'properties.page.status.ready', true);
  //
  //   }
  //
  //   return new Promise((resolve, reject) => {
  //     resolve(true);
  //   });
  // }

  // init with polyfills
  Manager.prototype.init = function(configuration, callback) {

    var This = this;
    if ((utilities.get(This, 'properties.page.status.ready', false) == false) && ((utilities.get(This, 'properties.page.status.initializing', false) == false))) {

      // Performance
      This.performance().mark('manager_init');

      // set initializing to true
      This.properties.page.status.initializing = true;

      // set other properties
      This.properties.meta.environment = ((window.location.href.indexOf('localhost') != -1) || (window.location.href.indexOf('127.0.0.1') != -1)) ? 'development' : 'production';


      init_loadPolyfills(This, configuration, function() {
          This.properties.page.status.initializing = false;
          // This.properties.genericPromise = new Promise(resolve => { resolve() });

          var options_defaults = {
            // debug: {
            //   environment: This.properties.meta.environment,
            // },
            queryString: {
              saveToStorage: false
            },
            pushNotifications: {
              enabled: true,
              timeoutCheck: 60 // how long to wait before auto ask, 0 to disable
            },
            exitHandler: {
              enabled: false,
              function: function() {}
            },
            serviceWorker: {
              path: ''
            },
            initChecks: {
              DOMContentLoaded: false, // preset to false because takes a while and dont need if script is loaded at bottom of DOM
              features: [] // an array of javascript and dom features to check for (NIY)
            },
            auth: {
              state: 'default', // required, prohibited, default
              sends: {
                required: (This.properties.global.url + '/signin/'),
                prohibited: (This.properties.global.url + '/')
              },
              authStateHandler: function() {}, // custom authStateHandler() function
              signIn: function() {}, // custom signIn() function
              signOut: function() {}, // custom signOut() function
              signUp: function() {}, // custom signUp() function
              forgot: function() {} // custom signUp() function
            },
            popup: {
              enabled: true,
              config: {
                title: '',
                message: '',
                btn_ok: {
                  text: '',
                  link: ''
                }
              }
            },
            libraries: {
              firebase_app: {
                enabled: true,
                config: {
                  apiKey: '',
                  authDomain: '',
                  databaseURL: '',
                  projectId: '',
                  storageBucket: '',
                  messagingSenderId: '',
                  appId: ''
                }
              },
              firebase_firestore: {
                enabled: true
              },
              firebase_messaging: {
                enabled: true
              },
              firebase_auth: {
                enabled: true,
              },
              lazysizes: {
                enabled: true
              },
              sentry: {
                enabled: true,
                config: {
                  dsn: '',
                  release: ''
                }
              },
              tawk: {
                enabled: true,
                config: {
                  chatId: ''
                }
              },
              cookieconsent: {
                enabled: true,
                config: {
                  palette: {
                    popup: {
                      background: '#237afc',
                      text: '#ffffff'
                    },
                    button: {
                      background: '#fff',
                      text: '#237afc'
                    }
                  },
                  theme: 'classic',
                  position: 'bottom-left',
                  type: '',
                  content: {
                    message: 'This website uses cookies to ensure you get the best experience on our website.',
                    dismiss: 'Got it!',
                    link: 'Learn more',
                    // href: '' || This.properties.global.urlRoot + '/cookies/',
                    href: (This.properties.global.url + '/cookies/')
                  }
                }
              }
            }
          };

          var options_user = {};
          function eachRecursive(obj, parent) {
            parent = (!parent) ? '' : parent;
              for (var key in obj) {
                if (typeof obj[key] == "object" && obj[key] !== null && !Array.isArray(obj[key])) {
                  eachRecursive(obj[key], parent + key + '.');
                } else {
                  utilities.set(options_user, parent + key, utilities.get(options_defaults, parent + key) );
                  var t_globalItem = utilities.get(configuration, 'global.settings.' + parent + key, undefined);
                  var t_pageItem = utilities.get(configuration, 'page.settings.' + parent + key, undefined);
                  if (typeof t_globalItem !== 'undefined') {
                    utilities.set(options_user, parent + key, t_globalItem);
                  }
                  if (typeof t_pageItem !== 'undefined') {
                    utilities.set(options_user, parent + key, t_pageItem);
                  }
                }
              }
          }

          eachRecursive(options_defaults);
          This.properties.options = options_user;

          // set non-option properties
          This.properties.global.version = configuration.global.version;
          This.properties.global.url = configuration.global.url;
          This.properties.global.cacheBreaker = configuration.global.cacheBreaker;
          This.properties.global.brand.name = configuration.global.brand.name;
          This.properties.meta.environment = utilities.get(configuration, 'global.settings.debug.environment', This.properties.meta.environment);

          This.log('Config: ', options_user);

          // check DOMContentLoaded
          // if (utilities.get(options_user, 'initChecks.DOMContentLoaded', false) == true) {
          if (options_user.initChecks.DOMContentLoaded == true) {
            This.dom().checkDOMContentLoaded(window, function() {
              This.properties.page.status.DOMContentLoaded = true;
              This.log('DOMContentLoaded = ', This.properties.page.status.DOMContentLoaded);
            });
          } else {
            This.properties.page.status.DOMContentLoaded = true;
            This.log('DOMContentLoaded = ', This.properties.page.status.DOMContentLoaded);
          }

          // parse query stringify
          This.properties.page.queryString = This.query()
            .create(window.location.href, {});
          if (This.properties.page.queryString.get('auth_aff')) {
            This.storage().set('queryString.auth_aff', This.properties.page.queryString.get('auth_aff'));
          }
          if (This.properties.page.queryString.get('redirect')) {
            window.location.href = decodeURIComponent(This.properties.page.queryString.get('redirect'));
            return;
          }

          // load critical libraries
          Promise.all([
            load_sentry(This, options_user),
            load_firebase(This, options_user),
          ])
          .then(function() {

            // handle firebase user
            if (firebase.auth) {
              firebase.auth().onAuthStateChanged(function(user) {
                This.properties.page.status.authReady = true;
                This.properties.auth.user = user || false;
                _authStateHandler(This, user);
              })
            }

            // setup
            This.setEventListeners();

            // run the init callback
            This.properties.page.status.ready = true;
            callback();

            // loan non-critical libraries
            load_lazysizes(This, options_user);
            load_cookieconsent(This, options_user);
            subscriptionManager(This, options_user);

            This.log('Manager ', This);
            return;
          });

      })

    } else {
      return;
    }

  }

  // Manager.prototype.subscribeToPushNotifications = function(options) {
  //   if ((typeof firebase.messaging !== 'undefined')) {
  //     return firebase.messaging().requestPermission()
  //       .then(() => checkSubscription())
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // }

  Manager.prototype.auth = function() {
    var This = this;
    var firebaseActive = typeof firebase !== 'undefined';
    function _displayError(msg) {
      This.dom().select('.auth-error-message-element').show().setInnerHTML(msg);
    }
    function _callback_signIn(error, user) {
      This.properties.options.auth.signIn(error, user);
    }
    function _callback_signUp(error, user) {
      This.properties.options.auth.signUp(error, user);
    }
    function _callback_signOut(error) {
      This.properties.options.auth.signOut(error);
    }
    function _callback_forgot(error) {
      This.properties.options.auth.forgot(error);
    }
    return {
      isAuthenticated: function () {
        return firebaseActive ? !!firebase.auth().currentUser : false;
      },
      getUser: function () {
        var defaultUser = {email: null, uid: null};
        return firebaseActive ? firebase.auth().currentUser || defaultUser : defaultUser;
      },
      ready: function (fn, options) {
        options = options || {};
        options.retryInterval = options.retryInterval || 100;
        // if ( (This.get('page.status.authReady', false) == false) ) {
        // Manager.log('--- authReady() REAL');
        if ( (utilities.get(This, 'properties.page.status.authReady', false) == false) ) {
          setTimeout(function () {
            This.auth().ready(fn, options);
          }, options.retryInterval);
        } else {
          // Performance
          This.performance().mark('manager_authReady');
          // This.log('--- authReady() REAL ***DONE***');
          return fn();
        }
      },
      signIn: function (method, email, password) {
        method = method || 'email';
        email = email || This.dom().select('.auth-email-input').getValue();
        password = password || This.dom().select('.auth-password-input').getValue();
        This.log('Signin attempt: ', method, email, password);
        if (method == 'email') {
          firebase.auth().signInWithEmailAndPassword(email, password)
          .then(function(credential) {
            _callback_signIn(false, credential.user);
            This.log('Good signin');
          })
          .catch(function(error) {
            _displayError(error.message);
            _callback_signIn(error);
            This.log('Error', error.message);
          });
        }
      },
      signUp: function(method, email, password, passwordConfirm) {
        method = method || 'email';
        email = email || This.dom().select('.auth-email-input').getValue();
        password = password || This.dom().select('.auth-password-input').getValue();
        passwordConfirm = passwordConfirm || This.dom().select('.auth-password-confirm-input').getValue();
        This.log('Signup attempt: ', method, email, password, passwordConfirm);
        if (method == 'email') {
          if (password == passwordConfirm) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(credential) {
              This.log('Good signup');
              _callback_signUp(false, credential.user);
            })
            .catch(function(error) {
              _displayError(error.message);
              This.log('error', error.message);
              _callback_signUp(error);
            });
          } else {
            _displayError("Passwords don't match.");
          }

        }

      },
      signOut: function() {
        // This.log('signOut()');
        // var This = this;
        firebase.auth().signOut()
        .then(function() {
          This.log('signOut success.');
          _callback_signOut(false);

        })
        .catch(function(error) {
          This.log('signOut failed: ', error);
          _callback_signOut(error);

        });
      },
      forgot: function(email) {
        // This.log('forgot()');
        email = email || This.dom().select('.auth-email-input').getValue();
        firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
          This.log('forgot success.');
          _callback_forgot();

        })
        .catch(function(error) {
          This.log('forgot failed: ', error);
          _displayError(error.message);
          _callback_forgot(error);
        });
      },

    }
  }

  Manager.prototype.notifications = function(options) {
    var supported = (typeof firebase.messaging !== 'undefined') && ('serviceWorker' in navigator);
    var This = this;
    var response = {
      status: 'success',
      // subscribed: false,
      // token: '',
      error: '',
    }
    return {
      subscribe: function () {
        This.log('subscribe()');
        return new Promise(function(resolve, reject) {
          firebase.messaging().requestPermission()
            .then(function () {
              This.notifications().checkSubscription()
                .then(function (response) {
                  resolve(response);
                })
                .catch(function (e) {
                  response.error = e;
                  response.status = 'fail';
                  reject(response);
                })
            })
            .catch(function (e) {
              response.error = e;
              response.subscribed = false;
              resolve(response);
            })
        })
      },
      checkSubscription: function () {
        This.log('checkSubscription()');
        return new Promise(function(resolve, reject) {
          firebase.messaging().getToken()
            .then(function (token) {
              if (token) {
                firebase.firestore().doc('notifications/subscriptions/all/' + token)
                  .get()
                  .then(function (documentSnapshot) {
                    if (documentSnapshot.exists == false) {
                      This.notifications().updateSubscription(token)
                      .then(function () {
                        This.log('Subscribe done!');
                        response.token = token;
                        response.subscribed = true;
                        resolve(response);
                      })
                      .catch(function (e) {
                        This.log(e);
                        response.error = e;
                        response.token = token;
                        response.subscribed = true;
                        resolve(response);
                      })
                    } else {
                      response.subscribed = true;
                      response.token = token;
                      resolve(response);
                      This.log('Already subscribed');
                    }
                  })
                  .catch(function(e) {
                    console.error(e);
                    response.error = e;
                    response.status = 'fail';
                    reject(response);
                  });
              } else {
                response.subscribed = false;
                resolve(response);
              }

            })
            .catch(function (e) {
              response.subscribed = false;
              response.error = e;
              resolve(response);
            })
        })

      },
      updateSubscription: function (token) {
        This.log('updateSubscription()');
        return new Promise(function(resolve, reject) {
          var currentUser = This.auth().getUser();
          var storedSub = This.storage().get('_subscription', '');
          var currentEmail = currentUser.email || '';
          var currentUid = currentUser.uid || '';

          // This.log('Stored = ', storedSub);
          // This.log('Trying = ', token);

          if (token && storedSub.token == token && storedSub.email == currentEmail) {
            // console.log('&&& 1');
            response.token = token;
            return resolve(response);
          } else if (!token) {
            // console.log('&&& 2');
            response.subscribed = false;
            return resolve(response);
            This.storage().set('_subscription', {email: currentEmail, token: token});
          }
          // console.log('&&& 3');
          firebase.firestore().doc('notifications/subscriptions/all/' + token)
            .set(
              {
                meta: {
                  dateSubscribed: {
                    timestamp: getDateTime(),
                    timestampUNIX: new Date().getTime(),
                  },
                },
                token: token,
                linked: {
                  user: {
                    timestampLastLinked: getDateTime(),
                    pk: currentEmail,
                    data: {
                      uid: currentUid,
                      email: currentEmail,
                    }
                  }
                },
                tags: ['general']
              },
              {
                merge: true
              }
            )
            .then(function() {
              This.log('Updated token: ', token);
              response.token = token;
              This.storage().set('_subscription', {email: currentEmail, token: token});
              resolve(response);
            })
            .catch(function(e) {
              console.error(e);
              response.error = e;
              response.status = 'fail';
              reject(response);
            });

        })
      }

    }
  }

  function handleTokenRefresh(This) {
    // console.log('&&&& TOKEN REFRESH', This);
    console.log('handleTokenRefresh()');
    return new Promise(function(resolve, reject) {
      firebase.messaging().getToken()
        .then(function(token) {
          // if (token) {
            This.notifications().updateSubscription(token)
            .then(function(e) {
              resolve();
            })
            .catch(function(e) {
              reject(e);
            });
          // } else {
          //   console.log('***3');
          //   reject();
          // }
        })
        .catch(function(e) {
          reject(e);
        });
    })
  }

  /*
  HELPERS
  */
  function subscriptionManager(This, options_user) {
    // if (('serviceWorker' in navigator) && (options_user.pushNotifications.enabled) && (typeof firebase.messaging !== 'undefined')) {
    if (('serviceWorker' in navigator) && (typeof firebase.messaging !== 'undefined')) {
      var swaddress = options_user.serviceWorker.path || 'master-service-worker.js';
      // service worker guide: https://developers.google.com/web/updates/2018/06/fresher-sw
      navigator.serviceWorker.register('/' + swaddress + '?config=' + encodeURIComponent(JSON.stringify({name: This.properties.global.brand.name, env: This.properties.meta.environment, v: This.properties.global.version, firebase: options_user.libraries.firebase_app.config})) )
      .then(function (registration) {
        firebase.messaging().useServiceWorker(registration);
        This.properties.references.serviceWorker = registration;
        // TODO: https://googlechrome.github.io/samples/service-worker/post-message/
        // --- leverage this example ^^^ for caching! It's grat and you can do one page at a time through postMessage!

        // function listenForWaitingServiceWorker(reg, callback) {
        //   function awaitStateChange() {
        //     reg.installing.addEventListener('statechange', function() {
        //       if (this.state === 'installed') callback(reg);
        //     });
        //   }
        //   if (!reg) return;
        //   if (reg.waiting) return callback(reg);
        //   if (reg.installing) awaitStateChange();
        //   reg.addEventListener('updatefound', awaitStateChange);
        // }
        //
        // // reload once when the new Service Worker starts activating
        // var refreshing;
        // navigator.serviceWorker.addEventListener('controllerchange',
        //   function() {
        //     if (refreshing) return;
        //     refreshing = true;
        //     window.location.reload();
        //   }
        // );
        // function promptUserToRefresh(reg) {
        //   // this is just an example
        //   // don't use window.confirm in real life; it's terrible
        //   if (window.confirm("New version available! OK to refresh?")) {
        //     reg.waiting.postMessage({command: 'skipWaiting'});
        //   }
        // }
        // listenForWaitingServiceWorker(registration, promptUserToRefresh);

        // registration.update();
        This.properties.page.status.masterSWRegistered = true;

        This.log('SW Registered.');
        firebase.messaging().onTokenRefresh(
          handleTokenRefresh(This)
          .catch(function (e) {
            console.error(e);
          })
        )


        if (options_user.pushNotifications.timeoutCheck > 0) {
          setTimeout(function () {
            This.notifications().subscribe()
            .catch(function (e) {
              console.error(e);
            });
          }, options_user.pushNotifications.timeoutCheck * 1000);
        }
      })
      .catch(function (e) {
        // console.log('***2');
        console.error(e);
      });

      // SW Ready
      // navigator.serviceWorker.ready.then(function(registration) {
      // });

    }
  }





  // function handleTokenRefresh(This) {
  //   return firebase.messaging().getToken()
  //     .then((token) => {
  //       if (token) {
  //         This.notifications().updateSubscription(token);
  //       } else {
  //         console.log('***3');
  //         console.error('Failed to get token');
  //       }
  //     })
  //     .catch(function(e) {
  //       console.log('***4');
  //       console.error(e);
  //     });
  // }

  // function updateSubscription(token) {
  //   console.log('updateSubscription()');
  //   return firebase.firestore().doc('notifications/subscriptions/all/' + token)
  //     .set(
  //       {
  //         dateSubscribed: {
  //           timestamp: getDateTime(),
  //           timestampUNIX: new Date().getTime(),
  //         },
  //         token: token,
  //         linked: {
  //           user: {
  //             timestampLastLinked: getDateTime(),
  //             data: {
  //               uid: (firebase.auth().currentUser ? firebase.auth().currentUser.uid : ''),
  //             }
  //           }
  //         },
  //         tags: ['general']
  //       },
  //       {
  //         merge: true
  //       }
  //     )
  //     .then(function() {
  //       window.Manager.log('Updated token: ', token);
  //     })
  //     .catch(function(e) {
  //       console.log('***5');
  //       console.error(e);
  //     });
  // }

  // function checkSubscription() {
  //   // console.log('checkSubscription()');
  //   // console.log('MANAGER!!!', Manager);
  //   // console.log('window.MANAGER!!!', window.Manager);
  //   return firebase.messaging().getToken()
  //     .then((token) => {
  //       if (token) {
  //         return firebase.firestore().doc('notifications/subscriptions/all/' + token)
  //           .get()
  //           .then(function (documentSnapshot) {
  //             if (documentSnapshot.exists == false) {
  //               window.Manager.log('Subscribing now');
  //               updateSubscription(token)
  //               .then(function () {
  //                 window.Manager.log('Subscribe done!');
  //               })
  //             } else {
  //               window.Manager.log('Already subscribed');
  //             }
  //           })
  //           .catch(function(e) {
  //             console.log('***6');
  //             console.error(e);
  //             return reject();
  //           });
  //       } else {
  //         console.log('***7');
  //         console.error('Failed to get token');
  //         return reject();
  //       }
  //     })
  //     .catch(function(e) {
  //       console.log('***8');
  //       console.error(e);
  //       return reject();
  //     });
  // }


  /*
  EXTERNAL LIBS
  */
  var load_firebase = function(This, options) {
    return new Promise(function(resolve) {
      if (typeof window.firebase !== 'undefined') {
        return resolve();
      }
      if (options.libraries.firebase_app.enabled == true) {
        Promise.all(/* require.ensure | firebase-app */[__webpack_require__.e(0), __webpack_require__.e(2)]).then((function() {
          window.firebase = __webpack_require__(9);
          window.app = firebase.initializeApp(options.libraries.firebase_app.config);
          This.log('Loaded Firebase.');
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
        .then(function() {
          Promise.all([
            load_firebase_auth(This, options),
            load_firebase_firestore(This, options),
            load_firebase_messaging(This, options),
          ])
          .then(function() {
            return resolve();
          });
         });
      } else {
        return resolve();
      }
    });
  }


  var load_firebase_auth = function(This, options) {
    return new Promise(function(resolve) {
      if (typeof utilities.get(window, 'firebase.auth', undefined) !== 'undefined') {
        return resolve();
      }
      if (options.libraries.firebase_auth.enabled == true) {
        Promise.all(/* require.ensure | firebase-auth */[__webpack_require__.e(0), __webpack_require__.e(6)]).then((function() {
          __webpack_require__(10);
          This.log('Loaded Firebase Auth.');
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
        .then(function() {
          return resolve();
        });
      } else {
        return resolve();
      }
    });
  }


  var load_firebase_firestore = function(This, options) {
    return new Promise(function(resolve) {
      if (typeof utilities.get(window, 'firebase.firestore', undefined) !== 'undefined') {
        return resolve();
      }
      if (options.libraries.firebase_firestore.enabled == true) {
        Promise.all(/* require.ensure | firebase-firestore */[__webpack_require__.e(0), __webpack_require__.e(7)]).then((function() {
          __webpack_require__(11);
          This.log('Loaded Firestore.');
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
        .then(function() {
          return resolve();
        });
      } else {
        return resolve();
      }
    });
  }

  var load_firebase_messaging = function(This, options) {
    return new Promise(function(resolve) {
      if (typeof utilities.get(window, 'firebase.messaging', undefined) !== 'undefined') {
        return resolve();
      }
      if (options.libraries.firebase_messaging.enabled == true) {
        Promise.all(/* require.ensure | firebase-messaging */[__webpack_require__.e(0), __webpack_require__.e(8)]).then((function() {
          __webpack_require__(15);
          This.log('Loaded Firebase Messaging.');
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
        .then(function() {
          return resolve();
        });
      } else {
        return resolve();
      }
    });
  }


  var load_lazysizes = function(This, options) {
    return new Promise(function(resolve) {
      if (typeof window.lazysizes !== 'undefined') {
        return resolve();
      }
      if (options.libraries.lazysizes.enabled == true) {
        __webpack_require__.e(/* require.ensure | lazysizes */ 3).then((function() {
          window.lazysizes = __webpack_require__(12);

          // configs come from official lazysizes demo
          var expand = Math.max(Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight, 1222) - 1, 359);
          window.lazySizesConfig = {
            loadMode: 1,
            expand: expand,
            expFactor: expand < 380 ? 3 : 2,
          };
          This.log('Loaded Lazysizes.');
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
        .then(function() {
          return resolve();
        });
      } else {
        return resolve();
      }
    });
  }

  var load_cookieconsent = function(This, options) {
    return new Promise(function(resolve) {
      if (typeof window.cookieconsent !== 'undefined') {
        return resolve();
      }
      if (options.libraries.cookieconsent.enabled == true) {
        __webpack_require__.e(/* require.ensure | cookieconsent */ 1).then((function() {
          __webpack_require__(13);
          window.cookieconsent.initialise(options.libraries.cookieconsent.config);
          This.log('Loaded Cookieconsent.');
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
        .then(function() {
          return resolve();
        });
      } else {
        return resolve();
      }

    });
  }

  var load_tawk = function(This, options) {
    return new Promise(function(resolve) {
      if (typeof window.Tawk_API !== 'undefined') {
        return resolve();
      }
      if (options.libraries.tawk.enabled == true) {
        window.Tawk_API = window.Tawk_API || {}, window.Tawk_LoadStart = new Date();
        This.dom().loadScript({src: 'https://embed.tawk.to/' + utilities.get(options, 'libraries.tawk.config.chatId', '') + '/default', crossorigin: true}, function() {
          This.log('Loaded tawk.');
          return resolve();
        });
      } else {
        return resolve();
      }
    });
  }

  var load_sentry = function(This, options) {
    return new Promise(function(resolve) {
      if (typeof window.Sentry !== 'undefined') {
        return resolve();
      }
      if (options.libraries.sentry.enabled == true) {
        __webpack_require__.e(/* require.ensure | @sentry/browser */ 5).then((function() {
          window.Sentry = __webpack_require__(14);
          var config = options.libraries.sentry.config;
          config.release = config.release + '@' + This.properties.global.version;
          config.environment = This.properties.meta.environment;
          Sentry.init(config);
          This.log('Loaded Sentry.');
          // This.log('Loaded @sentry/browser.', config);
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
        .then(function() {
          return resolve();
        });
      } else {
        return resolve();
      }
    });
  }

  Manager.prototype.log = function() {
    try {
      if (this.properties.meta.environment == 'development') {
        // 1. Convert args to a normal array
        var args = Array.prototype.slice.call(arguments);

        // 2. Prepend log prefix log string
        args.unshift('[DEV LOG]');

        // 3. Pass along arguments to console.log
        if (args[1] == 'error') {
          args.splice(1,1);
          console.error.apply(console, args);
        } else if (args[1] == 'warn') {
          args.splice(1,1);
          console.warn.apply(console, args);
        } else if (args[1] == 'log') {
          args.splice(1,1);
          console.log.apply(console, args);
        } else {
          console.log.apply(console, args);
        }
      }
    } catch (e) {

    }
  }

  // Manager.prototype.time = function(mode, name) {
  //   console.log('&&& called time ', mode, name);
  //   if (this.properties.meta.environment == 'development') {
  //     if (mode == 'start') {
  //       console.time(name);
  //     } else {
  //       console.timeEnd(name);
  //     }
  //   }
  // }

  function init_loadPolyfills(This, configuration, cb) {
    // console.log('POLY TEST', document.querySelectorAll);
    // https://github.com/jquintozamora/polyfill-io-feature-detection/blob/master/index.js
    var featuresDefault = (
      // (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]")) &&
      'Promise' in window &&
      Element.prototype.matches &&
      // 'startsWith' in String.prototype &&
      // 'endsWith' in String.prototype &&

      'includes' in Array.prototype &&
      'forEach' in Array.prototype &&
      'isArray' in Array &&

      'assign' in Object &&
      'keys' in Object &&

      'stringify' in JSON &&
      'parse' in JSON &&

      document.querySelectorAll &&
      document.querySelector &&

      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
      // (
      // !('IntersectionObserver' in window) ||
      // !('IntersectionObserverEntry' in window) ||
      // !('intersectionRatio' in window.IntersectionObserverEntry.prototype)
      // ) &&

      'HTMLPictureElement' in window &&
      'createEvent' in document &&
      'addEventListener' in window &&
      'localStorage' in window &&

      true
    )
    var featuresCustom = true;
    // for (var i = 0; i < options_user.initChecks.features.length; i++) {
    //   array[i]
    // }

    if (featuresDefault && featuresCustom) {
      cb();
    } else {
      This.dom().loadScript({src: 'https://polyfill.io/v3/polyfill.min.js?flags=always%2Cgated&features=default'}, function() {
        // console.log('%cLoaded polyfill.io.', 'font-weight: bold');
        cb();
      });
    }

  }

  /**
  * UTILITIES
  */
  Manager.prototype.utilities = function() {
    return utilities;
  }

  /**
  * STORAGE
  */
  Manager.prototype.storage = function() {
    return storage;
  }

  /**
  * QUERIES
  */
  Manager.prototype.query = function() {
    return query;
  }

  /**
  * DOM OPERATIONS
  */
  Manager.prototype.dom = function() {
    return dom;
  }
  Manager.prototype.ajax = function() {
    return ajax;
  }

  /**
  * OTHER
  */
  Manager.prototype.performance = function() {
    var supported = ('performance' in window);
    return {
      mark: function(mark) {
        if (!supported) {return};
        window.performance.mark(mark);
      }
    }
  }
  // Manager.prototype.performance = function() {
  //   var This = this;
  //
  //   return {
  //     mark2: function () {
  //       return firebaseActive ? !!firebase.auth().currentUser : false;
  //     },
  //
  //   }
  // }


  /**
  * HELPERS
  */
  function getDateTime(type) {
    var d = new Date;
    var date = zeroFill(d.getFullYear(),2)+'-'+zeroFill(d.getMonth()+1,2)+'-'+zeroFill(d.getDate(),2);
    var time = zeroFill(d.getHours(),2)+':'+zeroFill(d.getMinutes(),2)+':'+zeroFill(d.getSeconds(),2)+'Z';
    if (type == 'date') {
      return date;
    } else if (type == 'time') {
      return time;
    } else {
      return date+"T"+time;
    }
  }

  function zeroFill( number, width ) {
    width -= number.toString().length;
    if ( width > 0 )
    {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
  }

module.exports = Manager;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
  https://ultimatecourses.com/blog/writing-a-standalone-ajax-xhr-javascript-micro-library
  https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
  https://blog.garstasio.com/you-dont-need-jquery/ajax/
  https://gomakethings.com/ajax-and-apis-with-vanilla-javascript/
  https://gist.github.com/sgnl/bd760187214681cdb6dd
*/

function Ajax(reqObj) {
  this.request = reqObj;
}

var parse = function (req) {
  var result;
  try {
    result = JSON.parse(req.responseText);
  } catch (e) {
    result = req.responseText;
  }
  return [result, req];
};

Ajax.request = function(options) {
  options = options || {};
  options.type = options.type || 'POST';
  options.contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
  options.responseType = options.responseType || 'json';
  options.accept = options.accept || 'application/json, text/javascript, */*; q=0.01';
  options.responseType = options.responseType.toLowerCase();
  options.data = options.data || {};

  if (!options.url) {
    return;
  }

  var methods = {
    success: function () {},
    error: function () {},
    always: function () {}
  };
  var XHR = window.XMLHttpRequest || XMLHttpRequest || ActiveXObject;
  var request = new XHR('MSXML2.XMLHTTP.3.0');

  request.open(options.type, options.url, true);
  request.setRequestHeader('Content-type', options.contentType);
  request.setRequestHeader('Accept', options.accept);
  // var req;
  request.onreadystatechange = function () {
    var req;
    if (request.readyState === 4) {
      req = parse(request);
      if (request.status >= 200 && request.status < 300) {
        methods.success.call(methods, request, request.status, req[0]);
      } else {
        methods.error.call(methods, request, request.status, request.statusText);
      }
      methods.always.call(methods, request, request.status);

    }
  };
  if ((options.contentType.indexOf('json') > -1)) {
    try {
      options.data = JSON.stringify(options.data);
    } catch (e) {
      console.error(e);
    }
  }
  request.send(options.data);
  var atomXHR = {
    success: function (callback) {
      methods.success = callback;
      return atomXHR;
    },
    error: function (callback) {
      methods.error = callback;
      return atomXHR;
    },
    always: function (callback) {
      methods.always = callback;
      return atomXHR;
    }
  };

  return atomXHR;

}

// Ajax.prototype.success = function(fn) {
//   const reqObj = Object.assign({}, this.request);
//   if (this.request.status >= 200 && this.request.status < 300) {
//     fn(this.request.req, this.request.status, this.request.req);
//   }
//   return new Ajax(reqObj);
// };
//
// Ajax.prototype.error = function(fn) {
//   const reqObj = Object.assign({}, this.request);
//   if (this.request.status < 200 || this.request.status >= 300) {
//     fn(this.request.req, this.request.status, this.request.req);
//   }
//   return new Ajax(reqObj);
// };
//
// Ajax.prototype.always = function(fn) {
//   const reqObj = Object.assign({}, this.request);
//   fn(this.request.req, this.request.status);
//   return new Ajax(reqObj);
// };

module.exports = Ajax;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
https://gist.github.com/joyrexus/7307312

JQUERY vs vanilla
https://github.com/nefe/You-Dont-Need-jDom#dom-manipulation

queryselector polyfill
https://gist.github.com/chrisjlee/8960575
* https://github.com/mtsyganov/queryselector-polyfill/blob/master/index.js

*/


function Dom(elObj) {
  this.elements = elObj;
}

function _forEach(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

Dom.prototype.addClass = function(name) {
  var elsObj = Object.assign({}, this.elements);
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    elsObj.list[i].classList.add(name);
  }
  return new Dom(elsObj);
}

Dom.prototype.removeClass = function(name) {
  var elsObj = Object.assign({}, this.elements);
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    elsObj.list[i].classList.remove(name);
  }
  return new Dom(elsObj);
}

Dom.prototype.hide = function(options) {
  var elsObj = Object.assign({}, this.elements);
  options = options || {};
  options.type = options.type || 'display' /* display, visibility, both*/
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    if (options.type == 'visibility') {
      elsObj.list[i].style.visibility = 'hidden';
    } else if (options.type == 'display') {
      elsObj.list[i].style.display = 'none';
      elsObj.list[i].setAttribute('hidden', true);
      elsObj.list[i].classList.add('hidden');
    } else {
      elsObj.list[i].style.visibility = 'hidden';
      elsObj.list[i].style.display = 'none';
      elsObj.list[i].setAttribute('hidden', true);
      elsObj.list[i].classList.add('hidden');

    }
  }
  return new Dom(elsObj);
}

Dom.prototype.show = function(options) {
  var elsObj = Object.assign({}, this.elements);
  options = options || {};
  options.type = options.type || 'display' /* display, visibility, both*/
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    if (options.type == 'visibility') {
      elsObj.list[i].style.visibility = 'visible';
    } else if (options.type == 'display') {
      elsObj.list[i].style.display = 'block';
      // elsObj.list[i].setAttribute('hidden', false);
      elsObj.list[i].removeAttribute('hidden');
      elsObj.list[i].classList.remove('hidden');
    } else {
      elsObj.list[i].style.visibility = 'visible';
      elsObj.list[i].style.display = 'block';
      // elsObj.list[i].setAttribute('hidden', false);
      elsObj.list[i].removeAttribute('hidden');
      elsObj.list[i].classList.remove('hidden');
    }
  }
  return new Dom(elsObj);
}

Dom.prototype.getAttribute = function(name, options) {
  var elsObj = Object.assign({}, this.elements);
  options = options || {};
  var r;
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    r = elsObj.list[i].getAttribute(name);
  }
  return r;
}

Dom.prototype.setAttribute = function(name, value, options) {
  var elsObj = Object.assign({}, this.elements);
  options = options || {};
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    elsObj.list[i].setAttribute(name, value);
  }
  return new Dom(elsObj);
}

Dom.prototype.removeAttribute = function(name, options) {
  var elsObj = Object.assign({}, this.elements);
  options = options || {};
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    elsObj.list[i].setAttribute(name, 'DELETE');
    elsObj.list[i].removeAttribute(name);
  }
  return new Dom(elsObj);
}

Dom.prototype.getValue = function(options) {
  options = options || {};
  options.returnType = options.returnType || 'single';
  var r;
  var elsObj = Object.assign({}, this.elements);
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    if ((elsObj.list[i].type == 'checkbox') ) {
      if (elsObj.list.length < 1) {
        r = elsObj.list[i].checked;
      } else {
        if (options.returnType == 'array') {
          r = (r) ? r : [];
          r.push([elsObj.list[i].value, elsObj.list[i].checked])
        } else if (options.returnType == 'object') {
          r = (r) ? r : {};
          r[elsObj.list[i].value] = elsObj.list[i].checked;
        } else {
          r = elsObj.list[i].checked
        }
      }
      break;
    } else if (elsObj.list[i].type == 'radio') {
      if (options.returnType == 'array') {
        r = (r) ? r : [];
        r.push([elsObj.list[i].value, elsObj.list[i].checked])
      } else if (options.returnType == 'object') {
        r = (r) ? r : {};
        r[elsObj.list[i].value] = elsObj.list[i].checked;
      } else {
        if (elsObj.list[i].checked) {
          r = elsObj.list[i].value;
          break;
        }
      }
    } else {
      r = elsObj.list[i].value;
      break;
    }
  }
  return r;
}

Dom.prototype.setValue = function(value, options) {
  options = options || {};
  options.returnType = options.returnType || 'single';
  var elsObj = Object.assign({}, this.elements);
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    if (elsObj.list[i].type == 'checkbox') {
      elsObj.list[i].checked = !!value;
    } else if (elsObj.list[i].type == 'radio') {
      elsObj.list[i].checked = !!value;
    } else {
      elsObj.list[i].value = value;
    }
  }
  return new Dom(elsObj);
}

Dom.prototype.setInnerHTML = function(html, options) {
  options = options || {};
  var elsObj = Object.assign({}, this.elements);
  // console.log('SET ', this);
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    elsObj.list[i].innerHTML = html;
  }
  return new Dom(elsObj);
}

Dom.prototype.each = function(fn, options) {
  options = options || {};
  var elsObj = Object.assign({}, this.elements);
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    fn(i, elsObj.list[i]);
  }
  return new Dom(elsObj);
}

Dom.prototype.on = function(evt, fn) {
  var elsObj = Object.assign({}, this.elements);
  for (var i = 0; i < elsObj.count; i++) {
    if (!elsObj.list[i]) { continue; }
    if (document.addEventListener) { // W3C model
        elsObj.list[i].addEventListener(evt, fn, false);
        return true;
    } else if (document.attachEvent) { // Microsoft model
        return elsObj.list[i].attachEvent('on' + evt, fn);
    }
  }
  return new Dom(elsObj);
};

Dom.prototype.get = function(index) {
  return (index || 0 <= this.elements.count) ? this.elements.list[index || 0] : null;
}

Dom.prototype.exists = function() {
  return (this.elements.exists);
}

Dom.loadScript = function(options, callback) {
  options = options || {};
  options.async = (typeof options.async === 'undefined') ? false : options.async;
  options.crossorigin = (typeof options.crossorigin === 'undefined') ? false : options.crossorigin;
  var s = document.createElement('script');
  s.src = options.src;
  s.async = options.async;
  if (options.crossorigin) {
    s.setAttribute('crossorigin','*');
  }
  s.onload = function() {
    callback();
  };
  s.onerror = function() {
    callback(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(s);
}

Dom.checkDOMContentLoaded = function(win, fn) {
  var done = false, top = true,

  doc = win.document,
  root = doc.documentElement,
  modern = doc.addEventListener,

  add = modern ? 'addEventListener' : 'attachEvent',
  rem = modern ? 'removeEventListener' : 'detachEvent',
  pre = modern ? '' : 'on',

  init = function(e) {
    if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) fn.call(win, e.type || e);
  },

  poll = function() {
    try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
    init('poll');
  };

  if (doc.readyState == 'complete') fn.call(win, 'lazy');
  else {
    if (!modern && root.doScroll) {
      try { top = !win.frameElement; } catch(e) { }
      if (top) poll();
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }

}



// Dom.on = function(fn) {
//   var done = false, top = true,
//   win = window,
//   doc = win.document,
//   root = doc.documentElement,
//   modern = doc.addEventListener,
//
//   add = modern ? 'addEventListener' : 'attachEvent',
//   rem = modern ? 'removeEventListener' : 'detachEvent',
//   pre = modern ? '' : 'on',
//
//   init = function(e) {
//     if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
//     (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
//     if (!done && (done = true)) fn.call(win, e.type || e);
//   },
//
//   poll = function() {
//     try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
//     init('poll');
//   };
//
//   if (doc.readyState == 'complete') fn.call(win, 'lazy');
//   else {
//     if (!modern && root.doScroll) {
//       try { top = !win.frameElement; } catch(e) { }
//       if (top) poll();
//     }
//     doc[add](pre + 'DOMContentLoaded', init, false);
//     doc[add](pre + 'readystatechange', init, false);
//     win[add](pre + 'load', init, false);
//   }
//
// }

Dom.select = function(selector, options) {
  options = options || {};
  var elems = (typeof selector === 'string') ? document.querySelectorAll(selector) : [selector];
  var r = [];

  _forEach(elems, function (index, value) {
    r.push(value);
  });

  return new Dom({
    // elements: {
      list: r,
      count: r.length,
      exists: (r.length > 0),
    // },
  });
}

module.exports = Dom;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
  https://github.com/medialize/URI.js/blob/gh-pages/src/URI.js

  https://github.com/ljharb/qs
  https://github.com/medialize/URI.js


  static METHODS
  https://stackoverflow.com/questions/1535631/static-variables-in-javascript

*/

// const polyfill = require('./polyfills.js');

function Query(queryObj) {
  this.query = queryObj;
  constructQueryString(this);
}


Query.prototype.set = function(name, value) {
  var queryObj = Object.assign({}, this.query);
  queryObj.constructed.parameters[name] = value;
  queryObj.constructed.exists = (Object.keys(queryObj.constructed.parameters).length > 0);
  return new Query(queryObj);
}

Query.prototype.remove = function(name) {
  var queryObj = Object.assign({}, this.query);
  delete queryObj.constructed.parameters[name];
  queryObj.constructed.exists = (Object.keys(queryObj.constructed.parameters).length > 0);
  return new Query(queryObj);
}

Query.prototype.removeAll = function(name) {
  var queryObj = Object.assign({}, this.query);
  queryObj.constructed.parameters = {};
  queryObj.constructed.exists = false;
  return new Query(queryObj);
}

Query.prototype.get = function(name, def) {
  // return new Query(this.query.constructed.parameters[name]);
  return (this.query.constructed.parameters[name] || def);
}

Query.prototype.getAll = function() {
  // return new Query(this.query.constructed.parameters);
  return (this.query.constructed.parameters);
}

Query.prototype.getUrl = function() {
  // return new Query(this.query.constructed.parameters[name]);
  return (this.query.constructed.url);
}

Query.prototype.exists = function() {
  // return new Query(this.query.constructed.parameters[name]);
  return (this.query.constructed.exists);
}


Query.create = function(url, options) {
  options = options || {};
  options.decode = (typeof options.decode !== 'undefined') ? options.decode : true;
  url = url.replace(/amp;/g,"");
  url = (options.decode === true) ? decodeURIComponent(url) : url;
  var urlPlain = url.split('?')[0] || url;
  var t_params = getParameters(url);
  return new Query({
    original: {
      url: url,
      urlPlain: urlPlain,
      options: options || {},
    },
    constructed: {
      parameters: t_params,
      url: '',
      exists: (Object.keys(t_params).length > 0),
    },
  });
}

module.exports = Query;

function getParameters(url) {
  var params = {}, queries, temp, i, l;
  // queries = url.split('?')[1].split('&') || [];
  queries = url.split('?')[1];
  queries = (queries) ? queries.split('&') : [];
  for ( i = 0, l = queries.length; i < l; i++ ) {
    temp = queries[i].split('=');
    params[temp[0]] = temp[1];
    // params[temp[0]] = (typeof temp[1] !== 'undefined') ? temp[1].replace(/\+/g, ' ') : "";
  };
  return params;
}

function constructQueryString(obj) {
  obj.query.constructed.url = obj.query.original.urlPlain;
  var i = 0;
  for (var key in obj.query.constructed.parameters) {
    var url = obj.query.constructed.url;
    var value = obj.query.constructed.parameters[key];
    obj.query.constructed.url = url + (i == 0 ? '?' : '&') + key + '=' + value;
    i++;
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
*/
var utilities = __webpack_require__(0);
var support;

function Storage(storageObj) {
  this.storage = storageObj;
}

Storage.get = function(path, def, options) {
  var result;
  path = path || '';
  // def = def || undefined;
  try {
    // result = (typeof Storage !== 'undefined') ? utilities.get(JSON.parse(window.localStorage.getItem('managerRoot')) || {}, path, def) : def;
    result = utilities.get(JSON.parse(window.localStorage.getItem('_manager')) || {}, path, def);
  } catch (e) {
    result = def;
  }
  return result;
}

Storage.set = function(path, value, options) {
  // if (typeof Storage !== 'undefined') { return };
  var existing;
  try {
    existing = Storage.get('', {});
    utilities.set(existing, path, value);
    window.localStorage.setItem('_manager', JSON.stringify(existing));
  } catch (e) {

  }
  return existing;
}

Storage.clear = function(options) {
  // options = options || {};
  // options.type = options.type || 'manager';
  // if (typeof Storage !== 'undefined') { return };
  // if (options.type == 'manager') {
  try {
    window.localStorage.setItem('_manager', '{}');
  } catch (e) {

  }
  // } else {
  //   window.localStorage.clear();
  // }
}

module.exports = Storage;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

Manager.ready(function() {
  Manager.log('app.js fired Manager.ready()');

  // Add additional logic here!
  // var theme = require('../theme/theme.js');

});


/***/ })
/******/ ]);