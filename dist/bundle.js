var MyBundle = (function (require$$1) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var olosagentsdk_umd = {exports: {}};

	var axios$2 = {exports: {}};

	var bind$2 = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};

	var bind$1 = bind$2;

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is a Buffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Buffer, otherwise false
	 */
	function isBuffer(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
	    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a plain Object
	 *
	 * @param {Object} val The value to test
	 * @return {boolean} True if value is a plain Object, otherwise false
	 */
	function isPlainObject(val) {
	  if (toString.call(val) !== '[object Object]') {
	    return false;
	  }

	  var prototype = Object.getPrototypeOf(val);
	  return prototype === null || prototype === Object.prototype;
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
	                                           navigator.product === 'NativeScript' ||
	                                           navigator.product === 'NS')) {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (isPlainObject(result[key]) && isPlainObject(val)) {
	      result[key] = merge(result[key], val);
	    } else if (isPlainObject(val)) {
	      result[key] = merge({}, val);
	    } else if (isArray(val)) {
	      result[key] = val.slice();
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind$1(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	/**
	 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	 *
	 * @param {string} content with BOM
	 * @return {string} content value without BOM
	 */
	function stripBOM(content) {
	  if (content.charCodeAt(0) === 0xFEFF) {
	    content = content.slice(1);
	  }
	  return content;
	}

	var utils$d = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isPlainObject: isPlainObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim,
	  stripBOM: stripBOM
	};

	var utils$c = utils$d;

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	var buildURL$2 = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils$c.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils$c.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils$c.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }

	      utils$c.forEach(val, function parseValue(v) {
	        if (utils$c.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils$c.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    var hashmarkIndex = url.indexOf('#');
	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }

	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};

	var utils$b = utils$d;

	function InterceptorManager$1() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected,
	    synchronous: options ? options.synchronous : false,
	    runWhen: options ? options.runWhen : null
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager$1.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager$1.prototype.forEach = function forEach(fn) {
	  utils$b.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	var InterceptorManager_1 = InterceptorManager$1;

	var utils$a = utils$d;

	var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
	  utils$a.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	var enhanceError$2 = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }

	  error.request = request;
	  error.response = response;
	  error.isAxiosError = true;

	  error.toJSON = function toJSON() {
	    return {
	      // Standard
	      message: this.message,
	      name: this.name,
	      // Microsoft
	      description: this.description,
	      number: this.number,
	      // Mozilla
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      columnNumber: this.columnNumber,
	      stack: this.stack,
	      // Axios
	      config: this.config,
	      code: this.code
	    };
	  };
	  return error;
	};

	var enhanceError$1 = enhanceError$2;

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	var createError$2 = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError$1(error, config, code, request, response);
	};

	var createError$1 = createError$2;

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	var settle$1 = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError$1(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};

	var utils$9 = utils$d;

	var cookies$1 = (
	  utils$9.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	    (function standardBrowserEnv() {
	      return {
	        write: function write(name, value, expires, path, domain, secure) {
	          var cookie = [];
	          cookie.push(name + '=' + encodeURIComponent(value));

	          if (utils$9.isNumber(expires)) {
	            cookie.push('expires=' + new Date(expires).toGMTString());
	          }

	          if (utils$9.isString(path)) {
	            cookie.push('path=' + path);
	          }

	          if (utils$9.isString(domain)) {
	            cookie.push('domain=' + domain);
	          }

	          if (secure === true) {
	            cookie.push('secure');
	          }

	          document.cookie = cookie.join('; ');
	        },

	        read: function read(name) {
	          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	          return (match ? decodeURIComponent(match[3]) : null);
	        },

	        remove: function remove(name) {
	          this.write(name, '', Date.now() - 86400000);
	        }
	      };
	    })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return {
	        write: function write() {},
	        read: function read() { return null; },
	        remove: function remove() {}
	      };
	    })()
	);

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	var isAbsoluteURL$1 = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};

	var isAbsoluteURL = isAbsoluteURL$1;
	var combineURLs = combineURLs$1;

	/**
	 * Creates a new URL by combining the baseURL with the requestedURL,
	 * only when the requestedURL is not already an absolute URL.
	 * If the requestURL is absolute, this function returns the requestedURL untouched.
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} requestedURL Absolute or relative URL to combine
	 * @returns {string} The combined full path
	 */
	var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
	  if (baseURL && !isAbsoluteURL(requestedURL)) {
	    return combineURLs(baseURL, requestedURL);
	  }
	  return requestedURL;
	};

	var utils$8 = utils$d;

	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	var parseHeaders$1 = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils$8.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils$8.trim(line.substr(0, i)).toLowerCase();
	    val = utils$8.trim(line.substr(i + 1));

	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });

	  return parsed;
	};

	var utils$7 = utils$d;

	var isURLSameOrigin$1 = (
	  utils$7.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	    (function standardBrowserEnv() {
	      var msie = /(msie|trident)/i.test(navigator.userAgent);
	      var urlParsingNode = document.createElement('a');
	      var originURL;

	      /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	      function resolveURL(url) {
	        var href = url;

	        if (msie) {
	        // IE needs attribute set twice to normalize properties
	          urlParsingNode.setAttribute('href', href);
	          href = urlParsingNode.href;
	        }

	        urlParsingNode.setAttribute('href', href);

	        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	        return {
	          href: urlParsingNode.href,
	          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	          host: urlParsingNode.host,
	          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	          hostname: urlParsingNode.hostname,
	          port: urlParsingNode.port,
	          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	            urlParsingNode.pathname :
	            '/' + urlParsingNode.pathname
	        };
	      }

	      originURL = resolveURL(window.location.href);

	      /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	      return function isURLSameOrigin(requestURL) {
	        var parsed = (utils$7.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	        return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	      };
	    })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return function isURLSameOrigin() {
	        return true;
	      };
	    })()
	);

	var utils$6 = utils$d;
	var settle = settle$1;
	var cookies = cookies$1;
	var buildURL$1 = buildURL$2;
	var buildFullPath = buildFullPath$1;
	var parseHeaders = parseHeaders$1;
	var isURLSameOrigin = isURLSameOrigin$1;
	var createError = createError$2;

	var xhr = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	    var responseType = config.responseType;

	    if (utils$6.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    var fullPath = buildFullPath(config.baseURL, config.url);
	    request.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    function onloadend() {
	      if (!request) {
	        return;
	      }
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
	        request.responseText : request.response;
	      var response = {
	        data: responseData,
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    }

	    if ('onloadend' in request) {
	      // Use onloadend if available
	      request.onloadend = onloadend;
	    } else {
	      // Listen for ready state to emulate onloadend
	      request.onreadystatechange = function handleLoad() {
	        if (!request || request.readyState !== 4) {
	          return;
	        }

	        // The request errored out and we didn't get a response, this will be
	        // handled by onerror instead
	        // With one exception: request that using file: protocol, most browsers
	        // will return status as 0 even though it's a successful request
	        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	          return;
	        }
	        // readystate handler is calling before onerror or ontimeout handlers,
	        // so we should call onloadend on the next 'tick'
	        setTimeout(onloadend);
	      };
	    }

	    // Handle browser request cancellation (as opposed to a manual cancellation)
	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }

	      reject(createError('Request aborted', config, 'ECONNABORTED', request));

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
	      if (config.timeoutErrorMessage) {
	        timeoutErrorMessage = config.timeoutErrorMessage;
	      }
	      reject(createError(
	        timeoutErrorMessage,
	        config,
	        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils$6.isStandardBrowserEnv()) {
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils$6.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (!utils$6.isUndefined(config.withCredentials)) {
	      request.withCredentials = !!config.withCredentials;
	    }

	    // Add responseType to request if needed
	    if (responseType && responseType !== 'json') {
	      request.responseType = config.responseType;
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (!requestData) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	var utils$5 = utils$d;
	var normalizeHeaderName = normalizeHeaderName$1;
	var enhanceError = enhanceError$2;

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils$5.isUndefined(headers) && utils$5.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = xhr;
	  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
	    // For node use HTTP adapter
	    adapter = xhr;
	  }
	  return adapter;
	}

	function stringifySafely(rawValue, parser, encoder) {
	  if (utils$5.isString(rawValue)) {
	    try {
	      (parser || JSON.parse)(rawValue);
	      return utils$5.trim(rawValue);
	    } catch (e) {
	      if (e.name !== 'SyntaxError') {
	        throw e;
	      }
	    }
	  }

	  return (encoder || JSON.stringify)(rawValue);
	}

	var defaults$3 = {

	  transitional: {
	    silentJSONParsing: true,
	    forcedJSONParsing: true,
	    clarifyTimeoutError: false
	  },

	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Accept');
	    normalizeHeaderName(headers, 'Content-Type');

	    if (utils$5.isFormData(data) ||
	      utils$5.isArrayBuffer(data) ||
	      utils$5.isBuffer(data) ||
	      utils$5.isStream(data) ||
	      utils$5.isFile(data) ||
	      utils$5.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils$5.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils$5.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils$5.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
	      setContentTypeIfUnset(headers, 'application/json');
	      return stringifySafely(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    var transitional = this.transitional;
	    var silentJSONParsing = transitional && transitional.silentJSONParsing;
	    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
	    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

	    if (strictJSONParsing || (forcedJSONParsing && utils$5.isString(data) && data.length)) {
	      try {
	        return JSON.parse(data);
	      } catch (e) {
	        if (strictJSONParsing) {
	          if (e.name === 'SyntaxError') {
	            throw enhanceError(e, this, 'E_JSON_PARSE');
	          }
	          throw e;
	        }
	      }
	    }

	    return data;
	  }],

	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,
	  maxBodyLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults$3.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils$5.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults$3.headers[method] = {};
	});

	utils$5.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults$3.headers[method] = utils$5.merge(DEFAULT_CONTENT_TYPE);
	});

	var defaults_1 = defaults$3;

	var utils$4 = utils$d;
	var defaults$2 = defaults_1;

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	var transformData$1 = function transformData(data, headers, fns) {
	  var context = this || defaults$2;
	  /*eslint no-param-reassign:0*/
	  utils$4.forEach(fns, function transform(fn) {
	    data = fn.call(context, data, headers);
	  });

	  return data;
	};

	var isCancel$1 = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};

	var utils$3 = utils$d;
	var transformData = transformData$1;
	var isCancel = isCancel$1;
	var defaults$1 = defaults_1;

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	var dispatchRequest$1 = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData.call(
	    config,
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils$3.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers
	  );

	  utils$3.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults$1.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData.call(
	      config,
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData.call(
	          config,
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};

	var utils$2 = utils$d;

	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	var mergeConfig$2 = function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  var config = {};

	  var valueFromConfig2Keys = ['url', 'method', 'data'];
	  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
	  var defaultToConfig2Keys = [
	    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
	    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
	    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
	    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
	    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
	  ];
	  var directMergeKeys = ['validateStatus'];

	  function getMergedValue(target, source) {
	    if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
	      return utils$2.merge(target, source);
	    } else if (utils$2.isPlainObject(source)) {
	      return utils$2.merge({}, source);
	    } else if (utils$2.isArray(source)) {
	      return source.slice();
	    }
	    return source;
	  }

	  function mergeDeepProperties(prop) {
	    if (!utils$2.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (!utils$2.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  }

	  utils$2.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
	    if (!utils$2.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    }
	  });

	  utils$2.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

	  utils$2.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
	    if (!utils$2.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    } else if (!utils$2.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });

	  utils$2.forEach(directMergeKeys, function merge(prop) {
	    if (prop in config2) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (prop in config1) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });

	  var axiosKeys = valueFromConfig2Keys
	    .concat(mergeDeepPropertiesKeys)
	    .concat(defaultToConfig2Keys)
	    .concat(directMergeKeys);

	  var otherKeys = Object
	    .keys(config1)
	    .concat(Object.keys(config2))
	    .filter(function filterAxiosKeys(key) {
	      return axiosKeys.indexOf(key) === -1;
	    });

	  utils$2.forEach(otherKeys, mergeDeepProperties);

	  return config;
	};

	var name = "axios";
	var version = "0.21.4";
	var description = "Promise based HTTP client for the browser and node.js";
	var main = "index.js";
	var scripts = {
		test: "grunt test",
		start: "node ./sandbox/server.js",
		build: "NODE_ENV=production grunt build",
		preversion: "npm test",
		version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
		postversion: "git push && git push --tags",
		examples: "node ./examples/server.js",
		coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
		fix: "eslint --fix lib/**/*.js"
	};
	var repository = {
		type: "git",
		url: "https://github.com/axios/axios.git"
	};
	var keywords = [
		"xhr",
		"http",
		"ajax",
		"promise",
		"node"
	];
	var author = "Matt Zabriskie";
	var license = "MIT";
	var bugs = {
		url: "https://github.com/axios/axios/issues"
	};
	var homepage = "https://axios-http.com";
	var devDependencies = {
		coveralls: "^3.0.0",
		"es6-promise": "^4.2.4",
		grunt: "^1.3.0",
		"grunt-banner": "^0.6.0",
		"grunt-cli": "^1.2.0",
		"grunt-contrib-clean": "^1.1.0",
		"grunt-contrib-watch": "^1.0.0",
		"grunt-eslint": "^23.0.0",
		"grunt-karma": "^4.0.0",
		"grunt-mocha-test": "^0.13.3",
		"grunt-ts": "^6.0.0-beta.19",
		"grunt-webpack": "^4.0.2",
		"istanbul-instrumenter-loader": "^1.0.0",
		"jasmine-core": "^2.4.1",
		karma: "^6.3.2",
		"karma-chrome-launcher": "^3.1.0",
		"karma-firefox-launcher": "^2.1.0",
		"karma-jasmine": "^1.1.1",
		"karma-jasmine-ajax": "^0.1.13",
		"karma-safari-launcher": "^1.0.0",
		"karma-sauce-launcher": "^4.3.6",
		"karma-sinon": "^1.0.5",
		"karma-sourcemap-loader": "^0.3.8",
		"karma-webpack": "^4.0.2",
		"load-grunt-tasks": "^3.5.2",
		minimist: "^1.2.0",
		mocha: "^8.2.1",
		sinon: "^4.5.0",
		"terser-webpack-plugin": "^4.2.3",
		typescript: "^4.0.5",
		"url-search-params": "^0.10.0",
		webpack: "^4.44.2",
		"webpack-dev-server": "^3.11.0"
	};
	var browser = {
		"./lib/adapters/http.js": "./lib/adapters/xhr.js"
	};
	var jsdelivr = "dist/axios.min.js";
	var unpkg = "dist/axios.min.js";
	var typings = "./index.d.ts";
	var dependencies = {
		"follow-redirects": "^1.14.0"
	};
	var bundlesize = [
		{
			path: "./dist/axios.min.js",
			threshold: "5kB"
		}
	];
	var require$$0 = {
		name: name,
		version: version,
		description: description,
		main: main,
		scripts: scripts,
		repository: repository,
		keywords: keywords,
		author: author,
		license: license,
		bugs: bugs,
		homepage: homepage,
		devDependencies: devDependencies,
		browser: browser,
		jsdelivr: jsdelivr,
		unpkg: unpkg,
		typings: typings,
		dependencies: dependencies,
		bundlesize: bundlesize
	};

	var pkg = require$$0;

	var validators$1 = {};

	// eslint-disable-next-line func-names
	['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
	  validators$1[type] = function validator(thing) {
	    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
	  };
	});

	var deprecatedWarnings = {};
	var currentVerArr = pkg.version.split('.');

	/**
	 * Compare package versions
	 * @param {string} version
	 * @param {string?} thanVersion
	 * @returns {boolean}
	 */
	function isOlderVersion(version, thanVersion) {
	  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
	  var destVer = version.split('.');
	  for (var i = 0; i < 3; i++) {
	    if (pkgVersionArr[i] > destVer[i]) {
	      return true;
	    } else if (pkgVersionArr[i] < destVer[i]) {
	      return false;
	    }
	  }
	  return false;
	}

	/**
	 * Transitional option validator
	 * @param {function|boolean?} validator
	 * @param {string?} version
	 * @param {string} message
	 * @returns {function}
	 */
	validators$1.transitional = function transitional(validator, version, message) {
	  var isDeprecated = version && isOlderVersion(version);

	  function formatMessage(opt, desc) {
	    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
	  }

	  // eslint-disable-next-line func-names
	  return function(value, opt, opts) {
	    if (validator === false) {
	      throw new Error(formatMessage(opt, ' has been removed in ' + version));
	    }

	    if (isDeprecated && !deprecatedWarnings[opt]) {
	      deprecatedWarnings[opt] = true;
	      // eslint-disable-next-line no-console
	      console.warn(
	        formatMessage(
	          opt,
	          ' has been deprecated since v' + version + ' and will be removed in the near future'
	        )
	      );
	    }

	    return validator ? validator(value, opt, opts) : true;
	  };
	};

	/**
	 * Assert object's properties type
	 * @param {object} options
	 * @param {object} schema
	 * @param {boolean?} allowUnknown
	 */

	function assertOptions(options, schema, allowUnknown) {
	  if (typeof options !== 'object') {
	    throw new TypeError('options must be an object');
	  }
	  var keys = Object.keys(options);
	  var i = keys.length;
	  while (i-- > 0) {
	    var opt = keys[i];
	    var validator = schema[opt];
	    if (validator) {
	      var value = options[opt];
	      var result = value === undefined || validator(value, opt, options);
	      if (result !== true) {
	        throw new TypeError('option ' + opt + ' must be ' + result);
	      }
	      continue;
	    }
	    if (allowUnknown !== true) {
	      throw Error('Unknown option ' + opt);
	    }
	  }
	}

	var validator$1 = {
	  isOlderVersion: isOlderVersion,
	  assertOptions: assertOptions,
	  validators: validators$1
	};

	var utils$1 = utils$d;
	var buildURL = buildURL$2;
	var InterceptorManager = InterceptorManager_1;
	var dispatchRequest = dispatchRequest$1;
	var mergeConfig$1 = mergeConfig$2;
	var validator = validator$1;

	var validators = validator.validators;
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios$1(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios$1.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = arguments[1] || {};
	    config.url = arguments[0];
	  } else {
	    config = config || {};
	  }

	  config = mergeConfig$1(this.defaults, config);

	  // Set config.method
	  if (config.method) {
	    config.method = config.method.toLowerCase();
	  } else if (this.defaults.method) {
	    config.method = this.defaults.method.toLowerCase();
	  } else {
	    config.method = 'get';
	  }

	  var transitional = config.transitional;

	  if (transitional !== undefined) {
	    validator.assertOptions(transitional, {
	      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
	      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
	      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
	    }, false);
	  }

	  // filter out skipped interceptors
	  var requestInterceptorChain = [];
	  var synchronousRequestInterceptors = true;
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
	      return;
	    }

	    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

	    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  var responseInterceptorChain = [];
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  var promise;

	  if (!synchronousRequestInterceptors) {
	    var chain = [dispatchRequest, undefined];

	    Array.prototype.unshift.apply(chain, requestInterceptorChain);
	    chain = chain.concat(responseInterceptorChain);

	    promise = Promise.resolve(config);
	    while (chain.length) {
	      promise = promise.then(chain.shift(), chain.shift());
	    }

	    return promise;
	  }


	  var newConfig = config;
	  while (requestInterceptorChain.length) {
	    var onFulfilled = requestInterceptorChain.shift();
	    var onRejected = requestInterceptorChain.shift();
	    try {
	      newConfig = onFulfilled(newConfig);
	    } catch (error) {
	      onRejected(error);
	      break;
	    }
	  }

	  try {
	    promise = dispatchRequest(newConfig);
	  } catch (error) {
	    return Promise.reject(error);
	  }

	  while (responseInterceptorChain.length) {
	    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
	  }

	  return promise;
	};

	Axios$1.prototype.getUri = function getUri(config) {
	  config = mergeConfig$1(this.defaults, config);
	  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
	};

	// Provide aliases for supported request methods
	utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios$1.prototype[method] = function(url, config) {
	    return this.request(mergeConfig$1(config || {}, {
	      method: method,
	      url: url,
	      data: (config || {}).data
	    }));
	  };
	});

	utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios$1.prototype[method] = function(url, data, config) {
	    return this.request(mergeConfig$1(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	var Axios_1 = Axios$1;

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel$1(message) {
	  this.message = message;
	}

	Cancel$1.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel$1.prototype.__CANCEL__ = true;

	var Cancel_1 = Cancel$1;

	var Cancel = Cancel_1;

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	var CancelToken_1 = CancelToken;

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	var spread = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};

	/**
	 * Determines whether the payload is an error thrown by Axios
	 *
	 * @param {*} payload The value to test
	 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
	 */
	var isAxiosError = function isAxiosError(payload) {
	  return (typeof payload === 'object') && (payload.isAxiosError === true);
	};

	var utils = utils$d;
	var bind = bind$2;
	var Axios = Axios_1;
	var mergeConfig = mergeConfig$2;
	var defaults = defaults_1;

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios$1 = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios$1.Axios = Axios;

	// Factory for creating new instances
	axios$1.create = function create(instanceConfig) {
	  return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios$1.Cancel = Cancel_1;
	axios$1.CancelToken = CancelToken_1;
	axios$1.isCancel = isCancel$1;

	// Expose all/spread
	axios$1.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios$1.spread = spread;

	// Expose isAxiosError
	axios$1.isAxiosError = isAxiosError;

	axios$2.exports = axios$1;

	// Allow use of default import syntax in TypeScript
	axios$2.exports.default = axios$1;

	var axios = axios$2.exports;

	(function (module, exports) {
	(function (global, factory) {
	    factory(exports, axios, require$$1__default["default"]) ;
	}(commonjsGlobal, (function (exports, axios, crypto) {
	    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	    function _interopNamespace(e) {
	        if (e && e.__esModule) return e;
	        var n = Object.create(null);
	        if (e) {
	            Object.keys(e).forEach(function (k) {
	                if (k !== 'default') {
	                    var d = Object.getOwnPropertyDescriptor(e, k);
	                    Object.defineProperty(n, k, d.get ? d : {
	                        enumerable: true,
	                        get: function () {
	                            return e[k];
	                        }
	                    });
	                }
	            });
	        }
	        n['default'] = e;
	        return Object.freeze(n);
	    }

	    var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
	    var crypto__namespace = /*#__PURE__*/_interopNamespace(crypto);

	    var WSAddresses = /** @class */ (function () {
	        function WSAddresses(json) {
	            this.wsAddressList = [];
	            this.wsAddressList = json;
	        }
	        WSAddresses.prototype.Address = function (name) {
	            return this.wsAddressList[name] ? this.wsAddressList[name] : '';
	        };
	        return WSAddresses;
	    }());

	    /******************************************************************************
	    Copyright (c) Microsoft Corporation.

	    Permission to use, copy, modify, and/or distribute this software for any
	    purpose with or without fee is hereby granted.

	    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	    PERFORMANCE OF THIS SOFTWARE.
	    ***************************************************************************** */

	    var __assign = function() {
	        __assign = Object.assign || function __assign(t) {
	            for (var s, i = 1, n = arguments.length; i < n; i++) {
	                s = arguments[i];
	                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	            }
	            return t;
	        };
	        return __assign.apply(this, arguments);
	    };

	    function __awaiter(thisArg, _arguments, P, generator) {
	        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	        return new (P || (P = Promise))(function (resolve, reject) {
	            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	            step((generator = generator.apply(thisArg, _arguments || [])).next());
	        });
	    }

	    function __generator(thisArg, body) {
	        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	        function verb(n) { return function (v) { return step([n, v]); }; }
	        function step(op) {
	            if (f) throw new TypeError("Generator is already executing.");
	            while (g && (g = 0, op[0] && (_ = 0)), _) try {
	                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	                if (y = 0, t) op = [op[0] & 2, t.value];
	                switch (op[0]) {
	                    case 0: case 1: t = op; break;
	                    case 4: _.label++; return { value: op[1], done: false };
	                    case 5: _.label++; y = op[1]; op = [0]; continue;
	                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                    default:
	                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                        if (t[2]) _.ops.pop();
	                        _.trys.pop(); continue;
	                }
	                op = body.call(thisArg, _);
	            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	        }
	    }

	    var OlosAPI = /** @class */ (function () {
	        function OlosAPI(name, token) {
	            var _this = this;
	            this.olosAPI = axios__default['default'].create({
	                baseURL: name,
	                headers: this.globalHeaders,
	            });
	            this.olosAPI.interceptors.request.use(function (config) {
	                if (token.accessToken != '') {
	                    config.headers.Authorization = token.tokenType + " " + token.accessToken;
	                    return config;
	                }
	                return token.getToken().then(function () {
	                    config.headers.Authorization = token.tokenType + " " + token.accessToken;
	                    return config;
	                });
	            });
	            this.olosAPI.interceptors.response.use(function (value) {
	                Logger.getInstance().debug("API (" + value.config.url + ") : " + JSON.stringify(value.data));
	                return value;
	            }, function (error) { return __awaiter(_this, void 0, void 0, function () {
	                var originalRequest;
	                return __generator(this, function (_a) {
	                    switch (_a.label) {
	                        case 0:
	                            originalRequest = error.config;
	                            if (!(error.response.status === 401 && !originalRequest._retry)) return [3 /*break*/, 2];
	                            return [4 /*yield*/, token.getToken()];
	                        case 1:
	                            _a.sent();
	                            return [2 /*return*/, this.olosAPI(originalRequest)];
	                        case 2:
	                            Logger.getInstance().error("API Error (" + error + ")");
	                            return [2 /*return*/, Promise.reject(error)];
	                    }
	                });
	            }); });
	        }
	        OlosAPI.prototype.APIInstance = function () {
	            return this.olosAPI;
	        };
	        return OlosAPI;
	    }());

	    const createCache = (lastNumberWeakMap) => {
	        return (collection, nextNumber) => {
	            lastNumberWeakMap.set(collection, nextNumber);
	            return nextNumber;
	        };
	    };

	    /*
	     * The value of the constant Number.MAX_SAFE_INTEGER equals (2 ** 53 - 1) but it
	     * is fairly new.
	     */
	    const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER === undefined ? 9007199254740991 : Number.MAX_SAFE_INTEGER;
	    const TWO_TO_THE_POWER_OF_TWENTY_NINE = 536870912;
	    const TWO_TO_THE_POWER_OF_THIRTY = TWO_TO_THE_POWER_OF_TWENTY_NINE * 2;
	    const createGenerateUniqueNumber = (cache, lastNumberWeakMap) => {
	        return (collection) => {
	            const lastNumber = lastNumberWeakMap.get(collection);
	            /*
	             * Let's try the cheapest algorithm first. It might fail to produce a new
	             * number, but it is so cheap that it is okay to take the risk. Just
	             * increase the last number by one or reset it to 0 if we reached the upper
	             * bound of SMIs (which stands for small integers). When the last number is
	             * unknown it is assumed that the collection contains zero based consecutive
	             * numbers.
	             */
	            let nextNumber = lastNumber === undefined ? collection.size : lastNumber < TWO_TO_THE_POWER_OF_THIRTY ? lastNumber + 1 : 0;
	            if (!collection.has(nextNumber)) {
	                return cache(collection, nextNumber);
	            }
	            /*
	             * If there are less than half of 2 ** 30 numbers stored in the collection,
	             * the chance to generate a new random number in the range from 0 to 2 ** 30
	             * is at least 50%. It's benifitial to use only SMIs because they perform
	             * much better in any environment based on V8.
	             */
	            if (collection.size < TWO_TO_THE_POWER_OF_TWENTY_NINE) {
	                while (collection.has(nextNumber)) {
	                    nextNumber = Math.floor(Math.random() * TWO_TO_THE_POWER_OF_THIRTY);
	                }
	                return cache(collection, nextNumber);
	            }
	            // Quickly check if there is a theoretical chance to generate a new number.
	            if (collection.size > MAX_SAFE_INTEGER) {
	                throw new Error('Congratulations, you created a collection of unique numbers which uses all available integers!');
	            }
	            // Otherwise use the full scale of safely usable integers.
	            while (collection.has(nextNumber)) {
	                nextNumber = Math.floor(Math.random() * MAX_SAFE_INTEGER);
	            }
	            return cache(collection, nextNumber);
	        };
	    };

	    const LAST_NUMBER_WEAK_MAP = new WeakMap();
	    const cache = createCache(LAST_NUMBER_WEAK_MAP);
	    const generateUniqueNumber = createGenerateUniqueNumber(cache, LAST_NUMBER_WEAK_MAP);

	    const isCallNotification = (message) => {
	        return message.method !== undefined && message.method === 'call';
	    };

	    const isClearResponse = (message) => {
	        return message.error === null && typeof message.id === 'number';
	    };

	    const load = (url) => {
	        // Prefilling the Maps with a function indexed by zero is necessary to be compliant with the specification.
	        const scheduledIntervalFunctions = new Map([[0, () => { }]]); // tslint:disable-line no-empty
	        const scheduledTimeoutFunctions = new Map([[0, () => { }]]); // tslint:disable-line no-empty
	        const unrespondedRequests = new Map();
	        const worker = new Worker(url);
	        worker.addEventListener('message', ({ data }) => {
	            if (isCallNotification(data)) {
	                const { params: { timerId, timerType } } = data;
	                if (timerType === 'interval') {
	                    const idOrFunc = scheduledIntervalFunctions.get(timerId);
	                    if (typeof idOrFunc === 'number') {
	                        const timerIdAndTimerType = unrespondedRequests.get(idOrFunc);
	                        if (timerIdAndTimerType === undefined ||
	                            timerIdAndTimerType.timerId !== timerId ||
	                            timerIdAndTimerType.timerType !== timerType) {
	                            throw new Error('The timer is in an undefined state.');
	                        }
	                    }
	                    else if (typeof idOrFunc !== 'undefined') {
	                        idOrFunc();
	                    }
	                    else {
	                        throw new Error('The timer is in an undefined state.');
	                    }
	                }
	                else if (timerType === 'timeout') {
	                    const idOrFunc = scheduledTimeoutFunctions.get(timerId);
	                    if (typeof idOrFunc === 'number') {
	                        const timerIdAndTimerType = unrespondedRequests.get(idOrFunc);
	                        if (timerIdAndTimerType === undefined ||
	                            timerIdAndTimerType.timerId !== timerId ||
	                            timerIdAndTimerType.timerType !== timerType) {
	                            throw new Error('The timer is in an undefined state.');
	                        }
	                    }
	                    else if (typeof idOrFunc !== 'undefined') {
	                        idOrFunc();
	                        // A timeout can be savely deleted because it is only called once.
	                        scheduledTimeoutFunctions.delete(timerId);
	                    }
	                    else {
	                        throw new Error('The timer is in an undefined state.');
	                    }
	                }
	            }
	            else if (isClearResponse(data)) {
	                const { id } = data;
	                const timerIdAndTimerType = unrespondedRequests.get(id);
	                if (timerIdAndTimerType === undefined) {
	                    throw new Error('The timer is in an undefined state.');
	                }
	                const { timerId, timerType } = timerIdAndTimerType;
	                unrespondedRequests.delete(id);
	                if (timerType === 'interval') {
	                    scheduledIntervalFunctions.delete(timerId);
	                }
	                else {
	                    scheduledTimeoutFunctions.delete(timerId);
	                }
	            }
	            else {
	                const { error: { message } } = data;
	                throw new Error(message);
	            }
	        });
	        const clearInterval = (timerId) => {
	            const id = generateUniqueNumber(unrespondedRequests);
	            unrespondedRequests.set(id, { timerId, timerType: 'interval' });
	            scheduledIntervalFunctions.set(timerId, id);
	            worker.postMessage({
	                id,
	                method: 'clear',
	                params: { timerId, timerType: 'interval' }
	            });
	        };
	        const clearTimeout = (timerId) => {
	            const id = generateUniqueNumber(unrespondedRequests);
	            unrespondedRequests.set(id, { timerId, timerType: 'timeout' });
	            scheduledTimeoutFunctions.set(timerId, id);
	            worker.postMessage({
	                id,
	                method: 'clear',
	                params: { timerId, timerType: 'timeout' }
	            });
	        };
	        const setInterval = (func, delay) => {
	            const timerId = generateUniqueNumber(scheduledIntervalFunctions);
	            scheduledIntervalFunctions.set(timerId, () => {
	                func();
	                // Doublecheck if the interval should still be rescheduled because it could have been cleared inside of func().
	                if (typeof scheduledIntervalFunctions.get(timerId) === 'function') {
	                    worker.postMessage({
	                        id: null,
	                        method: 'set',
	                        params: {
	                            delay,
	                            now: performance.now(),
	                            timerId,
	                            timerType: 'interval'
	                        }
	                    });
	                }
	            });
	            worker.postMessage({
	                id: null,
	                method: 'set',
	                params: {
	                    delay,
	                    now: performance.now(),
	                    timerId,
	                    timerType: 'interval'
	                }
	            });
	            return timerId;
	        };
	        const setTimeout = (func, delay) => {
	            const timerId = generateUniqueNumber(scheduledTimeoutFunctions);
	            scheduledTimeoutFunctions.set(timerId, func);
	            worker.postMessage({
	                id: null,
	                method: 'set',
	                params: {
	                    delay,
	                    now: performance.now(),
	                    timerId,
	                    timerType: 'timeout'
	                }
	            });
	            return timerId;
	        };
	        return {
	            clearInterval,
	            clearTimeout,
	            setInterval,
	            setTimeout
	        };
	    };

	    const createLoadOrReturnBroker = (loadBroker, worker) => {
	        let broker = null;
	        return () => {
	            if (broker !== null) {
	                return broker;
	            }
	            const blob = new Blob([worker], { type: 'application/javascript; charset=utf-8' });
	            const url = URL.createObjectURL(blob);
	            broker = loadBroker(url);
	            // Bug #1: Edge up until v18 didn't like the URL to be revoked directly.
	            setTimeout(() => URL.revokeObjectURL(url));
	            return broker;
	        };
	    };

	    // This is the minified and stringified code of the worker-timers-worker package.
	    const worker$1 = `(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error('There is no interval scheduled with the given id "'.concat(t,'".'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error('The given type "'.concat(i,'" is not supported'));(e=>{const r=t.get(e);if(void 0===r)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error('The given method "'.concat(s.method,'" is not supported'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error('The given type "'.concat(d,'" is not supported'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();`; // tslint:disable-line:max-line-length

	    const loadOrReturnBroker = createLoadOrReturnBroker(load, worker$1);
	    const clearTimeout$1 = (timerId) => loadOrReturnBroker().clearTimeout(timerId);
	    const setTimeout$1 = (func, delay) => loadOrReturnBroker().setTimeout(func, delay);

	    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
	    var _callbacks = {};
	    var trigger = function (evname, params) {
	        evname = (evname || "").toLowerCase();
	        integrationWebSocket === null || integrationWebSocket === void 0 ? void 0 : integrationWebSocket.sendEvent(evname, params);
	        if (_callbacks[evname]) {
	            _callbacks[evname].forEach(function (handler) { return handler(params); });
	        }
	    };
	    var on = function (evname, callback) {
	        evname = (evname || "").toLowerCase();
	        _callbacks[evname] = _callbacks[evname] || [];
	        _callbacks[evname].push(callback);
	    };
	    var off = function (evname, fn) {
	        evname = (evname || "").toLowerCase();
	        if (_callbacks[evname]) {
	            _callbacks[evname] = fn
	                ? _callbacks[evname].filter(function (handler) { return handler !== fn; })
	                : null;
	        }
	    };
	    var EventName = {
	        1: 'LoginRequest',
	        2: 'LoginResponse',
	        3: 'LogoutRequest',
	        4: 'LogoutResponse',
	        5: 'LoginCampaign',
	        6: 'LogoutCampaign',
	        7: 'ScreenPop',
	        8: 'MessageResquest',
	        9: 'MessageResponse',
	        10: 'MessageReceived',
	        11: 'Typing',
	        12: 'ChangeStatus',
	        13: 'InactivityAlert',
	        15: 'PauseResponse',
	        16: 'QuitPauseRequest',
	        17: 'QuitPauseResponse',
	        18: 'DispositionRequest',
	        19: 'DispositionResponse',
	        20: 'DialogTerminated',
	        21: 'CurrentDialogsRequest',
	        22: 'CurrentDialogsResponse',
	        23: 'Heartbeat',
	        24: 'ListPauseReasonsRequest',
	        25: 'ListPauseReasonsResponse',
	        26: 'ListDispositionRequest',
	        27: 'ListDispositionResponse',
	        28: 'ResetInactivityTimerRequest',
	        29: 'ResetInactivityTimerResponse',
	        30: 'AsyncMessageReply',
	        31: 'GetAsyncMessage',
	        32: 'AsyncMessageListRequest',
	        33: 'AsyncMessageHistoricalRequest',
	        34: 'AsyncMessageReceived',
	        35: 'AsyncMessageScreenPop',
	        36: 'AsyncMessageRemoved',
	        37: 'AsyncMessageListResponse',
	        38: 'AsyncMessageHistoricalResponse',
	        39: 'GetAsyncMessageError',
	        40: 'AsyncMessageReplyResponse',
	        41: 'AsyncMessageTimeout',
	        42: 'Error',
	        43: 'AsyncMessageDismissRequest',
	        44: 'AsyncMessageDismissResponse',
	        45: 'AsyncMessageListRepliedRequest',
	        46: 'AsyncMessageListRepliedResponse',
	        47: 'AsyncMessageResetReadingTimeoutRequest',
	        48: 'AsyncMessageResetReadingTimeoutResponse',
	        49: 'TransferRequest',
	        50: 'TransferResponse',
	        51: 'messageNotice',
	        52: 'AssistantMode',
	        53: 'getAmountCallsInQueue',
	        54: 'consultingAssistedCampaignRequest',
	        55: 'changingfocusCRM',
	        56: 'sendToOlos'
	    };

	    var getAllEventObjectProps = function (evtObj) {
	        if (!evtObj)
	            return '';
	        if (typeof evtObj !== 'object')
	            return JSON.stringify(evtObj);
	        var keys = Object.keys(evtObj);
	        return keys.map(function (item) { return item + ": " + evtObj[item]; }).join(' ');
	    };
	    var objToUrlencoded = function (obj) {
	        return Object.keys(obj)
	            .map(function (key) { return key + "=" + encodeURIComponent(obj[key]); })
	            .join('&');
	    };

	    var Token = /** @class */ (function () {
	        function Token(url, user, password, clientID, clientSecret) {
	            var _this = this;
	            this._accessToken = '';
	            this._tokenType = '';
	            this._refreshToken = '';
	            this._secondsToExpire = 0;
	            this.getToken = function () {
	                var params = {
	                    username: _this._user,
	                    password: _this._password,
	                    grant_type: 'password',
	                    client_id: _this._clientID,
	                    client_secret: _this._clientSecret,
	                };
	                return new Promise(function (resolve, reject) {
	                    _this._getTokenAPI
	                        .post('token', objToUrlencoded(params))
	                        .then(function (response) {
	                        _this._accessToken = response.data.access_token;
	                        _this._tokenType = response.data.token_type;
	                        _this._refreshToken = response.data.refresh_token;
	                        _this._secondsToExpire = response.data.expires_in;
	                        window.localStorage.setItem('eaglleOlosTokenType', response.data.token_type);
	                        window.localStorage.setItem('eaglleOlosAccessToken', response.data.access_token);
	                        if (!!_this._timer)
	                            clearTimeout$1(_this._timer);
	                        _this._timer = setTimeout$1(_this.tokenExpired, _this._secondsToExpire * 1000);
	                        resolve(response);
	                    })
	                        .catch(function (err) {
	                        console.error(err);
	                        reject(err);
	                    });
	                });
	            };
	            this.tokenExpired = function () {
	                var params = {
	                    grant_type: 'refresh_token',
	                    refresh_token: _this._refreshToken,
	                    client_id: _this._clientID,
	                    client_secret: _this._clientSecret,
	                };
	                _this._getTokenAPI.post('token', objToUrlencoded(params)).then(function (response) {
	                    _this._accessToken = response.data.access_token;
	                    _this._tokenType = response.data.token_type;
	                    _this._refreshToken = response.data.refresh_token;
	                    _this._secondsToExpire = response.data.expires_in;
	                    window.localStorage.setItem('eaglleOlosTokenType', response.data.token_type);
	                    window.localStorage.setItem('eaglleOlosAccessToken', response.data.access_token);
	                    trigger('onTokenUpdate', response.data);
	                    if (!!_this._timer)
	                        clearTimeout$1(_this._timer);
	                    _this._timer = setTimeout$1(_this.tokenExpired, _this._secondsToExpire * 1000);
	                }, function (error) {
	                    _this.tokenExpired();
	                    console.error(error);
	                });
	            };
	            this._user = user;
	            this._password = password;
	            this._clientID = clientID;
	            this._clientSecret = clientSecret;
	            this._timer = 0;
	            this._globalHeaders = {
	                'Content-Type': 'application/x-www-form-urlencoded',
	            };
	            this._getTokenAPI = axios__default['default'].create({
	                baseURL: url,
	                headers: this._globalHeaders,
	            });
	        }
	        Object.defineProperty(Token.prototype, "accessToken", {
	            get: function () {
	                return this._accessToken;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(Token.prototype, "tokenType", {
	            get: function () {
	                return this._tokenType;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(Token.prototype, "cognitoToken", {
	            set: function (token) {
	                console.warn('set cognitoToken(): This method only works with createOlosCognito.');
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return Token;
	    }());

	    var IntegrationWebSocket = /** @class */ (function () {
	        function IntegrationWebSocket(webSocketURL, encrypt) {
	            this.key = Buffer.from('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 'hex'); // 256 bits
	            this.iv = Buffer.from('abcdef9876543210abcdef9876543210', 'hex'); // 128 bits
	            this.connected = false;
	            this.encrypt = false;
	            this.ws = null;
	            this.agentID = '';
	            this.encrypt = encrypt;
	            this.webSocketURL = webSocketURL;
	            this.connectWebSocket();
	        }
	        IntegrationWebSocket.prototype.connectWebSocket = function () {
	            var _this = this;
	            this.ws = new WebSocket(this.webSocketURL);
	            this.ws.onopen = function () {
	                console.log('WebSocket connected');
	                _this.connected = true;
	            };
	            this.ws.onclose = function () {
	                console.log('WebSocket closed');
	                _this.connected = false;
	                // Reconnect on close
	                setTimeout(function () {
	                    _this.connectWebSocket();
	                }, 1000);
	            };
	            this.ws.onmessage = function (event) {
	                console.log('WebSocket message:', event.data);
	                trigger(event.data.type, event.data);
	            };
	            this.ws.onerror = function () {
	                console.error('WebSocket error');
	                _this.connected = false;
	            };
	        };
	        IntegrationWebSocket.prototype.encryptMessage = function (message) {
	            var cipher = crypto__namespace.createCipheriv('aes-256-cbc', this.key, this.iv);
	            console.log('message:', message);
	            var encrypted = cipher.update(message, 'utf8', 'hex');
	            encrypted += cipher.final('hex');
	            return encrypted;
	        };
	        IntegrationWebSocket.prototype.base64urlEncode = function (obj) {
	            var jsonString = JSON.stringify(obj);
	            var buffer = new TextEncoder().encode(jsonString);
	            var base64 = btoa(String.fromCharCode.apply(null, Array.from(buffer)));
	            return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	        };
	        IntegrationWebSocket.prototype.generateAuthToken = function (agentid) {
	            var _this = this;
	            var header = {
	                alg: 'HS256',
	                typ: 'JWT'
	            };
	            // Payload JWT
	            var payload = {
	                agentID: agentid
	            };
	            var encodedHeader = this.base64urlEncode(header);
	            var encodedPayload = this.base64urlEncode(payload);
	            var tokenData = encodedHeader + "." + encodedPayload;
	            var secretKey = 'suaChaveSecreta';
	            return window.crypto.subtle.importKey('raw', new TextEncoder().encode(secretKey), { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']).then(function (key) {
	                window.crypto.subtle.sign('HMAC', key, new TextEncoder().encode(tokenData)).then(function (signature) {
	                    // Codifica a assinatura como base64
	                    var encodedSignature = _this.base64urlEncode(new Uint8Array(signature));
	                    // Token JWT completo
	                    var jwtToken = tokenData + "." + encodedSignature;
	                    console.log('Token JWT gerado:', jwtToken);
	                });
	            });
	        };
	        IntegrationWebSocket.prototype.sendEvent = function (eventType, eventData) {
	            console.log("sendEvent  " + eventType + " sent:", eventData);
	            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
	                if (eventData != '' && eventData != null) {
	                    console.log("eventData  " + eventData);
	                    if (this.agentID === '') {
	                        this.agentID = eventData;
	                        console.log('agentID set:', this.agentID);
	                    }
	                    if (this.agentID !== '' && this.agentID != null) {
	                        console.log('generateAuthToken:', this.generateAuthToken(this.agentID));
	                        console.log("agentID  " + this.agentID + " sent:", eventData);
	                        var event_1;
	                        if (eventType == 'chatscreenpop' && !('agentID' in eventData)) {
	                            event_1 = __assign({ type: eventType, agentId: this.agentID, timestamp: Date.now() }, eventData);
	                        }
	                        else {
	                            event_1 = __assign({ type: eventType, timestamp: Date.now() }, eventData);
	                        }
	                        if (this.encrypt) {
	                            event_1 = this.encryptMessage(JSON.stringify(event_1));
	                        }
	                        this.ws.send(JSON.stringify(event_1));
	                        console.log("Event " + eventType + " sent:", event_1);
	                    }
	                }
	            }
	            else {
	                console.error('WebSocket is not open');
	            }
	        };
	        IntegrationWebSocket.prototype.getStatus = function () {
	            return this.connected ? 'Connected' : 'Connecting...';
	        };
	        return IntegrationWebSocket;
	    }());

	    function decodeBase64(base64, enableUnicode) {
	        var binaryString = atob(base64);
	        if (enableUnicode) {
	            var binaryView = new Uint8Array(binaryString.length);
	            for (var i = 0, n = binaryString.length; i < n; ++i) {
	                binaryView[i] = binaryString.charCodeAt(i);
	            }
	            return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
	        }
	        return binaryString;
	    }

	    function createURL(base64, sourcemapArg, enableUnicodeArg) {
	        var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
	        var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
	        var source = decodeBase64(base64, enableUnicode);
	        var start = source.indexOf('\n', 10) + 1;
	        var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
	        var blob = new Blob([body], { type: 'application/javascript' });
	        return URL.createObjectURL(blob);
	    }

	    function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
	        var url;
	        return function WorkerFactory(options) {
	            url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
	            return new Worker(url, options);
	        };
	    }

	    var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIHZhciBnZXROZXh0RXZlbnRMb29wID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkgew0KICAgICAgICBmdW5jdGlvbiBnZXROZXh0RXZlbnRMb29wKCkgew0KICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpczsNCiAgICAgICAgICAgIHRoaXMuX3VybCA9ICcnOw0KICAgICAgICAgICAgdGhpcy5fdG1vID0gMTUwMDsNCiAgICAgICAgICAgIHRoaXMuX25leHRFdnRUaW1lb3V0ID0gMDsNCiAgICAgICAgICAgIHRoaXMuX3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOw0KICAgICAgICAgICAgdGhpcy5fYXV0aG9yaXphdGlvbiA9ICcnOw0KICAgICAgICAgICAgdGhpcy5zdGFydExvb3AgPSBmdW5jdGlvbiAoYWdlbnRJZCwgYWdlbnRFdnRVcmwsIGF1dGhvcml6YXRpb24sIG9uRXZlbnQsIG9uRXJyb3IpIHsNCiAgICAgICAgICAgICAgICBfdGhpcy5fdXJsID0gYWdlbnRFdnRVcmwgKyAiP2FnZW50SWQ9IiArIGFnZW50SWQ7DQogICAgICAgICAgICAgICAgX3RoaXMuX2F1dGhvcml6YXRpb24gPSBhdXRob3JpemF0aW9uOw0KICAgICAgICAgICAgICAgIHZhciBuZXh0RXZlbnRUaW1lb3V0ID0gZnVuY3Rpb24gKCkgew0KICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuX25leHRFdnRUaW1lb3V0KTsNCiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX25leHRFdnRUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7DQogICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdGFydExvb3AoYWdlbnRJZCwgYWdlbnRFdnRVcmwsIF90aGlzLl9hdXRob3JpemF0aW9uLCBvbkV2ZW50LCBvbkVycm9yKTsNCiAgICAgICAgICAgICAgICAgICAgfSwgX3RoaXMuX3Rtbyk7DQogICAgICAgICAgICAgICAgfTsNCiAgICAgICAgICAgICAgICBfdGhpcy5feGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7DQogICAgICAgICAgICAgICAgX3RoaXMuX3hoci5vcGVuKCdHRVQnLCBhZ2VudEV2dFVybCArICI/YWdlbnRJZD0iICsgYWdlbnRJZCwgdHJ1ZSk7DQogICAgICAgICAgICAgICAgX3RoaXMuX3hoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgX3RoaXMuX2F1dGhvcml6YXRpb24pOw0KICAgICAgICAgICAgICAgIF90aGlzLl94aHIub25sb2FkID0gZnVuY3Rpb24gKCkgew0KICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdG1vID0gMTUwMDsNCiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl94aHIuc3RhdHVzID09PSAyMDApIHsNCiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2dE9iaiA9IEpTT04ucGFyc2UoX3RoaXMuX3hoci5yZXNwb25zZVRleHQucmVwbGFjZSgvXlwofChcKTskKS9nLCAnJykpOw0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnQoZXZ0T2JqKTsNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0T2JqICYmIGV2dE9iai5hZ2VudEV2ZW50VHlwZSAhPT0gJ05vdGhpbmcnKQ0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdG1vID0gMDsNCiAgICAgICAgICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHsNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yKHsNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0Vycm9yIHBhcnNpbmcgR2V0TmV4dEV2ZW50IHJlc3BvbnNlJywNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSZXNwb25zZVRleHQ6IF90aGlzLl94aHIucmVzcG9uc2VUZXh0LA0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOw0KICAgICAgICAgICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICAgICAgICAgIGVsc2Ugew0KICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcih7DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBfdGhpcy5feGhyLnN0YXR1cywNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRXJyb3IgcGFyc2luZyBHZXROZXh0RXZlbnQgcmVzcG9uc2UnLA0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUmVzcG9uc2VUZXh0OiBfdGhpcy5feGhyLnJlc3BvbnNlVGV4dCwNCiAgICAgICAgICAgICAgICAgICAgICAgIH0pOw0KICAgICAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICAgICAgICAgIG5leHRFdmVudFRpbWVvdXQoKTsNCiAgICAgICAgICAgICAgICB9Ow0KICAgICAgICAgICAgICAgIF90aGlzLl94aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHsNCiAgICAgICAgICAgICAgICAgICAgb25FcnJvcih7IG1lc3NhZ2U6ICdHZXROZXh0RXZlbnQgWEhSIEVycm9yJyB9KTsNCiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3RtbyA9IDE1MDA7DQogICAgICAgICAgICAgICAgICAgIG5leHRFdmVudFRpbWVvdXQoKTsNCiAgICAgICAgICAgICAgICB9Ow0KICAgICAgICAgICAgICAgIF90aGlzLl94aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkgew0KICAgICAgICAgICAgICAgICAgICBvbkVycm9yKHsgbWVzc2FnZTogJ0dldE5leHRFdmVudCBYSFIgVGltZW91dCcgfSk7DQogICAgICAgICAgICAgICAgICAgIF90aGlzLl90bW8gPSAxNTAwOw0KICAgICAgICAgICAgICAgICAgICBuZXh0RXZlbnRUaW1lb3V0KCk7DQogICAgICAgICAgICAgICAgfTsNCiAgICAgICAgICAgICAgICBfdGhpcy5feGhyLnNlbmQobnVsbCk7DQogICAgICAgICAgICB9Ow0KICAgICAgICAgICAgdGhpcy5zdG9wTG9vcCA9IGZ1bmN0aW9uICgpIHsNCiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuX25leHRFdnRUaW1lb3V0KTsNCiAgICAgICAgICAgICAgICBfdGhpcy5fbmV4dEV2dFRpbWVvdXQgPSAwOw0KICAgICAgICAgICAgICAgIF90aGlzLl94aHIuYWJvcnQoKTsNCiAgICAgICAgICAgIH07DQogICAgICAgICAgICB0aGlzLnVwZGF0ZVRva2VuID0gZnVuY3Rpb24gKGF1dGhvcml6YXRpb24pIHsNCiAgICAgICAgICAgICAgICBfdGhpcy5fYXV0aG9yaXphdGlvbiA9IGF1dGhvcml6YXRpb247DQogICAgICAgICAgICB9Ow0KICAgICAgICB9DQogICAgICAgIHJldHVybiBnZXROZXh0RXZlbnRMb29wOw0KICAgIH0oKSk7CgogICAgdmFyIGxpc3RPZk5leHRFdmVudCA9IHt9Ow0KICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChlKSB7DQogICAgICAgIHZhciBfYSwgX2IsIF9jOw0KICAgICAgICB2YXIgbWVzc2FnZSA9IGUuZGF0YSB8fCBlOw0KICAgICAgICB2YXIgYWdlbnRFdnRVcmwgPSBlICYmIGUuZGF0YSAmJiBlLmRhdGEuYWdlbnRFdnRVcmw7DQogICAgICAgIHN3aXRjaCAobWVzc2FnZS5ldmVudFR5cGUpIHsNCiAgICAgICAgICAgIGNhc2UgJ2luaXQnOg0KICAgICAgICAgICAgICAgICFsaXN0T2ZOZXh0RXZlbnRbYWdlbnRFdnRVcmxdDQogICAgICAgICAgICAgICAgICAgID8gbGlzdE9mTmV4dEV2ZW50W2FnZW50RXZ0VXJsXSA9IG5ldyBnZXROZXh0RXZlbnRMb29wKCkNCiAgICAgICAgICAgICAgICAgICAgOiBjb25zb2xlLmVycm9yKCJFcnJvciEgQ2FuXCd0IGluaXRpYWxpemUgc2FtZSBldmVudCB0d2ljZS4iKTsNCiAgICAgICAgICAgICAgICBicmVhazsNCiAgICAgICAgICAgIGNhc2UgJ3N0b3AnOg0KICAgICAgICAgICAgICAgIChfYSA9IGxpc3RPZk5leHRFdmVudFthZ2VudEV2dFVybF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdG9wTG9vcCgpOw0KICAgICAgICAgICAgICAgIGJyZWFrOw0KICAgICAgICAgICAgY2FzZSAndXBkYXRlVG9rZW4nOg0KICAgICAgICAgICAgICAgIChfYiA9IGxpc3RPZk5leHRFdmVudFthZ2VudEV2dFVybF0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi51cGRhdGVUb2tlbihlLmRhdGEuYXV0aG9yaXphdGlvbik7DQogICAgICAgICAgICAgICAgYnJlYWs7DQogICAgICAgICAgICBjYXNlICdzdGFydCc6DQogICAgICAgICAgICAgICAgKF9jID0gbGlzdE9mTmV4dEV2ZW50W2FnZW50RXZ0VXJsXSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnN0YXJ0TG9vcChlLmRhdGEuYWdlbnRJZCwgYWdlbnRFdnRVcmwsIGUuZGF0YS5hdXRob3JpemF0aW9uLCBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnRUeXBlOiAnZXZlbnQnLCBkYXRhOiBvYmosIHVybDogYWdlbnRFdnRVcmwgfSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudFR5cGU6ICdlcnJvcicsIGRhdGE6IGVyciwgdXJsOiBhZ2VudEV2dFVybCB9KTsgfSk7DQogICAgICAgICAgICAgICAgYnJlYWs7DQogICAgICAgICAgICBkZWZhdWx0Og0KICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRXZlbnQgbm90IG1hcHBlZDogJywgZS5kYXRhKTsNCiAgICAgICAgICAgICAgICBicmVhazsNCiAgICAgICAgfQ0KICAgIH0pOwoKfSgpKTsKCg==', null, false);
	    /* eslint-enable */

	    var TokenCognito = /** @class */ (function () {
	        function TokenCognito(token) {
	            var _this = this;
	            this._accessToken = '';
	            this._tokenType = '';
	            this.getToken = function () {
	                return new Promise(function (resolve) {
	                    setTimeout$1(function () {
	                        _this._accessToken = _this._token.access_token;
	                        _this._tokenType = _this._token.token_type;
	                        resolve({ data: _this._token });
	                    }, 2000);
	                });
	            };
	            this._token = token;
	        }
	        Object.defineProperty(TokenCognito.prototype, "accessToken", {
	            get: function () {
	                return this._accessToken;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(TokenCognito.prototype, "tokenType", {
	            get: function () {
	                return this._tokenType;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(TokenCognito.prototype, "cognitoToken", {
	            set: function (token) {
	                this._accessToken = token.access_token;
	                this._tokenType = token.token_type;
	                this._token = token;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return TokenCognito;
	    }());

	    var wsAddresses;
	    var agentCMDAPI;
	    var agentEVT;
	    var agentCLD;
	    var mailingCMD;
	    var voiceSupport;
	    var agentConfigCMD;
	    var integrationCMD;
	    var tokenAPI;
	    var softPhoneAPI;
	    var mcxAPI;
	    var recordingRetrieveAPI;
	    var worker;
	    var logsFlag;
	    var integrationWebSocket;
	    var createOlos = function (addrs, _a, encrypt, logs, integrationWebSocketURL) {
	        var user = _a.user, password = _a.password, clientID = _a.clientID, clientSecret = _a.clientSecret;
	        wsAddresses = new WSAddresses(addrs);
	        tokenAPI = new Token(getAddress("WebAPIAgentControl"), user, password, clientID, clientSecret);
	        agentCMDAPI = new OlosAPI(getAddress('wsAgentCmd'), tokenAPI);
	        agentEVT = new OlosAPI(getAddress('wsAgentEvt'), tokenAPI);
	        agentCLD = new OlosAPI(getAddress('WsAgentCloud'), tokenAPI);
	        mailingCMD = new OlosAPI(getAddress('wsMailingCmd'), tokenAPI);
	        new OlosAPI(getAddress('wsUserConfig'), tokenAPI);
	        voiceSupport = new OlosAPI(getAddress('wsVoiceSupport'), tokenAPI);
	        agentConfigCMD = new OlosAPI(getAddress('wsAgentConfig'), tokenAPI);
	        integrationCMD = new OlosAPI(getAddress('wsIntegration'), tokenAPI);
	        softPhoneAPI = new OlosAPI(getAddress('wsSoftPhone'), tokenAPI);
	        mcxAPI = new OlosAPI(getAddress('wsMcx'), tokenAPI);
	        recordingRetrieveAPI = new OlosAPI(getAddress('wsRecordingRetrieve'), tokenAPI);
	        logsFlag = logs || false;
	        integrationWebSocket = integrationWebSocketURL ? new IntegrationWebSocket(integrationWebSocketURL, encrypt) : null;
	        Logger.getInstance().loggerWindow('Olos Created');
	        worker = new WorkerFactory();
	    };
	    var createOlosCognito = function (addrs, _a, logs) {
	        var token = _a.token;
	        wsAddresses = new WSAddresses(addrs);
	        tokenAPI = new TokenCognito(token);
	        agentCMDAPI = new OlosAPI(getAddress('wsAgentCmd'), tokenAPI);
	        agentEVT = new OlosAPI(getAddress('wsAgentEvt'), tokenAPI);
	        agentCLD = new OlosAPI(getAddress('WsAgentCloud'), tokenAPI);
	        mailingCMD = new OlosAPI(getAddress('wsMailingCmd'), tokenAPI);
	        new OlosAPI(getAddress('wsUserConfig'), tokenAPI);
	        voiceSupport = new OlosAPI(getAddress('wsVoiceSupport'), tokenAPI);
	        agentConfigCMD = new OlosAPI(getAddress('wsAgentConfig'), tokenAPI);
	        integrationCMD = new OlosAPI(getAddress('wsIntegration'), tokenAPI);
	        softPhoneAPI = new OlosAPI(getAddress('wsSoftPhone'), tokenAPI);
	        mcxAPI = new OlosAPI(getAddress('wsMcx'), tokenAPI);
	        recordingRetrieveAPI = new OlosAPI(getAddress('wsRecordingRetrieve'), tokenAPI);
	        logsFlag = logs || false;
	        Logger.getInstance().loggerWindow('Olos Created');
	        if (!worker)
	            worker = new WorkerFactory();
	    };
	    var terminateWorker = function () {
	        if (worker) {
	            worker.terminate();
	        }
	    };
	    var getAddress = function (wsName) {
	        return wsAddresses === null || wsAddresses === void 0 ? void 0 : wsAddresses.Address(wsName);
	    };
	    var setCognitoToken = function (token) {
	        tokenAPI.cognitoToken = token;
	    };

	    var Logger = /** @class */ (function () {
	        function Logger() {
	            var _this = this;
	            this._logDateTime = function () { return new Date().toLocaleString(); };
	            this._allLogs = [];
	            this.loggerWindow = function (msg) {
	                if (!logsFlag)
	                    return;
	                _this._allLogs.push({ type: 'LOGGER', msg: _this._logDateTime() + " " + msg.toString() });
	                trigger('Logger', _this._allLogs);
	            };
	            this.error = function (msg) {
	                if (!logsFlag)
	                    return;
	                _this._allLogs.push({ type: 'ERROR', msg: _this._logDateTime() + " " + msg.toString() });
	                trigger('Logger', _this._allLogs);
	            };
	            this.info = function (msg) {
	                if (!logsFlag)
	                    return;
	                _this._allLogs.push({ type: 'INFO', msg: _this._logDateTime() + " " + msg.toString() });
	                trigger('Logger', _this._allLogs);
	            };
	            this.debug = function (msg) {
	                if (!logsFlag)
	                    return;
	                _this._allLogs.push({ type: 'DEBUG', msg: _this._logDateTime() + " " + msg.toString() });
	                trigger('Logger', _this._allLogs);
	            };
	        }
	        Logger.getInstance = function () {
	            if (!Logger.instance) {
	                Logger.instance = new Logger();
	            }
	            return Logger.instance;
	        };
	        return Logger;
	    }());

	    var EnumAgentStatus = {
	        NOTHING: { id: "NOTHING", value: "Nothing" },
	        IDLE: { id: "IDLE", value: "Idle" },
	        TALKING: { id: "TALKING", value: "Talking" },
	        WRAP: { id: "WRAP", value: "Wrap" },
	        PAUSE: { id: "PAUSE", value: "Pause" },
	        ENDING: { id: "ENDING", value: "Ending" },
	        TALKING_WITH_PAUSE: { id: "TALKING_WITH_PAUSE", value: "TalkingWithPause" },
	        WRAP_WITH_PAUSE: { id: "WRAP_WITH_PAUSE", value: "WrapWithPause" },
	        TALKING_WITH_ENDING: { id: "TALKING_WITH_ENDING", value: "TalkingWithEnding" },
	        WRAP_WITH_ENDING: { id: "WRAP_WITH_ENDING", value: "WrapWithEnding" },
	        CONSULTING: { id: "CONSULTING", value: "Consulting" },
	        IN_CHAT: { id: "IN_CHAT", value: "Chat" },
	        IN_CHAT_WITH_PAUSE: { id: "IN_CHAT_WITH_PAUSE", value: "ChatWithPause" },
	        IN_CHAT_WITH_ENDING: { id: "IN_CHAT_WITH_ENDING", value: "ChatWithEnding" },
	        CONSULTING_WITH_PAUSE: { id: "CONSULTING_WITH_PAUSE", value: "ConsultingWithPause" },
	        CONSULTING_WITH_ENDING: { id: "CONSULTING_WITH_ENDING", value: "ConsultingWithEnding" },
	        TRANSFER: { id: "TRANSFER", value: "Transfer" },
	        HOLDING: { id: "HOLDING", value: "Holding" },
	        HOLDING_WITH_PAUSE: { id: "HOLDING_WITH_PAUSE", value: "HoldingWithPause" },
	        HOLDING_WITH_ENDING: { id: "HOLDING_WITH_ENDING", value: "HoldingWithEnding" },
	        MANUAL_CALL: { id: "MANUAL_CALL", value: "ManualCall" },
	        TALKING_WITH_MANUAL_CALL: { id: "TALKING_WITH_MANUAL_CALL", value: "TalkingWithManualCall" },
	        WRAP_WITH_MANUAL_CALL: { id: "WRAP_WITH_MANUAL_CALL", value: "WrapWithManualCall" },
	        CONSULTING_WITH_MANUAL_CALL: { id: "CONSULTING_WITH_MANUAL_CALL", value: "ConsultingWithManualCall" },
	        HOLDING_WITH_MANUAL_CALL: { id: "HOLDING_WITH_MANUAL_CALL", value: "HoldingWithManualCall" },
	        REDIAL: { id: "REDIAL", value: "Redial" },
	        PRIVATE_CALLBACK: { id: "PRIVATE_CALLBACK", value: "PrivateCallback" },
	        TALKING_WITH_PRIVATE_CALLBACK: { id: "TALKING_WITH_PRIVATE_CALLBACK", value: "TalkingWithPrivateCallback" },
	        WRAP_WITH_PRIVATE_CALLBACK: { id: "WRAP_WITH_PRIVATE_CALLBACK", value: "WrapWithPrivateCallback" },
	        MANUALCALL_WITH_PRIVATE_CALLBACK: { id: "MANUALCALL_WITH_PRIVATE_CALLBACK", value: "ManualCallWithPrivateCallback" },
	        CONSULTING_WITH_PRIVATE_CALLBACK: { id: "CONSULTING_WITH_PRIVATE_CALLBACK", value: "ConsultingWithPrivateCallback" },
	        HOLDING_WITH_PRIVATE_CALLBACK: { id: "HOLDING_WITH_PRIVATE_CALLBACK", value: "HoldingWithPrivateCallback" },
	        THIRD_PARTY_CAMPAIGN: { id: "THIRD_PARTY_CAMPAIGN", value: "ThirdPartyCampaign" },
	        PERSONAL_CALL: { id: "PERSONAL_CALL", value: "PersonalCall" },
	        TALKING_WITH_PERSONAL_CALL: { id: "TALKING_WITH_PERSONAL_CALL", value: "TalkingWithPersonalCall" },
	        WRAP_WITH_PERSONAL_CALL: { id: "WRAP_WITH_PERSONAL_CALL", value: "WrapWithPersonalCall" },
	        MANUALCALL_WITH_PERSONAL_CALL: { id: "MANUALCALL_WITH_PERSONAL_CALL", value: "ManualCallWithPersonalCall" },
	        CONSULTING_WITH_PERSONAL_CALL: { id: "CONSULTING_WITH_PERSONAL_CALL", value: "ConsultingWithPersonalCall" },
	        HOLDING_WITH_PERSONAL_CALL: { id: "HOLDING_WITH_PERSONAL_CALL", value: "HoldingWithPersonalCall" },
	        PERSONAL_CALL_WITH_ENDING: { id: "PERSONAL_CALL_WITH_ENDING", value: "PersonalCallWithEnding" },
	        PERSONAL_CALL_WITH_PAUSE: { id: "PERSONAL_CALL_WITH_PAUSE", value: "PersonalCallWithPause" },
	        Analyzing: { id: "Analyzing", value: "Analyzing" },
	        AnalyzingWithPersonalCall: { id: "AnalyzingWithPersonalCall", value: "AnalyzingWithPersonalCall" },
	        "Attempting ": { id: "Attempting ", value: "Attempting" },
	        "AttemptingWithPersonalCall ": { id: "AttemptingWithPersonalCall", value: "AttemptingWithPersonalCall" },
	        "AfterAttempting ": { id: "AfterAttempting ", value: "AfterAttempting" },
	        "AfterAttemptWithPersonalCall  ": { id: "AfterAttemptWithPersonalCall  ", value: "AfterAttemptWithPersonalCall" },
	        "AttemptingWithPrivateCallback  ": { id: "AttemptingWithPrivateCallback  ", value: "AttemptingWithPrivateCallback" },
	        "RedialWithPersonalCall ": { id: "RedialWithPersonalCall ", value: "RedialWithPersonalCall" },
	        InConference: { id: "InConference ", value: "InConference" },
	        InConferenceWithEnding: { id: "InConferenceWithEnding ", value: "InConferenceWithEnding" },
	        InConferenceWithManualCall: { id: "InConferenceWithManualCall ", value: "InConferenceWithManualCall" },
	        InConferenceWithPause: { id: "InConferenceWithPause ", value: "InConferenceWithPause" },
	        InConferenceWithPersonalCall: { id: "InConferenceWithPersonalCall ", value: "InConferenceWithPersonalCall" },
	        InConferenceWithPrivateCallback: { id: "InConferenceWithPrivateCallback ", value: "InConferenceWithPrivateCallback" },
	        PAUSING: { id: "PAUSING", value: "Pausing" },
	        END: { id: "END", value: "End" },
	    };
	    var AgentEventType;
	    (function (AgentEventType) {
	        AgentEventType["NOTHING"] = "Nothing";
	        AgentEventType["LOGIN_CCM"] = "LoginCCM";
	        AgentEventType["LOGOUT_CCM"] = "LogoutCCM";
	        AgentEventType["LOGIN_CAMPAIGN"] = "LoginCampaign";
	        AgentEventType["LOGOUT_CAMPAIGN"] = "LogoutCampaign";
	        AgentEventType["CHANGE_STATUS"] = "ChangeStatus";
	        AgentEventType["SCREEN_POP"] = "ScreenPop";
	        AgentEventType["CHANGE_STATUS_FAIL"] = "ChangeStatusFail";
	        AgentEventType["DISPOSITION_REQUEST_FAIL"] = "DispositionRequestFail";
	        AgentEventType["LOGIN_CCM_FAIL"] = "LoginCCMFail";
	        AgentEventType["LOGIN_CAMPAIGN_FAIL"] = "LoginCampaignFail";
	        AgentEventType["LOGOUT_CCM_FAIL"] = "LogoutCCMFail";
	        AgentEventType["LOGOUT_CAMPAIGN_FAIL"] = "LogoutCampaignFail";
	        AgentEventType["ONLINE_CAMPAIGN_CHANGE_STATUS_ID"] = "OnlineCampaignChangeStatusId";
	        AgentEventType["PASS_CODE"] = "PassCode";
	        AgentEventType["NEW_CHAT"] = "NewChat";
	        AgentEventType["NEW_CHAT_MSG"] = "NewChatMsg";
	        AgentEventType["END_CHAT"] = "EndChat";
	        AgentEventType["NEW_MESSAGE"] = "NewMessage";
	        AgentEventType["CONSULTING_REQUEST_FAIL"] = "ConsultingRequestFail";
	        AgentEventType["ACTIVE_CALL"] = "ActiveCall";
	        AgentEventType["MANUAL_CALL_REQUEST_FAIL"] = "ManualCallRequestFail";
	        AgentEventType["CHANGE_MANUAL_CALL_STATE"] = "ChangeManualCallState";
	        AgentEventType["REDIAL_REQUEST_FAIL"] = "RedialRequestFail";
	        AgentEventType["REDIAL_SUCCESS"] = "RedialSuccess";
	        AgentEventType["LIST_ACTIVE_CALLS"] = "ListActiveCalls";
	        AgentEventType["PRIVATE_CALLBACK_FAIL"] = "PrivateCallbackFail";
	        AgentEventType["THIRD_PARTY_SCREEN_POP"] = "ThirdPartyScreenPop";
	        AgentEventType["ChangePreviewCallState"] = "ChangePreviewCallState";
	        AgentEventType["ChangePreviewCallResult"] = "ChangePreviewCallResult";
	        AgentEventType["ConferenceRequestAccepted"] = "ConferenceRequestAccepted";
	        AgentEventType["ParticipantJoinedConference"] = "ParticipantJoinedConference";
	        AgentEventType["StopConferenceRequestAccepted"] = "StopConferenceRequestAccepted";
	        AgentEventType["ParticipantLeftConference"] = "ParticipantLeftConference";
	        AgentEventType["ConferenceRequestFail"] = "ConferenceRequestFail";
	        AgentEventType["StopConferenceRequestFail"] = "StopConferenceRequestFail";
	        AgentEventType["ConferencePaused"] = "ConferencePaused";
	        AgentEventType["ConferenceResumed"] = "ConferenceResumed";
	        AgentEventType["ReferCallRequestFail"] = "ReferCallRequestFail";
	    })(AgentEventType || (AgentEventType = {}));
	    var AgentEventChatType;
	    (function (AgentEventChatType) {
	        AgentEventChatType[AgentEventChatType["LoginRequest"] = 1] = "LoginRequest";
	        AgentEventChatType[AgentEventChatType["LoginResponse"] = 2] = "LoginResponse";
	        AgentEventChatType[AgentEventChatType["LogoutRequest"] = 3] = "LogoutRequest";
	        AgentEventChatType[AgentEventChatType["LogoutResponse"] = 4] = "LogoutResponse";
	        AgentEventChatType[AgentEventChatType["LoginCampaign"] = 5] = "LoginCampaign";
	        AgentEventChatType[AgentEventChatType["LogoutCampaign"] = 6] = "LogoutCampaign";
	        AgentEventChatType[AgentEventChatType["ScreenPop"] = 7] = "ScreenPop";
	        AgentEventChatType[AgentEventChatType["MessageResquest"] = 8] = "MessageResquest";
	        AgentEventChatType[AgentEventChatType["MessageResponse"] = 9] = "MessageResponse";
	        AgentEventChatType[AgentEventChatType["MessageReceived"] = 10] = "MessageReceived";
	        AgentEventChatType[AgentEventChatType["Typing"] = 11] = "Typing";
	        AgentEventChatType[AgentEventChatType["ChangeStatus"] = 12] = "ChangeStatus";
	        AgentEventChatType[AgentEventChatType["InactivityAlert"] = 13] = "InactivityAlert";
	        AgentEventChatType[AgentEventChatType["PauseRequest"] = 14] = "PauseRequest";
	        AgentEventChatType[AgentEventChatType["PauseResponse"] = 15] = "PauseResponse";
	        AgentEventChatType[AgentEventChatType["QuitPauseRequest"] = 16] = "QuitPauseRequest";
	        AgentEventChatType[AgentEventChatType["QuitPauseResponse"] = 17] = "QuitPauseResponse";
	        AgentEventChatType[AgentEventChatType["DispositionRequest"] = 18] = "DispositionRequest";
	        AgentEventChatType[AgentEventChatType["DispositionResponse"] = 19] = "DispositionResponse";
	        AgentEventChatType[AgentEventChatType["DialogTerminated"] = 20] = "DialogTerminated";
	        AgentEventChatType[AgentEventChatType["CurrentDialogsRequest"] = 21] = "CurrentDialogsRequest";
	        AgentEventChatType[AgentEventChatType["CurrentDialogsResponse"] = 22] = "CurrentDialogsResponse";
	        AgentEventChatType[AgentEventChatType["Heartbeat"] = 23] = "Heartbeat";
	        AgentEventChatType[AgentEventChatType["ListPauseReasonsRequest"] = 24] = "ListPauseReasonsRequest";
	        AgentEventChatType[AgentEventChatType["ListPauseReasonsResponse"] = 25] = "ListPauseReasonsResponse";
	        AgentEventChatType[AgentEventChatType["ListDispositionRequest"] = 26] = "ListDispositionRequest";
	        AgentEventChatType[AgentEventChatType["ListDispositionResponse"] = 27] = "ListDispositionResponse";
	        AgentEventChatType[AgentEventChatType["ResetInactivityTimerRequest"] = 28] = "ResetInactivityTimerRequest";
	        AgentEventChatType[AgentEventChatType["ResetInactivityTimerResponse"] = 29] = "ResetInactivityTimerResponse";
	        AgentEventChatType[AgentEventChatType["AsyncMessageReply"] = 30] = "AsyncMessageReply";
	        AgentEventChatType[AgentEventChatType["GetAsyncMessage"] = 31] = "GetAsyncMessage";
	        AgentEventChatType[AgentEventChatType["AsyncMessageListRequest"] = 32] = "AsyncMessageListRequest";
	        AgentEventChatType[AgentEventChatType["AsyncMessageHistoricalRequest"] = 33] = "AsyncMessageHistoricalRequest";
	        AgentEventChatType[AgentEventChatType["AsyncMessageReceived"] = 34] = "AsyncMessageReceived";
	        AgentEventChatType[AgentEventChatType["AsyncMessageScreenPop"] = 35] = "AsyncMessageScreenPop";
	        AgentEventChatType[AgentEventChatType["AsyncMessageRemoved"] = 36] = "AsyncMessageRemoved";
	        AgentEventChatType[AgentEventChatType["AsyncMessageListResponse"] = 37] = "AsyncMessageListResponse";
	        AgentEventChatType[AgentEventChatType["AsyncMessageHistoricalResponse"] = 38] = "AsyncMessageHistoricalResponse";
	        AgentEventChatType[AgentEventChatType["GetAsyncMessageError"] = 39] = "GetAsyncMessageError";
	        AgentEventChatType[AgentEventChatType["AsyncMessageReplyResponse"] = 40] = "AsyncMessageReplyResponse";
	        AgentEventChatType[AgentEventChatType["AsyncMessageTimeout"] = 41] = "AsyncMessageTimeout";
	        AgentEventChatType[AgentEventChatType["Error"] = 42] = "Error";
	        AgentEventChatType[AgentEventChatType["AsyncMessageDismissRequest"] = 43] = "AsyncMessageDismissRequest";
	        AgentEventChatType[AgentEventChatType["AsyncMessageDismissResponse"] = 44] = "AsyncMessageDismissResponse";
	        AgentEventChatType[AgentEventChatType["AsyncMessageListRepliedRequest"] = 45] = "AsyncMessageListRepliedRequest";
	        AgentEventChatType[AgentEventChatType["AsyncMessageListRepliedResponse"] = 46] = "AsyncMessageListRepliedResponse";
	        AgentEventChatType[AgentEventChatType["AsyncMessageResetReadingTimeoutRequest"] = 47] = "AsyncMessageResetReadingTimeoutRequest";
	        AgentEventChatType[AgentEventChatType["AsyncMessageResetReadingTimeoutResponse"] = 48] = "AsyncMessageResetReadingTimeoutResponse";
	        AgentEventChatType[AgentEventChatType["TransferRequest"] = 49] = "TransferRequest";
	        AgentEventChatType[AgentEventChatType["TransferResponse"] = 50] = "TransferResponse";
	        AgentEventChatType[AgentEventChatType["AssistantMode"] = 52] = "AssistantMode";
	    })(AgentEventChatType || (AgentEventChatType = {}));
	    exports.AgentChannelStatus = void 0;
	    (function (AgentChannelStatus) {
	        AgentChannelStatus[AgentChannelStatus["None"] = 0] = "None";
	        AgentChannelStatus[AgentChannelStatus["Idle"] = 1] = "Idle";
	        AgentChannelStatus[AgentChannelStatus["Pause"] = 4] = "Pause";
	        AgentChannelStatus[AgentChannelStatus["Ending"] = 5] = "Ending";
	        AgentChannelStatus[AgentChannelStatus["Chat"] = 11] = "Chat";
	        AgentChannelStatus[AgentChannelStatus["Pausing"] = 62] = "Pausing";
	        AgentChannelStatus[AgentChannelStatus["End"] = 9999] = "End";
	    })(exports.AgentChannelStatus || (exports.AgentChannelStatus = {}));

	    var EnumManualCallState = {
	        Nothing: { id: -1, value: 'Nothing' },
	        Started: { id: 0, value: 'Started' },
	        Alerting: { id: 1, value: 'Alerting' },
	        CustomerConnected: { id: 2, value: 'CustomerConnected' },
	        Routing: { id: 3, value: 'Routing' },
	        AgentConnected: { id: 4, value: 'AgentConnected' },
	        Finished: { id: 5, value: 'Finished' },
	        Consulting: { id: 6, value: 'Consulting' },
	        Transfering: { id: 7, value: 'Transfering' },
	        Queue: { id: 8, value: 'Queue' },
	        Holding: { id: 9, value: 'Holding' },
	    };
	    var CallStatus;
	    (function (CallStatus) {
	        CallStatus["Started"] = "Started";
	        CallStatus["CustomerConnected"] = "CustomerConnected";
	        CallStatus["Finished"] = "Finished";
	        CallStatus["AgentConnected"] = "AgentConnected";
	    })(CallStatus || (CallStatus = {}));

	    var OlosAgent = /** @class */ (function () {
	        function OlosAgent() {
	            var _this = this;
	            this._agentId = '';
	            this.setStatus = function (stats) {
	                Logger.getInstance().info("DEBUG :: setStatus " + stats);
	                _this._status = stats;
	                if (_this.isAgentInWrapStatus()) {
	                    trigger('dispositionPending', null);
	                    off('dispositionPending');
	                }
	                if (_this._status === EnumAgentStatus.PAUSE.value) {
	                    trigger('pauseCancel', _this._agentId);
	                    off('pauseCancel');
	                    trigger('changePauseReason', _this._agentId);
	                    off('changePauseReason');
	                }
	                //wrapTmoCheck();
	            };
	            this.isAgentInWrapStatus = function () {
	                return (_this._status === EnumAgentStatus.WRAP.value ||
	                    _this._status === EnumAgentStatus.WRAP_WITH_PAUSE.value ||
	                    _this._status === EnumAgentStatus.WRAP_WITH_PRIVATE_CALLBACK.value ||
	                    _this._status === EnumAgentStatus.WRAP_WITH_MANUAL_CALL.value ||
	                    _this._status === EnumAgentStatus.WRAP_WITH_ENDING.value ||
	                    _this._status === EnumAgentStatus.WRAP_WITH_PERSONAL_CALL.value);
	            };
	            this.isAgentInPendingPauseStatus = function () {
	                return (_this._status === EnumAgentStatus.TALKING_WITH_PAUSE.value ||
	                    _this._status === EnumAgentStatus.WRAP_WITH_PAUSE.value);
	            };
	            this.setManualCallStatus = function (stats) {
	                _this._manualCallStatus = stats;
	                if (_this.isManualCallWrap()) {
	                    trigger('dispositionPending', null);
	                    off('dispositionPending');
	                }
	            };
	            this.isManualCallWrap = function () {
	                return _this._manualCallStatus == EnumManualCallState.Finished.value;
	            };
	            this._status = EnumManualCallState.Nothing.value;
	        }
	        Object.defineProperty(OlosAgent.prototype, "agentID", {
	            get: function () {
	                return this._agentId;
	            },
	            set: function (value) {
	                this._agentId = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(OlosAgent.prototype, "status", {
	            get: function () {
	                return this._status;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return OlosAgent;
	    }());

	    var OlosAgentChannel = /** @class */ (function () {
	        function OlosAgentChannel() {
	            this._agentId = 0;
	            this._status = exports.AgentChannelStatus.None;
	        }
	        Object.defineProperty(OlosAgentChannel.prototype, "agentID", {
	            get: function () {
	                return this._agentId;
	            },
	            set: function (value) {
	                this._agentId = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(OlosAgentChannel.prototype, "status", {
	            get: function () {
	                return this._status;
	            },
	            set: function (value) {
	                this._status = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return OlosAgentChannel;
	    }());

	    var convertToJson = function (value) {
	        if (typeof value !== 'string')
	            return value;
	        var text = value.replace(/^\(/, '').replace(/\);$/, '');
	        return JSON.parse(text);
	    };

	    var _started = false;
	    var _listeners = {};
	    /**
	     * start
	     */
	    var start = function () {
	        _started = true;
	        if (worker) {
	            worker.onmessage = function (ev) {
	                if (ev && ev.data && ev.data.url) {
	                    triggerWorkerMessage(ev.data.url, ev);
	                }
	            };
	        }
	        else {
	            console.warn("Warning! The worker did not start");
	        }
	    };
	    /**
	     * onMessage
	     * @param handler
	     */
	    var onWorkerMessage = function (endpoint, handler) {
	        if (!_started) {
	            start();
	        }
	        _listeners[endpoint] = _listeners[endpoint] || [];
	        _listeners[endpoint].push(handler);
	    };
	    /**
	     * triggerMessage
	     * @param data
	     */
	    var triggerWorkerMessage = function (endpoint, data) {
	        if (_listeners[endpoint]) {
	            _listeners[endpoint].forEach(function (handler) { return handler(data); });
	        }
	    };

	    var OlosAgentChannelWs = /** @class */ (function () {
	        function OlosAgentChannelWs() {
	            var _this = this;
	            this._worker = false;
	            this._hasWorker = typeof Worker !== 'undefined';
	            this._agentChannel = new OlosAgentChannel();
	            this._callbacks = {};
	            this._hasLoggedOnce = false;
	            this._apiOnline = true;
	            this._status = 1;
	            this._agentEvtUrl = "";
	            this.defaultCallError = function (eventRenew) {
	                _this._apiOnline = false;
	                if (eventRenew && !_this._hasWorker)
	                    _this._apiConnectTimeout = setTimeout(_this.getNextEventChat.bind(_this), 1500);
	            };
	            this.start = function (agentId) {
	                _this.stop();
	                on('onTokenUpdate', _this._onTokenUpdate);
	                _this._status = 1;
	                _this._hasLoggedOnce = false;
	                _this._agentChannel.agentID = agentId;
	                _this._agentChannel.status = exports.AgentChannelStatus.None; /*NOTHING*/
	                if (_this._hasWorker) {
	                    _this._worker = true;
	                    _this._agentEvtUrl = getAddress('wsAgentEvt') + "/GetNextEventChat";
	                    worker.postMessage({
	                        eventType: 'init',
	                        agentEvtUrl: _this._agentEvtUrl,
	                    });
	                    return _this.getNextEventChatWorker();
	                }
	                _this.getNextEventChat();
	            };
	            this.stop = function () {
	                Logger.getInstance().info("DEBUG :: stop this._hasWorker " + _this._hasWorker + " e this._worker " + _this._worker);
	                _this._status = 0;
	                off('onTokenUpdate', _this._onTokenUpdate);
	                if (_this._hasWorker && _this._worker) {
	                    worker.postMessage({
	                        eventType: 'stop',
	                        agentEvtUrl: _this._agentEvtUrl,
	                    });
	                    return (_this._worker = false);
	                }
	                clearTimeout(_this._setTmoId1);
	                clearTimeout(_this._setTmoId2);
	                return clearTimeout(_this._apiConnectTimeout);
	            };
	            this.createReqId = function (dialogueId) {
	                var now = new Date();
	                return dialogueId + "_" + now.getMinutes().toString() + now.getSeconds().toString() + now
	                    .getMilliseconds()
	                    .toString();
	            };
	            this.agentAuthenticationChat = function (login, passwd, callback) {
	                var data = {
	                    Login: login,
	                    Password: passwd,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationChat', data)
	                    .then(function (res) {
	                    var agentId = convertToJson(res.data).agentId;
	                    if (agentId && Number(agentId) > 0) {
	                        _this.start(agentId);
	                        return callback ? callback(agentId) : trigger('agentAuthenticationChat', agentId);
	                    }
	                    return trigger('agentAuthenticationChatFail', agentId);
	                })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.agentAuthenticationAzureChat = function (tokenId, callback) {
	                var data = {
	                    TokenId: tokenId,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationAzureChat', data)
	                    .then(function (res) {
	                    var agentId = convertToJson(res.data).agentId;
	                    if (agentId && Number(agentId) > 0) {
	                        _this.start(agentId);
	                        return callback ? callback(agentId) : trigger('agentAuthenticationAzureChat', agentId);
	                    }
	                    return trigger('agentAuthenticationChatAzureFail', agentId);
	                })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.agentAuthenticationISAMChat = function (tokenId, callback, callbackError) {
	                var data = {
	                    Token: tokenId,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationISAMChat', data)
	                    .then(function (response) {
	                    var agentId = convertToJson(response.data).agentId;
	                    if (agentId && Number(agentId) > 0) {
	                        _this.start(agentId);
	                        return callback ? callback(agentId) : trigger('agentAuthenticationISAMChat', agentId);
	                    }
	                    return callbackError
	                        ? callbackError('agentAuthenticationISAMChatFail')
	                        : trigger('agentAuthenticationISAMChatFail', agentId);
	                })
	                    .catch(function (error) {
	                    _this.defaultCallError();
	                    return callbackError ? callbackError(error) : trigger('agentAuthenticationISAMChatFail', error);
	                });
	            };
	            this.agentAuthenticationChatWithPause = function (login, passwd, reasonCode, callback) {
	                var data = {
	                    ReasonCode: reasonCode,
	                    Login: login,
	                    Password: passwd,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationChatWithPause', data)
	                    .then(function (res) {
	                    var agentId = convertToJson(res.data).agentId;
	                    if (agentId && Number(agentId) > 0) {
	                        _this.start(agentId);
	                        return callback ? callback(agentId) : trigger('AgentAuthenticationChatWithPause', agentId);
	                    }
	                    return trigger('AgentAuthenticationChatWithPauseFail', agentId);
	                })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.agentAuthenticationAzureChatWithPause = function (tokenId, reasonCode, callback) {
	                var data = {
	                    ReasonCode: reasonCode,
	                    TokenId: tokenId,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationChatAzureWithPause', data)
	                    .then(function (res) {
	                    var agentId = convertToJson(res.data).agentId;
	                    if (agentId && Number(agentId) > 0) {
	                        _this.start(agentId);
	                        return callback ? callback(agentId) : trigger('AgentAuthenticationAzureChatWithPause', agentId);
	                    }
	                    return trigger('AgentAuthenticationAzureChatWithPauseFail', agentId);
	                })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.agentAuthenticationChatISAMWithPause = function (tokenId, reasonCode, callback, callbackError) {
	                var data = {
	                    ReasonCode: reasonCode,
	                    Token: tokenId,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationChatISAMWithPause', data)
	                    .then(function (response) {
	                    var agentId = convertToJson(response.data).agentId;
	                    if (agentId && Number(agentId) > 0) {
	                        _this.start(agentId);
	                        return callback ? callback(agentId) : trigger('agentAuthenticationChatISAMWithPause', agentId);
	                    }
	                    return callbackError
	                        ? callbackError('agentAuthenticationChatISAMWithPauseFail')
	                        : trigger('agentAuthenticationChatISAMWithPauseFail', agentId);
	                })
	                    .catch(function (error) {
	                    _this.defaultCallError();
	                    return callbackError ? callbackError(error) : trigger('agentAuthenticationChatISAMWithPauseFail', error);
	                });
	            };
	            this.agentReasonChatRequest = function (reasonId) {
	                var data = {
	                    ReasonId: reasonId,
	                    AgentId: _this._agentChannel.agentID,
	                };
	                var url = "AgentReasonChatRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.agentReasonChatRequestByCode = function (reasonCode) {
	                var data = {
	                    ReasonCode: reasonCode,
	                    AgentId: _this._agentChannel.agentID,
	                };
	                var url = "AgentReasonChatRequestByCode";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.agentIdleChatRequest = function () {
	                var data = {
	                    AgentId: _this._agentChannel.agentID,
	                };
	                var url = "AgentIdleChatRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.agentChannelLogout = function () {
	                var data = {
	                    AgentId: _this._agentChannel.agentID,
	                };
	                Logger.getInstance().info("DEBUG :: agentChannelLogout");
	                var url = "AgentChatLogout";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.dispositionChat = function (dialogId, dispositionId, dispositionCode, year, month, day, hour, minute, privateAgent) {
	                var data = {
	                    DialogId: dialogId,
	                    DispositionId: dispositionId,
	                    DispositionCode: dispositionCode,
	                    Year: year,
	                    Month: month,
	                    Day: day,
	                    Hour: hour,
	                    Minute: minute,
	                    Private: privateAgent,
	                    AgentId: _this._agentChannel.agentID,
	                };
	                var url = "DispositionChat";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.messageChatRequest = function (dialogId, message, attachments) {
	                var reqId = dialogId ? _this.createReqId(dialogId) : null;
	                var data = {
	                    Message: message,
	                    Attachments: attachments,
	                    ReqId: reqId,
	                    DialogId: dialogId,
	                    AgentId: _this._agentChannel.agentID,
	                };
	                var url = "MessageChatRequest";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	                return reqId != null ? { dialogId: dialogId, reqId: reqId } : null;
	            };
	            this.currentDialogsRequest = function (campaignId) {
	                var data = {
	                    AgentId: _this._agentChannel.agentID,
	                    CampaignId: campaignId,
	                };
	                var url = "CurrentDialogsRequest";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.messageNotice = function (agentId, dialogId, messageid, status) {
	                var url = "MessageNotice?agentId=" + agentId + "&DialogId=" + dialogId + "&Messageid=" + messageid + "&Status=" + status;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.listOnlineAgentsInCampaign = function (campaignId) {
	                var url = "ListOnlineAgentsInCampaign?campaignId=" + campaignId;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) {
	                    trigger('ListOnlineAgentsInCampaign', { response: convertToJson(res.data), campaignId: campaignId });
	                })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.getAmountCallsInQueue = function (campaignId) {
	                var url = "GetAmountCallsInQueue?campaignId=" + campaignId;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) {
	                    trigger('GetAmountCallsInQueue', { response: convertToJson(res.data), campaignId: campaignId });
	                })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.consultingAssistedCampaignRequest = function (AgentId, CampaignId, TransferAgentId, uuiData) {
	                var data = {
	                    CampaignId: CampaignId,
	                    TransferAgentId: TransferAgentId,
	                    Uui: uuiData,
	                    AgentId: AgentId,
	                };
	                var url = "ConsultingAssistedCampaignRequest";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.typing = function (dialogId) {
	                var data = {
	                    DialogId: dialogId,
	                    AgentId: _this._agentChannel.agentID,
	                };
	                var url = "Typing";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.listChatDispositions = function (campaignId) {
	                var url = "ListChatDispositions?AgentId=" + _this._agentChannel.agentID + "&CampaignId=" + campaignId;
	                agentCMDAPI.APIInstance().get(url);
	            };
	            this.listChatPauseReasons = function () {
	                var url = "ListChatPauseReasons?AgentId=" + _this._agentChannel.agentID;
	                agentCMDAPI.APIInstance().get(url);
	            };
	            this.resetChatInactivityTimer = function (dialogId) {
	                var data = {
	                    DialogId: dialogId,
	                    AgentId: _this._agentChannel.agentID,
	                };
	                var url = "ResetChatInactivityTimer";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.getMailingHistory = function (mailingName, recordId, maxResults, lastDaysLimit, dialogId) {
	                var url = "GetMailingHistory?mailingName=" + mailingName + "&recordId=" + recordId + "&maxResults=" + maxResults + "&lastDaysLimit=" + lastDaysLimit;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return trigger('GetMailingHistory', { response: convertToJson(res.data), dialogId: dialogId }); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.agentDailySummary = function (agentId) {
	                var data = {
	                    AgentId: agentId,
	                };
	                var url = "AgentDailySummary";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return trigger('AgentDailySummary', convertToJson(res.data)); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.asyncMessageReply = function (agentId, conversationId, content, attachments, formatedContent) {
	                var data = {
	                    Content: content,
	                    Attachments: attachments,
	                    FormatedContent: formatedContent,
	                    ConversationId: conversationId,
	                    AgentId: agentId,
	                };
	                var url = "AsyncMessageReply";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.asyncMessageDismiss = function (agentId, conversationId) {
	                var data = {
	                    ConversationId: conversationId,
	                    AgentId: agentId,
	                };
	                var url = "AsyncMessageDismiss";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.getAsyncMessage = function (agentId, conversationId) {
	                var url = "GetAsyncMessage?AgentId=" + agentId + "&ConversationId=" + conversationId;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.asyncMessageListRequest = function (agentId, campaignId) {
	                var url = "AsyncMessageListRequest?AgentId=" + agentId + "&CampaignId=" + campaignId;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.asyncMessageListRepliedRequest = function (agentId, campaignId) {
	                var url = "AsyncMessageListRepliedRequest?AgentId=" + agentId + "&CampaignId=" + campaignId;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.asyncMessageResetReadingTimeoutRequest = function (agentId, conversationId) {
	                var url = "AsyncMessageResetReadingTimeoutRequest?AgentId=" + agentId + "&ConversationId=" + conversationId;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.asyncMessageHistoricalRequest = function (agentId, conversationId) {
	                var url = "AsyncMessageHistoricalRequest?AgentId=" + agentId + "&ConversationId=" + conversationId;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.transferChat = function (dialogId, dispositionId, dispositionCode, campaignIdDest, agentIdDest, year, month, day, hour, minute, privateTransfer) {
	                var data = {
	                    DialogId: dialogId,
	                    DispositionId: dispositionId,
	                    DispositionCode: dispositionCode,
	                    CampaignIdDest: campaignIdDest,
	                    AgentIdDest: agentIdDest,
	                    Year: year,
	                    Month: month,
	                    Day: day,
	                    Hour: hour,
	                    Minute: minute,
	                    Private: privateTransfer,
	                    AgentId: _this._agentChannel.agentID,
	                };
	                var url = "TransferChat";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.getListStatus = function () {
	                return exports.AgentChannelStatus;
	            };
	            this.handleNextEvent = function (objEvent) {
	                var _a;
	                var eventData = objEvent.eventData, eventTypeId = objEvent.eventTypeId, campaignId = objEvent.campaignId, channel = objEvent.channel;
	                Logger.getInstance().info("DEBUG :: handleNextEvent");
	                var event = (_a = {},
	                    _a[AgentEventChatType.LoginResponse] = function () { return (_this._hasLoggedOnce = true); },
	                    _a[AgentEventChatType.ChangeStatus] = function () {
	                        _this._agentChannel.status = eventData.status;
	                    },
	                    _a[AgentEventChatType.LogoutCampaign] = function () {
	                        Logger.getInstance().info("DEBUG :: handleNextEvent AgentEventChatType.LogoutCampaign campaignId: " + campaignId + " this._hasLoggedOnce: " + _this._hasLoggedOnce);
	                        if (campaignId === 0 && _this._hasLoggedOnce) {
	                            _this._agentChannel.status = exports.AgentChannelStatus.End;
	                            Logger.getInstance().info("DEBUG :: handleNextEvent AgentEventChatType.LogoutCampaign this._agentChannel.status: " + _this._agentChannel.status);
	                            _this.stop();
	                        }
	                    },
	                    _a);
	                if (event[eventTypeId])
	                    event[eventTypeId]();
	                //Evento do HeartBeat no Chat serve como um ping para saber se o agente está consumindo os eventos por isso apenas enviamos para o log e não disparamos o evento.
	                if (eventTypeId !== AgentEventChatType.Heartbeat) {
	                    var eventName = void 0;
	                    try {
	                        eventName = EventName[eventTypeId].toLowerCase();
	                        trigger("chat" + eventName, __assign(__assign({}, eventData), { channel: channel || undefined }));
	                    }
	                    catch (e) {
	                        eventName = '';
	                    }
	                }
	            };
	            this._onTokenUpdate = function (data) {
	                worker.postMessage({
	                    eventType: 'updateToken',
	                    agentEvtUrl: _this._agentEvtUrl,
	                    authorization: tokenAPI.tokenType + " " + tokenAPI.accessToken,
	                });
	            };
	            this.onWorkerMessage = function (ofType, callback) {
	                return function (e) {
	                    if (e.data && e.data.eventType === ofType) {
	                        callback(e.data.data, e);
	                    }
	                };
	            };
	            this.getNextEventChatWorker = function () {
	                if (!_this._status)
	                    return;
	                var onSuccess = _this.onWorkerMessage('event', function (objEvent) {
	                    if (_this._apiOnline == false) {
	                        _this._apiOnline = true;
	                        trigger('apiRequestError', { status: 'online' });
	                    }
	                    if (objEvent !== null && typeof objEvent === 'object')
	                        _this.handleNextEvent(objEvent);
	                });
	                var onError = _this.onWorkerMessage('error', function (data) {
	                    console.error('ERRRO :: GetNextEventChat', data);
	                    _this.defaultCallError();
	                    Logger.getInstance().info('* Error * Request :: getNextEvent()');
	                });
	                onWorkerMessage(_this._agentEvtUrl, function (ev) {
	                    onSuccess(ev);
	                    onError(ev);
	                });
	                worker.postMessage({
	                    eventType: 'start',
	                    agentId: _this._agentChannel.agentID,
	                    agentEvtUrl: _this._agentEvtUrl,
	                    authorization: tokenAPI.tokenType + " " + tokenAPI.accessToken,
	                });
	            };
	            this.getNextEventChat = function () {
	                if (!_this._status)
	                    return;
	                var data = "GetNextEventChat?agentId=" + _this._agentChannel.agentID;
	                agentEVT
	                    .APIInstance()
	                    .get(data)
	                    .then(function (res) {
	                    if (_this._apiOnline === false) {
	                        _this._apiOnline = true;
	                        trigger('apiRequestError', { status: 'online' });
	                    }
	                    var objEvent = convertToJson(res.data);
	                    var eventTypeId = objEvent.eventTypeId;
	                    if (objEvent == null && _this._agentChannel.status !== exports.AgentChannelStatus.End) {
	                        clearTimeout(_this._setTmoId1);
	                        return (_this._setTmoId1 = setTimeout(_this.getNextEventChat.bind(_this), 1500));
	                    }
	                    if (typeof objEvent === 'object') {
	                        _this.handleNextEvent(objEvent);
	                        if (eventTypeId !== AgentEventChatType.Error) {
	                            clearTimeout(_this._setTmoId2);
	                            return (_this._setTmoId2 = setTimeout(_this.getNextEventChat.bind(_this), 0));
	                        }
	                        clearTimeout(_this._setTmoId1);
	                        return (_this._setTmoId1 = setTimeout(_this.getNextEventChat.bind(_this), 1500));
	                    }
	                })
	                    .catch(function () {
	                    _this.defaultCallError();
	                    clearTimeout(_this._setTmoId1);
	                    _this._setTmoId1 = setTimeout(_this.getNextEventChat.bind(_this), 1500);
	                });
	            };
	        }
	        return OlosAgentChannelWs;
	    }());

	    var OlosActiveCall = /** @class */ (function () {
	        function OlosActiveCall() {
	            var _this = this;
	            this._callIdActive = 0;
	            this._callIdMaster = 0;
	            this._campaignId = 0;
	            this._customerId = '';
	            this._tableName = '';
	            this._callbacks = {};
	            this._arrayActiveCalls = [];
	            this.addActiveCall = function (activeCall) {
	                if (_this._arrayActiveCalls.indexOf(activeCall) == -1) {
	                    _this._arrayActiveCalls.push(activeCall);
	                    _this._callIdActive = _this.getLastActiveCall();
	                }
	            };
	            this.getCallIdMaster = function () {
	                return _this._callIdMaster;
	            };
	            this.setCallIdMaster = function (callId) {
	                _this._callIdMaster = callId;
	            };
	            this.renewActiveCall = function (objListActiveCalls) {
	                objListActiveCalls.forEach(function (call) {
	                    if (call.customerCall == true)
	                        _this.setCallIdMaster(call.callId);
	                });
	                //TODO - Renovar apenas quando quando maior que 1 porque o  primeiro é da ligação atual
	                if (_this._arrayActiveCalls.length > 1) {
	                    //Montando array de callId ativos
	                    var arrayListActiveCalls_1 = objListActiveCalls.map(function (call) { return call.callId; });
	                    _this._arrayActiveCalls.filter(function (activeCall) { return arrayListActiveCalls_1.indexOf(activeCall) !== -1; });
	                    //Reordenando o array de CallIds Ativos
	                    _this._arrayActiveCalls = arrayListActiveCalls_1.sort(function (a, b) { return a - b; });
	                }
	                _this._callIdActive = _this.getLastActiveCall();
	            };
	            this.getLastActiveCall = function () {
	                return _this._arrayActiveCalls[_this._arrayActiveCalls.length - 1];
	            };
	            this.resetAll = function () {
	                _this._callIdActive = 0;
	                _this._callIdMaster = 0;
	                _this._campaignId = 0;
	                _this._customerId = '';
	                _this._tableName = '';
	                _this._arrayActiveCalls = [];
	            };
	        }
	        Object.defineProperty(OlosActiveCall.prototype, "campaignID", {
	            get: function () {
	                return this._campaignId;
	            },
	            set: function (value) {
	                this._campaignId = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(OlosActiveCall.prototype, "customerId", {
	            get: function () {
	                return this._customerId;
	            },
	            set: function (value) {
	                this._customerId = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(OlosActiveCall.prototype, "mailingName", {
	            get: function () {
	                return this._tableName;
	            },
	            set: function (value) {
	                this._tableName = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(OlosActiveCall.prototype, "callIdActive", {
	            get: function () {
	                return this._callIdActive;
	            },
	            set: function (value) {
	                this._callIdActive = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return OlosActiveCall;
	    }());

	    var OlosAgentWS = /** @class */ (function () {
	        function OlosAgentWS() {
	            var _this = this;
	            this._worker = false;
	            this.hasWorker = typeof Worker !== 'undefined';
	            this._hasLoggedOnceCCM = false;
	            this._status = 0;
	            this._agentId = 0;
	            this._apiOnline = true;
	            this._setTmoId1 = 0;
	            this._setTmoId2 = 0;
	            this._apiConnectTimout = 0;
	            this._agent = new OlosAgent();
	            this._activeCall = new OlosActiveCall();
	            this._agentEvtUrl = "";
	            this.defaultCallError = function (eventRenew) {
	                _this._apiOnline = false;
	                if (eventRenew && !_this.hasWorker)
	                    _this._apiConnectTimout = setTimeout(_this.getNextEvent.bind(_this), 1500);
	            };
	            this.start = function () {
	                _this.stop();
	                on('onTokenUpdate', _this._onTokenUpdate);
	                _this._status = 1;
	                _this._hasLoggedOnceCCM = false;
	                if (_this.hasWorker) {
	                    _this._worker = true;
	                    _this._agentEvtUrl = getAddress('wsAgentEvt') + "/GetNextEvent";
	                    worker.postMessage({
	                        eventType: 'init',
	                        agentEvtUrl: _this._agentEvtUrl
	                    });
	                    return _this.getNextEventWorker();
	                }
	                return _this.getNextEvent();
	            };
	            this.getNextEventWorker = function () {
	                if (!_this._status)
	                    return;
	                var onSuccess = _this.onWorkerMessage('event', function (objEvent) {
	                    if (!_this._apiOnline) {
	                        _this._apiOnline = true;
	                        trigger('apiRequestError', { status: 'online' });
	                    }
	                    if (typeof objEvent === 'object')
	                        _this.handleNextEvent(objEvent);
	                });
	                var onError = _this.onWorkerMessage('error', function (data) {
	                    console.error('ERRRO :: GetNextEvent', data);
	                    _this.defaultCallError(true);
	                    Logger.getInstance().error('* Error * Request :: getNextEventWorker()');
	                });
	                onWorkerMessage(_this._agentEvtUrl, function (ev) {
	                    onSuccess(ev);
	                    onError(ev);
	                });
	                worker.postMessage({
	                    eventType: 'start',
	                    agentId: _this._agentId,
	                    agentEvtUrl: _this._agentEvtUrl,
	                    authorization: tokenAPI.tokenType + " " + tokenAPI.accessToken,
	                });
	            };
	            this.onWorkerMessage = function (ofType, callback) {
	                return function (e) {
	                    if (e.data && e.data.eventType === ofType) {
	                        callback(e.data.data, e);
	                    }
	                };
	            };
	            this.getNextEvent = function () {
	                if (!_this._status)
	                    return;
	                var data = "GetNextEvent?agentId=" + _this._agentId;
	                agentEVT
	                    .APIInstance()
	                    .get(data)
	                    .then(function (response) {
	                    if (!_this._apiOnline) {
	                        _this._apiOnline = true;
	                        trigger('apiRequestError', { status: 'online' });
	                    }
	                    var objEvent = convertToJson(response.data);
	                    var agentEventType = objEvent.agentEventType;
	                    if (typeof objEvent === 'object') {
	                        _this.handleNextEvent(objEvent);
	                        if (agentEventType === AgentEventType.NOTHING && _this._agent.status !== EnumAgentStatus.END.value) {
	                            clearTimeout(_this._setTmoId1);
	                            return (_this._setTmoId1 = setTimeout(_this.getNextEvent.bind(_this), 1500));
	                        }
	                        clearTimeout(_this._setTmoId2);
	                        _this._setTmoId2 = setTimeout(_this.getNextEvent.bind(_this), 0);
	                    }
	                })
	                    .catch(function () {
	                    clearTimeout(_this._setTmoId1);
	                    _this._setTmoId1 = setTimeout(_this.getNextEvent.bind(_this), 1500);
	                });
	            };
	            this.handleNextEvent = function (objEvent) {
	                var _a;
	                if (!objEvent || !objEvent.agentEventType) {
	                    return;
	                }
	                var agentEventType = objEvent.agentEventType, genericInt = objEvent.genericInt, eventObject = objEvent.eventObject, eventObjectManualCallState = objEvent.eventObjectManualCallState, eventObjectScreenPop = objEvent.eventObjectScreenPop, eventObjectAgentChangeStatus = objEvent.eventObjectAgentChangeStatus;
	                var event = (_a = {},
	                    _a[AgentEventType.ACTIVE_CALL] = function () {
	                        _this._activeCall.addActiveCall(genericInt);
	                        return _this.listActiveCalls();
	                    },
	                    _a[AgentEventType.LIST_ACTIVE_CALLS] = function () {
	                        if (eventObject.length > 0)
	                            return _this._activeCall.renewActiveCall(eventObject);
	                    },
	                    _a[AgentEventType.CHANGE_MANUAL_CALL_STATE] = function () {
	                        var callState = eventObjectManualCallState.callState, callId = eventObjectManualCallState.callId;
	                        _this._agent.setManualCallStatus(callState);
	                        _this._activeCall.setCallIdMaster(callId);
	                        return (_this._activeCall.campaignID = 0);
	                    },
	                    _a[AgentEventType.SCREEN_POP] = function () {
	                        var callId = eventObjectScreenPop.callId, campaignId = eventObjectScreenPop.campaignId, customerId = eventObjectScreenPop.customerId, tableName = eventObjectScreenPop.tableName;
	                        _this._activeCall.addActiveCall(callId);
	                        _this._activeCall.setCallIdMaster(callId);
	                        _this._activeCall.campaignID = campaignId;
	                        _this._activeCall.customerId = customerId;
	                        return (_this._activeCall.mailingName = tableName);
	                    },
	                    _a[AgentEventType.ChangePreviewCallState] = function () { return _this._activeCall.addActiveCall(eventObject.callId); },
	                    _a[AgentEventType.LOGIN_CCM] = function () { return (_this._hasLoggedOnceCCM = true); },
	                    _a[AgentEventType.LOGOUT_CCM] = function () { return _this._hasLoggedOnceCCM && _this._agent.setStatus(EnumAgentStatus.END.value); },
	                    _a[AgentEventType.CHANGE_STATUS] = function () {
	                        var agentID = eventObjectAgentChangeStatus.agentStatusId;
	                        _this._agent.setStatus(agentID);
	                        var resetCall = agentID === EnumAgentStatus.IDLE.value ||
	                            agentID === EnumAgentStatus.MANUAL_CALL.value ||
	                            agentID === EnumAgentStatus.PAUSE.value;
	                        if (resetCall)
	                            return _this._activeCall.resetAll();
	                        if (agentID === EnumAgentStatus.HOLDING.value)
	                            return _this.listActiveCalls();
	                    },
	                    _a[AgentEventType.StopConferenceRequestAccepted] = function () { return _this.retrievesCall(_this._activeCall.getCallIdMaster()); },
	                    _a);
	                if (event[agentEventType])
	                    event[agentEventType]();
	                Logger.getInstance().info("EventType (agentEventType): [" + agentEventType + "]");
	                Logger.getInstance().info("EventData (eventObject): [" + getAllEventObjectProps(eventObject) + "]");
	                if (agentEventType === AgentEventType.NOTHING && _this._agent.status === EnumAgentStatus.END.value)
	                    return trigger('agentEnd', eventObject);
	                return trigger(agentEventType.toLowerCase(), eventObject);
	            };
	            this.stop = function () {
	                _this._status = 0;
	                off('onTokenUpdate', _this._onTokenUpdate);
	                if (_this.hasWorker && _this._worker) {
	                    worker.postMessage({
	                        eventType: 'stop',
	                        agentEvtUrl: _this._agentEvtUrl,
	                    });
	                    return (_this._worker = false);
	                }
	                clearTimeout(_this._setTmoId1);
	                clearTimeout(_this._setTmoId2);
	                return clearTimeout(_this._apiConnectTimout);
	            };
	            this.agentAuthentication = function (login, passwd, callback) {
	                var data = {
	                    Login: login,
	                    Password: passwd,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthentication', data)
	                    .then(function (response) {
	                    var id = convertToJson(response.data).agentId;
	                    _this._agent.agentID = id;
	                    _this._agentId = id;
	                    if (_this._agentId && Number(_this._agentId) > 0) {
	                        _this._agent.setStatus(EnumAgentStatus.NOTHING);
	                        _this.start();
	                        return callback ? callback(id) : trigger('agentAuthentication', id);
	                    }
	                    return trigger('agentAuthenticationFail', id);
	                })
	                    .catch(function () {
	                    _this.defaultCallError();
	                });
	            };
	            this.authServiceLogin = function (callback) {
	                var data = {
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AuthServiceLogin', data)
	                    .then(function (response) {
	                    var id = convertToJson(response.data).agentId;
	                    _this._agent.agentID = id;
	                    _this._agentId = id;
	                    if (_this._agentId && Number(_this._agentId) > 0) {
	                        _this._agent.setStatus(EnumAgentStatus.NOTHING);
	                        _this.start();
	                        return callback ? callback(id) : trigger('agentAuthentication', id);
	                    }
	                    return trigger('agentAuthenticationFail', id);
	                }).catch(function (response) {
	                    console.log(response);
	                });
	            };
	            this.agentAuthenticationAuthServiceLogin = function (callback) {
	                var data = {
	                    ForceLogout: true,
	                };
	                agentCLD
	                    .APIInstance()
	                    .post('AuthServiceUnextendedAgentLogin', data)
	                    .then(function (response) {
	                    var id = convertToJson(response.data).agentId;
	                    _this._agent.agentID = id;
	                    _this._agentId = id;
	                    if (_this._agentId && Number(_this._agentId) > 0) {
	                        _this._agent.setStatus(EnumAgentStatus.NOTHING);
	                        return callback ? callback(id) : trigger('agentAuthentication', id);
	                    }
	                    return trigger('agentAuthenticationFail', id);
	                }).catch(function (response) {
	                    console.log(response);
	                });
	            };
	            this.agentAuthenticationAzure = function (tokenId, callback, callbackError) {
	                var data = {
	                    TokenId: tokenId,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationAzure', objToUrlencoded(data))
	                    .then(function (response) {
	                    var _a = convertToJson(response.data), error = _a.error, agentId = _a.agentId;
	                    _this._agent.agentID = agentId;
	                    if (agentId > 0 && !error) {
	                        _this._agent.setStatus(EnumAgentStatus.NOTHING);
	                        _this.start();
	                        return callback ? callback(agentId) : trigger('agentAuthenticationAzure', String(agentId));
	                    }
	                    return callbackError ? callbackError(error) : trigger('agentAuthenticationAzureFail', error);
	                })
	                    .catch(function () {
	                    _this.defaultCallError();
	                });
	            };
	            this.agentAuthenticationISAM = function (
	            // eslint-disable-next-line @typescript-eslint/ban-types
	            token, callback, callbackError) {
	                var data = {
	                    Token: token,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationISAM', data)
	                    .then(function (response) {
	                    var _a = convertToJson(response.data), error = _a.error, agentId = _a.agentId;
	                    _this._agent.agentID = agentId;
	                    _this._agentId = agentId;
	                    if (agentId > 0 && !error) {
	                        _this._agent.setStatus(EnumAgentStatus.NOTHING);
	                        _this.start();
	                        return callback ? callback(agentId) : trigger('agentAuthenticationISAM', String(agentId));
	                    }
	                    return callbackError ? callbackError(error) : trigger('agentAuthenticationISAMFail', error);
	                })
	                    .catch(function () {
	                    _this.defaultCallError();
	                });
	            };
	            this.agentAuthenticationWithPause = function (login, passwd, reasonCode, callback) {
	                var data = {
	                    ReasonCode: reasonCode,
	                    Login: login,
	                    Password: passwd,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationWithPause', data)
	                    .then(function (response) {
	                    var agentId = convertToJson(response.data).agentId;
	                    _this._agent.agentID = agentId;
	                    if (agentId > 0) {
	                        _this._agent.setStatus(EnumAgentStatus.NOTHING);
	                        _this.start();
	                        return callback ? callback(agentId) : trigger('agentAuthenticationWithPause', String(agentId));
	                    }
	                    return trigger('agentAuthenticationWithPauseFail', agentId);
	                })
	                    .catch(function () {
	                    _this.defaultCallError();
	                });
	            };
	            this.agentAuthenticationISAMPause = function (tokenId, reasonCode, callback) {
	                var data = {
	                    TokenId: tokenId,
	                    ReasonCode: reasonCode,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationISAMWithPause', objToUrlencoded(data))
	                    .then(function (response) {
	                    var _a = convertToJson(response.data), error = _a.error, agentId = _a.agentId;
	                    _this._agent.agentID = agentId;
	                    if (agentId > 0 && !error) {
	                        _this._agent.setStatus(EnumAgentStatus.NOTHING);
	                        _this.start();
	                        return callback ? callback(agentId) : trigger('agentAuthenticationISAMPause', String(agentId));
	                    }
	                    return trigger('agentAuthenticationISAMWithPauseFail', error);
	                })
	                    .catch(function () {
	                    _this.defaultCallError();
	                });
	            };
	            this.agentAuthenticationAzureWithPause = function (tokenId, reasonCode, callback) {
	                var data = {
	                    ReasonCode: reasonCode,
	                    TokenId: tokenId,
	                    ForceLogout: true,
	                };
	                agentCMDAPI
	                    .APIInstance()
	                    .post('AgentAuthenticationAzureWithPause', objToUrlencoded(data))
	                    .then(function (response) {
	                    var _a = convertToJson(response.data), error = _a.error, agentId = _a.agentId;
	                    _this._agent.agentID = agentId;
	                    if (agentId > 0 && !error) {
	                        _this._agent.setStatus(EnumAgentStatus.NOTHING);
	                        _this.start();
	                        return callback ? callback(agentId) : trigger('agentAuthenticationAzureWithPause', String(agentId));
	                    }
	                    return trigger('agentAuthenticationAzureWithPauseFail', error);
	                })
	                    .catch(function () {
	                    _this.defaultCallError();
	                });
	            };
	            this.agentReasonRequest = function (reasonId) {
	                var reasonRequest = function (agentId, reasonId) {
	                    var data = {
	                        ReasonId: reasonId,
	                        AgentId: agentId,
	                    };
	                    var url = "AgentReasonRequest";
	                    agentCMDAPI.APIInstance().post(url, data);
	                };
	                var agentId = _this._agent.agentID;
	                if (_this._agent.isAgentInPendingPauseStatus())
	                    return on('changePauseReason', function () { return reasonRequest(agentId, reasonId); });
	                return reasonRequest(agentId, reasonId);
	            };
	            this.agentReasonRequestByCode = function (reasonCode) {
	                var reasonRequest = function (agentId, reasonCode) {
	                    var data = {
	                        ReasonCode: reasonCode,
	                        AgentId: agentId,
	                    };
	                    var url = "AgentReasonRequestByCode";
	                    agentCMDAPI.APIInstance().post(url, data);
	                };
	                var agentId = _this._agent.agentID;
	                if (_this._agent.isAgentInPendingPauseStatus())
	                    return on('changePauseReason', function () { return reasonRequest(agentId, reasonCode); });
	                return reasonRequest(agentId, reasonCode);
	            };
	            this.coordinatedAgentPause = function (reasonId, reasonCode) {
	                var pauseRequest = function (agentId, reasonId, reasonCode) {
	                    var data = {
	                        ReasonCode: reasonCode,
	                        ReasonId: reasonId,
	                        AgentId: agentId,
	                    };
	                    var url = "CoordinatedAgentPause";
	                    agentCMDAPI.APIInstance().post(url, data);
	                };
	                var agentId = _this._agent.agentID;
	                if (_this._agent.isAgentInPendingPauseStatus())
	                    return on('changePauseReason', function () { return pauseRequest(agentId, reasonId, reasonCode); });
	                return pauseRequest(agentId, reasonId, reasonCode);
	            };
	            this.agentIdleRequest = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "AgentIdleRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.agentIdleChatRequest = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "AgentIdleChatRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.agentLogout = function () {
	                Logger.getInstance().info("DEBUG :: agentLogout this._agent.agentID " + _this._agent.agentID);
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "AgentLogout";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.coordinatedAgentLogout = function () {
	                Logger.getInstance().info("DEBUG :: agentLogout coordinatedAgentLogout " + _this._agent.agentID);
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "CoordinatedAgentLogout";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.updateAgentIpAddress = function (ip) {
	                var data = {
	                    Ip: ip,
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "UpdateAgentIpAddress";
	                agentCMDAPI.APIInstance().put(url, data);
	            };
	            this.updateMailingData = function (mailingData) {
	                var data = {
	                    MailingName: _this._activeCall.mailingName,
	                    MailingData: mailingData,
	                    CustomerId: _this._activeCall.customerId,
	                    AgentId: _this._agent.agentID,
	                    CampaignId: _this._activeCall.campaignID,
	                };
	                var url = "UpdateMailingData";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.updateCallData = function (campaignData, callback, callbackError) {
	                var data = {
	                    CampaignData: campaignData,
	                    CustomerId: _this._activeCall.customerId,
	                    AgentId: _this._agent.agentID,
	                    CallId: _this._activeCall.callIdActive,
	                };
	                var url = "updateCallData";
	                agentCMDAPI.APIInstance()
	                    .put(url, data)
	                    .then(function (res) { return !!callback && callback(res.data); })
	                    .catch(function (error) { return !!callbackError && callbackError({ response: error.response, err: error }); });
	            };
	            this.transferCallRequest = function (callId) {
	                var targetCallId = callId || _this._activeCall.callIdActive;
	                var data = {
	                    AgentId: _this._agent.agentID,
	                    CallId: targetCallId,
	                };
	                var url = "TransferCallRequest";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function () { return _this.listActiveCalls(); });
	            };
	            this.blindTransferCallRequest = function (phoneNumber, uuiData) {
	                var data = {
	                    PhoneNumber: phoneNumber,
	                    Uui: uuiData,
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "BlindTransferCallRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.sendPreviewCallRequest = function (phoneNumber) {
	                var data = {
	                    PhoneNumber: phoneNumber,
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "SendPreviewCallRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.sendManualCallRequest = function (ddd, phoneNumber, campaignId) {
	                var data = {
	                    Ddd: ddd,
	                    PhoneNumber: phoneNumber,
	                    CampaignId: campaignId,
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "SendManualCallRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.retrievesCall = function (callId) {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                    CallId: callId || _this._activeCall.callIdActive,
	                };
	                var url = "RetrievesCall";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.redialRequest = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "RedialRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.redialRequestWithPhone = function (ddi, phoneNumber) {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                    Ddi: ddi,
	                    PhoneNumber: phoneNumber,
	                };
	                var url = "RedialRequestWithPhone";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.markRecordingRequest = function (callId, description) {
	                var data = {
	                    Description: description,
	                    AgentId: _this._agent.agentID,
	                    CallId: callId,
	                };
	                var url = "MarkRecordingRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.manualCallStateRequest = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "ManualCallStateRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.listReasons = function (callback) {
	                var url = "ListReasons?agentId=" + _this._agent.agentID;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) {
	                    var list = convertToJson(res.data);
	                    if (callback)
	                        return callback(list);
	                    return trigger('listReasons', list);
	                })
	                    .catch(function () {
	                    _this.defaultCallError();
	                });
	            };
	            this.listOnlineAgents = function () {
	                var url = "ListOnlineAgents?agentId=" + _this._agent.agentID;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) {
	                    trigger('listOnlineAgents', convertToJson(res.data));
	                })
	                    .catch(function () {
	                    _this.defaultCallError();
	                });
	            };
	            this.listDispositions = function (campaignId) {
	                var url = "ListDispositions?campaignId=" + (campaignId || _this._activeCall.campaignID);
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) {
	                    var response = convertToJson(res.data);
	                    trigger('listDispositions', response);
	                    trigger('listDispositionsCampaign', { campaignId: campaignId, dispositions: response });
	                });
	            };
	            this.listCompanies = function () {
	                var url = "ListCompanies?agentId=" + _this._agent.agentID;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return trigger('listCompanies', convertToJson(res.data)); });
	            };
	            this.listCampaignsToConsulting = function (campaignId) {
	                var url = "ListCampaignsToConsulting?CampaignId=" + (campaignId || _this._activeCall.campaignID);
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return trigger('listCampaignsToConsulting', convertToJson(res.data)); });
	            };
	            this.listCampaignsToChat = function (campaignId) {
	                var url = "ListCampaignsToChat?CampaignId=" + (campaignId || _this._activeCall.campaignID);
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return trigger('listCampaignsToChat', convertToJson(res.data)); });
	            };
	            this.listCampaignCompany = function () {
	                agentCMDAPI
	                    .APIInstance()
	                    .get('ListCampaignCompany')
	                    .then(function (res) { return trigger('listCampaignCompany', convertToJson(res.data)); });
	            };
	            this.listActiveCalls = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "ListActiveCalls";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return trigger('listActiveCalls', convertToJson(res.data)); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.hangupRequest = function (callId) {
	                var targetCallId = callId || _this._activeCall.callIdActive;
	                var data = {
	                    AgentId: _this._agent.agentID,
	                    CallId: targetCallId,
	                };
	                var url = "HangupRequest";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function () { return _this.listActiveCalls(); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.hangupAndDispositionCallByCode = function (dispositionCode) {
	                var data = {
	                    DispositionCode: dispositionCode,
	                    AgentId: _this._agent.agentID,
	                    CallId: _this._activeCall.callIdActive,
	                };
	                var url = "HangupAndDispositionCallByCode";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.hangupAndDispositionCallBackByCode = function (dispositionCode, year, month, day, hour, minute, phoneNumber, specificAgent) {
	                var callId = _this._activeCall.getCallIdMaster();
	                var data = {
	                    DispositionCode: dispositionCode,
	                    Year: year,
	                    Month: month,
	                    Day: day,
	                    Hour: hour,
	                    Minute: minute,
	                    PhoneNumber: phoneNumber,
	                    SpecificAgent: specificAgent || true,
	                    AgentId: _this._agent.agentID,
	                    CallId: callId,
	                };
	                var url = "HangupAndDispositionCallBackByCode";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.hangupAndDispositionCallBack = function (dispositionId, year, month, day, hour, minute, phoneNumber, specificAgent) {
	                var data = {
	                    DispositionId: dispositionId,
	                    Year: year,
	                    Month: month,
	                    Day: day,
	                    Hour: hour,
	                    Minute: minute,
	                    PhoneNumber: phoneNumber,
	                    SpecificAgent: specificAgent || true,
	                    AgentId: _this._agent.agentID,
	                    CallId: _this._activeCall.callIdActive,
	                };
	                var url = "HangupAndDispositionCallBack";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.hangupAndDispositionCall = function (dispositionId) {
	                var data = {
	                    DispositionId: dispositionId,
	                    AgentId: _this._agent.agentID,
	                    CallId: _this._activeCall.getCallIdMaster(),
	                };
	                var url = "HangupAndDispositionCall";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.endManualCallStateRequest = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "EndManualCallStateRequest";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.dispositionCallByCode = function (dispositionCode) {
	                var callId = _this._activeCall.getCallIdMaster();
	                var agent = _this._agent;
	                var data = {
	                    DispositionCode: dispositionCode,
	                    AgentId: agent.agentID,
	                    CallId: callId,
	                };
	                var dispCallByCode = function () {
	                    var url = "DispositionCallByCode";
	                    agentCMDAPI
	                        .APIInstance()
	                        .post(url, data)
	                        .catch(function () { return _this.defaultCallError(); });
	                };
	                if (agent.isAgentInWrapStatus() || agent.isManualCallWrap())
	                    return dispCallByCode();
	                on('dispositionPending', function () { return dispCallByCode(); });
	                _this.hangupRequest(callId);
	            };
	            this.listAvailableOnlineAgents = function () {
	                var url = "ListAvailableOnlineAgents?agentId=" + _this._agent.agentID;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return trigger('listAvailableOnlineAgents', convertToJson(res.data)); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.dispositionCallBackByCode = function (dispositionCode, year, month, day, hour, minute, phoneNumber, specificAgent) {
	                var callId = _this._activeCall.getCallIdMaster();
	                var agent = _this._agent;
	                var dispCallbackByCode = function () {
	                    var data = {
	                        DispositionCode: dispositionCode,
	                        Year: year,
	                        Month: month,
	                        Day: day,
	                        Hour: hour,
	                        Minute: minute,
	                        PhoneNumber: phoneNumber,
	                        SpecificAgent: specificAgent || true,
	                        AgentId: agent.agentID,
	                        CallId: callId,
	                    };
	                    var url = "DispositionCallBackByCode";
	                    agentCMDAPI
	                        .APIInstance()
	                        .post(url, data)
	                        .catch(function () { return _this.defaultCallError(); });
	                };
	                if (agent.isAgentInWrapStatus() || agent.isManualCallWrap())
	                    return dispCallbackByCode();
	                on('dispositionPending', function () { return dispCallbackByCode(); });
	                _this.hangupRequest(callId);
	            };
	            this.dispositionCallBack = function (dispositionId, year, month, day, hour, minute, phoneNumber, specificAgent, forceCallId) {
	                if (specificAgent === void 0) { specificAgent = false; }
	                var callId = forceCallId || _this._activeCall.getCallIdMaster();
	                var agent = _this._agent;
	                var dispCallback = function () {
	                    var data = {
	                        DispositionId: dispositionId,
	                        Year: year,
	                        Month: month,
	                        Day: day,
	                        Hour: hour,
	                        Minute: minute,
	                        PhoneNumber: phoneNumber,
	                        SpecificAgent: specificAgent || true,
	                        AgentId: agent.agentID,
	                        CallId: callId,
	                    };
	                    var url = "DispositionCallBack";
	                    agentCMDAPI
	                        .APIInstance()
	                        .post(url, data)
	                        .catch(function () { return _this.defaultCallError(); });
	                };
	                if (agent.isAgentInWrapStatus() || agent.isManualCallWrap())
	                    return dispCallback();
	                on('dispositionPending', function () { return dispCallback(); });
	                _this.hangupRequest(callId);
	            };
	            this.dispositionCall = function (dispositionId, forceCallId) {
	                var callId = forceCallId || _this._activeCall.getCallIdMaster();
	                var agent = _this._agent;
	                var dispCall = function () {
	                    var data = {
	                        DispositionId: dispositionId,
	                        AgentId: agent.agentID,
	                        CallId: callId,
	                    };
	                    var url = "DispositionCall";
	                    agentCMDAPI
	                        .APIInstance()
	                        .post(url, data)
	                        .catch(function () { return _this.defaultCallError(); });
	                };
	                if (agent.isAgentInWrapStatus() || agent.isManualCallWrap())
	                    return dispCall();
	                on('dispositionPending', function () { return dispCall(); });
	                _this.hangupRequest(callId);
	            };
	            this.consultingRequest = function (phoneNumber, campaignId, uuiData) {
	                var data = {
	                    PhoneNumber: phoneNumber,
	                    CampaignId: campaignId,
	                    Uui: uuiData || null,
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "ConsultingRequest";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.consultingAgentRequest = function (transferAgentId, transferLogin, uuiData) {
	                var data = {
	                    TransferAgentId: transferAgentId,
	                    TransferLogin: transferLogin,
	                    Uui: uuiData,
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "ConsultingAgentRequest";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.closeCustomer = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "CloseCustomer";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.closeCustomerWithDispositionId = function (dispositionId) {
	                var data = {
	                    DispositionId: dispositionId,
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "CloseCustomerWithDispositionId";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.closeCustomerWithDispositionCode = function (dispositionCode) {
	                var url = "CloseCustomerWithDispositionCode?agentId=" + _this._agent.agentID + "&dispositionCode=" + dispositionCode;
	                agentCMDAPI.APIInstance().get(url);
	            };
	            this.conferenceRequest = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "ConferenceRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.stopConferenceRequest = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "StopConferenceRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.referCallRequest = function (agentId, phoneNumber, uui, address) {
	                var _agentId = agentId || _this._agent.agentID;
	                var data = {
	                    Address: address,
	                    PhoneNumber: phoneNumber,
	                    Uui: uui,
	                    AgentId: _agentId,
	                };
	                var url = "ReferCallRequest";
	                agentCMDAPI.APIInstance().post(url, data);
	            };
	            this.getMailingHistory = function (mailingName, recordId, maxResults, lastDaysLimit, dialogId) {
	                var url = "GetMailingHistory?mailingName=" + mailingName + "&recordId=" + recordId + "&maxResults=" + maxResults + "&lastDaysLimit=" + lastDaysLimit;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return trigger('GetMailingHistory', { response: convertToJson(res.data), dialogId: dialogId }); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.getRecordHistory = function (mailingName, recordId, customerId, maxResults, lastDaysLimit, dialogId) {
	                var url = "GetRecordHistory?mailingName=" + mailingName + "&recordId=" + recordId + "&customerId=" + customerId + "&maxResults=" + maxResults + "&lastDaysLimit=" + lastDaysLimit;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return trigger('GetRecordHistory', { response: convertToJson(res.data), dialogId: dialogId }); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.getAsyncRecordHistory = function (history) { return __awaiter(_this, void 0, void 0, function () {
	                var customerId, dialogId, lastDaysLimit, mailingName, maxResults, recordId, url, response;
	                return __generator(this, function (_a) {
	                    switch (_a.label) {
	                        case 0:
	                            customerId = history.customerId, dialogId = history.dialogId, lastDaysLimit = history.lastDaysLimit, mailingName = history.mailingName, maxResults = history.maxResults, recordId = history.recordId;
	                            url = "GetRecordHistory?mailingName=" + mailingName + "&recordId=" + recordId + "&customerId=" + customerId + "&maxResults=" + maxResults + "&lastDaysLimit=" + lastDaysLimit;
	                            return [4 /*yield*/, agentCMDAPI.APIInstance().get(url)];
	                        case 1:
	                            response = _a.sent();
	                            return [2 /*return*/, { response: convertToJson(response.data), dialogId: dialogId }];
	                    }
	                });
	            }); };
	            this.agentDailySummary = function (agentId) {
	                var _agentId = agentId || _this._agent.agentID;
	                var data = {
	                    AgentId: _agentId,
	                };
	                var url = "AgentDailySummary";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return trigger('AgentDailySummary', convertToJson(res.data)); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.getMySupervisor = function (agentId) {
	                var _agentId = agentId || _this._agent.agentID;
	                var url = "GetMySupervisor?agentId=" + _agentId;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return trigger('getMySupervisor', convertToJson(res.data)); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.retrieveSupervisioningMessages = function (agentId, supervisorId, range_start, range_end, broadcast, received) {
	                var _agentId = agentId || _this._agent.agentID;
	                var url = "RetrieveSupervisioningMessages?agentId=" + _agentId + "&supervisorId=" + supervisorId + "&range_start=" + range_start + "&range_end=" + range_end + "&broadcast=" + broadcast + "&received=" + received;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return trigger('retrieveSupervisioningMessages', { response: convertToJson(res.data) }); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.sendMessageToSupervisor = function (agentId, supervisorId, message) {
	                var _agentId = agentId || _this._agent.agentID;
	                var data = {
	                    SupervisorId: supervisorId,
	                    Message: message,
	                    AgentId: _agentId,
	                };
	                var url = "SendMessageToSupervisor";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return trigger('SendMessageToSupervisor', { response: convertToJson(res.data) }); })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.pauseRecording = function (callId, beep, timeout) {
	                var targetBeep = beep ? 1 : 0;
	                var targetCallId = callId || _this._activeCall.callIdActive;
	                var data = {
	                    Beep: targetBeep,
	                    Timeout: timeout,
	                    AgentId: _this._agent.agentID,
	                    CallId: targetCallId,
	                };
	                var url = "PauseRecording";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.resumeRecording = function (callId, beep, timeout) {
	                var targetBeep = beep ? 1 : 0;
	                var targetCallId = callId || _this._activeCall.callIdActive;
	                var data = {
	                    Beep: targetBeep,
	                    Timeout: timeout,
	                    AgentId: _this._agent.agentID,
	                    CallId: targetCallId,
	                };
	                var url = "ResumeRecording";
	                agentCMDAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.extendWrapTimeoutRequest = function (seconds) {
	                var targetCallId = _this._activeCall.callIdActive;
	                var url = "ExtendWrapTimeoutRequest?AgentId=" + _this._agent.agentID + "&CallId=" + targetCallId + "&Seconds=" + seconds;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.listAgentsOnlineWithCampaigns = function () {
	                var url = "ListAgentsOnlineWithCampaigns?agentId=" + _this._agent.agentID;
	                agentCMDAPI
	                    .APIInstance()
	                    .get(url)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.unextendedAgentLogin = function (login, passwd, phoneNumber, callback) {
	                var data = {
	                    PhoneNumber: phoneNumber,
	                    Login: login,
	                    Password: passwd,
	                    ForceLogout: true,
	                };
	                var url = "UnextendedAgentLogin";
	                agentCLD
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) {
	                    var agentId = convertToJson(res.data).agentId;
	                    _this._agentId = agentId;
	                    if (agentId > 0) {
	                        _this._agent.setStatus(EnumAgentStatus.NOTHING);
	                        _this.start();
	                        return callback ? callback(agentId) : trigger('unextendedAgentLogin', agentId);
	                    }
	                    return trigger('unextendedAgentLoginFail', agentId);
	                })
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.connectAgentLoginCall = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "ConnectAgentLoginCall";
	                agentCLD
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.dropAgentLoginCall = function () {
	                var data = {
	                    AgentId: _this._agent.agentID,
	                };
	                var url = "DropAgentLoginCall";
	                agentCLD
	                    .APIInstance()
	                    .post(url, data)
	                    .catch(function () { return _this.defaultCallError(); });
	            };
	            this.setCurrentCustomer = function (mailingName, recordId, indexId, callData, callback, callbackError) {
	                var data = {
	                    MailingName: mailingName,
	                    RecordId: recordId,
	                    IndexId: indexId,
	                    AgentId: (callData && callData.agentId) || _this._agent.agentID,
	                    CallId: (callData && callData.callId) || _this._activeCall.callIdActive,
	                    CustomerId: (callData && callData.customerId) || _this._activeCall.customerId,
	                };
	                var url = 'SetCurrentCustomer';
	                agentCMDAPI.APIInstance().post(url, data)
	                    .then(callback)
	                    .catch(callbackError);
	            };
	            this.thirdPartyEventRequest = function (agentID, eventData) {
	                var url = "ThirdPartyEventRequest?AgentId=" + (_this._agent.agentID || agentID) + "&EventData=" + eventData;
	                agentCMDAPI.APIInstance().post(url);
	            };
	            this._onTokenUpdate = function (data) {
	                worker.postMessage({
	                    eventType: 'updateToken',
	                    agentEvtUrl: _this._agentEvtUrl,
	                    authorization: tokenAPI.tokenType + " " + tokenAPI.accessToken,
	                });
	            };
	        }
	        Object.defineProperty(OlosAgentWS.prototype, "agentID", {
	            get: function () {
	                return this._agentId;
	            },
	            set: function (value) {
	                this._agentId = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(OlosAgentWS.prototype, "status", {
	            get: function () {
	                return this._status;
	            },
	            set: function (value) {
	                this._status = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(OlosAgentWS.prototype, "getActiveCall", {
	            get: function () {
	                return this._activeCall;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return OlosAgentWS;
	    }());

	    var OlosMailingWS = /** @class */ (function () {
	        function OlosMailingWS() {
	            var _this = this;
	            this.setActiveCall = function (actCall) {
	                _this._activeCall = actCall;
	            };
	            this.listMailings = function (campaignId, callback) {
	                var url = "ListMailings?CampaignId=" + campaignId;
	                mailingCMD
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) {
	                    return callback ? callback(convertToJson(res.data)) : trigger('listMailings', convertToJson(res.data));
	                });
	            };
	            this.finalizeClient = function (mailingName, dispId, customerId, callback) {
	                var data = {
	                    DispositionId: dispId,
	                    MailingName: mailingName,
	                    CustomerId: customerId,
	                };
	                var url = "FinalizeClient";
	                mailingCMD
	                    .APIInstance()
	                    .put(url, data)
	                    .then(function (res) {
	                    return callback ? callback(convertToJson(res.data)) : trigger('finalizeClient', convertToJson(res.data));
	                });
	            };
	            this.finalizeClientByDispositionCode = function (campaignId, mailingName, dispCode, customerId, callback) {
	                var data = {
	                    CampaignId: campaignId,
	                    DispositionCode: dispCode,
	                    MailingName: mailingName,
	                    CustomerId: customerId,
	                };
	                var url = "FinalizeClientByDispositionCode";
	                mailingCMD
	                    .APIInstance()
	                    .put(url, data)
	                    .then(function (res) {
	                    return callback
	                        ? callback(convertToJson(res.data))
	                        : trigger('finalizeClientByDispositionCode', convertToJson(res.data));
	                });
	            };
	            this.invalidatePhoneNumber = function (ddd, phoneNumber, callback) {
	                var data = {
	                    DDD: ddd,
	                    PhoneNumber: phoneNumber,
	                    MailingName: _this._activeCall.tableName,
	                    CustomerId: _this._activeCall.customerId,
	                };
	                var url = "FinalizeClientByPhoneNumber";
	                mailingCMD
	                    .APIInstance()
	                    .put(url, data)
	                    .then(function (res) {
	                    return callback ? callback(convertToJson(res.data)) : trigger('invalidatePhoneNumber', convertToJson(res.data));
	                });
	            };
	            this.insertPhoneNumber = function (ddd, phoneNumber, callback) {
	                var data = {
	                    TypePhoneId: 1,
	                    PhoneNumber: "" + ddd + phoneNumber,
	                    MailingName: _this._activeCall.tableName,
	                    CustomerId: _this._activeCall.customerId,
	                };
	                var url = "InsertPhoneNumber";
	                mailingCMD
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) {
	                    return callback ? callback(convertToJson(res.data)) : trigger('insertPhoneNumber', convertToJson(res.data));
	                });
	            };
	            this.updateMailingData = function (field, data, callback) {
	                var mailingData = {
	                    FieldMailing: field,
	                    DataField: data,
	                    MailingName: _this._activeCall.tableName,
	                    CustomerId: _this._activeCall.customerId,
	                };
	                var url = "UpdateMailingData";
	                mailingCMD
	                    .APIInstance()
	                    .put(url, mailingData)
	                    .then(function (res) {
	                    return callback ? callback(convertToJson(res.data)) : trigger('updateMailingData', convertToJson(res.data));
	                });
	            };
	            this.upsertRecordData = function (_a, callbackSuccess, callbackError) {
	                var LayoutId = _a.LayoutId, MailingDataJson = _a.MailingDataJson, MailingName = _a.MailingName, CampaignId = _a.CampaignId, CustomerId = _a.CustomerId;
	                var upsertData = {
	                    LayoutId: LayoutId,
	                    MailingDataJson: MailingDataJson,
	                    MailingName: MailingName,
	                    CampaignId: CampaignId,
	                    CustomerId: CustomerId,
	                };
	                var url = 'UpsertRecordData';
	                mailingCMD
	                    .APIInstance()
	                    .post(url, upsertData)
	                    .then(function (res) { return callbackSuccess(res.data); })
	                    .catch(function (err) { return callbackError(err); });
	            };
	            this.customerCallback = function (callbackData, callbackSuccess, callbackError) {
	                var url = 'CustomerCallback';
	                mailingCMD
	                    .APIInstance()
	                    .post(url, callbackData)
	                    .then(function (res) { return callbackSuccess(res.data); })
	                    .catch(function (err) { return callbackError(err); });
	            };
	            this.unfinalizeClient = function (_a, callbackSuccess, callbackError) {
	                var DispositionId = _a.DispositionId, MailingName = _a.MailingName, CustomerId = _a.CustomerId;
	                var mailingData = {
	                    DispositionId: DispositionId,
	                    MailingName: MailingName,
	                    CustomerId: CustomerId,
	                };
	                var url = "UnfinalizeClient";
	                mailingCMD
	                    .APIInstance()
	                    .put(url, mailingData)
	                    .then(function (res) { return callbackSuccess(res); })
	                    .catch(function (err) { return callbackError(err); });
	            };
	        }
	        return OlosMailingWS;
	    }());

	    var OlosMcx = /** @class */ (function () {
	        function OlosMcx() {
	            var _this = this;
	            this._defaultTimeout = 1000;
	            this.getJourney = function (timeout, callbackSuccess, callbackError) {
	                var data = {
	                    msecTimeout: timeout || _this._defaultTimeout,
	                };
	                var url = 'GetJourney';
	                mcxAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function () { return callbackError(); });
	            };
	            this.disposition = function (information, timeout, callbackSuccess, callbackError) {
	                var data = {
	                    dispositionArgs: information,
	                    msecTimeout: timeout || _this._defaultTimeout,
	                };
	                var url = 'Disposition';
	                mcxAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function (err) { return callbackError(err); });
	            };
	            this.phoneInfoReq = function (information, timeout, callbackSuccess, callbackError) {
	                var data = {
	                    args: information,
	                    msecTimeout: timeout || _this._defaultTimeout,
	                };
	                var url = 'PhoneInfoReq';
	                mcxAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function () { return callbackError(); });
	            };
	            this.search = function (information, timeout, callbackSuccess, callbackError) {
	                var data = {
	                    informationArgs: information,
	                    msecTimeout: timeout || _this._defaultTimeout,
	                };
	                var url = 'Search';
	                mcxAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function () { return callbackError(); });
	            };
	            this.delJourneyFromSms = function (information, timeout, callbackSuccess, callbackError) {
	                var data = {
	                    delJourneyArgs: information,
	                    msecTimeout: timeout || _this._defaultTimeout,
	                };
	                var url = 'DelJourneyFromSms';
	                mcxAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function () { return callbackError(); });
	            };
	            this.recordInfo = function (information, timeout, callbackSuccess, callbackError) {
	                var data = {
	                    informationArgs: information,
	                    msecTimeout: timeout || _this._defaultTimeout,
	                };
	                var url = 'RecordInfo';
	                mcxAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function () { return callbackError(); });
	            };
	            this.recordInfoEncrypt = function (information, timeout, callbackSuccess, callbackError) {
	                var data = {
	                    data: information,
	                    msecTimeout: timeout || _this._defaultTimeout,
	                };
	                var url = 'RecordInfoEncrypt';
	                mcxAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function () { return callbackError(); });
	            };
	            this.setRecordInUse = function (information, timeout, callbackSuccess, callbackError) {
	                var data = {
	                    setRecInUseArgs: information,
	                    msecTimeout: timeout || _this._defaultTimeout,
	                };
	                var url = 'SetRecordInUse';
	                mcxAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function () { return callbackError(); });
	            };
	            this.addHistory = function (information, timeout, callbackSuccess, callbackError) {
	                var data = {
	                    addHistoryArgs: information,
	                    msecTimeout: timeout || _this._defaultTimeout,
	                };
	                var url = 'AddHistory';
	                mcxAPI
	                    .APIInstance()
	                    .post(url, data)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function () { return callbackError(); });
	            };
	        }
	        return OlosMcx;
	    }());

	    var OlosRecordingRetrieve = /** @class */ (function () {
	        function OlosRecordingRetrieve() {
	            var _this = this;
	            this.getConversation = function (conversatioId, conversationDate, max, callbackSuccess, callbackError) {
	                var params = max
	                    ? "conversatioId=" + conversatioId + "&conversationDate=" + conversationDate + "&maxLimit=" + max
	                    : "conversatioId=" + conversatioId + "&conversationDate=" + conversationDate;
	                var url = "Conversation?" + params;
	                recordingRetrieveAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function (err) { return callbackError(err); });
	            };
	            this.getAgentConversation = function (agentId, conversationDate, max, callbackSuccess, callbackError) {
	                var params = {
	                    agentId: String(agentId),
	                    conversationDate: conversationDate,
	                    maxLimit: max,
	                };
	                var url = "Agent";
	                recordingRetrieveAPI
	                    .APIInstance()
	                    .get(url, { params: params })
	                    .then(function (res) { return callbackSuccess(convertToJson(res.data)); })
	                    .catch(function (err) { return callbackError(err); });
	            };
	            this.getConversationByCustomer = function (params) { return __awaiter(_this, void 0, void 0, function () {
	                var url, response;
	                return __generator(this, function (_a) {
	                    switch (_a.label) {
	                        case 0:
	                            url = "Customer";
	                            return [4 /*yield*/, recordingRetrieveAPI.APIInstance().get(url, { params: params })];
	                        case 1:
	                            response = _a.sent();
	                            return [2 /*return*/, response.data];
	                    }
	                });
	            }); };
	            this.getConversationByUser = function (params) { return __awaiter(_this, void 0, void 0, function () {
	                var url, response;
	                return __generator(this, function (_a) {
	                    switch (_a.label) {
	                        case 0:
	                            url = "User";
	                            return [4 /*yield*/, recordingRetrieveAPI.APIInstance().get(url, { params: params })];
	                        case 1:
	                            response = _a.sent();
	                            return [2 /*return*/, response.data];
	                    }
	                });
	            }); };
	        }
	        return OlosRecordingRetrieve;
	    }());

	    var OlosSoftPhone = /** @class */ (function () {
	        function OlosSoftPhone() {
	            this.getPbxToLogin = function (callbackSuccess, callbackError) {
	                var url = 'GetPbxToLogin';
	                softPhoneAPI
	                    .APIInstance()
	                    .get(url)
	                    .then(function (data) { return callbackSuccess && callbackSuccess(data); })
	                    .catch(function (error) { return callbackError && callbackError(error); });
	            };
	        }
	        return OlosSoftPhone;
	    }());

	    var OlosUserConfigWS = /** @class */ (function () {
	        function OlosUserConfigWS() {
	            var _this = this;
	            this.getCampaignByUserLogin = function (login, loginOwner, passwordOwner, callback, callbackError) {
	                // const data = {
	                // 	login:login,
	                // 	loginOwner: loginOwner,
	                // 	passwordOwner: passwordOwner
	                // }
	                // const url = `GetCampaignByUserLogin`
	                var url = "GetCampaignByUserLogin?login=" + login;
	                agentConfigCMD
	                    .APIInstance()
	                    .get(url)
	                    // .post(url, data)
	                    .then(function (response) { return callback(convertToJson(response.data)); })
	                    .catch(function (error) { return callbackError && callbackError(error); });
	            };
	            this.getChatSupervisorAgent = function (agentId, callback) {
	                var url = "GetChatSupervisorAgent?AgentId=" + agentId;
	                agentConfigCMD
	                    .APIInstance()
	                    .get(url)
	                    .then(function (response) {
	                    return callback
	                        ? callback.call(_this, response)
	                        : trigger('getchatsupervisoragent', convertToJson(response.data));
	                });
	            };
	        }
	        return OlosUserConfigWS;
	    }());

	    // TODO - Esse WS ainda não foi migrado para WEB API com Token e esta na fila de desenvolvimento
	    var OlosVoiceSupportWS = /** @class */ (function () {
	        function OlosVoiceSupportWS() {
	            var _this = this;
	            this.callVoiceSupportWS = function (url, triggerName, callback) {
	                voiceSupport
	                    .APIInstance()
	                    .get(url)
	                    .then(function (response) {
	                    return callback ? callback.call(_this, response) : trigger(triggerName, convertToJson(response.data));
	                });
	            };
	            this.start = function (agentLogin, audio, callback) {
	                var url = "VoiceSupportStart?paramAgentLogin=" + agentLogin + "&paramFileName=" + audio;
	                _this.callVoiceSupportWS(url, 'voicesupportstart', callback);
	            };
	            this.pause = function (agentLogin, callback) {
	                var url = "VoiceSupportPause?paramAgentLogin=" + agentLogin;
	                _this.callVoiceSupportWS(url, 'voicesupportpause', callback);
	            };
	            this.resume = function (agentLogin, callback) {
	                var url = "VoiceSupportResume?paramAgentLogin=" + agentLogin;
	                _this.callVoiceSupportWS(url, 'voicesupportresume', callback);
	            };
	            this.stop = function (agentLogin, callback) {
	                var url = "VoiceSupportStop?paramAgentLogin=" + agentLogin;
	                _this.callVoiceSupportWS(url, 'voicesupportstop', callback);
	            };
	        }
	        return OlosVoiceSupportWS;
	    }());

	    var OlosIntegrationWs = /** @class */ (function () {
	        function OlosIntegrationWs() {
	            this.listAvailableOnlineAgentsByCompany = function (agentId, callback) {
	                var url = "ListAvailableOnlineAgentsByCompany?AgentId=" + agentId;
	                integrationCMD
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) {
	                    return callback ? callback(convertToJson(res.data)) : trigger('listAvailableOnlineAgentsByCompany', convertToJson(res.data));
	                });
	            };
	            this.listCampaignsToConsulting = function (campaignId, callback) {
	                var url = "ListCampaignsToConsulting?CampaignId=" + campaignId;
	                integrationCMD
	                    .APIInstance()
	                    .get(url)
	                    .then(function (res) {
	                    return callback ? callback(convertToJson(res.data)) : trigger('listCampaignsToConsulting', convertToJson(res.data));
	                });
	            };
	        }
	        return OlosIntegrationWs;
	    }());

	    exports.Logger = Logger;
	    exports.OlosAgent = OlosAgent;
	    exports.OlosAgentChannel = OlosAgentChannel;
	    exports.OlosAgentChannelWs = OlosAgentChannelWs;
	    exports.OlosAgentWS = OlosAgentWS;
	    exports.OlosIntegrationWs = OlosIntegrationWs;
	    exports.OlosMailingWS = OlosMailingWS;
	    exports.OlosMcx = OlosMcx;
	    exports.OlosRecordingRetrieve = OlosRecordingRetrieve;
	    exports.OlosSoftPhone = OlosSoftPhone;
	    exports.OlosUserConfigWS = OlosUserConfigWS;
	    exports.OlosVoiceSupportWS = OlosVoiceSupportWS;
	    exports.createOlos = createOlos;
	    exports.createOlosCognito = createOlosCognito;
	    exports.olosOff = off;
	    exports.olosOn = on;
	    exports.setCognitoToken = setCognitoToken;
	    exports.terminateWorker = terminateWorker;

	    Object.defineProperty(exports, '__esModule', { value: true });

	})));
	}(olosagentsdk_umd, olosagentsdk_umd.exports));

	const MyBundle = (function () {
	  const agentWS = new olosagentsdk_umd.exports.OlosAgentWS();

	  const addrs = {
	    wsAgentCmd: "http://204.199.43.30:8082/WebAPIAgentControl/AgentCommand/",
	    wsAgentEvt: "http://204.199.43.30:8082/WebAPIAgentControl/AgentEvent/",
	    WsAgentCloud: "http://204.199.43.30:8082/WebAPIAgentControl/CloudAgent/",
	    wsMailingCmd: "http://204.199.43.30:8082/WebAPIMailingControl/MailingCommand/",
	    wsAgentConfig: "http://204.199.43.30:8082/WebAPIConfiguration/AgentConfig/",
	    wsVoiceSupport: "http://204.199.43.30:8082/WsVoiceSupportIntegration/WsVoiceSupportIntegration.asmx",
	    WebAPIAgentControl: "http://204.199.43.30:8082/WebAPIAgentControl/",
	    wsSoftphone: "http://204.199.43.30:8082/WebAPISoftphone/Softphone/",
	    wsMcx: "http://204.199.43.30:8082/WsMcx/wsmcx/Mcx/",
	    wsRecordingRetrieve: "http://204.199.43.30:8082/WebApiRecordingRetrieve/RecordTextComm/",
	  };

	  const auth = {
	    user: "api_token",
	    password: "olos@123",
	    clientID: "e9b9383e437b4bf284553c2f8af3ea82",
	    clientSecret: "MCZ0mUMHJp7ZL0bTGbY_FS8jQqhpH9mHFDmPP9jd8TQ",
	  };

	  const jsLogger = true;

	  function authenticatedOlos(agentLogin, agentPassword) {
	    olosagentsdk_umd.exports.createOlos(addrs, auth, jsLogger);

	    agentWS.agentAuthentication(agentLogin, agentPassword, (callback) => {
	      console.log(`Usuário autenticado com ID: ${callback}`);

	      olosagentsdk_umd.exports.olosOn("PassCode", (payload) => {
	        console.log("Evento PassCode ouvido:", payload);
	      });

	      olosagentsdk_umd.exports.olosOn("LoginCampaign", (payload) => {
	        console.log("Evento LoginCampaign ouvido:", payload);
	      });

	      olosagentsdk_umd.exports.olosOn("Screenpop", (payload) => {
	        console.log("Evento Screenpop ouvido:", payload);
	      });
	    });
	  }

	  return {
	    authenticatedOlos,
	  };
	})();

	return MyBundle;

})(Crypto);
