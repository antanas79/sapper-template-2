function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function noop() {}

function assign(tar, src) {
  // @ts-ignore
  for (var k in src) {
    tar[k] = src[k];
  }

  return tar;
}

function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: {
      file: file,
      line: line,
      column: column,
      char: char
    }
  };
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
}

function is_empty(obj) {
  return Object.keys(obj).length === 0;
}

function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== 'function') {
    throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
  }
}

function subscribe(store) {
  if (store == null) {
    return noop;
  }

  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }

  var unsub = store.subscribe.apply(store, callbacks);
  return unsub.unsubscribe ? function () {
    return unsub.unsubscribe();
  } : unsub;
}

function get_store_value(store) {
  var value;
  subscribe(store, function (_) {
    return value = _;
  })();
  return value;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (_typeof(lets) === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);

      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  var slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);

  if (slot_changes) {
    var slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}

function exclude_internal_props(props) {
  var result = {};

  for (var k in props) {
    if (k[0] !== '$') result[k] = props[k];
  }

  return result;
}

function set_store_value(store, ret) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ret;
  store.set(value);
  return ret;
}

function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function set_attributes(node, attributes) {
  // @ts-ignore
  var descriptors = Object.getOwnPropertyDescriptors(node.__proto__);

  for (var key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === 'style') {
      node.style.cssText = attributes[key];
    } else if (key === '__value') {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}

function children(element) {
  return Array.from(element.childNodes);
}

function claim_element(nodes, name, attributes, svg) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeName === name) {
      var j = 0;
      var remove = [];

      while (j < node.attributes.length) {
        var attribute = node.attributes[j++];

        if (!attributes[attribute.name]) {
          remove.push(attribute.name);
        }
      }

      for (var k = 0; k < remove.length; k++) {
        node.removeAttribute(remove[k]);
      }

      return nodes.splice(i, 1)[0];
    }
  }

  return svg ? svg_element(name) : element(name);
}

function claim_text(nodes, data) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeType === 3) {
      node.data = '' + data;
      return nodes.splice(i, 1)[0];
    }
  }

  return text(data);
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}

function custom_event(type, detail) {
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

function query_selector_all(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  return Array.from(parent.querySelectorAll(selector));
}

var current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error('Function called outside component initialization');
  return current_component;
}

function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

function createEventDispatcher() {
  var component = get_current_component();
  return function (type, detail) {
    var callbacks = component.$$.callbacks[type];

    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      var event = custom_event(type, detail);
      callbacks.slice().forEach(function (fn) {
        fn.call(component, event);
      });
    }
  };
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

function getContext(key) {
  return get_current_component().$$.context.get(key);
}
// shorthand events, or if we want to implement
// a real bubbling mechanism


function bubble(component, event) {
  var callbacks = component.$$.callbacks[event.type];

  if (callbacks) {
    callbacks.slice().forEach(function (fn) {
      return fn(event);
    });
  }
}

var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}

var flushing = false;
var seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (var i = 0; i < dirty_components.length; i += 1) {
      var component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    set_current_component(null);
    dirty_components.length = 0;

    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    } // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (var _i = 0; _i < render_callbacks.length; _i += 1) {
      var callback = render_callbacks[_i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

var outroing = new Set();
var outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;

  while (i--) {
    var o = levels[i];
    var n = updates[i];

    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (var _key3 in n) {
        if (!accounted_for[_key3]) {
          update[_key3] = n[_key3];
          accounted_for[_key3] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (var _key4 in o) {
        accounted_for[_key4] = 1;
      }
    }
  }

  for (var _key5 in to_null_out) {
    if (!(_key5 in update)) update[_key5] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
} // source: https://html.spec.whatwg.org/multipage/indices.html

function bind(component, name, callback) {
  var index = component.$$.props[name];

  if (index !== undefined) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}

function create_component(block) {
  block && block.c();
}

function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}

function mount_component(component, target, anchor, customElement) {
  var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      on_mount = _component$$$.on_mount,
      on_destroy = _component$$$.on_destroy,
      after_update = _component$$$.after_update;
  fragment && fragment.m(target, anchor);

  if (!customElement) {
    // onMount happens before the initial afterUpdate
    add_render_callback(function () {
      var new_on_destroy = on_mount.map(run).filter(is_function);

      if (on_destroy) {
        on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }

      component.$$.on_mount = [];
    });
  }

  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  var $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init$1(component, options, instance, create_fragment, not_equal, props) {
  var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
  var parent_component = current_component;
  set_current_component(component);
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props: props,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty: dirty,
    skip_bound: false
  };
  var ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }

  set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */


var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck(this, SvelteComponent);
  }

  _createClass(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }]);

  return SvelteComponent;
}();

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.35.0'
  }, detail)));
}

function append_dev(target, node) {
  dispatch_dev('SvelteDOMInsert', {
    target: target,
    node: node
  });
  append(target, node);
}

function insert_dev(target, node, anchor) {
  dispatch_dev('SvelteDOMInsert', {
    target: target,
    node: node,
    anchor: anchor
  });
  insert(target, node, anchor);
}

function detach_dev(node) {
  dispatch_dev('SvelteDOMRemove', {
    node: node
  });
  detach(node);
}

function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  var modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev('SvelteDOMAddEventListener', {
    node: node,
    event: event,
    handler: handler,
    modifiers: modifiers
  });
  var dispose = listen(node, event, handler, options);
  return function () {
    dispatch_dev('SvelteDOMRemoveEventListener', {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    dispose();
  };
}

function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', {
    node: node,
    attribute: attribute
  });else dispatch_dev('SvelteDOMSetAttribute', {
    node: node,
    attribute: attribute,
    value: value
  });
}

function set_data_dev(text, data) {
  data = '' + data;
  if (text.wholeText === data) return;
  dispatch_dev('SvelteDOMSetData', {
    node: text,
    data: data
  });
  text.data = data;
}

function validate_each_argument(arg) {
  if (typeof arg !== 'string' && !(arg && _typeof(arg) === 'object' && 'length' in arg)) {
    var msg = '{#each} only iterates over array-like objects.';

    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
      msg += ' You can use a spread to convert this iterable into an array.';
    }

    throw new Error(msg);
  }
}

function validate_slots(name, slot, keys) {
  for (var _i2 = 0, _Object$keys = Object.keys(slot); _i2 < _Object$keys.length; _i2++) {
    var slot_key = _Object$keys[_i2];

    if (!~keys.indexOf(slot_key)) {
      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
    }
  }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */


var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(SvelteComponentDev, _SvelteComponent);

  var _super2 = _createSuper$i(SvelteComponentDev);

  function SvelteComponentDev(options) {
    _classCallCheck(this, SvelteComponentDev);

    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }

    return _super2.call(this);
  }

  _createClass(SvelteComponentDev, [{
    key: "$destroy",
    value: function $destroy() {
      _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

      this.$destroy = function () {
        console.warn('Component was already destroyed'); // eslint-disable-line no-console
      };
    }
  }, {
    key: "$capture_state",
    value: function $capture_state() {}
  }, {
    key: "$inject_state",
    value: function $inject_state() {}
  }]);

  return SvelteComponentDev;
}(SvelteComponent);

var subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */

function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */


function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var stop;
  var subscribers = [];

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;

        for (var i = 0; i < subscribers.length; i += 1) {
          var s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return function () {
      var index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}

function derived(stores, fn, initial_value) {
  var single = !Array.isArray(stores);
  var stores_array = single ? [stores] : stores;
  var auto = fn.length < 2;
  return readable(initial_value, function (set) {
    var inited = false;
    var values = [];
    var pending = 0;
    var cleanup = noop;

    var sync = function sync() {
      if (pending) {
        return;
      }

      cleanup();
      var result = fn(single ? values[0] : values, set);

      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };

    var unsubscribers = stores_array.map(function (store, i) {
      return subscribe(store, function (value) {
        values[i] = value;
        pending &= ~(1 << i);

        if (inited) {
          sync();
        }
      }, function () {
        pending |= 1 << i;
      });
    });
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}

var CONTEXT_KEY = {};

var browser = createCommonjsModule(function (module, exports) {

  var getGlobal = function getGlobal() {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
      return self;
    }

    if (typeof window !== 'undefined') {
      return window;
    }

    if (typeof global !== 'undefined') {
      return global;
    }

    throw new Error('unable to locate global object');
  };

  var global = getGlobal();
  module.exports = exports = global.fetch; // Needed for TypeScript and Webpack.

  if (global.fetch) {
    exports.default = global.fetch.bind(global);
  }

  exports.Headers = global.Headers;
  exports.Request = global.Request;
  exports.Response = global.Response;
});

var isMergeableObject = function isMergeableObject(value) {
  return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
  return !!value && _typeof(value) === 'object';
}

function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
} // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25


var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}

function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function (element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}

function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }

  var customMerge = options.customMerge(key);
  return typeof customMerge === 'function' ? customMerge : deepmerge;
}

function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}

function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
} // Protects from prototype poisoning and unexpected merging up the prototype chain.


function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
  && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
  && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
  var destination = {};

  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function (key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }

  getKeys(source).forEach(function (key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }

    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}

function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject; // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  // implementations can use it. The caller may not replace it.

  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}

deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array');
  }

  return array.reduce(function (prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};

var deepmerge_1 = deepmerge;
var cjs = deepmerge_1;

/*! *****************************************************************************
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

/* global Reflect, Promise */
var _extendStatics$2 = function extendStatics(d, b) {
  _extendStatics$2 = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    }
  };

  return _extendStatics$2(d, b);
};

function __extends$2(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

  _extendStatics$2(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign$2 = function __assign() {
  _assign$2 = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign$2.apply(this, arguments);
};
function __spreadArray$1(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
}

/*! *****************************************************************************
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

/* global Reflect, Promise */
var _extendStatics$1 = function extendStatics(d, b) {
  _extendStatics$1 = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    }
  };

  return _extendStatics$1(d, b);
};

function __extends$1(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

  _extendStatics$1(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign$1 = function __assign() {
  _assign$1 = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign$1.apply(this, arguments);
};
function __spreadArray(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
}

var TYPE;

(function (TYPE) {
  /**
   * Raw text
   */
  TYPE[TYPE["literal"] = 0] = "literal";
  /**
   * Variable w/o any format, e.g `var` in `this is a {var}`
   */

  TYPE[TYPE["argument"] = 1] = "argument";
  /**
   * Variable w/ number format
   */

  TYPE[TYPE["number"] = 2] = "number";
  /**
   * Variable w/ date format
   */

  TYPE[TYPE["date"] = 3] = "date";
  /**
   * Variable w/ time format
   */

  TYPE[TYPE["time"] = 4] = "time";
  /**
   * Variable w/ select format
   */

  TYPE[TYPE["select"] = 5] = "select";
  /**
   * Variable w/ plural format
   */

  TYPE[TYPE["plural"] = 6] = "plural";
  /**
   * Only possible within plural argument.
   * This is the `#` symbol that will be substituted with the count.
   */

  TYPE[TYPE["pound"] = 7] = "pound";
  /**
   * XML-like tag
   */

  TYPE[TYPE["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));

var SKELETON_TYPE;

(function (SKELETON_TYPE) {
  SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
  SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
/**
 * Type Guards
 */


function isLiteralElement(el) {
  return el.type === TYPE.literal;
}
function isArgumentElement(el) {
  return el.type === TYPE.argument;
}
function isNumberElement(el) {
  return el.type === TYPE.number;
}
function isDateElement(el) {
  return el.type === TYPE.date;
}
function isTimeElement(el) {
  return el.type === TYPE.time;
}
function isSelectElement(el) {
  return el.type === TYPE.select;
}
function isPluralElement(el) {
  return el.type === TYPE.plural;
}
function isPoundElement(el) {
  return el.type === TYPE.pound;
}
function isTagElement(el) {
  return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
  return !!(el && _typeof(el) === 'object' && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
  return !!(el && _typeof(el) === 'object' && el.type === SKELETON_TYPE.dateTime);
}

/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
 * with some tweaks
 */

var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */

function parseDateTimeSkeleton(skeleton) {
  var result = {};
  skeleton.replace(DATE_TIME_REGEX, function (match) {
    var len = match.length;

    switch (match[0]) {
      // Era
      case 'G':
        result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
        break;
      // Year

      case 'y':
        result.year = len === 2 ? '2-digit' : 'numeric';
        break;

      case 'Y':
      case 'u':
      case 'U':
      case 'r':
        throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
      // Quarter

      case 'q':
      case 'Q':
        throw new RangeError('`q/Q` (quarter) patterns are not supported');
      // Month

      case 'M':
      case 'L':
        result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
        break;
      // Week

      case 'w':
      case 'W':
        throw new RangeError('`w/W` (week) patterns are not supported');

      case 'd':
        result.day = ['numeric', '2-digit'][len - 1];
        break;

      case 'D':
      case 'F':
      case 'g':
        throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
      // Weekday

      case 'E':
        result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
        break;

      case 'e':
        if (len < 4) {
          throw new RangeError('`e..eee` (weekday) patterns are not supported');
        }

        result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
        break;

      case 'c':
        if (len < 4) {
          throw new RangeError('`c..ccc` (weekday) patterns are not supported');
        }

        result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
        break;
      // Period

      case 'a':
        // AM, PM
        result.hour12 = true;
        break;

      case 'b': // am, pm, noon, midnight

      case 'B':
        // flexible day periods
        throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
      // Hour

      case 'h':
        result.hourCycle = 'h12';
        result.hour = ['numeric', '2-digit'][len - 1];
        break;

      case 'H':
        result.hourCycle = 'h23';
        result.hour = ['numeric', '2-digit'][len - 1];
        break;

      case 'K':
        result.hourCycle = 'h11';
        result.hour = ['numeric', '2-digit'][len - 1];
        break;

      case 'k':
        result.hourCycle = 'h24';
        result.hour = ['numeric', '2-digit'][len - 1];
        break;

      case 'j':
      case 'J':
      case 'C':
        throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
      // Minute

      case 'm':
        result.minute = ['numeric', '2-digit'][len - 1];
        break;
      // Second

      case 's':
        result.second = ['numeric', '2-digit'][len - 1];
        break;

      case 'S':
      case 'A':
        throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead');
      // Zone

      case 'z':
        // 1..3, 4: specific non-location format
        result.timeZoneName = len < 4 ? 'short' : 'long';
        break;

      case 'Z': // 1..3, 4, 5: The ISO8601 varios formats

      case 'O': // 1, 4: miliseconds in day short, long

      case 'v': // 1, 4: generic non-location format

      case 'V': // 1, 2, 3, 4: time zone ID or city

      case 'X': // 1, 2, 3, 4: The ISO8601 varios formats

      case 'x':
        // 1, 2, 3, 4: The ISO8601 varios formats
        throw new RangeError('`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead');
    }

    return '';
  });
  return result;
}

function icuUnitToEcma(unit) {
  return unit.replace(/^(.*?)-/, '');
}

var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;

function parseSignificantPrecision(str) {
  var result = {};
  str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
    // @@@ case
    if (typeof g2 !== 'string') {
      result.minimumSignificantDigits = g1.length;
      result.maximumSignificantDigits = g1.length;
    } // @@@+ case
    else if (g2 === '+') {
        result.minimumSignificantDigits = g1.length;
      } // .### case
      else if (g1[0] === '#') {
          result.maximumSignificantDigits = g1.length;
        } // .@@## or .@@@ case
        else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length + (typeof g2 === 'string' ? g2.length : 0);
          }

    return '';
  });
  return result;
}

function parseSign(str) {
  switch (str) {
    case 'sign-auto':
      return {
        signDisplay: 'auto'
      };

    case 'sign-accounting':
    case '()':
      return {
        currencySign: 'accounting'
      };

    case 'sign-always':
    case '+!':
      return {
        signDisplay: 'always'
      };

    case 'sign-accounting-always':
    case '()!':
      return {
        signDisplay: 'always',
        currencySign: 'accounting'
      };

    case 'sign-except-zero':
    case '+?':
      return {
        signDisplay: 'exceptZero'
      };

    case 'sign-accounting-except-zero':
    case '()?':
      return {
        signDisplay: 'exceptZero',
        currencySign: 'accounting'
      };

    case 'sign-never':
    case '+_':
      return {
        signDisplay: 'never'
      };
  }
}

function parseConciseScientificAndEngineeringStem(stem) {
  // Engineering
  var result;

  if (stem[0] === 'E' && stem[1] === 'E') {
    result = {
      notation: 'engineering'
    };
    stem = stem.slice(2);
  } else if (stem[0] === 'E') {
    result = {
      notation: 'scientific'
    };
    stem = stem.slice(1);
  }

  if (result) {
    var signDisplay = stem.slice(0, 2);

    if (signDisplay === '+!') {
      result.signDisplay = 'always';
      stem = stem.slice(2);
    } else if (signDisplay === '+?') {
      result.signDisplay = 'exceptZero';
      stem = stem.slice(2);
    }

    if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
      throw new Error('Malformed concise eng/scientific notation');
    }

    result.minimumIntegerDigits = stem.length;
  }

  return result;
}

function parseNotationOptions(opt) {
  var result = {};
  var signOpts = parseSign(opt);

  if (signOpts) {
    return signOpts;
  }

  return result;
}
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */


function parseNumberSkeleton(tokens) {
  var result = {};

  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];

    switch (token.stem) {
      case 'percent':
      case '%':
        result.style = 'percent';
        continue;

      case '%x100':
        result.style = 'percent';
        result.scale = 100;
        continue;

      case 'currency':
        result.style = 'currency';
        result.currency = token.options[0];
        continue;

      case 'group-off':
      case ',_':
        result.useGrouping = false;
        continue;

      case 'precision-integer':
      case '.':
        result.maximumFractionDigits = 0;
        continue;

      case 'measure-unit':
      case 'unit':
        result.style = 'unit';
        result.unit = icuUnitToEcma(token.options[0]);
        continue;

      case 'compact-short':
      case 'K':
        result.notation = 'compact';
        result.compactDisplay = 'short';
        continue;

      case 'compact-long':
      case 'KK':
        result.notation = 'compact';
        result.compactDisplay = 'long';
        continue;

      case 'scientific':
        result = _assign$1(_assign$1(_assign$1({}, result), {
          notation: 'scientific'
        }), token.options.reduce(function (all, opt) {
          return _assign$1(_assign$1({}, all), parseNotationOptions(opt));
        }, {}));
        continue;

      case 'engineering':
        result = _assign$1(_assign$1(_assign$1({}, result), {
          notation: 'engineering'
        }), token.options.reduce(function (all, opt) {
          return _assign$1(_assign$1({}, all), parseNotationOptions(opt));
        }, {}));
        continue;

      case 'notation-simple':
        result.notation = 'standard';
        continue;
      // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h

      case 'unit-width-narrow':
        result.currencyDisplay = 'narrowSymbol';
        result.unitDisplay = 'narrow';
        continue;

      case 'unit-width-short':
        result.currencyDisplay = 'code';
        result.unitDisplay = 'short';
        continue;

      case 'unit-width-full-name':
        result.currencyDisplay = 'name';
        result.unitDisplay = 'long';
        continue;

      case 'unit-width-iso-code':
        result.currencyDisplay = 'symbol';
        continue;

      case 'scale':
        result.scale = parseFloat(token.options[0]);
        continue;
      // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width

      case 'integer-width':
        if (token.options.length > 1) {
          throw new RangeError('integer-width stems only accept a single optional option');
        }

        token.options[0].replace(INTEGER_WIDTH_REGEX, function (_, g1, g2, g3, g4, g5) {
          if (g1) {
            result.minimumIntegerDigits = g2.length;
          } else if (g3 && g4) {
            throw new Error('We currently do not support maximum integer digits');
          } else if (g5) {
            throw new Error('We currently do not support exact integer digits');
          }

          return '';
        });
        continue;
    } // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width


    if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
      result.minimumIntegerDigits = token.stem.length;
      continue;
    }

    if (FRACTION_PRECISION_REGEX.test(token.stem)) {
      // Precision
      // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#fraction-precision
      // precision-integer case
      if (token.options.length > 1) {
        throw new RangeError('Fraction-precision stems only accept a single optional option');
      }

      token.stem.replace(FRACTION_PRECISION_REGEX, function (_, g1, g2, g3, g4, g5) {
        // .000* case (before ICU67 it was .000+)
        if (g2 === '*') {
          result.minimumFractionDigits = g1.length;
        } // .### case
        else if (g3 && g3[0] === '#') {
            result.maximumFractionDigits = g3.length;
          } // .00## case
          else if (g4 && g5) {
              result.minimumFractionDigits = g4.length;
              result.maximumFractionDigits = g4.length + g5.length;
            } else {
              result.minimumFractionDigits = g1.length;
              result.maximumFractionDigits = g1.length;
            }

        return '';
      });

      if (token.options.length) {
        result = _assign$1(_assign$1({}, result), parseSignificantPrecision(token.options[0]));
      }

      continue;
    } // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#significant-digits-precision


    if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
      result = _assign$1(_assign$1({}, result), parseSignificantPrecision(token.stem));
      continue;
    }

    var signOpts = parseSign(token.stem);

    if (signOpts) {
      result = _assign$1(_assign$1({}, result), signOpts);
    }

    var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);

    if (conciseScientificAndEngineeringOpts) {
      result = _assign$1(_assign$1({}, result), conciseScientificAndEngineeringOpts);
    }
  }

  return result;
}

// @ts-nocheck

var SyntaxError =
/** @class */
function (_super) {
  __extends$1(SyntaxError, _super);

  function SyntaxError(message, expected, found, location) {
    var _this = _super.call(this) || this;

    _this.message = message;
    _this.expected = expected;
    _this.found = found;
    _this.location = location;
    _this.name = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(_this, SyntaxError);
    }

    return _this;
  }

  SyntaxError.buildMessage = function (expected, found) {
    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return "\\x" + hex(ch);
      });
    }

    function classEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return "\\x" + hex(ch);
      });
    }

    function describeExpectation(expectation) {
      switch (expectation.type) {
        case "literal":
          return "\"" + literalEscape(expectation.text) + "\"";

        case "class":
          var escapedParts = expectation.parts.map(function (part) {
            return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
          });
          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";

        case "any":
          return "any character";

        case "end":
          return "end of input";

        case "other":
          return expectation.description;
      }
    }

    function describeExpected(expected1) {
      var descriptions = expected1.map(describeExpectation);
      var i;
      var j;
      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }

        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found1) {
      return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  return SyntaxError;
}(Error);

function peg$parse(input, options) {
  options = options !== undefined ? options : {};
  var peg$FAILED = {};
  var peg$startRuleFunctions = {
    start: peg$parsestart
  };
  var peg$startRuleFunction = peg$parsestart;

  var peg$c0 = function peg$c0() {
    return !ignoreTag;
  };

  var peg$c1 = function peg$c1(x) {
    return x;
  };

  var peg$c2 = function peg$c2() {
    return ignoreTag;
  };

  var peg$c3 = "<";
  var peg$c4 = peg$literalExpectation("<", false);

  var peg$c5 = function peg$c5(parts) {
    return parts.join('');
  };

  var peg$c6 = function peg$c6() {
    return '<';
  };

  var peg$c7 = function peg$c7(messageText) {
    return _assign$1({
      type: TYPE.literal,
      value: messageText
    }, insertLocation());
  };

  var peg$c8 = "#";
  var peg$c9 = peg$literalExpectation("#", false);

  var peg$c10 = function peg$c10() {
    return _assign$1({
      type: TYPE.pound
    }, insertLocation());
  };

  var peg$c11 = peg$otherExpectation("tagElement");

  var peg$c12 = function peg$c12(open, children, close) {
    if (open !== close) {
      error("Mismatch tag \"" + open + "\" !== \"" + close + "\"", location());
    }

    return _assign$1({
      type: TYPE.tag,
      value: open,
      children: children
    }, insertLocation());
  };

  var peg$c13 = "/>";
  var peg$c14 = peg$literalExpectation("/>", false);

  var peg$c15 = function peg$c15(value) {
    return _assign$1({
      type: TYPE.literal,
      value: value.join('')
    }, insertLocation());
  };

  var peg$c16 = ">";
  var peg$c17 = peg$literalExpectation(">", false);

  var peg$c18 = function peg$c18(tag) {
    return tag;
  };

  var peg$c19 = "</";
  var peg$c20 = peg$literalExpectation("</", false);
  var peg$c21 = peg$otherExpectation("argumentElement");
  var peg$c22 = "{";
  var peg$c23 = peg$literalExpectation("{", false);
  var peg$c24 = "}";
  var peg$c25 = peg$literalExpectation("}", false);

  var peg$c26 = function peg$c26(value) {
    return _assign$1({
      type: TYPE.argument,
      value: value
    }, insertLocation());
  };

  var peg$c27 = peg$otherExpectation("numberSkeletonId");
  var peg$c28 = /^['\/{}]/;
  var peg$c29 = peg$classExpectation(["'", "/", "{", "}"], false, false);
  var peg$c30 = peg$anyExpectation();
  var peg$c31 = peg$otherExpectation("numberSkeletonTokenOption");
  var peg$c32 = "/";
  var peg$c33 = peg$literalExpectation("/", false);

  var peg$c34 = function peg$c34(option) {
    return option;
  };

  var peg$c35 = peg$otherExpectation("numberSkeletonToken");

  var peg$c36 = function peg$c36(stem, options) {
    return {
      stem: stem,
      options: options
    };
  };

  var peg$c37 = function peg$c37(tokens) {
    return _assign$1({
      type: SKELETON_TYPE.number,
      tokens: tokens,
      parsedOptions: shouldParseSkeleton ? parseNumberSkeleton(tokens) : {}
    }, insertLocation());
  };

  var peg$c38 = "::";
  var peg$c39 = peg$literalExpectation("::", false);

  var peg$c40 = function peg$c40(skeleton) {
    return skeleton;
  };

  var peg$c41 = function peg$c41() {
    messageCtx.push('numberArgStyle');
    return true;
  };

  var peg$c42 = function peg$c42(style) {
    messageCtx.pop();
    return style.replace(/\s*$/, '');
  };

  var peg$c43 = ",";
  var peg$c44 = peg$literalExpectation(",", false);
  var peg$c45 = "number";
  var peg$c46 = peg$literalExpectation("number", false);

  var peg$c47 = function peg$c47(value, type, style) {
    return _assign$1({
      type: type === 'number' ? TYPE.number : type === 'date' ? TYPE.date : TYPE.time,
      style: style && style[2],
      value: value
    }, insertLocation());
  };

  var peg$c48 = "'";
  var peg$c49 = peg$literalExpectation("'", false);
  var peg$c50 = /^[^']/;
  var peg$c51 = peg$classExpectation(["'"], true, false);
  var peg$c52 = /^[^a-zA-Z'{}]/;
  var peg$c53 = peg$classExpectation([["a", "z"], ["A", "Z"], "'", "{", "}"], true, false);
  var peg$c54 = /^[a-zA-Z]/;
  var peg$c55 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);

  var peg$c56 = function peg$c56(pattern) {
    return _assign$1({
      type: SKELETON_TYPE.dateTime,
      pattern: pattern,
      parsedOptions: shouldParseSkeleton ? parseDateTimeSkeleton(pattern) : {}
    }, insertLocation());
  };

  var peg$c57 = function peg$c57() {
    messageCtx.push('dateOrTimeArgStyle');
    return true;
  };

  var peg$c58 = "date";
  var peg$c59 = peg$literalExpectation("date", false);
  var peg$c60 = "time";
  var peg$c61 = peg$literalExpectation("time", false);
  var peg$c62 = "plural";
  var peg$c63 = peg$literalExpectation("plural", false);
  var peg$c64 = "selectordinal";
  var peg$c65 = peg$literalExpectation("selectordinal", false);
  var peg$c66 = "offset:";
  var peg$c67 = peg$literalExpectation("offset:", false);

  var peg$c68 = function peg$c68(value, pluralType, offset, options) {
    return _assign$1({
      type: TYPE.plural,
      pluralType: pluralType === 'plural' ? 'cardinal' : 'ordinal',
      value: value,
      offset: offset ? offset[2] : 0,
      options: options.reduce(function (all, _a) {
        var id = _a.id,
            value = _a.value,
            optionLocation = _a.location;

        if (id in all) {
          error("Duplicate option \"" + id + "\" in plural element: \"" + text() + "\"", location());
        }

        all[id] = {
          value: value,
          location: optionLocation
        };
        return all;
      }, {})
    }, insertLocation());
  };

  var peg$c69 = "select";
  var peg$c70 = peg$literalExpectation("select", false);

  var peg$c71 = function peg$c71(value, options) {
    return _assign$1({
      type: TYPE.select,
      value: value,
      options: options.reduce(function (all, _a) {
        var id = _a.id,
            value = _a.value,
            optionLocation = _a.location;

        if (id in all) {
          error("Duplicate option \"" + id + "\" in select element: \"" + text() + "\"", location());
        }

        all[id] = {
          value: value,
          location: optionLocation
        };
        return all;
      }, {})
    }, insertLocation());
  };

  var peg$c72 = "=";
  var peg$c73 = peg$literalExpectation("=", false);

  var peg$c74 = function peg$c74(id) {
    messageCtx.push('select');
    return true;
  };

  var peg$c75 = function peg$c75(id, value) {
    messageCtx.pop();
    return _assign$1({
      id: id,
      value: value
    }, insertLocation());
  };

  var peg$c76 = function peg$c76(id) {
    messageCtx.push('plural');
    return true;
  };

  var peg$c77 = function peg$c77(id, value) {
    messageCtx.pop();
    return _assign$1({
      id: id,
      value: value
    }, insertLocation());
  };

  var peg$c78 = peg$otherExpectation("whitespace");
  var peg$c79 = /^[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
  var peg$c80 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\xA0", "\u1680", ["\u2000", "\u200A"], "\u2028", "\u2029", "\u202F", "\u205F", "\u3000"], false, false);
  var peg$c81 = peg$otherExpectation("syntax pattern");
  var peg$c82 = /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/;
  var peg$c83 = peg$classExpectation([["!", "/"], [":", "@"], ["[", "^"], "`", ["{", "~"], ["\xA1", "\xA7"], "\xA9", "\xAB", "\xAC", "\xAE", "\xB0", "\xB1", "\xB6", "\xBB", "\xBF", "\xD7", "\xF7", ["\u2010", "\u2027"], ["\u2030", "\u203E"], ["\u2041", "\u2053"], ["\u2055", "\u205E"], ["\u2190", "\u245F"], ["\u2500", "\u2775"], ["\u2794", "\u2BFF"], ["\u2E00", "\u2E7F"], ["\u3001", "\u3003"], ["\u3008", "\u3020"], "\u3030", "\uFD3E", "\uFD3F", "\uFE45", "\uFE46"], false, false);
  var peg$c84 = peg$otherExpectation("optional whitespace");
  var peg$c85 = peg$otherExpectation("number");
  var peg$c86 = "-";
  var peg$c87 = peg$literalExpectation("-", false);

  var peg$c88 = function peg$c88(negative, num) {
    return num ? negative ? -num : num : 0;
  };
  var peg$c90 = peg$otherExpectation("double apostrophes");
  var peg$c91 = "''";
  var peg$c92 = peg$literalExpectation("''", false);

  var peg$c93 = function peg$c93() {
    return "'";
  };

  var peg$c94 = function peg$c94(escapedChar, quotedChars) {
    return escapedChar + quotedChars.replace("''", "'");
  };

  var peg$c95 = function peg$c95(x) {
    return x !== '<' && x !== '{' && !(isInPluralOption() && x === '#') && !(isNestedMessageText() && x === '}');
  };

  var peg$c96 = "\n";
  var peg$c97 = peg$literalExpectation("\n", false);

  var peg$c98 = function peg$c98(x) {
    return x === '<' || x === '>' || x === '{' || x === '}' || isInPluralOption() && x === '#';
  };

  var peg$c99 = peg$otherExpectation("argNameOrNumber");
  var peg$c100 = peg$otherExpectation("validTag");
  var peg$c101 = peg$otherExpectation("argNumber");
  var peg$c102 = "0";
  var peg$c103 = peg$literalExpectation("0", false);

  var peg$c104 = function peg$c104() {
    return 0;
  };

  var peg$c105 = /^[1-9]/;
  var peg$c106 = peg$classExpectation([["1", "9"]], false, false);
  var peg$c107 = /^[0-9]/;
  var peg$c108 = peg$classExpectation([["0", "9"]], false, false);

  var peg$c109 = function peg$c109(digits) {
    return parseInt(digits.join(''), 10);
  };

  var peg$c110 = peg$otherExpectation("argName");
  var peg$c111 = peg$otherExpectation("tagName");
  var peg$currPos = 0;
  var peg$savedPos = 0;
  var peg$posDetailsCache = [{
    line: 1,
    column: 1
  }];
  var peg$maxFailPos = 0;
  var peg$maxFailExpected = [];
  var peg$silentFails = 0;
  var peg$result;

  if (options.startRule !== undefined) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function error(message, location1) {
    location1 = location1 !== undefined ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);
    throw peg$buildSimpleError(message, location1);
  }

  function peg$literalExpectation(text1, ignoreCase) {
    return {
      type: "literal",
      text: text1,
      ignoreCase: ignoreCase
    };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return {
      type: "class",
      parts: parts,
      inverted: inverted,
      ignoreCase: ignoreCase
    };
  }

  function peg$anyExpectation() {
    return {
      type: "any"
    };
  }

  function peg$endExpectation() {
    return {
      type: "end"
    };
  }

  function peg$otherExpectation(description) {
    return {
      type: "other",
      description: description
    };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      p = pos - 1;

      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);
    return {
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected1) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected1);
  }

  function peg$buildSimpleError(message, location1) {
    return new SyntaxError(message, [], "", location1);
  }

  function peg$buildStructuredError(expected1, found, location1) {
    return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
  }

  function peg$parsestart() {
    var s0;
    s0 = peg$parsemessage();
    return s0;
  }

  function peg$parsemessage() {
    var s0, s1;
    s0 = [];
    s1 = peg$parsemessageElement();

    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parsemessageElement();
    }

    return s0;
  }

  function peg$parsemessageElement() {
    var s0, s1, s2;
    s0 = peg$currPos;
    peg$savedPos = peg$currPos;
    s1 = peg$c0();

    if (s1) {
      s1 = undefined;
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parsetagElement();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$parseliteralElement();

      if (s0 === peg$FAILED) {
        s0 = peg$parseargumentElement();

        if (s0 === peg$FAILED) {
          s0 = peg$parsesimpleFormatElement();

          if (s0 === peg$FAILED) {
            s0 = peg$parsepluralElement();

            if (s0 === peg$FAILED) {
              s0 = peg$parseselectElement();

              if (s0 === peg$FAILED) {
                s0 = peg$parsepoundElement();
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsemessageText() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    peg$savedPos = peg$currPos;
    s1 = peg$c2();

    if (s1) {
      s1 = undefined;
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsedoubleApostrophes();

      if (s3 === peg$FAILED) {
        s3 = peg$parsequotedString();

        if (s3 === peg$FAILED) {
          s3 = peg$parseunquotedString();

          if (s3 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 60) {
              s3 = peg$c3;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c4);
              }
            }
          }
        }
      }

      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsedoubleApostrophes();

          if (s3 === peg$FAILED) {
            s3 = peg$parsequotedString();

            if (s3 === peg$FAILED) {
              s3 = peg$parseunquotedString();

              if (s3 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 60) {
                  s3 = peg$c3;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c4);
                  }
                }
              }
            }
          }
        }
      } else {
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c5(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsedoubleApostrophes();

      if (s2 === peg$FAILED) {
        s2 = peg$parsequotedString();

        if (s2 === peg$FAILED) {
          s2 = peg$parseunquotedString();

          if (s2 === peg$FAILED) {
            s2 = peg$parsenonTagStartingAngleBracket();
          }
        }
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsedoubleApostrophes();

          if (s2 === peg$FAILED) {
            s2 = peg$parsequotedString();

            if (s2 === peg$FAILED) {
              s2 = peg$parseunquotedString();

              if (s2 === peg$FAILED) {
                s2 = peg$parsenonTagStartingAngleBracket();
              }
            }
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c5(s1);
      }

      s0 = s1;
    }

    return s0;
  }

  function peg$parsenonTagStartingAngleBracket() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;
    s2 = peg$parseopeningTag();

    if (s2 === peg$FAILED) {
      s2 = peg$parseclosingTag();

      if (s2 === peg$FAILED) {
        s2 = peg$parseselfClosingTag();
      }
    }

    peg$silentFails--;

    if (s2 === peg$FAILED) {
      s1 = undefined;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 60) {
        s2 = peg$c3;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c4);
        }
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c6();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseliteralElement() {
    var s0, s1;
    s0 = peg$currPos;
    s1 = peg$parsemessageText();

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c7(s1);
    }

    s0 = s1;
    return s0;
  }

  function peg$parsepoundElement() {
    var s0, s1;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 35) {
      s1 = peg$c8;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c9);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c10();
    }

    s0 = s1;
    return s0;
  }

  function peg$parsetagElement() {
    var s0, s1, s2, s3;
    peg$silentFails++;
    s0 = peg$parseselfClosingTag();

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseopeningTag();

      if (s1 !== peg$FAILED) {
        s2 = peg$parsemessage();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseclosingTag();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c12(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c11);
      }
    }

    return s0;
  }

  function peg$parseselfClosingTag() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 60) {
      s2 = peg$c3;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c4);
      }
    }

    if (s2 !== peg$FAILED) {
      s3 = peg$parsevalidTag();

      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();

        if (s4 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c13) {
            s5 = peg$c13;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c14);
            }
          }

          if (s5 !== peg$FAILED) {
            s2 = [s2, s3, s4, s5];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c15(s1);
    }

    s0 = s1;
    return s0;
  }

  function peg$parseopeningTag() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 60) {
      s1 = peg$c3;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c4);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parsevalidTag();

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 62) {
          s3 = peg$c16;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c17);
          }
        }

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c18(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseclosingTag() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c19) {
      s1 = peg$c19;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c20);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parsevalidTag();

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 62) {
          s3 = peg$c16;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c17);
          }
        }

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c18(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseargumentElement() {
    var s0, s1, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c22;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c23);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseargNameOrNumber();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c24;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c25);
              }
            }

            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c26(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c21);
      }
    }

    return s0;
  }

  function peg$parsenumberSkeletonId() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    s3 = peg$currPos;
    peg$silentFails++;
    s4 = peg$parsewhiteSpace();

    if (s4 === peg$FAILED) {
      if (peg$c28.test(input.charAt(peg$currPos))) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c29);
        }
      }
    }

    peg$silentFails--;

    if (s4 === peg$FAILED) {
      s3 = undefined;
    } else {
      peg$currPos = s3;
      s3 = peg$FAILED;
    }

    if (s3 !== peg$FAILED) {
      if (input.length > peg$currPos) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c30);
        }
      }

      if (s4 !== peg$FAILED) {
        s3 = [s3, s4];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsewhiteSpace();

        if (s4 === peg$FAILED) {
          if (peg$c28.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c29);
            }
          }
        }

        peg$silentFails--;

        if (s4 === peg$FAILED) {
          s3 = undefined;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        if (s3 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c30);
            }
          }

          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c27);
      }
    }

    return s0;
  }

  function peg$parsenumberSkeletonTokenOption() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 47) {
      s1 = peg$c32;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c33);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parsenumberSkeletonId();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c34(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c31);
      }
    }

    return s0;
  }

  function peg$parsenumberSkeletonToken() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parse_();

    if (s1 !== peg$FAILED) {
      s2 = peg$parsenumberSkeletonId();

      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsenumberSkeletonTokenOption();

        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsenumberSkeletonTokenOption();
        }

        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c36(s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c35);
      }
    }

    return s0;
  }

  function peg$parsenumberSkeleton() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsenumberSkeletonToken();

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsenumberSkeletonToken();
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c37(s1);
    }

    s0 = s1;
    return s0;
  }

  function peg$parsenumberArgStyle() {
    var s0, s1, s2;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c38) {
      s1 = peg$c38;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c39);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parsenumberSkeleton();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c40(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      peg$savedPos = peg$currPos;
      s1 = peg$c41();

      if (s1) {
        s1 = undefined;
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsemessageText();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c42(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsenumberFormatElement() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c22;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c23);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseargNameOrNumber();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c43;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c44);
              }
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();

              if (s6 !== peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c45) {
                  s7 = peg$c45;
                  peg$currPos += 6;
                } else {
                  s7 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c46);
                  }
                }

                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();

                  if (s8 !== peg$FAILED) {
                    s9 = peg$currPos;

                    if (input.charCodeAt(peg$currPos) === 44) {
                      s10 = peg$c43;
                      peg$currPos++;
                    } else {
                      s10 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c44);
                      }
                    }

                    if (s10 !== peg$FAILED) {
                      s11 = peg$parse_();

                      if (s11 !== peg$FAILED) {
                        s12 = peg$parsenumberArgStyle();

                        if (s12 !== peg$FAILED) {
                          s10 = [s10, s11, s12];
                          s9 = s10;
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }

                    if (s9 === peg$FAILED) {
                      s9 = null;
                    }

                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();

                      if (s10 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                          s11 = peg$c24;
                          peg$currPos++;
                        } else {
                          s11 = peg$FAILED;

                          if (peg$silentFails === 0) {
                            peg$fail(peg$c25);
                          }
                        }

                        if (s11 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c47(s3, s7, s9);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedateTimeSkeletonLiteral() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 39) {
      s1 = peg$c48;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c49);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsedoubleApostrophes();

      if (s3 === peg$FAILED) {
        if (peg$c50.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c51);
          }
        }
      }

      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsedoubleApostrophes();

          if (s3 === peg$FAILED) {
            if (peg$c50.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c51);
              }
            }
          }
        }
      } else {
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 39) {
          s3 = peg$c48;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c49);
          }
        }

        if (s3 !== peg$FAILED) {
          s1 = [s1, s2, s3];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = [];
      s1 = peg$parsedoubleApostrophes();

      if (s1 === peg$FAILED) {
        if (peg$c52.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c53);
          }
        }
      }

      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsedoubleApostrophes();

          if (s1 === peg$FAILED) {
            if (peg$c52.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c53);
              }
            }
          }
        }
      } else {
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsedateTimeSkeletonPattern() {
    var s0, s1;
    s0 = [];

    if (peg$c54.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c55);
      }
    }

    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);

        if (peg$c54.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c55);
          }
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedateTimeSkeleton() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = [];
    s3 = peg$parsedateTimeSkeletonLiteral();

    if (s3 === peg$FAILED) {
      s3 = peg$parsedateTimeSkeletonPattern();
    }

    if (s3 !== peg$FAILED) {
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsedateTimeSkeletonLiteral();

        if (s3 === peg$FAILED) {
          s3 = peg$parsedateTimeSkeletonPattern();
        }
      }
    } else {
      s2 = peg$FAILED;
    }

    if (s2 !== peg$FAILED) {
      s1 = input.substring(s1, peg$currPos);
    } else {
      s1 = s2;
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c56(s1);
    }

    s0 = s1;
    return s0;
  }

  function peg$parsedateOrTimeArgStyle() {
    var s0, s1, s2;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c38) {
      s1 = peg$c38;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c39);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parsedateTimeSkeleton();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c40(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      peg$savedPos = peg$currPos;
      s1 = peg$c57();

      if (s1) {
        s1 = undefined;
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsemessageText();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c42(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsedateOrTimeFormatElement() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c22;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c23);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseargNameOrNumber();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c43;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c44);
              }
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();

              if (s6 !== peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c58) {
                  s7 = peg$c58;
                  peg$currPos += 4;
                } else {
                  s7 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c59);
                  }
                }

                if (s7 === peg$FAILED) {
                  if (input.substr(peg$currPos, 4) === peg$c60) {
                    s7 = peg$c60;
                    peg$currPos += 4;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c61);
                    }
                  }
                }

                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();

                  if (s8 !== peg$FAILED) {
                    s9 = peg$currPos;

                    if (input.charCodeAt(peg$currPos) === 44) {
                      s10 = peg$c43;
                      peg$currPos++;
                    } else {
                      s10 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c44);
                      }
                    }

                    if (s10 !== peg$FAILED) {
                      s11 = peg$parse_();

                      if (s11 !== peg$FAILED) {
                        s12 = peg$parsedateOrTimeArgStyle();

                        if (s12 !== peg$FAILED) {
                          s10 = [s10, s11, s12];
                          s9 = s10;
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }

                    if (s9 === peg$FAILED) {
                      s9 = null;
                    }

                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();

                      if (s10 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                          s11 = peg$c24;
                          peg$currPos++;
                        } else {
                          s11 = peg$FAILED;

                          if (peg$silentFails === 0) {
                            peg$fail(peg$c25);
                          }
                        }

                        if (s11 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c47(s3, s7, s9);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesimpleFormatElement() {
    var s0;
    s0 = peg$parsenumberFormatElement();

    if (s0 === peg$FAILED) {
      s0 = peg$parsedateOrTimeFormatElement();
    }

    return s0;
  }

  function peg$parsepluralElement() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c22;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c23);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseargNameOrNumber();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c43;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c44);
              }
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();

              if (s6 !== peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c62) {
                  s7 = peg$c62;
                  peg$currPos += 6;
                } else {
                  s7 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c63);
                  }
                }

                if (s7 === peg$FAILED) {
                  if (input.substr(peg$currPos, 13) === peg$c64) {
                    s7 = peg$c64;
                    peg$currPos += 13;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c65);
                    }
                  }
                }

                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();

                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s9 = peg$c43;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c44);
                      }
                    }

                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();

                      if (s10 !== peg$FAILED) {
                        s11 = peg$currPos;

                        if (input.substr(peg$currPos, 7) === peg$c66) {
                          s12 = peg$c66;
                          peg$currPos += 7;
                        } else {
                          s12 = peg$FAILED;

                          if (peg$silentFails === 0) {
                            peg$fail(peg$c67);
                          }
                        }

                        if (s12 !== peg$FAILED) {
                          s13 = peg$parse_();

                          if (s13 !== peg$FAILED) {
                            s14 = peg$parsenumber();

                            if (s14 !== peg$FAILED) {
                              s12 = [s12, s13, s14];
                              s11 = s12;
                            } else {
                              peg$currPos = s11;
                              s11 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s11;
                            s11 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s11;
                          s11 = peg$FAILED;
                        }

                        if (s11 === peg$FAILED) {
                          s11 = null;
                        }

                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();

                          if (s12 !== peg$FAILED) {
                            s13 = [];
                            s14 = peg$parsepluralOption();

                            if (s14 !== peg$FAILED) {
                              while (s14 !== peg$FAILED) {
                                s13.push(s14);
                                s14 = peg$parsepluralOption();
                              }
                            } else {
                              s13 = peg$FAILED;
                            }

                            if (s13 !== peg$FAILED) {
                              s14 = peg$parse_();

                              if (s14 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 125) {
                                  s15 = peg$c24;
                                  peg$currPos++;
                                } else {
                                  s15 = peg$FAILED;

                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c25);
                                  }
                                }

                                if (s15 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c68(s3, s7, s11, s13);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseselectElement() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c22;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c23);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseargNameOrNumber();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c43;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c44);
              }
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();

              if (s6 !== peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c69) {
                  s7 = peg$c69;
                  peg$currPos += 6;
                } else {
                  s7 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c70);
                  }
                }

                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();

                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s9 = peg$c43;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c44);
                      }
                    }

                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();

                      if (s10 !== peg$FAILED) {
                        s11 = [];
                        s12 = peg$parseselectOption();

                        if (s12 !== peg$FAILED) {
                          while (s12 !== peg$FAILED) {
                            s11.push(s12);
                            s12 = peg$parseselectOption();
                          }
                        } else {
                          s11 = peg$FAILED;
                        }

                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();

                          if (s12 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                              s13 = peg$c24;
                              peg$currPos++;
                            } else {
                              s13 = peg$FAILED;

                              if (peg$silentFails === 0) {
                                peg$fail(peg$c25);
                              }
                            }

                            if (s13 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c71(s3, s11);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepluralRuleSelectValue() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 61) {
      s2 = peg$c72;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c73);
      }
    }

    if (s2 !== peg$FAILED) {
      s3 = peg$parsenumber();

      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$parseargName();
    }

    return s0;
  }

  function peg$parseselectOption() {
    var s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    s1 = peg$parse_();

    if (s1 !== peg$FAILED) {
      s2 = peg$parseargName();

      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 123) {
            s4 = peg$c22;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c23);
            }
          }

          if (s4 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s5 = peg$c74();

            if (s5) {
              s5 = undefined;
            } else {
              s5 = peg$FAILED;
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parsemessage();

              if (s6 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s7 = peg$c24;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c25);
                  }
                }

                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c75(s2, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepluralOption() {
    var s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    s1 = peg$parse_();

    if (s1 !== peg$FAILED) {
      s2 = peg$parsepluralRuleSelectValue();

      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 123) {
            s4 = peg$c22;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c23);
            }
          }

          if (s4 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s5 = peg$c76();

            if (s5) {
              s5 = undefined;
            } else {
              s5 = peg$FAILED;
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parsemessage();

              if (s6 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s7 = peg$c24;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c25);
                  }
                }

                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c77(s2, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewhiteSpace() {
    var s0;
    peg$silentFails++;

    if (peg$c79.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c80);
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {

      if (peg$silentFails === 0) {
        peg$fail(peg$c78);
      }
    }

    return s0;
  }

  function peg$parsepatternSyntax() {
    var s0;
    peg$silentFails++;

    if (peg$c82.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c83);
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {

      if (peg$silentFails === 0) {
        peg$fail(peg$c81);
      }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsewhiteSpace();

    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsewhiteSpace();
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c84);
      }
    }

    return s0;
  }

  function peg$parsenumber() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 45) {
      s1 = peg$c86;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c87);
      }
    }

    if (s1 === peg$FAILED) {
      s1 = null;
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseargNumber();

      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c88(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c85);
      }
    }

    return s0;
  }

  function peg$parsedoubleApostrophes() {
    var s0, s1;
    peg$silentFails++;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c91) {
      s1 = peg$c91;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c92);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c93();
    }

    s0 = s1;
    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c90);
      }
    }

    return s0;
  }

  function peg$parsequotedString() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 39) {
      s1 = peg$c48;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c49);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseescapedChar();

      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = [];

        if (input.substr(peg$currPos, 2) === peg$c91) {
          s5 = peg$c91;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c92);
          }
        }

        if (s5 === peg$FAILED) {
          if (peg$c50.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c51);
            }
          }
        }

        while (s5 !== peg$FAILED) {
          s4.push(s5);

          if (input.substr(peg$currPos, 2) === peg$c91) {
            s5 = peg$c91;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c92);
            }
          }

          if (s5 === peg$FAILED) {
            if (peg$c50.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c51);
              }
            }
          }
        }

        if (s4 !== peg$FAILED) {
          s3 = input.substring(s3, peg$currPos);
        } else {
          s3 = s4;
        }

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s4 = peg$c48;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c49);
            }
          }

          if (s4 === peg$FAILED) {
            s4 = null;
          }

          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c94(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseunquotedString() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$currPos;

    if (input.length > peg$currPos) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c30);
      }
    }

    if (s2 !== peg$FAILED) {
      peg$savedPos = peg$currPos;
      s3 = peg$c95(s2);

      if (s3) {
        s3 = undefined;
      } else {
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 10) {
        s1 = peg$c96;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c97);
        }
      }
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parseescapedChar() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$currPos;

    if (input.length > peg$currPos) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c30);
      }
    }

    if (s2 !== peg$FAILED) {
      peg$savedPos = peg$currPos;
      s3 = peg$c98(s2);

      if (s3) {
        s3 = undefined;
      } else {
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parseargNameOrNumber() {
    var s0, s1;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseargNumber();

    if (s1 === peg$FAILED) {
      s1 = peg$parseargName();
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c99);
      }
    }

    return s0;
  }

  function peg$parsevalidTag() {
    var s0, s1;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseargNumber();

    if (s1 === peg$FAILED) {
      s1 = peg$parsetagName();
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c100);
      }
    }

    return s0;
  }

  function peg$parseargNumber() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 48) {
      s1 = peg$c102;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c103);
      }
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c104();
    }

    s0 = s1;

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (peg$c105.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c106);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = [];

        if (peg$c107.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c108);
          }
        }

        while (s4 !== peg$FAILED) {
          s3.push(s4);

          if (peg$c107.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c108);
            }
          }
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c109(s1);
      }

      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c101);
      }
    }

    return s0;
  }

  function peg$parseargName() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    s3 = peg$currPos;
    peg$silentFails++;
    s4 = peg$parsewhiteSpace();

    if (s4 === peg$FAILED) {
      s4 = peg$parsepatternSyntax();
    }

    peg$silentFails--;

    if (s4 === peg$FAILED) {
      s3 = undefined;
    } else {
      peg$currPos = s3;
      s3 = peg$FAILED;
    }

    if (s3 !== peg$FAILED) {
      if (input.length > peg$currPos) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c30);
        }
      }

      if (s4 !== peg$FAILED) {
        s3 = [s3, s4];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsewhiteSpace();

        if (s4 === peg$FAILED) {
          s4 = peg$parsepatternSyntax();
        }

        peg$silentFails--;

        if (s4 === peg$FAILED) {
          s3 = undefined;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        if (s3 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c30);
            }
          }

          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c110);
      }
    }

    return s0;
  }

  function peg$parsetagName() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];

    if (input.charCodeAt(peg$currPos) === 45) {
      s2 = peg$c86;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c87);
      }
    }

    if (s2 === peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      s4 = peg$parsewhiteSpace();

      if (s4 === peg$FAILED) {
        s4 = peg$parsepatternSyntax();
      }

      peg$silentFails--;

      if (s4 === peg$FAILED) {
        s3 = undefined;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c30);
          }
        }

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);

        if (input.charCodeAt(peg$currPos) === 45) {
          s2 = peg$c86;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c87);
          }
        }

        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parsewhiteSpace();

          if (s4 === peg$FAILED) {
            s4 = peg$parsepatternSyntax();
          }

          peg$silentFails--;

          if (s4 === peg$FAILED) {
            s3 = undefined;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }

          if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c30);
              }
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c111);
      }
    }

    return s0;
  }

  var messageCtx = ['root'];

  function isNestedMessageText() {
    return messageCtx.length > 1;
  }

  function isInPluralOption() {
    return messageCtx[messageCtx.length - 1] === 'plural';
  }

  function insertLocation() {
    return options && options.captureLocation ? {
      location: location()
    } : {};
  }

  var ignoreTag = options && options.ignoreTag;
  var shouldParseSkeleton = options && options.shouldParseSkeleton;
  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
  }
}

var pegParse = peg$parse;

var PLURAL_HASHTAG_REGEX = /(^|[^\\])#/g;
/**
 * Whether to convert `#` in plural rule options
 * to `{var, number}`
 * @param el AST Element
 * @param pluralStack current plural stack
 */

function normalizeHashtagInPlural(els) {
  els.forEach(function (el) {
    // If we're encountering a plural el
    if (!isPluralElement(el) && !isSelectElement(el)) {
      return;
    } // Go down the options and search for # in any literal element


    Object.keys(el.options).forEach(function (id) {
      var _a;

      var opt = el.options[id]; // If we got a match, we have to split this
      // and inject a NumberElement in the middle

      var matchingLiteralElIndex = -1;
      var literalEl = undefined;

      for (var i = 0; i < opt.value.length; i++) {
        var el_1 = opt.value[i];

        if (isLiteralElement(el_1) && PLURAL_HASHTAG_REGEX.test(el_1.value)) {
          matchingLiteralElIndex = i;
          literalEl = el_1;
          break;
        }
      }

      if (literalEl) {
        var newValue = literalEl.value.replace(PLURAL_HASHTAG_REGEX, "$1{" + el.value + ", number}");
        var newEls = pegParse(newValue);

        (_a = opt.value).splice.apply(_a, __spreadArray([matchingLiteralElIndex, 1], newEls));
      }

      normalizeHashtagInPlural(opt.value);
    });
  });
}

function parse(input, opts) {
  opts = _assign$1({
    normalizeHashtagInPlural: true,
    shouldParseSkeleton: true
  }, opts || {});
  var els = pegParse(input, opts);

  if (opts.normalizeHashtagInPlural) {
    normalizeHashtagInPlural(els);
  }

  return els;
}

//
// Main
//
function memoize(fn, options) {
  var cache = options && options.cache ? options.cache : cacheDefault;
  var serializer = options && options.serializer ? options.serializer : serializerDefault;
  var strategy = options && options.strategy ? options.strategy : strategyDefault;
  return strategy(fn, {
    cache: cache,
    serializer: serializer
  });
} //
// Strategy
//


function isPrimitive(value) {
  return value == null || typeof value === 'number' || typeof value === 'boolean'; // || typeof value === "string" 'unsafe' primitive for our needs
}

function monadic(fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
  var computedValue = cache.get(cacheKey);

  if (typeof computedValue === 'undefined') {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

function variadic(fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);
  var computedValue = cache.get(cacheKey);

  if (typeof computedValue === 'undefined') {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }

  return computedValue;
}

function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}

function strategyDefault(fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}

function strategyVariadic(fn, options) {
  var strategy = variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}

function strategyMonadic(fn, options) {
  var strategy = monadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
} //
// Serializer
//


function serializerDefault() {
  return JSON.stringify(arguments);
} //
// Cache
//


function ObjectWithoutPrototypeCache() {
  this.cache = Object.create(null);
}

ObjectWithoutPrototypeCache.prototype.has = function (key) {
  return key in this.cache;
};

ObjectWithoutPrototypeCache.prototype.get = function (key) {
  return this.cache[key];
};

ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
  this.cache[key] = value;
};

var cacheDefault = {
  create: function create() {
    return new ObjectWithoutPrototypeCache();
  }
}; //
// API
//

var src = memoize;
var strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
};
src.strategies = strategies;

var memoize$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), src, {
  'default': src,
  __moduleExports: src,
  strategies: strategies
}));

var ErrorCode;

(function (ErrorCode) {
  // When we have a placeholder but no value to format
  ErrorCode["MISSING_VALUE"] = "MISSING_VALUE"; // When value supplied is invalid

  ErrorCode["INVALID_VALUE"] = "INVALID_VALUE"; // When we need specific Intl API but it's not available

  ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));

var FormatError =
/** @class */
function (_super) {
  __extends$2(FormatError, _super);

  function FormatError(msg, code, originalMessage) {
    var _this = _super.call(this, msg) || this;

    _this.code = code;
    _this.originalMessage = originalMessage;
    return _this;
  }

  FormatError.prototype.toString = function () {
    return "[formatjs Error: " + this.code + "] " + this.message;
  };

  return FormatError;
}(Error);

var InvalidValueError =
/** @class */
function (_super) {
  __extends$2(InvalidValueError, _super);

  function InvalidValueError(variableId, value, options, originalMessage) {
    return _super.call(this, "Invalid values for \"" + variableId + "\": \"" + value + "\". Options are \"" + Object.keys(options).join('", "') + "\"", ErrorCode.INVALID_VALUE, originalMessage) || this;
  }

  return InvalidValueError;
}(FormatError);

var InvalidValueTypeError =
/** @class */
function (_super) {
  __extends$2(InvalidValueTypeError, _super);

  function InvalidValueTypeError(value, type, originalMessage) {
    return _super.call(this, "Value for \"" + value + "\" must be of type " + type, ErrorCode.INVALID_VALUE, originalMessage) || this;
  }

  return InvalidValueTypeError;
}(FormatError);

var MissingValueError =
/** @class */
function (_super) {
  __extends$2(MissingValueError, _super);

  function MissingValueError(variableId, originalMessage) {
    return _super.call(this, "The intl string context variable \"" + variableId + "\" was not provided to the string \"" + originalMessage + "\"", ErrorCode.MISSING_VALUE, originalMessage) || this;
  }

  return MissingValueError;
}(FormatError);

var PART_TYPE;

(function (PART_TYPE) {
  PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
  PART_TYPE[PART_TYPE["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));

function mergeLiteral(parts) {
  if (parts.length < 2) {
    return parts;
  }

  return parts.reduce(function (all, part) {
    var lastPart = all[all.length - 1];

    if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
      all.push(part);
    } else {
      lastPart.value += part.value;
    }

    return all;
  }, []);
}

function isFormatXMLElementFn(el) {
  return typeof el === 'function';
} // TODO(skeleton): add skeleton support

function formatToParts(els, locales, formatters, formats, values, currentPluralValue, // For debugging
originalMessage) {
  // Hot path for straight simple msg translations
  if (els.length === 1 && isLiteralElement(els[0])) {
    return [{
      type: PART_TYPE.literal,
      value: els[0].value
    }];
  }

  var result = [];

  for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
    var el = els_1[_i]; // Exit early for string parts.

    if (isLiteralElement(el)) {
      result.push({
        type: PART_TYPE.literal,
        value: el.value
      });
      continue;
    } // TODO: should this part be literal type?
    // Replace `#` in plural rules with the actual numeric value.


    if (isPoundElement(el)) {
      if (typeof currentPluralValue === 'number') {
        result.push({
          type: PART_TYPE.literal,
          value: formatters.getNumberFormat(locales).format(currentPluralValue)
        });
      }

      continue;
    }

    var varName = el.value; // Enforce that all required values are provided by the caller.

    if (!(values && varName in values)) {
      throw new MissingValueError(varName, originalMessage);
    }

    var value = values[varName];

    if (isArgumentElement(el)) {
      if (!value || typeof value === 'string' || typeof value === 'number') {
        value = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
      }

      result.push({
        type: typeof value === 'string' ? PART_TYPE.literal : PART_TYPE.object,
        value: value
      });
      continue;
    } // Recursively format plural and select parts' option — which can be a
    // nested pattern structure. The choosing of the option to use is
    // abstracted-by and delegated-to the part helper object.


    if (isDateElement(el)) {
      var style = typeof el.style === 'string' ? formats.date[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : undefined;
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getDateTimeFormat(locales, style).format(value)
      });
      continue;
    }

    if (isTimeElement(el)) {
      var style = typeof el.style === 'string' ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : undefined;
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getDateTimeFormat(locales, style).format(value)
      });
      continue;
    }

    if (isNumberElement(el)) {
      var style = typeof el.style === 'string' ? formats.number[el.style] : isNumberSkeleton(el.style) ? el.style.parsedOptions : undefined;

      if (style && style.scale) {
        value = value * (style.scale || 1);
      }

      result.push({
        type: PART_TYPE.literal,
        value: formatters.getNumberFormat(locales, style).format(value)
      });
      continue;
    }

    if (isTagElement(el)) {
      var children = el.children,
          value_1 = el.value;
      var formatFn = values[value_1];

      if (!isFormatXMLElementFn(formatFn)) {
        throw new InvalidValueTypeError(value_1, 'function', originalMessage);
      }

      var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
      var chunks = formatFn(parts.map(function (p) {
        return p.value;
      }));

      if (!Array.isArray(chunks)) {
        chunks = [chunks];
      }

      result.push.apply(result, chunks.map(function (c) {
        return {
          type: typeof c === 'string' ? PART_TYPE.literal : PART_TYPE.object,
          value: c
        };
      }));
    }

    if (isSelectElement(el)) {
      var opt = el.options[value] || el.options.other;

      if (!opt) {
        throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
      }

      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
      continue;
    }

    if (isPluralElement(el)) {
      var opt = el.options["=" + value];

      if (!opt) {
        if (!Intl.PluralRules) {
          throw new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", ErrorCode.MISSING_INTL_API, originalMessage);
        }

        var rule = formatters.getPluralRules(locales, {
          type: el.pluralType
        }).select(value - (el.offset || 0));
        opt = el.options[rule] || el.options.other;
      }

      if (!opt) {
        throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
      }

      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
      continue;
    }
  }

  return mergeLiteral(result);
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

function mergeConfig(c1, c2) {
  if (!c2) {
    return c1;
  }

  return _assign$2(_assign$2(_assign$2({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function (all, k) {
    all[k] = _assign$2(_assign$2({}, c1[k]), c2[k] || {});
    return all;
  }, {}));
}

function mergeConfigs(defaultConfig, configs) {
  if (!configs) {
    return defaultConfig;
  }

  return Object.keys(defaultConfig).reduce(function (all, k) {
    all[k] = mergeConfig(defaultConfig[k], configs[k]);
    return all;
  }, _assign$2({}, defaultConfig));
}

function createFastMemoizeCache(store) {
  return {
    create: function create() {
      return {
        has: function has(key) {
          return key in store;
        },
        get: function get(key) {
          return store[key];
        },
        set: function set(key, value) {
          store[key] = value;
        }
      };
    }
  };
} // @ts-ignore this is to deal with rollup's default import shenanigans


var _memoizeIntl = src || memoize$1;

var memoizeIntl = _memoizeIntl;

function createDefaultFormatters(cache) {
  if (cache === void 0) {
    cache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    };
  }

  return {
    getNumberFormat: memoizeIntl(function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return new ((_a = Intl.NumberFormat).bind.apply(_a, __spreadArray$1([void 0], args)))();
    }, {
      cache: createFastMemoizeCache(cache.number),
      strategy: memoizeIntl.strategies.variadic
    }),
    getDateTimeFormat: memoizeIntl(function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return new ((_a = Intl.DateTimeFormat).bind.apply(_a, __spreadArray$1([void 0], args)))();
    }, {
      cache: createFastMemoizeCache(cache.dateTime),
      strategy: memoizeIntl.strategies.variadic
    }),
    getPluralRules: memoizeIntl(function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return new ((_a = Intl.PluralRules).bind.apply(_a, __spreadArray$1([void 0], args)))();
    }, {
      cache: createFastMemoizeCache(cache.pluralRules),
      strategy: memoizeIntl.strategies.variadic
    })
  };
}

var IntlMessageFormat =
/** @class */
function () {
  function IntlMessageFormat(message, locales, overrideFormats, opts) {
    var _this = this;

    if (locales === void 0) {
      locales = IntlMessageFormat.defaultLocale;
    }

    this.formatterCache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    };

    this.format = function (values) {
      var parts = _this.formatToParts(values); // Hot path for straight simple msg translations


      if (parts.length === 1) {
        return parts[0].value;
      }

      var result = parts.reduce(function (all, part) {
        if (!all.length || part.type !== PART_TYPE.literal || typeof all[all.length - 1] !== 'string') {
          all.push(part.value);
        } else {
          all[all.length - 1] += part.value;
        }

        return all;
      }, []);

      if (result.length <= 1) {
        return result[0] || '';
      }

      return result;
    };

    this.formatToParts = function (values) {
      return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
    };

    this.resolvedOptions = function () {
      return {
        locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0]
      };
    };

    this.getAst = function () {
      return _this.ast;
    };

    if (typeof message === 'string') {
      this.message = message;

      if (!IntlMessageFormat.__parse) {
        throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
      } // Parse string messages into an AST.


      this.ast = IntlMessageFormat.__parse(message, {
        normalizeHashtagInPlural: false,
        ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag
      });
    } else {
      this.ast = message;
    }

    if (!Array.isArray(this.ast)) {
      throw new TypeError('A message must be provided as a String or AST.');
    } // Creates a new object with the specified `formats` merged with the default
    // formats.


    this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats); // Defined first because it's used to build the format pattern.

    this.locales = locales;
    this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
  }

  Object.defineProperty(IntlMessageFormat, "defaultLocale", {
    get: function get() {
      if (!IntlMessageFormat.memoizedDefaultLocale) {
        IntlMessageFormat.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
      }

      return IntlMessageFormat.memoizedDefaultLocale;
    },
    enumerable: false,
    configurable: true
  });
  IntlMessageFormat.memoizedDefaultLocale = null;
  IntlMessageFormat.__parse = parse; // Default format options used as the prototype of the `formats` provided to the
  // constructor. These are used when constructing the internal Intl.NumberFormat
  // and Intl.DateTimeFormat instances.

  IntlMessageFormat.formats = {
    number: {
      currency: {
        style: 'currency'
      },
      percent: {
        style: 'percent'
      }
    },
    date: {
      short: {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit'
      },
      medium: {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      },
      long: {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      },
      full: {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }
    },
    time: {
      short: {
        hour: 'numeric',
        minute: 'numeric'
      },
      medium: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      },
      long: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      },
      full: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      }
    }
  };
  return IntlMessageFormat;
}();

var r;
var i = writable({});

function a(e) {
  return e in r;
}

function l(e, n) {
  if (!a(e)) return null;
  return function (e, n) {
    if (n in e) return e[n];
    var t = n.split(".");
    var o = e;

    for (var _e = 0; _e < t.length; _e++) {
      if ("object" == _typeof(o)) {
        if (_e > 0) {
          var _n = t.slice(_e, t.length).join(".");

          if (_n in o) {
            o = o[_n];
            break;
          }
        }

        o = o[t[_e]];
      } else o = void 0;
    }

    return o;
  }(function (e) {
    return r[e] || null;
  }(e), n);
}

function s(e) {
  return null == e || a(e) ? e : s(T(e));
}

function u(e) {
  for (var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    n[_key - 1] = arguments[_key];
  }

  i.update(function (o) {
    return o[e] = cjs.all([o[e] || {}].concat(n)), o;
  });
}

derived([i], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      e = _ref2[0];

  return Object.keys(e);
});
i.subscribe(function (e) {
  return r = e;
});
var m = {};

function f(e) {
  return m[e];
}

function d(e) {
  return E(e).reverse().some(function (e) {
    var n;
    return null === (n = f(e)) || void 0 === n ? void 0 : n.size;
  });
}

function g(e, n) {
  return Promise.all(n.map(function (n) {
    return function (e, n) {
      m[e].delete(n), 0 === m[e].size && delete m[e];
    }(e, n), n().then(function (e) {
      return e.default || e;
    });
  })).then(function (n) {
    return u.apply(void 0, [e].concat(_toConsumableArray(n)));
  });
}

var w = {};

function h(e) {
  if (!d(e)) return e in w ? w[e] : void 0;

  var n = function (e) {
    return E(e).reverse().map(function (e) {
      var n = f(e);
      return [e, n ? _toConsumableArray(n) : []];
    }).filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          e = _ref4[1];

      return e.length > 0;
    });
  }(e);

  return w[e] = Promise.all(n.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        e = _ref6[0],
        n = _ref6[1];

    return g(e, n);
  })).then(function () {
    if (d(e)) return h(e);
    delete w[e];
  }), w[e];
}
/*! *****************************************************************************
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


function b(e, n) {
  var t = {};

  for (var o in e) {
    Object.prototype.hasOwnProperty.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
  }

  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var r = 0;

    for (o = Object.getOwnPropertySymbols(e); r < o.length; r++) {
      n.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (t[o[r]] = e[o[r]]);
    }
  }

  return t;
}

var y = {
  fallbackLocale: null,
  initialLocale: null,
  loadingDelay: 200,
  formats: {
    number: {
      scientific: {
        notation: "scientific"
      },
      engineering: {
        notation: "engineering"
      },
      compactLong: {
        notation: "compact",
        compactDisplay: "long"
      },
      compactShort: {
        notation: "compact",
        compactDisplay: "short"
      }
    },
    date: {
      short: {
        month: "numeric",
        day: "numeric",
        year: "2-digit"
      },
      medium: {
        month: "short",
        day: "numeric",
        year: "numeric"
      },
      long: {
        month: "long",
        day: "numeric",
        year: "numeric"
      },
      full: {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    },
    time: {
      short: {
        hour: "numeric",
        minute: "numeric"
      },
      medium: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      },
      long: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      },
      full: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      }
    }
  },
  warnOnMissingMessages: !0,
  ignoreTag: !0
};

function v() {
  return y;
}

function O(e) {
  var n = e.formats,
      t = b(e, ["formats"]),
      o = e.initialLocale || e.fallbackLocale;
  return Object.assign(y, t, {
    initialLocale: o
  }), n && ("number" in n && Object.assign(y.formats.number, n.number), "date" in n && Object.assign(y.formats.date, n.date), "time" in n && Object.assign(y.formats.time, n.time)), L.set(o);
}

var j = writable(!1);
var k;
var L = writable(null);

function $(e, n) {
  return 0 === n.indexOf(e) && e !== n;
}

function x(e, n) {
  return e === n || $(e, n) || $(n, e);
}

function T(e) {
  var n = e.lastIndexOf("-");
  if (n > 0) return e.slice(0, n);

  var _v = v(),
      t = _v.fallbackLocale;

  return t && !x(e, t) ? t : null;
}

function E(e) {
  var n = e.split("-").map(function (e, n, t) {
    return t.slice(0, n + 1).join("-");
  }),
      _v2 = v(),
      t = _v2.fallbackLocale;

  return t && !x(e, t) ? n.concat(E(t)) : n;
}

function D() {
  return k;
}

L.subscribe(function (e) {
  k = e, "undefined" != typeof window && document.documentElement.setAttribute("lang", e);
});
var M = L.set;
L.set = function (e) {
  if (s(e) && d(e)) {
    var _v3 = v(),
        _n2 = _v3.loadingDelay;

    var _t;

    return "undefined" != typeof window && null != D() && _n2 ? _t = window.setTimeout(function () {
      return j.set(!0);
    }, _n2) : j.set(!0), h(e).then(function () {
      M(e);
    }).finally(function () {
      clearTimeout(_t), j.set(!1);
    });
  }

  return M(e);
}, L.update = function (e) {
  return M(e(k));
};

var Z = {},
    C = function C(e, n) {
  if (null == n) return;
  var t = l(n, e);
  return t || C(e, T(n));
},
    G = function G(e, n) {
  if (n in Z && e in Z[n]) return Z[n][e];
  var t = C(e, n);
  return t ? function (e, n, t) {
    return t ? (n in Z || (Z[n] = {}), e in Z[n] || (Z[n][e] = t), t) : t;
  }(e, n, t) : void 0;
},
    J = function J(e) {
  var n = Object.create(null);
  return function (t) {
    var o = JSON.stringify(t);
    return o in n ? n[o] : n[o] = e(t);
  };
},
    U = function U(e, n) {
  var _v4 = v(),
      t = _v4.formats;

  if (e in t && n in t[e]) return t[e][n];
  throw new Error("[svelte-i18n] Unknown \"".concat(n, "\" ").concat(e, " format."));
},
    _ = J(function (e) {
  var n = e.locale,
      t = e.format,
      o = b(e, ["locale", "format"]);
  if (null == n) throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
  return t && (o = U("number", t)), new Intl.NumberFormat(n, o);
}),
    q = J(function (e) {
  var n = e.locale,
      t = e.format,
      o = b(e, ["locale", "format"]);
  if (null == n) throw new Error('[svelte-i18n] A "locale" must be set to format dates');
  return t ? o = U("date", t) : 0 === Object.keys(o).length && (o = U("date", "short")), new Intl.DateTimeFormat(n, o);
}),
    B = J(function (e) {
  var n = e.locale,
      t = e.format,
      o = b(e, ["locale", "format"]);
  if (null == n) throw new Error('[svelte-i18n] A "locale" must be set to format time values');
  return t ? o = U("time", t) : 0 === Object.keys(o).length && (o = U("time", "short")), new Intl.DateTimeFormat(n, o);
}),
    H = function H() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _e$locale = e.locale,
      n = _e$locale === void 0 ? D() : _e$locale,
      t = b(e, ["locale"]);
  return _(Object.assign({
    locale: n
  }, t));
},
    K = function K() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _e$locale2 = e.locale,
      n = _e$locale2 === void 0 ? D() : _e$locale2,
      t = b(e, ["locale"]);
  return q(Object.assign({
    locale: n
  }, t));
},
    Q = function Q() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _e$locale3 = e.locale,
      n = _e$locale3 === void 0 ? D() : _e$locale3,
      t = b(e, ["locale"]);
  return B(Object.assign({
    locale: n
  }, t));
},
    R = J(function (e) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : D();
  return new IntlMessageFormat(e, n, v().formats, {
    ignoreTag: v().ignoreTag
  });
}),
    V = function V(e) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  "object" == _typeof(e) && (e = (n = e).id);
  var _n3 = n,
      t = _n3.values,
      _n3$locale = _n3.locale,
      o = _n3$locale === void 0 ? D() : _n3$locale,
      r = _n3.default;
  if (null == o) throw new Error("[svelte-i18n] Cannot format a message without first setting the initial locale.");
  var i = G(e, o);

  if (i) {
    if ("string" != typeof i) return console.warn("[svelte-i18n] Message with id \"".concat(e, "\" must be of type \"string\", found: \"").concat(_typeof(i), "\". Gettin its value through the \"$format\" method is deprecated; use the \"json\" method instead.")), i;
  } else v().warnOnMissingMessages && console.warn("[svelte-i18n] The message \"".concat(e, "\" was not found in \"").concat(E(o).join('", "'), "\".").concat(d(D()) ? "\n\nNote: there are at least one loader still registered to this locale that wasn't executed." : "")), i = r || e;

  if (!t) return i;
  var a = i;

  try {
    a = R(i, o).format(t);
  } catch (n) {
    console.warn("[svelte-i18n] Message \"".concat(e, "\" has syntax error:"), n.message);
  }

  return a;
},
    W = function W(e, n) {
  return Q(n).format(e);
},
    X = function X(e, n) {
  return K(n).format(e);
},
    Y = function Y(e, n) {
  return H(n).format(e);
},
    ee = function ee(e) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : D();
  return G(e, n);
},
    ne = derived([L, i], function () {
  return V;
});
    derived([L], function () {
  return W;
});
    derived([L], function () {
  return X;
});
    derived([L], function () {
  return Y;
});
    derived([L, i], function () {
  return ee;
});

var _activeLocale; // Internal store for tracking network
// loading state


var isDownloading = writable(false);
console.log();
var MESSAGE_FILE_URL_TEMPLATE = "/lang/{locale}.json";

function setupI18n(options) {
  var _ref = options || 'lt',
      locale_ = _ref.withLocale; // Initialize svelte-i18n


  O({
    initialLocale: locale_
  });

  if (!hasLoadedLocale(locale_)) {
    var messagesFileUrl = MESSAGE_FILE_URL_TEMPLATE.replace("{locale}", locale_);
    isDownloading.set(true);
    return loadJson(messagesFileUrl).then(function (messages) {
      _activeLocale = locale_;
      u(locale_, messages);
      L.set(locale_);
      isDownloading.set(false);
    });
  }
}

var isLocaleLoaded = derived([isDownloading, i], function (_ref2) {
  var _ref3 = _slicedToArray(_ref2, 2),
      $isDownloading = _ref3[0],
      $dictionary = _ref3[1];

  return !$isDownloading && $dictionary[_activeLocale] && Object.keys($dictionary[_activeLocale]).length > 0;
});

function loadJson(url) {
  return browser(url).then(function (response) {
    return response.json();
  });
}

function hasLoadedLocale(locale) {
  // If the svelte-i18n dictionary has an entry for the
  // locale, then the locale has already been added
  return get_store_value(i)[locale];
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = "@keyframes mdc-select-float-native-control{0%{transform:translateY(8px);opacity:0}to{transform:translateY(0);opacity:1}}.mdc-line-ripple{position:absolute;bottom:0;left:0;width:100%;height:2px;transform:scaleX(0);transition:transform .18s cubic-bezier(.4,0,.2,1),opacity .18s cubic-bezier(.4,0,.2,1);opacity:0;z-index:2}.mdc-line-ripple--active{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating{opacity:0}.mdc-notched-outline{display:flex;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}.mdc-notched-outline[dir=rtl],[dir=rtl] .mdc-notched-outline{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}.mdc-notched-outline__leading[dir=rtl],.mdc-notched-outline__trailing,[dir=rtl] .mdc-notched-outline__leading{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{flex-grow:1}.mdc-notched-outline__trailing[dir=rtl],[dir=rtl] .mdc-notched-outline__trailing{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 24px)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.33333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl],[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{padding:0}.mdc-floating-label{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;position:absolute;left:0;transform-origin:left top;transition:transform .15s cubic-bezier(.4,0,.2,1),color .15s cubic-bezier(.4,0,.2,1);line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}.mdc-floating-label[dir=rtl],[dir=rtl] .mdc-floating-label{right:0;left:auto;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto;transform:translateY(-106%) scale(.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard .25s 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(0) translateY(-106%) scale(.75)}33%{animation-timing-function:cubic-bezier(.5,0,.70173,.49582);transform:translateX(4%) translateY(-106%) scale(.75)}66%{animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);transform:translateX(-4%) translateY(-106%) scale(.75)}to{transform:translateX(0) translateY(-106%) scale(.75)}}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-select--with-leading-icon:not(.mdc-select--disabled) .mdc-select__icon{color:#000;color:var(--mdc-theme-on-surface,#000)}.mdc-select--with-leading-icon .mdc-select__icon{display:inline-block;position:absolute;bottom:16px;box-sizing:border-box;width:24px;height:24px;border:none;background-color:transparent;fill:currentColor;opacity:.54;text-decoration:none;cursor:pointer;user-select:none}.mdc-select__icon:not([tabindex]),.mdc-select__icon[tabindex=\"-1\"]{cursor:default;pointer-events:none}.mdc-select-helper-text{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;line-height:1.25rem;font-weight:400;letter-spacing:.03333em;text-decoration:inherit;text-transform:inherit;display:block;line-height:normal;margin:0;transition:opacity .18s cubic-bezier(.4,0,.2,1);opacity:0;will-change:opacity}.mdc-select-helper-text:before{display:inline-block;width:0;height:16px;content:\"\";vertical-align:0}.mdc-select-helper-text--persistent{transition:none;opacity:1;will-change:auto}.mdc-select{position:relative}.mdc-select:not(.mdc-select--disabled) .mdc-select__anchor{background-color:#f5f5f5}.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{color:rgba(0,0,0,.87)}.mdc-select:not(.mdc-select--disabled) .mdc-floating-label{color:rgba(0,0,0,.6)}.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{border-bottom-color:rgba(0,0,0,.42)}.mdc-select:not(.mdc-select--disabled) .mdc-select__anchor+.mdc-select-helper-text{color:rgba(0,0,0,.6)}.mdc-select .mdc-select__anchor{border-radius:4px 4px 0 0}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-line-ripple{background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:rgba(98,0,238,.87)}.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text:hover{border-bottom-color:rgba(0,0,0,.87)}.mdc-select .mdc-floating-label{left:16px;right:auto;top:21px;pointer-events:none}.mdc-select .mdc-floating-label[dir=rtl],[dir=rtl] .mdc-select .mdc-floating-label{left:auto;right:16px}.mdc-select.mdc-select--with-leading-icon .mdc-floating-label{left:48px;right:auto}.mdc-select.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl],[dir=rtl] .mdc-select.mdc-select--with-leading-icon .mdc-floating-label{left:auto;right:48px}.mdc-select.mdc-select--outlined .mdc-floating-label{left:4px;right:auto;top:17px}.mdc-select.mdc-select--outlined .mdc-floating-label[dir=rtl],[dir=rtl] .mdc-select.mdc-select--outlined .mdc-floating-label{left:auto;right:4px}.mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label{left:36px;right:auto}.mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl],[dir=rtl] .mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label{left:auto;right:36px}.mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{left:36px;right:auto}.mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{left:auto;right:36px}.mdc-select__dropdown-icon{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='5' viewBox='7 10 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' opacity='.54' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\") no-repeat 50%;left:auto;right:8px;position:absolute;bottom:16px;width:24px;height:24px;transition:transform .15s cubic-bezier(.4,0,.2,1);pointer-events:none}.mdc-select__dropdown-icon[dir=rtl],[dir=rtl] .mdc-select__dropdown-icon{left:8px;right:auto}.mdc-select--focused .mdc-select__dropdown-icon{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='5' viewBox='7 10 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%236200ee' fill-rule='evenodd' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\") no-repeat 50%}.mdc-select--activated .mdc-select__dropdown-icon{transform:rotate(180deg) translateY(-5px);transition:transform .15s cubic-bezier(.4,0,.2,1)}.mdc-select__anchor{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-flex;position:relative;box-sizing:border-box;height:56px;overflow:hidden;will-change:opacity,transform,color}.mdc-select__anchor:after,.mdc-select__anchor:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-select__anchor:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-select__anchor.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-select__anchor.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-select__anchor.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-select__anchor.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-select__anchor.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-select__anchor:after,.mdc-select__anchor:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-select__anchor.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-select__anchor:after,.mdc-select__anchor:before{background-color:rgba(0,0,0,.87)}.mdc-select__anchor:hover:before{opacity:.04}.mdc-select__anchor.mdc-ripple-upgraded--background-focused:before,.mdc-select__anchor:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-70%) scale(.75)}.mdc-select__anchor.mdc-select--focused .mdc-line-ripple:after{transform:scaleY(2);opacity:1}.mdc-select__anchor+.mdc-select-helper-text{margin-right:12px;margin-left:12px}.mdc-select--outlined .mdc-select__anchor+.mdc-select-helper-text{margin-right:16px;margin-left:16px}.mdc-select--focused .mdc-select__anchor+.mdc-select-helper-text:not(.mdc-select-helper-text--validation-msg){opacity:1}.mdc-select__selected-text{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;box-sizing:border-box;width:100%;min-width:200px;height:56px;padding:20px 52px 4px 16px;border:none;border-bottom:1px solid;outline:none;background-color:transparent;color:inherit;white-space:nowrap;cursor:pointer;appearance:none}.mdc-select__selected-text[dir=rtl],[dir=rtl] .mdc-select__selected-text{padding-left:52px;padding-right:16px}.mdc-select__selected-text::-ms-expand{display:none}.mdc-select__selected-text::-ms-value{background-color:transparent;color:inherit}@-moz-document url-prefix(\"\"){.mdc-select__selected-text{text-indent:-2px}}.mdc-select--outlined{border:none}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.38)}.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.87)}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px;border-color:#6200ee;border-color:var(--mdc-theme-primary,#6200ee)}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl],.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing,[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-radius:0 4px 4px 0}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl],[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:4px 0 0 4px}.mdc-select--outlined .mdc-select__selected-text{border-radius:4px}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-select__anchor{background-color:transparent}.mdc-select--outlined .mdc-select__anchor{overflow:visible}.mdc-select--outlined .mdc-select__anchor:after,.mdc-select--outlined .mdc-select__anchor:before{content:none}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined .25s 1}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-144%) scale(1);font-size:.75rem}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-130%) scale(.75);font-size:1rem}.mdc-select--outlined .mdc-select__selected-text{display:flex;padding:14px 52px 12px 16px;border:none;background-color:transparent;z-index:1}.mdc-select--outlined .mdc-select__selected-text[dir=rtl],[dir=rtl] .mdc-select--outlined .mdc-select__selected-text{padding-left:52px;padding-right:16px}.mdc-select--outlined .mdc-select__icon{z-index:2}.mdc-select--outlined .mdc-floating-label{line-height:1.15rem;pointer-events:auto}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-select__selected-text{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-line-ripple{background-color:#b00020;background-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:#b00020}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--invalid .mdc-select__anchor+.mdc-select-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-select__selected-text:hover{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__trailing,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px;border-color:#b00020;border-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid .mdc-select__dropdown-icon{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='5' viewBox='7 10 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23b00020' fill-rule='evenodd' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\") no-repeat 50%}.mdc-select--invalid+.mdc-select-helper-text--validation-msg{opacity:1}.mdc-select--required .mdc-floating-label:after{content:\"*\"}.mdc-select--disabled{cursor:default;pointer-events:none}.mdc-select--disabled .mdc-select__anchor{background-color:#fafafa}.mdc-select--disabled .mdc-floating-label{color:rgba(0,0,0,.37)}.mdc-select--disabled .mdc-select__dropdown-icon{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='5' viewBox='7 10 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' opacity='.37' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\") no-repeat 50%}.mdc-select--disabled .mdc-line-ripple{display:none}.mdc-select--disabled .mdc-select__icon{color:rgba(0,0,0,.37)}.mdc-select--disabled .mdc-select__selected-text{color:rgba(0,0,0,.37);border-bottom-style:dotted;pointer-events:none}.mdc-select--disabled.mdc-select--outlined .mdc-select__anchor{background-color:transparent}.mdc-select--disabled.mdc-select--outlined .mdc-notched-outline__leading,.mdc-select--disabled.mdc-select--outlined .mdc-notched-outline__notch,.mdc-select--disabled.mdc-select--outlined .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.16)}.mdc-select--disabled.mdc-select--outlined .mdc-select__selected-text{border-bottom-style:none}.mdc-select--no-label:not(.mdc-select--outlined) .mdc-select__anchor .mdc-select__selected-text{padding-top:14px}.mdc-select--with-leading-icon .mdc-select__icon{left:16px;right:auto}.mdc-select--with-leading-icon .mdc-select__icon[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon .mdc-select__icon{left:auto;right:16px}.mdc-select--with-leading-icon .mdc-select__selected-text{padding-left:48px;padding-right:32px}.mdc-select--with-leading-icon .mdc-select__selected-text[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon .mdc-select__selected-text{padding-left:32px;padding-right:48px}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above{transform:translateY(-144%) translateX(-32px) scale(1)}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above{transform:translateY(-144%) translateX(32px) scale(1)}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-130%) translateX(-32px) scale(.75)}.mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-130%) translateX(32px) scale(.75)}.mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon .25s 1}.mdc-select--with-leading-icon.mdc-select--outlined[dir=rtl] .mdc-floating-label--shake,[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-rtl .25s 1}.mdc-select--with-leading-icon.mdc-select__menu .mdc-list-item__text,.mdc-select--with-leading-icon.mdc-select__menu .mdc-list-item__text[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon.mdc-select__menu .mdc-list-item__text{padding-left:32px;padding-right:32px}.mdc-select__menu .mdc-list .mdc-list-item--selected{color:#000;color:var(--mdc-theme-on-surface,#000)}.mdc-select__menu .mdc-list .mdc-list-item--selected:after,.mdc-select__menu .mdc-list .mdc-list-item--selected:before{background-color:#000}@supports not (-ms-ime-align:auto){.mdc-select__menu .mdc-list .mdc-list-item--selected:after,.mdc-select__menu .mdc-list .mdc-list-item--selected:before{background-color:var(--mdc-theme-on-surface,#000)}}.mdc-select__menu .mdc-list .mdc-list-item--selected:hover:before{opacity:.04}.mdc-select__menu .mdc-list .mdc-list-item--selected.mdc-ripple-upgraded--background-focused:before,.mdc-select__menu .mdc-list .mdc-list-item--selected:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-select__menu .mdc-list .mdc-list-item--selected:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-select__menu .mdc-list .mdc-list-item--selected:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-select__menu .mdc-list .mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon{0%{transform:translateX(-32px) translateY(-130%) scale(.75)}33%{animation-timing-function:cubic-bezier(.5,0,.70173,.49582);transform:translateX(calc(4% - 32px)) translateY(-130%) scale(.75)}66%{animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);transform:translateX(calc(-4% - 32px)) translateY(-130%) scale(.75)}to{transform:translateX(-32px) translateY(-130%) scale(.75)}}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-rtl{0%{transform:translateX(32px) translateY(-130%) scale(.75)}33%{animation-timing-function:cubic-bezier(.5,0,.70173,.49582);transform:translateX(calc(4% + 32px)) translateY(-130%) scale(.75)}66%{animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);transform:translateX(calc(-4% + 32px)) translateY(-130%) scale(.75)}to{transform:translateX(32px) translateY(-130%) scale(.75)}}.mdc-list{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background,rgba(0,0,0,.87))}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list-item__secondary-text{color:rgba(0,0,0,.54);color:var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54))}.mdc-list-item__graphic{background-color:transparent;color:rgba(0,0,0,.38);color:var(--mdc-theme-text-icon-on-background,rgba(0,0,0,.38))}.mdc-list-item__meta{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-hint-on-background,rgba(0,0,0,.38))}.mdc-list-group__subheader{color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background,rgba(0,0,0,.87))}.mdc-list-item--disabled .mdc-list-item__text{opacity:.38;color:#000;color:var(--mdc-theme-on-surface,#000)}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item--activated,.mdc-list-item--activated .mdc-list-item__graphic,.mdc-list-item--selected,.mdc-list-item--selected .mdc-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary,#6200ee)}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item__meta:not(.material-icons){font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;line-height:1.25rem;font-weight:400;letter-spacing:.03333em;text-decoration:inherit;text-transform:inherit}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-list-item__primary-text:before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text:after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text:before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text:after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.01786em;text-decoration:inherit;text-transform:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-top:0;line-height:normal;display:block}.mdc-list-item__secondary-text:before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{display:block;margin-top:0;line-height:normal;font-size:inherit}.mdc-list--dense .mdc-list-item__secondary-text:before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item,.mdc-list--two-line.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom:1px solid;border-bottom-color:rgba(0,0,0,.12)}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 88px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;margin:.75rem 16px}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{top:-50%;left:-50%;width:200%;height:200%}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{background-color:#000}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:hover:before{opacity:.04}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:before{opacity:.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:before{background-color:var(--mdc-theme-primary,#6200ee)}}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:hover:before{opacity:.16}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:before{opacity:.08}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:before{background-color:var(--mdc-theme-primary,#6200ee)}}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:hover:before{opacity:.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.2}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.2}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.2}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:after,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:after,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{top:-50%;left:-50%;width:200%;height:200%}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:after,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{background-color:#000}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#000}.mdc-ripple-surface:hover:before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:0;left:0;width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-ripple-surface--primary:hover:before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#018786}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-ripple-surface--accent:hover:before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.smui-list--three-line .mdc-list-item__text{align-self:flex-start}.smui-list--three-line .mdc-list-item{height:88px}.smui-list--three-line.mdc-list--dense .mdc-list-item{height:76px}.mdc-menu{min-width:112px}.mdc-menu .mdc-list,.mdc-menu .mdc-list-item__graphic,.mdc-menu .mdc-list-item__meta{color:rgba(0,0,0,.87)}.mdc-menu .mdc-list-divider{margin:8px 0}.mdc-menu .mdc-list-item{user-select:none}.mdc-menu .mdc-list-item--disabled{cursor:auto}.mdc-menu a.mdc-list-item .mdc-list-item__graphic,.mdc-menu a.mdc-list-item .mdc-list-item__text{pointer-events:none}.mdc-menu__selection-group{padding:0;fill:currentColor}.mdc-menu__selection-group .mdc-list-item{padding-left:56px;padding-right:16px}.mdc-menu__selection-group .mdc-list-item[dir=rtl],[dir=rtl] .mdc-menu__selection-group .mdc-list-item{padding-left:16px;padding-right:56px}.mdc-menu__selection-group .mdc-menu__selection-group-icon{left:16px;right:auto;display:none;position:absolute;top:50%;transform:translateY(-50%)}.mdc-menu__selection-group .mdc-menu__selection-group-icon[dir=rtl],[dir=rtl] .mdc-menu__selection-group .mdc-menu__selection-group-icon{left:auto;right:16px}.mdc-menu-item--selected .mdc-menu__selection-group-icon{display:inline}.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0,0,.2,1);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface,#fff);color:#000;color:var(--mdc-theme-on-surface,#000);border-radius:4px;transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity 75ms linear}.mdc-menu-surface[dir=rtl],[dir=rtl] .mdc-menu-surface{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.smui-menu-surface--static{position:static;z-index:0;display:inline-block;transform:scale(1);opacity:1}.mdc-select--activated{z-index:8}.smui-select--standard:after,.smui-select--standard:before{content:none}.smui-select--standard.mdc-select--disabled .mdc-select__anchor,.smui-select--standard .mdc-select__anchor:after,.smui-select--standard .mdc-select__anchor:before,.smui-select--standard:not(.mdc-select--disabled) .mdc-select__anchor{background-color:transparent}.smui-select--standard .mdc-select__selected-text{padding-left:0;padding-right:36px}.smui-select--standard .mdc-select__selected-text[dir=rtl],[dir=rtl] .smui-select--standard .mdc-select__selected-text{padding-left:36px;padding-right:0}.smui-select--standard.mdc-select--with-leading-icon .mdc-select__selected-text{padding-left:32px;padding-right:36px}.smui-select--standard.mdc-select--with-leading-icon .mdc-select__selected-text[dir=rtl],[dir=rtl] .smui-select--standard.mdc-select--with-leading-icon .mdc-select__selected-text{padding-left:36px;padding-right:32px}.smui-select--standard .mdc-select__dropdown-icon{left:auto;right:0}.smui-select--standard .mdc-floating-label,.smui-select--standard .mdc-select__dropdown-icon[dir=rtl],[dir=rtl] .smui-select--standard .mdc-select__dropdown-icon{left:0;right:auto}.smui-select--standard .mdc-floating-label[dir=rtl],[dir=rtl] .smui-select--standard .mdc-floating-label{left:auto;right:0}.smui-select--standard.mdc-select--with-leading-icon .mdc-floating-label{left:32px;right:auto}.smui-select--standard.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl],[dir=rtl] .smui-select--standard.mdc-select--with-leading-icon .mdc-floating-label{left:auto;right:32px}.smui-select--standard.mdc-select--with-leading-icon .mdc-select__icon{left:0;right:auto}.smui-select--standard.mdc-select--with-leading-icon .mdc-select__icon[dir=rtl],[dir=rtl] .smui-select--standard.mdc-select--with-leading-icon .mdc-select__icon{left:auto;right:0}.smui-select--standard+.mdc-select-helper-line{padding-left:0;padding-right:0}";
styleInject(css_248z$1);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/*! *****************************************************************************
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

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation =
/** @class */
function () {
  function MDCFoundation(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }

    this.adapter_ = adapter;
  }

  Object.defineProperty(MDCFoundation, "cssClasses", {
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "strings", {
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "numbers", {
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "defaultAdapter", {
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    },
    enumerable: true,
    configurable: true
  });

  MDCFoundation.prototype.init = function () {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function () {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCComponent =
/** @class */
function () {
  function MDCComponent(root, foundation) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    this.root_ = root;
    this.initialize.apply(this, __spread(args)); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.attachTo = function (root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new MDCFoundation({}));
  };
  /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */


  MDCComponent.prototype.initialize = function () {
    var _args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      _args[_i] = arguments[_i];
    } // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.

  };

  MDCComponent.prototype.getDefaultFoundation = function () {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function () {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function () {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  MDCComponent.prototype.listen = function (evtType, handler, options) {
    this.root_.addEventListener(evtType, handler, options);
  };

  MDCComponent.prototype.unlisten = function (evtType, handler, options) {
    this.root_.removeEventListener(evtType, handler, options);
  };
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
   */


  MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
    if (shouldBubble === void 0) {
      shouldBubble = false;
    }

    var evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
        detail: evtData
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$8 = {
  LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
  LABEL_SHAKE: 'mdc-floating-label--shake',
  ROOT: 'mdc-floating-label'
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCFloatingLabelFoundation =
/** @class */
function (_super) {
  __extends(MDCFloatingLabelFoundation, _super);

  function MDCFloatingLabelFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCFloatingLabelFoundation.defaultAdapter, adapter)) || this;

    _this.shakeAnimationEndHandler_ = function () {
      return _this.handleShakeAnimationEnd_();
    };

    return _this;
  }

  Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$8;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
    /**
     * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function addClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        getWidth: function getWidth() {
          return 0;
        },
        registerInteractionHandler: function registerInteractionHandler() {
          return undefined;
        },
        deregisterInteractionHandler: function deregisterInteractionHandler() {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCFloatingLabelFoundation.prototype.init = function () {
    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };

  MDCFloatingLabelFoundation.prototype.destroy = function () {
    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };
  /**
   * Returns the width of the label element.
   */


  MDCFloatingLabelFoundation.prototype.getWidth = function () {
    return this.adapter_.getWidth();
  };
  /**
   * Styles the label to produce a shake animation to indicate an error.
   * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
   */


  MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

    if (shouldShake) {
      this.adapter_.addClass(LABEL_SHAKE);
    } else {
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };
  /**
   * Styles the label to float or dock.
   * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
   */


  MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
    var _a = MDCFloatingLabelFoundation.cssClasses,
        LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE,
        LABEL_SHAKE = _a.LABEL_SHAKE;

    if (shouldFloat) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };

  MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
    this.adapter_.removeClass(LABEL_SHAKE);
  };

  return MDCFloatingLabelFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCFloatingLabel =
/** @class */
function (_super) {
  __extends(MDCFloatingLabel, _super);

  function MDCFloatingLabel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCFloatingLabel.attachTo = function (root) {
    return new MDCFloatingLabel(root);
  };
  /**
   * Styles the label to produce the label shake for errors.
   * @param shouldShake If true, shakes the label by adding a CSS class; otherwise, stops shaking by removing the class.
   */


  MDCFloatingLabel.prototype.shake = function (shouldShake) {
    this.foundation_.shake(shouldShake);
  };
  /**
   * Styles the label to float/dock.
   * @param shouldFloat If true, floats the label by adding a CSS class; otherwise, docks it by removing the class.
   */


  MDCFloatingLabel.prototype.float = function (shouldFloat) {
    this.foundation_.float(shouldFloat);
  };

  MDCFloatingLabel.prototype.getWidth = function () {
    return this.foundation_.getWidth();
  };

  MDCFloatingLabel.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      getWidth: function getWidth() {
        return _this.root_.scrollWidth;
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return _this.unlisten(evtType, handler);
      }
    }; // tslint:enable:object-literal-sort-keys

    return new MDCFloatingLabelFoundation(adapter);
  };

  return MDCFloatingLabel;
}(MDCComponent);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$7 = {
  LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
  LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCLineRippleFoundation =
/** @class */
function (_super) {
  __extends(MDCLineRippleFoundation, _super);

  function MDCLineRippleFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCLineRippleFoundation.defaultAdapter, adapter)) || this;

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd(evt);
    };

    return _this;
  }

  Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$7;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
    /**
     * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function addClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        hasClass: function hasClass() {
          return false;
        },
        setStyle: function setStyle() {
          return undefined;
        },
        registerEventHandler: function registerEventHandler() {
          return undefined;
        },
        deregisterEventHandler: function deregisterEventHandler() {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCLineRippleFoundation.prototype.init = function () {
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.destroy = function () {
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.activate = function () {
    this.adapter_.removeClass(cssClasses$7.LINE_RIPPLE_DEACTIVATING);
    this.adapter_.addClass(cssClasses$7.LINE_RIPPLE_ACTIVE);
  };

  MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
    this.adapter_.setStyle('transform-origin', xCoordinate + "px center");
  };

  MDCLineRippleFoundation.prototype.deactivate = function () {
    this.adapter_.addClass(cssClasses$7.LINE_RIPPLE_DEACTIVATING);
  };

  MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
    // Wait for the line ripple to be either transparent or opaque
    // before emitting the animation end event
    var isDeactivating = this.adapter_.hasClass(cssClasses$7.LINE_RIPPLE_DEACTIVATING);

    if (evt.propertyName === 'opacity') {
      if (isDeactivating) {
        this.adapter_.removeClass(cssClasses$7.LINE_RIPPLE_ACTIVE);
        this.adapter_.removeClass(cssClasses$7.LINE_RIPPLE_DEACTIVATING);
      }
    }
  };

  return MDCLineRippleFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCLineRipple =
/** @class */
function (_super) {
  __extends(MDCLineRipple, _super);

  function MDCLineRipple() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCLineRipple.attachTo = function (root) {
    return new MDCLineRipple(root);
  };
  /**
   * Activates the line ripple
   */


  MDCLineRipple.prototype.activate = function () {
    this.foundation_.activate();
  };
  /**
   * Deactivates the line ripple
   */


  MDCLineRipple.prototype.deactivate = function () {
    this.foundation_.deactivate();
  };
  /**
   * Sets the transform origin given a user's click location.
   * The `rippleCenter` is the x-coordinate of the middle of the ripple.
   */


  MDCLineRipple.prototype.setRippleCenter = function (xCoordinate) {
    this.foundation_.setRippleCenter(xCoordinate);
  };

  MDCLineRipple.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      setStyle: function setStyle(propertyName, value) {
        return _this.root_.style.setProperty(propertyName, value);
      },
      registerEventHandler: function registerEventHandler(evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
        return _this.unlisten(evtType, handler);
      }
    }; // tslint:enable:object-literal-sort-keys

    return new MDCLineRippleFoundation(adapter);
  };

  return MDCLineRipple;
}(MDCComponent);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$6 = {
  ANCHOR: 'mdc-menu-surface--anchor',
  ANIMATING_CLOSED: 'mdc-menu-surface--animating-closed',
  ANIMATING_OPEN: 'mdc-menu-surface--animating-open',
  FIXED: 'mdc-menu-surface--fixed',
  OPEN: 'mdc-menu-surface--open',
  ROOT: 'mdc-menu-surface'
}; // tslint:disable:object-literal-sort-keys

var strings$7 = {
  CLOSED_EVENT: 'MDCMenuSurface:closed',
  OPENED_EVENT: 'MDCMenuSurface:opened',
  FOCUSABLE_ELEMENTS: ['button:not(:disabled)', '[href]:not([aria-disabled="true"])', 'input:not(:disabled)', 'select:not(:disabled)', 'textarea:not(:disabled)', '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(', ')
}; // tslint:enable:object-literal-sort-keys

var numbers$5 = {
  /** Total duration of menu-surface open animation. */
  TRANSITION_OPEN_DURATION: 120,

  /** Total duration of menu-surface close animation. */
  TRANSITION_CLOSE_DURATION: 75,

  /** Margin left to the edge of the viewport when menu-surface is at maximum possible height. */
  MARGIN_TO_EDGE: 32,

  /** Ratio of anchor width to menu-surface width for switching from corner positioning to center positioning. */
  ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67
};
/**
 * Enum for bits in the {@see Corner) bitmap.
 */

var CornerBit;

(function (CornerBit) {
  CornerBit[CornerBit["BOTTOM"] = 1] = "BOTTOM";
  CornerBit[CornerBit["CENTER"] = 2] = "CENTER";
  CornerBit[CornerBit["RIGHT"] = 4] = "RIGHT";
  CornerBit[CornerBit["FLIP_RTL"] = 8] = "FLIP_RTL";
})(CornerBit || (CornerBit = {}));
/**
 * Enum for representing an element corner for positioning the menu-surface.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 */


var Corner;

(function (Corner) {
  Corner[Corner["TOP_LEFT"] = 0] = "TOP_LEFT";
  Corner[Corner["TOP_RIGHT"] = 4] = "TOP_RIGHT";
  Corner[Corner["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
  Corner[Corner["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
  Corner[Corner["TOP_START"] = 8] = "TOP_START";
  Corner[Corner["TOP_END"] = 12] = "TOP_END";
  Corner[Corner["BOTTOM_START"] = 9] = "BOTTOM_START";
  Corner[Corner["BOTTOM_END"] = 13] = "BOTTOM_END";
})(Corner || (Corner = {}));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  var el = element;

  while (el) {
    if (matches(el, selector)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}
function matches(element, selector) {
  var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$5 = {
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  ROOT: 'mdc-list'
};
var strings$6 = {
  ACTION_EVENT: 'MDCList:action',
  ARIA_CHECKED: 'aria-checked',
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: 'aria-current',
  ARIA_DISABLED: 'aria-disabled',
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: 'aria-selected',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses$5.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$5.LIST_ITEM_CLASS + " a\n  ",
  FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses$5.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$5.LIST_ITEM_CLASS + " a,\n    ." + cssClasses$5.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses$5.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled)\n  ",
  RADIO_SELECTOR: 'input[type="radio"]'
};
var numbers$4 = {
  UNSET_INDEX: -1
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

function isNumberArray(selectedIndex) {
  return selectedIndex instanceof Array;
}

var MDCListFoundation =
/** @class */
function (_super) {
  __extends(MDCListFoundation, _super);

  function MDCListFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCListFoundation.defaultAdapter, adapter)) || this;

    _this.wrapFocus_ = false;
    _this.isVertical_ = true;
    _this.isSingleSelectionList_ = false;
    _this.selectedIndex_ = numbers$4.UNSET_INDEX;
    _this.focusedItemIndex_ = numbers$4.UNSET_INDEX;
    _this.useActivatedClass_ = false;
    _this.ariaCurrentAttrValue_ = null;
    _this.isCheckboxList_ = false;
    _this.isRadioList_ = false;
    return _this;
  }

  Object.defineProperty(MDCListFoundation, "strings", {
    get: function get() {
      return strings$6;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$5;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "numbers", {
    get: function get() {
      return numbers$4;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClassForElementIndex: function addClassForElementIndex() {
          return undefined;
        },
        focusItemAtIndex: function focusItemAtIndex() {
          return undefined;
        },
        getAttributeForElementIndex: function getAttributeForElementIndex() {
          return null;
        },
        getFocusedElementIndex: function getFocusedElementIndex() {
          return 0;
        },
        getListItemCount: function getListItemCount() {
          return 0;
        },
        hasCheckboxAtIndex: function hasCheckboxAtIndex() {
          return false;
        },
        hasRadioAtIndex: function hasRadioAtIndex() {
          return false;
        },
        isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex() {
          return false;
        },
        isFocusInsideList: function isFocusInsideList() {
          return false;
        },
        isRootFocused: function isRootFocused() {
          return false;
        },
        listItemAtIndexHasClass: function listItemAtIndexHasClass() {
          return false;
        },
        notifyAction: function notifyAction() {
          return undefined;
        },
        removeClassForElementIndex: function removeClassForElementIndex() {
          return undefined;
        },
        setAttributeForElementIndex: function setAttributeForElementIndex() {
          return undefined;
        },
        setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex() {
          return undefined;
        },
        setTabIndexForListItemChildren: function setTabIndexForListItemChildren() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCListFoundation.prototype.layout = function () {
    if (this.adapter_.getListItemCount() === 0) {
      return;
    }

    if (this.adapter_.hasCheckboxAtIndex(0)) {
      this.isCheckboxList_ = true;
    } else if (this.adapter_.hasRadioAtIndex(0)) {
      this.isRadioList_ = true;
    }
  };
  /**
   * Sets the private wrapFocus_ variable.
   */


  MDCListFoundation.prototype.setWrapFocus = function (value) {
    this.wrapFocus_ = value;
  };
  /**
   * Sets the isVertical_ private variable.
   */


  MDCListFoundation.prototype.setVerticalOrientation = function (value) {
    this.isVertical_ = value;
  };
  /**
   * Sets the isSingleSelectionList_ private variable.
   */


  MDCListFoundation.prototype.setSingleSelection = function (value) {
    this.isSingleSelectionList_ = value;
  };
  /**
   * Sets the useActivatedClass_ private variable.
   */


  MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
    this.useActivatedClass_ = useActivated;
  };

  MDCListFoundation.prototype.getSelectedIndex = function () {
    return this.selectedIndex_;
  };

  MDCListFoundation.prototype.setSelectedIndex = function (index) {
    if (!this.isIndexValid_(index)) {
      return;
    }

    if (this.isCheckboxList_) {
      this.setCheckboxAtIndex_(index);
    } else if (this.isRadioList_) {
      this.setRadioAtIndex_(index);
    } else {
      this.setSingleSelectionAtIndex_(index);
    }
  };
  /**
   * Focus in handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '0');
    }
  };
  /**
   * Focus out handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
    var _this = this;

    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '-1');
    }
    /**
     * Between Focusout & Focusin some browsers do not have focus on any element. Setting a delay to wait till the focus
     * is moved to next element.
     */


    setTimeout(function () {
      if (!_this.adapter_.isFocusInsideList()) {
        _this.setTabindexToFirstSelectedItem_();
      }
    }, 0);
  };
  /**
   * Key handler for the list.
   */


  MDCListFoundation.prototype.handleKeydown = function (evt, isRootListItem, listItemIndex) {
    var isArrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    var isArrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    var isArrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
    var isArrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    var isHome = evt.key === 'Home' || evt.keyCode === 36;
    var isEnd = evt.key === 'End' || evt.keyCode === 35;
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    var isSpace = evt.key === 'Space' || evt.keyCode === 32;

    if (this.adapter_.isRootFocused()) {
      if (isArrowUp || isEnd) {
        evt.preventDefault();
        this.focusLastElement();
      } else if (isArrowDown || isHome) {
        evt.preventDefault();
        this.focusFirstElement();
      }

      return;
    }

    var currentIndex = this.adapter_.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    var nextIndex;

    if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusPrevElement(currentIndex);
    } else if (isHome) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusFirstElement();
    } else if (isEnd) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusLastElement();
    } else if (isEnter || isSpace) {
      if (isRootListItem) {
        // Return early if enter key is pressed on anchor element which triggers synthetic MouseEvent event.
        var target = evt.target;

        if (target && target.tagName === 'A' && isEnter) {
          return;
        }

        this.preventDefaultEvent_(evt);

        if (this.isSelectableList_()) {
          this.setSelectedIndexOnAction_(currentIndex);
        }

        this.adapter_.notifyAction(currentIndex);
      }
    }

    this.focusedItemIndex_ = currentIndex;

    if (nextIndex !== undefined) {
      this.setTabindexAtIndex_(nextIndex);
      this.focusedItemIndex_ = nextIndex;
    }
  };
  /**
   * Click handler for the list.
   */


  MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
    if (index === numbers$4.UNSET_INDEX) {
      return;
    }

    if (this.isSelectableList_()) {
      this.setSelectedIndexOnAction_(index, toggleCheckbox);
    }

    this.adapter_.notifyAction(index);
    this.setTabindexAtIndex_(index);
    this.focusedItemIndex_ = index;
  };
  /**
   * Focuses the next element on the list.
   */


  MDCListFoundation.prototype.focusNextElement = function (index) {
    var count = this.adapter_.getListItemCount();
    var nextIndex = index + 1;

    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        // Return early because last item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(nextIndex);
    return nextIndex;
  };
  /**
   * Focuses the previous element on the list.
   */


  MDCListFoundation.prototype.focusPrevElement = function (index) {
    var prevIndex = index - 1;

    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter_.getListItemCount() - 1;
      } else {
        // Return early because first item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(prevIndex);
    return prevIndex;
  };

  MDCListFoundation.prototype.focusFirstElement = function () {
    this.adapter_.focusItemAtIndex(0);
    return 0;
  };

  MDCListFoundation.prototype.focusLastElement = function () {
    var lastIndex = this.adapter_.getListItemCount() - 1;
    this.adapter_.focusItemAtIndex(lastIndex);
    return lastIndex;
  };
  /**
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCListFoundation.prototype.setEnabled = function (itemIndex, isEnabled) {
    if (!this.isIndexValid_(itemIndex)) {
      return;
    }

    if (isEnabled) {
      this.adapter_.removeClassForElementIndex(itemIndex, cssClasses$5.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.setAttributeForElementIndex(itemIndex, strings$6.ARIA_DISABLED, 'false');
    } else {
      this.adapter_.addClassForElementIndex(itemIndex, cssClasses$5.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.setAttributeForElementIndex(itemIndex, strings$6.ARIA_DISABLED, 'true');
    }
  };
  /**
   * Ensures that preventDefault is only called if the containing element doesn't
   * consume the event, and it will cause an unintended scroll.
   */


  MDCListFoundation.prototype.preventDefaultEvent_ = function (evt) {
    var target = evt.target;
    var tagName = ("" + target.tagName).toLowerCase();

    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  };

  MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
    if (this.selectedIndex_ === index) {
      return;
    }

    var selectedClassName = cssClasses$5.LIST_ITEM_SELECTED_CLASS;

    if (this.useActivatedClass_) {
      selectedClassName = cssClasses$5.LIST_ITEM_ACTIVATED_CLASS;
    }

    if (this.selectedIndex_ !== numbers$4.UNSET_INDEX) {
      this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
    }

    this.adapter_.addClassForElementIndex(index, selectedClassName);
    this.setAriaForSingleSelectionAtIndex_(index);
    this.selectedIndex_ = index;
  };
  /**
   * Sets aria attribute for single selection at given index.
   */


  MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
    // Detect the presence of aria-current and get the value only during list initialization when it is in unset state.
    if (this.selectedIndex_ === numbers$4.UNSET_INDEX) {
      this.ariaCurrentAttrValue_ = this.adapter_.getAttributeForElementIndex(index, strings$6.ARIA_CURRENT);
    }

    var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
    var ariaAttribute = isAriaCurrent ? strings$6.ARIA_CURRENT : strings$6.ARIA_SELECTED;

    if (this.selectedIndex_ !== numbers$4.UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
    }

    var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
    this.adapter_.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
  };
  /**
   * Toggles radio at give index. Radio doesn't change the checked state if it is already checked.
   */


  MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
    this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, true);

    if (this.selectedIndex_ !== numbers$4.UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, strings$6.ARIA_CHECKED, 'false');
    }

    this.adapter_.setAttributeForElementIndex(index, strings$6.ARIA_CHECKED, 'true');
    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
    for (var i = 0; i < this.adapter_.getListItemCount(); i++) {
      var isChecked = false;

      if (index.indexOf(i) >= 0) {
        isChecked = true;
      }

      this.adapter_.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
      this.adapter_.setAttributeForElementIndex(i, strings$6.ARIA_CHECKED, isChecked ? 'true' : 'false');
    }

    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setTabindexAtIndex_ = function (index) {
    if (this.focusedItemIndex_ === numbers$4.UNSET_INDEX && index !== 0) {
      // If no list item was selected set first list item's tabindex to -1.
      // Generally, tabindex is set to 0 on first list item of list that has no preselected items.
      this.adapter_.setAttributeForElementIndex(0, 'tabindex', '-1');
    } else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
      this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_, 'tabindex', '-1');
    }

    this.adapter_.setAttributeForElementIndex(index, 'tabindex', '0');
  };
  /**
   * @return Return true if it is single selectin list, checkbox list or radio list.
   */


  MDCListFoundation.prototype.isSelectableList_ = function () {
    return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
  };

  MDCListFoundation.prototype.setTabindexToFirstSelectedItem_ = function () {
    var targetIndex = 0;

    if (this.isSelectableList_()) {
      if (typeof this.selectedIndex_ === 'number' && this.selectedIndex_ !== numbers$4.UNSET_INDEX) {
        targetIndex = this.selectedIndex_;
      } else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
        targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) {
          return Math.min(currentIndex, minIndex);
        });
      }
    }

    this.setTabindexAtIndex_(targetIndex);
  };

  MDCListFoundation.prototype.isIndexValid_ = function (index) {
    var _this = this;

    if (index instanceof Array) {
      if (!this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
      }

      if (index.length === 0) {
        return true;
      } else {
        return index.some(function (i) {
          return _this.isIndexInRange_(i);
        });
      }
    } else if (typeof index === 'number') {
      if (this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Expected array of index for checkbox based list but got number: ' + index);
      }

      return this.isIndexInRange_(index);
    } else {
      return false;
    }
  };

  MDCListFoundation.prototype.isIndexInRange_ = function (index) {
    var listSize = this.adapter_.getListItemCount();
    return index >= 0 && index < listSize;
  };
  /**
   * Sets selected index on user action, toggles checkbox / radio based on toggleCheckbox value.
   * User interaction should not toggle list item(s) when disabled.
   */


  MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
    if (toggleCheckbox === void 0) {
      toggleCheckbox = true;
    }

    if (this.adapter_.listItemAtIndexHasClass(index, cssClasses$5.LIST_ITEM_DISABLED_CLASS)) {
      return;
    }

    if (this.isCheckboxList_) {
      this.toggleCheckboxAtIndex_(index, toggleCheckbox);
    } else {
      this.setSelectedIndex(index);
    }
  };

  MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
    var isChecked = this.adapter_.isCheckboxCheckedAtIndex(index);

    if (toggleCheckbox) {
      isChecked = !isChecked;
      this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
    }

    this.adapter_.setAttributeForElementIndex(index, strings$6.ARIA_CHECKED, isChecked ? 'true' : 'false'); // If none of the checkbox items are selected and selectedIndex is not initialized then provide a default value.

    var selectedIndexes = this.selectedIndex_ === numbers$4.UNSET_INDEX ? [] : this.selectedIndex_.slice();

    if (isChecked) {
      selectedIndexes.push(index);
    } else {
      selectedIndexes = selectedIndexes.filter(function (i) {
        return i !== index;
      });
    }

    this.selectedIndex_ = selectedIndexes;
  };

  return MDCListFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCList =
/** @class */
function (_super) {
  __extends(MDCList, _super);

  function MDCList() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCList.prototype, "vertical", {
    set: function set(value) {
      this.foundation_.setVerticalOrientation(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "listElements", {
    get: function get() {
      return [].slice.call(this.root_.querySelectorAll("." + cssClasses$5.LIST_ITEM_CLASS));
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "wrapFocus", {
    set: function set(value) {
      this.foundation_.setWrapFocus(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "singleSelection", {
    set: function set(isSingleSelectionList) {
      this.foundation_.setSingleSelection(isSingleSelectionList);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "selectedIndex", {
    get: function get() {
      return this.foundation_.getSelectedIndex();
    },
    set: function set(index) {
      this.foundation_.setSelectedIndex(index);
    },
    enumerable: true,
    configurable: true
  });

  MDCList.attachTo = function (root) {
    return new MDCList(root);
  };

  MDCList.prototype.initialSyncWithDOM = function () {
    this.handleClick_ = this.handleClickEvent_.bind(this);
    this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
    this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
    this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
    this.listen('keydown', this.handleKeydown_);
    this.listen('click', this.handleClick_);
    this.listen('focusin', this.focusInEventListener_);
    this.listen('focusout', this.focusOutEventListener_);
    this.layout();
    this.initializeListType();
  };

  MDCList.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten('click', this.handleClick_);
    this.unlisten('focusin', this.focusInEventListener_);
    this.unlisten('focusout', this.focusOutEventListener_);
  };

  MDCList.prototype.layout = function () {
    var direction = this.root_.getAttribute(strings$6.ARIA_ORIENTATION);
    this.vertical = direction !== strings$6.ARIA_ORIENTATION_HORIZONTAL; // List items need to have at least tabindex=-1 to be focusable.

    [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])')).forEach(function (el) {
      el.setAttribute('tabindex', '-1');
    }); // Child button/a elements are not tabbable until the list item is focused.

    [].slice.call(this.root_.querySelectorAll(strings$6.FOCUSABLE_CHILD_ELEMENTS)).forEach(function (el) {
      return el.setAttribute('tabindex', '-1');
    });
    this.foundation_.layout();
  };
  /**
   * Initialize selectedIndex value based on pre-selected checkbox list items, single selection or radio.
   */


  MDCList.prototype.initializeListType = function () {
    var _this = this;

    var checkboxListItems = this.root_.querySelectorAll(strings$6.ARIA_ROLE_CHECKBOX_SELECTOR);
    var singleSelectedListItem = this.root_.querySelector("\n      ." + cssClasses$5.LIST_ITEM_ACTIVATED_CLASS + ",\n      ." + cssClasses$5.LIST_ITEM_SELECTED_CLASS + "\n    ");
    var radioSelectedListItem = this.root_.querySelector(strings$6.ARIA_CHECKED_RADIO_SELECTOR);

    if (checkboxListItems.length) {
      var preselectedItems = this.root_.querySelectorAll(strings$6.ARIA_CHECKED_CHECKBOX_SELECTOR);
      this.selectedIndex = [].map.call(preselectedItems, function (listItem) {
        return _this.listElements.indexOf(listItem);
      });
    } else if (singleSelectedListItem) {
      if (singleSelectedListItem.classList.contains(cssClasses$5.LIST_ITEM_ACTIVATED_CLASS)) {
        this.foundation_.setUseActivatedClass(true);
      }

      this.singleSelection = true;
      this.selectedIndex = this.listElements.indexOf(singleSelectedListItem);
    } else if (radioSelectedListItem) {
      this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
    }
  };
  /**
   * Updates the list item at itemIndex to the desired isEnabled state.
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCList.prototype.setEnabled = function (itemIndex, isEnabled) {
    this.foundation_.setEnabled(itemIndex, isEnabled);
  };

  MDCList.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClassForElementIndex: function addClassForElementIndex(index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.add(className);
        }
      },
      focusItemAtIndex: function focusItemAtIndex(index) {
        var element = _this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      getAttributeForElementIndex: function getAttributeForElementIndex(index, attr) {
        return _this.listElements[index].getAttribute(attr);
      },
      getFocusedElementIndex: function getFocusedElementIndex() {
        return _this.listElements.indexOf(document.activeElement);
      },
      getListItemCount: function getListItemCount() {
        return _this.listElements.length;
      },
      hasCheckboxAtIndex: function hasCheckboxAtIndex(index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(strings$6.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: function hasRadioAtIndex(index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(strings$6.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex(index) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(strings$6.CHECKBOX_SELECTOR);
        return toggleEl.checked;
      },
      isFocusInsideList: function isFocusInsideList() {
        return _this.root_.contains(document.activeElement);
      },
      isRootFocused: function isRootFocused() {
        return document.activeElement === _this.root_;
      },
      listItemAtIndexHasClass: function listItemAtIndexHasClass(index, className) {
        return _this.listElements[index].classList.contains(className);
      },
      notifyAction: function notifyAction(index) {
        _this.emit(strings$6.ACTION_EVENT, {
          index: index
        },
        /** shouldBubble */
        true);
      },
      removeClassForElementIndex: function removeClassForElementIndex(index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.remove(className);
        }
      },
      setAttributeForElementIndex: function setAttributeForElementIndex(index, attr, value) {
        var element = _this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex(index, isChecked) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(strings$6.CHECKBOX_RADIO_SELECTOR);
        toggleEl.checked = isChecked;
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        toggleEl.dispatchEvent(event);
      },
      setTabIndexForListItemChildren: function setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {
        var element = _this.listElements[listItemIndex];
        var listItemChildren = [].slice.call(element.querySelectorAll(strings$6.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        listItemChildren.forEach(function (el) {
          return el.setAttribute('tabindex', tabIndexValue);
        });
      }
    };
    return new MDCListFoundation(adapter);
  };
  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   */


  MDCList.prototype.getListItemIndex_ = function (evt) {
    var eventTarget = evt.target;
    var nearestParent = closest(eventTarget, "." + cssClasses$5.LIST_ITEM_CLASS + ", ." + cssClasses$5.ROOT); // Get the index of the element if it is a list item.

    if (nearestParent && matches(nearestParent, "." + cssClasses$5.LIST_ITEM_CLASS)) {
      return this.listElements.indexOf(nearestParent);
    }

    return -1;
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusInEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusIn(evt, index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusOutEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusOut(evt, index);
  };
  /**
   * Used to figure out which element was focused when keydown event occurred before sending the event to the
   * foundation.
   */


  MDCList.prototype.handleKeydownEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target;
    this.foundation_.handleKeydown(evt, target.classList.contains(cssClasses$5.LIST_ITEM_CLASS), index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleClickEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target; // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.

    var toggleCheckbox = !matches(target, strings$6.CHECKBOX_RADIO_SELECTOR);
    this.foundation_.handleClick(index, toggleCheckbox);
  };

  return MDCList;
}(MDCComponent);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCMenuSurfaceFoundation =
/** @class */
function (_super) {
  __extends(MDCMenuSurfaceFoundation, _super);

  function MDCMenuSurfaceFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCMenuSurfaceFoundation.defaultAdapter, adapter)) || this;

    _this.isOpen_ = false;
    _this.isQuickOpen_ = false;
    _this.isHoistedElement_ = false;
    _this.isFixedPosition_ = false;
    _this.openAnimationEndTimerId_ = 0;
    _this.closeAnimationEndTimerId_ = 0;
    _this.animationRequestId_ = 0;
    _this.anchorCorner_ = Corner.TOP_START;
    _this.anchorMargin_ = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    _this.position_ = {
      x: 0,
      y: 0
    };
    return _this;
  }

  Object.defineProperty(MDCMenuSurfaceFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$6;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "strings", {
    get: function get() {
      return strings$7;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "numbers", {
    get: function get() {
      return numbers$5;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "Corner", {
    get: function get() {
      return Corner;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "defaultAdapter", {
    /**
     * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function addClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        hasClass: function hasClass() {
          return false;
        },
        hasAnchor: function hasAnchor() {
          return false;
        },
        isElementInContainer: function isElementInContainer() {
          return false;
        },
        isFocused: function isFocused() {
          return false;
        },
        isRtl: function isRtl() {
          return false;
        },
        getInnerDimensions: function getInnerDimensions() {
          return {
            height: 0,
            width: 0
          };
        },
        getAnchorDimensions: function getAnchorDimensions() {
          return null;
        },
        getWindowDimensions: function getWindowDimensions() {
          return {
            height: 0,
            width: 0
          };
        },
        getBodyDimensions: function getBodyDimensions() {
          return {
            height: 0,
            width: 0
          };
        },
        getWindowScroll: function getWindowScroll() {
          return {
            x: 0,
            y: 0
          };
        },
        setPosition: function setPosition() {
          return undefined;
        },
        setMaxHeight: function setMaxHeight() {
          return undefined;
        },
        setTransformOrigin: function setTransformOrigin() {
          return undefined;
        },
        saveFocus: function saveFocus() {
          return undefined;
        },
        restoreFocus: function restoreFocus() {
          return undefined;
        },
        notifyClose: function notifyClose() {
          return undefined;
        },
        notifyOpen: function notifyOpen() {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCMenuSurfaceFoundation.prototype.init = function () {
    var _a = MDCMenuSurfaceFoundation.cssClasses,
        ROOT = _a.ROOT,
        OPEN = _a.OPEN;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(ROOT + " class required in root element.");
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    }
  };

  MDCMenuSurfaceFoundation.prototype.destroy = function () {
    clearTimeout(this.openAnimationEndTimerId_);
    clearTimeout(this.closeAnimationEndTimerId_); // Cancel any currently running animations.

    cancelAnimationFrame(this.animationRequestId_);
  };
  /**
   * @param corner Default anchor corner alignment of top-left menu surface corner.
   */


  MDCMenuSurfaceFoundation.prototype.setAnchorCorner = function (corner) {
    this.anchorCorner_ = corner;
  };
  /**
   * @param margin Set of margin values from anchor.
   */


  MDCMenuSurfaceFoundation.prototype.setAnchorMargin = function (margin) {
    this.anchorMargin_.top = margin.top || 0;
    this.anchorMargin_.right = margin.right || 0;
    this.anchorMargin_.bottom = margin.bottom || 0;
    this.anchorMargin_.left = margin.left || 0;
  };
  /** Used to indicate if the menu-surface is hoisted to the body. */


  MDCMenuSurfaceFoundation.prototype.setIsHoisted = function (isHoisted) {
    this.isHoistedElement_ = isHoisted;
  };
  /** Used to set the menu-surface calculations based on a fixed position menu. */


  MDCMenuSurfaceFoundation.prototype.setFixedPosition = function (isFixedPosition) {
    this.isFixedPosition_ = isFixedPosition;
  };
  /** Sets the menu-surface position on the page. */


  MDCMenuSurfaceFoundation.prototype.setAbsolutePosition = function (x, y) {
    this.position_.x = this.isFinite_(x) ? x : 0;
    this.position_.y = this.isFinite_(y) ? y : 0;
  };

  MDCMenuSurfaceFoundation.prototype.setQuickOpen = function (quickOpen) {
    this.isQuickOpen_ = quickOpen;
  };

  MDCMenuSurfaceFoundation.prototype.isOpen = function () {
    return this.isOpen_;
  };
  /**
   * Open the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.open = function () {
    var _this = this;

    this.adapter_.saveFocus();

    if (!this.isQuickOpen_) {
      this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
    }

    this.animationRequestId_ = requestAnimationFrame(function () {
      _this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

      _this.dimensions_ = _this.adapter_.getInnerDimensions();

      _this.autoPosition_();

      if (_this.isQuickOpen_) {
        _this.adapter_.notifyOpen();
      } else {
        _this.openAnimationEndTimerId_ = setTimeout(function () {
          _this.openAnimationEndTimerId_ = 0;

          _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);

          _this.adapter_.notifyOpen();
        }, numbers$5.TRANSITION_OPEN_DURATION);
      }
    });
    this.isOpen_ = true;
  };
  /**
   * Closes the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.close = function (skipRestoreFocus) {
    var _this = this;

    if (skipRestoreFocus === void 0) {
      skipRestoreFocus = false;
    }

    if (!this.isQuickOpen_) {
      this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
    }

    requestAnimationFrame(function () {
      _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

      if (_this.isQuickOpen_) {
        _this.adapter_.notifyClose();
      } else {
        _this.closeAnimationEndTimerId_ = setTimeout(function () {
          _this.closeAnimationEndTimerId_ = 0;

          _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);

          _this.adapter_.notifyClose();
        }, numbers$5.TRANSITION_CLOSE_DURATION);
      }
    });
    this.isOpen_ = false;

    if (!skipRestoreFocus) {
      this.maybeRestoreFocus_();
    }
  };
  /** Handle clicks and close if not within menu-surface element. */


  MDCMenuSurfaceFoundation.prototype.handleBodyClick = function (evt) {
    var el = evt.target;

    if (this.adapter_.isElementInContainer(el)) {
      return;
    }

    this.close();
  };
  /** Handle keys that close the surface. */


  MDCMenuSurfaceFoundation.prototype.handleKeydown = function (evt) {
    var keyCode = evt.keyCode,
        key = evt.key;
    var isEscape = key === 'Escape' || keyCode === 27;

    if (isEscape) {
      this.close();
    }
  };

  MDCMenuSurfaceFoundation.prototype.autoPosition_ = function () {
    var _a; // Compute measurements for autoposition methods reuse.


    this.measurements_ = this.getAutoLayoutMeasurements_();
    var corner = this.getOriginCorner_();
    var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight_(corner);
    var verticalAlignment = this.hasBit_(corner, CornerBit.BOTTOM) ? 'bottom' : 'top';
    var horizontalAlignment = this.hasBit_(corner, CornerBit.RIGHT) ? 'right' : 'left';
    var horizontalOffset = this.getHorizontalOriginOffset_(corner);
    var verticalOffset = this.getVerticalOriginOffset_(corner);
    var _b = this.measurements_,
        anchorSize = _b.anchorSize,
        surfaceSize = _b.surfaceSize;
    var position = (_a = {}, _a[horizontalAlignment] = horizontalOffset, _a[verticalAlignment] = verticalOffset, _a); // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.

    if (anchorSize.width / surfaceSize.width > numbers$5.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
      horizontalAlignment = 'center';
    } // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element


    if (this.isHoistedElement_ || this.isFixedPosition_) {
      this.adjustPositionForHoistedElement_(position);
    }

    this.adapter_.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
    this.adapter_.setPosition(position);
    this.adapter_.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '');
  };
  /**
   * @return Measurements used to position menu surface popup.
   */


  MDCMenuSurfaceFoundation.prototype.getAutoLayoutMeasurements_ = function () {
    var anchorRect = this.adapter_.getAnchorDimensions();
    var bodySize = this.adapter_.getBodyDimensions();
    var viewportSize = this.adapter_.getWindowDimensions();
    var windowScroll = this.adapter_.getWindowScroll();

    if (!anchorRect) {
      // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
      anchorRect = {
        top: this.position_.y,
        right: this.position_.x,
        bottom: this.position_.y,
        left: this.position_.x,
        width: 0,
        height: 0
      }; // tslint:enable:object-literal-sort-keys
    }

    return {
      anchorSize: anchorRect,
      bodySize: bodySize,
      surfaceSize: this.dimensions_,
      viewportDistance: {
        // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
        top: anchorRect.top,
        right: viewportSize.width - anchorRect.right,
        bottom: viewportSize.height - anchorRect.bottom,
        left: anchorRect.left
      },
      viewportSize: viewportSize,
      windowScroll: windowScroll
    };
  };
  /**
   * Computes the corner of the anchor from which to animate and position the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.getOriginCorner_ = function () {
    // Defaults: open from the top left.
    var corner = Corner.TOP_LEFT;
    var _a = this.measurements_,
        viewportDistance = _a.viewportDistance,
        anchorSize = _a.anchorSize,
        surfaceSize = _a.surfaceSize;
    var isBottomAligned = this.hasBit_(this.anchorCorner_, CornerBit.BOTTOM);
    var availableTop = isBottomAligned ? viewportDistance.top + anchorSize.height + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
    var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorSize.height - this.anchorMargin_.top;
    var topOverflow = surfaceSize.height - availableTop;
    var bottomOverflow = surfaceSize.height - availableBottom;

    if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
      corner = this.setBit_(corner, CornerBit.BOTTOM);
    }

    var isRtl = this.adapter_.isRtl();
    var isFlipRtl = this.hasBit_(this.anchorCorner_, CornerBit.FLIP_RTL);
    var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, CornerBit.RIGHT);
    var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
    var availableLeft = isAlignedRight ? viewportDistance.left + anchorSize.width + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
    var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorSize.width - this.anchorMargin_.left;
    var leftOverflow = surfaceSize.width - availableLeft;
    var rightOverflow = surfaceSize.width - availableRight;

    if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
      corner = this.setBit_(corner, CornerBit.RIGHT);
    }

    return corner;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Maximum height of the menu surface, based on available space. 0 indicates should not be set.
   */


  MDCMenuSurfaceFoundation.prototype.getMenuSurfaceMaxHeight_ = function (corner) {
    var viewportDistance = this.measurements_.viewportDistance;
    var maxHeight = 0;
    var isBottomAligned = this.hasBit_(corner, CornerBit.BOTTOM);
    var isBottomAnchored = this.hasBit_(this.anchorCorner_, CornerBit.BOTTOM);
    var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE; // When maximum height is not specified, it is handled from CSS.

    if (isBottomAligned) {
      maxHeight = viewportDistance.top + this.anchorMargin_.top - MARGIN_TO_EDGE;

      if (!isBottomAnchored) {
        maxHeight += this.measurements_.anchorSize.height;
      }
    } else {
      maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom + this.measurements_.anchorSize.height - MARGIN_TO_EDGE;

      if (isBottomAnchored) {
        maxHeight -= this.measurements_.anchorSize.height;
      }
    }

    return maxHeight;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Horizontal offset of menu surface origin corner from corresponding anchor corner.
   */


  MDCMenuSurfaceFoundation.prototype.getHorizontalOriginOffset_ = function (corner) {
    var anchorSize = this.measurements_.anchorSize; // isRightAligned corresponds to using the 'right' property on the surface.

    var isRightAligned = this.hasBit_(corner, CornerBit.RIGHT);
    var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, CornerBit.RIGHT);

    if (isRightAligned) {
      var rightOffset = avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.left : this.anchorMargin_.right; // For hoisted or fixed elements, adjust the offset by the difference between viewport width and body width so
      // when we calculate the right value (`adjustPositionForHoistedElement_`) based on the element position,
      // the right property is correct.

      if (this.isHoistedElement_ || this.isFixedPosition_) {
        return rightOffset - (this.measurements_.viewportSize.width - this.measurements_.bodySize.width);
      }

      return rightOffset;
    }

    return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.right : this.anchorMargin_.left;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Vertical offset of menu surface origin corner from corresponding anchor corner.
   */


  MDCMenuSurfaceFoundation.prototype.getVerticalOriginOffset_ = function (corner) {
    var anchorSize = this.measurements_.anchorSize;
    var isBottomAligned = this.hasBit_(corner, CornerBit.BOTTOM);
    var avoidVerticalOverlap = this.hasBit_(this.anchorCorner_, CornerBit.BOTTOM);
    var y = 0;

    if (isBottomAligned) {
      y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin_.top : -this.anchorMargin_.bottom;
    } else {
      y = avoidVerticalOverlap ? anchorSize.height + this.anchorMargin_.bottom : this.anchorMargin_.top;
    }

    return y;
  };
  /** Calculates the offsets for positioning the menu-surface when the menu-surface has been hoisted to the body. */


  MDCMenuSurfaceFoundation.prototype.adjustPositionForHoistedElement_ = function (position) {
    var e_1, _a;

    var _b = this.measurements_,
        windowScroll = _b.windowScroll,
        viewportDistance = _b.viewportDistance;
    var props = Object.keys(position);

    try {
      for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
        var prop = props_1_1.value;
        var value = position[prop] || 0; // Hoisted surfaces need to have the anchor elements location on the page added to the
        // position properties for proper alignment on the body.

        value += viewportDistance[prop]; // Surfaces that are absolutely positioned need to have additional calculations for scroll
        // and bottom positioning.

        if (!this.isFixedPosition_) {
          if (prop === 'top') {
            value += windowScroll.y;
          } else if (prop === 'bottom') {
            value -= windowScroll.y;
          } else if (prop === 'left') {
            value += windowScroll.x;
          } else {
            // prop === 'right'
            value -= windowScroll.x;
          }
        }

        position[prop] = value;
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  /**
   * The last focused element when the menu surface was opened should regain focus, if the user is
   * focused on or within the menu surface when it is closed.
   */


  MDCMenuSurfaceFoundation.prototype.maybeRestoreFocus_ = function () {
    var isRootFocused = this.adapter_.isFocused();
    var childHasFocus = document.activeElement && this.adapter_.isElementInContainer(document.activeElement);

    if (isRootFocused || childHasFocus) {
      this.adapter_.restoreFocus();
    }
  };

  MDCMenuSurfaceFoundation.prototype.hasBit_ = function (corner, bit) {
    return Boolean(corner & bit); // tslint:disable-line:no-bitwise
  };

  MDCMenuSurfaceFoundation.prototype.setBit_ = function (corner, bit) {
    return corner | bit; // tslint:disable-line:no-bitwise
  };
  /**
   * isFinite that doesn't force conversion to number type.
   * Equivalent to Number.isFinite in ES2015, which is not supported in IE.
   */


  MDCMenuSurfaceFoundation.prototype.isFinite_ = function (num) {
    return typeof num === 'number' && isFinite(num);
  };

  return MDCMenuSurfaceFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cachedCssTransformPropertyName_;
/**
 * Returns the name of the correct transform property to use on the current browser.
 */

function getTransformPropertyName(globalObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  if (cachedCssTransformPropertyName_ === undefined || forceRefresh) {
    var el = globalObj.document.createElement('div');
    cachedCssTransformPropertyName_ = 'transform' in el.style ? 'transform' : 'webkitTransform';
  }

  return cachedCssTransformPropertyName_;
}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCMenuSurface =
/** @class */
function (_super) {
  __extends(MDCMenuSurface, _super);

  function MDCMenuSurface() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCMenuSurface.attachTo = function (root) {
    return new MDCMenuSurface(root);
  };

  MDCMenuSurface.prototype.initialSyncWithDOM = function () {
    var _this = this;

    var parentEl = this.root_.parentElement;
    this.anchorElement = parentEl && parentEl.classList.contains(cssClasses$6.ANCHOR) ? parentEl : null;

    if (this.root_.classList.contains(cssClasses$6.FIXED)) {
      this.setFixedPosition(true);
    }

    this.handleKeydown_ = function (evt) {
      return _this.foundation_.handleKeydown(evt);
    };

    this.handleBodyClick_ = function (evt) {
      return _this.foundation_.handleBodyClick(evt);
    };

    this.registerBodyClickListener_ = function () {
      return document.body.addEventListener('click', _this.handleBodyClick_);
    };

    this.deregisterBodyClickListener_ = function () {
      return document.body.removeEventListener('click', _this.handleBodyClick_);
    };

    this.listen('keydown', this.handleKeydown_);
    this.listen(strings$7.OPENED_EVENT, this.registerBodyClickListener_);
    this.listen(strings$7.CLOSED_EVENT, this.deregisterBodyClickListener_);
  };

  MDCMenuSurface.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten(strings$7.OPENED_EVENT, this.registerBodyClickListener_);
    this.unlisten(strings$7.CLOSED_EVENT, this.deregisterBodyClickListener_);

    _super.prototype.destroy.call(this);
  };

  MDCMenuSurface.prototype.isOpen = function () {
    return this.foundation_.isOpen();
  };

  MDCMenuSurface.prototype.open = function () {
    this.foundation_.open();
  };

  MDCMenuSurface.prototype.close = function (skipRestoreFocus) {
    if (skipRestoreFocus === void 0) {
      skipRestoreFocus = false;
    }

    this.foundation_.close(skipRestoreFocus);
  };

  Object.defineProperty(MDCMenuSurface.prototype, "quickOpen", {
    set: function set(quickOpen) {
      this.foundation_.setQuickOpen(quickOpen);
    },
    enumerable: true,
    configurable: true
  });
  /** Sets the foundation to use page offsets for an positioning when the menu is hoisted to the body. */

  MDCMenuSurface.prototype.setIsHoisted = function (isHoisted) {
    this.foundation_.setIsHoisted(isHoisted);
  };
  /** Sets the element that the menu-surface is anchored to. */


  MDCMenuSurface.prototype.setMenuSurfaceAnchorElement = function (element) {
    this.anchorElement = element;
  };
  /** Sets the menu-surface to position: fixed. */


  MDCMenuSurface.prototype.setFixedPosition = function (isFixed) {
    if (isFixed) {
      this.root_.classList.add(cssClasses$6.FIXED);
    } else {
      this.root_.classList.remove(cssClasses$6.FIXED);
    }

    this.foundation_.setFixedPosition(isFixed);
  };
  /** Sets the absolute x/y position to position based on. Requires the menu to be hoisted. */


  MDCMenuSurface.prototype.setAbsolutePosition = function (x, y) {
    this.foundation_.setAbsolutePosition(x, y);
    this.setIsHoisted(true);
  };
  /**
   * @param corner Default anchor corner alignment of top-left surface corner.
   */


  MDCMenuSurface.prototype.setAnchorCorner = function (corner) {
    this.foundation_.setAnchorCorner(corner);
  };

  MDCMenuSurface.prototype.setAnchorMargin = function (margin) {
    this.foundation_.setAnchorMargin(margin);
  };

  MDCMenuSurface.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      hasAnchor: function hasAnchor() {
        return !!_this.anchorElement;
      },
      notifyClose: function notifyClose() {
        return _this.emit(MDCMenuSurfaceFoundation.strings.CLOSED_EVENT, {});
      },
      notifyOpen: function notifyOpen() {
        return _this.emit(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, {});
      },
      isElementInContainer: function isElementInContainer(el) {
        return _this.root_.contains(el);
      },
      isRtl: function isRtl() {
        return getComputedStyle(_this.root_).getPropertyValue('direction') === 'rtl';
      },
      setTransformOrigin: function setTransformOrigin(origin) {
        var propertyName = getTransformPropertyName(window) + "-origin";

        _this.root_.style.setProperty(propertyName, origin);
      },
      isFocused: function isFocused() {
        return document.activeElement === _this.root_;
      },
      saveFocus: function saveFocus() {
        _this.previousFocus_ = document.activeElement;
      },
      restoreFocus: function restoreFocus() {
        if (_this.root_.contains(document.activeElement)) {
          if (_this.previousFocus_ && _this.previousFocus_.focus) {
            _this.previousFocus_.focus();
          }
        }
      },
      getInnerDimensions: function getInnerDimensions() {
        return {
          width: _this.root_.offsetWidth,
          height: _this.root_.offsetHeight
        };
      },
      getAnchorDimensions: function getAnchorDimensions() {
        return _this.anchorElement ? _this.anchorElement.getBoundingClientRect() : null;
      },
      getWindowDimensions: function getWindowDimensions() {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      getBodyDimensions: function getBodyDimensions() {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      },
      getWindowScroll: function getWindowScroll() {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      setPosition: function setPosition(position) {
        _this.root_.style.left = 'left' in position ? position.left + "px" : '';
        _this.root_.style.right = 'right' in position ? position.right + "px" : '';
        _this.root_.style.top = 'top' in position ? position.top + "px" : '';
        _this.root_.style.bottom = 'bottom' in position ? position.bottom + "px" : '';
      },
      setMaxHeight: function setMaxHeight(height) {
        _this.root_.style.maxHeight = height;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new MDCMenuSurfaceFoundation(adapter);
  };

  return MDCMenuSurface;
}(MDCComponent);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$4 = {
  MENU_SELECTED_LIST_ITEM: 'mdc-menu-item--selected',
  MENU_SELECTION_GROUP: 'mdc-menu__selection-group',
  ROOT: 'mdc-menu'
};
var strings$5 = {
  ARIA_CHECKED_ATTR: 'aria-checked',
  ARIA_DISABLED_ATTR: 'aria-disabled',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  LIST_SELECTOR: '.mdc-list',
  SELECTED_EVENT: 'MDCMenu:selected'
};
var numbers$3 = {
  FOCUS_ROOT_INDEX: -1
};
var DefaultFocusState;

(function (DefaultFocusState) {
  DefaultFocusState[DefaultFocusState["NONE"] = 0] = "NONE";
  DefaultFocusState[DefaultFocusState["LIST_ROOT"] = 1] = "LIST_ROOT";
  DefaultFocusState[DefaultFocusState["FIRST_ITEM"] = 2] = "FIRST_ITEM";
  DefaultFocusState[DefaultFocusState["LAST_ITEM"] = 3] = "LAST_ITEM";
})(DefaultFocusState || (DefaultFocusState = {}));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCMenuFoundation =
/** @class */
function (_super) {
  __extends(MDCMenuFoundation, _super);

  function MDCMenuFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCMenuFoundation.defaultAdapter, adapter)) || this;

    _this.closeAnimationEndTimerId_ = 0;
    _this.defaultFocusState_ = DefaultFocusState.LIST_ROOT;
    return _this;
  }

  Object.defineProperty(MDCMenuFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$4;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "strings", {
    get: function get() {
      return strings$5;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "numbers", {
    get: function get() {
      return numbers$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "defaultAdapter", {
    /**
     * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClassToElementAtIndex: function addClassToElementAtIndex() {
          return undefined;
        },
        removeClassFromElementAtIndex: function removeClassFromElementAtIndex() {
          return undefined;
        },
        addAttributeToElementAtIndex: function addAttributeToElementAtIndex() {
          return undefined;
        },
        removeAttributeFromElementAtIndex: function removeAttributeFromElementAtIndex() {
          return undefined;
        },
        elementContainsClass: function elementContainsClass() {
          return false;
        },
        closeSurface: function closeSurface() {
          return undefined;
        },
        getElementIndex: function getElementIndex() {
          return -1;
        },
        notifySelected: function notifySelected() {
          return undefined;
        },
        getMenuItemCount: function getMenuItemCount() {
          return 0;
        },
        focusItemAtIndex: function focusItemAtIndex() {
          return undefined;
        },
        focusListRoot: function focusListRoot() {
          return undefined;
        },
        getSelectedSiblingOfItemAtIndex: function getSelectedSiblingOfItemAtIndex() {
          return -1;
        },
        isSelectableItemAtIndex: function isSelectableItemAtIndex() {
          return false;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCMenuFoundation.prototype.destroy = function () {
    if (this.closeAnimationEndTimerId_) {
      clearTimeout(this.closeAnimationEndTimerId_);
    }

    this.adapter_.closeSurface();
  };

  MDCMenuFoundation.prototype.handleKeydown = function (evt) {
    var key = evt.key,
        keyCode = evt.keyCode;
    var isTab = key === 'Tab' || keyCode === 9;

    if (isTab) {
      this.adapter_.closeSurface(
      /** skipRestoreFocus */
      true);
    }
  };

  MDCMenuFoundation.prototype.handleItemAction = function (listItem) {
    var _this = this;

    var index = this.adapter_.getElementIndex(listItem);

    if (index < 0) {
      return;
    }

    this.adapter_.notifySelected({
      index: index
    });
    this.adapter_.closeSurface(); // Wait for the menu to close before adding/removing classes that affect styles.

    this.closeAnimationEndTimerId_ = setTimeout(function () {
      // Recompute the index in case the menu contents have changed.
      var recomputedIndex = _this.adapter_.getElementIndex(listItem);

      if (_this.adapter_.isSelectableItemAtIndex(recomputedIndex)) {
        _this.setSelectedIndex(recomputedIndex);
      }
    }, MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION);
  };

  MDCMenuFoundation.prototype.handleMenuSurfaceOpened = function () {
    switch (this.defaultFocusState_) {
      case DefaultFocusState.FIRST_ITEM:
        this.adapter_.focusItemAtIndex(0);
        break;

      case DefaultFocusState.LAST_ITEM:
        this.adapter_.focusItemAtIndex(this.adapter_.getMenuItemCount() - 1);
        break;

      case DefaultFocusState.NONE:
        // Do nothing.
        break;

      default:
        this.adapter_.focusListRoot();
        break;
    }
  };
  /**
   * Sets default focus state where the menu should focus every time when menu
   * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
   * default.
   */


  MDCMenuFoundation.prototype.setDefaultFocusState = function (focusState) {
    this.defaultFocusState_ = focusState;
  };
  /**
   * Selects the list item at `index` within the menu.
   * @param index Index of list item within the menu.
   */


  MDCMenuFoundation.prototype.setSelectedIndex = function (index) {
    this.validatedIndex_(index);

    if (!this.adapter_.isSelectableItemAtIndex(index)) {
      throw new Error('MDCMenuFoundation: No selection group at specified index.');
    }

    var prevSelectedIndex = this.adapter_.getSelectedSiblingOfItemAtIndex(index);

    if (prevSelectedIndex >= 0) {
      this.adapter_.removeAttributeFromElementAtIndex(prevSelectedIndex, strings$5.ARIA_CHECKED_ATTR);
      this.adapter_.removeClassFromElementAtIndex(prevSelectedIndex, cssClasses$4.MENU_SELECTED_LIST_ITEM);
    }

    this.adapter_.addClassToElementAtIndex(index, cssClasses$4.MENU_SELECTED_LIST_ITEM);
    this.adapter_.addAttributeToElementAtIndex(index, strings$5.ARIA_CHECKED_ATTR, 'true');
  };
  /**
   * Sets the enabled state to isEnabled for the menu item at the given index.
   * @param index Index of the menu item
   * @param isEnabled The desired enabled state of the menu item.
   */


  MDCMenuFoundation.prototype.setEnabled = function (index, isEnabled) {
    this.validatedIndex_(index);

    if (isEnabled) {
      this.adapter_.removeClassFromElementAtIndex(index, cssClasses$5.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.addAttributeToElementAtIndex(index, strings$5.ARIA_DISABLED_ATTR, 'false');
    } else {
      this.adapter_.addClassToElementAtIndex(index, cssClasses$5.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.addAttributeToElementAtIndex(index, strings$5.ARIA_DISABLED_ATTR, 'true');
    }
  };

  MDCMenuFoundation.prototype.validatedIndex_ = function (index) {
    var menuSize = this.adapter_.getMenuItemCount();
    var isIndexInRange = index >= 0 && index < menuSize;

    if (!isIndexInRange) {
      throw new Error('MDCMenuFoundation: No list item at specified index.');
    }
  };

  return MDCMenuFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCMenu =
/** @class */
function (_super) {
  __extends(MDCMenu, _super);

  function MDCMenu() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCMenu.attachTo = function (root) {
    return new MDCMenu(root);
  };

  MDCMenu.prototype.initialize = function (menuSurfaceFactory, listFactory) {
    if (menuSurfaceFactory === void 0) {
      menuSurfaceFactory = function menuSurfaceFactory(el) {
        return new MDCMenuSurface(el);
      };
    }

    if (listFactory === void 0) {
      listFactory = function listFactory(el) {
        return new MDCList(el);
      };
    }

    this.menuSurfaceFactory_ = menuSurfaceFactory;
    this.listFactory_ = listFactory;
  };

  MDCMenu.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.menuSurface_ = this.menuSurfaceFactory_(this.root_);
    var list = this.root_.querySelector(strings$5.LIST_SELECTOR);

    if (list) {
      this.list_ = this.listFactory_(list);
      this.list_.wrapFocus = true;
    } else {
      this.list_ = null;
    }

    this.handleKeydown_ = function (evt) {
      return _this.foundation_.handleKeydown(evt);
    };

    this.handleItemAction_ = function (evt) {
      return _this.foundation_.handleItemAction(_this.items[evt.detail.index]);
    };

    this.handleMenuSurfaceOpened_ = function () {
      return _this.foundation_.handleMenuSurfaceOpened();
    };

    this.menuSurface_.listen(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
    this.listen('keydown', this.handleKeydown_);
    this.listen(MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);
  };

  MDCMenu.prototype.destroy = function () {
    if (this.list_) {
      this.list_.destroy();
    }

    this.menuSurface_.destroy();
    this.menuSurface_.unlisten(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten(MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);

    _super.prototype.destroy.call(this);
  };

  Object.defineProperty(MDCMenu.prototype, "open", {
    get: function get() {
      return this.menuSurface_.isOpen();
    },
    set: function set(value) {
      if (value) {
        this.menuSurface_.open();
      } else {
        this.menuSurface_.close();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "wrapFocus", {
    get: function get() {
      return this.list_ ? this.list_.wrapFocus : false;
    },
    set: function set(value) {
      if (this.list_) {
        this.list_.wrapFocus = value;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "items", {
    /**
     * Return the items within the menu. Note that this only contains the set of elements within
     * the items container that are proper list items, and not supplemental / presentational DOM
     * elements.
     */
    get: function get() {
      return this.list_ ? this.list_.listElements : [];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "quickOpen", {
    set: function set(quickOpen) {
      this.menuSurface_.quickOpen = quickOpen;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Sets default focus state where the menu should focus every time when menu
   * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
   * default.
   * @param focusState Default focus state.
   */

  MDCMenu.prototype.setDefaultFocusState = function (focusState) {
    this.foundation_.setDefaultFocusState(focusState);
  };
  /**
   * @param corner Default anchor corner alignment of top-left menu corner.
   */


  MDCMenu.prototype.setAnchorCorner = function (corner) {
    this.menuSurface_.setAnchorCorner(corner);
  };

  MDCMenu.prototype.setAnchorMargin = function (margin) {
    this.menuSurface_.setAnchorMargin(margin);
  };
  /**
   * Sets the list item as the selected row at the specified index.
   * @param index Index of list item within menu.
   */


  MDCMenu.prototype.setSelectedIndex = function (index) {
    this.foundation_.setSelectedIndex(index);
  };
  /**
   * Sets the enabled state to isEnabled for the menu item at the given index.
   * @param index Index of the menu item
   * @param isEnabled The desired enabled state of the menu item.
   */


  MDCMenu.prototype.setEnabled = function (index, isEnabled) {
    this.foundation_.setEnabled(index, isEnabled);
  };
  /**
   * @return The item within the menu at the index specified.
   */


  MDCMenu.prototype.getOptionByIndex = function (index) {
    var items = this.items;

    if (index < items.length) {
      return this.items[index];
    } else {
      return null;
    }
  };

  MDCMenu.prototype.setFixedPosition = function (isFixed) {
    this.menuSurface_.setFixedPosition(isFixed);
  };

  MDCMenu.prototype.setIsHoisted = function (isHoisted) {
    this.menuSurface_.setIsHoisted(isHoisted);
  };

  MDCMenu.prototype.setAbsolutePosition = function (x, y) {
    this.menuSurface_.setAbsolutePosition(x, y);
  };
  /**
   * Sets the element that the menu-surface is anchored to.
   */


  MDCMenu.prototype.setAnchorElement = function (element) {
    this.menuSurface_.anchorElement = element;
  };

  MDCMenu.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClassToElementAtIndex: function addClassToElementAtIndex(index, className) {
        var list = _this.items;
        list[index].classList.add(className);
      },
      removeClassFromElementAtIndex: function removeClassFromElementAtIndex(index, className) {
        var list = _this.items;
        list[index].classList.remove(className);
      },
      addAttributeToElementAtIndex: function addAttributeToElementAtIndex(index, attr, value) {
        var list = _this.items;
        list[index].setAttribute(attr, value);
      },
      removeAttributeFromElementAtIndex: function removeAttributeFromElementAtIndex(index, attr) {
        var list = _this.items;
        list[index].removeAttribute(attr);
      },
      elementContainsClass: function elementContainsClass(element, className) {
        return element.classList.contains(className);
      },
      closeSurface: function closeSurface(skipRestoreFocus) {
        return _this.menuSurface_.close(skipRestoreFocus);
      },
      getElementIndex: function getElementIndex(element) {
        return _this.items.indexOf(element);
      },
      notifySelected: function notifySelected(evtData) {
        return _this.emit(strings$5.SELECTED_EVENT, {
          index: evtData.index,
          item: _this.items[evtData.index]
        });
      },
      getMenuItemCount: function getMenuItemCount() {
        return _this.items.length;
      },
      focusItemAtIndex: function focusItemAtIndex(index) {
        return _this.items[index].focus();
      },
      focusListRoot: function focusListRoot() {
        return _this.root_.querySelector(strings$5.LIST_SELECTOR).focus();
      },
      isSelectableItemAtIndex: function isSelectableItemAtIndex(index) {
        return !!closest(_this.items[index], "." + cssClasses$4.MENU_SELECTION_GROUP);
      },
      getSelectedSiblingOfItemAtIndex: function getSelectedSiblingOfItemAtIndex(index) {
        var selectionGroupEl = closest(_this.items[index], "." + cssClasses$4.MENU_SELECTION_GROUP);
        var selectedItemEl = selectionGroupEl.querySelector("." + cssClasses$4.MENU_SELECTED_LIST_ITEM);
        return selectedItemEl ? _this.items.indexOf(selectedItemEl) : -1;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new MDCMenuFoundation(adapter);
  };

  return MDCMenu;
}(MDCComponent);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$4 = {
  NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch'
};
var numbers$2 = {
  // This should stay in sync with $mdc-notched-outline-padding * 2.
  NOTCH_ELEMENT_PADDING: 8
};
var cssClasses$3 = {
  NO_LABEL: 'mdc-notched-outline--no-label',
  OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
  OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded'
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCNotchedOutlineFoundation =
/** @class */
function (_super) {
  __extends(MDCNotchedOutlineFoundation, _super);

  function MDCNotchedOutlineFoundation(adapter) {
    return _super.call(this, _assign({}, MDCNotchedOutlineFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
    get: function get() {
      return strings$4;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
    get: function get() {
      return numbers$2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
    /**
     * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function addClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        setNotchWidthProperty: function setNotchWidthProperty() {
          return undefined;
        },
        removeNotchWidthProperty: function removeNotchWidthProperty() {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
   */

  MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

    if (notchWidth > 0) {
      notchWidth += numbers$2.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
    }

    this.adapter_.setNotchWidthProperty(notchWidth);
    this.adapter_.addClass(OUTLINE_NOTCHED);
  };
  /**
   * Removes notched outline selector to close the notch in the outline.
   */


  MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
    this.adapter_.removeClass(OUTLINE_NOTCHED);
    this.adapter_.removeNotchWidthProperty();
  };

  return MDCNotchedOutlineFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCNotchedOutline =
/** @class */
function (_super) {
  __extends(MDCNotchedOutline, _super);

  function MDCNotchedOutline() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCNotchedOutline.attachTo = function (root) {
    return new MDCNotchedOutline(root);
  };

  MDCNotchedOutline.prototype.initialSyncWithDOM = function () {
    this.notchElement_ = this.root_.querySelector(strings$4.NOTCH_ELEMENT_SELECTOR);
    var label = this.root_.querySelector('.' + MDCFloatingLabelFoundation.cssClasses.ROOT);

    if (label) {
      label.style.transitionDuration = '0s';
      this.root_.classList.add(cssClasses$3.OUTLINE_UPGRADED);
      requestAnimationFrame(function () {
        label.style.transitionDuration = '';
      });
    } else {
      this.root_.classList.add(cssClasses$3.NO_LABEL);
    }
  };
  /**
   * Updates classes and styles to open the notch to the specified width.
   * @param notchWidth The notch width in the outline.
   */


  MDCNotchedOutline.prototype.notch = function (notchWidth) {
    this.foundation_.notch(notchWidth);
  };
  /**
   * Updates classes and styles to close the notch.
   */


  MDCNotchedOutline.prototype.closeNotch = function () {
    this.foundation_.closeNotch();
  };

  MDCNotchedOutline.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      setNotchWidthProperty: function setNotchWidthProperty(width) {
        return _this.notchElement_.style.setProperty('width', width + 'px');
      },
      removeNotchWidthProperty: function removeNotchWidthProperty() {
        return _this.notchElement_.style.removeProperty('width');
      }
    }; // tslint:enable:object-literal-sort-keys

    return new MDCNotchedOutlineFoundation(adapter);
  };

  return MDCNotchedOutline;
}(MDCComponent);

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Stores result from applyPassive to avoid redundant processing to detect
 * passive event listener support.
 */
var supportsPassive_;
/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */

function applyPassive(globalObj, forceRefresh) {
  if (globalObj === void 0) {
    globalObj = window;
  }

  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported_1 = false;

    try {
      globalObj.document.addEventListener('test', function () {
        return undefined;
      }, {
        get passive() {
          isSupported_1 = true;
          return isSupported_1;
        }

      });
    } catch (e) {} // tslint:disable-line:no-empty cannot throw error due to tests. tslint also disables console.log.


    supportsPassive_ = isSupported_1;
  }

  return supportsPassive_ ? {
    passive: true
  } : false;
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$2 = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
};
var strings$3 = {
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top'
};
var numbers$1 = {
  DEACTIVATION_TIMEOUT_MS: 225,
  FG_DEACTIVATION_MS: 150,
  INITIAL_ORIGIN_SCALE: 0.6,
  PADDING: 10,
  TAP_DELAY_MS: 300
};

/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
var supportsCssVariables_;

function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug'; // Append to head instead of body because this script might be invoked in the
  // head, in which case the body doesn't exist yet. The probe works either way.

  document.head.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';

  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }

  return hasPseudoVarBug;
}

function supportsCssVariables(windowObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  var CSS = windowObj.CSS;
  var supportsCssVars = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return false;
  }

  var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  var weAreFeatureDetectingSafari10plus = CSS.supports('(--css-vars: yes)') && CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVars = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVars = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVars;
  }

  return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return {
      x: 0,
      y: 0
    };
  }

  var x = pageOffset.x,
      y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY; // Determine touch point relative to the ripple container.

  if (evt.type === 'touchstart') {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // simultaneous nested activations

var activatedTargets = [];

var MDCRippleFoundation =
/** @class */
function (_super) {
  __extends(MDCRippleFoundation, _super);

  function MDCRippleFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;

    _this.activationAnimationHasEnded_ = false;
    _this.activationTimer_ = 0;
    _this.fgDeactivationRemovalTimer_ = 0;
    _this.fgScale_ = '0';
    _this.frame_ = {
      width: 0,
      height: 0
    };
    _this.initialSize_ = 0;
    _this.layoutFrame_ = 0;
    _this.maxRadius_ = 0;
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };
    _this.activationState_ = _this.defaultActivationState_();

    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;

      _this.runDeactivationUXLogicIfReady_();
    };

    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    _this.deactivateHandler_ = function () {
      return _this.deactivate_();
    };

    _this.focusHandler_ = function () {
      return _this.handleFocus();
    };

    _this.blurHandler_ = function () {
      return _this.handleBlur();
    };

    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    return _this;
  }

  Object.defineProperty(MDCRippleFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "strings", {
    get: function get() {
      return strings$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "numbers", {
    get: function get() {
      return numbers$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClass: function addClass() {
          return undefined;
        },
        browserSupportsCssVars: function browserSupportsCssVars() {
          return true;
        },
        computeBoundingRect: function computeBoundingRect() {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        containsEventTarget: function containsEventTarget() {
          return true;
        },
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() {
          return undefined;
        },
        deregisterInteractionHandler: function deregisterInteractionHandler() {
          return undefined;
        },
        deregisterResizeHandler: function deregisterResizeHandler() {
          return undefined;
        },
        getWindowPageOffset: function getWindowPageOffset() {
          return {
            x: 0,
            y: 0
          };
        },
        isSurfaceActive: function isSurfaceActive() {
          return true;
        },
        isSurfaceDisabled: function isSurfaceDisabled() {
          return true;
        },
        isUnbounded: function isUnbounded() {
          return true;
        },
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler() {
          return undefined;
        },
        registerInteractionHandler: function registerInteractionHandler() {
          return undefined;
        },
        registerResizeHandler: function registerResizeHandler() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        updateCssVariable: function updateCssVariable() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCRippleFoundation.prototype.init = function () {
    var _this = this;

    var supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      var _a = MDCRippleFoundation.cssClasses,
          ROOT_1 = _a.ROOT,
          UNBOUNDED_1 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter_.addClass(ROOT_1);

        if (_this.adapter_.isUnbounded()) {
          _this.adapter_.addClass(UNBOUNDED_1); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple


          _this.layoutInternal_();
        }
      });
    }
  };

  MDCRippleFoundation.prototype.destroy = function () {
    var _this = this;

    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      var _a = MDCRippleFoundation.cssClasses,
          ROOT_2 = _a.ROOT,
          UNBOUNDED_2 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter_.removeClass(ROOT_2);

        _this.adapter_.removeClass(UNBOUNDED_2);

        _this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  };
  /**
   * @param evt Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function (evt) {
    this.activate_(evt);
  };

  MDCRippleFoundation.prototype.deactivate = function () {
    this.deactivate_();
  };

  MDCRippleFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(function () {
      _this.layoutInternal_();

      _this.layoutFrame_ = 0;
    });
  };

  MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
    var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  };

  MDCRippleFoundation.prototype.handleFocus = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };

  MDCRippleFoundation.prototype.handleBlur = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   */


  MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
    return this.adapter_.browserSupportsCssVars();
  };

  MDCRippleFoundation.prototype.defaultActivationState_ = function () {
    return {
      activationEvent: undefined,
      hasDeactivationUXRun: false,
      isActivated: false,
      isProgrammatic: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false
    };
  };
  /**
   * supportsPressRipple Passed from init to save a redundant function call
   */


  MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
    var _this = this;

    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
      });

      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
  };

  MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
    var _this = this;

    if (evt.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
      });
    }
  };

  MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
    var _this = this;

    ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  };

  MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
    var _this = this;

    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
    });
  };

  MDCRippleFoundation.prototype.removeCssVars_ = function () {
    var _this = this;

    var rippleStrings = MDCRippleFoundation.strings;
    var keys = Object.keys(rippleStrings);
    keys.forEach(function (key) {
      if (key.indexOf('VAR_') === 0) {
        _this.adapter_.updateCssVariable(rippleStrings[key], null);
      }
    });
  };

  MDCRippleFoundation.prototype.activate_ = function (evt) {
    var _this = this;

    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = evt === undefined;
    activationState.activationEvent = evt;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
    var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
      return _this.adapter_.containsEventTarget(target);
    });

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (evt !== undefined) {
      activatedTargets.push(evt.target);
      this.registerDeactivationHandlers_(evt);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);

    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(function () {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === ' ' || evt.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);

        if (activationState.wasElementMadeActive) {
          _this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        _this.activationState_ = _this.defaultActivationState_();
      }
    });
  };

  MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
    return evt !== undefined && evt.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  };

  MDCRippleFoundation.prototype.animateActivation_ = function () {
    var _this = this;

    var _a = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
    var _b = MDCRippleFoundation.cssClasses,
        FG_DEACTIVATION = _b.FG_DEACTIVATION,
        FG_ACTIVATION = _b.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
    this.layoutInternal_();
    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      var _c = this.getFgTranslationCoordinates_(),
          startPoint = _c.startPoint,
          endPoint = _c.endPoint;

      translateStart = startPoint.x + "px, " + startPoint.y + "px";
      translateEnd = endPoint.x + "px, " + endPoint.y + "px";
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
    var _a = this.activationState_,
        activationEvent = _a.activationEvent,
        wasActivatedByPointer = _a.wasActivatedByPointer;
    var startPoint;

    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return {
      startPoint: startPoint,
      endPoint: endPoint
    };
  };

  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
    var _this = this; // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.


    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _a = this.activationState_,
        hasDeactivationUXRun = _a.hasDeactivationUXRun,
        isActivated = _a.isActivated;
    var activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers$1.FG_DEACTIVATION_MS);
    }
  };

  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
    var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  };

  MDCRippleFoundation.prototype.resetActivationState_ = function () {
    var _this = this;

    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(function () {
      return _this.previousActivationEvent_ = undefined;
    }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  };

  MDCRippleFoundation.prototype.deactivate_ = function () {
    var _this = this;

    var activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    var state = _assign({}, activationState);

    if (activationState.isProgrammatic) {
      requestAnimationFrame(function () {
        return _this.animateDeactivation_(state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function () {
        _this.activationState_.hasDeactivationUXRun = true;

        _this.animateDeactivation_(state);

        _this.resetActivationState_();
      });
    }
  };

  MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
    var wasActivatedByPointer = _a.wasActivatedByPointer,
        wasElementMadeActive = _a.wasElementMadeActive;

    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.layoutInternal_ = function () {
    var _this = this;

    this.frame_ = this.adapter_.computeBoundingRect();
    var maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    var getBoundedRadius = function getBoundedRadius() {
      var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE); // Unbounded ripple size should always be even number to equally center align.

    if (this.adapter_.isUnbounded() && initialSize % 2 !== 0) {
      this.initialSize_ = initialSize - 1;
    } else {
      this.initialSize_ = initialSize;
    }

    this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  };

  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
    var _a = MDCRippleFoundation.strings,
        VAR_FG_SIZE = _a.VAR_FG_SIZE,
        VAR_LEFT = _a.VAR_LEFT,
        VAR_TOP = _a.VAR_TOP,
        VAR_FG_SCALE = _a.VAR_FG_SCALE;
    this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
      this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
    }
  };

  return MDCRippleFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCRipple =
/** @class */
function (_super) {
  __extends(MDCRipple, _super);

  function MDCRipple() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.disabled = false;
    return _this;
  }

  MDCRipple.attachTo = function (root, opts) {
    if (opts === void 0) {
      opts = {
        isUnbounded: undefined
      };
    }

    var ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

    if (opts.isUnbounded !== undefined) {
      ripple.unbounded = opts.isUnbounded;
    }

    return ripple;
  };

  MDCRipple.createAdapter = function (instance) {
    return {
      addClass: function addClass(className) {
        return instance.root_.classList.add(className);
      },
      browserSupportsCssVars: function browserSupportsCssVars() {
        return supportsCssVariables(window);
      },
      computeBoundingRect: function computeBoundingRect() {
        return instance.root_.getBoundingClientRect();
      },
      containsEventTarget: function containsEventTarget(target) {
        return instance.root_.contains(target);
      },
      deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, applyPassive());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return instance.root_.removeEventListener(evtType, handler, applyPassive());
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      getWindowPageOffset: function getWindowPageOffset() {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      isSurfaceActive: function isSurfaceActive() {
        return matches(instance.root_, ':active');
      },
      isSurfaceDisabled: function isSurfaceDisabled() {
        return Boolean(instance.disabled);
      },
      isUnbounded: function isUnbounded() {
        return Boolean(instance.unbounded);
      },
      registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, applyPassive());
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return instance.root_.addEventListener(evtType, handler, applyPassive());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      removeClass: function removeClass(className) {
        return instance.root_.classList.remove(className);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return instance.root_.style.setProperty(varName, value);
      }
    };
  };

  Object.defineProperty(MDCRipple.prototype, "unbounded", {
    get: function get() {
      return Boolean(this.unbounded_);
    },
    set: function set(unbounded) {
      this.unbounded_ = Boolean(unbounded);
      this.setUnbounded_();
    },
    enumerable: true,
    configurable: true
  });

  MDCRipple.prototype.activate = function () {
    this.foundation_.activate();
  };

  MDCRipple.prototype.deactivate = function () {
    this.foundation_.deactivate();
  };

  MDCRipple.prototype.layout = function () {
    this.foundation_.layout();
  };

  MDCRipple.prototype.getDefaultFoundation = function () {
    return new MDCRippleFoundation(MDCRipple.createAdapter(this));
  };

  MDCRipple.prototype.initialSyncWithDOM = function () {
    var root = this.root_;
    this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
  };
  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   */


  MDCRipple.prototype.setUnbounded_ = function () {
    this.foundation_.setUnbounded(Boolean(this.unbounded_));
  };

  return MDCRipple;
}(MDCComponent);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$1 = {
  ACTIVATED: 'mdc-select--activated',
  DISABLED: 'mdc-select--disabled',
  FOCUSED: 'mdc-select--focused',
  INVALID: 'mdc-select--invalid',
  OUTLINED: 'mdc-select--outlined',
  REQUIRED: 'mdc-select--required',
  ROOT: 'mdc-select',
  SELECTED_ITEM_CLASS: 'mdc-list-item--selected',
  WITH_LEADING_ICON: 'mdc-select--with-leading-icon'
};
var strings$2 = {
  ARIA_CONTROLS: 'aria-controls',
  ARIA_SELECTED_ATTR: 'aria-selected',
  CHANGE_EVENT: 'MDCSelect:change',
  LABEL_SELECTOR: '.mdc-floating-label',
  LEADING_ICON_SELECTOR: '.mdc-select__icon',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
  MENU_SELECTOR: '.mdc-select__menu',
  OUTLINE_SELECTOR: '.mdc-notched-outline',
  SELECTED_ITEM_SELECTOR: "." + cssClasses$1.SELECTED_ITEM_CLASS,
  SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text',
  SELECT_ANCHOR_SELECTOR: '.mdc-select__anchor',
  VALUE_ATTR: 'data-value'
};
var numbers = {
  LABEL_SCALE: 0.75,
  UNSET_INDEX: -1
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCSelectFoundation =
/** @class */
function (_super) {
  __extends(MDCSelectFoundation, _super);
  /* istanbul ignore next: optional argument is not a branch statement */

  /**
   * @param adapter
   * @param foundationMap Map from subcomponent names to their subfoundations.
   */


  function MDCSelectFoundation(adapter, foundationMap) {
    if (foundationMap === void 0) {
      foundationMap = {};
    }

    var _this = _super.call(this, _assign({}, MDCSelectFoundation.defaultAdapter, adapter)) || this; // Index of the currently selected menu item.


    _this.selectedIndex_ = numbers.UNSET_INDEX; // Disabled state

    _this.disabled_ = false; // isMenuOpen_ is used to track the state of the menu by listening to the MDCMenuSurface:closed event
    // For reference, menu.open will return false if the menu is still closing, but isMenuOpen_ returns false only after
    // the menu has closed

    _this.isMenuOpen_ = false;
    _this.leadingIcon_ = foundationMap.leadingIcon;
    _this.helperText_ = foundationMap.helperText;
    _this.menuItemValues_ = _this.adapter_.getMenuItemValues();
    return _this;
  }

  Object.defineProperty(MDCSelectFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectFoundation, "numbers", {
    get: function get() {
      return numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectFoundation, "strings", {
    get: function get() {
      return strings$2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectFoundation, "defaultAdapter", {
    /**
     * See {@link MDCSelectAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function addClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        hasClass: function hasClass() {
          return false;
        },
        activateBottomLine: function activateBottomLine() {
          return undefined;
        },
        deactivateBottomLine: function deactivateBottomLine() {
          return undefined;
        },
        getSelectedMenuItem: function getSelectedMenuItem() {
          return null;
        },
        hasLabel: function hasLabel() {
          return false;
        },
        floatLabel: function floatLabel() {
          return undefined;
        },
        getLabelWidth: function getLabelWidth() {
          return 0;
        },
        hasOutline: function hasOutline() {
          return false;
        },
        notchOutline: function notchOutline() {
          return undefined;
        },
        closeOutline: function closeOutline() {
          return undefined;
        },
        setRippleCenter: function setRippleCenter() {
          return undefined;
        },
        notifyChange: function notifyChange() {
          return undefined;
        },
        setSelectedText: function setSelectedText() {
          return undefined;
        },
        isSelectedTextFocused: function isSelectedTextFocused() {
          return false;
        },
        getSelectedTextAttr: function getSelectedTextAttr() {
          return '';
        },
        setSelectedTextAttr: function setSelectedTextAttr() {
          return undefined;
        },
        openMenu: function openMenu() {
          return undefined;
        },
        closeMenu: function closeMenu() {
          return undefined;
        },
        getAnchorElement: function getAnchorElement() {
          return null;
        },
        setMenuAnchorElement: function setMenuAnchorElement() {
          return undefined;
        },
        setMenuAnchorCorner: function setMenuAnchorCorner() {
          return undefined;
        },
        setMenuWrapFocus: function setMenuWrapFocus() {
          return undefined;
        },
        setAttributeAtIndex: function setAttributeAtIndex() {
          return undefined;
        },
        removeAttributeAtIndex: function removeAttributeAtIndex() {
          return undefined;
        },
        focusMenuItemAtIndex: function focusMenuItemAtIndex() {
          return undefined;
        },
        getMenuItemCount: function getMenuItemCount() {
          return 0;
        },
        getMenuItemValues: function getMenuItemValues() {
          return [];
        },
        getMenuItemTextAtIndex: function getMenuItemTextAtIndex() {
          return '';
        },
        getMenuItemAttr: function getMenuItemAttr() {
          return '';
        },
        addClassAtIndex: function addClassAtIndex() {
          return undefined;
        },
        removeClassAtIndex: function removeClassAtIndex() {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /** Returns the index of the currently selected menu item, or -1 if none. */

  MDCSelectFoundation.prototype.getSelectedIndex = function () {
    return this.selectedIndex_;
  };

  MDCSelectFoundation.prototype.setSelectedIndex = function (index, closeMenu) {
    if (closeMenu === void 0) {
      closeMenu = false;
    }

    if (index >= this.adapter_.getMenuItemCount()) {
      return;
    }

    var previouslySelectedIndex = this.selectedIndex_;
    this.selectedIndex_ = index;

    if (this.selectedIndex_ === numbers.UNSET_INDEX) {
      this.adapter_.setSelectedText('');
    } else {
      this.adapter_.setSelectedText(this.adapter_.getMenuItemTextAtIndex(this.selectedIndex_).trim());
    }

    if (previouslySelectedIndex !== numbers.UNSET_INDEX) {
      this.adapter_.removeClassAtIndex(previouslySelectedIndex, cssClasses$1.SELECTED_ITEM_CLASS);
      this.adapter_.removeAttributeAtIndex(previouslySelectedIndex, strings$2.ARIA_SELECTED_ATTR);
    }

    if (this.selectedIndex_ !== numbers.UNSET_INDEX) {
      this.adapter_.addClassAtIndex(this.selectedIndex_, cssClasses$1.SELECTED_ITEM_CLASS);
      this.adapter_.setAttributeAtIndex(this.selectedIndex_, strings$2.ARIA_SELECTED_ATTR, 'true');
    }

    this.layout();

    if (closeMenu) {
      this.adapter_.closeMenu();
    }

    this.handleChange();
  };

  MDCSelectFoundation.prototype.setValue = function (value) {
    var index = this.menuItemValues_.indexOf(value);
    this.setSelectedIndex(index);
    this.handleChange();
  };

  MDCSelectFoundation.prototype.getValue = function () {
    var listItem = this.adapter_.getSelectedMenuItem();

    if (listItem) {
      return this.adapter_.getMenuItemAttr(listItem, strings$2.VALUE_ATTR) || '';
    }

    return '';
  };

  MDCSelectFoundation.prototype.getDisabled = function () {
    return this.disabled_;
  };

  MDCSelectFoundation.prototype.setDisabled = function (isDisabled) {
    this.disabled_ = isDisabled;

    if (this.disabled_) {
      this.adapter_.addClass(cssClasses$1.DISABLED);
      this.adapter_.closeMenu();
    } else {
      this.adapter_.removeClass(cssClasses$1.DISABLED);
    }

    if (this.leadingIcon_) {
      this.leadingIcon_.setDisabled(this.disabled_);
    }

    this.adapter_.setSelectedTextAttr('tabindex', this.disabled_ ? '-1' : '0');
    this.adapter_.setSelectedTextAttr('aria-disabled', this.disabled_.toString());
  };
  /**
   * @param content Sets the content of the helper text.
   */


  MDCSelectFoundation.prototype.setHelperTextContent = function (content) {
    if (this.helperText_) {
      this.helperText_.setContent(content);
    }
  };

  MDCSelectFoundation.prototype.layout = function () {
    if (this.adapter_.hasLabel()) {
      var openNotch = this.getValue().length > 0;
      this.notchOutline(openNotch);
    }
  };

  MDCSelectFoundation.prototype.handleMenuOpened = function () {
    if (this.adapter_.getMenuItemValues().length === 0) {
      return;
    }

    this.adapter_.addClass(cssClasses$1.ACTIVATED); // Menu should open to the last selected element, should open to first menu item otherwise.

    var focusItemIndex = this.selectedIndex_ >= 0 ? this.selectedIndex_ : 0;
    this.adapter_.focusMenuItemAtIndex(focusItemIndex);
  };

  MDCSelectFoundation.prototype.handleMenuClosed = function () {
    this.adapter_.removeClass(cssClasses$1.ACTIVATED);
    this.isMenuOpen_ = false;
    this.adapter_.setSelectedTextAttr('aria-expanded', 'false'); // Unfocus the select if menu is closed without a selection

    if (!this.adapter_.isSelectedTextFocused()) {
      this.blur_();
    }
  };
  /**
   * Handles value changes, via change event or programmatic updates.
   */


  MDCSelectFoundation.prototype.handleChange = function () {
    this.updateLabel_();
    this.adapter_.notifyChange(this.getValue());
    var isRequired = this.adapter_.hasClass(cssClasses$1.REQUIRED);

    if (isRequired) {
      this.setValid(this.isValid());

      if (this.helperText_) {
        this.helperText_.setValidity(this.isValid());
      }
    }
  };

  MDCSelectFoundation.prototype.handleMenuItemAction = function (index) {
    this.setSelectedIndex(index,
    /** closeMenu */
    true);
  };
  /**
   * Handles focus events from select element.
   */


  MDCSelectFoundation.prototype.handleFocus = function () {
    this.adapter_.addClass(cssClasses$1.FOCUSED);

    if (this.adapter_.hasLabel()) {
      this.adapter_.floatLabel(true);
      this.notchOutline(true);
    }

    this.adapter_.activateBottomLine();

    if (this.helperText_) {
      this.helperText_.showToScreenReader();
    }
  };
  /**
   * Handles blur events from select element.
   */


  MDCSelectFoundation.prototype.handleBlur = function () {
    if (this.isMenuOpen_) {
      return;
    }

    this.blur_();
  };

  MDCSelectFoundation.prototype.handleClick = function (normalizedX) {
    if (this.isMenuOpen_) {
      return;
    }

    this.adapter_.setRippleCenter(normalizedX);
    this.adapter_.openMenu();
    this.isMenuOpen_ = true;
    this.adapter_.setSelectedTextAttr('aria-expanded', 'true');
  };

  MDCSelectFoundation.prototype.handleKeydown = function (event) {
    if (this.isMenuOpen_) {
      return;
    }

    var isEnter = event.key === 'Enter' || event.keyCode === 13;
    var isSpace = event.key === 'Space' || event.keyCode === 32;
    var arrowUp = event.key === 'ArrowUp' || event.keyCode === 38;
    var arrowDown = event.key === 'ArrowDown' || event.keyCode === 40;

    if (this.adapter_.hasClass(cssClasses$1.FOCUSED) && (isEnter || isSpace || arrowUp || arrowDown)) {
      this.adapter_.openMenu();
      this.isMenuOpen_ = true;
      this.adapter_.setSelectedTextAttr('aria-expanded', 'true');
      event.preventDefault();
    }
  };
  /**
   * Opens/closes the notched outline.
   */


  MDCSelectFoundation.prototype.notchOutline = function (openNotch) {
    if (!this.adapter_.hasOutline()) {
      return;
    }

    var isFocused = this.adapter_.hasClass(cssClasses$1.FOCUSED);

    if (openNotch) {
      var labelScale = numbers.LABEL_SCALE;
      var labelWidth = this.adapter_.getLabelWidth() * labelScale;
      this.adapter_.notchOutline(labelWidth);
    } else if (!isFocused) {
      this.adapter_.closeOutline();
    }
  };
  /**
   * Sets the aria label of the leading icon.
   */


  MDCSelectFoundation.prototype.setLeadingIconAriaLabel = function (label) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setAriaLabel(label);
    }
  };
  /**
   * Sets the text content of the leading icon.
   */


  MDCSelectFoundation.prototype.setLeadingIconContent = function (content) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setContent(content);
    }
  };

  MDCSelectFoundation.prototype.setValid = function (isValid) {
    this.adapter_.setSelectedTextAttr('aria-invalid', (!isValid).toString());

    if (isValid) {
      this.adapter_.removeClass(cssClasses$1.INVALID);
    } else {
      this.adapter_.addClass(cssClasses$1.INVALID);
    }
  };

  MDCSelectFoundation.prototype.isValid = function () {
    if (this.adapter_.hasClass(cssClasses$1.REQUIRED) && !this.adapter_.hasClass(cssClasses$1.DISABLED)) {
      // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
      // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
      return this.selectedIndex_ !== numbers.UNSET_INDEX && (this.selectedIndex_ !== 0 || Boolean(this.getValue()));
    }

    return true;
  };

  MDCSelectFoundation.prototype.setRequired = function (isRequired) {
    if (isRequired) {
      this.adapter_.addClass(cssClasses$1.REQUIRED);
    } else {
      this.adapter_.removeClass(cssClasses$1.REQUIRED);
    }

    this.adapter_.setSelectedTextAttr('aria-required', isRequired.toString());
  };

  MDCSelectFoundation.prototype.getRequired = function () {
    return this.adapter_.getSelectedTextAttr('aria-required') === 'true';
  };

  MDCSelectFoundation.prototype.init = function () {
    var anchorEl = this.adapter_.getAnchorElement();

    if (anchorEl) {
      this.adapter_.setMenuAnchorElement(anchorEl);
      this.adapter_.setMenuAnchorCorner(Corner.BOTTOM_START);
    }

    this.adapter_.setMenuWrapFocus(false);
    var value = this.getValue();

    if (value) {
      this.setValue(value);
    } // Initially sync floating label


    this.updateLabel_();
  };
  /**
   * Notches the outline and floats the label when appropriate.
   */


  MDCSelectFoundation.prototype.updateLabel_ = function () {
    var value = this.getValue();
    var optionHasValue = value.length > 0;

    if (this.adapter_.hasLabel()) {
      this.notchOutline(optionHasValue);

      if (!this.adapter_.hasClass(cssClasses$1.FOCUSED)) {
        this.adapter_.floatLabel(optionHasValue);
      }
    }
  };
  /**
   * Unfocuses the select component.
   */


  MDCSelectFoundation.prototype.blur_ = function () {
    this.adapter_.removeClass(cssClasses$1.FOCUSED);
    this.updateLabel_();
    this.adapter_.deactivateBottomLine();
    var isRequired = this.adapter_.hasClass(cssClasses$1.REQUIRED);

    if (isRequired) {
      this.setValid(this.isValid());

      if (this.helperText_) {
        this.helperText_.setValidity(this.isValid());
      }
    }
  };

  return MDCSelectFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$1 = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role'
};
var cssClasses = {
  HELPER_TEXT_PERSISTENT: 'mdc-select-helper-text--persistent',
  HELPER_TEXT_VALIDATION_MSG: 'mdc-select-helper-text--validation-msg'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCSelectHelperTextFoundation =
/** @class */
function (_super) {
  __extends(MDCSelectHelperTextFoundation, _super);

  function MDCSelectHelperTextFoundation(adapter) {
    return _super.call(this, _assign({}, MDCSelectHelperTextFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCSelectHelperTextFoundation, "cssClasses", {
    get: function get() {
      return cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectHelperTextFoundation, "strings", {
    get: function get() {
      return strings$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectHelperTextFoundation, "defaultAdapter", {
    /**
     * See {@link MDCSelectHelperTextAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function addClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        hasClass: function hasClass() {
          return false;
        },
        setAttr: function setAttr() {
          return undefined;
        },
        removeAttr: function removeAttr() {
          return undefined;
        },
        setContent: function setContent() {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Sets the content of the helper text field.
   */

  MDCSelectHelperTextFoundation.prototype.setContent = function (content) {
    this.adapter_.setContent(content);
  };
  /**
   *  Sets the persistency of the helper text.
   */


  MDCSelectHelperTextFoundation.prototype.setPersistent = function (isPersistent) {
    if (isPersistent) {
      this.adapter_.addClass(cssClasses.HELPER_TEXT_PERSISTENT);
    } else {
      this.adapter_.removeClass(cssClasses.HELPER_TEXT_PERSISTENT);
    }
  };
  /**
   * @param isValidation True to make the helper text act as an error validation message.
   */


  MDCSelectHelperTextFoundation.prototype.setValidation = function (isValidation) {
    if (isValidation) {
      this.adapter_.addClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
    } else {
      this.adapter_.removeClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
    }
  };
  /**
   * Makes the helper text visible to screen readers.
   */


  MDCSelectHelperTextFoundation.prototype.showToScreenReader = function () {
    this.adapter_.removeAttr(strings$1.ARIA_HIDDEN);
  };
  /**
   * Sets the validity of the helper text based on the select validity.
   */


  MDCSelectHelperTextFoundation.prototype.setValidity = function (selectIsValid) {
    var helperTextIsPersistent = this.adapter_.hasClass(cssClasses.HELPER_TEXT_PERSISTENT);
    var helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
    var validationMsgNeedsDisplay = helperTextIsValidationMsg && !selectIsValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setAttr(strings$1.ROLE, 'alert');
    } else {
      this.adapter_.removeAttr(strings$1.ROLE);
    }

    if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
      this.hide_();
    }
  };
  /**
   * Hides the help text from screen readers.
   */


  MDCSelectHelperTextFoundation.prototype.hide_ = function () {
    this.adapter_.setAttr(strings$1.ARIA_HIDDEN, 'true');
  };

  return MDCSelectHelperTextFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCSelectHelperText =
/** @class */
function (_super) {
  __extends(MDCSelectHelperText, _super);

  function MDCSelectHelperText() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCSelectHelperText.attachTo = function (root) {
    return new MDCSelectHelperText(root);
  };

  Object.defineProperty(MDCSelectHelperText.prototype, "foundation", {
    get: function get() {
      return this.foundation_;
    },
    enumerable: true,
    configurable: true
  });

  MDCSelectHelperText.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      setAttr: function setAttr(attr, value) {
        return _this.root_.setAttribute(attr, value);
      },
      removeAttr: function removeAttr(attr) {
        return _this.root_.removeAttribute(attr);
      },
      setContent: function setContent(content) {
        _this.root_.textContent = content;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new MDCSelectHelperTextFoundation(adapter);
  };

  return MDCSelectHelperText;
}(MDCComponent);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
  ICON_EVENT: 'MDCSelect:icon',
  ICON_ROLE: 'button'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var INTERACTION_EVENTS = ['click', 'keydown'];

var MDCSelectIconFoundation =
/** @class */
function (_super) {
  __extends(MDCSelectIconFoundation, _super);

  function MDCSelectIconFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCSelectIconFoundation.defaultAdapter, adapter)) || this;

    _this.savedTabIndex_ = null;

    _this.interactionHandler_ = function (evt) {
      return _this.handleInteraction(evt);
    };

    return _this;
  }

  Object.defineProperty(MDCSelectIconFoundation, "strings", {
    get: function get() {
      return strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelectIconFoundation, "defaultAdapter", {
    /**
     * See {@link MDCSelectIconAdapter} for typing information on parameters and return types.
     */
    get: function get() {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        getAttr: function getAttr() {
          return null;
        },
        setAttr: function setAttr() {
          return undefined;
        },
        removeAttr: function removeAttr() {
          return undefined;
        },
        setContent: function setContent() {
          return undefined;
        },
        registerInteractionHandler: function registerInteractionHandler() {
          return undefined;
        },
        deregisterInteractionHandler: function deregisterInteractionHandler() {
          return undefined;
        },
        notifyIconAction: function notifyIconAction() {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCSelectIconFoundation.prototype.init = function () {
    var _this = this;

    this.savedTabIndex_ = this.adapter_.getAttr('tabindex');
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter_.registerInteractionHandler(evtType, _this.interactionHandler_);
    });
  };

  MDCSelectIconFoundation.prototype.destroy = function () {
    var _this = this;

    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter_.deregisterInteractionHandler(evtType, _this.interactionHandler_);
    });
  };

  MDCSelectIconFoundation.prototype.setDisabled = function (disabled) {
    if (!this.savedTabIndex_) {
      return;
    }

    if (disabled) {
      this.adapter_.setAttr('tabindex', '-1');
      this.adapter_.removeAttr('role');
    } else {
      this.adapter_.setAttr('tabindex', this.savedTabIndex_);
      this.adapter_.setAttr('role', strings.ICON_ROLE);
    }
  };

  MDCSelectIconFoundation.prototype.setAriaLabel = function (label) {
    this.adapter_.setAttr('aria-label', label);
  };

  MDCSelectIconFoundation.prototype.setContent = function (content) {
    this.adapter_.setContent(content);
  };

  MDCSelectIconFoundation.prototype.handleInteraction = function (evt) {
    var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;

    if (evt.type === 'click' || isEnterKey) {
      this.adapter_.notifyIconAction();
    }
  };

  return MDCSelectIconFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCSelectIcon =
/** @class */
function (_super) {
  __extends(MDCSelectIcon, _super);

  function MDCSelectIcon() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCSelectIcon.attachTo = function (root) {
    return new MDCSelectIcon(root);
  };

  Object.defineProperty(MDCSelectIcon.prototype, "foundation", {
    get: function get() {
      return this.foundation_;
    },
    enumerable: true,
    configurable: true
  });

  MDCSelectIcon.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      getAttr: function getAttr(attr) {
        return _this.root_.getAttribute(attr);
      },
      setAttr: function setAttr(attr, value) {
        return _this.root_.setAttribute(attr, value);
      },
      removeAttr: function removeAttr(attr) {
        return _this.root_.removeAttribute(attr);
      },
      setContent: function setContent(content) {
        _this.root_.textContent = content;
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return _this.unlisten(evtType, handler);
      },
      notifyIconAction: function notifyIconAction() {
        return _this.emit(MDCSelectIconFoundation.strings.ICON_EVENT, {}
        /* evtData */
        , true
        /* shouldBubble */
        );
      }
    }; // tslint:enable:object-literal-sort-keys

    return new MDCSelectIconFoundation(adapter);
  };

  return MDCSelectIcon;
}(MDCComponent);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCSelect =
/** @class */
function (_super) {
  __extends(MDCSelect, _super);

  function MDCSelect() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCSelect.attachTo = function (root) {
    return new MDCSelect(root);
  };

  MDCSelect.prototype.initialize = function (labelFactory, lineRippleFactory, outlineFactory, menuFactory, iconFactory, helperTextFactory) {
    if (labelFactory === void 0) {
      labelFactory = function labelFactory(el) {
        return new MDCFloatingLabel(el);
      };
    }

    if (lineRippleFactory === void 0) {
      lineRippleFactory = function lineRippleFactory(el) {
        return new MDCLineRipple(el);
      };
    }

    if (outlineFactory === void 0) {
      outlineFactory = function outlineFactory(el) {
        return new MDCNotchedOutline(el);
      };
    }

    if (menuFactory === void 0) {
      menuFactory = function menuFactory(el) {
        return new MDCMenu(el);
      };
    }

    if (iconFactory === void 0) {
      iconFactory = function iconFactory(el) {
        return new MDCSelectIcon(el);
      };
    }

    if (helperTextFactory === void 0) {
      helperTextFactory = function helperTextFactory(el) {
        return new MDCSelectHelperText(el);
      };
    }

    this.selectAnchor_ = this.root_.querySelector(strings$2.SELECT_ANCHOR_SELECTOR);
    this.selectedText_ = this.root_.querySelector(strings$2.SELECTED_TEXT_SELECTOR);

    if (!this.selectedText_) {
      throw new Error('MDCSelect: Missing required element: The following selector must be present: ' + ("'" + strings$2.SELECTED_TEXT_SELECTOR + "'"));
    }

    if (this.selectedText_.hasAttribute(strings$2.ARIA_CONTROLS)) {
      var helperTextElement = document.getElementById(this.selectedText_.getAttribute(strings$2.ARIA_CONTROLS));

      if (helperTextElement) {
        this.helperText_ = helperTextFactory(helperTextElement);
      }
    }

    this.menuSetup_(menuFactory);
    var labelElement = this.root_.querySelector(strings$2.LABEL_SELECTOR);
    this.label_ = labelElement ? labelFactory(labelElement) : null;
    var lineRippleElement = this.root_.querySelector(strings$2.LINE_RIPPLE_SELECTOR);
    this.lineRipple_ = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
    var outlineElement = this.root_.querySelector(strings$2.OUTLINE_SELECTOR);
    this.outline_ = outlineElement ? outlineFactory(outlineElement) : null;
    var leadingIcon = this.root_.querySelector(strings$2.LEADING_ICON_SELECTOR);

    if (leadingIcon) {
      this.leadingIcon_ = iconFactory(leadingIcon);
    }

    if (!this.root_.classList.contains(cssClasses$1.OUTLINED)) {
      this.ripple_ = this.createRipple_();
    }
  };
  /**
   * Initializes the select's event listeners and internal state based
   * on the environment's state.
   */


  MDCSelect.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.handleChange_ = function () {
      return _this.foundation_.handleChange();
    };

    this.handleFocus_ = function () {
      return _this.foundation_.handleFocus();
    };

    this.handleBlur_ = function () {
      return _this.foundation_.handleBlur();
    };

    this.handleClick_ = function (evt) {
      _this.selectedText_.focus();

      _this.foundation_.handleClick(_this.getNormalizedXCoordinate_(evt));
    };

    this.handleKeydown_ = function (evt) {
      return _this.foundation_.handleKeydown(evt);
    };

    this.handleMenuItemAction_ = function (evt) {
      return _this.foundation_.handleMenuItemAction(evt.detail.index);
    };

    this.handleMenuOpened_ = function () {
      return _this.foundation_.handleMenuOpened();
    };

    this.handleMenuClosed_ = function () {
      return _this.foundation_.handleMenuClosed();
    };

    this.selectedText_.addEventListener('focus', this.handleFocus_);
    this.selectedText_.addEventListener('blur', this.handleBlur_);
    this.selectedText_.addEventListener('click', this.handleClick_);
    this.selectedText_.addEventListener('keydown', this.handleKeydown_);
    this.menu_.listen(strings$7.CLOSED_EVENT, this.handleMenuClosed_);
    this.menu_.listen(strings$7.OPENED_EVENT, this.handleMenuOpened_);
    this.menu_.listen(strings$5.SELECTED_EVENT, this.handleMenuItemAction_);
    this.foundation_.init(); // Sets disabled state in foundation

    this.disabled = this.root_.classList.contains(cssClasses$1.DISABLED);
  };

  MDCSelect.prototype.destroy = function () {
    this.selectedText_.removeEventListener('change', this.handleChange_);
    this.selectedText_.removeEventListener('focus', this.handleFocus_);
    this.selectedText_.removeEventListener('blur', this.handleBlur_);
    this.selectedText_.removeEventListener('keydown', this.handleKeydown_);
    this.selectedText_.removeEventListener('click', this.handleClick_);
    this.menu_.unlisten(strings$7.CLOSED_EVENT, this.handleMenuClosed_);
    this.menu_.unlisten(strings$7.OPENED_EVENT, this.handleMenuOpened_);
    this.menu_.unlisten(strings$5.SELECTED_EVENT, this.handleMenuItemAction_);
    this.menu_.destroy();

    if (this.ripple_) {
      this.ripple_.destroy();
    }

    if (this.outline_) {
      this.outline_.destroy();
    }

    if (this.leadingIcon_) {
      this.leadingIcon_.destroy();
    }

    if (this.helperText_) {
      this.helperText_.destroy();
    }

    _super.prototype.destroy.call(this);
  };

  Object.defineProperty(MDCSelect.prototype, "value", {
    get: function get() {
      return this.foundation_.getValue();
    },
    set: function set(value) {
      this.foundation_.setValue(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "selectedIndex", {
    get: function get() {
      return this.foundation_.getSelectedIndex();
    },
    set: function set(selectedIndex) {
      this.foundation_.setSelectedIndex(selectedIndex,
      /** closeMenu */
      true);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "disabled", {
    get: function get() {
      return this.foundation_.getDisabled();
    },
    set: function set(disabled) {
      this.foundation_.setDisabled(disabled);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "leadingIconAriaLabel", {
    set: function set(label) {
      this.foundation_.setLeadingIconAriaLabel(label);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "leadingIconContent", {
    /**
     * Sets the text content of the leading icon.
     */
    set: function set(content) {
      this.foundation_.setLeadingIconContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "helperTextContent", {
    /**
     * Sets the text content of the helper text.
     */
    set: function set(content) {
      this.foundation_.setHelperTextContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "valid", {
    /**
     * Checks if the select is in a valid state.
     */
    get: function get() {
      return this.foundation_.isValid();
    },

    /**
     * Sets the current invalid state of the select.
     */
    set: function set(isValid) {
      this.foundation_.setValid(isValid);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSelect.prototype, "required", {
    /**
     * Returns whether the select is required.
     */
    get: function get() {
      return this.foundation_.getRequired();
    },

    /**
     * Sets the control to the required state.
     */
    set: function set(isRequired) {
      this.foundation_.setRequired(isRequired);
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Recomputes the outline SVG path for the outline element.
   */

  MDCSelect.prototype.layout = function () {
    this.foundation_.layout();
  };

  MDCSelect.prototype.getDefaultFoundation = function () {
    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    var adapter = _assign({}, this.getSelectAdapterMethods_(), this.getCommonAdapterMethods_(), this.getOutlineAdapterMethods_(), this.getLabelAdapterMethods_());

    return new MDCSelectFoundation(adapter, this.getFoundationMap_());
  };
  /**
   * Handles setup for the menu.
   */


  MDCSelect.prototype.menuSetup_ = function (menuFactory) {
    this.menuElement_ = this.root_.querySelector(strings$2.MENU_SELECTOR);
    this.menu_ = menuFactory(this.menuElement_);
  };

  MDCSelect.prototype.createRipple_ = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = _assign({}, MDCRipple.createAdapter({
      root_: this.selectAnchor_
    }), {
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return _this.selectedText_.addEventListener(evtType, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return _this.selectedText_.removeEventListener(evtType, handler);
      }
    }); // tslint:enable:object-literal-sort-keys


    return new MDCRipple(this.selectAnchor_, new MDCRippleFoundation(adapter));
  };

  MDCSelect.prototype.getSelectAdapterMethods_ = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      getSelectedMenuItem: function getSelectedMenuItem() {
        return _this.menuElement_.querySelector(strings$2.SELECTED_ITEM_SELECTOR);
      },
      getMenuItemAttr: function getMenuItemAttr(menuItem, attr) {
        return menuItem.getAttribute(attr);
      },
      setSelectedText: function setSelectedText(text) {
        return _this.selectedText_.textContent = text;
      },
      isSelectedTextFocused: function isSelectedTextFocused() {
        return document.activeElement === _this.selectedText_;
      },
      getSelectedTextAttr: function getSelectedTextAttr(attr) {
        return _this.selectedText_.getAttribute(attr);
      },
      setSelectedTextAttr: function setSelectedTextAttr(attr, value) {
        return _this.selectedText_.setAttribute(attr, value);
      },
      openMenu: function openMenu() {
        return _this.menu_.open = true;
      },
      closeMenu: function closeMenu() {
        return _this.menu_.open = false;
      },
      getAnchorElement: function getAnchorElement() {
        return _this.root_.querySelector(strings$2.SELECT_ANCHOR_SELECTOR);
      },
      setMenuAnchorElement: function setMenuAnchorElement(anchorEl) {
        return _this.menu_.setAnchorElement(anchorEl);
      },
      setMenuAnchorCorner: function setMenuAnchorCorner(anchorCorner) {
        return _this.menu_.setAnchorCorner(anchorCorner);
      },
      setMenuWrapFocus: function setMenuWrapFocus(wrapFocus) {
        return _this.menu_.wrapFocus = wrapFocus;
      },
      setAttributeAtIndex: function setAttributeAtIndex(index, attributeName, attributeValue) {
        return _this.menu_.items[index].setAttribute(attributeName, attributeValue);
      },
      removeAttributeAtIndex: function removeAttributeAtIndex(index, attributeName) {
        return _this.menu_.items[index].removeAttribute(attributeName);
      },
      focusMenuItemAtIndex: function focusMenuItemAtIndex(index) {
        return _this.menu_.items[index].focus();
      },
      getMenuItemCount: function getMenuItemCount() {
        return _this.menu_.items.length;
      },
      getMenuItemValues: function getMenuItemValues() {
        return _this.menu_.items.map(function (el) {
          return el.getAttribute(strings$2.VALUE_ATTR) || '';
        });
      },
      getMenuItemTextAtIndex: function getMenuItemTextAtIndex(index) {
        return _this.menu_.items[index].textContent;
      },
      addClassAtIndex: function addClassAtIndex(index, className) {
        return _this.menu_.items[index].classList.add(className);
      },
      removeClassAtIndex: function removeClassAtIndex(index, className) {
        return _this.menu_.items[index].classList.remove(className);
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCSelect.prototype.getCommonAdapterMethods_ = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      setRippleCenter: function setRippleCenter(normalizedX) {
        return _this.lineRipple_ && _this.lineRipple_.setRippleCenter(normalizedX);
      },
      activateBottomLine: function activateBottomLine() {
        return _this.lineRipple_ && _this.lineRipple_.activate();
      },
      deactivateBottomLine: function deactivateBottomLine() {
        return _this.lineRipple_ && _this.lineRipple_.deactivate();
      },
      notifyChange: function notifyChange(value) {
        var index = _this.selectedIndex;

        _this.emit(strings$2.CHANGE_EVENT, {
          value: value,
          index: index
        }, true
        /* shouldBubble  */
        );
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCSelect.prototype.getOutlineAdapterMethods_ = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      hasOutline: function hasOutline() {
        return Boolean(_this.outline_);
      },
      notchOutline: function notchOutline(labelWidth) {
        return _this.outline_ && _this.outline_.notch(labelWidth);
      },
      closeOutline: function closeOutline() {
        return _this.outline_ && _this.outline_.closeNotch();
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCSelect.prototype.getLabelAdapterMethods_ = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      hasLabel: function hasLabel() {
        return !!_this.label_;
      },
      floatLabel: function floatLabel(shouldFloat) {
        return _this.label_ && _this.label_.float(shouldFloat);
      },
      getLabelWidth: function getLabelWidth() {
        return _this.label_ ? _this.label_.getWidth() : 0;
      }
    }; // tslint:enable:object-literal-sort-keys
  };
  /**
   * Calculates where the line ripple should start based on the x coordinate within the component.
   */


  MDCSelect.prototype.getNormalizedXCoordinate_ = function (evt) {
    var targetClientRect = evt.target.getBoundingClientRect();
    var xCoordinate = this.isTouchEvent_(evt) ? evt.touches[0].clientX : evt.clientX;
    return xCoordinate - targetClientRect.left;
  };

  MDCSelect.prototype.isTouchEvent_ = function (evt) {
    return Boolean(evt.touches);
  };
  /**
   * Returns a map of all subcomponents to subfoundations.
   */


  MDCSelect.prototype.getFoundationMap_ = function () {
    return {
      helperText: this.helperText_ ? this.helperText_.foundation : undefined,
      leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : undefined
    };
  };

  return MDCSelect;
}(MDCComponent);

function forwardEventsBuilder(component) {
  var additionalEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var events = ['focus', 'blur', 'fullscreenchange', 'fullscreenerror', 'scroll', 'cut', 'copy', 'paste', 'keydown', 'keypress', 'keyup', 'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel', 'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture'].concat(_toConsumableArray(additionalEvents));

  function forward(e) {
    bubble(component, e);
  }

  return function (node) {
    var destructors = [];

    for (var i = 0; i < events.length; i++) {
      destructors.push(listen(node, events[i], forward));
    }

    return {
      destroy: function destroy() {
        for (var _i = 0; _i < destructors.length; _i++) {
          destructors[_i]();
        }
      }
    };
  };
}

function exclude(obj, keys) {
  var names = Object.getOwnPropertyNames(obj);
  var newObj = {};

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var cashIndex = name.indexOf('$');

    if (cashIndex !== -1 && keys.indexOf(name.substring(0, cashIndex + 1)) !== -1) {
      continue;
    }

    if (keys.indexOf(name) !== -1) {
      continue;
    }

    newObj[name] = obj[name];
  }

  return newObj;
}

function prefixFilter(obj, prefix) {
  var names = Object.getOwnPropertyNames(obj);
  var newObj = {};

  for (var i = 0; i < names.length; i++) {
    var name = names[i];

    if (name.substring(0, prefix.length) === prefix) {
      newObj[name.substring(prefix.length)] = obj[name];
    }
  }

  return newObj;
}

function useActions(node, actions) {
  var objects = [];

  if (actions) {
    for (var i = 0; i < actions.length; i++) {
      var isArray = Array.isArray(actions[i]);
      var action = isArray ? actions[i][0] : actions[i];

      if (isArray && actions[i].length > 1) {
        objects.push(action(node, actions[i][1]));
      } else {
        objects.push(action(node));
      }
    }
  }

  return {
    update: function update(actions) {
      if ((actions && actions.length || 0) != objects.length) {
        throw new Error('You must not change the length of an actions array.');
      }

      if (actions) {
        for (var _i = 0; _i < actions.length; _i++) {
          if (objects[_i] && 'update' in objects[_i]) {
            var _isArray = Array.isArray(actions[_i]);

            if (_isArray && actions[_i].length > 1) {
              objects[_i].update(actions[_i][1]);
            } else {
              objects[_i].update();
            }
          }
        }
      }
    },
    destroy: function destroy() {
      for (var _i2 = 0; _i2 < objects.length; _i2++) {
        if (objects[_i2] && 'destroy' in objects[_i2]) {
          objects[_i2].destroy();
        }
      }
    }
  };
}

var css_248z = ".mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0,0,.2,1);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface,#fff);color:#000;color:var(--mdc-theme-on-surface,#000);border-radius:4px;transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity 75ms linear}.mdc-menu-surface[dir=rtl],[dir=rtl] .mdc-menu-surface{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.smui-menu-surface--static{position:static;z-index:0;display:inline-block;transform:scale(1);opacity:1}";
styleInject(css_248z);

function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$d = "node_modules/@smui/menu-surface/MenuSurface.svelte";

function create_fragment$h(ctx) {
  var div;
  var div_class_value;
  var useActions_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[24].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[23], null);
  var div_levels = [{
    class: div_class_value = "\n    mdc-menu-surface\n    " +
    /*className*/
    ctx[3] + "\n    " + (
    /*fixed*/
    ctx[0] ? "mdc-menu-surface--fixed" : "") + "\n    " + (
    /*isStatic*/
    ctx[4] ? "mdc-menu-surface--open" : "") + "\n    " + (
    /*isStatic*/
    ctx[4] ? "smui-menu-surface--static" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[7], ["use", "class", "static", "anchor", "fixed", "open", "quickOpen", "anchorElement", "anchorCorner", "element"])];
  var div_data = {};

  for (var i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file$d, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      if (default_slot) {
        default_slot.m(div, null);
      }
      /*div_binding*/


      ctx[25](div);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, div,
        /*use*/
        ctx[2])), action_destroyer(/*forwardEvents*/
        ctx[5].call(null, div)), listen_dev(div, "MDCMenuSurface:closed",
        /*updateOpen*/
        ctx[6], false, false, false), listen_dev(div, "MDCMenuSurface:opened",
        /*updateOpen*/
        ctx[6], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8388608) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[23], dirty, null, null);
        }
      }

      set_attributes(div, div_data = get_spread_update(div_levels, [(!current || dirty &
      /*className, fixed, isStatic*/
      25 && div_class_value !== (div_class_value = "\n    mdc-menu-surface\n    " +
      /*className*/
      ctx[3] + "\n    " + (
      /*fixed*/
      ctx[0] ? "mdc-menu-surface--fixed" : "") + "\n    " + (
      /*isStatic*/
      ctx[4] ? "mdc-menu-surface--open" : "") + "\n    " + (
      /*isStatic*/
      ctx[4] ? "smui-menu-surface--static" : "") + "\n  ")) && {
        class: div_class_value
      }, dirty &
      /*$$props*/
      128 && exclude(
      /*$$props*/
      ctx[7], ["use", "class", "static", "anchor", "fixed", "open", "quickOpen", "anchorElement", "anchorCorner", "element"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      4) useActions_action.update.call(null,
      /*use*/
      ctx[2]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
      /*div_binding*/

      ctx[25](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$h.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$h($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("MenuSurface", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCMenuSurface:closed", "MDCMenuSurface:opened"]);
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$static = _$$props4.static,
      isStatic = _$$props4$static === void 0 ? false : _$$props4$static;
  var _$$props5 = $$props,
      _$$props5$anchor = _$$props5.anchor,
      anchor = _$$props5$anchor === void 0 ? true : _$$props5$anchor;
  var _$$props6 = $$props,
      _$$props6$fixed = _$$props6.fixed,
      fixed = _$$props6$fixed === void 0 ? false : _$$props6$fixed;
  var _$$props7 = $$props,
      _$$props7$open = _$$props7.open,
      open = _$$props7$open === void 0 ? isStatic : _$$props7$open;
  var _$$props8 = $$props,
      _$$props8$quickOpen = _$$props8.quickOpen,
      quickOpen = _$$props8$quickOpen === void 0 ? false : _$$props8$quickOpen;
  var _$$props9 = $$props,
      _$$props9$anchorEleme = _$$props9.anchorElement,
      anchorElement = _$$props9$anchorEleme === void 0 ? null : _$$props9$anchorEleme;
  var _$$props10 = $$props,
      _$$props10$anchorCorn = _$$props10.anchorCorner,
      anchorCorner = _$$props10$anchorCorn === void 0 ? null : _$$props10$anchorCorn;
  var _$$props11 = $$props,
      _$$props11$element = _$$props11.element,
      element = _$$props11$element === void 0 ? undefined : _$$props11$element; // This is exported because Menu needs it.

  var menuSurface;
  var instantiate = getContext("SMUI:menu-surface:instantiate");
  var getInstance = getContext("SMUI:menu-surface:getInstance");
  setContext("SMUI:list:role", "menu");
  setContext("SMUI:list:item:role", "menuitem");
  var oldFixed = null;
  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(instantiate !== false)) {
              _context.next = 4;
              break;
            }

            $$invalidate(21, menuSurface = new MDCMenuSurface(element));
            _context.next = 9;
            break;

          case 4:
            _context.t0 = $$invalidate;
            _context.next = 7;
            return getInstance();

          case 7:
            _context.t1 = menuSurface = _context.sent;
            (0, _context.t0)(21, _context.t1);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  onDestroy(function () {
    if (anchor) {
      element && element.parentNode.classList.remove("mdc-menu-surface--anchor");
    }

    var isHoisted = false;

    if (menuSurface) {
      isHoisted = menuSurface.foundation_.isHoistedElement_;

      if (instantiate !== false) {
        menuSurface.destroy();
      }
    }

    if (isHoisted) {
      element.parentNode.removeChild(element);
    }
  });

  function updateOpen() {
    if (menuSurface) {
      if (isStatic) {
        $$invalidate(8, open = true);
      } else {
        $$invalidate(8, open = menuSurface.isOpen());
      }
    }
  }

  function setOpen(value) {
    $$invalidate(8, open = value);
  }

  function setAnchorCorner() {
    var _menuSurface;

    return (_menuSurface = menuSurface).setAnchorCorner.apply(_menuSurface, arguments);
  }

  function setAnchorMargin() {
    var _menuSurface2;

    return (_menuSurface2 = menuSurface).setAnchorMargin.apply(_menuSurface2, arguments);
  }

  function setFixedPosition(isFixed) {
    var _menuSurface3;

    $$invalidate(0, fixed = isFixed);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_menuSurface3 = menuSurface).setFixedPosition.apply(_menuSurface3, [isFixed].concat(args));
  }

  function setAbsolutePosition() {
    var _menuSurface4;

    return (_menuSurface4 = menuSurface).setAbsolutePosition.apply(_menuSurface4, arguments);
  }

  function setMenuSurfaceAnchorElement() {
    var _menuSurface5;

    return (_menuSurface5 = menuSurface).setMenuSurfaceAnchorElement.apply(_menuSurface5, arguments);
  }

  function setIsHoisted() {
    var _menuSurface6;

    return (_menuSurface6 = menuSurface).setIsHoisted.apply(_menuSurface6, arguments);
  }

  function getDefaultFoundation() {
    var _menuSurface7;

    return (_menuSurface7 = menuSurface).getDefaultFoundation.apply(_menuSurface7, arguments);
  }

  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(1, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(2, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(3, className = $$new_props.class);
    if ("static" in $$new_props) $$invalidate(4, isStatic = $$new_props.static);
    if ("anchor" in $$new_props) $$invalidate(10, anchor = $$new_props.anchor);
    if ("fixed" in $$new_props) $$invalidate(0, fixed = $$new_props.fixed);
    if ("open" in $$new_props) $$invalidate(8, open = $$new_props.open);
    if ("quickOpen" in $$new_props) $$invalidate(11, quickOpen = $$new_props.quickOpen);
    if ("anchorElement" in $$new_props) $$invalidate(9, anchorElement = $$new_props.anchorElement);
    if ("anchorCorner" in $$new_props) $$invalidate(12, anchorCorner = $$new_props.anchorCorner);
    if ("element" in $$new_props) $$invalidate(1, element = $$new_props.element);
    if ("$$scope" in $$new_props) $$invalidate(23, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      Corner: Corner,
      CornerBit: CornerBit,
      MDCMenuSurface: MDCMenuSurface,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      isStatic: isStatic,
      anchor: anchor,
      fixed: fixed,
      open: open,
      quickOpen: quickOpen,
      anchorElement: anchorElement,
      anchorCorner: anchorCorner,
      element: element,
      menuSurface: menuSurface,
      instantiate: instantiate,
      getInstance: getInstance,
      oldFixed: oldFixed,
      updateOpen: updateOpen,
      setOpen: setOpen,
      setAnchorCorner: setAnchorCorner,
      setAnchorMargin: setAnchorMargin,
      setFixedPosition: setFixedPosition,
      setAbsolutePosition: setAbsolutePosition,
      setMenuSurfaceAnchorElement: setMenuSurfaceAnchorElement,
      setIsHoisted: setIsHoisted,
      getDefaultFoundation: getDefaultFoundation
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(2, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(3, className = $$new_props.className);
    if ("isStatic" in $$props) $$invalidate(4, isStatic = $$new_props.isStatic);
    if ("anchor" in $$props) $$invalidate(10, anchor = $$new_props.anchor);
    if ("fixed" in $$props) $$invalidate(0, fixed = $$new_props.fixed);
    if ("open" in $$props) $$invalidate(8, open = $$new_props.open);
    if ("quickOpen" in $$props) $$invalidate(11, quickOpen = $$new_props.quickOpen);
    if ("anchorElement" in $$props) $$invalidate(9, anchorElement = $$new_props.anchorElement);
    if ("anchorCorner" in $$props) $$invalidate(12, anchorCorner = $$new_props.anchorCorner);
    if ("element" in $$props) $$invalidate(1, element = $$new_props.element);
    if ("menuSurface" in $$props) $$invalidate(21, menuSurface = $$new_props.menuSurface);
    if ("instantiate" in $$props) instantiate = $$new_props.instantiate;
    if ("getInstance" in $$props) getInstance = $$new_props.getInstance;
    if ("oldFixed" in $$props) $$invalidate(22, oldFixed = $$new_props.oldFixed);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*element, anchor*/
    1026) {
      if (element && anchor && !element.parentNode.classList.contains("mdc-menu-surface--anchor")) {
        element.parentNode.classList.add("mdc-menu-surface--anchor");
        $$invalidate(9, anchorElement = element.parentNode);
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, quickOpen*/
    2099200) {
      if (menuSurface && menuSurface.quickOpen !== quickOpen) {
        $$invalidate(21, menuSurface.quickOpen = quickOpen, menuSurface);
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, anchorElement*/
    2097664) {
      if (menuSurface && menuSurface.anchorElement !== anchorElement) {
        $$invalidate(21, menuSurface.anchorElement = anchorElement, menuSurface);
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, open*/
    2097408) {
      if (menuSurface && menuSurface.isOpen() !== open) {
        if (open) {
          menuSurface.open();
        } else {
          menuSurface.close();
        }
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, oldFixed, fixed*/
    6291457) {
      if (menuSurface && oldFixed !== fixed) {
        menuSurface.setFixedPosition(fixed);
        $$invalidate(22, oldFixed = fixed);
      }
    }

    if ($$self.$$.dirty &
    /*menuSurface, anchorCorner*/
    2101248) {
      if (menuSurface && anchorCorner != null) {
        if (Corner.hasOwnProperty(anchorCorner)) {
          menuSurface.setAnchorCorner(Corner[anchorCorner]);
        } else if (CornerBit.hasOwnProperty(anchorCorner)) {
          menuSurface.setAnchorCorner(Corner[anchorCorner]);
        } else {
          menuSurface.setAnchorCorner(anchorCorner);
        }
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [fixed, element, use, className, isStatic, forwardEvents, updateOpen, $$props, open, anchorElement, anchor, quickOpen, anchorCorner, setOpen, setAnchorCorner, setAnchorMargin, setFixedPosition, setAbsolutePosition, setMenuSurfaceAnchorElement, setIsHoisted, getDefaultFoundation, menuSurface, oldFixed, $$scope, slots, div_binding];
}

var MenuSurface = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(MenuSurface, _SvelteComponentDev);

  var _super = _createSuper$h(MenuSurface);

  function MenuSurface(options) {
    var _this;

    _classCallCheck(this, MenuSurface);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$h, create_fragment$h, safe_not_equal, {
      use: 2,
      class: 3,
      static: 4,
      anchor: 10,
      fixed: 0,
      open: 8,
      quickOpen: 11,
      anchorElement: 9,
      anchorCorner: 12,
      element: 1,
      setOpen: 13,
      setAnchorCorner: 14,
      setAnchorMargin: 15,
      setFixedPosition: 16,
      setAbsolutePosition: 17,
      setMenuSurfaceAnchorElement: 18,
      setIsHoisted: 19,
      getDefaultFoundation: 20
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "MenuSurface",
      options: options,
      id: create_fragment$h.name
    });
    return _this;
  }

  _createClass(MenuSurface, [{
    key: "use",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "static",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchor",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "fixed",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "open",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "quickOpen",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchorElement",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchorCorner",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "element",
    get: function get() {
      throw new Error("<MenuSurface>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setOpen",
    get: function get() {
      return this.$$.ctx[13];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorCorner",
    get: function get() {
      return this.$$.ctx[14];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorMargin",
    get: function get() {
      return this.$$.ctx[15];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setFixedPosition",
    get: function get() {
      return this.$$.ctx[16];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAbsolutePosition",
    get: function get() {
      return this.$$.ctx[17];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setMenuSurfaceAnchorElement",
    get: function get() {
      return this.$$.ctx[18];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setIsHoisted",
    get: function get() {
      return this.$$.ctx[19];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getDefaultFoundation",
    get: function get() {
      return this.$$.ctx[20];
    },
    set: function set(value) {
      throw new Error("<MenuSurface>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return MenuSurface;
}(SvelteComponentDev);

function Anchor(node, _ref) {
  var _ref$classForward = _ref.classForward,
      classForward = _ref$classForward === void 0 ? function () {} : _ref$classForward;
  var classList = [];

  function addClass(className) {
    var idx = classList.indexOf(className);

    if (idx === -1) {
      node.classList.add(className);
      classList.push(className);

      if (classForward) {
        classForward(classList);
      }
    }
  }

  function removeClass(className) {
    var idx = classList.indexOf(className);

    if (idx !== -1) {
      node.classList.remove(className);
      classList.splice(idx, 1);

      if (classForward) {
        classForward(classList);
      }
    }
  }

  addClass('mdc-menu-surface--anchor');
  return {
    destroy: function destroy() {
      removeClass('mdc-menu-surface--anchor');
    }
  };
}

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function create_default_slot$5(ctx) {
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[25].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[27], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[0] &
        /*$$scope*/
        134217728) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[27], dirty, null, null);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$5.name,
    type: "slot",
    source: "(1:0) <MenuSurface   bind:element   use={[forwardEvents, ...use]}   class=\\\"mdc-menu {className}\\\"   on:MDCMenu:selected={updateOpen}   on:MDCMenuSurface:closed={updateOpen} on:MDCMenuSurface:opened={updateOpen}   {...exclude($$props, ['use', 'class', 'wrapFocus'])} >",
    ctx: ctx
  });
  return block;
}

function create_fragment$g(ctx) {
  var menusurface;
  var updating_element;
  var current;
  var menusurface_spread_levels = [{
    use: [
    /*forwardEvents*/
    ctx[3]].concat(_toConsumableArray(
    /*use*/
    ctx[0]))
  }, {
    class: "mdc-menu " +
    /*className*/
    ctx[1]
  }, exclude(
  /*$$props*/
  ctx[5], ["use", "class", "wrapFocus"])];

  function menusurface_element_binding(value) {
    /*menusurface_element_binding*/
    ctx[26](value);
  }

  var menusurface_props = {
    $$slots: {
      default: [create_default_slot$5]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < menusurface_spread_levels.length; i += 1) {
    menusurface_props = assign(menusurface_props, menusurface_spread_levels[i]);
  }

  if (
  /*element*/
  ctx[2] !== void 0) {
    menusurface_props.element =
    /*element*/
    ctx[2];
  }

  menusurface = new MenuSurface({
    props: menusurface_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind(menusurface, "element", menusurface_element_binding);
  });
  menusurface.$on("MDCMenu:selected",
  /*updateOpen*/
  ctx[4]);
  menusurface.$on("MDCMenuSurface:closed",
  /*updateOpen*/
  ctx[4]);
  menusurface.$on("MDCMenuSurface:opened",
  /*updateOpen*/
  ctx[4]);
  var block = {
    c: function create() {
      create_component(menusurface.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(menusurface.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(menusurface, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var menusurface_changes = dirty[0] &
      /*forwardEvents, use, className, $$props*/
      43 ? get_spread_update(menusurface_spread_levels, [dirty[0] &
      /*forwardEvents, use*/
      9 && {
        use: [
        /*forwardEvents*/
        ctx[3]].concat(_toConsumableArray(
        /*use*/
        ctx[0]))
      }, dirty[0] &
      /*className*/
      2 && {
        class: "mdc-menu " +
        /*className*/
        ctx[1]
      }, dirty[0] &
      /*$$props*/
      32 && get_spread_object(exclude(
      /*$$props*/
      ctx[5], ["use", "class", "wrapFocus"]))]) : {};

      if (dirty[0] &
      /*$$scope*/
      134217728) {
        menusurface_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (!updating_element && dirty[0] &
      /*element*/
      4) {
        updating_element = true;
        menusurface_changes.element =
        /*element*/
        ctx[2];
        add_flush_callback(function () {
          return updating_element = false;
        });
      }

      menusurface.$set(menusurface_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(menusurface.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(menusurface.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(menusurface, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$g.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$g($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Menu", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCMenu:selected", "MDCMenuSurface:closed", "MDCMenuSurface:opened"]);
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$static = _$$props4.static,
      isStatic = _$$props4$static === void 0 ? false : _$$props4$static;
  var _$$props5 = $$props,
      _$$props5$open = _$$props5.open,
      open = _$$props5$open === void 0 ? isStatic : _$$props5$open; // Purposely omitted from the exclude call above.

  var _$$props6 = $$props,
      _$$props6$quickOpen = _$$props6.quickOpen,
      quickOpen = _$$props6$quickOpen === void 0 ? false : _$$props6$quickOpen; // Purposely omitted from the exclude call above.

  var _$$props7 = $$props,
      _$$props7$anchorCorne = _$$props7.anchorCorner,
      anchorCorner = _$$props7$anchorCorne === void 0 ? null : _$$props7$anchorCorne; // Purposely omitted from the exclude call above.

  var _$$props8 = $$props,
      _$$props8$wrapFocus = _$$props8.wrapFocus,
      wrapFocus = _$$props8$wrapFocus === void 0 ? false : _$$props8$wrapFocus;
  var element;
  var menu;
  var instantiate = getContext("SMUI:menu:instantiate");
  var getInstance = getContext("SMUI:menu:getInstance");
  var menuSurfacePromiseResolve;
  var menuSurfacePromise = new Promise(function (resolve) {
    return menuSurfacePromiseResolve = resolve;
  });
  var listPromiseResolve;
  var listPromise = new Promise(function (resolve) {
    return listPromiseResolve = resolve;
  });
  setContext("SMUI:menu-surface:instantiate", false);
  setContext("SMUI:menu-surface:getInstance", getMenuSurfaceInstancePromise);
  setContext("SMUI:list:instantiate", false);
  setContext("SMUI:list:getInstance", getListInstancePromise);
  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(instantiate !== false)) {
              _context.next = 4;
              break;
            }

            $$invalidate(24, menu = new MDCMenu(element));
            _context.next = 9;
            break;

          case 4:
            _context.t0 = $$invalidate;
            _context.next = 7;
            return getInstance();

          case 7:
            _context.t1 = menu = _context.sent;
            (0, _context.t0)(24, _context.t1);

          case 9:
            menuSurfacePromiseResolve(menu.menuSurface_);
            listPromiseResolve(menu.list_);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  onDestroy(function () {
    if (instantiate !== false) {
      menu && menu.destroy();
    }
  });

  function getMenuSurfaceInstancePromise() {
    return menuSurfacePromise;
  }

  function getListInstancePromise() {
    return listPromise;
  }

  function updateOpen() {
    $$invalidate(6, open = menu.open);
  }

  function setOpen(value) {
    $$invalidate(6, open = value);
  }

  function getItems() {
    return menu.items;
  }

  function setDefaultFocusState() {
    var _menu;

    return (_menu = menu).setDefaultFocusState.apply(_menu, arguments);
  }

  function setAnchorCorner() {
    var _menu2;

    return (_menu2 = menu).setAnchorCorner.apply(_menu2, arguments);
  }

  function setAnchorMargin() {
    var _menu3;

    return (_menu3 = menu).setAnchorMargin.apply(_menu3, arguments);
  }

  function setSelectedIndex() {
    var _menu4;

    return (_menu4 = menu).setSelectedIndex.apply(_menu4, arguments);
  }

  function setEnabled() {
    var _menu5;

    return (_menu5 = menu).setEnabled.apply(_menu5, arguments);
  }

  function getOptionByIndex() {
    var _menu6;

    return (_menu6 = menu).getOptionByIndex.apply(_menu6, arguments);
  }

  function setFixedPosition() {
    var _menu7;

    return (_menu7 = menu).setFixedPosition.apply(_menu7, arguments);
  }

  function setIsHoisted() {
    var _menu8;

    return (_menu8 = menu).setIsHoisted.apply(_menu8, arguments);
  }

  function setAbsolutePosition() {
    var _menu9;

    return (_menu9 = menu).setAbsolutePosition.apply(_menu9, arguments);
  }

  function setAnchorElement() {
    var _menu10;

    return (_menu10 = menu).setAnchorElement.apply(_menu10, arguments);
  }

  function getDefaultFoundation() {
    var _menu11;

    return (_menu11 = menu).getDefaultFoundation.apply(_menu11, arguments);
  }

  function menusurface_element_binding(value) {
    element = value;
    $$invalidate(2, element);
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("static" in $$new_props) $$invalidate(7, isStatic = $$new_props.static);
    if ("open" in $$new_props) $$invalidate(6, open = $$new_props.open);
    if ("quickOpen" in $$new_props) $$invalidate(8, quickOpen = $$new_props.quickOpen);
    if ("anchorCorner" in $$new_props) $$invalidate(9, anchorCorner = $$new_props.anchorCorner);
    if ("wrapFocus" in $$new_props) $$invalidate(10, wrapFocus = $$new_props.wrapFocus);
    if ("$$scope" in $$new_props) $$invalidate(27, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCMenu: MDCMenu,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      MenuSurface: MenuSurface,
      Corner: Corner,
      CornerBit: CornerBit,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      isStatic: isStatic,
      open: open,
      quickOpen: quickOpen,
      anchorCorner: anchorCorner,
      wrapFocus: wrapFocus,
      element: element,
      menu: menu,
      instantiate: instantiate,
      getInstance: getInstance,
      menuSurfacePromiseResolve: menuSurfacePromiseResolve,
      menuSurfacePromise: menuSurfacePromise,
      listPromiseResolve: listPromiseResolve,
      listPromise: listPromise,
      getMenuSurfaceInstancePromise: getMenuSurfaceInstancePromise,
      getListInstancePromise: getListInstancePromise,
      updateOpen: updateOpen,
      setOpen: setOpen,
      getItems: getItems,
      setDefaultFocusState: setDefaultFocusState,
      setAnchorCorner: setAnchorCorner,
      setAnchorMargin: setAnchorMargin,
      setSelectedIndex: setSelectedIndex,
      setEnabled: setEnabled,
      getOptionByIndex: getOptionByIndex,
      setFixedPosition: setFixedPosition,
      setIsHoisted: setIsHoisted,
      setAbsolutePosition: setAbsolutePosition,
      setAnchorElement: setAnchorElement,
      getDefaultFoundation: getDefaultFoundation
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("isStatic" in $$props) $$invalidate(7, isStatic = $$new_props.isStatic);
    if ("open" in $$props) $$invalidate(6, open = $$new_props.open);
    if ("quickOpen" in $$props) $$invalidate(8, quickOpen = $$new_props.quickOpen);
    if ("anchorCorner" in $$props) $$invalidate(9, anchorCorner = $$new_props.anchorCorner);
    if ("wrapFocus" in $$props) $$invalidate(10, wrapFocus = $$new_props.wrapFocus);
    if ("element" in $$props) $$invalidate(2, element = $$new_props.element);
    if ("menu" in $$props) $$invalidate(24, menu = $$new_props.menu);
    if ("instantiate" in $$props) instantiate = $$new_props.instantiate;
    if ("getInstance" in $$props) getInstance = $$new_props.getInstance;
    if ("menuSurfacePromiseResolve" in $$props) menuSurfacePromiseResolve = $$new_props.menuSurfacePromiseResolve;
    if ("menuSurfacePromise" in $$props) menuSurfacePromise = $$new_props.menuSurfacePromise;
    if ("listPromiseResolve" in $$props) listPromiseResolve = $$new_props.listPromiseResolve;
    if ("listPromise" in $$props) listPromise = $$new_props.listPromise;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*menu, open, isStatic*/
    16777408) {
      if (menu && menu.open !== open) {
        if (isStatic) {
          $$invalidate(6, open = true);
        }

        $$invalidate(24, menu.open = open, menu);
      }
    }

    if ($$self.$$.dirty[0] &
    /*menu, wrapFocus*/
    16778240) {
      if (menu && menu.wrapFocus !== wrapFocus) {
        $$invalidate(24, menu.wrapFocus = wrapFocus, menu);
      }
    }

    if ($$self.$$.dirty[0] &
    /*menu, quickOpen*/
    16777472) {
      if (menu) {
        $$invalidate(24, menu.quickOpen = quickOpen, menu);
      }
    }

    if ($$self.$$.dirty[0] &
    /*menu, anchorCorner*/
    16777728) {
      if (menu && anchorCorner != null) {
        if (Corner.hasOwnProperty(anchorCorner)) {
          menu.setAnchorCorner(Corner[anchorCorner]);
        } else if (CornerBit.hasOwnProperty(anchorCorner)) {
          menu.setAnchorCorner(Corner[anchorCorner]);
        } else {
          menu.setAnchorCorner(anchorCorner);
        }
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, className, element, forwardEvents, updateOpen, $$props, open, isStatic, quickOpen, anchorCorner, wrapFocus, setOpen, getItems, setDefaultFocusState, setAnchorCorner, setAnchorMargin, setSelectedIndex, setEnabled, getOptionByIndex, setFixedPosition, setIsHoisted, setAbsolutePosition, setAnchorElement, getDefaultFoundation, menu, slots, menusurface_element_binding, $$scope];
}

var Menu = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Menu, _SvelteComponentDev);

  var _super = _createSuper$g(Menu);

  function Menu(options) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$g, create_fragment$g, safe_not_equal, {
      use: 0,
      class: 1,
      static: 7,
      open: 6,
      quickOpen: 8,
      anchorCorner: 9,
      wrapFocus: 10,
      setOpen: 11,
      getItems: 12,
      setDefaultFocusState: 13,
      setAnchorCorner: 14,
      setAnchorMargin: 15,
      setSelectedIndex: 16,
      setEnabled: 17,
      getOptionByIndex: 18,
      setFixedPosition: 19,
      setIsHoisted: 20,
      setAbsolutePosition: 21,
      setAnchorElement: 22,
      getDefaultFoundation: 23
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Menu",
      options: options,
      id: create_fragment$g.name
    });
    return _this;
  }

  _createClass(Menu, [{
    key: "use",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "static",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "open",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "quickOpen",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchorCorner",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "wrapFocus",
    get: function get() {
      throw new Error("<Menu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setOpen",
    get: function get() {
      return this.$$.ctx[11];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getItems",
    get: function get() {
      return this.$$.ctx[12];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setDefaultFocusState",
    get: function get() {
      return this.$$.ctx[13];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorCorner",
    get: function get() {
      return this.$$.ctx[14];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorMargin",
    get: function get() {
      return this.$$.ctx[15];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setSelectedIndex",
    get: function get() {
      return this.$$.ctx[16];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setEnabled",
    get: function get() {
      return this.$$.ctx[17];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getOptionByIndex",
    get: function get() {
      return this.$$.ctx[18];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setFixedPosition",
    get: function get() {
      return this.$$.ctx[19];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setIsHoisted",
    get: function get() {
      return this.$$.ctx[20];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAbsolutePosition",
    get: function get() {
      return this.$$.ctx[21];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setAnchorElement",
    get: function get() {
      return this.$$.ctx[22];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getDefaultFoundation",
    get: function get() {
      return this.$$.ctx[23];
    },
    set: function set(value) {
      throw new Error("<Menu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Menu;
}(SvelteComponentDev);

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$c = "node_modules/@smui/list/List.svelte"; // (18:0) {:else}

function create_else_block$3(ctx) {
  var ul;
  var ul_class_value;
  var useActions_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[24].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[23], null);
  var ul_levels = [{
    class: ul_class_value = "\n      mdc-list\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*nonInteractive*/
    ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
    /*dense*/
    ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
    /*avatarList*/
    ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
    /*twoLine*/
    ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
    /*threeLine*/
    ctx[6] && !
    /*twoLine*/
    ctx[5] ? "smui-list--three-line" : "") + "\n    "
  }, {
    role:
    /*role*/
    ctx[8]
  },
  /*props*/
  ctx[9]];
  var ul_data = {};

  for (var i = 0; i < ul_levels.length; i += 1) {
    ul_data = assign(ul_data, ul_levels[i]);
  }

  var block = {
    c: function create() {
      ul = element("ul");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true,
        role: true
      });
      var ul_nodes = children(ul);
      if (default_slot) default_slot.l(ul_nodes);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(ul, ul_data);
      add_location(ul, file$c, 18, 2, 478);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      if (default_slot) {
        default_slot.m(ul, null);
      }
      /*ul_binding*/


      ctx[26](ul);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, ul,
        /*use*/
        ctx[0])), action_destroyer(/*forwardEvents*/
        ctx[10].call(null, ul)), listen_dev(ul, "MDCList:action",
        /*handleAction*/
        ctx[12], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[0] &
        /*$$scope*/
        8388608) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[23], dirty, null, null);
        }
      }

      set_attributes(ul, ul_data = get_spread_update(ul_levels, [(!current || dirty[0] &
      /*className, nonInteractive, dense, avatarList, twoLine, threeLine*/
      126 && ul_class_value !== (ul_class_value = "\n      mdc-list\n      " +
      /*className*/
      ctx[1] + "\n      " + (
      /*nonInteractive*/
      ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
      /*dense*/
      ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
      /*avatarList*/
      ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
      /*twoLine*/
      ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
      /*threeLine*/
      ctx[6] && !
      /*twoLine*/
      ctx[5] ? "smui-list--three-line" : "") + "\n    ")) && {
        class: ul_class_value
      }, (!current || dirty[0] &
      /*role*/
      256) && {
        role:
        /*role*/
        ctx[8]
      }, dirty[0] &
      /*props*/
      512 &&
      /*props*/
      ctx[9]]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(ul);
      if (default_slot) default_slot.d(detaching);
      /*ul_binding*/

      ctx[26](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$3.name,
    type: "else",
    source: "(18:0) {:else}",
    ctx: ctx
  });
  return block;
} // (1:0) {#if nav}


function create_if_block$6(ctx) {
  var nav_1;
  var nav_1_class_value;
  var useActions_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[24].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[23], null);
  var nav_1_levels = [{
    class: nav_1_class_value = "\n      mdc-list\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*nonInteractive*/
    ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
    /*dense*/
    ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
    /*avatarList*/
    ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
    /*twoLine*/
    ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
    /*threeLine*/
    ctx[6] && !
    /*twoLine*/
    ctx[5] ? "smui-list--three-line" : "") + "\n    "
  },
  /*props*/
  ctx[9]];
  var nav_1_data = {};

  for (var i = 0; i < nav_1_levels.length; i += 1) {
    nav_1_data = assign(nav_1_data, nav_1_levels[i]);
  }

  var block = {
    c: function create() {
      nav_1 = element("nav");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      nav_1 = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_1_nodes = children(nav_1);
      if (default_slot) default_slot.l(nav_1_nodes);
      nav_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(nav_1, nav_1_data);
      add_location(nav_1, file$c, 1, 2, 12);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav_1, anchor);

      if (default_slot) {
        default_slot.m(nav_1, null);
      }
      /*nav_1_binding*/


      ctx[25](nav_1);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, nav_1,
        /*use*/
        ctx[0])), action_destroyer(/*forwardEvents*/
        ctx[10].call(null, nav_1)), listen_dev(nav_1, "MDCList:action",
        /*handleAction*/
        ctx[12], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[0] &
        /*$$scope*/
        8388608) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[23], dirty, null, null);
        }
      }

      set_attributes(nav_1, nav_1_data = get_spread_update(nav_1_levels, [(!current || dirty[0] &
      /*className, nonInteractive, dense, avatarList, twoLine, threeLine*/
      126 && nav_1_class_value !== (nav_1_class_value = "\n      mdc-list\n      " +
      /*className*/
      ctx[1] + "\n      " + (
      /*nonInteractive*/
      ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
      /*dense*/
      ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
      /*avatarList*/
      ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
      /*twoLine*/
      ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
      /*threeLine*/
      ctx[6] && !
      /*twoLine*/
      ctx[5] ? "smui-list--three-line" : "") + "\n    ")) && {
        class: nav_1_class_value
      }, dirty[0] &
      /*props*/
      512 &&
      /*props*/
      ctx[9]]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav_1);
      if (default_slot) default_slot.d(detaching);
      /*nav_1_binding*/

      ctx[25](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(1:0) {#if nav}",
    ctx: ctx
  });
  return block;
}

function create_fragment$f(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$6, create_else_block$3];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*nav*/
    ctx[11]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if_block.p(ctx, dirty);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$f.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$f($$self, $$props, $$invalidate) {
  var props;
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("List", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCList:action"]);
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$nonInteract = _$$props4.nonInteractive,
      nonInteractive = _$$props4$nonInteract === void 0 ? false : _$$props4$nonInteract;
  var _$$props5 = $$props,
      _$$props5$dense = _$$props5.dense,
      dense = _$$props5$dense === void 0 ? false : _$$props5$dense;
  var _$$props6 = $$props,
      _$$props6$avatarList = _$$props6.avatarList,
      avatarList = _$$props6$avatarList === void 0 ? false : _$$props6$avatarList;
  var _$$props7 = $$props,
      _$$props7$twoLine = _$$props7.twoLine,
      twoLine = _$$props7$twoLine === void 0 ? false : _$$props7$twoLine;
  var _$$props8 = $$props,
      _$$props8$threeLine = _$$props8.threeLine,
      threeLine = _$$props8$threeLine === void 0 ? false : _$$props8$threeLine;
  var _$$props9 = $$props,
      _$$props9$vertical = _$$props9.vertical,
      vertical = _$$props9$vertical === void 0 ? true : _$$props9$vertical;
  var _$$props10 = $$props,
      _$$props10$wrapFocus = _$$props10.wrapFocus,
      wrapFocus = _$$props10$wrapFocus === void 0 ? false : _$$props10$wrapFocus;
  var _$$props11 = $$props,
      _$$props11$singleSele = _$$props11.singleSelection,
      singleSelection = _$$props11$singleSele === void 0 ? false : _$$props11$singleSele;
  var _$$props12 = $$props,
      _$$props12$selectedIn = _$$props12.selectedIndex,
      selectedIndex = _$$props12$selectedIn === void 0 ? null : _$$props12$selectedIn;
  var _$$props13 = $$props,
      _$$props13$radiolist = _$$props13.radiolist,
      radiolist = _$$props13$radiolist === void 0 ? false : _$$props13$radiolist;
  var _$$props14 = $$props,
      _$$props14$checklist = _$$props14.checklist,
      checklist = _$$props14$checklist === void 0 ? false : _$$props14$checklist;
  var element;
  var list;
  var role = getContext("SMUI:list:role");
  var nav = getContext("SMUI:list:nav");
  var instantiate = getContext("SMUI:list:instantiate");
  var getInstance = getContext("SMUI:list:getInstance");
  var addLayoutListener = getContext("SMUI:addLayoutListener");
  var removeLayoutListener;
  setContext("SMUI:list:nonInteractive", nonInteractive);

  if (!role) {
    if (singleSelection) {
      role = "listbox";
      setContext("SMUI:list:item:role", "option");
    } else if (radiolist) {
      role = "radiogroup";
      setContext("SMUI:list:item:role", "radio");
    } else if (checklist) {
      role = "group";
      setContext("SMUI:list:item:role", "checkbox");
    } else {
      role = "list";
      setContext("SMUI:list:item:role", undefined);
    }
  }

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(instantiate !== false)) {
              _context.next = 4;
              break;
            }

            $$invalidate(22, list = new MDCList(element));
            _context.next = 9;
            break;

          case 4:
            _context.t0 = $$invalidate;
            _context.next = 7;
            return getInstance();

          case 7:
            _context.t1 = list = _context.sent;
            (0, _context.t0)(22, _context.t1);

          case 9:
            if (singleSelection) {
              list.initializeListType();
              $$invalidate(13, selectedIndex = list.selectedIndex);
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  onDestroy(function () {
    if (instantiate !== false) {
      list && list.destroy();
    }

    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });

  function handleAction(e) {
    if (list && list.listElements[e.detail.index].classList.contains("mdc-list-item--disabled")) {
      e.preventDefault();
      $$invalidate(22, list.selectedIndex = selectedIndex, list);
    } else if (list && list.selectedIndex === e.detail.index) {
      $$invalidate(13, selectedIndex = e.detail.index);
    }
  }

  function layout() {
    var _list;

    return (_list = list).layout.apply(_list, arguments);
  }

  function setEnabled() {
    var _list2;

    return (_list2 = list).setEnabled.apply(_list2, arguments);
  }

  function getDefaultFoundation() {
    var _list3;

    return (_list3 = list).getDefaultFoundation.apply(_list3, arguments);
  }

  function nav_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(7, element);
    });
  }

  function ul_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(7, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(31, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("nonInteractive" in $$new_props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    if ("dense" in $$new_props) $$invalidate(3, dense = $$new_props.dense);
    if ("avatarList" in $$new_props) $$invalidate(4, avatarList = $$new_props.avatarList);
    if ("twoLine" in $$new_props) $$invalidate(5, twoLine = $$new_props.twoLine);
    if ("threeLine" in $$new_props) $$invalidate(6, threeLine = $$new_props.threeLine);
    if ("vertical" in $$new_props) $$invalidate(14, vertical = $$new_props.vertical);
    if ("wrapFocus" in $$new_props) $$invalidate(15, wrapFocus = $$new_props.wrapFocus);
    if ("singleSelection" in $$new_props) $$invalidate(16, singleSelection = $$new_props.singleSelection);
    if ("selectedIndex" in $$new_props) $$invalidate(13, selectedIndex = $$new_props.selectedIndex);
    if ("radiolist" in $$new_props) $$invalidate(17, radiolist = $$new_props.radiolist);
    if ("checklist" in $$new_props) $$invalidate(18, checklist = $$new_props.checklist);
    if ("$$scope" in $$new_props) $$invalidate(23, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCList: MDCList,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      nonInteractive: nonInteractive,
      dense: dense,
      avatarList: avatarList,
      twoLine: twoLine,
      threeLine: threeLine,
      vertical: vertical,
      wrapFocus: wrapFocus,
      singleSelection: singleSelection,
      selectedIndex: selectedIndex,
      radiolist: radiolist,
      checklist: checklist,
      element: element,
      list: list,
      role: role,
      nav: nav,
      instantiate: instantiate,
      getInstance: getInstance,
      addLayoutListener: addLayoutListener,
      removeLayoutListener: removeLayoutListener,
      handleAction: handleAction,
      layout: layout,
      setEnabled: setEnabled,
      getDefaultFoundation: getDefaultFoundation,
      props: props
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(31, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("nonInteractive" in $$props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    if ("dense" in $$props) $$invalidate(3, dense = $$new_props.dense);
    if ("avatarList" in $$props) $$invalidate(4, avatarList = $$new_props.avatarList);
    if ("twoLine" in $$props) $$invalidate(5, twoLine = $$new_props.twoLine);
    if ("threeLine" in $$props) $$invalidate(6, threeLine = $$new_props.threeLine);
    if ("vertical" in $$props) $$invalidate(14, vertical = $$new_props.vertical);
    if ("wrapFocus" in $$props) $$invalidate(15, wrapFocus = $$new_props.wrapFocus);
    if ("singleSelection" in $$props) $$invalidate(16, singleSelection = $$new_props.singleSelection);
    if ("selectedIndex" in $$props) $$invalidate(13, selectedIndex = $$new_props.selectedIndex);
    if ("radiolist" in $$props) $$invalidate(17, radiolist = $$new_props.radiolist);
    if ("checklist" in $$props) $$invalidate(18, checklist = $$new_props.checklist);
    if ("element" in $$props) $$invalidate(7, element = $$new_props.element);
    if ("list" in $$props) $$invalidate(22, list = $$new_props.list);
    if ("role" in $$props) $$invalidate(8, role = $$new_props.role);
    if ("nav" in $$props) $$invalidate(11, nav = $$new_props.nav);
    if ("instantiate" in $$props) instantiate = $$new_props.instantiate;
    if ("getInstance" in $$props) getInstance = $$new_props.getInstance;
    if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
    if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    if ("props" in $$props) $$invalidate(9, props = $$new_props.props);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    $$invalidate(9, props = exclude($$props, ["use", "class", "nonInteractive", "dense", "avatarList", "twoLine", "threeLine", "vertical", "wrapFocus", "singleSelection", "selectedIndex", "radiolist", "checklist"]));

    if ($$self.$$.dirty[0] &
    /*list, vertical*/
    4210688) {
      if (list && list.vertical !== vertical) {
        $$invalidate(22, list.vertical = vertical, list);
      }
    }

    if ($$self.$$.dirty[0] &
    /*list, wrapFocus*/
    4227072) {
      if (list && list.wrapFocus !== wrapFocus) {
        $$invalidate(22, list.wrapFocus = wrapFocus, list);
      }
    }

    if ($$self.$$.dirty[0] &
    /*list, singleSelection*/
    4259840) {
      if (list && list.singleSelection !== singleSelection) {
        $$invalidate(22, list.singleSelection = singleSelection, list);
      }
    }

    if ($$self.$$.dirty[0] &
    /*list, singleSelection, selectedIndex*/
    4268032) {
      if (list && singleSelection && list.selectedIndex !== selectedIndex) {
        $$invalidate(22, list.selectedIndex = selectedIndex, list);
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, className, nonInteractive, dense, avatarList, twoLine, threeLine, element, role, props, forwardEvents, nav, handleAction, selectedIndex, vertical, wrapFocus, singleSelection, radiolist, checklist, layout, setEnabled, getDefaultFoundation, list, $$scope, slots, nav_1_binding, ul_binding];
}

var List = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(List, _SvelteComponentDev);

  var _super = _createSuper$f(List);

  function List(options) {
    var _this;

    _classCallCheck(this, List);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$f, create_fragment$f, safe_not_equal, {
      use: 0,
      class: 1,
      nonInteractive: 2,
      dense: 3,
      avatarList: 4,
      twoLine: 5,
      threeLine: 6,
      vertical: 14,
      wrapFocus: 15,
      singleSelection: 16,
      selectedIndex: 13,
      radiolist: 17,
      checklist: 18,
      layout: 19,
      setEnabled: 20,
      getDefaultFoundation: 21
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "List",
      options: options,
      id: create_fragment$f.name
    });
    return _this;
  }

  _createClass(List, [{
    key: "use",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nonInteractive",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "dense",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "avatarList",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "twoLine",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "threeLine",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "vertical",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "wrapFocus",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "singleSelection",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedIndex",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "radiolist",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "checklist",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "layout",
    get: function get() {
      return this.$$.ctx[19];
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setEnabled",
    get: function get() {
      return this.$$.ctx[20];
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getDefaultFoundation",
    get: function get() {
      return this.$$.ctx[21];
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return List;
}(SvelteComponentDev);

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$b = "node_modules/@smui/floating-label/FloatingLabel.svelte"; // (13:0) {:else}

function create_else_block$2(ctx) {
  var label;
  var label_class_value;
  var useActions_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[13].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[12], null);
  var label_levels = [{
    class: label_class_value = "\n      mdc-floating-label\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*floatAbove*/
    ctx[3] ? "mdc-floating-label--float-above" : "") + "\n    "
  },
  /*forId*/
  ctx[2] ||
  /*inputProps*/
  ctx[7] &&
  /*inputProps*/
  ctx[7].id ? {
    "for":
    /*forId*/
    ctx[2] ||
    /*inputProps*/
    ctx[7] &&
    /*inputProps*/
    ctx[7].id
  } : {}, exclude(
  /*$$props*/
  ctx[8], ["use", "class", "for", "floatAbove", "wrapped"])];
  var label_data = {};

  for (var i = 0; i < label_levels.length; i += 1) {
    label_data = assign(label_data, label_levels[i]);
  }

  var block = {
    c: function create() {
      label = element("label");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      label = claim_element(nodes, "LABEL", {
        class: true
      });
      var label_nodes = children(label);
      if (default_slot) default_slot.l(label_nodes);
      label_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(label, label_data);
      add_location(label, file$b, 13, 2, 317);
    },
    m: function mount(target, anchor) {
      insert_dev(target, label, anchor);

      if (default_slot) {
        default_slot.m(label, null);
      }
      /*label_binding*/


      ctx[15](label);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, label,
        /*use*/
        ctx[0])), action_destroyer(/*forwardEvents*/
        ctx[6].call(null, label))];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4096) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[12], dirty, null, null);
        }
      }

      set_attributes(label, label_data = get_spread_update(label_levels, [(!current || dirty &
      /*className, floatAbove*/
      10 && label_class_value !== (label_class_value = "\n      mdc-floating-label\n      " +
      /*className*/
      ctx[1] + "\n      " + (
      /*floatAbove*/
      ctx[3] ? "mdc-floating-label--float-above" : "") + "\n    ")) && {
        class: label_class_value
      }, dirty &
      /*forId*/
      4 && (
      /*forId*/
      ctx[2] ||
      /*inputProps*/
      ctx[7] &&
      /*inputProps*/
      ctx[7].id ? {
        "for":
        /*forId*/
        ctx[2] ||
        /*inputProps*/
        ctx[7] &&
        /*inputProps*/
        ctx[7].id
      } : {}), dirty &
      /*$$props*/
      256 && exclude(
      /*$$props*/
      ctx[8], ["use", "class", "for", "floatAbove", "wrapped"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(label);
      if (default_slot) default_slot.d(detaching);
      /*label_binding*/

      ctx[15](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$2.name,
    type: "else",
    source: "(13:0) {:else}",
    ctx: ctx
  });
  return block;
} // (1:0) {#if wrapped}


function create_if_block$5(ctx) {
  var span;
  var span_class_value;
  var useActions_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[13].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[12], null);
  var span_levels = [{
    class: span_class_value = "\n      mdc-floating-label\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*floatAbove*/
    ctx[3] ? "mdc-floating-label--float-above" : "") + "\n    "
  }, exclude(
  /*$$props*/
  ctx[8], ["use", "class", "floatAbove", "wrapped"])];
  var span_data = {};

  for (var i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }

  var block = {
    c: function create() {
      span = element("span");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(span, span_data);
      add_location(span, file$b, 1, 2, 16);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);

      if (default_slot) {
        default_slot.m(span, null);
      }
      /*span_binding*/


      ctx[14](span);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, span,
        /*use*/
        ctx[0])), action_destroyer(/*forwardEvents*/
        ctx[6].call(null, span))];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4096) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[12], dirty, null, null);
        }
      }

      set_attributes(span, span_data = get_spread_update(span_levels, [(!current || dirty &
      /*className, floatAbove*/
      10 && span_class_value !== (span_class_value = "\n      mdc-floating-label\n      " +
      /*className*/
      ctx[1] + "\n      " + (
      /*floatAbove*/
      ctx[3] ? "mdc-floating-label--float-above" : "") + "\n    ")) && {
        class: span_class_value
      }, dirty &
      /*$$props*/
      256 && exclude(
      /*$$props*/
      ctx[8], ["use", "class", "floatAbove", "wrapped"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      if (default_slot) default_slot.d(detaching);
      /*span_binding*/

      ctx[14](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(1:0) {#if wrapped}",
    ctx: ctx
  });
  return block;
}

function create_fragment$e(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$5, create_else_block$2];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*wrapped*/
    ctx[4]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$e.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$e($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("FloatingLabel", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$for = _$$props4.for,
      forId = _$$props4$for === void 0 ? "" : _$$props4$for;
  var _$$props5 = $$props,
      _$$props5$floatAbove = _$$props5.floatAbove,
      floatAbove = _$$props5$floatAbove === void 0 ? false : _$$props5$floatAbove;
  var _$$props6 = $$props,
      _$$props6$wrapped = _$$props6.wrapped,
      wrapped = _$$props6$wrapped === void 0 ? false : _$$props6$wrapped;
  var element;
  var floatingLabel;
  var inputProps = getContext("SMUI:generic:input:props") || {};
  onMount(function () {
    floatingLabel = new MDCFloatingLabel(element);
  });
  onDestroy(function () {
    floatingLabel && floatingLabel.destroy();
  });

  function shake(shouldShake) {
    var _floatingLabel;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_floatingLabel = floatingLabel).shake.apply(_floatingLabel, [shouldShake].concat(args));
  }

  function float(shouldFloat) {
    var _floatingLabel2;

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return (_floatingLabel2 = floatingLabel).float.apply(_floatingLabel2, [shouldFloat].concat(args));
  }

  function getWidth() {
    var _floatingLabel3;

    return (_floatingLabel3 = floatingLabel).getWidth.apply(_floatingLabel3, arguments);
  }

  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(5, element);
    });
  }

  function label_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(5, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(8, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("for" in $$new_props) $$invalidate(2, forId = $$new_props.for);
    if ("floatAbove" in $$new_props) $$invalidate(3, floatAbove = $$new_props.floatAbove);
    if ("wrapped" in $$new_props) $$invalidate(4, wrapped = $$new_props.wrapped);
    if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCFloatingLabel: MDCFloatingLabel,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      forId: forId,
      floatAbove: floatAbove,
      wrapped: wrapped,
      element: element,
      floatingLabel: floatingLabel,
      inputProps: inputProps,
      shake: shake,
      float: float,
      getWidth: getWidth
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(8, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("forId" in $$props) $$invalidate(2, forId = $$new_props.forId);
    if ("floatAbove" in $$props) $$invalidate(3, floatAbove = $$new_props.floatAbove);
    if ("wrapped" in $$props) $$invalidate(4, wrapped = $$new_props.wrapped);
    if ("element" in $$props) $$invalidate(5, element = $$new_props.element);
    if ("floatingLabel" in $$props) floatingLabel = $$new_props.floatingLabel;
    if ("inputProps" in $$props) $$invalidate(7, inputProps = $$new_props.inputProps);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, forId, floatAbove, wrapped, element, forwardEvents, inputProps, $$props, shake, float, getWidth, $$scope, slots, span_binding, label_binding];
}

var FloatingLabel = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(FloatingLabel, _SvelteComponentDev);

  var _super = _createSuper$e(FloatingLabel);

  function FloatingLabel(options) {
    var _this;

    _classCallCheck(this, FloatingLabel);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$e, create_fragment$e, safe_not_equal, {
      use: 0,
      class: 1,
      for: 2,
      floatAbove: 3,
      wrapped: 4,
      shake: 9,
      float: 10,
      getWidth: 11
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "FloatingLabel",
      options: options,
      id: create_fragment$e.name
    });
    return _this;
  }

  _createClass(FloatingLabel, [{
    key: "use",
    get: function get() {
      throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "for",
    get: function get() {
      throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "floatAbove",
    get: function get() {
      throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "wrapped",
    get: function get() {
      throw new Error("<FloatingLabel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "shake",
    get: function get() {
      return this.$$.ctx[9];
    },
    set: function set(value) {
      throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "float",
    get: function get() {
      return this.$$.ctx[10];
    },
    set: function set(value) {
      throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getWidth",
    get: function get() {
      return this.$$.ctx[11];
    },
    set: function set(value) {
      throw new Error("<FloatingLabel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return FloatingLabel;
}(SvelteComponentDev);

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$a = "node_modules/@smui/line-ripple/LineRipple.svelte";

function create_fragment$d(ctx) {
  var div;
  var div_class_value;
  var useActions_action;
  var mounted;
  var dispose;
  var div_levels = [{
    class: div_class_value = "\n    mdc-line-ripple\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*active*/
    ctx[2] ? "mdc-line-ripple--active" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[5], ["use", "class", "active"])];
  var div_data = {};

  for (var i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      children(div).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file$a, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      /*div_binding*/

      ctx[9](div);

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, div,
        /*use*/
        ctx[0])), action_destroyer(/*forwardEvents*/
        ctx[4].call(null, div))];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      set_attributes(div, div_data = get_spread_update(div_levels, [dirty &
      /*className, active*/
      6 && div_class_value !== (div_class_value = "\n    mdc-line-ripple\n    " +
      /*className*/
      ctx[1] + "\n    " + (
      /*active*/
      ctx[2] ? "mdc-line-ripple--active" : "") + "\n  ") && {
        class: div_class_value
      }, dirty &
      /*$$props*/
      32 && exclude(
      /*$$props*/
      ctx[5], ["use", "class", "active"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      /*div_binding*/

      ctx[9](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$d.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$d($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      _$$props.$$scope;
  validate_slots("LineRipple", slots, []);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$active = _$$props4.active,
      active = _$$props4$active === void 0 ? false : _$$props4$active;
  var element;
  var lineRipple;
  onMount(function () {
    lineRipple = new MDCLineRipple(element);
  });
  onDestroy(function () {
    lineRipple && lineRipple.destroy();
  });

  function activate() {
    var _lineRipple;

    return (_lineRipple = lineRipple).activate.apply(_lineRipple, arguments);
  }

  function deactivate() {
    var _lineRipple2;

    return (_lineRipple2 = lineRipple).deactivate.apply(_lineRipple2, arguments);
  }

  function setRippleCenter(xCoordinate) {
    var _lineRipple3;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_lineRipple3 = lineRipple).setRippleCenter.apply(_lineRipple3, [xCoordinate].concat(args));
  }

  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(3, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("active" in $$new_props) $$invalidate(2, active = $$new_props.active);
  };

  $$self.$capture_state = function () {
    return {
      MDCLineRipple: MDCLineRipple,
      onMount: onMount,
      onDestroy: onDestroy,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      active: active,
      element: element,
      lineRipple: lineRipple,
      activate: activate,
      deactivate: deactivate,
      setRippleCenter: setRippleCenter
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("active" in $$props) $$invalidate(2, active = $$new_props.active);
    if ("element" in $$props) $$invalidate(3, element = $$new_props.element);
    if ("lineRipple" in $$props) lineRipple = $$new_props.lineRipple;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, active, element, forwardEvents, $$props, activate, deactivate, setRippleCenter, div_binding];
}

var LineRipple = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(LineRipple, _SvelteComponentDev);

  var _super = _createSuper$d(LineRipple);

  function LineRipple(options) {
    var _this;

    _classCallCheck(this, LineRipple);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, {
      use: 0,
      class: 1,
      active: 2,
      activate: 6,
      deactivate: 7,
      setRippleCenter: 8
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "LineRipple",
      options: options,
      id: create_fragment$d.name
    });
    return _this;
  }

  _createClass(LineRipple, [{
    key: "use",
    get: function get() {
      throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "active",
    get: function get() {
      throw new Error("<LineRipple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "activate",
    get: function get() {
      return this.$$.ctx[6];
    },
    set: function set(value) {
      throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "deactivate",
    get: function get() {
      return this.$$.ctx[7];
    },
    set: function set(value) {
      throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setRippleCenter",
    get: function get() {
      return this.$$.ctx[8];
    },
    set: function set(value) {
      throw new Error("<LineRipple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return LineRipple;
}(SvelteComponentDev);

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$9 = "node_modules/@smui/notched-outline/NotchedOutline.svelte"; // (14:2) {#if !noLabel}

function create_if_block$4(ctx) {
  var div;
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[10].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[9], null);
  var block = {
    c: function create() {
      div = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "mdc-notched-outline__notch");
      add_location(div, file$9, 14, 4, 367);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      if (default_slot) {
        default_slot.m(div, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        512) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[9], dirty, null, null);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(14:2) {#if !noLabel}",
    ctx: ctx
  });
  return block;
}

function create_fragment$c(ctx) {
  var div2;
  var div0;
  var t0;
  var t1;
  var div1;
  var div2_class_value;
  var useActions_action;
  var current;
  var mounted;
  var dispose;
  var if_block = !
  /*noLabel*/
  ctx[3] && create_if_block$4(ctx);
  var div2_levels = [{
    class: div2_class_value = "\n    mdc-notched-outline\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*notched*/
    ctx[2] ? "mdc-notched-outline--notched" : "") + "\n    " + (
    /*noLabel*/
    ctx[3] ? "mdc-notched-outline--no-label" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[6], ["use", "class", "notched", "noLabel"])];
  var div2_data = {};

  for (var i = 0; i < div2_levels.length; i += 1) {
    div2_data = assign(div2_data, div2_levels[i]);
  }

  var block = {
    c: function create() {
      div2 = element("div");
      div0 = element("div");
      t0 = space();
      if (if_block) if_block.c();
      t1 = space();
      div1 = element("div");
      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      children(div0).forEach(detach_dev);
      t0 = claim_space(div2_nodes);
      if (if_block) if_block.l(div2_nodes);
      t1 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      children(div1).forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "mdc-notched-outline__leading");
      add_location(div0, file$9, 12, 2, 297);
      attr_dev(div1, "class", "mdc-notched-outline__trailing");
      add_location(div1, file$9, 16, 2, 437);
      set_attributes(div2, div2_data);
      add_location(div2, file$9, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, div0);
      append_dev(div2, t0);
      if (if_block) if_block.m(div2, null);
      append_dev(div2, t1);
      append_dev(div2, div1);
      /*div2_binding*/

      ctx[11](div2);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, div2,
        /*use*/
        ctx[0])), action_destroyer(/*forwardEvents*/
        ctx[5].call(null, div2))];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (!
      /*noLabel*/
      ctx[3]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*noLabel*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div2, t1);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      set_attributes(div2, div2_data = get_spread_update(div2_levels, [(!current || dirty &
      /*className, notched, noLabel*/
      14 && div2_class_value !== (div2_class_value = "\n    mdc-notched-outline\n    " +
      /*className*/
      ctx[1] + "\n    " + (
      /*notched*/
      ctx[2] ? "mdc-notched-outline--notched" : "") + "\n    " + (
      /*noLabel*/
      ctx[3] ? "mdc-notched-outline--no-label" : "") + "\n  ")) && {
        class: div2_class_value
      }, dirty &
      /*$$props*/
      64 && exclude(
      /*$$props*/
      ctx[6], ["use", "class", "notched", "noLabel"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
      if (if_block) if_block.d();
      /*div2_binding*/

      ctx[11](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$c.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$c($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("NotchedOutline", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$notched = _$$props4.notched,
      notched = _$$props4$notched === void 0 ? false : _$$props4$notched;
  var _$$props5 = $$props,
      _$$props5$noLabel = _$$props5.noLabel,
      noLabel = _$$props5$noLabel === void 0 ? false : _$$props5$noLabel;
  var element;
  var notchedOutline;
  onMount(function () {
    notchedOutline = new MDCNotchedOutline(element);
  });
  onDestroy(function () {
    notchedOutline && notchedOutline.destroy();
  });

  function notch(notchWidth) {
    var _notchedOutline;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_notchedOutline = notchedOutline).notch.apply(_notchedOutline, [notchWidth].concat(args));
  }

  function closeNotch() {
    var _notchedOutline2;

    return (_notchedOutline2 = notchedOutline).closeNotch.apply(_notchedOutline2, arguments);
  }

  function div2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(4, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("notched" in $$new_props) $$invalidate(2, notched = $$new_props.notched);
    if ("noLabel" in $$new_props) $$invalidate(3, noLabel = $$new_props.noLabel);
    if ("$$scope" in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCNotchedOutline: MDCNotchedOutline,
      onMount: onMount,
      onDestroy: onDestroy,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      notched: notched,
      noLabel: noLabel,
      element: element,
      notchedOutline: notchedOutline,
      notch: notch,
      closeNotch: closeNotch
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(6, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("notched" in $$props) $$invalidate(2, notched = $$new_props.notched);
    if ("noLabel" in $$props) $$invalidate(3, noLabel = $$new_props.noLabel);
    if ("element" in $$props) $$invalidate(4, element = $$new_props.element);
    if ("notchedOutline" in $$props) notchedOutline = $$new_props.notchedOutline;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, notched, noLabel, element, forwardEvents, $$props, notch, closeNotch, $$scope, slots, div2_binding];
}

var NotchedOutline = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(NotchedOutline, _SvelteComponentDev);

  var _super = _createSuper$c(NotchedOutline);

  function NotchedOutline(options) {
    var _this;

    _classCallCheck(this, NotchedOutline);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {
      use: 0,
      class: 1,
      notched: 2,
      noLabel: 3,
      notch: 7,
      closeNotch: 8
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "NotchedOutline",
      options: options,
      id: create_fragment$c.name
    });
    return _this;
  }

  _createClass(NotchedOutline, [{
    key: "use",
    get: function get() {
      throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "notched",
    get: function get() {
      throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "noLabel",
    get: function get() {
      throw new Error("<NotchedOutline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "notch",
    get: function get() {
      return this.$$.ctx[7];
    },
    set: function set(value) {
      throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "closeNotch",
    get: function get() {
      return this.$$.ctx[8];
    },
    set: function set(value) {
      throw new Error("<NotchedOutline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return NotchedOutline;
}(SvelteComponentDev);

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$8 = "node_modules/@smui/select/Select.svelte";

var get_label_slot_changes_1 = function get_label_slot_changes_1(dirty) {
  return {};
};

var get_label_slot_context_1 = function get_label_slot_context_1(ctx) {
  return {};
};

var get_icon_slot_changes = function get_icon_slot_changes(dirty) {
  return {};
};

var get_icon_slot_context = function get_icon_slot_context(ctx) {
  return {};
};

var get_label_slot_changes = function get_label_slot_changes(dirty) {
  return {};
};

var get_label_slot_context = function get_label_slot_context(ctx) {
  return {};
}; // (27:4) {#if variant === 'outlined'}


function create_if_block_3(ctx) {
  var notchedoutline;
  var current;
  var notchedoutline_spread_levels = [{
    noLabel:
    /*noLabel*/
    ctx[8] ||
    /*label*/
    ctx[9] == null
  }, prefixFilter(
  /*$$props*/
  ctx[27], "outline$")];
  var notchedoutline_props = {
    $$slots: {
      default: [create_default_slot_3]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < notchedoutline_spread_levels.length; i += 1) {
    notchedoutline_props = assign(notchedoutline_props, notchedoutline_spread_levels[i]);
  }

  notchedoutline = new NotchedOutline({
    props: notchedoutline_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(notchedoutline.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(notchedoutline.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(notchedoutline, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var notchedoutline_changes = dirty[0] &
      /*noLabel, label, $$props*/
      134218496 ? get_spread_update(notchedoutline_spread_levels, [dirty[0] &
      /*noLabel, label*/
      768 && {
        noLabel:
        /*noLabel*/
        ctx[8] ||
        /*label*/
        ctx[9] == null
      }, dirty[0] &
      /*$$props*/
      134217728 && get_spread_object(prefixFilter(
      /*$$props*/
      ctx[27], "outline$"))]) : {};

      if (dirty[0] &
      /*inputId, value, label$class, $$props, label, noLabel*/
      134286081 | dirty[1] &
      /*$$scope*/
      256) {
        notchedoutline_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      notchedoutline.$set(notchedoutline_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(notchedoutline.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(notchedoutline.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(notchedoutline, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(27:4) {#if variant === 'outlined'}",
    ctx: ctx
  });
  return block;
} // (29:8) {#if !noLabel && label != null}


function create_if_block_4(ctx) {
  var floatinglabel;
  var current;
  var floatinglabel_spread_levels = [{
    id:
    /*inputId*/
    ctx[11] + "-smui-label"
  }, {
    floatAbove:
    /*value*/
    ctx[0] !== ""
  }, {
    class:
    /*label$class*/
    ctx[16]
  }, exclude(prefixFilter(
  /*$$props*/
  ctx[27], "label$"), ["class"])];
  var floatinglabel_props = {
    $$slots: {
      default: [create_default_slot_4]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < floatinglabel_spread_levels.length; i += 1) {
    floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
  }

  floatinglabel = new FloatingLabel({
    props: floatinglabel_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(floatinglabel.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(floatinglabel.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(floatinglabel, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var floatinglabel_changes = dirty[0] &
      /*inputId, value, label$class, $$props*/
      134285313 ? get_spread_update(floatinglabel_spread_levels, [dirty[0] &
      /*inputId*/
      2048 && {
        id:
        /*inputId*/
        ctx[11] + "-smui-label"
      }, dirty[0] &
      /*value*/
      1 && {
        floatAbove:
        /*value*/
        ctx[0] !== ""
      }, dirty[0] &
      /*label$class*/
      65536 && {
        class:
        /*label$class*/
        ctx[16]
      }, dirty[0] &
      /*$$props*/
      134217728 && get_spread_object(exclude(prefixFilter(
      /*$$props*/
      ctx[27], "label$"), ["class"]))]) : {};

      if (dirty[0] &
      /*label*/
      512 | dirty[1] &
      /*$$scope*/
      256) {
        floatinglabel_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      floatinglabel.$set(floatinglabel_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(floatinglabel.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(floatinglabel.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(floatinglabel, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(29:8) {#if !noLabel && label != null}",
    ctx: ctx
  });
  return block;
} // (30:10) <FloatingLabel             id={inputId+'-smui-label'}             floatAbove={value !== ''}             class="{label$class}"             {...exclude(prefixFilter($$props, 'label$'), ['class'])}           >


function create_default_slot_4(ctx) {
  var t;
  var current;
  var label_slot_template =
  /*#slots*/
  ctx[34].label;
  var label_slot = create_slot(label_slot_template, ctx,
  /*$$scope*/
  ctx[39], get_label_slot_context);
  var block = {
    c: function create() {
      t = text(
      /*label*/
      ctx[9]);
      if (label_slot) label_slot.c();
    },
    l: function claim(nodes) {
      t = claim_text(nodes,
      /*label*/
      ctx[9]);
      if (label_slot) label_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);

      if (label_slot) {
        label_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (!current || dirty[0] &
      /*label*/
      512) set_data_dev(t,
      /*label*/
      ctx[9]);

      if (label_slot) {
        if (label_slot.p && dirty[1] &
        /*$$scope*/
        256) {
          update_slot(label_slot, label_slot_template, ctx,
          /*$$scope*/
          ctx[39], dirty, get_label_slot_changes, get_label_slot_context);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(label_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(label_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
      if (label_slot) label_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_4.name,
    type: "slot",
    source: "(30:10) <FloatingLabel             id={inputId+'-smui-label'}             floatAbove={value !== ''}             class=\\\"{label$class}\\\"             {...exclude(prefixFilter($$props, 'label$'), ['class'])}           >",
    ctx: ctx
  });
  return block;
} // (28:6) <NotchedOutline noLabel={noLabel || label == null} {...prefixFilter($$props, 'outline$')}>


function create_default_slot_3(ctx) {
  var if_block_anchor;
  var current;
  var if_block = !
  /*noLabel*/
  ctx[8] &&
  /*label*/
  ctx[9] != null && create_if_block_4(ctx);
  var block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (!
      /*noLabel*/
      ctx[8] &&
      /*label*/
      ctx[9] != null) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty[0] &
          /*noLabel, label*/
          768) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_4(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(28:6) <NotchedOutline noLabel={noLabel || label == null} {...prefixFilter($$props, 'outline$')}>",
    ctx: ctx
  });
  return block;
} // (53:4) {#if variant !== 'outlined'}


function create_if_block$3(ctx) {
  var t;
  var if_block1_anchor;
  var current;
  var if_block0 = !
  /*noLabel*/
  ctx[8] &&
  /*label*/
  ctx[9] != null && create_if_block_2(ctx);
  var if_block1 =
  /*ripple*/
  ctx[4] && create_if_block_1(ctx);
  var block = {
    c: function create() {
      if (if_block0) if_block0.c();
      t = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block0) if_block0.l(nodes);
      t = claim_space(nodes);
      if (if_block1) if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert_dev(target, t, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert_dev(target, if_block1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (!
      /*noLabel*/
      ctx[8] &&
      /*label*/
      ctx[9] != null) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty[0] &
          /*noLabel, label*/
          768) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t.parentNode, t);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (
      /*ripple*/
      ctx[4]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty[0] &
          /*ripple*/
          16) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach_dev(t);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach_dev(if_block1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(53:4) {#if variant !== 'outlined'}",
    ctx: ctx
  });
  return block;
} // (54:6) {#if !noLabel && label != null}


function create_if_block_2(ctx) {
  var floatinglabel;
  var current;
  var floatinglabel_spread_levels = [{
    id:
    /*inputId*/
    ctx[11] + "-smui-label"
  }, {
    floatAbove:
    /*value*/
    ctx[0] !== ""
  }, {
    class:
    /*label$class*/
    ctx[16]
  }, exclude(prefixFilter(
  /*$$props*/
  ctx[27], "label$"), ["class"])];
  var floatinglabel_props = {
    $$slots: {
      default: [create_default_slot_2]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < floatinglabel_spread_levels.length; i += 1) {
    floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
  }

  floatinglabel = new FloatingLabel({
    props: floatinglabel_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(floatinglabel.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(floatinglabel.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(floatinglabel, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var floatinglabel_changes = dirty[0] &
      /*inputId, value, label$class, $$props*/
      134285313 ? get_spread_update(floatinglabel_spread_levels, [dirty[0] &
      /*inputId*/
      2048 && {
        id:
        /*inputId*/
        ctx[11] + "-smui-label"
      }, dirty[0] &
      /*value*/
      1 && {
        floatAbove:
        /*value*/
        ctx[0] !== ""
      }, dirty[0] &
      /*label$class*/
      65536 && {
        class:
        /*label$class*/
        ctx[16]
      }, dirty[0] &
      /*$$props*/
      134217728 && get_spread_object(exclude(prefixFilter(
      /*$$props*/
      ctx[27], "label$"), ["class"]))]) : {};

      if (dirty[0] &
      /*label*/
      512 | dirty[1] &
      /*$$scope*/
      256) {
        floatinglabel_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      floatinglabel.$set(floatinglabel_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(floatinglabel.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(floatinglabel.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(floatinglabel, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(54:6) {#if !noLabel && label != null}",
    ctx: ctx
  });
  return block;
} // (55:8) <FloatingLabel           id={inputId+'-smui-label'}           floatAbove={value !== ''}           class="{label$class}"           {...exclude(prefixFilter($$props, 'label$'), ['class'])}         >


function create_default_slot_2(ctx) {
  var t;
  var current;
  var label_slot_template =
  /*#slots*/
  ctx[34].label;
  var label_slot = create_slot(label_slot_template, ctx,
  /*$$scope*/
  ctx[39], get_label_slot_context_1);
  var block = {
    c: function create() {
      t = text(
      /*label*/
      ctx[9]);
      if (label_slot) label_slot.c();
    },
    l: function claim(nodes) {
      t = claim_text(nodes,
      /*label*/
      ctx[9]);
      if (label_slot) label_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);

      if (label_slot) {
        label_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (!current || dirty[0] &
      /*label*/
      512) set_data_dev(t,
      /*label*/
      ctx[9]);

      if (label_slot) {
        if (label_slot.p && dirty[1] &
        /*$$scope*/
        256) {
          update_slot(label_slot, label_slot_template, ctx,
          /*$$scope*/
          ctx[39], dirty, get_label_slot_changes_1, get_label_slot_context_1);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(label_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(label_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
      if (label_slot) label_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(55:8) <FloatingLabel           id={inputId+'-smui-label'}           floatAbove={value !== ''}           class=\\\"{label$class}\\\"           {...exclude(prefixFilter($$props, 'label$'), ['class'])}         >",
    ctx: ctx
  });
  return block;
} // (62:6) {#if ripple}


function create_if_block_1(ctx) {
  var lineripple;
  var current;
  var lineripple_spread_levels = [prefixFilter(
  /*$$props*/
  ctx[27], "ripple$")];
  var lineripple_props = {};

  for (var i = 0; i < lineripple_spread_levels.length; i += 1) {
    lineripple_props = assign(lineripple_props, lineripple_spread_levels[i]);
  }

  lineripple = new LineRipple({
    props: lineripple_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(lineripple.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(lineripple.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(lineripple, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var lineripple_changes = dirty[0] &
      /*$$props*/
      134217728 ? get_spread_update(lineripple_spread_levels, [get_spread_object(prefixFilter(
      /*$$props*/
      ctx[27], "ripple$"))]) : {};
      lineripple.$set(lineripple_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(lineripple.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(lineripple.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(lineripple, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(62:6) {#if ripple}",
    ctx: ctx
  });
  return block;
} // (73:4) <List {...prefixFilter($$props, 'list$')}>


function create_default_slot_1$1(ctx) {
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[34].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[39], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[1] &
        /*$$scope*/
        256) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[39], dirty, null, null);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1$1.name,
    type: "slot",
    source: "(73:4) <List {...prefixFilter($$props, 'list$')}>",
    ctx: ctx
  });
  return block;
} // (67:2) <Menu     class="mdc-select__menu {menu$class}"     role="listbox"     bind:open={menuOpen}     {...exclude(prefixFilter($$props, 'menu$'), ['class'])}   >


function create_default_slot$4(ctx) {
  var list;
  var current;
  var list_spread_levels = [prefixFilter(
  /*$$props*/
  ctx[27], "list$")];
  var list_props = {
    $$slots: {
      default: [create_default_slot_1$1]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < list_spread_levels.length; i += 1) {
    list_props = assign(list_props, list_spread_levels[i]);
  }

  list = new List({
    props: list_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(list.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(list.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(list, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var list_changes = dirty[0] &
      /*$$props*/
      134217728 ? get_spread_update(list_spread_levels, [get_spread_object(prefixFilter(
      /*$$props*/
      ctx[27], "list$"))]) : {};

      if (dirty[1] &
      /*$$scope*/
      256) {
        list_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list.$set(list_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(list, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$4.name,
    type: "slot",
    source: "(67:2) <Menu     class=\\\"mdc-select__menu {menu$class}\\\"     role=\\\"listbox\\\"     bind:open={menuOpen}     {...exclude(prefixFilter($$props, 'menu$'), ['class'])}   >",
    ctx: ctx
  });
  return block;
}

function create_fragment$b(ctx) {
  var div2;
  var div1;
  var t0;
  var t1;
  var i;
  var t2;
  var div0;
  var t3;
  var div0_id_value;
  var div0_class_value;
  var div0_aria_labelledby_value;
  var div0_aria_disabled_value;
  var div0_aria_required_value;
  var useActions_action;
  var t4;
  var div1_class_value;
  var useActions_action_1;
  var t5;
  var menu;
  var updating_open;
  var div2_class_value;
  var Anchor_action;
  var useActions_action_2;
  var current;
  var mounted;
  var dispose;
  var if_block0 =
  /*variant*/
  ctx[6] === "outlined" && create_if_block_3(ctx);
  var icon_slot_template =
  /*#slots*/
  ctx[34].icon;
  var icon_slot = create_slot(icon_slot_template, ctx,
  /*$$scope*/
  ctx[39], get_icon_slot_context);
  var div0_levels = [{
    id: div0_id_value =
    /*inputId*/
    ctx[11] + "-smui-selected-text"
  }, {
    class: div0_class_value = "mdc-select__selected-text " +
    /*selectedText$class*/
    ctx[15]
  }, {
    role: "button"
  }, {
    "aria-haspopup": "listbox"
  }, {
    "aria-labelledby": div0_aria_labelledby_value = "" + (
    /*inputId*/
    ctx[11] + "-smui-label" + " " + (
    /*inputId*/
    ctx[11] + "-smui-selected-text"))
  }, {
    "aria-disabled": div0_aria_disabled_value =
    /*disabled*/
    ctx[5] ? "true" : "false"
  }, {
    "aria-required": div0_aria_required_value =
    /*required*/
    ctx[10] ? "true" : "false"
  }, exclude(prefixFilter(
  /*$$props*/
  ctx[27], "selectedText$"), ["use", "class"])];
  var div0_data = {};

  for (var _i = 0; _i < div0_levels.length; _i += 1) {
    div0_data = assign(div0_data, div0_levels[_i]);
  }

  var if_block1 =
  /*variant*/
  ctx[6] !== "outlined" && create_if_block$3(ctx);
  var div1_levels = [{
    class: div1_class_value = "mdc-select__anchor " +
    /*anchor$class*/
    ctx[13]
  }, exclude(prefixFilter(
  /*$$props*/
  ctx[27], "anchor$"), ["use", "class"])];
  var div1_data = {};

  for (var _i2 = 0; _i2 < div1_levels.length; _i2 += 1) {
    div1_data = assign(div1_data, div1_levels[_i2]);
  }

  var menu_spread_levels = [{
    class: "mdc-select__menu " +
    /*menu$class*/
    ctx[17]
  }, {
    role: "listbox"
  }, exclude(prefixFilter(
  /*$$props*/
  ctx[27], "menu$"), ["class"])];

  function menu_open_binding(value) {
    /*menu_open_binding*/
    ctx[36](value);
  }

  var menu_props = {
    $$slots: {
      default: [create_default_slot$4]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var _i3 = 0; _i3 < menu_spread_levels.length; _i3 += 1) {
    menu_props = assign(menu_props, menu_spread_levels[_i3]);
  }

  if (
  /*menuOpen*/
  ctx[21] !== void 0) {
    menu_props.open =
    /*menuOpen*/
    ctx[21];
  }

  menu = new Menu({
    props: menu_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind(menu, "open", menu_open_binding);
  });
  var div2_levels = [{
    class: div2_class_value = "\n    mdc-select\n    " +
    /*className*/
    ctx[3] + "\n    " +
    /*anchorClasses*/
    ctx[20].join(" ") + "\n    " + (
    /*required*/
    ctx[10] ? "mdc-select--required" : "") + "\n    " + (
    /*disabled*/
    ctx[5] ? "mdc-select--disabled" : "") + "\n    " + (
    /*variant*/
    ctx[6] === "outlined" ? "mdc-select--outlined" : "") + "\n    " + (
    /*variant*/
    ctx[6] === "standard" ? "smui-select--standard" : "") + "\n    " + (
    /*withLeadingIcon*/
    ctx[7] ? "mdc-select--with-leading-icon" : "") + "\n    " + (
    /*noLabel*/
    ctx[8] ||
    /*label*/
    ctx[9] == null ? "mdc-select--no-label" : "") + "\n    " + (
    /*invalid*/
    ctx[1] ? "mdc-select--invalid" : "") + "\n    " + (
    /*menuOpen*/
    ctx[21] ? "mdc-select--activated" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[27], ["use", "class", "ripple", "disabled", "variant", "noLabel", "withLeadingIcon", "label", "value", "selectedIndex", "selectedText", "dirty", "invalid", "updateInvalid", "required", "anchor$", "selectedText$", "label$", "ripple$", "outline$", "menu$", "list$"])];
  var div2_data = {};

  for (var _i4 = 0; _i4 < div2_levels.length; _i4 += 1) {
    div2_data = assign(div2_data, div2_levels[_i4]);
  }

  var block = {
    c: function create() {
      div2 = element("div");
      div1 = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      if (icon_slot) icon_slot.c();
      t1 = space();
      i = element("i");
      t2 = space();
      div0 = element("div");
      t3 = text(
      /*$selectedTextStore*/
      ctx[22]);
      t4 = space();
      if (if_block1) if_block1.c();
      t5 = space();
      create_component(menu.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      if (if_block0) if_block0.l(div1_nodes);
      t0 = claim_space(div1_nodes);
      if (icon_slot) icon_slot.l(div1_nodes);
      t1 = claim_space(div1_nodes);
      i = claim_element(div1_nodes, "I", {
        class: true
      });
      children(i).forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        id: true,
        class: true,
        role: true,
        "aria-haspopup": true,
        "aria-labelledby": true,
        "aria-disabled": true,
        "aria-required": true
      });
      var div0_nodes = children(div0);
      t3 = claim_text(div0_nodes,
      /*$selectedTextStore*/
      ctx[22]);
      div0_nodes.forEach(detach_dev);
      t4 = claim_space(div1_nodes);
      if (if_block1) if_block1.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      t5 = claim_space(div2_nodes);
      claim_component(menu.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(i, "class", "mdc-select__dropdown-icon");
      add_location(i, file$8, 39, 4, 1633);
      set_attributes(div0, div0_data);
      add_location(div0, file$8, 40, 4, 1679);
      set_attributes(div1, div1_data);
      add_location(div1, file$8, 21, 2, 959);
      set_attributes(div2, div2_data);
      add_location(div2, file$8, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, div1);
      if (if_block0) if_block0.m(div1, null);
      append_dev(div1, t0);

      if (icon_slot) {
        icon_slot.m(div1, null);
      }

      append_dev(div1, t1);
      append_dev(div1, i);
      append_dev(div1, t2);
      append_dev(div1, div0);
      append_dev(div0, t3);
      /*div0_binding*/

      ctx[35](div0);
      append_dev(div1, t4);
      if (if_block1) if_block1.m(div1, null);
      append_dev(div2, t5);
      mount_component(menu, div2, null);
      /*div2_binding*/

      ctx[37](div2);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, div0,
        /*selectedText$use*/
        ctx[14])), action_destroyer(useActions_action_1 = useActions.call(null, div1,
        /*anchor$use*/
        ctx[12])), action_destroyer(Anchor_action = Anchor.call(null, div2, {
          classForward:
          /*Anchor_function*/
          ctx[38]
        })), action_destroyer(useActions_action_2 = useActions.call(null, div2,
        /*use*/
        ctx[2])), action_destroyer(/*forwardEvents*/
        ctx[23].call(null, div2)), listen_dev(div2, "MDCSelect:change",
        /*changeHandler*/
        ctx[26], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (
      /*variant*/
      ctx[6] === "outlined") {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty[0] &
          /*variant*/
          64) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div1, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (icon_slot) {
        if (icon_slot.p && dirty[1] &
        /*$$scope*/
        256) {
          update_slot(icon_slot, icon_slot_template, ctx,
          /*$$scope*/
          ctx[39], dirty, get_icon_slot_changes, get_icon_slot_context);
        }
      }

      if (!current || dirty[0] &
      /*$selectedTextStore*/
      4194304) set_data_dev(t3,
      /*$selectedTextStore*/
      ctx[22]);
      set_attributes(div0, div0_data = get_spread_update(div0_levels, [(!current || dirty[0] &
      /*inputId*/
      2048 && div0_id_value !== (div0_id_value =
      /*inputId*/
      ctx[11] + "-smui-selected-text")) && {
        id: div0_id_value
      }, (!current || dirty[0] &
      /*selectedText$class*/
      32768 && div0_class_value !== (div0_class_value = "mdc-select__selected-text " +
      /*selectedText$class*/
      ctx[15])) && {
        class: div0_class_value
      }, {
        role: "button"
      }, {
        "aria-haspopup": "listbox"
      }, (!current || dirty[0] &
      /*inputId*/
      2048 && div0_aria_labelledby_value !== (div0_aria_labelledby_value = "" + (
      /*inputId*/
      ctx[11] + "-smui-label" + " " + (
      /*inputId*/
      ctx[11] + "-smui-selected-text")))) && {
        "aria-labelledby": div0_aria_labelledby_value
      }, (!current || dirty[0] &
      /*disabled*/
      32 && div0_aria_disabled_value !== (div0_aria_disabled_value =
      /*disabled*/
      ctx[5] ? "true" : "false")) && {
        "aria-disabled": div0_aria_disabled_value
      }, (!current || dirty[0] &
      /*required*/
      1024 && div0_aria_required_value !== (div0_aria_required_value =
      /*required*/
      ctx[10] ? "true" : "false")) && {
        "aria-required": div0_aria_required_value
      }, dirty[0] &
      /*$$props*/
      134217728 && exclude(prefixFilter(
      /*$$props*/
      ctx[27], "selectedText$"), ["use", "class"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] &
      /*selectedText$use*/
      16384) useActions_action.update.call(null,
      /*selectedText$use*/
      ctx[14]);

      if (
      /*variant*/
      ctx[6] !== "outlined") {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty[0] &
          /*variant*/
          64) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$3(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      set_attributes(div1, div1_data = get_spread_update(div1_levels, [(!current || dirty[0] &
      /*anchor$class*/
      8192 && div1_class_value !== (div1_class_value = "mdc-select__anchor " +
      /*anchor$class*/
      ctx[13])) && {
        class: div1_class_value
      }, dirty[0] &
      /*$$props*/
      134217728 && exclude(prefixFilter(
      /*$$props*/
      ctx[27], "anchor$"), ["use", "class"])]));
      if (useActions_action_1 && is_function(useActions_action_1.update) && dirty[0] &
      /*anchor$use*/
      4096) useActions_action_1.update.call(null,
      /*anchor$use*/
      ctx[12]);
      var menu_changes = dirty[0] &
      /*menu$class, $$props*/
      134348800 ? get_spread_update(menu_spread_levels, [dirty[0] &
      /*menu$class*/
      131072 && {
        class: "mdc-select__menu " +
        /*menu$class*/
        ctx[17]
      }, menu_spread_levels[1], dirty[0] &
      /*$$props*/
      134217728 && get_spread_object(exclude(prefixFilter(
      /*$$props*/
      ctx[27], "menu$"), ["class"]))]) : {};

      if (dirty[0] &
      /*$$props*/
      134217728 | dirty[1] &
      /*$$scope*/
      256) {
        menu_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (!updating_open && dirty[0] &
      /*menuOpen*/
      2097152) {
        updating_open = true;
        menu_changes.open =
        /*menuOpen*/
        ctx[21];
        add_flush_callback(function () {
          return updating_open = false;
        });
      }

      menu.$set(menu_changes);
      set_attributes(div2, div2_data = get_spread_update(div2_levels, [(!current || dirty[0] &
      /*className, anchorClasses, required, disabled, variant, withLeadingIcon, noLabel, label, invalid, menuOpen*/
      3147754 && div2_class_value !== (div2_class_value = "\n    mdc-select\n    " +
      /*className*/
      ctx[3] + "\n    " +
      /*anchorClasses*/
      ctx[20].join(" ") + "\n    " + (
      /*required*/
      ctx[10] ? "mdc-select--required" : "") + "\n    " + (
      /*disabled*/
      ctx[5] ? "mdc-select--disabled" : "") + "\n    " + (
      /*variant*/
      ctx[6] === "outlined" ? "mdc-select--outlined" : "") + "\n    " + (
      /*variant*/
      ctx[6] === "standard" ? "smui-select--standard" : "") + "\n    " + (
      /*withLeadingIcon*/
      ctx[7] ? "mdc-select--with-leading-icon" : "") + "\n    " + (
      /*noLabel*/
      ctx[8] ||
      /*label*/
      ctx[9] == null ? "mdc-select--no-label" : "") + "\n    " + (
      /*invalid*/
      ctx[1] ? "mdc-select--invalid" : "") + "\n    " + (
      /*menuOpen*/
      ctx[21] ? "mdc-select--activated" : "") + "\n  ")) && {
        class: div2_class_value
      }, dirty[0] &
      /*$$props*/
      134217728 && exclude(
      /*$$props*/
      ctx[27], ["use", "class", "ripple", "disabled", "variant", "noLabel", "withLeadingIcon", "label", "value", "selectedIndex", "selectedText", "dirty", "invalid", "updateInvalid", "required", "anchor$", "selectedText$", "label$", "ripple$", "outline$", "menu$", "list$"])]));
      if (Anchor_action && is_function(Anchor_action.update) && dirty[0] &
      /*anchorClasses*/
      1048576) Anchor_action.update.call(null, {
        classForward:
        /*Anchor_function*/
        ctx[38]
      });
      if (useActions_action_2 && is_function(useActions_action_2.update) && dirty[0] &
      /*use*/
      4) useActions_action_2.update.call(null,
      /*use*/
      ctx[2]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(icon_slot, local);
      transition_in(if_block1);
      transition_in(menu.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(icon_slot, local);
      transition_out(if_block1);
      transition_out(menu.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
      if (if_block0) if_block0.d();
      if (icon_slot) icon_slot.d(detaching);
      /*div0_binding*/

      ctx[35](null);
      if (if_block1) if_block1.d();
      destroy_component(menu);
      /*div2_binding*/

      ctx[37](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$b.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var counter$1 = 0;

function instance$b($$self, $$props, $$invalidate) {
  var $valueStore;
  var $selectedTextStore;
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Select", slots, ['label', 'icon', 'default']);
  var forwardEvents = forwardEventsBuilder(get_current_component(), "MDCSelect:change");

  var uninitializedValue = function uninitializedValue() {};

  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$ripple = _$$props4.ripple,
      ripple = _$$props4$ripple === void 0 ? true : _$$props4$ripple;
  var _$$props5 = $$props,
      _$$props5$disabled = _$$props5.disabled,
      disabled = _$$props5$disabled === void 0 ? false : _$$props5$disabled;
  var _$$props6 = $$props,
      _$$props6$variant = _$$props6.variant,
      variant = _$$props6$variant === void 0 ? "standard" : _$$props6$variant;
  var _$$props7 = $$props,
      _$$props7$withLeading = _$$props7.withLeadingIcon,
      withLeadingIcon = _$$props7$withLeading === void 0 ? false : _$$props7$withLeading;
  var _$$props8 = $$props,
      _$$props8$noLabel = _$$props8.noLabel,
      noLabel = _$$props8$noLabel === void 0 ? false : _$$props8$noLabel;
  var _$$props9 = $$props,
      _$$props9$label = _$$props9.label,
      label = _$$props9$label === void 0 ? null : _$$props9$label;
  var _$$props10 = $$props,
      _$$props10$value = _$$props10.value,
      value = _$$props10$value === void 0 ? "" : _$$props10$value;
  var _$$props11 = $$props,
      _$$props11$selectedIn = _$$props11.selectedIndex,
      selectedIndex = _$$props11$selectedIn === void 0 ? uninitializedValue : _$$props11$selectedIn;
  var _$$props12 = $$props,
      _$$props12$dirty = _$$props12.dirty,
      dirty = _$$props12$dirty === void 0 ? false : _$$props12$dirty;
  var _$$props13 = $$props,
      _$$props13$invalid = _$$props13.invalid,
      invalid = _$$props13$invalid === void 0 ? uninitializedValue : _$$props13$invalid;
  var _$$props14 = $$props,
      _$$props14$updateInva = _$$props14.updateInvalid,
      updateInvalid = _$$props14$updateInva === void 0 ? invalid === uninitializedValue : _$$props14$updateInva;
  var _$$props15 = $$props,
      _$$props15$required = _$$props15.required,
      required = _$$props15$required === void 0 ? false : _$$props15$required;
  var _$$props16 = $$props,
      _$$props16$inputId = _$$props16.inputId,
      inputId = _$$props16$inputId === void 0 ? "SMUI-select-" + counter$1++ : _$$props16$inputId;
  var _$$props17 = $$props,
      _$$props17$anchor$use = _$$props17.anchor$use,
      anchor$use = _$$props17$anchor$use === void 0 ? [] : _$$props17$anchor$use;
  var _$$props18 = $$props,
      _$$props18$anchor$cla = _$$props18.anchor$class,
      anchor$class = _$$props18$anchor$cla === void 0 ? "" : _$$props18$anchor$cla;
  var _$$props19 = $$props,
      _$$props19$selectedTe = _$$props19.selectedText$use,
      selectedText$use = _$$props19$selectedTe === void 0 ? [] : _$$props19$selectedTe;
  var _$$props20 = $$props,
      _$$props20$selectedTe = _$$props20.selectedText$class,
      selectedText$class = _$$props20$selectedTe === void 0 ? "" : _$$props20$selectedTe;
  var _$$props21 = $$props,
      _$$props21$label$clas = _$$props21.label$class,
      label$class = _$$props21$label$clas === void 0 ? "" : _$$props21$label$clas;
  var _$$props22 = $$props,
      _$$props22$menu$class = _$$props22.menu$class,
      menu$class = _$$props22$menu$class === void 0 ? "" : _$$props22$menu$class;
  var element;
  var selectText;
  var select;
  var anchorClasses = [];
  var menuPromiseResolve;
  var menuPromise = new Promise(function (resolve) {
    return menuPromiseResolve = resolve;
  });
  var addLayoutListener = getContext("SMUI:addLayoutListener");
  var removeLayoutListener;
  var menuOpen = false;
  setContext("SMUI:menu:instantiate", false);
  setContext("SMUI:menu:getInstance", getMenuInstancePromise);
  setContext("SMUI:list:role", "");
  setContext("SMUI:list:nav", false); // Only needed on initialization.

  var selectedTextStore = writable("");
  validate_store(selectedTextStore, "selectedTextStore");
  component_subscribe($$self, selectedTextStore, function (value) {
    return $$invalidate(22, $selectedTextStore = value);
  });
  setContext("SMUI:select:selectedText", selectedTextStore);
  var valueStore = writable(value);
  validate_store(valueStore, "valueStore");
  component_subscribe($$self, valueStore, function (value) {
    return $$invalidate(42, $valueStore = value);
  });
  setContext("SMUI:select:value", valueStore);

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $$invalidate(33, select = new MDCSelect(element));
            menuPromiseResolve(select.menu_);

            if (!ripple && select.ripple) {
              select.ripple.destroy();
            }

            if (updateInvalid) {
              $$invalidate(1, invalid = !select.valid);
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  onDestroy(function () {
    select && select.destroy();

    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });

  function getMenuInstancePromise() {
    return menuPromise;
  }

  function changeHandler(e) {
    $$invalidate(0, value = e.detail.value);
    $$invalidate(28, selectedIndex = e.detail.index);
    $$invalidate(29, dirty = true);

    if (select && updateInvalid) {
      $$invalidate(1, invalid = !select.valid);
    }
  }

  function focus() {
    var _selectText;

    return (_selectText = selectText).focus.apply(_selectText, arguments);
  }

  function layout() {
    var _select;

    return (_select = select).layout.apply(_select, arguments);
  }

  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      selectText = $$value;
      $$invalidate(19, selectText);
    });
  }

  function menu_open_binding(value) {
    menuOpen = value;
    $$invalidate(21, menuOpen);
  }

  function div2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(18, element);
    });
  }

  var Anchor_function = function Anchor_function(classes) {
    return $$invalidate(20, anchorClasses = classes);
  };

  $$self.$$set = function ($$new_props) {
    $$invalidate(27, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(2, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(3, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(4, ripple = $$new_props.ripple);
    if ("disabled" in $$new_props) $$invalidate(5, disabled = $$new_props.disabled);
    if ("variant" in $$new_props) $$invalidate(6, variant = $$new_props.variant);
    if ("withLeadingIcon" in $$new_props) $$invalidate(7, withLeadingIcon = $$new_props.withLeadingIcon);
    if ("noLabel" in $$new_props) $$invalidate(8, noLabel = $$new_props.noLabel);
    if ("label" in $$new_props) $$invalidate(9, label = $$new_props.label);
    if ("value" in $$new_props) $$invalidate(0, value = $$new_props.value);
    if ("selectedIndex" in $$new_props) $$invalidate(28, selectedIndex = $$new_props.selectedIndex);
    if ("dirty" in $$new_props) $$invalidate(29, dirty = $$new_props.dirty);
    if ("invalid" in $$new_props) $$invalidate(1, invalid = $$new_props.invalid);
    if ("updateInvalid" in $$new_props) $$invalidate(30, updateInvalid = $$new_props.updateInvalid);
    if ("required" in $$new_props) $$invalidate(10, required = $$new_props.required);
    if ("inputId" in $$new_props) $$invalidate(11, inputId = $$new_props.inputId);
    if ("anchor$use" in $$new_props) $$invalidate(12, anchor$use = $$new_props.anchor$use);
    if ("anchor$class" in $$new_props) $$invalidate(13, anchor$class = $$new_props.anchor$class);
    if ("selectedText$use" in $$new_props) $$invalidate(14, selectedText$use = $$new_props.selectedText$use);
    if ("selectedText$class" in $$new_props) $$invalidate(15, selectedText$class = $$new_props.selectedText$class);
    if ("label$class" in $$new_props) $$invalidate(16, label$class = $$new_props.label$class);
    if ("menu$class" in $$new_props) $$invalidate(17, menu$class = $$new_props.menu$class);
    if ("$$scope" in $$new_props) $$invalidate(39, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      counter: counter$1,
      MDCSelect: MDCSelect,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      writable: writable,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      prefixFilter: prefixFilter,
      useActions: useActions,
      Anchor: Anchor,
      Menu: Menu,
      List: List,
      FloatingLabel: FloatingLabel,
      LineRipple: LineRipple,
      NotchedOutline: NotchedOutline,
      forwardEvents: forwardEvents,
      uninitializedValue: uninitializedValue,
      use: use,
      className: className,
      ripple: ripple,
      disabled: disabled,
      variant: variant,
      withLeadingIcon: withLeadingIcon,
      noLabel: noLabel,
      label: label,
      value: value,
      selectedIndex: selectedIndex,
      dirty: dirty,
      invalid: invalid,
      updateInvalid: updateInvalid,
      required: required,
      inputId: inputId,
      anchor$use: anchor$use,
      anchor$class: anchor$class,
      selectedText$use: selectedText$use,
      selectedText$class: selectedText$class,
      label$class: label$class,
      menu$class: menu$class,
      element: element,
      selectText: selectText,
      select: select,
      anchorClasses: anchorClasses,
      menuPromiseResolve: menuPromiseResolve,
      menuPromise: menuPromise,
      addLayoutListener: addLayoutListener,
      removeLayoutListener: removeLayoutListener,
      menuOpen: menuOpen,
      selectedTextStore: selectedTextStore,
      valueStore: valueStore,
      getMenuInstancePromise: getMenuInstancePromise,
      changeHandler: changeHandler,
      focus: focus,
      layout: layout,
      $valueStore: $valueStore,
      $selectedTextStore: $selectedTextStore
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(27, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(2, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(3, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(4, ripple = $$new_props.ripple);
    if ("disabled" in $$props) $$invalidate(5, disabled = $$new_props.disabled);
    if ("variant" in $$props) $$invalidate(6, variant = $$new_props.variant);
    if ("withLeadingIcon" in $$props) $$invalidate(7, withLeadingIcon = $$new_props.withLeadingIcon);
    if ("noLabel" in $$props) $$invalidate(8, noLabel = $$new_props.noLabel);
    if ("label" in $$props) $$invalidate(9, label = $$new_props.label);
    if ("value" in $$props) $$invalidate(0, value = $$new_props.value);
    if ("selectedIndex" in $$props) $$invalidate(28, selectedIndex = $$new_props.selectedIndex);
    if ("dirty" in $$props) $$invalidate(29, dirty = $$new_props.dirty);
    if ("invalid" in $$props) $$invalidate(1, invalid = $$new_props.invalid);
    if ("updateInvalid" in $$props) $$invalidate(30, updateInvalid = $$new_props.updateInvalid);
    if ("required" in $$props) $$invalidate(10, required = $$new_props.required);
    if ("inputId" in $$props) $$invalidate(11, inputId = $$new_props.inputId);
    if ("anchor$use" in $$props) $$invalidate(12, anchor$use = $$new_props.anchor$use);
    if ("anchor$class" in $$props) $$invalidate(13, anchor$class = $$new_props.anchor$class);
    if ("selectedText$use" in $$props) $$invalidate(14, selectedText$use = $$new_props.selectedText$use);
    if ("selectedText$class" in $$props) $$invalidate(15, selectedText$class = $$new_props.selectedText$class);
    if ("label$class" in $$props) $$invalidate(16, label$class = $$new_props.label$class);
    if ("menu$class" in $$props) $$invalidate(17, menu$class = $$new_props.menu$class);
    if ("element" in $$props) $$invalidate(18, element = $$new_props.element);
    if ("selectText" in $$props) $$invalidate(19, selectText = $$new_props.selectText);
    if ("select" in $$props) $$invalidate(33, select = $$new_props.select);
    if ("anchorClasses" in $$props) $$invalidate(20, anchorClasses = $$new_props.anchorClasses);
    if ("menuPromiseResolve" in $$props) menuPromiseResolve = $$new_props.menuPromiseResolve;
    if ("menuPromise" in $$props) menuPromise = $$new_props.menuPromise;
    if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
    if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    if ("menuOpen" in $$props) $$invalidate(21, menuOpen = $$new_props.menuOpen);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*value*/
    1) {
      set_store_value(valueStore, $valueStore = value, $valueStore);
    }

    if ($$self.$$.dirty[0] &
    /*value*/
    1 | $$self.$$.dirty[1] &
    /*select*/
    4) {
      if (select && select.value !== value) {
        $$invalidate(33, select.value = value, select);
      }
    }

    if ($$self.$$.dirty[0] &
    /*selectedIndex*/
    268435456 | $$self.$$.dirty[1] &
    /*select*/
    4) {
      if (select && select.selectedIndex !== selectedIndex) {
        if (selectedIndex === uninitializedValue) {
          $$invalidate(28, selectedIndex = select.selectedIndex);
        } else {
          $$invalidate(33, select.selectedIndex = selectedIndex, select);
        }
      }
    }

    if ($$self.$$.dirty[0] &
    /*disabled*/
    32 | $$self.$$.dirty[1] &
    /*select*/
    4) {
      if (select && select.disabled !== disabled) {
        $$invalidate(33, select.disabled = disabled, select);
      }
    }

    if ($$self.$$.dirty[0] &
    /*invalid, updateInvalid*/
    1073741826 | $$self.$$.dirty[1] &
    /*select*/
    4) {
      if (select && select.valid !== !invalid) {
        if (updateInvalid) {
          $$invalidate(1, invalid = !select.valid);
        } else {
          $$invalidate(33, select.valid = !invalid, select);
        }
      }
    }

    if ($$self.$$.dirty[0] &
    /*required*/
    1024 | $$self.$$.dirty[1] &
    /*select*/
    4) {
      if (select && select.required !== required) {
        $$invalidate(33, select.required = required, select);
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [value, invalid, use, className, ripple, disabled, variant, withLeadingIcon, noLabel, label, required, inputId, anchor$use, anchor$class, selectedText$use, selectedText$class, label$class, menu$class, element, selectText, anchorClasses, menuOpen, $selectedTextStore, forwardEvents, selectedTextStore, valueStore, changeHandler, $$props, selectedIndex, dirty, updateInvalid, focus, layout, select, slots, div0_binding, menu_open_binding, div2_binding, Anchor_function, $$scope];
}

var Select = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Select, _SvelteComponentDev);

  var _super = _createSuper$b(Select);

  function Select(options) {
    var _this;

    _classCallCheck(this, Select);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {
      use: 2,
      class: 3,
      ripple: 4,
      disabled: 5,
      variant: 6,
      withLeadingIcon: 7,
      noLabel: 8,
      label: 9,
      value: 0,
      selectedIndex: 28,
      dirty: 29,
      invalid: 1,
      updateInvalid: 30,
      required: 10,
      inputId: 11,
      anchor$use: 12,
      anchor$class: 13,
      selectedText$use: 14,
      selectedText$class: 15,
      label$class: 16,
      menu$class: 17,
      focus: 31,
      layout: 32
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Select",
      options: options,
      id: create_fragment$b.name
    });
    return _this;
  }

  _createClass(Select, [{
    key: "use",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "disabled",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "variant",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "withLeadingIcon",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "noLabel",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "label",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedIndex",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "dirty",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "invalid",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "updateInvalid",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "required",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "inputId",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchor$use",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "anchor$class",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedText$use",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedText$class",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "label$class",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "menu$class",
    get: function get() {
      throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "focus",
    get: function get() {
      return this.$$.ctx[31];
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "layout",
    get: function get() {
      return this.$$.ctx[32];
    },
    set: function set(value) {
      throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Select;
}(SvelteComponentDev);

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$7 = "node_modules/@smui/common/A.svelte";

function create_fragment$a(ctx) {
  var a;
  var useActions_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[7].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[6], null);
  var a_levels = [{
    href:
    /*href*/
    ctx[1]
  }, exclude(
  /*$$props*/
  ctx[4], ["element", "use", "forwardEvents", "href"])];
  var a_data = {};

  for (var i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }

  var block = {
    c: function create() {
      a = element("a");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        href: true
      });
      var a_nodes = children(a);
      if (default_slot) default_slot.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(a, a_data);
      add_location(a, file$7, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);

      if (default_slot) {
        default_slot.m(a, null);
      }
      /*a_binding*/


      ctx[8](a);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, a,
        /*use*/
        ctx[2])), action_destroyer(/*forwardEvents*/
        ctx[3].call(null, a))];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        64) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[6], dirty, null, null);
        }
      }

      set_attributes(a, a_data = get_spread_update(a_levels, [(!current || dirty &
      /*href*/
      2) && {
        href:
        /*href*/
        ctx[1]
      }, dirty &
      /*$$props*/
      16 && exclude(
      /*$$props*/
      ctx[4], ["element", "use", "forwardEvents", "href"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      4) useActions_action.update.call(null,
      /*use*/
      ctx[2]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      if (default_slot) default_slot.d(detaching);
      /*a_binding*/

      ctx[8](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$a.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$a($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("A", slots, ['default']);
  var _$$props2 = $$props,
      _$$props2$href = _$$props2.href,
      href = _$$props2$href === void 0 ? "javascript:void(0);" : _$$props2$href;
  var _$$props3 = $$props,
      _$$props3$element = _$$props3.element,
      element = _$$props3$element === void 0 ? null : _$$props3$element;
  var _$$props4 = $$props,
      _$$props4$use = _$$props4.use,
      use = _$$props4$use === void 0 ? [] : _$$props4$use;
  var _$$props5 = $$props,
      _$$props5$forwardEven = _$$props5.forwardEvents,
      forwardEventsAdditional = _$$props5$forwardEven === void 0 ? [] : _$$props5$forwardEven;
  var forwardEvents = forwardEventsBuilder(get_current_component(), forwardEventsAdditional);

  function a_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(0, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("href" in $$new_props) $$invalidate(1, href = $$new_props.href);
    if ("element" in $$new_props) $$invalidate(0, element = $$new_props.element);
    if ("use" in $$new_props) $$invalidate(2, use = $$new_props.use);
    if ("forwardEvents" in $$new_props) $$invalidate(5, forwardEventsAdditional = $$new_props.forwardEvents);
    if ("$$scope" in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      href: href,
      element: element,
      use: use,
      forwardEventsAdditional: forwardEventsAdditional,
      forwardEvents: forwardEvents
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(4, $$props = assign(assign({}, $$props), $$new_props));
    if ("href" in $$props) $$invalidate(1, href = $$new_props.href);
    if ("element" in $$props) $$invalidate(0, element = $$new_props.element);
    if ("use" in $$props) $$invalidate(2, use = $$new_props.use);
    if ("forwardEventsAdditional" in $$props) $$invalidate(5, forwardEventsAdditional = $$new_props.forwardEventsAdditional);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [element, href, use, forwardEvents, $$props, forwardEventsAdditional, $$scope, slots, a_binding];
}

var A = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(A, _SvelteComponentDev);

  var _super = _createSuper$a(A);

  function A(options) {
    var _this;

    _classCallCheck(this, A);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {
      href: 1,
      element: 0,
      use: 2,
      forwardEvents: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "A",
      options: options,
      id: create_fragment$a.name
    });
    return _this;
  }

  _createClass(A, [{
    key: "href",
    get: function get() {
      throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "element",
    get: function get() {
      throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "use",
    get: function get() {
      throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "forwardEvents",
    get: function get() {
      throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return A;
}(SvelteComponentDev);

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "node_modules/@smui/common/Span.svelte";

function create_fragment$9(ctx) {
  var span;
  var useActions_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[6].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[5], null);
  var span_levels = [exclude(
  /*$$props*/
  ctx[3], ["element", "use", "forwardEvents"])];
  var span_data = {};

  for (var i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }

  var block = {
    c: function create() {
      span = element("span");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(span, span_data);
      add_location(span, file$6, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);

      if (default_slot) {
        default_slot.m(span, null);
      }
      /*span_binding*/


      ctx[7](span);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, span,
        /*use*/
        ctx[1])), action_destroyer(/*forwardEvents*/
        ctx[2].call(null, span))];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        32) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[5], dirty, null, null);
        }
      }

      set_attributes(span, span_data = get_spread_update(span_levels, [dirty &
      /*$$props*/
      8 && exclude(
      /*$$props*/
      ctx[3], ["element", "use", "forwardEvents"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
      if (default_slot) default_slot.d(detaching);
      /*span_binding*/

      ctx[7](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$9.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$9($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Span", slots, ['default']);
  var _$$props2 = $$props,
      _$$props2$element = _$$props2.element,
      element = _$$props2$element === void 0 ? null : _$$props2$element;
  var _$$props3 = $$props,
      _$$props3$use = _$$props3.use,
      use = _$$props3$use === void 0 ? [] : _$$props3$use;
  var _$$props4 = $$props,
      _$$props4$forwardEven = _$$props4.forwardEvents,
      forwardEventsAdditional = _$$props4$forwardEven === void 0 ? [] : _$$props4$forwardEven;
  var forwardEvents = forwardEventsBuilder(get_current_component(), forwardEventsAdditional);

  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(0, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("element" in $$new_props) $$invalidate(0, element = $$new_props.element);
    if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
    if ("forwardEvents" in $$new_props) $$invalidate(4, forwardEventsAdditional = $$new_props.forwardEvents);
    if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      element: element,
      use: use,
      forwardEventsAdditional: forwardEventsAdditional,
      forwardEvents: forwardEvents
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
    if ("element" in $$props) $$invalidate(0, element = $$new_props.element);
    if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
    if ("forwardEventsAdditional" in $$props) $$invalidate(4, forwardEventsAdditional = $$new_props.forwardEventsAdditional);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [element, use, forwardEvents, $$props, forwardEventsAdditional, $$scope, slots, span_binding];
}

var Span = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Span, _SvelteComponentDev);

  var _super = _createSuper$9(Span);

  function Span(options) {
    var _this;

    _classCallCheck(this, Span);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {
      element: 0,
      use: 1,
      forwardEvents: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Span",
      options: options,
      id: create_fragment$9.name
    });
    return _this;
  }

  _createClass(Span, [{
    key: "element",
    get: function get() {
      throw new Error("<Span>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "use",
    get: function get() {
      throw new Error("<Span>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "forwardEvents",
    get: function get() {
      throw new Error("<Span>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Span;
}(SvelteComponentDev);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "node_modules/@smui/common/Li.svelte";

function create_fragment$8(ctx) {
  var li;
  var useActions_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[6].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[5], null);
  var li_levels = [exclude(
  /*$$props*/
  ctx[3], ["element", "use", "forwardEvents"])];
  var li_data = {};

  for (var i = 0; i < li_levels.length; i += 1) {
    li_data = assign(li_data, li_levels[i]);
  }

  var block = {
    c: function create() {
      li = element("li");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      if (default_slot) default_slot.l(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(li, li_data);
      add_location(li, file$5, 1, 0, 1);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);

      if (default_slot) {
        default_slot.m(li, null);
      }
      /*li_binding*/


      ctx[7](li);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, li,
        /*use*/
        ctx[1])), action_destroyer(/*forwardEvents*/
        ctx[2].call(null, li))];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        32) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[5], dirty, null, null);
        }
      }

      set_attributes(li, li_data = get_spread_update(li_levels, [dirty &
      /*$$props*/
      8 && exclude(
      /*$$props*/
      ctx[3], ["element", "use", "forwardEvents"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if (default_slot) default_slot.d(detaching);
      /*li_binding*/

      ctx[7](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$8($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Li", slots, ['default']);
  var _$$props2 = $$props,
      _$$props2$element = _$$props2.element,
      element = _$$props2$element === void 0 ? null : _$$props2$element;
  var _$$props3 = $$props,
      _$$props3$use = _$$props3.use,
      use = _$$props3$use === void 0 ? [] : _$$props3$use;
  var _$$props4 = $$props,
      _$$props4$forwardEven = _$$props4.forwardEvents,
      forwardEventsAdditional = _$$props4$forwardEven === void 0 ? [] : _$$props4$forwardEven;
  var forwardEvents = forwardEventsBuilder(get_current_component(), forwardEventsAdditional);

  function li_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(0, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("element" in $$new_props) $$invalidate(0, element = $$new_props.element);
    if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
    if ("forwardEvents" in $$new_props) $$invalidate(4, forwardEventsAdditional = $$new_props.forwardEvents);
    if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      element: element,
      use: use,
      forwardEventsAdditional: forwardEventsAdditional,
      forwardEvents: forwardEvents
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
    if ("element" in $$props) $$invalidate(0, element = $$new_props.element);
    if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
    if ("forwardEventsAdditional" in $$props) $$invalidate(4, forwardEventsAdditional = $$new_props.forwardEventsAdditional);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [element, use, forwardEvents, $$props, forwardEventsAdditional, $$scope, slots, li_binding];
}

var Li = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Li, _SvelteComponentDev);

  var _super = _createSuper$8(Li);

  function Li(options) {
    var _this;

    _classCallCheck(this, Li);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
      element: 0,
      use: 1,
      forwardEvents: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Li",
      options: options,
      id: create_fragment$8.name
    });
    return _this;
  }

  _createClass(Li, [{
    key: "element",
    get: function get() {
      throw new Error("<Li>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Li>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "use",
    get: function get() {
      throw new Error("<Li>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Li>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "forwardEvents",
    get: function get() {
      throw new Error("<Li>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Li>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Li;
}(SvelteComponentDev);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function Ripple(node) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    ripple: false,
    unbounded: false,
    disabled: false,
    color: null,
    classForward: function classForward() {}
  };
  var instance = null;
  var addLayoutListener = getContext('SMUI:addLayoutListener');
  var removeLayoutListener;
  var classList = [];
  var rippleCapableSurface = {
    get root_() {
      return node;
    },

    get unbounded() {
      return props.unbounded;
    },

    set unbounded(value) {
      return props.unbounded = value;
    },

    get disabled() {
      return props.disabled;
    },

    set disabled(value) {
      return props.disabled = value;
    }

  };

  function _addClass(className) {
    var idx = classList.indexOf(className);

    if (idx === -1) {
      node.classList.add(className);
      classList.push(className);

      if (props.classForward) {
        props.classForward(classList);
      }
    }
  }

  function _removeClass(className) {
    var idx = classList.indexOf(className);

    if (idx !== -1) {
      node.classList.remove(className);
      classList.splice(idx, 1);

      if (props.classForward) {
        props.classForward(classList);
      }
    }
  }

  function handleProps() {
    if (props.ripple && !instance) {
      // Override the Ripple component's adapter, so that we can forward classes
      // to Svelte components that overwrite Ripple's classes.
      var foundation = new MDCRippleFoundation(_objectSpread(_objectSpread({}, MDCRipple.createAdapter(rippleCapableSurface)), {}, {
        addClass: function addClass(className) {
          return _addClass(className);
        },
        removeClass: function removeClass(className) {
          return _removeClass(className);
        }
      }));
      instance = new MDCRipple(node, foundation);
    } else if (instance && !props.ripple) {
      instance.destroy();
      instance = null;
    }

    if (props.ripple) {
      instance.unbounded = !!props.unbounded;

      switch (props.color) {
        case 'surface':
          _addClass('mdc-ripple-surface');

          _removeClass('mdc-ripple-surface--primary');

          _removeClass('mdc-ripple-surface--accent');

          return;

        case 'primary':
          _addClass('mdc-ripple-surface');

          _addClass('mdc-ripple-surface--primary');

          _removeClass('mdc-ripple-surface--accent');

          return;

        case 'secondary':
          _addClass('mdc-ripple-surface');

          _removeClass('mdc-ripple-surface--primary');

          _addClass('mdc-ripple-surface--accent');

          return;
      }
    }

    _removeClass('mdc-ripple-surface');

    _removeClass('mdc-ripple-surface--primary');

    _removeClass('mdc-ripple-surface--accent');
  }

  handleProps();

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  function layout() {
    if (instance) {
      instance.layout();
    }
  }

  return {
    update: function update() {
      var newProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        ripple: false,
        unbounded: false,
        color: null,
        classForward: []
      };
      props = newProps;
      handleProps();
    },
    destroy: function destroy() {
      if (instance) {
        instance.destroy();
        instance = null;

        _removeClass('mdc-ripple-surface');

        _removeClass('mdc-ripple-surface--primary');

        _removeClass('mdc-ripple-surface--accent');
      }

      if (removeLayoutListener) {
        removeLayoutListener();
      }
    }
  };
}

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function create_default_slot$3(ctx) {
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[20].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[22], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4194304) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[22], dirty, null, null);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$3.name,
    type: "slot",
    source: "(1:0) <svelte:component   this={component}   bind:element={element}   use={[[Ripple, {ripple, unbounded: false, color}], forwardEvents, ...use]}   class=\\\"     mdc-list-item     {className}     {activated ? 'mdc-list-item--activated' : ''}     {selected ? 'mdc-list-item--selected' : ''}     {disabled ? 'mdc-list-item--disabled' : ''}     {(!nav && role === 'menuitem' && selected) ? 'mdc-menu-item--selected' : ''}   \\\"   {...((nav && activated) ? {'aria-current': 'page'} : {})}   {...(!nav ? {role} : {})}   {...((!nav && role === 'option') ? {'aria-selected': (selected ? 'true' : 'false')} : {})}   {...((!nav && (role === 'radio' || role === 'checkbox')) ? {'aria-checked': (checked ? 'true' : 'false')} : {})}   {...(!nav ? {'aria-disabled': (disabled ? 'true' : 'false')} : {})}   {tabindex}   on:click={action}   on:keydown={handleKeydown}   {...exclude($$props, ['use', 'class', 'ripple', 'color', 'nonInteractive', 'activated', 'selected', 'disabled', 'tabindex', 'inputId'])} >",
    ctx: ctx
  });
  return block;
}

function create_fragment$7(ctx) {
  var switch_instance;
  var updating_element;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [{
    use: [[Ripple, {
      ripple:
      /*ripple*/
      ctx[3],
      unbounded: false,
      color:
      /*color*/
      ctx[4]
    }],
    /*forwardEvents*/
    ctx[12]].concat(_toConsumableArray(
    /*use*/
    ctx[1]))
  }, {
    class: "\n    mdc-list-item\n    " +
    /*className*/
    ctx[2] + "\n    " + (
    /*activated*/
    ctx[5] ? "mdc-list-item--activated" : "") + "\n    " + (
    /*selected*/
    ctx[7] ? "mdc-list-item--selected" : "") + "\n    " + (
    /*disabled*/
    ctx[8] ? "mdc-list-item--disabled" : "") + "\n    " + (!
    /*nav*/
    ctx[13] &&
    /*role*/
    ctx[6] === "menuitem" &&
    /*selected*/
    ctx[7] ? "mdc-menu-item--selected" : "") + "\n  "
  },
  /*nav*/
  ctx[13] &&
  /*activated*/
  ctx[5] ? {
    "aria-current": "page"
  } : {}, !
  /*nav*/
  ctx[13] ? {
    role:
    /*role*/
    ctx[6]
  } : {}, !
  /*nav*/
  ctx[13] &&
  /*role*/
  ctx[6] === "option" ? {
    "aria-selected":
    /*selected*/
    ctx[7] ? "true" : "false"
  } : {}, !
  /*nav*/
  ctx[13] && (
  /*role*/
  ctx[6] === "radio" ||
  /*role*/
  ctx[6] === "checkbox") ? {
    "aria-checked":
    /*checked*/
    ctx[10] ? "true" : "false"
  } : {}, !
  /*nav*/
  ctx[13] ? {
    "aria-disabled":
    /*disabled*/
    ctx[8] ? "true" : "false"
  } : {}, {
    tabindex:
    /*tabindex*/
    ctx[0]
  }, exclude(
  /*$$props*/
  ctx[16], ["use", "class", "ripple", "color", "nonInteractive", "activated", "selected", "disabled", "tabindex", "inputId"])];

  function switch_instance_element_binding(value) {
    /*switch_instance_element_binding*/
    ctx[21](value);
  }

  var switch_value =
  /*component*/
  ctx[9];

  function switch_props(ctx) {
    var switch_instance_props = {
      $$slots: {
        default: [create_default_slot$3]
      },
      $$scope: {
        ctx: ctx
      }
    };

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    if (
    /*element*/
    ctx[11] !== void 0) {
      switch_instance_props.element =
      /*element*/
      ctx[11];
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(function () {
      return bind(switch_instance, "element", switch_instance_element_binding);
    });
    switch_instance.$on("click",
    /*action*/
    ctx[14]);
    switch_instance.$on("keydown",
    /*handleKeydown*/
    ctx[15]);
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var switch_instance_changes = dirty &
      /*Ripple, ripple, color, forwardEvents, use, className, activated, selected, disabled, nav, role, checked, tabindex, exclude, $$props*/
      79359 ? get_spread_update(switch_instance_spread_levels, [dirty &
      /*Ripple, ripple, color, forwardEvents, use*/
      4122 && {
        use: [[Ripple, {
          ripple:
          /*ripple*/
          ctx[3],
          unbounded: false,
          color:
          /*color*/
          ctx[4]
        }],
        /*forwardEvents*/
        ctx[12]].concat(_toConsumableArray(
        /*use*/
        ctx[1]))
      }, dirty &
      /*className, activated, selected, disabled, nav, role*/
      8676 && {
        class: "\n    mdc-list-item\n    " +
        /*className*/
        ctx[2] + "\n    " + (
        /*activated*/
        ctx[5] ? "mdc-list-item--activated" : "") + "\n    " + (
        /*selected*/
        ctx[7] ? "mdc-list-item--selected" : "") + "\n    " + (
        /*disabled*/
        ctx[8] ? "mdc-list-item--disabled" : "") + "\n    " + (!
        /*nav*/
        ctx[13] &&
        /*role*/
        ctx[6] === "menuitem" &&
        /*selected*/
        ctx[7] ? "mdc-menu-item--selected" : "") + "\n  "
      }, dirty &
      /*nav, activated*/
      8224 && get_spread_object(
      /*nav*/
      ctx[13] &&
      /*activated*/
      ctx[5] ? {
        "aria-current": "page"
      } : {}), dirty &
      /*nav, role*/
      8256 && get_spread_object(!
      /*nav*/
      ctx[13] ? {
        role:
        /*role*/
        ctx[6]
      } : {}), dirty &
      /*nav, role, selected*/
      8384 && get_spread_object(!
      /*nav*/
      ctx[13] &&
      /*role*/
      ctx[6] === "option" ? {
        "aria-selected":
        /*selected*/
        ctx[7] ? "true" : "false"
      } : {}), dirty &
      /*nav, role, checked*/
      9280 && get_spread_object(!
      /*nav*/
      ctx[13] && (
      /*role*/
      ctx[6] === "radio" ||
      /*role*/
      ctx[6] === "checkbox") ? {
        "aria-checked":
        /*checked*/
        ctx[10] ? "true" : "false"
      } : {}), dirty &
      /*nav, disabled*/
      8448 && get_spread_object(!
      /*nav*/
      ctx[13] ? {
        "aria-disabled":
        /*disabled*/
        ctx[8] ? "true" : "false"
      } : {}), dirty &
      /*tabindex*/
      1 && {
        tabindex:
        /*tabindex*/
        ctx[0]
      }, dirty &
      /*exclude, $$props*/
      65536 && get_spread_object(exclude(
      /*$$props*/
      ctx[16], ["use", "class", "ripple", "color", "nonInteractive", "activated", "selected", "disabled", "tabindex", "inputId"]))]) : {};

      if (dirty &
      /*$$scope*/
      4194304) {
        switch_instance_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (!updating_element && dirty &
      /*element*/
      2048) {
        updating_element = true;
        switch_instance_changes.element =
        /*element*/
        ctx[11];
        add_flush_callback(function () {
          return updating_element = false;
        });
      }

      if (switch_value !== (switch_value =
      /*component*/
      ctx[9])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          binding_callbacks.push(function () {
            return bind(switch_instance, "element", switch_instance_element_binding);
          });
          switch_instance.$on("click",
          /*action*/
          ctx[14]);
          switch_instance.$on("keydown",
          /*handleKeydown*/
          ctx[15]);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var counter = 0;

function instance$7($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Item", slots, ['default']);
  var dispatch = createEventDispatcher();
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var checked = false;
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$ripple = _$$props4.ripple,
      ripple = _$$props4$ripple === void 0 ? true : _$$props4$ripple;
  var _$$props5 = $$props,
      _$$props5$color = _$$props5.color,
      color = _$$props5$color === void 0 ? null : _$$props5$color;
  var _$$props6 = $$props,
      _$$props6$nonInteract = _$$props6.nonInteractive,
      nonInteractive = _$$props6$nonInteract === void 0 ? getContext("SMUI:list:nonInteractive") : _$$props6$nonInteract;
  var _$$props7 = $$props,
      _$$props7$activated = _$$props7.activated,
      activated = _$$props7$activated === void 0 ? false : _$$props7$activated;
  var _$$props8 = $$props,
      _$$props8$role = _$$props8.role,
      role = _$$props8$role === void 0 ? getContext("SMUI:list:item:role") : _$$props8$role;
  var _$$props9 = $$props,
      _$$props9$selected = _$$props9.selected,
      selected = _$$props9$selected === void 0 ? false : _$$props9$selected;
  var _$$props10 = $$props,
      _$$props10$disabled = _$$props10.disabled,
      disabled = _$$props10$disabled === void 0 ? false : _$$props10$disabled;
  var _$$props11 = $$props,
      _$$props11$tabindex = _$$props11.tabindex,
      tabindex = _$$props11$tabindex === void 0 ? !nonInteractive && !disabled && (selected || checked) && "0" || "-1" : _$$props11$tabindex;
  var _$$props12 = $$props,
      _$$props12$inputId = _$$props12.inputId,
      inputId = _$$props12$inputId === void 0 ? "SMUI-form-field-list-" + counter++ : _$$props12$inputId;
  var _$$props13 = $$props,
      _$$props13$href = _$$props13.href,
      href = _$$props13$href === void 0 ? null : _$$props13$href;
  var element;
  var addTabindexIfNoItemsSelectedRaf;
  var nav = getContext("SMUI:list:item:nav");
  var _$$props14 = $$props,
      _$$props14$component = _$$props14.component,
      component = _$$props14$component === void 0 ? nav ? href ? A : Span : Li : _$$props14$component;
  setContext("SMUI:generic:input:props", {
    id: inputId
  });
  setContext("SMUI:generic:input:setChecked", setChecked);
  onMount(function () {
    // Tabindex needs to be '0' if this is the first non-disabled list item, and
    // no other item is selected.
    if (!selected && !nonInteractive) {
      var first = true;
      var el = element;

      while (el.previousSibling) {
        el = el.previousSibling;

        if (el.nodeType === 1 && el.classList.contains("mdc-list-item") && !el.classList.contains("mdc-list-item--disabled")) {
          first = false;
          break;
        }
      }

      if (first) {
        // This is first, so now set up a check that no other items are
        // selected.
        addTabindexIfNoItemsSelectedRaf = window.requestAnimationFrame(addTabindexIfNoItemsSelected);
      }
    }
  });
  onDestroy(function () {
    if (addTabindexIfNoItemsSelectedRaf) {
      window.cancelAnimationFrame(addTabindexIfNoItemsSelectedRaf);
    }
  });

  function addTabindexIfNoItemsSelected() {
    // Look through next siblings to see if none of them are selected.
    var noneSelected = true;
    var el = element;

    while (el.nextSibling) {
      el = el.nextSibling;

      if (el.nodeType === 1 && el.classList.contains("mdc-list-item") && el.attributes["tabindex"] && el.attributes["tabindex"].value === "0") {
        noneSelected = false;
        break;
      }
    }

    if (noneSelected) {
      // This is the first element, and no other element is selected, so the
      // tabindex should be '0'.
      $$invalidate(0, tabindex = "0");
    }
  }

  function action(e) {
    if (disabled) {
      e.preventDefault();
    } else {
      dispatch("SMUI:action", e);
    }
  }

  function handleKeydown(e) {
    var isEnter = e.key === "Enter" || e.keyCode === 13;
    var isSpace = e.key === "Space" || e.keyCode === 32;

    if (isEnter || isSpace) {
      action(e);
    }
  }

  function setChecked(isChecked) {
    $$invalidate(10, checked = isChecked);
    $$invalidate(0, tabindex = !nonInteractive && !disabled && (selected || checked) && "0" || "-1");
  }

  function switch_instance_element_binding(value) {
    element = value;
    $$invalidate(11, element);
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(16, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(3, ripple = $$new_props.ripple);
    if ("color" in $$new_props) $$invalidate(4, color = $$new_props.color);
    if ("nonInteractive" in $$new_props) $$invalidate(17, nonInteractive = $$new_props.nonInteractive);
    if ("activated" in $$new_props) $$invalidate(5, activated = $$new_props.activated);
    if ("role" in $$new_props) $$invalidate(6, role = $$new_props.role);
    if ("selected" in $$new_props) $$invalidate(7, selected = $$new_props.selected);
    if ("disabled" in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
    if ("tabindex" in $$new_props) $$invalidate(0, tabindex = $$new_props.tabindex);
    if ("inputId" in $$new_props) $$invalidate(18, inputId = $$new_props.inputId);
    if ("href" in $$new_props) $$invalidate(19, href = $$new_props.href);
    if ("component" in $$new_props) $$invalidate(9, component = $$new_props.component);
    if ("$$scope" in $$new_props) $$invalidate(22, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      counter: counter,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      createEventDispatcher: createEventDispatcher,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      A: A,
      Span: Span,
      Li: Li,
      Ripple: Ripple,
      dispatch: dispatch,
      forwardEvents: forwardEvents,
      checked: checked,
      use: use,
      className: className,
      ripple: ripple,
      color: color,
      nonInteractive: nonInteractive,
      activated: activated,
      role: role,
      selected: selected,
      disabled: disabled,
      tabindex: tabindex,
      inputId: inputId,
      href: href,
      element: element,
      addTabindexIfNoItemsSelectedRaf: addTabindexIfNoItemsSelectedRaf,
      nav: nav,
      component: component,
      addTabindexIfNoItemsSelected: addTabindexIfNoItemsSelected,
      action: action,
      handleKeydown: handleKeydown,
      setChecked: setChecked
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(16, $$props = assign(assign({}, $$props), $$new_props));
    if ("checked" in $$props) $$invalidate(10, checked = $$new_props.checked);
    if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(3, ripple = $$new_props.ripple);
    if ("color" in $$props) $$invalidate(4, color = $$new_props.color);
    if ("nonInteractive" in $$props) $$invalidate(17, nonInteractive = $$new_props.nonInteractive);
    if ("activated" in $$props) $$invalidate(5, activated = $$new_props.activated);
    if ("role" in $$props) $$invalidate(6, role = $$new_props.role);
    if ("selected" in $$props) $$invalidate(7, selected = $$new_props.selected);
    if ("disabled" in $$props) $$invalidate(8, disabled = $$new_props.disabled);
    if ("tabindex" in $$props) $$invalidate(0, tabindex = $$new_props.tabindex);
    if ("inputId" in $$props) $$invalidate(18, inputId = $$new_props.inputId);
    if ("href" in $$props) $$invalidate(19, href = $$new_props.href);
    if ("element" in $$props) $$invalidate(11, element = $$new_props.element);
    if ("addTabindexIfNoItemsSelectedRaf" in $$props) addTabindexIfNoItemsSelectedRaf = $$new_props.addTabindexIfNoItemsSelectedRaf;
    if ("nav" in $$props) $$invalidate(13, nav = $$new_props.nav);
    if ("component" in $$props) $$invalidate(9, component = $$new_props.component);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [tabindex, use, className, ripple, color, activated, role, selected, disabled, component, checked, element, forwardEvents, nav, action, handleKeydown, $$props, nonInteractive, inputId, href, slots, switch_instance_element_binding, $$scope];
}

var Item = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Item, _SvelteComponentDev);

  var _super = _createSuper$7(Item);

  function Item(options) {
    var _this;

    _classCallCheck(this, Item);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {
      use: 1,
      class: 2,
      ripple: 3,
      color: 4,
      nonInteractive: 17,
      activated: 5,
      role: 6,
      selected: 7,
      disabled: 8,
      tabindex: 0,
      inputId: 18,
      href: 19,
      component: 9
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Item",
      options: options,
      id: create_fragment$7.name
    });
    return _this;
  }

  _createClass(Item, [{
    key: "use",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nonInteractive",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "activated",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "role",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selected",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "disabled",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "tabindex",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "inputId",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "component",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Item;
}(SvelteComponentDev);

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function create_default_slot$2(ctx) {
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[11].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[13], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8192) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[13], dirty, null, null);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$2.name,
    type: "slot",
    source: "(1:0) <Item   bind:this={element}   use={[forwardEvents, ...use]}   data-value={value}   {selected}   {...exclude($$props, ['use', 'value', 'selected'])} >",
    ctx: ctx
  });
  return block;
}

function create_fragment$6(ctx) {
  var item;
  var current;
  var item_spread_levels = [{
    use: [
    /*forwardEvents*/
    ctx[4]].concat(_toConsumableArray(
    /*use*/
    ctx[0]))
  }, {
    "data-value":
    /*value*/
    ctx[1]
  }, {
    selected:
    /*selected*/
    ctx[3]
  }, exclude(
  /*$$props*/
  ctx[7], ["use", "value", "selected"])];
  var item_props = {
    $$slots: {
      default: [create_default_slot$2]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < item_spread_levels.length; i += 1) {
    item_props = assign(item_props, item_spread_levels[i]);
  }

  item = new Item({
    props: item_props,
    $$inline: true
  });
  /*item_binding*/

  ctx[12](item);
  var block = {
    c: function create() {
      create_component(item.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var item_changes = dirty &
      /*forwardEvents, use, value, selected, exclude, $$props*/
      155 ? get_spread_update(item_spread_levels, [dirty &
      /*forwardEvents, use*/
      17 && {
        use: [
        /*forwardEvents*/
        ctx[4]].concat(_toConsumableArray(
        /*use*/
        ctx[0]))
      }, dirty &
      /*value*/
      2 && {
        "data-value":
        /*value*/
        ctx[1]
      }, dirty &
      /*selected*/
      8 && {
        selected:
        /*selected*/
        ctx[3]
      }, dirty &
      /*exclude, $$props*/
      128 && get_spread_object(exclude(
      /*$$props*/
      ctx[7], ["use", "value", "selected"]))]) : {};

      if (dirty &
      /*$$scope*/
      8192) {
        item_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      item.$set(item_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      /*item_binding*/
      ctx[12](null);
      destroy_component(item, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$6($$self, $$props, $$invalidate) {
  var selected;
  var $valueStore;
  var $selectedText;
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Option", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());

  var uninitializedValue = function uninitializedValue() {};

  var valueStore = getContext("SMUI:select:value");
  validate_store(valueStore, "valueStore");
  component_subscribe($$self, valueStore, function (value) {
    return $$invalidate(10, $valueStore = value);
  });
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var className = "";
  var _$$props3 = $$props,
      _$$props3$value = _$$props3.value,
      value = _$$props3$value === void 0 ? "" : _$$props3$value;
  var _$$props4 = $$props,
      _$$props4$selected = _$$props4.selected,
      selectedProp = _$$props4$selected === void 0 ? uninitializedValue : _$$props4$selected;
  var element;
  var selectedText = getContext("SMUI:select:selectedText");
  validate_store(selectedText, "selectedText");
  component_subscribe($$self, selectedText, function (value) {
    return $$invalidate(14, $selectedText = value);
  });
  setContext("SMUI:list:item:role", "option");

  function item_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(2, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("value" in $$new_props) $$invalidate(1, value = $$new_props.value);
    if ("selected" in $$new_props) $$invalidate(9, selectedProp = $$new_props.selected);
    if ("$$scope" in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      Item: Item,
      forwardEvents: forwardEvents,
      uninitializedValue: uninitializedValue,
      valueStore: valueStore,
      use: use,
      className: className,
      value: value,
      selectedProp: selectedProp,
      element: element,
      selectedText: selectedText,
      selected: selected,
      $valueStore: $valueStore,
      $selectedText: $selectedText
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("value" in $$props) $$invalidate(1, value = $$new_props.value);
    if ("selectedProp" in $$props) $$invalidate(9, selectedProp = $$new_props.selectedProp);
    if ("element" in $$props) $$invalidate(2, element = $$new_props.element);
    if ("selected" in $$props) $$invalidate(3, selected = $$new_props.selected);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*selectedProp, value, $valueStore*/
    1538) {
      $$invalidate(3, selected = selectedProp === uninitializedValue ? value !== "" && $valueStore === value : selectedProp);
    }

    if ($$self.$$.dirty &
    /*selected, element*/
    12) {
      if (selected && element) {
        set_store_value(selectedText, $selectedText = element.textContent || "", $selectedText);
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, value, element, selected, forwardEvents, valueStore, selectedText, $$props, className, selectedProp, $valueStore, slots, item_binding, $$scope];
}

var Option = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Option, _SvelteComponentDev);

  var _super = _createSuper$6(Option);

  function Option(options) {
    var _this;

    _classCallCheck(this, Option);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
      use: 0,
      class: 8,
      value: 1,
      selected: 9
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Option",
      options: options,
      id: create_fragment$6.name
    });
    return _this;
  }

  _createClass(Option, [{
    key: "use",
    get: function get() {
      throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      return this.$$.ctx[8];
    },
    set: function set(value) {
      throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "value",
    get: function get() {
      throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selected",
    get: function get() {
      throw new Error("<Option>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Option>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Option;
}(SvelteComponentDev);

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "src/components/Controllers/LocaleSwitcher.svelte";

function add_css$4() {
  var style = element("style");
  style.id = "svelte-1gglync-style";
  style.textContent = ".choose-locale.svelte-1gglync{display:flex;justify-content:center}.select.svelte-1gglync{margin:0 1rem 1rem;max-width:55px}.mdc-select__selected-text{min-width:0!important}.mdc-menu{min-width:0!important}.select-width{max-width:55px;width:55px}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYWxlU3dpdGNoZXIuc3ZlbHRlIiwic291cmNlcyI6WyJMb2NhbGVTd2l0Y2hlci5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcInN2ZWx0ZVwiO1xuICBpbXBvcnQgU2VsZWN0LCB7T3B0aW9ufSBmcm9tICdAc211aS9zZWxlY3QnO1xuICBsZXQgbGFuZ3VhZ2VzID0gWydsdCcsICdlbicsICdydSddO1xuICBleHBvcnQgbGV0IHZhbHVlID0gJ2x0JztcbiAgaW1wb3J0IHsgXyB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9pMThuXCI7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcblxuICBmdW5jdGlvbiBzd2l0Y2hMb2NhbGUoZXZlbnQpIHtcbiAgICBkaXNwYXRjaChcImxvY2FsZS1jaGFuZ2VkXCIsIGV2ZW50KTtcbiAgfVxuPC9zY3JpcHQ+XG5cbjxkaXYgY2xhc3M9XCJjaG9vc2UtbG9jYWxlXCI+XG4gIDxkaXYgY2xhc3M9XCJzZWxlY3RcIj5cbiAgICA8U2VsZWN0XG4gICAgICBiaW5kOnZhbHVlPXt2YWx1ZX1cbiAgICAgIGxhYmVsPVwieyRfKCduYXYubG9jYWxlU3dpdGNoZXIubGFuZ3VhZ2UnKX1cIlxuICAgICAgYW5jaG9yJGNsYXNzPVwic2VsZWN0LXdpZHRoXCJcbiAgICAgIG1lbnUkY2xhc3M9XCJzZWxlY3Qtd2lkdGhcIlxuICAgID5cbiAgICAgIHsjZWFjaCBsYW5ndWFnZXMgYXMgbGFuZ3VhZ2V9XG4gICAgICAgIDxPcHRpb24gdmFsdWU9e2xhbmd1YWdlfSBvbjpjbGljaz17ICgpID0+IHsgc3dpdGNoTG9jYWxlKGxhbmd1YWdlKSB9IH0+e2xhbmd1YWdlfTwvT3B0aW9uPlxuICAgICAgey9lYWNofVxuICAgIDwvU2VsZWN0PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5cbjxzdHlsZT5cbiAgLmNob29zZS1sb2NhbGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIH1cbiAgLnNlbGVjdCB7XG4gICAgbWFyZ2luOiAwIDFyZW0gMXJlbTtcbiAgICBtYXgtd2lkdGg6IDU1cHg7XG4gIH1cblxuICA6Z2xvYmFsKC5tZGMtc2VsZWN0X19zZWxlY3RlZC10ZXh0KSAge1xuICAgIG1pbi13aWR0aDogMCFpbXBvcnRhbnQ7XG4gIH1cblxuICA6Z2xvYmFsKC5tZGMtbWVudSkge1xuICAgICAgbWluLXdpZHRoOiAwIWltcG9ydGFudDtcbiAgICB9XG5cbiAgOmdsb2JhbCguc2VsZWN0LXdpZHRoKSB7XG4gICAgbWF4LXdpZHRoOiA1NXB4O1xuICAgIHdpZHRoOiA1NXB4O1xuICB9XG5cblxuXG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStCRSxjQUFjLGVBQUMsQ0FBQyxBQUNkLE9BQU8sQ0FBRSxJQUFJLENBQ2IsZUFBZSxDQUFFLE1BQU0sQUFDekIsQ0FBQyxBQUNELE9BQU8sZUFBQyxDQUFDLEFBQ1AsTUFBTSxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQixTQUFTLENBQUUsSUFBSSxBQUNqQixDQUFDLEFBRU8sMEJBQTBCLEFBQUcsQ0FBQyxBQUNwQyxTQUFTLENBQUUsQ0FBQyxVQUFVLEFBQ3hCLENBQUMsQUFFTyxTQUFTLEFBQUUsQ0FBQyxBQUNoQixTQUFTLENBQUUsQ0FBQyxVQUFVLEFBQ3hCLENBQUMsQUFFSyxhQUFhLEFBQUUsQ0FBQyxBQUN0QixTQUFTLENBQUUsSUFBSSxDQUNmLEtBQUssQ0FBRSxJQUFJLEFBQ2IsQ0FBQyJ9 */";
  append_dev(document.head, style);
}

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
} // (24:8) <Option value={language} on:click={ () => { switchLocale(language) } }>


function create_default_slot_1(ctx) {
  var t_value =
  /*language*/
  ctx[7] + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(24:8) <Option value={language} on:click={ () => { switchLocale(language) } }>",
    ctx: ctx
  });
  return block;
} // (23:6) {#each languages as language}


function create_each_block(ctx) {
  var option;
  var current;

  function click_handler() {
    return (
      /*click_handler*/
      ctx[4](
      /*language*/
      ctx[7])
    );
  }

  option = new Option({
    props: {
      value:
      /*language*/
      ctx[7],
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  option.$on("click", click_handler);
  var block = {
    c: function create() {
      create_component(option.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(option.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(option, target, anchor);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      var option_changes = {};

      if (dirty &
      /*$$scope*/
      1024) {
        option_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      option.$set(option_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(option.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(option.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(option, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(23:6) {#each languages as language}",
    ctx: ctx
  });
  return block;
} // (17:4) <Select       bind:value={value}       label="{$_('nav.localeSwitcher.language')}"       anchor$class="select-width"       menu$class="select-width"     >


function create_default_slot$1(ctx) {
  var each_1_anchor;
  var current;
  var each_value =
  /*languages*/
  ctx[2];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*languages, switchLocale*/
      12) {
        each_value =
        /*languages*/
        ctx[2];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i4 = each_value.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$1.name,
    type: "slot",
    source: "(17:4) <Select       bind:value={value}       label=\\\"{$_('nav.localeSwitcher.language')}\\\"       anchor$class=\\\"select-width\\\"       menu$class=\\\"select-width\\\"     >",
    ctx: ctx
  });
  return block;
}

function create_fragment$5(ctx) {
  var div1;
  var div0;
  var select;
  var updating_value;
  var current;

  function select_value_binding(value) {
    /*select_value_binding*/
    ctx[5](value);
  }

  var select_props = {
    label:
    /*$_*/
    ctx[1]("nav.localeSwitcher.language"),
    anchor$class: "select-width",
    menu$class: "select-width",
    $$slots: {
      default: [create_default_slot$1]
    },
    $$scope: {
      ctx: ctx
    }
  };

  if (
  /*value*/
  ctx[0] !== void 0) {
    select_props.value =
    /*value*/
    ctx[0];
  }

  select = new Select({
    props: select_props,
    $$inline: true
  });
  binding_callbacks.push(function () {
    return bind(select, "value", select_value_binding);
  });
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      create_component(select.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(select.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "select svelte-1gglync");
      add_location(div0, file$4, 15, 2, 377);
      attr_dev(div1, "class", "choose-locale svelte-1gglync");
      add_location(div1, file$4, 14, 0, 347);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, div0);
      mount_component(select, div0, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var select_changes = {};
      if (dirty &
      /*$_*/
      2) select_changes.label =
      /*$_*/
      ctx[1]("nav.localeSwitcher.language");

      if (dirty &
      /*$$scope*/
      1024) {
        select_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (!updating_value && dirty &
      /*value*/
      1) {
        updating_value = true;
        select_changes.value =
        /*value*/
        ctx[0];
        add_flush_callback(function () {
          return updating_value = false;
        });
      }

      select.$set(select_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(select.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(select.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      destroy_component(select);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$5($$self, $$props, $$invalidate) {
  var $_;
  validate_store(ne, "_");
  component_subscribe($$self, ne, function ($$value) {
    return $$invalidate(1, $_ = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("LocaleSwitcher", slots, []);
  var languages = ["lt", "en", "ru"];
  var _$$props$value = $$props.value,
      value = _$$props$value === void 0 ? "lt" : _$$props$value;
  var dispatch = createEventDispatcher();

  function switchLocale(event) {
    dispatch("locale-changed", event);
  }

  var writable_props = ["value"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<LocaleSwitcher> was created with unknown prop '".concat(key, "'"));
  });

  var click_handler = function click_handler(language) {
    switchLocale(language);
  };

  function select_value_binding(value$1) {
    value = value$1;
    $$invalidate(0, value);
  }

  $$self.$$set = function ($$props) {
    if ("value" in $$props) $$invalidate(0, value = $$props.value);
  };

  $$self.$capture_state = function () {
    return {
      createEventDispatcher: createEventDispatcher,
      Select: Select,
      Option: Option,
      languages: languages,
      value: value,
      _: ne,
      dispatch: dispatch,
      switchLocale: switchLocale,
      $_: $_
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("languages" in $$props) $$invalidate(2, languages = $$props.languages);
    if ("value" in $$props) $$invalidate(0, value = $$props.value);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [value, $_, languages, switchLocale, click_handler, select_value_binding];
}

var LocaleSwitcher = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(LocaleSwitcher, _SvelteComponentDev);

  var _super = _createSuper$5(LocaleSwitcher);

  function LocaleSwitcher(options) {
    var _this;

    _classCallCheck(this, LocaleSwitcher);

    _this = _super.call(this, options);
    if (!document.getElementById("svelte-1gglync-style")) add_css$4();
    init$1(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      value: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "LocaleSwitcher",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }

  _createClass(LocaleSwitcher, [{
    key: "value",
    get: function get() {
      throw new Error("<LocaleSwitcher>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LocaleSwitcher>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return LocaleSwitcher;
}(SvelteComponentDev);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "src/components/Nav.svelte";

function add_css$3() {
  var style = element("style");
  style.id = "svelte-1913wcy-style";
  style.textContent = "nav.svelte-1913wcy.svelte-1913wcy{border-bottom:1px solid rgba(255, 62, 0, 0.1);font-weight:300;padding:0 1em;display:flex;justify-content:center}ul.svelte-1913wcy.svelte-1913wcy{margin:0;padding:0}ul.svelte-1913wcy.svelte-1913wcy::after{content:\"\";display:block;clear:both}li.svelte-1913wcy.svelte-1913wcy{display:block;float:left}[aria-current].svelte-1913wcy.svelte-1913wcy{position:relative;display:inline-block}[aria-current].svelte-1913wcy.svelte-1913wcy::after{position:absolute;content:\"\";width:calc(100% - 1em);height:2px;background-color:rgb(255, 62, 0);display:block;bottom:-1px}nav.svelte-1913wcy .content-container.svelte-1913wcy{display:flex;justify-content:space-between;align-items:center}a.svelte-1913wcy.svelte-1913wcy{text-decoration:none;padding:1em 0.5em;display:block}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2LnN2ZWx0ZSIsInNvdXJjZXMiOlsiTmF2LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICBleHBvcnQgbGV0IHNlZ21lbnQ7XG4gIGltcG9ydCB7IF8sIGxvY2FsZSwgc2V0dXBJMThuIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2kxOG5cIjtcbiAgaW1wb3J0IExvY2FsZVN3aXRjaGVyIGZyb20gXCIuL0NvbnRyb2xsZXJzL0xvY2FsZVN3aXRjaGVyLnN2ZWx0ZVwiO1xuPC9zY3JpcHQ+XG5cbjxuYXY+XG4gIDxkaXYgY2xhc3M9XCJjb250ZW50LWNvbnRhaW5lclwiPlxuICAgIDx1bD5cbiAgICAgIDxsaT5cbiAgICAgICAgPGEgYXJpYS1jdXJyZW50PXtzZWdtZW50ID09PSB1bmRlZmluZWQgPyBcInBhZ2VcIiA6IHVuZGVmaW5lZH0gaHJlZj1cIi5cIlxuICAgICAgICAgID57JF8oXCJuYXYubGlua1RleHQxXCIpfTwvYVxuICAgICAgICA+XG4gICAgICA8L2xpPlxuICAgICAgPGxpPlxuICAgICAgICA8YSBhcmlhLWN1cnJlbnQ9e3NlZ21lbnQgPT09IFwiYWJvdXRcIiA/IFwicGFnZVwiIDogdW5kZWZpbmVkfSBocmVmPVwiYWJvdXRcIlxuICAgICAgICAgID57JF8oXCJuYXYubGlua1RleHQyXCIpfTwvYVxuICAgICAgICA+XG4gICAgICA8L2xpPlxuICAgICAgPGxpPlxuICAgICAgICA8YVxuICAgICAgICAgIGFyaWEtY3VycmVudD17c2VnbWVudCA9PT0gXCJjb250YWN0c1wiID8gXCJwYWdlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgaHJlZj1cImNvbnRhY3RzXCI+eyRfKFwibmF2LmxpbmtUZXh0M1wiKX08L2FcbiAgICAgICAgPlxuICAgICAgPC9saT5cbiAgXG4gICAgICA8IS0tIGZvciB0aGUgYmxvZyBsaW5rLCB3ZSdyZSB1c2luZyByZWw9cHJlZmV0Y2ggc28gdGhhdCBTYXBwZXIgcHJlZmV0Y2hlc1xuICAgICAgICAgICB0aGUgYmxvZyBkYXRhIHdoZW4gd2UgaG92ZXIgb3ZlciB0aGUgbGluayBvciB0YXAgaXQgb24gYSB0b3VjaHNjcmVlbiAtLT5cbiAgICAgIDwhLS0gPGxpPlxuICAgICAgICA8YVxuICAgICAgICAgIHJlbD1cInByZWZldGNoXCJcbiAgICAgICAgICBhcmlhLWN1cnJlbnQ9e3NlZ21lbnQgPT09IFwiYmxvZ1wiID8gXCJwYWdlXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgaHJlZj1cImJsb2dcIj5ibG9nPC9hXG4gICAgICAgICAgXG4gICAgICAgID5cbiAgICAgIDwvbGk+IC0tPlxuICAgIDwvdWw+XG4gIFxuICAgIDxMb2NhbGVTd2l0Y2hlclxuICAgICAgdmFsdWU9eyRsb2NhbGV9XG4gICAgICBvbjpsb2NhbGUtY2hhbmdlZD17KGUpID0+IHNldHVwSTE4bih7IHdpdGhMb2NhbGU6IGUuZGV0YWlsIH0pfVxuICAgIC8+XG4gIDwvZGl2PlxuIFxuPC9uYXY+XG5cbjxzdHlsZT5cbiAgbmF2IHtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDYyLCAwLCAwLjEpO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgcGFkZGluZzogMCAxZW07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICB9XG5cbiAgdWwge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgLyogY2xlYXJmaXggKi9cbiAgdWw6OmFmdGVyIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGNsZWFyOiBib3RoO1xuICB9XG5cbiAgbGkge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG5cbiAgW2FyaWEtY3VycmVudF0ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cblxuICBbYXJpYS1jdXJyZW50XTo6YWZ0ZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAxZW0pO1xuICAgIGhlaWdodDogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDYyLCAwKTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBib3R0b206IC0xcHg7XG4gIH1cblxuICBuYXYgLmNvbnRlbnQtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgfVxuXG4gIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBwYWRkaW5nOiAxZW0gMC41ZW07XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0NFLEdBQUcsOEJBQUMsQ0FBQyxBQUNILGFBQWEsQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQzlDLFdBQVcsQ0FBRSxHQUFHLENBQ2hCLE9BQU8sQ0FBRSxDQUFDLENBQUMsR0FBRyxDQUNkLE9BQU8sQ0FBRSxJQUFJLENBQ2IsZ0JBQWdCLE1BQU0sQUFDeEIsQ0FBQyxBQUVELEVBQUUsOEJBQUMsQ0FBQyxBQUNGLE1BQU0sQ0FBRSxDQUFDLENBQ1QsT0FBTyxDQUFFLENBQUMsQUFDWixDQUFDLEFBR0QsZ0NBQUUsT0FBTyxBQUFDLENBQUMsQUFDVCxPQUFPLENBQUUsRUFBRSxDQUNYLE9BQU8sQ0FBRSxLQUFLLENBQ2QsS0FBSyxDQUFFLElBQUksQUFDYixDQUFDLEFBRUQsRUFBRSw4QkFBQyxDQUFDLEFBQ0YsT0FBTyxDQUFFLEtBQUssQ0FDZCxLQUFLLENBQUUsSUFBSSxBQUNiLENBQUMsQUFFRCxDQUFDLFlBQVksQ0FBQyw4QkFBQyxDQUFDLEFBQ2QsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsT0FBTyxDQUFFLFlBQVksQUFDdkIsQ0FBQyxBQUVELENBQUMsWUFBWSwrQkFBQyxPQUFPLEFBQUMsQ0FBQyxBQUNyQixRQUFRLENBQUUsUUFBUSxDQUNsQixPQUFPLENBQUUsRUFBRSxDQUNYLEtBQUssQ0FBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ3ZCLE1BQU0sQ0FBRSxHQUFHLENBQ1gsZ0JBQWdCLENBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDakMsT0FBTyxDQUFFLEtBQUssQ0FDZCxNQUFNLENBQUUsSUFBSSxBQUNkLENBQUMsQUFFRCxrQkFBRyxDQUFDLGtCQUFrQixlQUFDLENBQUMsQUFDdEIsT0FBTyxDQUFFLElBQUksQ0FDYixnQkFBZ0IsYUFBYSxDQUM3QixZQUFZLE1BQU0sQUFDcEIsQ0FBQyxBQUVELENBQUMsOEJBQUMsQ0FBQyxBQUNELGVBQWUsQ0FBRSxJQUFJLENBQ3JCLE9BQU8sQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUNsQixPQUFPLENBQUUsS0FBSyxBQUNoQixDQUFDIn0= */";
  append_dev(document.head, style);
}

function create_fragment$4(ctx) {
  var nav;
  var div;
  var ul;
  var li0;
  var a0;
  var t0_value =
  /*$_*/
  ctx[1]("nav.linkText1") + "";
  var t0;
  var a0_aria_current_value;
  var t1;
  var li1;
  var a1;
  var t2_value =
  /*$_*/
  ctx[1]("nav.linkText2") + "";
  var t2;
  var a1_aria_current_value;
  var t3;
  var li2;
  var a2;
  var t4_value =
  /*$_*/
  ctx[1]("nav.linkText3") + "";
  var t4;
  var a2_aria_current_value;
  var t5;
  var localeswitcher;
  var current;
  localeswitcher = new LocaleSwitcher({
    props: {
      value:
      /*$locale*/
      ctx[2]
    },
    $$inline: true
  });
  localeswitcher.$on("locale-changed",
  /*locale_changed_handler*/
  ctx[3]);
  var block = {
    c: function create() {
      nav = element("nav");
      div = element("div");
      ul = element("ul");
      li0 = element("li");
      a0 = element("a");
      t0 = text(t0_value);
      t1 = space();
      li1 = element("li");
      a1 = element("a");
      t2 = text(t2_value);
      t3 = space();
      li2 = element("li");
      a2 = element("a");
      t4 = text(t4_value);
      t5 = space();
      create_component(localeswitcher.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      div = claim_element(nav_nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      ul = claim_element(div_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      li0 = claim_element(ul_nodes, "LI", {
        class: true
      });
      var li0_nodes = children(li0);
      a0 = claim_element(li0_nodes, "A", {
        "aria-current": true,
        href: true,
        class: true
      });
      var a0_nodes = children(a0);
      t0 = claim_text(a0_nodes, t0_value);
      a0_nodes.forEach(detach_dev);
      li0_nodes.forEach(detach_dev);
      t1 = claim_space(ul_nodes);
      li1 = claim_element(ul_nodes, "LI", {
        class: true
      });
      var li1_nodes = children(li1);
      a1 = claim_element(li1_nodes, "A", {
        "aria-current": true,
        href: true,
        class: true
      });
      var a1_nodes = children(a1);
      t2 = claim_text(a1_nodes, t2_value);
      a1_nodes.forEach(detach_dev);
      li1_nodes.forEach(detach_dev);
      t3 = claim_space(ul_nodes);
      li2 = claim_element(ul_nodes, "LI", {
        class: true
      });
      var li2_nodes = children(li2);
      a2 = claim_element(li2_nodes, "A", {
        "aria-current": true,
        href: true,
        class: true
      });
      var a2_nodes = children(a2);
      t4 = claim_text(a2_nodes, t4_value);
      a2_nodes.forEach(detach_dev);
      li2_nodes.forEach(detach_dev);
      ul_nodes.forEach(detach_dev);
      t5 = claim_space(div_nodes);
      claim_component(localeswitcher.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a0, "aria-current", a0_aria_current_value =
      /*segment*/
      ctx[0] === undefined ? "page" : undefined);
      attr_dev(a0, "href", ".");
      attr_dev(a0, "class", "svelte-1913wcy");
      add_location(a0, file$3, 10, 8, 237);
      attr_dev(li0, "class", "svelte-1913wcy");
      add_location(li0, file$3, 9, 6, 224);
      attr_dev(a1, "aria-current", a1_aria_current_value =
      /*segment*/
      ctx[0] === "about" ? "page" : undefined);
      attr_dev(a1, "href", "about");
      attr_dev(a1, "class", "svelte-1913wcy");
      add_location(a1, file$3, 15, 8, 384);
      attr_dev(li1, "class", "svelte-1913wcy");
      add_location(li1, file$3, 14, 6, 371);
      attr_dev(a2, "aria-current", a2_aria_current_value =
      /*segment*/
      ctx[0] === "contacts" ? "page" : undefined);
      attr_dev(a2, "href", "contacts");
      attr_dev(a2, "class", "svelte-1913wcy");
      add_location(a2, file$3, 20, 8, 533);
      attr_dev(li2, "class", "svelte-1913wcy");
      add_location(li2, file$3, 19, 6, 520);
      attr_dev(ul, "class", "svelte-1913wcy");
      add_location(ul, file$3, 8, 4, 213);
      attr_dev(div, "class", "content-container svelte-1913wcy");
      add_location(div, file$3, 7, 2, 177);
      attr_dev(nav, "class", "svelte-1913wcy");
      add_location(nav, file$3, 6, 0, 169);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);
      append_dev(nav, div);
      append_dev(div, ul);
      append_dev(ul, li0);
      append_dev(li0, a0);
      append_dev(a0, t0);
      append_dev(ul, t1);
      append_dev(ul, li1);
      append_dev(li1, a1);
      append_dev(a1, t2);
      append_dev(ul, t3);
      append_dev(ul, li2);
      append_dev(li2, a2);
      append_dev(a2, t4);
      append_dev(div, t5);
      mount_component(localeswitcher, div, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if ((!current || dirty &
      /*$_*/
      2) && t0_value !== (t0_value =
      /*$_*/
      ctx[1]("nav.linkText1") + "")) set_data_dev(t0, t0_value);

      if (!current || dirty &
      /*segment*/
      1 && a0_aria_current_value !== (a0_aria_current_value =
      /*segment*/
      ctx[0] === undefined ? "page" : undefined)) {
        attr_dev(a0, "aria-current", a0_aria_current_value);
      }

      if ((!current || dirty &
      /*$_*/
      2) && t2_value !== (t2_value =
      /*$_*/
      ctx[1]("nav.linkText2") + "")) set_data_dev(t2, t2_value);

      if (!current || dirty &
      /*segment*/
      1 && a1_aria_current_value !== (a1_aria_current_value =
      /*segment*/
      ctx[0] === "about" ? "page" : undefined)) {
        attr_dev(a1, "aria-current", a1_aria_current_value);
      }

      if ((!current || dirty &
      /*$_*/
      2) && t4_value !== (t4_value =
      /*$_*/
      ctx[1]("nav.linkText3") + "")) set_data_dev(t4, t4_value);

      if (!current || dirty &
      /*segment*/
      1 && a2_aria_current_value !== (a2_aria_current_value =
      /*segment*/
      ctx[0] === "contacts" ? "page" : undefined)) {
        attr_dev(a2, "aria-current", a2_aria_current_value);
      }

      var localeswitcher_changes = {};
      if (dirty &
      /*$locale*/
      4) localeswitcher_changes.value =
      /*$locale*/
      ctx[2];
      localeswitcher.$set(localeswitcher_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(localeswitcher.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(localeswitcher.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav);
      destroy_component(localeswitcher);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var $_;
  var $locale;
  validate_store(ne, "_");
  component_subscribe($$self, ne, function ($$value) {
    return $$invalidate(1, $_ = $$value);
  });
  validate_store(L, "locale");
  component_subscribe($$self, L, function ($$value) {
    return $$invalidate(2, $locale = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("Nav", slots, []);
  var segment = $$props.segment;
  var writable_props = ["segment"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Nav> was created with unknown prop '".concat(key, "'"));
  });

  var locale_changed_handler = function locale_changed_handler(e) {
    return setupI18n({
      withLocale: e.detail
    });
  };

  $$self.$$set = function ($$props) {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
  };

  $$self.$capture_state = function () {
    return {
      segment: segment,
      _: ne,
      locale: L,
      setupI18n: setupI18n,
      LocaleSwitcher: LocaleSwitcher,
      $_: $_,
      $locale: $locale
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [segment, $_, $locale, locale_changed_handler];
}

var Nav = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Nav, _SvelteComponentDev);

  var _super = _createSuper$4(Nav);

  function Nav(options) {
    var _this;

    _classCallCheck(this, Nav);

    _this = _super.call(this, options);
    if (!document.getElementById("svelte-1913wcy-style")) add_css$3();
    init$1(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      segment: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Nav",
      options: options,
      id: create_fragment$4.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*segment*/
    ctx[0] === undefined && !("segment" in props)) {
      console.warn("<Nav> was created without expected prop 'segment'");
    }

    return _this;
  }

  _createClass(Nav, [{
    key: "segment",
    get: function get() {
      throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Nav;
}(SvelteComponentDev);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "src/components/Footer.svelte";

function add_css$2() {
  var style = element("style");
  style.id = "svelte-1r2xji3-style";
  style.textContent = "footer.svelte-1r2xji3.svelte-1r2xji3{font-weight:300;padding:0 1em;position:fixed;bottom:0px;height:50px;border-top:1px solid rgba(255, 62, 0, 0.1);width:calc(100% - 2em);z-index:1000;background:white;display:flex;justify-content:center;align-items:center}.copyright.svelte-1r2xji3.svelte-1r2xji3{display:flex;align-items:center}.content-container.svelte-1r2xji3.svelte-1r2xji3{display:flex}.footer-contacts.svelte-1r2xji3.svelte-1r2xji3{display:flex;align-items:center}.footer-contacts.svelte-1r2xji3 a.svelte-1r2xji3,.copyright.svelte-1r2xji3.svelte-1r2xji3{font-size:16px;padding:15px}@media(max-width: 400px){.footer-contacts.svelte-1r2xji3 a.svelte-1r2xji3,.copyright.svelte-1r2xji3.svelte-1r2xji3{font-size:12px;padding:1em 0.5em}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9vdGVyLnN2ZWx0ZSIsInNvdXJjZXMiOlsiRm9vdGVyLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICAvLyBleHBvcnQgbGV0IHNlZ21lbnQ7XG4gIGltcG9ydCB7IF8sIGxvY2FsZSwgc2V0dXBJMThuIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2kxOG5cIjtcbiAgbGV0IHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG48L3NjcmlwdD5cblxuPGZvb3Rlcj5cbiAgPGRpdiBjbGFzcz1cImNvbnRlbnQtY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvcHlyaWdodFwiPlxuICAgICAgJiMxNjk7IHt5ZWFyfVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJmb290ZXItY29udGFjdHNcIj5cbiAgICAgIDxhIGhyZWY9XCJtYWlsdG86eyRfKCdmb290ZXIuZW1haWwnKX0gXCI+eyRfKCdmb290ZXIuZW1haWwnKX0gPC9hPlxuICAgICAgPGEgaHJlZj1cImNhbGx0bzp7JF8oJ2Zvb3Rlci5waG9uZScpfVwiPnskXygnZm9vdGVyLnBob25lVG9BcHBlYXInKX08L2E+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIFxuICAgIDwvZGl2PlxuICAgIFxuICAgIDwhLS0ge3NlZ21lbnR9IC0tPlxuICAgIDwhLS0geyRfKFwiZm9vdGVyLmNvbnRhY3RzXCIpfSAtLT5cbiAgPC9kaXY+XG5cblxuXG48L2Zvb3Rlcj5cblxuPHN0eWxlPlxuICBmb290ZXIge1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgcGFkZGluZzogMCAxZW07XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGJvdHRvbTogMHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsIDYyLCAwLCAwLjEpO1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAyZW0pO1xuICAgIHotaW5kZXg6IDEwMDA7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgfVxuXG4gIC5jb3B5cmlnaHQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICB9XG4gIC5jb250ZW50LWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxuXG4gIC5mb290ZXItY29udGFjdHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIC5mb290ZXItY29udGFjdHMgYSwgLmNvcHlyaWdodCB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBwYWRkaW5nOiAxNXB4O1xuICB9XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQwMHB4KSB7XG4gICAgLmZvb3Rlci1jb250YWN0cyBhLCAuY29weXJpZ2h0IHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIHBhZGRpbmc6IDFlbSAwLjVlbTtcbiAgICB9XG5cbiAgfSBcbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEJFLE1BQU0sOEJBQUMsQ0FBQyxBQUNOLFdBQVcsQ0FBRSxHQUFHLENBQ2hCLE9BQU8sQ0FBRSxDQUFDLENBQUMsR0FBRyxDQUNkLFFBQVEsQ0FBRSxLQUFLLENBQ2YsTUFBTSxDQUFFLEdBQUcsQ0FDWCxNQUFNLENBQUUsSUFBSSxDQUNaLFVBQVUsQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQzNDLEtBQUssQ0FBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ3ZCLE9BQU8sQ0FBRSxJQUFJLENBQ2IsVUFBVSxDQUFFLEtBQUssQ0FDakIsT0FBTyxDQUFFLElBQUksQ0FDYixnQkFBZ0IsTUFBTSxDQUN0QixZQUFZLE1BQU0sQUFDcEIsQ0FBQyxBQUVELFVBQVUsOEJBQUMsQ0FBQyxBQUNWLE9BQU8sQ0FBRSxJQUFJLENBQ2IsWUFBWSxNQUFNLEFBQ3BCLENBQUMsQUFDRCxrQkFBa0IsOEJBQUMsQ0FBQyxBQUNsQixPQUFPLENBQUUsSUFBSSxBQUNmLENBQUMsQUFFRCxnQkFBZ0IsOEJBQUMsQ0FBQyxBQUNoQixPQUFPLENBQUUsSUFBSSxDQUNiLFdBQVcsQ0FBRSxNQUFNLEFBQ3JCLENBQUMsQUFFRCwrQkFBZ0IsQ0FBQyxnQkFBQyxDQUFFLFVBQVUsOEJBQUMsQ0FBQyxBQUM1QixTQUFTLENBQUUsSUFBSSxDQUNmLE9BQU8sQ0FBRSxJQUFJLEFBQ2pCLENBQUMsQUFFRCxNQUFNLEFBQUMsWUFBWSxLQUFLLENBQUMsQUFBQyxDQUFDLEFBQ3pCLCtCQUFnQixDQUFDLGdCQUFDLENBQUUsVUFBVSw4QkFBQyxDQUFDLEFBQzlCLFNBQVMsQ0FBRSxJQUFJLENBQ2YsT0FBTyxDQUFFLEdBQUcsQ0FBQyxLQUFLLEFBQ3BCLENBQUMsQUFFSCxDQUFDIn0= */";
  append_dev(document.head, style);
}

function create_fragment$3(ctx) {
  var footer;
  var div3;
  var div0;
  var t0;
  var t1;
  var t2;
  var div1;
  var a0;
  var t3_value =
  /*$_*/
  ctx[0]("footer.email") + "";
  var t3;
  var a0_href_value;
  var t4;
  var a1;
  var t5_value =
  /*$_*/
  ctx[0]("footer.phoneToAppear") + "";
  var t5;
  var a1_href_value;
  var t6;
  var div2;
  var block = {
    c: function create() {
      footer = element("footer");
      div3 = element("div");
      div0 = element("div");
      t0 = text("© ");
      t1 = text(
      /*year*/
      ctx[1]);
      t2 = space();
      div1 = element("div");
      a0 = element("a");
      t3 = text(t3_value);
      t4 = space();
      a1 = element("a");
      t5 = text(t5_value);
      t6 = space();
      div2 = element("div");
      this.h();
    },
    l: function claim(nodes) {
      footer = claim_element(nodes, "FOOTER", {
        class: true
      });
      var footer_nodes = children(footer);
      div3 = claim_element(footer_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, "© ");
      t1 = claim_text(div0_nodes,
      /*year*/
      ctx[1]);
      div0_nodes.forEach(detach_dev);
      t2 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      a0 = claim_element(div1_nodes, "A", {
        href: true,
        class: true
      });
      var a0_nodes = children(a0);
      t3 = claim_text(a0_nodes, t3_value);
      a0_nodes.forEach(detach_dev);
      t4 = claim_space(div1_nodes);
      a1 = claim_element(div1_nodes, "A", {
        href: true,
        class: true
      });
      var a1_nodes = children(a1);
      t5 = claim_text(a1_nodes, t5_value);
      a1_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t6 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {});
      var div2_nodes = children(div2);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      footer_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "copyright svelte-1r2xji3");
      add_location(div0, file$2, 8, 4, 190);
      attr_dev(a0, "href", a0_href_value = "mailto:" +
      /*$_*/
      ctx[0]("footer.email") + " ");
      attr_dev(a0, "class", "svelte-1r2xji3");
      add_location(a0, file$2, 12, 6, 285);
      attr_dev(a1, "href", a1_href_value = "callto:" +
      /*$_*/
      ctx[0]("footer.phone"));
      attr_dev(a1, "class", "svelte-1r2xji3");
      add_location(a1, file$2, 13, 6, 356);
      attr_dev(div1, "class", "footer-contacts svelte-1r2xji3");
      add_location(div1, file$2, 11, 4, 249);
      add_location(div2, file$2, 15, 4, 442);
      attr_dev(div3, "class", "content-container svelte-1r2xji3");
      add_location(div3, file$2, 7, 2, 154);
      attr_dev(footer, "class", "svelte-1r2xji3");
      add_location(footer, file$2, 6, 0, 143);
    },
    m: function mount(target, anchor) {
      insert_dev(target, footer, anchor);
      append_dev(footer, div3);
      append_dev(div3, div0);
      append_dev(div0, t0);
      append_dev(div0, t1);
      append_dev(div3, t2);
      append_dev(div3, div1);
      append_dev(div1, a0);
      append_dev(a0, t3);
      append_dev(div1, t4);
      append_dev(div1, a1);
      append_dev(a1, t5);
      append_dev(div3, t6);
      append_dev(div3, div2);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*$_*/
      1 && t3_value !== (t3_value =
      /*$_*/
      ctx[0]("footer.email") + "")) set_data_dev(t3, t3_value);

      if (dirty &
      /*$_*/
      1 && a0_href_value !== (a0_href_value = "mailto:" +
      /*$_*/
      ctx[0]("footer.email") + " ")) {
        attr_dev(a0, "href", a0_href_value);
      }

      if (dirty &
      /*$_*/
      1 && t5_value !== (t5_value =
      /*$_*/
      ctx[0]("footer.phoneToAppear") + "")) set_data_dev(t5, t5_value);

      if (dirty &
      /*$_*/
      1 && a1_href_value !== (a1_href_value = "callto:" +
      /*$_*/
      ctx[0]("footer.phone"))) {
        attr_dev(a1, "href", a1_href_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(footer);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  var $_;
  validate_store(ne, "_");
  component_subscribe($$self, ne, function ($$value) {
    return $$invalidate(0, $_ = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("Footer", slots, []);
  var year = new Date().getFullYear();
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Footer> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$capture_state = function () {
    return {
      _: ne,
      locale: L,
      setupI18n: setupI18n,
      year: year,
      $_: $_
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("year" in $$props) $$invalidate(1, year = $$props.year);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [$_, year];
}

var Footer = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Footer, _SvelteComponentDev);

  var _super = _createSuper$3(Footer);

  function Footer(options) {
    var _this;

    _classCallCheck(this, Footer);

    _this = _super.call(this, options);
    if (!document.getElementById("svelte-1r2xji3-style")) add_css$2();
    init$1(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Footer",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }

  return Footer;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "src/routes/_layout.svelte";

function add_css$1() {
  var style = element("style");
  style.id = "svelte-n70g7x-style";
  style.textContent = "main.svelte-n70g7x.svelte-n70g7x{position:relative;max-width:56em;background-color:white;padding:2em;margin:0 auto;box-sizing:border-box}.loader-container.svelte-n70g7x.svelte-n70g7x{width:100vw;height:100vh;z-index:100000;background-color:white;display:flex;align-items:center;justify-content:center}.loader-container.svelte-n70g7x div.svelte-n70g7x{margin:0 auto;height:100px;width:100px}.content-container{max-width:1300px;width:100%}.main-content-container{margin-bottom:50px}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2xheW91dC5zdmVsdGUiLCJzb3VyY2VzIjpbIl9sYXlvdXQuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGltcG9ydCBOYXYgZnJvbSBcIi4uL2NvbXBvbmVudHMvTmF2LnN2ZWx0ZVwiO1xuICBpbXBvcnQgRm9vdGVyIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvb3Rlci5zdmVsdGVcIjtcbiAgLy8gaW1wb3J0IHsgUmluZ0xvYWRlciB9IGZyb20gJy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtbG9hZGluZy1zcGlubmVycy9zcmMvaW5kZXgnO1xuICAvLyBpbXBvcnQgeyBSaW5nTG9hZGVyIH0gZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS1sb2FkaW5nLXNwaW5uZXJzL3NyYy9pbmRleCc7XG5cbiAgZXhwb3J0IGxldCBzZWdtZW50O1xuIFxuICBpbXBvcnQgeyBzZXR1cEkxOG4sIGlzTG9jYWxlTG9hZGVkIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2kxOG5cIjtcbiAgc2V0dXBJMThuKHsgd2l0aExvY2FsZTogXCJsdFwiIH0pO1xuPC9zY3JpcHQ+XG5cblxuXG5cbiAgeyNpZiAkaXNMb2NhbGVMb2FkZWR9XG4gICAgPE5hdiB7c2VnbWVudH0gLz5cbiAgICA8bWFpbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LWNvbnRhaW5lciBtYWluLWNvbnRlbnQtY29udGFpbmVyXCI+XG4gICAgICAgIDxzbG90IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gICAgPEZvb3RlciAvPlxuICB7OmVsc2V9XG4gICAgPGRpdiBjbGFzcz1cImxvYWRlci1jb250YWluZXJcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDwhLS0gPFJpbmdMb2FkZXIgc2l6ZT1cIjEwMFwiIGNvbG9yPVwiI0ZGM0UwMFwiIHVuaXQ9XCJweFwiIGR1cmF0aW9uPVwiNXNcIj48L1JpbmdMb2FkZXI+IC0tPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIHsvaWZ9XG4gIFxuXG5cbjxzdHlsZSA+XG4gIG1haW4ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXgtd2lkdGg6IDU2ZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgcGFkZGluZzogMmVtO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cbiAgLmxvYWRlci1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIHotaW5kZXg6IDEwMDAwMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuXG4gIC5sb2FkZXItY29udGFpbmVyIGRpdiB7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICB3aWR0aDogMTAwcHg7XG4gICAgfVxuXG4gIDpnbG9iYWwoLmNvbnRlbnQtY29udGFpbmVyKSB7XG4gICAgbWF4LXdpZHRoOiAxMzAwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICA6Z2xvYmFsKC5tYWluLWNvbnRlbnQtY29udGFpbmVyKSB7XG5cdG1hcmdpbi1ib3R0b206IDUwcHg7XG4gIH1cblxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQ0UsSUFBSSw0QkFBQyxDQUFDLEFBQ0osUUFBUSxDQUFFLFFBQVEsQ0FDbEIsU0FBUyxDQUFFLElBQUksQ0FDZixnQkFBZ0IsQ0FBRSxLQUFLLENBQ3ZCLE9BQU8sQ0FBRSxHQUFHLENBQ1osTUFBTSxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2QsVUFBVSxDQUFFLFVBQVUsQUFDeEIsQ0FBQyxBQUNELGlCQUFpQiw0QkFBQyxDQUFDLEFBQ2pCLEtBQUssQ0FBRSxLQUFLLENBQ1osTUFBTSxDQUFFLEtBQUssQ0FDYixPQUFPLENBQUUsTUFBTSxDQUNmLGdCQUFnQixDQUFFLEtBQUssQ0FDdkIsT0FBTyxDQUFFLElBQUksQ0FDYixZQUFZLE1BQU0sQ0FDbEIsZUFBZSxDQUFFLE1BQU0sQUFDekIsQ0FBQyxBQUVELCtCQUFpQixDQUFDLEdBQUcsY0FBQyxDQUFDLEFBQ25CLE1BQU0sQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUNkLE1BQU0sQ0FBRSxLQUFLLENBQ2IsS0FBSyxDQUFFLEtBQUssQUFDZCxDQUFDLEFBRUssa0JBQWtCLEFBQUUsQ0FBQyxBQUMzQixTQUFTLENBQUUsTUFBTSxDQUNqQixLQUFLLENBQUUsSUFBSSxBQUNiLENBQUMsQUFFTyx1QkFBdUIsQUFBRSxDQUFDLEFBQ25DLGFBQWEsQ0FBRSxJQUFJLEFBQ2xCLENBQUMifQ== */";
  append_dev(document.head, style);
} // (24:2) {:else}


function create_else_block$1(ctx) {
  var div1;
  var div0;
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "svelte-n70g7x");
      add_location(div0, file$1, 25, 6, 647);
      attr_dev(div1, "class", "loader-container svelte-n70g7x");
      add_location(div1, file$1, 24, 4, 610);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, div0);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(24:2) {:else}",
    ctx: ctx
  });
  return block;
} // (16:2) {#if $isLocaleLoaded}


function create_if_block$2(ctx) {
  var nav;
  var t0;
  var main;
  var div;
  var t1;
  var footer;
  var current;
  nav = new Nav({
    props: {
      segment:
      /*segment*/
      ctx[0]
    },
    $$inline: true
  });
  var default_slot_template =
  /*#slots*/
  ctx[3].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[2], null);
  footer = new Footer({
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(nav.$$.fragment);
      t0 = space();
      main = element("main");
      div = element("div");
      if (default_slot) default_slot.c();
      t1 = space();
      create_component(footer.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      claim_component(nav.$$.fragment, nodes);
      t0 = claim_space(nodes);
      main = claim_element(nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      div = claim_element(main_nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      claim_component(footer.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "content-container main-content-container");
      add_location(div, file$1, 18, 6, 484);
      attr_dev(main, "class", "svelte-n70g7x");
      add_location(main, file$1, 17, 4, 471);
    },
    m: function mount(target, anchor) {
      mount_component(nav, target, anchor);
      insert_dev(target, t0, anchor);
      insert_dev(target, main, anchor);
      append_dev(main, div);

      if (default_slot) {
        default_slot.m(div, null);
      }

      insert_dev(target, t1, anchor);
      mount_component(footer, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var nav_changes = {};
      if (dirty &
      /*segment*/
      1) nav_changes.segment =
      /*segment*/
      ctx[0];
      nav.$set(nav_changes);

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[2], dirty, null, null);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(nav.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(footer.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(nav.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(footer.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(nav, detaching);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(main);
      if (default_slot) default_slot.d(detaching);
      if (detaching) detach_dev(t1);
      destroy_component(footer, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(16:2) {#if $isLocaleLoaded}",
    ctx: ctx
  });
  return block;
}

function create_fragment$2(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$2, create_else_block$1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*$isLocaleLoaded*/
    ctx[1]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var $isLocaleLoaded;
  validate_store(isLocaleLoaded, "isLocaleLoaded");
  component_subscribe($$self, isLocaleLoaded, function ($$value) {
    return $$invalidate(1, $isLocaleLoaded = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Layout", slots, ['default']);
  var segment = $$props.segment;
  setupI18n({
    withLocale: "lt"
  });
  var writable_props = ["segment"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
    if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      Nav: Nav,
      Footer: Footer,
      segment: segment,
      setupI18n: setupI18n,
      isLocaleLoaded: isLocaleLoaded,
      $isLocaleLoaded: $isLocaleLoaded
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [segment, $isLocaleLoaded, $$scope, slots];
}

var Layout = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout, _SvelteComponentDev);

  var _super = _createSuper$2(Layout);

  function Layout(options) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, options);
    if (!document.getElementById("svelte-n70g7x-style")) add_css$1();
    init$1(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      segment: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout",
      options: options,
      id: create_fragment$2.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*segment*/
    ctx[0] === undefined && !("segment" in props)) {
      console.warn("<Layout> was created without expected prop 'segment'");
    }

    return _this;
  }

  _createClass(Layout, [{
    key: "segment",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Layout;
}(SvelteComponentDev);

var root_comp = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Layout
});

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Error_1$1 = globals.Error,
    console_1 = globals.console;
var file = "src/routes/_error.svelte";

function add_css() {
  var style = element("style");
  style.id = "svelte-17w3omn-style";
  style.textContent = "h1.svelte-17w3omn,p.svelte-17w3omn{margin:0 auto}h1.svelte-17w3omn{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-17w3omn{margin:1em auto}@media(min-width: 480px){h1.svelte-17w3omn{font-size:4em}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2Vycm9yLnN2ZWx0ZSIsInNvdXJjZXMiOlsiX2Vycm9yLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICBleHBvcnQgbGV0IHN0YXR1cztcbiAgZXhwb3J0IGxldCBlcnJvcjtcblxuICBjb25zdCBkZXYgPSBcImRldmVsb3BtZW50XCIgPT09IFwiZGV2ZWxvcG1lbnRcIjtcbiAgY29uc29sZS5sb2coZXJyb3IpXG4gIGltcG9ydCB7IF8sIGxvY2FsZSwgc2V0dXBJMThuIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2kxOG5cIjtcbjwvc2NyaXB0PlxuXG48c3ZlbHRlOmhlYWQ+XG4gIDx0aXRsZT57c3RhdHVzfTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48aDE+e3N0YXR1c308L2gxPlxuXG48cD57JF8oZXJyb3IubmFtZSl9PC9wPlxuXG57I2lmIGRldiAmJiBlcnJvci5zdGFja31cbiAgPHByZT57ZXJyb3Iuc3RhY2t9PC9wcmU+XG57L2lmfVxuXG48c3R5bGU+XG4gIGgxLFxuICBwIHtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxuXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDIuOGVtO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgbWFyZ2luOiAwIDAgMC41ZW0gMDtcbiAgfVxuXG4gIHAge1xuICAgIG1hcmdpbjogMWVtIGF1dG87XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcbiAgICBoMSB7XG4gICAgICBmb250LXNpemU6IDRlbTtcbiAgICB9XG4gIH1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JFLGlCQUFFLENBQ0YsQ0FBQyxlQUFDLENBQUMsQUFDRCxNQUFNLENBQUUsQ0FBQyxDQUFDLElBQUksQUFDaEIsQ0FBQyxBQUVELEVBQUUsZUFBQyxDQUFDLEFBQ0YsU0FBUyxDQUFFLEtBQUssQ0FDaEIsV0FBVyxDQUFFLEdBQUcsQ0FDaEIsTUFBTSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQUFDckIsQ0FBQyxBQUVELENBQUMsZUFBQyxDQUFDLEFBQ0QsTUFBTSxDQUFFLEdBQUcsQ0FBQyxJQUFJLEFBQ2xCLENBQUMsQUFFRCxNQUFNLEFBQUMsWUFBWSxLQUFLLENBQUMsQUFBQyxDQUFDLEFBQ3pCLEVBQUUsZUFBQyxDQUFDLEFBQ0YsU0FBUyxDQUFFLEdBQUcsQUFDaEIsQ0FBQyxBQUNILENBQUMifQ== */";
  append_dev(document.head, style);
} // (18:0) {#if dev && error.stack}


function create_if_block$1(ctx) {
  var pre;
  var t_value =
  /*error*/
  ctx[1].stack + "";
  var t;
  var block = {
    c: function create() {
      pre = element("pre");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(pre, file, 18, 2, 316);
    },
    m: function mount(target, anchor) {
      insert_dev(target, pre, anchor);
      append_dev(pre, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*error*/
      2 && t_value !== (t_value =
      /*error*/
      ctx[1].stack + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(18:0) {#if dev && error.stack}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1;
  var t2;
  var p;
  var t3_value =
  /*$_*/
  ctx[2](
  /*error*/
  ctx[1].name) + "";
  var t3;
  var t4;
  var if_block_anchor;
  document.title = title_value =
  /*status*/
  ctx[0];
  var if_block =
  /*dev*/
  ctx[3] &&
  /*error*/
  ctx[1].stack && create_if_block$1(ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text(
      /*status*/
      ctx[0]);
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1moakz\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes,
      /*status*/
      ctx[0]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-17w3omn");
      add_location(h1, file, 13, 0, 245);
      attr_dev(p, "class", "svelte-17w3omn");
      add_location(p, file, 15, 0, 264);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p, anchor);
      append_dev(p, t3);
      insert_dev(target, t4, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*status*/
      1 && title_value !== (title_value =
      /*status*/
      ctx[0])) {
        document.title = title_value;
      }

      if (dirty &
      /*status*/
      1) set_data_dev(t1,
      /*status*/
      ctx[0]);
      if (dirty &
      /*$_, error*/
      6 && t3_value !== (t3_value =
      /*$_*/
      ctx[2](
      /*error*/
      ctx[1].name) + "")) set_data_dev(t3, t3_value);

      if (
      /*dev*/
      ctx[3] &&
      /*error*/
      ctx[1].stack) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t4);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  var $_;
  validate_store(ne, "_");
  component_subscribe($$self, ne, function ($$value) {
    return $$invalidate(2, $_ = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("Error", slots, []);
  var status = $$props.status;
  var error = $$props.error;
  var dev = "development" === "development";
  console.log(error);
  var writable_props = ["status", "error"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<Error> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  $$self.$capture_state = function () {
    return {
      status: status,
      error: error,
      dev: dev,
      _: ne,
      locale: L,
      setupI18n: setupI18n,
      $_: $_
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [status, error, $_, dev];
}

var Error$1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Error, _SvelteComponentDev);

  var _super = _createSuper$1(Error);

  function Error(options) {
    var _this;

    _classCallCheck(this, Error);

    _this = _super.call(this, options);
    if (!document.getElementById("svelte-17w3omn-style")) add_css();
    init$1(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      status: 0,
      error: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Error",
      options: options,
      id: create_fragment$1.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*status*/
    ctx[0] === undefined && !("status" in props)) {
      console_1.warn("<Error> was created without expected prop 'status'");
    }

    if (
    /*error*/
    ctx[1] === undefined && !("error" in props)) {
      console_1.warn("<Error> was created without expected prop 'error'");
    }

    return _this;
  }

  _createClass(Error, [{
    key: "status",
    get: function get() {
      throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Error;
}(SvelteComponentDev);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Error_1 = globals.Error;

function create_else_block(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [
  /*level1*/
  ctx[4].props];
  var switch_value =
  /*level1*/
  ctx[4].component;

  function switch_props(ctx) {
    var switch_instance_props = {};

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty &
      /*level1*/
      16 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
      /*level1*/
      ctx[4].props)]) : {};

      if (switch_value !== (switch_value =
      /*level1*/
      ctx[4].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(23:1) {:else}",
    ctx: ctx
  });
  return block;
} // (21:1) {#if error}


function create_if_block(ctx) {
  var error_1;
  var current;
  error_1 = new Error$1({
    props: {
      error:
      /*error*/
      ctx[0],
      status:
      /*status*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(error_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(error_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(error_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var error_1_changes = {};
      if (dirty &
      /*error*/
      1) error_1_changes.error =
      /*error*/
      ctx[0];
      if (dirty &
      /*status*/
      2) error_1_changes.status =
      /*status*/
      ctx[1];
      error_1.$set(error_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(error_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(error_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(error_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(21:1) {#if error}",
    ctx: ctx
  });
  return block;
} // (20:0) <Layout segment="{segments[0]}" {...level0.props}>


function create_default_slot(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*error*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var layout;
  var current;
  var layout_spread_levels = [{
    segment:
    /*segments*/
    ctx[2][0]
  },
  /*level0*/
  ctx[3].props];
  var layout_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < layout_spread_levels.length; i += 1) {
    layout_props = assign(layout_props, layout_spread_levels[i]);
  }

  layout = new Layout({
    props: layout_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(layout.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(layout.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(layout, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var layout_changes = dirty &
      /*segments, level0*/
      12 ? get_spread_update(layout_spread_levels, [dirty &
      /*segments*/
      4 && {
        segment:
        /*segments*/
        ctx[2][0]
      }, dirty &
      /*level0*/
      8 && get_spread_object(
      /*level0*/
      ctx[3].props)]) : {};

      if (dirty &
      /*$$scope, error, status, level1*/
      147) {
        layout_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      layout.$set(layout_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(layout, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("App", slots, []);
  var stores = $$props.stores;
  var error = $$props.error;
  var status = $$props.status;
  var segments = $$props.segments;
  var level0 = $$props.level0;
  var _$$props$level = $$props.level1,
      level1 = _$$props$level === void 0 ? null : _$$props$level;
  var notify = $$props.notify;
  afterUpdate(notify);
  setContext(CONTEXT_KEY, stores);
  var writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      afterUpdate: afterUpdate,
      CONTEXT_KEY: CONTEXT_KEY,
      Layout: Layout,
      Error: Error$1,
      stores: stores,
      error: error,
      status: status,
      segments: segments,
      level0: level0,
      level1: level1,
      notify: notify
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [error, status, segments, level0, level1, stores, notify];
}

var App = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(App, _SvelteComponentDev);

  var _super = _createSuper(App);

  function App(options) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, options);
    init$1(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      stores: 5,
      error: 0,
      status: 1,
      segments: 2,
      level0: 3,
      level1: 4,
      notify: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "App",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*stores*/
    ctx[5] === undefined && !("stores" in props)) {
      console.warn("<App> was created without expected prop 'stores'");
    }

    if (
    /*error*/
    ctx[0] === undefined && !("error" in props)) {
      console.warn("<App> was created without expected prop 'error'");
    }

    if (
    /*status*/
    ctx[1] === undefined && !("status" in props)) {
      console.warn("<App> was created without expected prop 'status'");
    }

    if (
    /*segments*/
    ctx[2] === undefined && !("segments" in props)) {
      console.warn("<App> was created without expected prop 'segments'");
    }

    if (
    /*level0*/
    ctx[3] === undefined && !("level0" in props)) {
      console.warn("<App> was created without expected prop 'level0'");
    }

    if (
    /*notify*/
    ctx[6] === undefined && !("notify" in props)) {
      console.warn("<App> was created without expected prop 'notify'");
    }

    return _this;
  }

  _createClass(App, [{
    key: "stores",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "status",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segments",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level0",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level1",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "notify",
    get: function get() {
      throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return App;
}(SvelteComponentDev);

// This file is generated by Sapper — do not edit it!
var ignore = [/^\/blog\.json$/, /^\/blog\/([^/]+?)\.json$/];
var components = [{
  js: function js() {
    return Promise.all([import('./index.3a6d0941.js'), ]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./contacts.9228ed40.js'), ]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./about.b141b31a.js'), ]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./index.feb5a22c.js'), ]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./[slug].751a1002.js'), ]).then(function(x) { return x[0]; });
  }
}];
var routes = function (d) {
  return [{
    // index.svelte
    pattern: /^\/$/,
    parts: [{
      i: 0
    }]
  }, {
    // contacts.svelte
    pattern: /^\/contacts\/?$/,
    parts: [{
      i: 1
    }]
  }, {
    // about.svelte
    pattern: /^\/about\/?$/,
    parts: [{
      i: 2
    }]
  }, {
    // blog/index.svelte
    pattern: /^\/blog\/?$/,
    parts: [{
      i: 3
    }]
  }, {
    // blog/[slug].svelte
    pattern: /^\/blog\/([^/]+?)\/?$/,
    parts: [null, {
      i: 4,
      params: function params(match) {
        return {
          slug: d(match[1])
        };
      }
    }]
  }];
}(decodeURIComponent);

/*! *****************************************************************************
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

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function find_anchor(node) {
  while (node && node.nodeName.toUpperCase() !== 'A') {
    node = node.parentNode;
  } // SVG <a> elements have a lowercase name


  return node;
}

var uid = 1;

function set_uid(n) {
  uid = n;
}

var cid;

function set_cid(n) {
  cid = n;
}

var _history = typeof history !== 'undefined' ? history : {
  pushState: function pushState() {},
  replaceState: function replaceState() {},
  scrollRestoration: 'auto'
};

var scroll_history = {};

function load_current_page() {
  return Promise.resolve().then(function () {
    var _location = location,
        hash = _location.hash,
        href = _location.href;

    _history.replaceState({
      id: uid
    }, '', href);

    var target = select_target(new URL(location.href));
    if (target) return navigate(target, uid, true, hash);
  });
}

var base_url;
var handle_target;

function init(base, handler) {
  base_url = base;
  handle_target = handler;

  if ('scrollRestoration' in _history) {
    _history.scrollRestoration = 'manual';
  } // Adopted from Nuxt.js
  // Reset scrollRestoration to auto when leaving page, allowing page reload
  // and back-navigation from other pages to use the browser to restore the
  // scrolling position.


  addEventListener('beforeunload', function () {
    _history.scrollRestoration = 'auto';
  }); // Setting scrollRestoration to manual again when returning to this page.

  addEventListener('load', function () {
    _history.scrollRestoration = 'manual';
  });
  addEventListener('click', handle_click);
  addEventListener('popstate', handle_popstate);
}

function extract_query(search) {
  var query = Object.create(null);

  if (search.length > 0) {
    search.slice(1).split('&').forEach(function (searchParam) {
      var _$exec = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' '))),
          _$exec2 = _slicedToArray(_$exec, 3),
          key = _$exec2[1],
          _$exec2$ = _$exec2[2],
          value = _$exec2$ === void 0 ? '' : _$exec2$;

      if (typeof query[key] === 'string') query[key] = [query[key]];
      if (_typeof(query[key]) === 'object') query[key].push(value);else query[key] = value;
    });
  }

  return query;
}

function select_target(url) {
  if (url.origin !== location.origin) return null;
  if (!url.pathname.startsWith(base_url)) return null;
  var path = url.pathname.slice(base_url.length);

  if (path === '') {
    path = '/';
  } // avoid accidental clashes between server routes and page routes


  if (ignore.some(function (pattern) {
    return pattern.test(path);
  })) return;

  for (var i = 0; i < routes.length; i += 1) {
    var route = routes[i];
    var match = route.pattern.exec(path);

    if (match) {
      var query = extract_query(url.search);
      var part = route.parts[route.parts.length - 1];
      var params = part.params ? part.params(match) : {};
      var page = {
        host: location.host,
        path: path,
        query: query,
        params: params
      };
      return {
        href: url.href,
        route: route,
        match: match,
        page: page
      };
    }
  }
}

function handle_click(event) {
  // Adapted from https://github.com/visionmedia/page.js
  // MIT license https://github.com/visionmedia/page.js#license
  if (which(event) !== 1) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (event.defaultPrevented) return;
  var a = find_anchor(event.target);
  if (!a) return;
  if (!a.href) return; // check if link is inside an svg
  // in this case, both href and target are always inside an object

  var svg = _typeof(a.href) === 'object' && a.href.constructor.name === 'SVGAnimatedString';
  var href = String(svg ? a.href.baseVal : a.href);

  if (href === location.href) {
    if (!location.hash) event.preventDefault();
    return;
  } // Ignore if tag has
  // 1. 'download' attribute
  // 2. rel='external' attribute


  if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return; // Ignore if <a> has a target

  if (svg ? a.target.baseVal : a.target) return;
  var url = new URL(href); // Don't handle hash changes

  if (url.pathname === location.pathname && url.search === location.search) return;
  var target = select_target(url);

  if (target) {
    var noscroll = a.hasAttribute('sapper:noscroll');
    navigate(target, null, noscroll, url.hash);
    event.preventDefault();

    _history.pushState({
      id: cid
    }, '', url.href);
  }
}

function which(event) {
  return event.which === null ? event.button : event.which;
}

function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}

function handle_popstate(event) {
  scroll_history[cid] = scroll_state();

  if (event.state) {
    var url = new URL(location.href);

    var _target = select_target(url);

    if (_target) {
      navigate(_target, event.state.id);
    } else {
      // eslint-disable-next-line
      location.href = location.href; // nosonar
    }
  } else {
    // hashchange
    set_uid(uid + 1);
    set_cid(uid);

    _history.replaceState({
      id: cid
    }, '', location.href);
  }
}

function navigate(dest, id, noscroll, hash) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
    var popstate, current_scroll, scroll, deep_linked;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            popstate = !!id;

            if (popstate) {
              cid = id;
            } else {
              current_scroll = scroll_state(); // clicked on a link. preserve scroll state

              scroll_history[cid] = current_scroll;
              cid = id = ++uid;
              scroll_history[cid] = noscroll ? current_scroll : {
                x: 0,
                y: 0
              };
            }

            _context.next = 4;
            return handle_target(dest);

          case 4:
            if (document.activeElement && document.activeElement instanceof HTMLElement) document.activeElement.blur();

            if (!noscroll) {
              scroll = scroll_history[id];

              if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));

                if (deep_linked) {
                  scroll = {
                    x: 0,
                    y: deep_linked.getBoundingClientRect().top + scrollY
                  };
                }
              }

              scroll_history[cid] = scroll;

              if (popstate || deep_linked) {
                scrollTo(scroll.x, scroll.y);
              } else {
                scrollTo(0, 0);
              }
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

function get_base_uri(window_document) {
  var baseURI = window_document.baseURI;

  if (!baseURI) {
    var baseTags = window_document.getElementsByTagName('base');
    baseURI = baseTags.length ? baseTags[0].href : window_document.URL;
  }

  return baseURI;
}

var prefetching = null;
var mousemove_timeout;

function start() {
  addEventListener('touchstart', trigger_prefetch);
  addEventListener('mousemove', handle_mousemove);
}

function prefetch(href) {
  var target = select_target(new URL(href, get_base_uri(document)));

  if (target) {
    if (!prefetching || href !== prefetching.href) {
      prefetching = {
        href: href,
        promise: hydrate_target(target)
      };
    }

    return prefetching.promise;
  }
}

function get_prefetched(target) {
  if (prefetching && prefetching.href === target.href) {
    return prefetching.promise;
  } else {
    return hydrate_target(target);
  }
}

function trigger_prefetch(event) {
  var a = find_anchor(event.target);

  if (a && a.rel === 'prefetch') {
    prefetch(a.href);
  }
}

function handle_mousemove(event) {
  clearTimeout(mousemove_timeout);
  mousemove_timeout = setTimeout(function () {
    trigger_prefetch(event);
  }, 20);
}

function goto(href) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    noscroll: false,
    replaceState: false
  };
  var target = select_target(new URL(href, get_base_uri(document)));

  if (target) {
    _history[opts.replaceState ? 'replaceState' : 'pushState']({
      id: cid
    }, '', href);

    return navigate(target, null, opts.noscroll);
  }

  location.href = href;
  return new Promise(function () {
    /* never resolves */
  });
}

function page_store(value) {
  var store = writable(value);
  var ready = true;

  function notify() {
    ready = true;
    store.update(function (val) {
      return val;
    });
  }

  function set(new_value) {
    ready = false;
    store.set(new_value);
  }

  function subscribe(run) {
    var old_value;
    return store.subscribe(function (new_value) {
      if (old_value === undefined || ready && new_value !== old_value) {
        run(old_value = new_value);
      }
    });
  }

  return {
    notify: notify,
    set: set,
    subscribe: subscribe
  };
}

var initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
var ready = false;
var root_component;
var current_token;
var root_preloaded;
var current_branch = [];
var current_query = '{}';
var stores = {
  page: page_store({}),
  preloading: writable(null),
  session: writable(initial_data && initial_data.session)
};
var $session;
var session_dirty;
stores.session.subscribe(function (value) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee2() {
    var dest, token, _yield$hydrate_target, redirect, props, branch;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            $session = value;

            if (ready) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            session_dirty = true;
            dest = select_target(new URL(location.href));
            token = current_token = {};
            _context2.next = 8;
            return hydrate_target(dest);

          case 8:
            _yield$hydrate_target = _context2.sent;
            redirect = _yield$hydrate_target.redirect;
            props = _yield$hydrate_target.props;
            branch = _yield$hydrate_target.branch;

            if (!(token !== current_token)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return");

          case 14:
            if (!redirect) {
              _context2.next = 19;
              break;
            }

            _context2.next = 17;
            return goto(redirect.location, {
              replaceState: true
            });

          case 17:
            _context2.next = 21;
            break;

          case 19:
            _context2.next = 21;
            return render(branch, props, buildPageContext(props, dest.page));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
});
var target;

function set_target(node) {
  target = node;
}

function start$1(opts) {
  set_target(opts.target);
  init(initial_data.baseUrl, handle_target$1);
  start();

  if (initial_data.error) {
    return Promise.resolve().then(function () {
      return handle_error();
    });
  }

  return load_current_page();
}

function handle_error() {
  var _location2 = location,
      host = _location2.host,
      pathname = _location2.pathname,
      search = _location2.search;
  var session = initial_data.session,
      preloaded = initial_data.preloaded,
      status = initial_data.status,
      error = initial_data.error;

  if (!root_preloaded) {
    root_preloaded = preloaded && preloaded[0];
  }

  var props = {
    error: error,
    status: status,
    session: session,
    level0: {
      props: root_preloaded
    },
    level1: {
      props: {
        status: status,
        error: error
      },
      component: Error$1
    },
    segments: preloaded
  };
  var query = extract_query(search);
  render([], props, {
    host: host,
    path: pathname,
    query: query,
    params: {},
    error: error
  });
}

function buildPageContext(props, page) {
  var error = props.error;
  return Object.assign({
    error: error
  }, page);
}

function handle_target$1(dest) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee3() {
    var hydrating, token, hydrated_target, redirect, props, branch;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (root_component) stores.preloading.set(true);
            hydrating = get_prefetched(dest);
            token = current_token = {};
            _context3.next = 5;
            return hydrating;

          case 5:
            hydrated_target = _context3.sent;
            redirect = hydrated_target.redirect;

            if (!(token !== current_token)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return");

          case 9:
            if (!redirect) {
              _context3.next = 14;
              break;
            }

            _context3.next = 12;
            return goto(redirect.location, {
              replaceState: true
            });

          case 12:
            _context3.next = 17;
            break;

          case 14:
            props = hydrated_target.props, branch = hydrated_target.branch;
            _context3.next = 17;
            return render(branch, props, buildPageContext(props, dest.page));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
}

function render(branch, props, page) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee4() {
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            stores.page.set(page);
            stores.preloading.set(false);

            if (!root_component) {
              _context4.next = 6;
              break;
            }

            root_component.$set(props);
            _context4.next = 13;
            break;

          case 6:
            props.stores = {
              page: {
                subscribe: stores.page.subscribe
              },
              preloading: {
                subscribe: stores.preloading.subscribe
              },
              session: stores.session
            };
            _context4.next = 9;
            return root_preloaded;

          case 9:
            _context4.t0 = _context4.sent;
            props.level0 = {
              props: _context4.t0
            };
            props.notify = stores.page.notify;
            root_component = new App({
              target: target,
              props: props,
              hydrate: true
            });

          case 13:
            current_branch = branch;
            current_query = JSON.stringify(page.query);
            ready = true;
            session_dirty = false;

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
}

function part_changed(i, segment, match, stringified_query) {
  // TODO only check query string changes for preload functions
  // that do in fact depend on it (using static analysis or
  // runtime instrumentation)
  if (stringified_query !== current_query) return true;
  var previous = current_branch[i];
  if (!previous) return false;
  if (segment !== previous.segment) return true;

  if (previous.match) {
    if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
      return true;
    }
  }
}

function hydrate_target(dest) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee6() {
    var _this = this;

    var route, page, segments, _redirect, props, preload_context, root_preload, branch, l, stringified_query, match, segment_dirty;

    return regenerator.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            route = dest.route, page = dest.page;
            segments = page.path.split('/').filter(Boolean);
            _redirect = null;
            props = {
              error: null,
              status: 200,
              segments: [segments[0]]
            };
            preload_context = {
              fetch: function (_fetch) {
                function fetch(_x, _x2) {
                  return _fetch.apply(this, arguments);
                }

                fetch.toString = function () {
                  return _fetch.toString();
                };

                return fetch;
              }(function (url, opts) {
                return fetch(url, opts);
              }),
              redirect: function redirect(statusCode, location) {
                if (_redirect && (_redirect.statusCode !== statusCode || _redirect.location !== location)) {
                  throw new Error('Conflicting redirects');
                }

                _redirect = {
                  statusCode: statusCode,
                  location: location
                };
              },
              error: function error(status, _error) {
                props.error = typeof _error === 'string' ? new Error(_error) : _error;
                props.status = status;
              }
            };

            if (!root_preloaded) {
              root_preload = undefined || function () {
                return {};
              };

              root_preloaded = initial_data.preloaded[0] || root_preload.call(preload_context, {
                host: page.host,
                path: page.path,
                query: page.query,
                params: {}
              }, $session);
            }

            l = 1;
            _context6.prev = 7;
            stringified_query = JSON.stringify(page.query);
            match = route.pattern.exec(page.path);
            segment_dirty = false;
            _context6.next = 13;
            return Promise.all(route.parts.map(function (part, i) {
              return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee5() {
                var segment, j, _yield$components$par, component, preload, preloaded;

                return regenerator.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        segment = segments[i];
                        if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;
                        props.segments[l] = segments[i + 1]; // TODO make this less confusing

                        if (part) {
                          _context5.next = 5;
                          break;
                        }

                        return _context5.abrupt("return", {
                          segment: segment
                        });

                      case 5:
                        j = l++;

                        if (!(!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i)) {
                          _context5.next = 8;
                          break;
                        }

                        return _context5.abrupt("return", current_branch[i]);

                      case 8:
                        segment_dirty = false;
                        _context5.next = 11;
                        return components[part.i].js();

                      case 11:
                        _yield$components$par = _context5.sent;
                        component = _yield$components$par.default;
                        preload = _yield$components$par.preload;

                        if (!(ready || !initial_data.preloaded[i + 1])) {
                          _context5.next = 25;
                          break;
                        }

                        if (!preload) {
                          _context5.next = 21;
                          break;
                        }

                        _context5.next = 18;
                        return preload.call(preload_context, {
                          host: page.host,
                          path: page.path,
                          query: page.query,
                          params: part.params ? part.params(dest.match) : {}
                        }, $session);

                      case 18:
                        _context5.t0 = _context5.sent;
                        _context5.next = 22;
                        break;

                      case 21:
                        _context5.t0 = {};

                      case 22:
                        preloaded = _context5.t0;
                        _context5.next = 26;
                        break;

                      case 25:
                        preloaded = initial_data.preloaded[i + 1];

                      case 26:
                        return _context5.abrupt("return", props["level".concat(j)] = {
                          component: component,
                          props: preloaded,
                          segment: segment,
                          match: match,
                          part: part.i
                        });

                      case 27:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));
            }));

          case 13:
            branch = _context6.sent;
            _context6.next = 21;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](7);
            props.error = _context6.t0;
            props.status = 500;
            branch = [];

          case 21:
            return _context6.abrupt("return", {
              redirect: _redirect,
              props: props,
              branch: branch
            });

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[7, 16]]);
  }));
}

start$1({
  target: document.querySelector('#sapper')
});

export { ne as A, _createClass as B, validate_each_argument as C, destroy_each as D, _asyncToGenerator as E, regenerator as F, SvelteComponentDev as S, _inherits as _, _getPrototypeOf as a, _possibleConstructorReturn as b, _classCallCheck as c, _assertThisInitialized as d, dispatch_dev as e, element as f, append_dev as g, space as h, init$1 as i, detach_dev as j, claim_space as k, claim_element as l, children as m, claim_text as n, attr_dev as o, add_location as p, query_selector_all as q, insert_dev as r, safe_not_equal as s, text as t, _slicedToArray as u, set_data_dev as v, noop as w, validate_store as x, component_subscribe as y, validate_slots as z };
