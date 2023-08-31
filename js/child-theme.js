/*!
  * Understrap v1.2.0 (https://understrap.com)
  * Copyright 2013-2023 The Understrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL-3.0 (undefined)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var alert$1 = {exports: {}};

	var util = {exports: {}};

	/*!
	  * Bootstrap index.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return util.exports;
		hasRequiredUtil = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/index.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const MAX_UID = 1000000;
			  const MILLISECONDS_MULTIPLIER = 1000;
			  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

			  const toType = object => {
			    if (object === null || object === undefined) {
			      return `${object}`;
			    }
			    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
			  };
			  /**
			   * Public Util API
			   */

			  const getUID = prefix => {
			    do {
			      prefix += Math.floor(Math.random() * MAX_UID);
			    } while (document.getElementById(prefix));
			    return prefix;
			  };
			  const getSelector = element => {
			    let selector = element.getAttribute('data-bs-target');
			    if (!selector || selector === '#') {
			      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
			      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
			      // `document.querySelector` will rightfully complain it is invalid.
			      // See https://github.com/twbs/bootstrap/issues/32273

			      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
			        return null;
			      } // Just in case some CMS puts out a full URL with the anchor appended

			      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
			        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
			      }
			      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
			    }
			    return selector;
			  };
			  const getSelectorFromElement = element => {
			    const selector = getSelector(element);
			    if (selector) {
			      return document.querySelector(selector) ? selector : null;
			    }
			    return null;
			  };
			  const getElementFromSelector = element => {
			    const selector = getSelector(element);
			    return selector ? document.querySelector(selector) : null;
			  };
			  const getTransitionDurationFromElement = element => {
			    if (!element) {
			      return 0;
			    } // Get transition-duration of the element

			    let {
			      transitionDuration,
			      transitionDelay
			    } = window.getComputedStyle(element);
			    const floatTransitionDuration = Number.parseFloat(transitionDuration);
			    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

			    if (!floatTransitionDuration && !floatTransitionDelay) {
			      return 0;
			    } // If multiple durations are defined, take the first

			    transitionDuration = transitionDuration.split(',')[0];
			    transitionDelay = transitionDelay.split(',')[0];
			    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
			  };
			  const triggerTransitionEnd = element => {
			    element.dispatchEvent(new Event(TRANSITION_END));
			  };
			  const isElement = object => {
			    if (!object || typeof object !== 'object') {
			      return false;
			    }
			    if (typeof object.jquery !== 'undefined') {
			      object = object[0];
			    }
			    return typeof object.nodeType !== 'undefined';
			  };
			  const getElement = object => {
			    // it's a jQuery object or a node element
			    if (isElement(object)) {
			      return object.jquery ? object[0] : object;
			    }
			    if (typeof object === 'string' && object.length > 0) {
			      return document.querySelector(object);
			    }
			    return null;
			  };
			  const isVisible = element => {
			    if (!isElement(element) || element.getClientRects().length === 0) {
			      return false;
			    }
			    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

			    const closedDetails = element.closest('details:not([open])');
			    if (!closedDetails) {
			      return elementIsVisible;
			    }
			    if (closedDetails !== element) {
			      const summary = element.closest('summary');
			      if (summary && summary.parentNode !== closedDetails) {
			        return false;
			      }
			      if (summary === null) {
			        return false;
			      }
			    }
			    return elementIsVisible;
			  };
			  const isDisabled = element => {
			    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
			      return true;
			    }
			    if (element.classList.contains('disabled')) {
			      return true;
			    }
			    if (typeof element.disabled !== 'undefined') {
			      return element.disabled;
			    }
			    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
			  };
			  const findShadowRoot = element => {
			    if (!document.documentElement.attachShadow) {
			      return null;
			    } // Can find the shadow root otherwise it'll return the document

			    if (typeof element.getRootNode === 'function') {
			      const root = element.getRootNode();
			      return root instanceof ShadowRoot ? root : null;
			    }
			    if (element instanceof ShadowRoot) {
			      return element;
			    } // when we don't find a shadow root

			    if (!element.parentNode) {
			      return null;
			    }
			    return findShadowRoot(element.parentNode);
			  };
			  const noop = () => {};
			  /**
			   * Trick to restart an element's animation
			   *
			   * @param {HTMLElement} element
			   * @return void
			   *
			   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
			   */

			  const reflow = element => {
			    element.offsetHeight; // eslint-disable-line no-unused-expressions
			  };

			  const getjQuery = () => {
			    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
			      return window.jQuery;
			    }
			    return null;
			  };
			  const DOMContentLoadedCallbacks = [];
			  const onDOMContentLoaded = callback => {
			    if (document.readyState === 'loading') {
			      // add listener on the first call when the document is in loading state
			      if (!DOMContentLoadedCallbacks.length) {
			        document.addEventListener('DOMContentLoaded', () => {
			          for (const callback of DOMContentLoadedCallbacks) {
			            callback();
			          }
			        });
			      }
			      DOMContentLoadedCallbacks.push(callback);
			    } else {
			      callback();
			    }
			  };
			  const isRTL = () => document.documentElement.dir === 'rtl';
			  const defineJQueryPlugin = plugin => {
			    onDOMContentLoaded(() => {
			      const $ = getjQuery();
			      /* istanbul ignore if */

			      if ($) {
			        const name = plugin.NAME;
			        const JQUERY_NO_CONFLICT = $.fn[name];
			        $.fn[name] = plugin.jQueryInterface;
			        $.fn[name].Constructor = plugin;
			        $.fn[name].noConflict = () => {
			          $.fn[name] = JQUERY_NO_CONFLICT;
			          return plugin.jQueryInterface;
			        };
			      }
			    });
			  };
			  const execute = callback => {
			    if (typeof callback === 'function') {
			      callback();
			    }
			  };
			  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
			    if (!waitForTransition) {
			      execute(callback);
			      return;
			    }
			    const durationPadding = 5;
			    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
			    let called = false;
			    const handler = ({
			      target
			    }) => {
			      if (target !== transitionElement) {
			        return;
			      }
			      called = true;
			      transitionElement.removeEventListener(TRANSITION_END, handler);
			      execute(callback);
			    };
			    transitionElement.addEventListener(TRANSITION_END, handler);
			    setTimeout(() => {
			      if (!called) {
			        triggerTransitionEnd(transitionElement);
			      }
			    }, emulatedDuration);
			  };
			  /**
			   * Return the previous/next element of a list.
			   *
			   * @param {array} list    The list of elements
			   * @param activeElement   The active element
			   * @param shouldGetNext   Choose to get next or previous element
			   * @param isCycleAllowed
			   * @return {Element|elem} The proper element
			   */

			  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
			    const listLength = list.length;
			    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
			    // depending on the direction and if cycle is allowed

			    if (index === -1) {
			      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
			    }
			    index += shouldGetNext ? 1 : -1;
			    if (isCycleAllowed) {
			      index = (index + listLength) % listLength;
			    }
			    return list[Math.max(0, Math.min(index, listLength - 1))];
			  };
			  exports.defineJQueryPlugin = defineJQueryPlugin;
			  exports.execute = execute;
			  exports.executeAfterTransition = executeAfterTransition;
			  exports.findShadowRoot = findShadowRoot;
			  exports.getElement = getElement;
			  exports.getElementFromSelector = getElementFromSelector;
			  exports.getNextActiveElement = getNextActiveElement;
			  exports.getSelectorFromElement = getSelectorFromElement;
			  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
			  exports.getUID = getUID;
			  exports.getjQuery = getjQuery;
			  exports.isDisabled = isDisabled;
			  exports.isElement = isElement;
			  exports.isRTL = isRTL;
			  exports.isVisible = isVisible;
			  exports.noop = noop;
			  exports.onDOMContentLoaded = onDOMContentLoaded;
			  exports.reflow = reflow;
			  exports.toType = toType;
			  exports.triggerTransitionEnd = triggerTransitionEnd;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (util, util.exports));
		return util.exports;
	}

	var eventHandler = {exports: {}};

	/*!
	  * Bootstrap event-handler.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredEventHandler;

	function requireEventHandler () {
		if (hasRequiredEventHandler) return eventHandler.exports;
		hasRequiredEventHandler = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/event-handler.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
			  const stripNameRegex = /\..*/;
			  const stripUidRegex = /::\d+$/;
			  const eventRegistry = {}; // Events storage

			  let uidEvent = 1;
			  const customEvents = {
			    mouseenter: 'mouseover',
			    mouseleave: 'mouseout'
			  };
			  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
			  /**
			   * Private methods
			   */

			  function makeEventUid(element, uid) {
			    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
			  }
			  function getElementEvents(element) {
			    const uid = makeEventUid(element);
			    element.uidEvent = uid;
			    eventRegistry[uid] = eventRegistry[uid] || {};
			    return eventRegistry[uid];
			  }
			  function bootstrapHandler(element, fn) {
			    return function handler(event) {
			      hydrateObj(event, {
			        delegateTarget: element
			      });
			      if (handler.oneOff) {
			        EventHandler.off(element, event.type, fn);
			      }
			      return fn.apply(element, [event]);
			    };
			  }
			  function bootstrapDelegationHandler(element, selector, fn) {
			    return function handler(event) {
			      const domElements = element.querySelectorAll(selector);
			      for (let {
			        target
			      } = event; target && target !== this; target = target.parentNode) {
			        for (const domElement of domElements) {
			          if (domElement !== target) {
			            continue;
			          }
			          hydrateObj(event, {
			            delegateTarget: target
			          });
			          if (handler.oneOff) {
			            EventHandler.off(element, event.type, selector, fn);
			          }
			          return fn.apply(target, [event]);
			        }
			      }
			    };
			  }
			  function findHandler(events, callable, delegationSelector = null) {
			    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
			  }
			  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
			    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

			    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
			    let typeEvent = getTypeEvent(originalTypeEvent);
			    if (!nativeEvents.has(typeEvent)) {
			      typeEvent = originalTypeEvent;
			    }
			    return [isDelegated, callable, typeEvent];
			  }
			  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
			    if (typeof originalTypeEvent !== 'string' || !element) {
			      return;
			    }
			    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
			    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

			    if (originalTypeEvent in customEvents) {
			      const wrapFunction = fn => {
			        return function (event) {
			          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
			            return fn.call(this, event);
			          }
			        };
			      };
			      callable = wrapFunction(callable);
			    }
			    const events = getElementEvents(element);
			    const handlers = events[typeEvent] || (events[typeEvent] = {});
			    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
			    if (previousFunction) {
			      previousFunction.oneOff = previousFunction.oneOff && oneOff;
			      return;
			    }
			    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
			    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
			    fn.delegationSelector = isDelegated ? handler : null;
			    fn.callable = callable;
			    fn.oneOff = oneOff;
			    fn.uidEvent = uid;
			    handlers[uid] = fn;
			    element.addEventListener(typeEvent, fn, isDelegated);
			  }
			  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
			    const fn = findHandler(events[typeEvent], handler, delegationSelector);
			    if (!fn) {
			      return;
			    }
			    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
			    delete events[typeEvent][fn.uidEvent];
			  }
			  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
			    const storeElementEvent = events[typeEvent] || {};
			    for (const handlerKey of Object.keys(storeElementEvent)) {
			      if (handlerKey.includes(namespace)) {
			        const event = storeElementEvent[handlerKey];
			        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			      }
			    }
			  }
			  function getTypeEvent(event) {
			    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
			    event = event.replace(stripNameRegex, '');
			    return customEvents[event] || event;
			  }
			  const EventHandler = {
			    on(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, false);
			    },
			    one(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, true);
			    },
			    off(element, originalTypeEvent, handler, delegationFunction) {
			      if (typeof originalTypeEvent !== 'string' || !element) {
			        return;
			      }
			      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
			      const inNamespace = typeEvent !== originalTypeEvent;
			      const events = getElementEvents(element);
			      const storeElementEvent = events[typeEvent] || {};
			      const isNamespace = originalTypeEvent.startsWith('.');
			      if (typeof callable !== 'undefined') {
			        // Simplest case: handler is passed, remove that listener ONLY.
			        if (!Object.keys(storeElementEvent).length) {
			          return;
			        }
			        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
			        return;
			      }
			      if (isNamespace) {
			        for (const elementEvent of Object.keys(events)) {
			          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
			        }
			      }
			      for (const keyHandlers of Object.keys(storeElementEvent)) {
			        const handlerKey = keyHandlers.replace(stripUidRegex, '');
			        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
			          const event = storeElementEvent[keyHandlers];
			          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			        }
			      }
			    },
			    trigger(element, event, args) {
			      if (typeof event !== 'string' || !element) {
			        return null;
			      }
			      const $ = index.getjQuery();
			      const typeEvent = getTypeEvent(event);
			      const inNamespace = event !== typeEvent;
			      let jQueryEvent = null;
			      let bubbles = true;
			      let nativeDispatch = true;
			      let defaultPrevented = false;
			      if (inNamespace && $) {
			        jQueryEvent = $.Event(event, args);
			        $(element).trigger(jQueryEvent);
			        bubbles = !jQueryEvent.isPropagationStopped();
			        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
			        defaultPrevented = jQueryEvent.isDefaultPrevented();
			      }
			      let evt = new Event(event, {
			        bubbles,
			        cancelable: true
			      });
			      evt = hydrateObj(evt, args);
			      if (defaultPrevented) {
			        evt.preventDefault();
			      }
			      if (nativeDispatch) {
			        element.dispatchEvent(evt);
			      }
			      if (evt.defaultPrevented && jQueryEvent) {
			        jQueryEvent.preventDefault();
			      }
			      return evt;
			    }
			  };
			  function hydrateObj(obj, meta) {
			    for (const [key, value] of Object.entries(meta || {})) {
			      try {
			        obj[key] = value;
			      } catch (_unused) {
			        Object.defineProperty(obj, key, {
			          configurable: true,
			          get() {
			            return value;
			          }
			        });
			      }
			    }
			    return obj;
			  }
			  return EventHandler;
			});
	} (eventHandler));
		return eventHandler.exports;
	}

	var baseComponent = {exports: {}};

	var data = {exports: {}};

	/*!
	  * Bootstrap data.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredData;

	function requireData () {
		if (hasRequiredData) return data.exports;
		hasRequiredData = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/data.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const elementMap = new Map();
			  const data = {
			    set(element, key, instance) {
			      if (!elementMap.has(element)) {
			        elementMap.set(element, new Map());
			      }
			      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
			      // can be removed later when multiple key/instances are fine to be used

			      if (!instanceMap.has(key) && instanceMap.size !== 0) {
			        // eslint-disable-next-line no-console
			        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
			        return;
			      }
			      instanceMap.set(key, instance);
			    },
			    get(element, key) {
			      if (elementMap.has(element)) {
			        return elementMap.get(element).get(key) || null;
			      }
			      return null;
			    },
			    remove(element, key) {
			      if (!elementMap.has(element)) {
			        return;
			      }
			      const instanceMap = elementMap.get(element);
			      instanceMap.delete(key); // free up element references if there are no instances left for an element

			      if (instanceMap.size === 0) {
			        elementMap.delete(element);
			      }
			    }
			  };
			  return data;
			});
	} (data));
		return data.exports;
	}

	var config = {exports: {}};

	var manipulator = {exports: {}};

	/*!
	  * Bootstrap manipulator.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredManipulator;

	function requireManipulator () {
		if (hasRequiredManipulator) return manipulator.exports;
		hasRequiredManipulator = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/manipulator.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  function normalizeData(value) {
			    if (value === 'true') {
			      return true;
			    }
			    if (value === 'false') {
			      return false;
			    }
			    if (value === Number(value).toString()) {
			      return Number(value);
			    }
			    if (value === '' || value === 'null') {
			      return null;
			    }
			    if (typeof value !== 'string') {
			      return value;
			    }
			    try {
			      return JSON.parse(decodeURIComponent(value));
			    } catch (_unused) {
			      return value;
			    }
			  }
			  function normalizeDataKey(key) {
			    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
			  }
			  const Manipulator = {
			    setDataAttribute(element, key, value) {
			      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
			    },
			    removeDataAttribute(element, key) {
			      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
			    },
			    getDataAttributes(element) {
			      if (!element) {
			        return {};
			      }
			      const attributes = {};
			      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
			      for (const key of bsKeys) {
			        let pureKey = key.replace(/^bs/, '');
			        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
			        attributes[pureKey] = normalizeData(element.dataset[key]);
			      }
			      return attributes;
			    },
			    getDataAttribute(element, key) {
			      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
			    }
			  };
			  return Manipulator;
			});
	} (manipulator));
		return manipulator.exports;
	}

	/*!
	  * Bootstrap config.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredConfig;

	function requireConfig () {
		if (hasRequiredConfig) return config.exports;
		hasRequiredConfig = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil(), requireManipulator()) ;
			})(commonjsGlobal, function (index, Manipulator) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/config.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Class definition
			   */

			  class Config {
			    // Getters
			    static get Default() {
			      return {};
			    }
			    static get DefaultType() {
			      return {};
			    }
			    static get NAME() {
			      throw new Error('You have to implement the static method "NAME", for each component!');
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    }
			    _configAfterMerge(config) {
			      return config;
			    }
			    _mergeConfigObj(config, element) {
			      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

			      return {
			        ...this.constructor.Default,
			        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
			        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
			        ...(typeof config === 'object' ? config : {})
			      };
			    }
			    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
			      for (const property of Object.keys(configTypes)) {
			        const expectedTypes = configTypes[property];
			        const value = config[property];
			        const valueType = index.isElement(value) ? 'element' : index.toType(value);
			        if (!new RegExp(expectedTypes).test(valueType)) {
			          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
			        }
			      }
			    }
			  }
			  return Config;
			});
	} (config));
		return config.exports;
	}

	/*!
	  * Bootstrap base-component.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBaseComponent;

	function requireBaseComponent () {
		if (hasRequiredBaseComponent) return baseComponent.exports;
		hasRequiredBaseComponent = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireData(), requireUtil(), requireEventHandler(), requireConfig()) ;
			})(commonjsGlobal, function (Data, index, EventHandler, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): base-component.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const VERSION = '5.2.3';
			  /**
			   * Class definition
			   */

			  class BaseComponent extends Config__default.default {
			    constructor(element, config) {
			      super();
			      element = index.getElement(element);
			      if (!element) {
			        return;
			      }
			      this._element = element;
			      this._config = this._getConfig(config);
			      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
			    } // Public

			    dispose() {
			      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
			      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
			      for (const propertyName of Object.getOwnPropertyNames(this)) {
			        this[propertyName] = null;
			      }
			    }
			    _queueCallback(callback, element, isAnimated = true) {
			      index.executeAfterTransition(callback, element, isAnimated);
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config, this._element);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    } // Static

			    static getInstance(element) {
			      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
			    }
			    static getOrCreateInstance(element, config = {}) {
			      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
			    }
			    static get VERSION() {
			      return VERSION;
			    }
			    static get DATA_KEY() {
			      return `bs.${this.NAME}`;
			    }
			    static get EVENT_KEY() {
			      return `.${this.DATA_KEY}`;
			    }
			    static eventName(name) {
			      return `${name}${this.EVENT_KEY}`;
			    }
			  }
			  return BaseComponent;
			});
	} (baseComponent));
		return baseComponent.exports;
	}

	var componentFunctions = {exports: {}};

	/*!
	  * Bootstrap component-functions.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredComponentFunctions;

	function requireComponentFunctions () {
		if (hasRequiredComponentFunctions) return componentFunctions.exports;
		hasRequiredComponentFunctions = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports, requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (exports, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/component-functions.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  const enableDismissTrigger = (component, method = 'hide') => {
			    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
			    const name = component.NAME;
			    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
			      if (['A', 'AREA'].includes(this.tagName)) {
			        event.preventDefault();
			      }
			      if (index.isDisabled(this)) {
			        return;
			      }
			      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
			      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

			      instance[method]();
			    });
			  };
			  exports.enableDismissTrigger = enableDismissTrigger;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (componentFunctions, componentFunctions.exports));
		return componentFunctions.exports;
	}

	/*!
	  * Bootstrap alert.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): alert.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'alert';
		  const DATA_KEY = 'bs.alert';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_CLOSE = `close${EVENT_KEY}`;
		  const EVENT_CLOSED = `closed${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  /**
		   * Class definition
		   */

		  class Alert extends BaseComponent__default.default {
		    // Getters
		    static get NAME() {
		      return NAME;
		    } // Public

		    close() {
		      const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);
		      if (closeEvent.defaultPrevented) {
		        return;
		      }
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);
		      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
		    } // Private

		    _destroyElement() {
		      this._element.remove();
		      EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
		      this.dispose();
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Alert.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  componentFunctions.enableDismissTrigger(Alert, 'close');
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Alert);
		  return Alert;
		});
	} (alert$1));

	var alert = alert$1.exports;

	var button$1 = {exports: {}};

	/*!
	  * Bootstrap button.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): button.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'button';
		  const DATA_KEY = 'bs.button';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  /**
		   * Class definition
		   */

		  class Button extends BaseComponent__default.default {
		    // Getters
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
		      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Button.getOrCreateInstance(this);
		        if (config === 'toggle') {
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
		    event.preventDefault();
		    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
		    const data = Button.getOrCreateInstance(button);
		    data.toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Button);
		  return Button;
		});
	} (button$1));

	var button = button$1.exports;

	var carousel$1 = {exports: {}};

	var selectorEngine = {exports: {}};

	/*!
	  * Bootstrap selector-engine.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSelectorEngine;

	function requireSelectorEngine () {
		if (hasRequiredSelectorEngine) return selectorEngine.exports;
		hasRequiredSelectorEngine = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/selector-engine.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const SelectorEngine = {
			    find(selector, element = document.documentElement) {
			      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
			    },
			    findOne(selector, element = document.documentElement) {
			      return Element.prototype.querySelector.call(element, selector);
			    },
			    children(element, selector) {
			      return [].concat(...element.children).filter(child => child.matches(selector));
			    },
			    parents(element, selector) {
			      const parents = [];
			      let ancestor = element.parentNode.closest(selector);
			      while (ancestor) {
			        parents.push(ancestor);
			        ancestor = ancestor.parentNode.closest(selector);
			      }
			      return parents;
			    },
			    prev(element, selector) {
			      let previous = element.previousElementSibling;
			      while (previous) {
			        if (previous.matches(selector)) {
			          return [previous];
			        }
			        previous = previous.previousElementSibling;
			      }
			      return [];
			    },
			    // TODO: this is now unused; remove later along with prev()
			    next(element, selector) {
			      let next = element.nextElementSibling;
			      while (next) {
			        if (next.matches(selector)) {
			          return [next];
			        }
			        next = next.nextElementSibling;
			      }
			      return [];
			    },
			    focusableChildren(element) {
			      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
			      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
			    }
			  };
			  return SelectorEngine;
			});
	} (selectorEngine));
		return selectorEngine.exports;
	}

	var swipe = {exports: {}};

	/*!
	  * Bootstrap swipe.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSwipe;

	function requireSwipe () {
		if (hasRequiredSwipe) return swipe.exports;
		hasRequiredSwipe = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireConfig(), requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (Config, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/swipe.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'swipe';
			  const EVENT_KEY = '.bs.swipe';
			  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
			  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
			  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
			  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
			  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
			  const POINTER_TYPE_TOUCH = 'touch';
			  const POINTER_TYPE_PEN = 'pen';
			  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
			  const SWIPE_THRESHOLD = 40;
			  const Default = {
			    endCallback: null,
			    leftCallback: null,
			    rightCallback: null
			  };
			  const DefaultType = {
			    endCallback: '(function|null)',
			    leftCallback: '(function|null)',
			    rightCallback: '(function|null)'
			  };
			  /**
			   * Class definition
			   */

			  class Swipe extends Config__default.default {
			    constructor(element, config) {
			      super();
			      this._element = element;
			      if (!element || !Swipe.isSupported()) {
			        return;
			      }
			      this._config = this._getConfig(config);
			      this._deltaX = 0;
			      this._supportPointerEvents = Boolean(window.PointerEvent);
			      this._initEvents();
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    dispose() {
			      EventHandler__default.default.off(this._element, EVENT_KEY);
			    } // Private

			    _start(event) {
			      if (!this._supportPointerEvents) {
			        this._deltaX = event.touches[0].clientX;
			        return;
			      }
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX;
			      }
			    }
			    _end(event) {
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX - this._deltaX;
			      }
			      this._handleSwipe();
			      index.execute(this._config.endCallback);
			    }
			    _move(event) {
			      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
			    }
			    _handleSwipe() {
			      const absDeltaX = Math.abs(this._deltaX);
			      if (absDeltaX <= SWIPE_THRESHOLD) {
			        return;
			      }
			      const direction = absDeltaX / this._deltaX;
			      this._deltaX = 0;
			      if (!direction) {
			        return;
			      }
			      index.execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
			    }
			    _initEvents() {
			      if (this._supportPointerEvents) {
			        EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_POINTERUP, event => this._end(event));
			        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
			      } else {
			        EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHEND, event => this._end(event));
			      }
			    }
			    _eventIsPointerPenTouch(event) {
			      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
			    } // Static

			    static isSupported() {
			      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
			    }
			  }
			  return Swipe;
			});
	} (swipe));
		return swipe.exports;
	}

	/*!
	  * Bootstrap carousel.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireSwipe(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, Manipulator, SelectorEngine, Swipe, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Swipe__default = /*#__PURE__*/_interopDefaultLegacy(Swipe);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): carousel.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'carousel';
		  const DATA_KEY = 'bs.carousel';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

		  const ORDER_NEXT = 'next';
		  const ORDER_PREV = 'prev';
		  const DIRECTION_LEFT = 'left';
		  const DIRECTION_RIGHT = 'right';
		  const EVENT_SLIDE = `slide${EVENT_KEY}`;
		  const EVENT_SLID = `slid${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
		  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
		  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_CAROUSEL = 'carousel';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_SLIDE = 'slide';
		  const CLASS_NAME_END = 'carousel-item-end';
		  const CLASS_NAME_START = 'carousel-item-start';
		  const CLASS_NAME_NEXT = 'carousel-item-next';
		  const CLASS_NAME_PREV = 'carousel-item-prev';
		  const SELECTOR_ACTIVE = '.active';
		  const SELECTOR_ITEM = '.carousel-item';
		  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
		  const SELECTOR_ITEM_IMG = '.carousel-item img';
		  const SELECTOR_INDICATORS = '.carousel-indicators';
		  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
		  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
		  const KEY_TO_DIRECTION = {
		    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
		    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
		  };
		  const Default = {
		    interval: 5000,
		    keyboard: true,
		    pause: 'hover',
		    ride: false,
		    touch: true,
		    wrap: true
		  };
		  const DefaultType = {
		    interval: '(number|boolean)',
		    // TODO:v6 remove boolean support
		    keyboard: 'boolean',
		    pause: '(string|boolean)',
		    ride: '(boolean|string)',
		    touch: 'boolean',
		    wrap: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Carousel extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._interval = null;
		      this._activeElement = null;
		      this._isSliding = false;
		      this.touchTimeout = null;
		      this._swipeHelper = null;
		      this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
		      this._addEventListeners();
		      if (this._config.ride === CLASS_NAME_CAROUSEL) {
		        this.cycle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    next() {
		      this._slide(ORDER_NEXT);
		    }
		    nextWhenVisible() {
		      // FIXME TODO use `document.visibilityState`
		      // Don't call next when the page isn't visible
		      // or the carousel or its parent isn't visible
		      if (!document.hidden && index.isVisible(this._element)) {
		        this.next();
		      }
		    }
		    prev() {
		      this._slide(ORDER_PREV);
		    }
		    pause() {
		      if (this._isSliding) {
		        index.triggerTransitionEnd(this._element);
		      }
		      this._clearInterval();
		    }
		    cycle() {
		      this._clearInterval();
		      this._updateInterval();
		      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
		    }
		    _maybeEnableCycle() {
		      if (!this._config.ride) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.cycle());
		        return;
		      }
		      this.cycle();
		    }
		    to(index) {
		      const items = this._getItems();
		      if (index > items.length - 1 || index < 0) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
		        return;
		      }
		      const activeIndex = this._getItemIndex(this._getActive());
		      if (activeIndex === index) {
		        return;
		      }
		      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
		      this._slide(order, items[index]);
		    }
		    dispose() {
		      if (this._swipeHelper) {
		        this._swipeHelper.dispose();
		      }
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      config.defaultInterval = config.interval;
		      return config;
		    }
		    _addEventListeners() {
		      if (this._config.keyboard) {
		        EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		      }
		      if (this._config.pause === 'hover') {
		        EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, () => this.pause());
		        EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle());
		      }
		      if (this._config.touch && Swipe__default.default.isSupported()) {
		        this._addTouchEventListeners();
		      }
		    }
		    _addTouchEventListeners() {
		      for (const img of SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element)) {
		        EventHandler__default.default.on(img, EVENT_DRAG_START, event => event.preventDefault());
		      }
		      const endCallBack = () => {
		        if (this._config.pause !== 'hover') {
		          return;
		        } // If it's a touch-enabled device, mouseenter/leave are fired as
		        // part of the mouse compatibility events on first tap - the carousel
		        // would stop cycling until user tapped out of it;
		        // here, we listen for touchend, explicitly pause the carousel
		        // (as if it's the second time we tap on it, mouseenter compat event
		        // is NOT fired) and after a timeout (to allow for mouse compatibility
		        // events to fire) we explicitly restart cycling

		        this.pause();
		        if (this.touchTimeout) {
		          clearTimeout(this.touchTimeout);
		        }
		        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
		      };
		      const swipeConfig = {
		        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
		        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
		        endCallback: endCallBack
		      };
		      this._swipeHelper = new Swipe__default.default(this._element, swipeConfig);
		    }
		    _keydown(event) {
		      if (/input|textarea/i.test(event.target.tagName)) {
		        return;
		      }
		      const direction = KEY_TO_DIRECTION[event.key];
		      if (direction) {
		        event.preventDefault();
		        this._slide(this._directionToOrder(direction));
		      }
		    }
		    _getItemIndex(element) {
		      return this._getItems().indexOf(element);
		    }
		    _setActiveIndicatorElement(index) {
		      if (!this._indicatorsElement) {
		        return;
		      }
		      const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
		      activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
		      activeIndicator.removeAttribute('aria-current');
		      const newActiveIndicator = SelectorEngine__default.default.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
		      if (newActiveIndicator) {
		        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE);
		        newActiveIndicator.setAttribute('aria-current', 'true');
		      }
		    }
		    _updateInterval() {
		      const element = this._activeElement || this._getActive();
		      if (!element) {
		        return;
		      }
		      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
		      this._config.interval = elementInterval || this._config.defaultInterval;
		    }
		    _slide(order, element = null) {
		      if (this._isSliding) {
		        return;
		      }
		      const activeElement = this._getActive();
		      const isNext = order === ORDER_NEXT;
		      const nextElement = element || index.getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
		      if (nextElement === activeElement) {
		        return;
		      }
		      const nextElementIndex = this._getItemIndex(nextElement);
		      const triggerEvent = eventName => {
		        return EventHandler__default.default.trigger(this._element, eventName, {
		          relatedTarget: nextElement,
		          direction: this._orderToDirection(order),
		          from: this._getItemIndex(activeElement),
		          to: nextElementIndex
		        });
		      };
		      const slideEvent = triggerEvent(EVENT_SLIDE);
		      if (slideEvent.defaultPrevented) {
		        return;
		      }
		      if (!activeElement || !nextElement) {
		        // Some weirdness is happening, so we bail
		        // todo: change tests that use empty divs to avoid this check
		        return;
		      }
		      const isCycling = Boolean(this._interval);
		      this.pause();
		      this._isSliding = true;
		      this._setActiveIndicatorElement(nextElementIndex);
		      this._activeElement = nextElement;
		      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
		      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
		      nextElement.classList.add(orderClassName);
		      index.reflow(nextElement);
		      activeElement.classList.add(directionalClassName);
		      nextElement.classList.add(directionalClassName);
		      const completeCallBack = () => {
		        nextElement.classList.remove(directionalClassName, orderClassName);
		        nextElement.classList.add(CLASS_NAME_ACTIVE);
		        activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
		        this._isSliding = false;
		        triggerEvent(EVENT_SLID);
		      };
		      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
		      if (isCycling) {
		        this.cycle();
		      }
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_SLIDE);
		    }
		    _getActive() {
		      return SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
		    }
		    _getItems() {
		      return SelectorEngine__default.default.find(SELECTOR_ITEM, this._element);
		    }
		    _clearInterval() {
		      if (this._interval) {
		        clearInterval(this._interval);
		        this._interval = null;
		      }
		    }
		    _directionToOrder(direction) {
		      if (index.isRTL()) {
		        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
		      }
		      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
		    }
		    _orderToDirection(order) {
		      if (index.isRTL()) {
		        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
		      }
		      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Carousel.getOrCreateInstance(this, config);
		        if (typeof config === 'number') {
		          data.to(config);
		          return;
		        }
		        if (typeof config === 'string') {
		          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
		      return;
		    }
		    event.preventDefault();
		    const carousel = Carousel.getOrCreateInstance(target);
		    const slideIndex = this.getAttribute('data-bs-slide-to');
		    if (slideIndex) {
		      carousel.to(slideIndex);
		      carousel._maybeEnableCycle();
		      return;
		    }
		    if (Manipulator__default.default.getDataAttribute(this, 'slide') === 'next') {
		      carousel.next();
		      carousel._maybeEnableCycle();
		      return;
		    }
		    carousel.prev();
		    carousel._maybeEnableCycle();
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);
		    for (const carousel of carousels) {
		      Carousel.getOrCreateInstance(carousel);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Carousel);
		  return Carousel;
		});
	} (carousel$1));

	var carousel = carousel$1.exports;

	var collapse$1 = {exports: {}};

	/*!
	  * Bootstrap collapse.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): collapse.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'collapse';
		  const DATA_KEY = 'bs.collapse';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_COLLAPSE = 'collapse';
		  const CLASS_NAME_COLLAPSING = 'collapsing';
		  const CLASS_NAME_COLLAPSED = 'collapsed';
		  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
		  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
		  const WIDTH = 'width';
		  const HEIGHT = 'height';
		  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
		  const Default = {
		    parent: null,
		    toggle: true
		  };
		  const DefaultType = {
		    parent: '(null|element)',
		    toggle: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Collapse extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isTransitioning = false;
		      this._triggerArray = [];
		      const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);
		      for (const elem of toggleList) {
		        const selector = index.getSelectorFromElement(elem);
		        const filterElement = SelectorEngine__default.default.find(selector).filter(foundElement => foundElement === this._element);
		        if (selector !== null && filterElement.length) {
		          this._triggerArray.push(elem);
		        }
		      }
		      this._initializeChildren();
		      if (!this._config.parent) {
		        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
		      }
		      if (this._config.toggle) {
		        this.toggle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      if (this._isShown()) {
		        this.hide();
		      } else {
		        this.show();
		      }
		    }
		    show() {
		      if (this._isTransitioning || this._isShown()) {
		        return;
		      }
		      let activeChildren = []; // find active children

		      if (this._config.parent) {
		        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
		          toggle: false
		        }));
		      }
		      if (activeChildren.length && activeChildren[0]._isTransitioning) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      for (const activeInstance of activeChildren) {
		        activeInstance.hide();
		      }
		      const dimension = this._getDimension();
		      this._element.classList.remove(CLASS_NAME_COLLAPSE);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.style[dimension] = 0;
		      this._addAriaAndCollapsedClass(this._triggerArray, true);
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		        this._element.style[dimension] = '';
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
		      };
		      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
		      const scrollSize = `scroll${capitalizedDimension}`;
		      this._queueCallback(complete, this._element, true);
		      this._element.style[dimension] = `${this._element[scrollSize]}px`;
		    }
		    hide() {
		      if (this._isTransitioning || !this._isShown()) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      const dimension = this._getDimension();
		      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		      for (const trigger of this._triggerArray) {
		        const element = index.getElementFromSelector(trigger);
		        if (element && !this._isShown(element)) {
		          this._addAriaAndCollapsedClass([trigger], false);
		        }
		      }
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE);
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.style[dimension] = '';
		      this._queueCallback(complete, this._element, true);
		    }
		    _isShown(element = this._element) {
		      return element.classList.contains(CLASS_NAME_SHOW);
		    } // Private

		    _configAfterMerge(config) {
		      config.toggle = Boolean(config.toggle); // Coerce string values

		      config.parent = index.getElement(config.parent);
		      return config;
		    }
		    _getDimension() {
		      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
		    }
		    _initializeChildren() {
		      if (!this._config.parent) {
		        return;
		      }
		      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
		      for (const element of children) {
		        const selected = index.getElementFromSelector(element);
		        if (selected) {
		          this._addAriaAndCollapsedClass([element], this._isShown(selected));
		        }
		      }
		    }
		    _getFirstLevelChildren(selector) {
		      const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

		      return SelectorEngine__default.default.find(selector, this._config.parent).filter(element => !children.includes(element));
		    }
		    _addAriaAndCollapsedClass(triggerArray, isOpen) {
		      if (!triggerArray.length) {
		        return;
		      }
		      for (const element of triggerArray) {
		        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
		        element.setAttribute('aria-expanded', isOpen);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      const _config = {};
		      if (typeof config === 'string' && /show|hide/.test(config)) {
		        _config.toggle = false;
		      }
		      return this.each(function () {
		        const data = Collapse.getOrCreateInstance(this, _config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
		    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
		      event.preventDefault();
		    }
		    const selector = index.getSelectorFromElement(this);
		    const selectorElements = SelectorEngine__default.default.find(selector);
		    for (const element of selectorElements) {
		      Collapse.getOrCreateInstance(element, {
		        toggle: false
		      }).toggle();
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Collapse);
		  return Collapse;
		});
	} (collapse$1));

	var collapse = collapse$1.exports;

	var dropdown$1 = {exports: {}};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }
	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]

	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];
	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}
	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;
	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }
	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }
	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getUAString() {
	  var uaData = navigator.userAgentData;
	  if (uaData != null && uaData.brands) {
	    return uaData.brands.map(function (item) {
	      return item.brand + "/" + item.version;
	    }).join(' ');
	  }
	  return navigator.userAgent;
	}

	function isLayoutViewport() {
	  return !/^((?!chrome|android).)*safari/i.test(getUAString());
	}

	function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }
	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }
	  var clientRect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;
	  if (includeScale && isHTMLElement(element)) {
	    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
	    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	  }
	  var _ref = isElement(element) ? getWindow(element) : window,
	    visualViewport = _ref.visualViewport;
	  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	  var width = clientRect.width / scaleX;
	  var height = clientRect.height / scaleY;
	  return {
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: y + height,
	    left: x,
	    x: x,
	    y: y
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;
	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }
	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	    var next = child;
	    do {
	      if (next && parent.isSameNode(next)) {
	        return true;
	      } // $FlowFixMe[prop-missing]: need a better way to handle this...

	      next = next.parentNode || next.host;
	    } while (next);
	  } // Give up, the result is false

	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument :
	  // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }
	  return (
	    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot ||
	    // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || (
	    // DOM Element detected
	    isShadowRoot(element) ? element.host : null) ||
	    // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback
	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) ||
	  // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }
	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block

	function getContainingBlock(element) {
	  var isFirefox = /firefox/i.test(getUAString());
	  var isIE = /Trident/i.test(getUAString());
	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);
	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }
	  var currentNode = getParentNode(element);
	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }
	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.

	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }
	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};
	function arrow(_ref) {
	  var _state$modifiersData$;
	  var state = _ref.state,
	    name = _ref.name,
	    options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';
	  if (!arrowElement || !popperOffsets) {
	    return;
	  }
	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}
	function effect$1(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options;
	  var _options$element = options.element,
	    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
	  if (arrowElement == null) {
	    return;
	  } // CSS selector

	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);
	    if (!arrowElement) {
	      return;
	    }
	  }
	  if (!contains(state.elements.popper, arrowElement)) {
	    return;
	  }
	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules

	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	    y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}
	function mapToStyles(_ref2) {
	  var _Object$assign2;
	  var popper = _ref2.popper,
	    popperRect = _ref2.popperRect,
	    placement = _ref2.placement,
	    variation = _ref2.variation,
	    offsets = _ref2.offsets,
	    position = _ref2.position,
	    gpuAcceleration = _ref2.gpuAcceleration,
	    adaptive = _ref2.adaptive,
	    roundOffsets = _ref2.roundOffsets,
	    isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	    x = _offsets$x === void 0 ? 0 : _offsets$x,
	    _offsets$y = offsets.y,
	    y = _offsets$y === void 0 ? 0 : _offsets$y;
	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;
	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';
	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

	    offsetParent = offsetParent;
	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
	      // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }
	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
	      // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }
	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);
	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref4.x;
	  y = _ref4.y;
	  if (gpuAcceleration) {
	    var _Object$assign;
	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }
	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}
	function computeStyles(_ref5) {
	  var state = _ref5.state,
	    options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	    _options$adaptive = options.adaptive,
	    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	    _options$roundOffsets = options.roundOffsets,
	    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };
	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }
	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};
	function effect(_ref) {
	  var state = _ref.state,
	    instance = _ref.instance,
	    options = _ref.options;
	  var _options$scroll = options.scroll,
	    scroll = _options$scroll === void 0 ? true : _options$scroll,
	    _options$resize = options.resize,
	    resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }
	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }
	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }
	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element, strategy) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0;
	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    var layoutViewport = isLayoutViewport();
	    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;
	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }
	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	    overflow = _getComputedStyle.overflow,
	    overflowX = _getComputedStyle.overflowX,
	    overflowY = _getComputedStyle.overflowY;
	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }
	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }
	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;
	  if (list === void 0) {
	    list = [];
	  }
	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList :
	  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element, strategy) {
	  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}
	function getClientRectFromMixedType(element, clippingParent, strategy) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`

	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents

	function getClippingRect(element, boundary, rootBoundary, strategy) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	    element = _ref.element,
	    placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;
	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;
	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;
	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;
	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }
	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    _options$placement = _options.placement,
	    placement = _options$placement === void 0 ? state.placement : _options$placement,
	    _options$strategy = _options.strategy,
	    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
	    _options$boundary = _options.boundary,
	    boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	    _options$rootBoundary = _options.rootBoundary,
	    rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	    _options$elementConte = _options.elementContext,
	    elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	    _options$altBoundary = _options.altBoundary,
	    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	    _options$padding = _options.padding,
	    padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }
	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    placement = _options.placement,
	    boundary = _options.boundary,
	    rootBoundary = _options.rootBoundary,
	    padding = _options.padding,
	    flipVariations = _options.flipVariations,
	    _options$allowedAutoP = _options.allowedAutoPlacements,
	    allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });
	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }
	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}
	function flip(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  if (state.modifiersData[name]._skip) {
	    return;
	  }
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	    specifiedFallbackPlacements = options.fallbackPlacements,
	    padding = options.padding,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    _options$flipVariatio = options.flipVariations,
	    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	    allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];
	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];
	    var _basePlacement = getBasePlacement(placement);
	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }
	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];
	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }
	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }
	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }
	    checksMap.set(placement, checks);
	  }
	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;
	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);
	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });
	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };
	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);
	      if (_ret === "break") break;
	    }
	  }
	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules

	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }
	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}
	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}
	function hide(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	      placement: placement
	    })) : offset,
	    skidding = _ref[0],
	    distance = _ref[1];
	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}
	function offset(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options,
	    name = _ref2.name;
	  var _options$offset = options.offset,
	    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	    x = _data$state$placement.x,
	    y = _data$state$placement.y;
	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    padding = options.padding,
	    _options$tether = options.tether,
	    tether = _options$tether === void 0 ? true : _options$tether,
	    _options$tetherOffset = options.tetherOffset,
	    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };
	  if (!popperOffsets) {
	    return;
	  }
	  if (checkMainAxis) {
	    var _offsetModifierState$;
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }
	  if (checkAltAxis) {
	    var _offsetModifierState$2;
	    var _mainSide = mainAxis === 'x' ? top : left;
	    var _altSide = mainAxis === 'x' ? bottom : right;
	    var _offset = popperOffsets[altAxis];
	    var _len = altAxis === 'y' ? 'height' : 'width';
	    var _min = _offset + overflow[_mainSide];
	    var _max = _offset - overflow[_altSide];
	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' ||
	    // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }
	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);
	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }
	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}
	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }
	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};
	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}
	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }
	  var _generatorOptions = generatorOptions,
	    _generatorOptions$def = _generatorOptions.defaultModifiers,
	    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	    _generatorOptions$def2 = _generatorOptions.defaultOptions,
	    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }
	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned
	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }
	        var _state$elements = state.elements,
	          reference = _state$elements.reference,
	          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          return;
	        } // Store the reference and popper rects to be read by modifiers

	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }
	          var _state$orderedModifie = state.orderedModifiers[index],
	            fn = _state$orderedModifie.fn,
	            _state$orderedModifie2 = _state$orderedModifie.options,
	            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	            name = _state$orderedModifie.name;
	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };
	    if (!areValidElements(reference, popper)) {
	      return instance;
	    }
	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	          _ref3$options = _ref3.options,
	          options = _ref3$options === void 0 ? {} : _ref3$options,
	          effect = _ref3.effect;
	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });
	          var noopFn = function noopFn() {};
	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }
	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }
	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper$2,
		createPopper: createPopper,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Bootstrap dropdown.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (Popper, index, EventHandler, Manipulator, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  function _interopNamespace(e) {
		    if (e && e.__esModule) return e;
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): dropdown.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'dropdown';
		  const DATA_KEY = 'bs.dropdown';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const TAB_KEY = 'Tab';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_DROPUP = 'dropup';
		  const CLASS_NAME_DROPEND = 'dropend';
		  const CLASS_NAME_DROPSTART = 'dropstart';
		  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
		  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
		  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
		  const SELECTOR_MENU = '.dropdown-menu';
		  const SELECTOR_NAVBAR = '.navbar';
		  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
		  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
		  const PLACEMENT_TOP = index.isRTL() ? 'top-end' : 'top-start';
		  const PLACEMENT_TOPEND = index.isRTL() ? 'top-start' : 'top-end';
		  const PLACEMENT_BOTTOM = index.isRTL() ? 'bottom-end' : 'bottom-start';
		  const PLACEMENT_BOTTOMEND = index.isRTL() ? 'bottom-start' : 'bottom-end';
		  const PLACEMENT_RIGHT = index.isRTL() ? 'left-start' : 'right-start';
		  const PLACEMENT_LEFT = index.isRTL() ? 'right-start' : 'left-start';
		  const PLACEMENT_TOPCENTER = 'top';
		  const PLACEMENT_BOTTOMCENTER = 'bottom';
		  const Default = {
		    autoClose: true,
		    boundary: 'clippingParents',
		    display: 'dynamic',
		    offset: [0, 2],
		    popperConfig: null,
		    reference: 'toggle'
		  };
		  const DefaultType = {
		    autoClose: '(boolean|string)',
		    boundary: '(string|element)',
		    display: 'string',
		    offset: '(array|string|function)',
		    popperConfig: '(null|object|function)',
		    reference: '(string|element|object)'
		  };
		  /**
		   * Class definition
		   */

		  class Dropdown extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._popper = null;
		      this._parent = this._element.parentNode; // dropdown wrapper
		      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      this._menu = SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.findOne(SELECTOR_MENU, this._parent);
		      this._inNavbar = this._detectNavbar();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      return this._isShown() ? this.hide() : this.show();
		    }
		    show() {
		      if (index.isDisabled(this._element) || this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._createPopper(); // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

		      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.on(element, 'mouseover', index.noop);
		        }
		      }
		      this._element.focus();
		      this._element.setAttribute('aria-expanded', true);
		      this._menu.classList.add(CLASS_NAME_SHOW);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
		    }
		    hide() {
		      if (index.isDisabled(this._element) || !this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      this._completeHide(relatedTarget);
		    }
		    dispose() {
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      super.dispose();
		    }
		    update() {
		      this._inNavbar = this._detectNavbar();
		      if (this._popper) {
		        this._popper.update();
		      }
		    } // Private

		    _completeHide(relatedTarget) {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);
		      if (hideEvent.defaultPrevented) {
		        return;
		      } // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.off(element, 'mouseover', index.noop);
		        }
		      }
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      this._menu.classList.remove(CLASS_NAME_SHOW);
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._element.setAttribute('aria-expanded', 'false');
		      Manipulator__default.default.removeDataAttribute(this._menu, 'popper');
		      EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
		    }
		    _getConfig(config) {
		      config = super._getConfig(config);
		      if (typeof config.reference === 'object' && !index.isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
		        // Popper virtual elements require a getBoundingClientRect method
		        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		      }
		      return config;
		    }
		    _createPopper() {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
		      }
		      let referenceElement = this._element;
		      if (this._config.reference === 'parent') {
		        referenceElement = this._parent;
		      } else if (index.isElement(this._config.reference)) {
		        referenceElement = index.getElement(this._config.reference);
		      } else if (typeof this._config.reference === 'object') {
		        referenceElement = this._config.reference;
		      }
		      const popperConfig = this._getPopperConfig();
		      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
		    }
		    _isShown() {
		      return this._menu.classList.contains(CLASS_NAME_SHOW);
		    }
		    _getPlacement() {
		      const parentDropdown = this._parent;
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
		        return PLACEMENT_RIGHT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
		        return PLACEMENT_LEFT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
		        return PLACEMENT_TOPCENTER;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
		        return PLACEMENT_BOTTOMCENTER;
		      } // We need to trim the value because custom properties can also include spaces

		      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
		        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
		      }
		      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
		    }
		    _detectNavbar() {
		      return this._element.closest(SELECTOR_NAVBAR) !== null;
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _getPopperConfig() {
		      const defaultBsPopperConfig = {
		        placement: this._getPlacement(),
		        modifiers: [{
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }]
		      }; // Disable Popper if we have a static display or Dropdown is in Navbar

		      if (this._inNavbar || this._config.display === 'static') {
		        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

		        defaultBsPopperConfig.modifiers = [{
		          name: 'applyStyles',
		          enabled: false
		        }];
		      }
		      return {
		        ...defaultBsPopperConfig,
		        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
		      };
		    }
		    _selectMenuItem({
		      key,
		      target
		    }) {
		      const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => index.isVisible(element));
		      if (!items.length) {
		        return;
		      } // if target isn't included in items (e.g. when expanding the dropdown)
		      // allow cycling to get the last item in case key equals ARROW_UP_KEY

		      index.getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Dropdown.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		    static clearMenus(event) {
		      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
		        return;
		      }
		      const openToggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_SHOWN);
		      for (const toggle of openToggles) {
		        const context = Dropdown.getInstance(toggle);
		        if (!context || context._config.autoClose === false) {
		          continue;
		        }
		        const composedPath = event.composedPath();
		        const isMenuTarget = composedPath.includes(context._menu);
		        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
		          continue;
		        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu

		        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
		          continue;
		        }
		        const relatedTarget = {
		          relatedTarget: context._element
		        };
		        if (event.type === 'click') {
		          relatedTarget.clickEvent = event;
		        }
		        context._completeHide(relatedTarget);
		      }
		    }
		    static dataApiKeydownHandler(event) {
		      // If not an UP | DOWN | ESCAPE key => not a dropdown command
		      // If input/textarea && if key is other than ESCAPE => not a dropdown command
		      const isInput = /input|textarea/i.test(event.target.tagName);
		      const isEscapeEvent = event.key === ESCAPE_KEY;
		      const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
		      if (!isUpOrDownEvent && !isEscapeEvent) {
		        return;
		      }
		      if (isInput && !isEscapeEvent) {
		        return;
		      }
		      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
		      const instance = Dropdown.getOrCreateInstance(getToggleButton);
		      if (isUpOrDownEvent) {
		        event.stopPropagation();
		        instance.show();
		        instance._selectMenuItem(event);
		        return;
		      }
		      if (instance._isShown()) {
		        // else is escape and we check if it is shown
		        event.stopPropagation();
		        instance.hide();
		        getToggleButton.focus();
		      }
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    event.preventDefault();
		    Dropdown.getOrCreateInstance(this).toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Dropdown);
		  return Dropdown;
		});
	} (dropdown$1));

	var dropdown = /*@__PURE__*/getDefaultExportFromCjs(dropdown$1.exports);

	var modal$1 = {exports: {}};

	var scrollbar = {exports: {}};

	/*!
	  * Bootstrap scrollbar.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredScrollbar;

	function requireScrollbar () {
		if (hasRequiredScrollbar) return scrollbar.exports;
		hasRequiredScrollbar = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSelectorEngine(), requireManipulator(), requireUtil()) ;
			})(commonjsGlobal, function (SelectorEngine, Manipulator, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/scrollBar.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
			  const SELECTOR_STICKY_CONTENT = '.sticky-top';
			  const PROPERTY_PADDING = 'padding-right';
			  const PROPERTY_MARGIN = 'margin-right';
			  /**
			   * Class definition
			   */

			  class ScrollBarHelper {
			    constructor() {
			      this._element = document.body;
			    } // Public

			    getWidth() {
			      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
			      const documentWidth = document.documentElement.clientWidth;
			      return Math.abs(window.innerWidth - documentWidth);
			    }
			    hide() {
			      const width = this.getWidth();
			      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width

			      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth

			      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
			      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
			    }
			    reset() {
			      this._resetElementAttributes(this._element, 'overflow');
			      this._resetElementAttributes(this._element, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
			    }
			    isOverflowing() {
			      return this.getWidth() > 0;
			    } // Private

			    _disableOverFlow() {
			      this._saveInitialAttribute(this._element, 'overflow');
			      this._element.style.overflow = 'hidden';
			    }
			    _setElementAttributes(selector, styleProperty, callback) {
			      const scrollbarWidth = this.getWidth();
			      const manipulationCallBack = element => {
			        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
			          return;
			        }
			        this._saveInitialAttribute(element, styleProperty);
			        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
			        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _saveInitialAttribute(element, styleProperty) {
			      const actualValue = element.style.getPropertyValue(styleProperty);
			      if (actualValue) {
			        Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
			      }
			    }
			    _resetElementAttributes(selector, styleProperty) {
			      const manipulationCallBack = element => {
			        const value = Manipulator__default.default.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

			        if (value === null) {
			          element.style.removeProperty(styleProperty);
			          return;
			        }
			        Manipulator__default.default.removeDataAttribute(element, styleProperty);
			        element.style.setProperty(styleProperty, value);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _applyManipulationCallback(selector, callBack) {
			      if (index.isElement(selector)) {
			        callBack(selector);
			        return;
			      }
			      for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
			        callBack(sel);
			      }
			    }
			  }
			  return ScrollBarHelper;
			});
	} (scrollbar));
		return scrollbar.exports;
	}

	var backdrop = {exports: {}};

	/*!
	  * Bootstrap backdrop.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBackdrop;

	function requireBackdrop () {
		if (hasRequiredBackdrop) return backdrop.exports;
		hasRequiredBackdrop = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireUtil(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, index, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/backdrop.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'backdrop';
			  const CLASS_NAME_FADE = 'fade';
			  const CLASS_NAME_SHOW = 'show';
			  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
			  const Default = {
			    className: 'modal-backdrop',
			    clickCallback: null,
			    isAnimated: false,
			    isVisible: true,
			    // if false, we use the backdrop helper without adding any element to the dom
			    rootElement: 'body' // give the choice to place backdrop under different elements
			  };

			  const DefaultType = {
			    className: 'string',
			    clickCallback: '(function|null)',
			    isAnimated: 'boolean',
			    isVisible: 'boolean',
			    rootElement: '(element|string)'
			  };
			  /**
			   * Class definition
			   */

			  class Backdrop extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isAppended = false;
			      this._element = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    show(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._append();
			      const element = this._getElement();
			      if (this._config.isAnimated) {
			        index.reflow(element);
			      }
			      element.classList.add(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        index.execute(callback);
			      });
			    }
			    hide(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._getElement().classList.remove(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        this.dispose();
			        index.execute(callback);
			      });
			    }
			    dispose() {
			      if (!this._isAppended) {
			        return;
			      }
			      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
			      this._element.remove();
			      this._isAppended = false;
			    } // Private

			    _getElement() {
			      if (!this._element) {
			        const backdrop = document.createElement('div');
			        backdrop.className = this._config.className;
			        if (this._config.isAnimated) {
			          backdrop.classList.add(CLASS_NAME_FADE);
			        }
			        this._element = backdrop;
			      }
			      return this._element;
			    }
			    _configAfterMerge(config) {
			      // use getElement() with the default "body" to get a fresh Element on each instantiation
			      config.rootElement = index.getElement(config.rootElement);
			      return config;
			    }
			    _append() {
			      if (this._isAppended) {
			        return;
			      }
			      const element = this._getElement();
			      this._config.rootElement.append(element);
			      EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
			        index.execute(this._config.clickCallback);
			      });
			      this._isAppended = true;
			    }
			    _emulateAnimation(callback) {
			      index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
			    }
			  }
			  return Backdrop;
			});
	} (backdrop));
		return backdrop.exports;
	}

	var focustrap = {exports: {}};

	/*!
	  * Bootstrap focustrap.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredFocustrap;

	function requireFocustrap () {
		if (hasRequiredFocustrap) return focustrap.exports;
		hasRequiredFocustrap = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, SelectorEngine, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/focustrap.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'focustrap';
			  const DATA_KEY = 'bs.focustrap';
			  const EVENT_KEY = `.${DATA_KEY}`;
			  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
			  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
			  const TAB_KEY = 'Tab';
			  const TAB_NAV_FORWARD = 'forward';
			  const TAB_NAV_BACKWARD = 'backward';
			  const Default = {
			    autofocus: true,
			    trapElement: null // The element to trap focus inside of
			  };

			  const DefaultType = {
			    autofocus: 'boolean',
			    trapElement: 'element'
			  };
			  /**
			   * Class definition
			   */

			  class FocusTrap extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isActive = false;
			      this._lastTabNavDirection = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    activate() {
			      if (this._isActive) {
			        return;
			      }
			      if (this._config.autofocus) {
			        this._config.trapElement.focus();
			      }
			      EventHandler__default.default.off(document, EVENT_KEY); // guard against infinite focus loop

			      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
			      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
			      this._isActive = true;
			    }
			    deactivate() {
			      if (!this._isActive) {
			        return;
			      }
			      this._isActive = false;
			      EventHandler__default.default.off(document, EVENT_KEY);
			    } // Private

			    _handleFocusin(event) {
			      const {
			        trapElement
			      } = this._config;
			      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
			        return;
			      }
			      const elements = SelectorEngine__default.default.focusableChildren(trapElement);
			      if (elements.length === 0) {
			        trapElement.focus();
			      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
			        elements[elements.length - 1].focus();
			      } else {
			        elements[0].focus();
			      }
			    }
			    _handleKeydown(event) {
			      if (event.key !== TAB_KEY) {
			        return;
			      }
			      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
			    }
			  }
			  return FocusTrap;
			});
	} (focustrap));
		return focustrap.exports;
	}

	/*!
	  * Bootstrap modal.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireScrollbar(), requireBaseComponent(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, ScrollBarHelper, BaseComponent, Backdrop, FocusTrap, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): modal.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'modal';
		  const DATA_KEY = 'bs.modal';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
		  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_OPEN = 'modal-open';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_STATIC = 'modal-static';
		  const OPEN_SELECTOR = '.modal.show';
		  const SELECTOR_DIALOG = '.modal-dialog';
		  const SELECTOR_MODAL_BODY = '.modal-body';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
		  const Default = {
		    backdrop: true,
		    focus: true,
		    keyboard: true
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    focus: 'boolean',
		    keyboard: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Modal extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._isShown = false;
		      this._isTransitioning = false;
		      this._scrollBar = new ScrollBarHelper__default.default();
		      this._addEventListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown || this._isTransitioning) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._isTransitioning = true;
		      this._scrollBar.hide();
		      document.body.classList.add(CLASS_NAME_OPEN);
		      this._adjustDialog();
		      this._backdrop.show(() => this._showElement(relatedTarget));
		    }
		    hide() {
		      if (!this._isShown || this._isTransitioning) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = false;
		      this._isTransitioning = true;
		      this._focustrap.deactivate();
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
		    }
		    dispose() {
		      for (const htmlElement of [window, this._dialog]) {
		        EventHandler__default.default.off(htmlElement, EVENT_KEY);
		      }
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    }
		    handleUpdate() {
		      this._adjustDialog();
		    } // Private

		    _initializeBackDrop() {
		      return new Backdrop__default.default({
		        isVisible: Boolean(this._config.backdrop),
		        // 'static' option will be translated to true, and booleans will keep their value,
		        isAnimated: this._isAnimated()
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }
		    _showElement(relatedTarget) {
		      // try to append dynamic modal
		      if (!document.body.contains(this._element)) {
		        document.body.append(this._element);
		      }
		      this._element.style.display = 'block';
		      this._element.removeAttribute('aria-hidden');
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.scrollTop = 0;
		      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
		      if (modalBody) {
		        modalBody.scrollTop = 0;
		      }
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      const transitionComplete = () => {
		        if (this._config.focus) {
		          this._focustrap.activate();
		        }
		        this._isTransitioning = false;
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
		    }
		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (this._config.keyboard) {
		          event.preventDefault();
		          this.hide();
		          return;
		        }
		        this._triggerBackdropTransition();
		      });
		      EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		        if (this._isShown && !this._isTransitioning) {
		          this._adjustDialog();
		        }
		      });
		      EventHandler__default.default.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
		        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
		        EventHandler__default.default.one(this._element, EVENT_CLICK_DISMISS, event2 => {
		          if (this._element !== event.target || this._element !== event2.target) {
		            return;
		          }
		          if (this._config.backdrop === 'static') {
		            this._triggerBackdropTransition();
		            return;
		          }
		          if (this._config.backdrop) {
		            this.hide();
		          }
		        });
		      });
		    }
		    _hideModal() {
		      this._element.style.display = 'none';
		      this._element.setAttribute('aria-hidden', true);
		      this._element.removeAttribute('aria-modal');
		      this._element.removeAttribute('role');
		      this._isTransitioning = false;
		      this._backdrop.hide(() => {
		        document.body.classList.remove(CLASS_NAME_OPEN);
		        this._resetAdjustments();
		        this._scrollBar.reset();
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      });
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_FADE);
		    }
		    _triggerBackdropTransition() {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

		      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
		        return;
		      }
		      if (!isModalOverflowing) {
		        this._element.style.overflowY = 'hidden';
		      }
		      this._element.classList.add(CLASS_NAME_STATIC);
		      this._queueCallback(() => {
		        this._element.classList.remove(CLASS_NAME_STATIC);
		        this._queueCallback(() => {
		          this._element.style.overflowY = initialOverflowY;
		        }, this._dialog);
		      }, this._dialog);
		      this._element.focus();
		    }
		    /**
		     * The following methods are used to handle overflowing modals
		     */

		    _adjustDialog() {
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const scrollbarWidth = this._scrollBar.getWidth();
		      const isBodyOverflowing = scrollbarWidth > 0;
		      if (isBodyOverflowing && !isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingLeft' : 'paddingRight';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		      if (!isBodyOverflowing && isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingRight' : 'paddingLeft';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		    }
		    _resetAdjustments() {
		      this._element.style.paddingLeft = '';
		      this._element.style.paddingRight = '';
		    } // Static

		    static jQueryInterface(config, relatedTarget) {
		      return this.each(function () {
		        const data = Modal.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](relatedTarget);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
		      if (showEvent.defaultPrevented) {
		        // only register focus restorer if modal will actually get shown
		        return;
		      }
		      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		        if (index.isVisible(this)) {
		          this.focus();
		        }
		      });
		    }); // avoid conflict when clicking modal toggler while another one is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
		    if (alreadyOpen) {
		      Modal.getInstance(alreadyOpen).hide();
		    }
		    const data = Modal.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  componentFunctions.enableDismissTrigger(Modal);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Modal);
		  return Modal;
		});
	} (modal$1));

	var modal = modal$1.exports;

	var offcanvas$1 = {exports: {}};

	/*!
	  * Bootstrap offcanvas.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireScrollbar(), requireEventHandler(), requireBaseComponent(), requireSelectorEngine(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, ScrollBarHelper, EventHandler, BaseComponent, SelectorEngine, Backdrop, FocusTrap, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): offcanvas.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'offcanvas';
		  const DATA_KEY = 'bs.offcanvas';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const ESCAPE_KEY = 'Escape';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const CLASS_NAME_HIDING = 'hiding';
		  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
		  const OPEN_SELECTOR = '.offcanvas.show';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
		  const Default = {
		    backdrop: true,
		    keyboard: true,
		    scroll: false
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    keyboard: 'boolean',
		    scroll: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Offcanvas extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isShown = false;
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._addEventListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._backdrop.show();
		      if (!this._config.scroll) {
		        new ScrollBarHelper__default.default().hide();
		      }
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      const completeCallBack = () => {
		        if (!this._config.scroll || this._config.backdrop) {
		          this._focustrap.activate();
		        }
		        this._element.classList.add(CLASS_NAME_SHOW);
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(completeCallBack, this._element, true);
		    }
		    hide() {
		      if (!this._isShown) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._focustrap.deactivate();
		      this._element.blur();
		      this._isShown = false;
		      this._element.classList.add(CLASS_NAME_HIDING);
		      this._backdrop.hide();
		      const completeCallback = () => {
		        this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);
		        this._element.removeAttribute('aria-modal');
		        this._element.removeAttribute('role');
		        if (!this._config.scroll) {
		          new ScrollBarHelper__default.default().reset();
		        }
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._queueCallback(completeCallback, this._element, true);
		    }
		    dispose() {
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    } // Private

		    _initializeBackDrop() {
		      const clickCallback = () => {
		        if (this._config.backdrop === 'static') {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }
		        this.hide();
		      }; // 'static' option will be translated to true, and booleans will keep their value

		      const isVisible = Boolean(this._config.backdrop);
		      return new Backdrop__default.default({
		        className: CLASS_NAME_BACKDROP,
		        isVisible,
		        isAnimated: true,
		        rootElement: this._element.parentNode,
		        clickCallback: isVisible ? clickCallback : null
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }
		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (!this._config.keyboard) {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }
		        this.hide();
		      });
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Offcanvas.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index.isDisabled(this)) {
		      return;
		    }
		    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		      // focus on trigger when it is closed
		      if (index.isVisible(this)) {
		        this.focus();
		      }
		    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
		    if (alreadyOpen && alreadyOpen !== target) {
		      Offcanvas.getInstance(alreadyOpen).hide();
		    }
		    const data = Offcanvas.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const selector of SelectorEngine__default.default.find(OPEN_SELECTOR)) {
		      Offcanvas.getOrCreateInstance(selector).show();
		    }
		  });
		  EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		    for (const element of SelectorEngine__default.default.find('[aria-modal][class*=show][class*=offcanvas-]')) {
		      if (getComputedStyle(element).position !== 'fixed') {
		        Offcanvas.getOrCreateInstance(element).hide();
		      }
		    }
		  });
		  componentFunctions.enableDismissTrigger(Offcanvas);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Offcanvas);
		  return Offcanvas;
		});
	} (offcanvas$1));

	var offcanvas = offcanvas$1.exports;

	var popover$1 = {exports: {}};

	var tooltip$1 = {exports: {}};

	var sanitizer = {exports: {}};

	/*!
	  * Bootstrap sanitizer.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSanitizer;

	function requireSanitizer () {
		if (hasRequiredSanitizer) return sanitizer.exports;
		hasRequiredSanitizer = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/sanitizer.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
			  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
			  /**
			   * A pattern that recognizes a commonly useful subset of URLs that are safe.
			   *
			   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
			   */

			  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
			  /**
			   * A pattern that matches safe data URLs. Only matches image, video and audio types.
			   *
			   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
			   */

			  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
			  const allowedAttribute = (attribute, allowedAttributeList) => {
			    const attributeName = attribute.nodeName.toLowerCase();
			    if (allowedAttributeList.includes(attributeName)) {
			      if (uriAttributes.has(attributeName)) {
			        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
			      }
			      return true;
			    } // Check if a regular expression validates the attribute.

			    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
			  };
			  const DefaultAllowlist = {
			    // Global attributes allowed on any supplied element below.
			    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
			    a: ['target', 'href', 'title', 'rel'],
			    area: [],
			    b: [],
			    br: [],
			    col: [],
			    code: [],
			    div: [],
			    em: [],
			    hr: [],
			    h1: [],
			    h2: [],
			    h3: [],
			    h4: [],
			    h5: [],
			    h6: [],
			    i: [],
			    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
			    li: [],
			    ol: [],
			    p: [],
			    pre: [],
			    s: [],
			    small: [],
			    span: [],
			    sub: [],
			    sup: [],
			    strong: [],
			    u: [],
			    ul: []
			  };
			  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
			    if (!unsafeHtml.length) {
			      return unsafeHtml;
			    }
			    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
			      return sanitizeFunction(unsafeHtml);
			    }
			    const domParser = new window.DOMParser();
			    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
			    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
			    for (const element of elements) {
			      const elementName = element.nodeName.toLowerCase();
			      if (!Object.keys(allowList).includes(elementName)) {
			        element.remove();
			        continue;
			      }
			      const attributeList = [].concat(...element.attributes);
			      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
			      for (const attribute of attributeList) {
			        if (!allowedAttribute(attribute, allowedAttributes)) {
			          element.removeAttribute(attribute.nodeName);
			        }
			      }
			    }
			    return createdDocument.body.innerHTML;
			  }
			  exports.DefaultAllowlist = DefaultAllowlist;
			  exports.sanitizeHtml = sanitizeHtml;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (sanitizer, sanitizer.exports));
		return sanitizer.exports;
	}

	var templateFactory = {exports: {}};

	/*!
	  * Bootstrap template-factory.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredTemplateFactory;

	function requireTemplateFactory () {
		if (hasRequiredTemplateFactory) return templateFactory.exports;
		hasRequiredTemplateFactory = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSanitizer(), requireUtil(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (sanitizer, index, SelectorEngine, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/template-factory.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'TemplateFactory';
			  const Default = {
			    allowList: sanitizer.DefaultAllowlist,
			    content: {},
			    // { selector : text ,  selector2 : text2 , }
			    extraClass: '',
			    html: false,
			    sanitize: true,
			    sanitizeFn: null,
			    template: '<div></div>'
			  };
			  const DefaultType = {
			    allowList: 'object',
			    content: 'object',
			    extraClass: '(string|function)',
			    html: 'boolean',
			    sanitize: 'boolean',
			    sanitizeFn: '(null|function)',
			    template: 'string'
			  };
			  const DefaultContentType = {
			    entry: '(string|element|function|null)',
			    selector: '(string|element)'
			  };
			  /**
			   * Class definition
			   */

			  class TemplateFactory extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    getContent() {
			      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
			    }
			    hasContent() {
			      return this.getContent().length > 0;
			    }
			    changeContent(content) {
			      this._checkContent(content);
			      this._config.content = {
			        ...this._config.content,
			        ...content
			      };
			      return this;
			    }
			    toHtml() {
			      const templateWrapper = document.createElement('div');
			      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
			      for (const [selector, text] of Object.entries(this._config.content)) {
			        this._setContent(templateWrapper, text, selector);
			      }
			      const template = templateWrapper.children[0];
			      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
			      if (extraClass) {
			        template.classList.add(...extraClass.split(' '));
			      }
			      return template;
			    } // Private

			    _typeCheckConfig(config) {
			      super._typeCheckConfig(config);
			      this._checkContent(config.content);
			    }
			    _checkContent(arg) {
			      for (const [selector, content] of Object.entries(arg)) {
			        super._typeCheckConfig({
			          selector,
			          entry: content
			        }, DefaultContentType);
			      }
			    }
			    _setContent(template, content, selector) {
			      const templateElement = SelectorEngine__default.default.findOne(selector, template);
			      if (!templateElement) {
			        return;
			      }
			      content = this._resolvePossibleFunction(content);
			      if (!content) {
			        templateElement.remove();
			        return;
			      }
			      if (index.isElement(content)) {
			        this._putElementInTemplate(index.getElement(content), templateElement);
			        return;
			      }
			      if (this._config.html) {
			        templateElement.innerHTML = this._maybeSanitize(content);
			        return;
			      }
			      templateElement.textContent = content;
			    }
			    _maybeSanitize(arg) {
			      return this._config.sanitize ? sanitizer.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
			    }
			    _resolvePossibleFunction(arg) {
			      return typeof arg === 'function' ? arg(this) : arg;
			    }
			    _putElementInTemplate(element, templateElement) {
			      if (this._config.html) {
			        templateElement.innerHTML = '';
			        templateElement.append(element);
			        return;
			      }
			      templateElement.textContent = element.textContent;
			    }
			  }
			  return TemplateFactory;
			});
	} (templateFactory));
		return templateFactory.exports;
	}

	/*!
	  * Bootstrap tooltip.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireUtil(), requireSanitizer(), requireEventHandler(), requireManipulator(), requireBaseComponent(), requireTemplateFactory()) ;
		})(commonjsGlobal, function (Popper, index, sanitizer, EventHandler, Manipulator, BaseComponent, TemplateFactory) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  function _interopNamespace(e) {
		    if (e && e.__esModule) return e;
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const TemplateFactory__default = /*#__PURE__*/_interopDefaultLegacy(TemplateFactory);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): tooltip.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'tooltip';
		  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_MODAL = 'modal';
		  const CLASS_NAME_SHOW = 'show';
		  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
		  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
		  const EVENT_MODAL_HIDE = 'hide.bs.modal';
		  const TRIGGER_HOVER = 'hover';
		  const TRIGGER_FOCUS = 'focus';
		  const TRIGGER_CLICK = 'click';
		  const TRIGGER_MANUAL = 'manual';
		  const EVENT_HIDE = 'hide';
		  const EVENT_HIDDEN = 'hidden';
		  const EVENT_SHOW = 'show';
		  const EVENT_SHOWN = 'shown';
		  const EVENT_INSERTED = 'inserted';
		  const EVENT_CLICK = 'click';
		  const EVENT_FOCUSIN = 'focusin';
		  const EVENT_FOCUSOUT = 'focusout';
		  const EVENT_MOUSEENTER = 'mouseenter';
		  const EVENT_MOUSELEAVE = 'mouseleave';
		  const AttachmentMap = {
		    AUTO: 'auto',
		    TOP: 'top',
		    RIGHT: index.isRTL() ? 'left' : 'right',
		    BOTTOM: 'bottom',
		    LEFT: index.isRTL() ? 'right' : 'left'
		  };
		  const Default = {
		    allowList: sanitizer.DefaultAllowlist,
		    animation: true,
		    boundary: 'clippingParents',
		    container: false,
		    customClass: '',
		    delay: 0,
		    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
		    html: false,
		    offset: [0, 0],
		    placement: 'top',
		    popperConfig: null,
		    sanitize: true,
		    sanitizeFn: null,
		    selector: false,
		    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
		    title: '',
		    trigger: 'hover focus'
		  };
		  const DefaultType = {
		    allowList: 'object',
		    animation: 'boolean',
		    boundary: '(string|element)',
		    container: '(string|element|boolean)',
		    customClass: '(string|function)',
		    delay: '(number|object)',
		    fallbackPlacements: 'array',
		    html: 'boolean',
		    offset: '(array|string|function)',
		    placement: '(string|function)',
		    popperConfig: '(null|object|function)',
		    sanitize: 'boolean',
		    sanitizeFn: '(null|function)',
		    selector: '(string|boolean)',
		    template: 'string',
		    title: '(string|element|function)',
		    trigger: 'string'
		  };
		  /**
		   * Class definition
		   */

		  class Tooltip extends BaseComponent__default.default {
		    constructor(element, config) {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
		      }
		      super(element, config); // Private

		      this._isEnabled = true;
		      this._timeout = 0;
		      this._isHovered = null;
		      this._activeTrigger = {};
		      this._popper = null;
		      this._templateFactory = null;
		      this._newContent = null; // Protected

		      this.tip = null;
		      this._setListeners();
		      if (!this._config.selector) {
		        this._fixTitle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    enable() {
		      this._isEnabled = true;
		    }
		    disable() {
		      this._isEnabled = false;
		    }
		    toggleEnabled() {
		      this._isEnabled = !this._isEnabled;
		    }
		    toggle() {
		      if (!this._isEnabled) {
		        return;
		      }
		      this._activeTrigger.click = !this._activeTrigger.click;
		      if (this._isShown()) {
		        this._leave();
		        return;
		      }
		      this._enter();
		    }
		    dispose() {
		      clearTimeout(this._timeout);
		      EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		      if (this._element.getAttribute('data-bs-original-title')) {
		        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
		      }
		      this._disposePopper();
		      super.dispose();
		    }
		    show() {
		      if (this._element.style.display === 'none') {
		        throw new Error('Please use show on visible elements');
		      }
		      if (!(this._isWithContent() && this._isEnabled)) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
		      const shadowRoot = index.findShadowRoot(this._element);
		      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
		      if (showEvent.defaultPrevented || !isInTheDom) {
		        return;
		      } // todo v6 remove this OR make it optional

		      this._disposePopper();
		      const tip = this._getTipElement();
		      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
		      const {
		        container
		      } = this._config;
		      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
		        container.append(tip);
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
		      }
		      this._popper = this._createPopper(tip);
		      tip.classList.add(CLASS_NAME_SHOW); // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.on(element, 'mouseover', index.noop);
		        }
		      }
		      const complete = () => {
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOWN));
		        if (this._isHovered === false) {
		          this._leave();
		        }
		        this._isHovered = false;
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    hide() {
		      if (!this._isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDE));
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const tip = this._getTipElement();
		      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.off(element, 'mouseover', index.noop);
		        }
		      }
		      this._activeTrigger[TRIGGER_CLICK] = false;
		      this._activeTrigger[TRIGGER_FOCUS] = false;
		      this._activeTrigger[TRIGGER_HOVER] = false;
		      this._isHovered = null; // it is a trick to support manual triggering

		      const complete = () => {
		        if (this._isWithActiveTrigger()) {
		          return;
		        }
		        if (!this._isHovered) {
		          this._disposePopper();
		        }
		        this._element.removeAttribute('aria-describedby');
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN));
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    update() {
		      if (this._popper) {
		        this._popper.update();
		      }
		    } // Protected

		    _isWithContent() {
		      return Boolean(this._getTitle());
		    }
		    _getTipElement() {
		      if (!this.tip) {
		        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
		      }
		      return this.tip;
		    }
		    _createTipElement(content) {
		      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6

		      if (!tip) {
		        return null;
		      }
		      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW); // todo: on v6 the following can be achieved with CSS only

		      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
		      const tipId = index.getUID(this.constructor.NAME).toString();
		      tip.setAttribute('id', tipId);
		      if (this._isAnimated()) {
		        tip.classList.add(CLASS_NAME_FADE);
		      }
		      return tip;
		    }
		    setContent(content) {
		      this._newContent = content;
		      if (this._isShown()) {
		        this._disposePopper();
		        this.show();
		      }
		    }
		    _getTemplateFactory(content) {
		      if (this._templateFactory) {
		        this._templateFactory.changeContent(content);
		      } else {
		        this._templateFactory = new TemplateFactory__default.default({
		          ...this._config,
		          // the `content` var has to be after `this._config`
		          // to override config.content in case of popover
		          content,
		          extraClass: this._resolvePossibleFunction(this._config.customClass)
		        });
		      }
		      return this._templateFactory;
		    }
		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
		      };
		    }
		    _getTitle() {
		      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
		    } // Private

		    _initializeOnDelegatedTarget(event) {
		      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
		    }
		    _isAnimated() {
		      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
		    }
		    _isShown() {
		      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
		    }
		    _createPopper(tip) {
		      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
		      const attachment = AttachmentMap[placement.toUpperCase()];
		      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _resolvePossibleFunction(arg) {
		      return typeof arg === 'function' ? arg.call(this._element) : arg;
		    }
		    _getPopperConfig(attachment) {
		      const defaultBsPopperConfig = {
		        placement: attachment,
		        modifiers: [{
		          name: 'flip',
		          options: {
		            fallbackPlacements: this._config.fallbackPlacements
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }, {
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'arrow',
		          options: {
		            element: `.${this.constructor.NAME}-arrow`
		          }
		        }, {
		          name: 'preSetPlacement',
		          enabled: true,
		          phase: 'beforeMain',
		          fn: data => {
		            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
		            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
		            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
		          }
		        }]
		      };
		      return {
		        ...defaultBsPopperConfig,
		        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
		      };
		    }
		    _setListeners() {
		      const triggers = this._config.trigger.split(' ');
		      for (const trigger of triggers) {
		        if (trigger === 'click') {
		          EventHandler__default.default.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context.toggle();
		          });
		        } else if (trigger !== TRIGGER_MANUAL) {
		          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
		          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
		          EventHandler__default.default.on(this._element, eventIn, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
		            context._enter();
		          });
		          EventHandler__default.default.on(this._element, eventOut, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
		            context._leave();
		          });
		        }
		      }
		      this._hideModalHandler = () => {
		        if (this._element) {
		          this.hide();
		        }
		      };
		      EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		    }
		    _fixTitle() {
		      const title = this._element.getAttribute('title');
		      if (!title) {
		        return;
		      }
		      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
		        this._element.setAttribute('aria-label', title);
		      }
		      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility

		      this._element.removeAttribute('title');
		    }
		    _enter() {
		      if (this._isShown() || this._isHovered) {
		        this._isHovered = true;
		        return;
		      }
		      this._isHovered = true;
		      this._setTimeout(() => {
		        if (this._isHovered) {
		          this.show();
		        }
		      }, this._config.delay.show);
		    }
		    _leave() {
		      if (this._isWithActiveTrigger()) {
		        return;
		      }
		      this._isHovered = false;
		      this._setTimeout(() => {
		        if (!this._isHovered) {
		          this.hide();
		        }
		      }, this._config.delay.hide);
		    }
		    _setTimeout(handler, timeout) {
		      clearTimeout(this._timeout);
		      this._timeout = setTimeout(handler, timeout);
		    }
		    _isWithActiveTrigger() {
		      return Object.values(this._activeTrigger).includes(true);
		    }
		    _getConfig(config) {
		      const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);
		      for (const dataAttribute of Object.keys(dataAttributes)) {
		        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
		          delete dataAttributes[dataAttribute];
		        }
		      }
		      config = {
		        ...dataAttributes,
		        ...(typeof config === 'object' && config ? config : {})
		      };
		      config = this._mergeConfigObj(config);
		      config = this._configAfterMerge(config);
		      this._typeCheckConfig(config);
		      return config;
		    }
		    _configAfterMerge(config) {
		      config.container = config.container === false ? document.body : index.getElement(config.container);
		      if (typeof config.delay === 'number') {
		        config.delay = {
		          show: config.delay,
		          hide: config.delay
		        };
		      }
		      if (typeof config.title === 'number') {
		        config.title = config.title.toString();
		      }
		      if (typeof config.content === 'number') {
		        config.content = config.content.toString();
		      }
		      return config;
		    }
		    _getDelegateConfig() {
		      const config = {};
		      for (const key in this._config) {
		        if (this.constructor.Default[key] !== this._config[key]) {
		          config[key] = this._config[key];
		        }
		      }
		      config.selector = false;
		      config.trigger = 'manual'; // In the future can be replaced with:
		      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
		      // `Object.fromEntries(keysWithDifferentValues)`

		      return config;
		    }
		    _disposePopper() {
		      if (this._popper) {
		        this._popper.destroy();
		        this._popper = null;
		      }
		      if (this.tip) {
		        this.tip.remove();
		        this.tip = null;
		      }
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tooltip.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Tooltip);
		  return Tooltip;
		});
	} (tooltip$1));

	var tooltip = /*@__PURE__*/getDefaultExportFromCjs(tooltip$1.exports);

	/*!
	  * Bootstrap popover.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), tooltip$1.exports) ;
		})(commonjsGlobal, function (index, Tooltip) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): popover.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'popover';
		  const SELECTOR_TITLE = '.popover-header';
		  const SELECTOR_CONTENT = '.popover-body';
		  const Default = {
		    ...Tooltip__default.default.Default,
		    content: '',
		    offset: [0, 8],
		    placement: 'right',
		    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
		    trigger: 'click'
		  };
		  const DefaultType = {
		    ...Tooltip__default.default.DefaultType,
		    content: '(null|string|element|function)'
		  };
		  /**
		   * Class definition
		   */

		  class Popover extends Tooltip__default.default {
		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Overrides

		    _isWithContent() {
		      return this._getTitle() || this._getContent();
		    } // Private

		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TITLE]: this._getTitle(),
		        [SELECTOR_CONTENT]: this._getContent()
		      };
		    }
		    _getContent() {
		      return this._resolvePossibleFunction(this._config.content);
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Popover.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Popover);
		  return Popover;
		});
	} (popover$1));

	var popover = popover$1.exports;

	var scrollspy$1 = {exports: {}};

	/*!
	  * Bootstrap scrollspy.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): scrollspy.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'scrollspy';
		  const DATA_KEY = 'bs.scrollspy';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
		  const EVENT_CLICK = `click${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
		  const SELECTOR_TARGET_LINKS = '[href]';
		  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
		  const SELECTOR_NAV_LINKS = '.nav-link';
		  const SELECTOR_NAV_ITEMS = '.nav-item';
		  const SELECTOR_LIST_ITEMS = '.list-group-item';
		  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
		  const SELECTOR_DROPDOWN = '.dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const Default = {
		    offset: null,
		    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: '0px 0px -25%',
		    smoothScroll: false,
		    target: null,
		    threshold: [0.1, 0.5, 1]
		  };
		  const DefaultType = {
		    offset: '(number|null)',
		    // TODO v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: 'string',
		    smoothScroll: 'boolean',
		    target: 'element',
		    threshold: 'array'
		  };
		  /**
		   * Class definition
		   */

		  class ScrollSpy extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
		      this._activeTarget = null;
		      this._observer = null;
		      this._previousScrollData = {
		        visibleEntryTop: 0,
		        parentScrollTop: 0
		      };
		      this.refresh(); // initialize
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    refresh() {
		      this._initializeTargetsAndObservables();
		      this._maybeEnableSmoothScroll();
		      if (this._observer) {
		        this._observer.disconnect();
		      } else {
		        this._observer = this._getNewObserver();
		      }
		      for (const section of this._observableSections.values()) {
		        this._observer.observe(section);
		      }
		    }
		    dispose() {
		      this._observer.disconnect();
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
		      config.target = index.getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

		      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
		      if (typeof config.threshold === 'string') {
		        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
		      }
		      return config;
		    }
		    _maybeEnableSmoothScroll() {
		      if (!this._config.smoothScroll) {
		        return;
		      } // unregister any previous listeners

		      EventHandler__default.default.off(this._config.target, EVENT_CLICK);
		      EventHandler__default.default.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
		        const observableSection = this._observableSections.get(event.target.hash);
		        if (observableSection) {
		          event.preventDefault();
		          const root = this._rootElement || window;
		          const height = observableSection.offsetTop - this._element.offsetTop;
		          if (root.scrollTo) {
		            root.scrollTo({
		              top: height,
		              behavior: 'smooth'
		            });
		            return;
		          } // Chrome 60 doesn't support `scrollTo`

		          root.scrollTop = height;
		        }
		      });
		    }
		    _getNewObserver() {
		      const options = {
		        root: this._rootElement,
		        threshold: this._config.threshold,
		        rootMargin: this._config.rootMargin
		      };
		      return new IntersectionObserver(entries => this._observerCallback(entries), options);
		    } // The logic of selection

		    _observerCallback(entries) {
		      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
		      const activate = entry => {
		        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
		        this._process(targetElement(entry));
		      };
		      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
		      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
		      this._previousScrollData.parentScrollTop = parentScrollTop;
		      for (const entry of entries) {
		        if (!entry.isIntersecting) {
		          this._activeTarget = null;
		          this._clearActiveClass(targetElement(entry));
		          continue;
		        }
		        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

		        if (userScrollsDown && entryIsLowerThanPrevious) {
		          activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

		          if (!parentScrollTop) {
		            return;
		          }
		          continue;
		        } // if we are scrolling up, pick the smallest offsetTop

		        if (!userScrollsDown && !entryIsLowerThanPrevious) {
		          activate(entry);
		        }
		      }
		    }
		    _initializeTargetsAndObservables() {
		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      const targetLinks = SelectorEngine__default.default.find(SELECTOR_TARGET_LINKS, this._config.target);
		      for (const anchor of targetLinks) {
		        // ensure that the anchor has an id and is not disabled
		        if (!anchor.hash || index.isDisabled(anchor)) {
		          continue;
		        }
		        const observableSection = SelectorEngine__default.default.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

		        if (index.isVisible(observableSection)) {
		          this._targetLinks.set(anchor.hash, anchor);
		          this._observableSections.set(anchor.hash, observableSection);
		        }
		      }
		    }
		    _process(target) {
		      if (this._activeTarget === target) {
		        return;
		      }
		      this._clearActiveClass(this._config.target);
		      this._activeTarget = target;
		      target.classList.add(CLASS_NAME_ACTIVE);
		      this._activateParents(target);
		      EventHandler__default.default.trigger(this._element, EVENT_ACTIVATE, {
		        relatedTarget: target
		      });
		    }
		    _activateParents(target) {
		      // Activate dropdown parents
		      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
		        SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
		        return;
		      }
		      for (const listGroup of SelectorEngine__default.default.parents(target, SELECTOR_NAV_LIST_GROUP)) {
		        // Set triggered links parents as active
		        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
		        for (const item of SelectorEngine__default.default.prev(listGroup, SELECTOR_LINK_ITEMS)) {
		          item.classList.add(CLASS_NAME_ACTIVE);
		        }
		      }
		    }
		    _clearActiveClass(parent) {
		      parent.classList.remove(CLASS_NAME_ACTIVE);
		      const activeNodes = SelectorEngine__default.default.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE}`, parent);
		      for (const node of activeNodes) {
		        node.classList.remove(CLASS_NAME_ACTIVE);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = ScrollSpy.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const spy of SelectorEngine__default.default.find(SELECTOR_DATA_SPY)) {
		      ScrollSpy.getOrCreateInstance(spy);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(ScrollSpy);
		  return ScrollSpy;
		});
	} (scrollspy$1));

	var scrollspy = scrollspy$1.exports;

	var tab$1 = {exports: {}};

	/*!
	  * Bootstrap tab.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): tab.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'tab';
		  const DATA_KEY = 'bs.tab';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_DROPDOWN = 'dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
		  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
		  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
		  const SELECTOR_OUTER = '.nav-item, .list-group-item';
		  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

		  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
		  /**
		   * Class definition
		   */

		  class Tab extends BaseComponent__default.default {
		    constructor(element) {
		      super(element);
		      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
		      if (!this._parent) {
		        return; // todo: should Throw exception on v6
		        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
		      } // Set up initial aria attributes

		      this._setInitialAttributes(this._parent, this._getChildren());
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		    } // Getters

		    static get NAME() {
		      return NAME;
		    } // Public

		    show() {
		      // Shows this elem and deactivate the active sibling if exists
		      const innerElem = this._element;
		      if (this._elemIsActive(innerElem)) {
		        return;
		      } // Search for active tab on same parent to deactivate it

		      const active = this._getActiveElem();
		      const hideEvent = active ? EventHandler__default.default.trigger(active, EVENT_HIDE, {
		        relatedTarget: innerElem
		      }) : null;
		      const showEvent = EventHandler__default.default.trigger(innerElem, EVENT_SHOW, {
		        relatedTarget: active
		      });
		      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
		        return;
		      }
		      this._deactivate(active, innerElem);
		      this._activate(innerElem, active);
		    } // Private

		    _activate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.add(CLASS_NAME_ACTIVE);
		      this._activate(index.getElementFromSelector(element)); // Search and activate/show the proper section

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.add(CLASS_NAME_SHOW);
		          return;
		        }
		        element.removeAttribute('tabindex');
		        element.setAttribute('aria-selected', true);
		        this._toggleDropDown(element, true);
		        EventHandler__default.default.trigger(element, EVENT_SHOWN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _deactivate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.remove(CLASS_NAME_ACTIVE);
		      element.blur();
		      this._deactivate(index.getElementFromSelector(element)); // Search and deactivate the shown section too

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.remove(CLASS_NAME_SHOW);
		          return;
		        }
		        element.setAttribute('aria-selected', false);
		        element.setAttribute('tabindex', '-1');
		        this._toggleDropDown(element, false);
		        EventHandler__default.default.trigger(element, EVENT_HIDDEN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _keydown(event) {
		      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
		        return;
		      }
		      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

		      event.preventDefault();
		      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
		      const nextActiveElement = index.getNextActiveElement(this._getChildren().filter(element => !index.isDisabled(element)), event.target, isNext, true);
		      if (nextActiveElement) {
		        nextActiveElement.focus({
		          preventScroll: true
		        });
		        Tab.getOrCreateInstance(nextActiveElement).show();
		      }
		    }
		    _getChildren() {
		      // collection of inner elements
		      return SelectorEngine__default.default.find(SELECTOR_INNER_ELEM, this._parent);
		    }
		    _getActiveElem() {
		      return this._getChildren().find(child => this._elemIsActive(child)) || null;
		    }
		    _setInitialAttributes(parent, children) {
		      this._setAttributeIfNotExists(parent, 'role', 'tablist');
		      for (const child of children) {
		        this._setInitialAttributesOnChild(child);
		      }
		    }
		    _setInitialAttributesOnChild(child) {
		      child = this._getInnerElement(child);
		      const isActive = this._elemIsActive(child);
		      const outerElem = this._getOuterElement(child);
		      child.setAttribute('aria-selected', isActive);
		      if (outerElem !== child) {
		        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
		      }
		      if (!isActive) {
		        child.setAttribute('tabindex', '-1');
		      }
		      this._setAttributeIfNotExists(child, 'role', 'tab'); // set attributes to the related panel too

		      this._setInitialAttributesOnTargetPanel(child);
		    }
		    _setInitialAttributesOnTargetPanel(child) {
		      const target = index.getElementFromSelector(child);
		      if (!target) {
		        return;
		      }
		      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
		      if (child.id) {
		        this._setAttributeIfNotExists(target, 'aria-labelledby', `#${child.id}`);
		      }
		    }
		    _toggleDropDown(element, open) {
		      const outerElem = this._getOuterElement(element);
		      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
		        return;
		      }
		      const toggle = (selector, className) => {
		        const element = SelectorEngine__default.default.findOne(selector, outerElem);
		        if (element) {
		          element.classList.toggle(className, open);
		        }
		      };
		      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
		      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
		      outerElem.setAttribute('aria-expanded', open);
		    }
		    _setAttributeIfNotExists(element, attribute, value) {
		      if (!element.hasAttribute(attribute)) {
		        element.setAttribute(attribute, value);
		      }
		    }
		    _elemIsActive(elem) {
		      return elem.classList.contains(CLASS_NAME_ACTIVE);
		    } // Try to get the inner element (usually the .nav-link)

		    _getInnerElement(elem) {
		      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine__default.default.findOne(SELECTOR_INNER_ELEM, elem);
		    } // Try to get the outer element (usually the .nav-item)

		    _getOuterElement(elem) {
		      return elem.closest(SELECTOR_OUTER) || elem;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tab.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index.isDisabled(this)) {
		      return;
		    }
		    Tab.getOrCreateInstance(this).show();
		  });
		  /**
		   * Initialize on focus
		   */

		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const element of SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
		      Tab.getOrCreateInstance(element);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Tab);
		  return Tab;
		});
	} (tab$1));

	var tab = tab$1.exports;

	var toast$1 = {exports: {}};

	/*!
	  * Bootstrap toast.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): toast.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'toast';
		  const DATA_KEY = 'bs.toast';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
		  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
		  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
		  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const DefaultType = {
		    animation: 'boolean',
		    autohide: 'boolean',
		    delay: 'number'
		  };
		  const Default = {
		    animation: true,
		    autohide: true,
		    delay: 5000
		  };
		  /**
		   * Class definition
		   */

		  class Toast extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._timeout = null;
		      this._hasMouseInteraction = false;
		      this._hasKeyboardInteraction = false;
		      this._setListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    show() {
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._clearTimeout();
		      if (this._config.animation) {
		        this._element.classList.add(CLASS_NAME_FADE);
		      }
		      const complete = () => {
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
		        this._maybeScheduleHide();
		      };
		      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated

		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    hide() {
		      if (!this.isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const complete = () => {
		        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated

		        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    dispose() {
		      this._clearTimeout();
		      if (this.isShown()) {
		        this._element.classList.remove(CLASS_NAME_SHOW);
		      }
		      super.dispose();
		    }
		    isShown() {
		      return this._element.classList.contains(CLASS_NAME_SHOW);
		    } // Private

		    _maybeScheduleHide() {
		      if (!this._config.autohide) {
		        return;
		      }
		      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
		        return;
		      }
		      this._timeout = setTimeout(() => {
		        this.hide();
		      }, this._config.delay);
		    }
		    _onInteraction(event, isInteracting) {
		      switch (event.type) {
		        case 'mouseover':
		        case 'mouseout':
		          {
		            this._hasMouseInteraction = isInteracting;
		            break;
		          }
		        case 'focusin':
		        case 'focusout':
		          {
		            this._hasKeyboardInteraction = isInteracting;
		            break;
		          }
		      }
		      if (isInteracting) {
		        this._clearTimeout();
		        return;
		      }
		      const nextElement = event.relatedTarget;
		      if (this._element === nextElement || this._element.contains(nextElement)) {
		        return;
		      }
		      this._maybeScheduleHide();
		    }
		    _setListeners() {
		      EventHandler__default.default.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
		      EventHandler__default.default.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
		      EventHandler__default.default.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
		      EventHandler__default.default.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
		    }
		    _clearTimeout() {
		      clearTimeout(this._timeout);
		      this._timeout = null;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Toast.getOrCreateInstance(this, config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config](this);
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  componentFunctions.enableDismissTrigger(Toast);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Toast);
		  return Toast;
		});
	} (toast$1));

	var toast = toast$1.exports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	        element;
	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }
	      element = document.getElementById(id);
	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }
	        element.focus();
	      }
	    }, false);
	  }
	})();

	var uikit = {exports: {}};

	/*! UIkit 3.16.22 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory() ;
		})(commonjsGlobal, function () {

		  const {
		    hasOwnProperty,
		    toString
		  } = Object.prototype;
		  function hasOwn(obj, key) {
		    return hasOwnProperty.call(obj, key);
		  }
		  const hyphenateRe = /\B([A-Z])/g;
		  const hyphenate = memoize(str => str.replace(hyphenateRe, "-$1").toLowerCase());
		  const camelizeRe = /-(\w)/g;
		  const camelize = memoize(str => (str.charAt(0).toLowerCase() + str.slice(1)).replace(camelizeRe, (_, c) => c.toUpperCase()));
		  const ucfirst = memoize(str => str.charAt(0).toUpperCase() + str.slice(1));
		  function startsWith(str, search) {
		    var _a;
		    return (_a = str == null ? void 0 : str.startsWith) == null ? void 0 : _a.call(str, search);
		  }
		  function endsWith(str, search) {
		    var _a;
		    return (_a = str == null ? void 0 : str.endsWith) == null ? void 0 : _a.call(str, search);
		  }
		  function includes(obj, search) {
		    var _a;
		    return (_a = obj == null ? void 0 : obj.includes) == null ? void 0 : _a.call(obj, search);
		  }
		  function findIndex(array, predicate) {
		    var _a;
		    return (_a = array == null ? void 0 : array.findIndex) == null ? void 0 : _a.call(array, predicate);
		  }
		  const {
		    isArray,
		    from: toArray
		  } = Array;
		  const {
		    assign
		  } = Object;
		  function isFunction(obj) {
		    return typeof obj === "function";
		  }
		  function isObject(obj) {
		    return obj !== null && typeof obj === "object";
		  }
		  function isPlainObject(obj) {
		    return toString.call(obj) === "[object Object]";
		  }
		  function isWindow(obj) {
		    return isObject(obj) && obj === obj.window;
		  }
		  function isDocument(obj) {
		    return nodeType(obj) === 9;
		  }
		  function isNode(obj) {
		    return nodeType(obj) >= 1;
		  }
		  function isElement(obj) {
		    return nodeType(obj) === 1;
		  }
		  function nodeType(obj) {
		    return !isWindow(obj) && isObject(obj) && obj.nodeType;
		  }
		  function isBoolean(value) {
		    return typeof value === "boolean";
		  }
		  function isString(value) {
		    return typeof value === "string";
		  }
		  function isNumber(value) {
		    return typeof value === "number";
		  }
		  function isNumeric(value) {
		    return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
		  }
		  function isEmpty(obj) {
		    return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
		  }
		  function isUndefined(value) {
		    return value === void 0;
		  }
		  function toBoolean(value) {
		    return isBoolean(value) ? value : value === "true" || value === "1" || value === "" ? true : value === "false" || value === "0" ? false : value;
		  }
		  function toNumber(value) {
		    const number = Number(value);
		    return isNaN(number) ? false : number;
		  }
		  function toFloat(value) {
		    return parseFloat(value) || 0;
		  }
		  function toNode(element) {
		    return toNodes(element)[0];
		  }
		  function toNodes(element) {
		    return isNode(element) ? [element] : Array.from(element || []).filter(isNode);
		  }
		  function toWindow(element) {
		    if (isWindow(element)) {
		      return element;
		    }
		    element = toNode(element);
		    const document = isDocument(element) ? element : element == null ? void 0 : element.ownerDocument;
		    return (document == null ? void 0 : document.defaultView) || window;
		  }
		  function isEqual(value, other) {
		    return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, (val, key) => val === other[key]);
		  }
		  function swap(value, a, b) {
		    return value.replace(new RegExp(`${a}|${b}`, "g"), match => match === a ? b : a);
		  }
		  function last(array) {
		    return array[array.length - 1];
		  }
		  function each(obj, cb) {
		    for (const key in obj) {
		      if (false === cb(obj[key], key)) {
		        return false;
		      }
		    }
		    return true;
		  }
		  function sortBy$1(array, prop) {
		    return array.slice().sort(({
		      [prop]: propA = 0
		    }, {
		      [prop]: propB = 0
		    }) => propA > propB ? 1 : propB > propA ? -1 : 0);
		  }
		  function sumBy(array, iteratee) {
		    return array.reduce((sum, item) => sum + toFloat(isFunction(iteratee) ? iteratee(item) : item[iteratee]), 0);
		  }
		  function uniqueBy(array, prop) {
		    const seen = /* @__PURE__ */new Set();
		    return array.filter(({
		      [prop]: check
		    }) => seen.has(check) ? false : seen.add(check));
		  }
		  function pick(obj, props) {
		    return props.reduce((res, prop) => ({
		      ...res,
		      [prop]: obj[prop]
		    }), {});
		  }
		  function clamp(number, min = 0, max = 1) {
		    return Math.min(Math.max(toNumber(number) || 0, min), max);
		  }
		  function noop() {}
		  function intersectRect(...rects) {
		    return [["bottom", "top"], ["right", "left"]].every(([minProp, maxProp]) => Math.min(...rects.map(({
		      [minProp]: min
		    }) => min)) - Math.max(...rects.map(({
		      [maxProp]: max
		    }) => max)) > 0);
		  }
		  function pointInRect(point, rect) {
		    return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
		  }
		  function ratio(dimensions, prop, value) {
		    const aProp = prop === "width" ? "height" : "width";
		    return {
		      [aProp]: dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp],
		      [prop]: value
		    };
		  }
		  function contain(dimensions, maxDimensions) {
		    dimensions = {
		      ...dimensions
		    };
		    for (const prop in dimensions) {
		      dimensions = dimensions[prop] > maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
		    }
		    return dimensions;
		  }
		  function cover$1(dimensions, maxDimensions) {
		    dimensions = contain(dimensions, maxDimensions);
		    for (const prop in dimensions) {
		      dimensions = dimensions[prop] < maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
		    }
		    return dimensions;
		  }
		  const Dimensions = {
		    ratio,
		    contain,
		    cover: cover$1
		  };
		  function getIndex(i, elements, current = 0, finite = false) {
		    elements = toNodes(elements);
		    const {
		      length
		    } = elements;
		    if (!length) {
		      return -1;
		    }
		    i = isNumeric(i) ? toNumber(i) : i === "next" ? current + 1 : i === "previous" ? current - 1 : i === "last" ? length - 1 : elements.indexOf(toNode(i));
		    if (finite) {
		      return clamp(i, 0, length - 1);
		    }
		    i %= length;
		    return i < 0 ? i + length : i;
		  }
		  function memoize(fn) {
		    const cache = /* @__PURE__ */Object.create(null);
		    return key => cache[key] || (cache[key] = fn(key));
		  }
		  function attr(element, name, value) {
		    var _a;
		    if (isObject(name)) {
		      for (const key in name) {
		        attr(element, key, name[key]);
		      }
		      return;
		    }
		    if (isUndefined(value)) {
		      return (_a = toNode(element)) == null ? void 0 : _a.getAttribute(name);
		    } else {
		      for (const el of toNodes(element)) {
		        if (isFunction(value)) {
		          value = value.call(el, attr(el, name));
		        }
		        if (value === null) {
		          removeAttr(el, name);
		        } else {
		          el.setAttribute(name, value);
		        }
		      }
		    }
		  }
		  function hasAttr(element, name) {
		    return toNodes(element).some(element2 => element2.hasAttribute(name));
		  }
		  function removeAttr(element, name) {
		    toNodes(element).forEach(element2 => element2.removeAttribute(name));
		  }
		  function data(element, attribute) {
		    for (const name of [attribute, `data-${attribute}`]) {
		      if (hasAttr(element, name)) {
		        return attr(element, name);
		      }
		    }
		  }
		  const voidElements = {
		    area: true,
		    base: true,
		    br: true,
		    col: true,
		    embed: true,
		    hr: true,
		    img: true,
		    input: true,
		    keygen: true,
		    link: true,
		    meta: true,
		    param: true,
		    source: true,
		    track: true,
		    wbr: true
		  };
		  function isVoidElement(element) {
		    return toNodes(element).some(element2 => voidElements[element2.tagName.toLowerCase()]);
		  }
		  function isVisible(element) {
		    return toNodes(element).some(element2 => element2.offsetWidth || element2.offsetHeight || element2.getClientRects().length);
		  }
		  const selInput = "input,select,textarea,button";
		  function isInput(element) {
		    return toNodes(element).some(element2 => matches(element2, selInput));
		  }
		  const selFocusable = `${selInput},a[href],[tabindex]`;
		  function isFocusable(element) {
		    return matches(element, selFocusable);
		  }
		  function parent(element) {
		    var _a;
		    return (_a = toNode(element)) == null ? void 0 : _a.parentElement;
		  }
		  function filter$1(element, selector) {
		    return toNodes(element).filter(element2 => matches(element2, selector));
		  }
		  function matches(element, selector) {
		    return toNodes(element).some(element2 => element2.matches(selector));
		  }
		  function closest(element, selector) {
		    return isElement(element) ? element.closest(startsWith(selector, ">") ? selector.slice(1) : selector) : toNodes(element).map(element2 => closest(element2, selector)).filter(Boolean);
		  }
		  function within(element, selector) {
		    return isString(selector) ? !!closest(element, selector) : toNode(selector).contains(toNode(element));
		  }
		  function parents(element, selector) {
		    const elements = [];
		    while (element = parent(element)) {
		      if (!selector || matches(element, selector)) {
		        elements.push(element);
		      }
		    }
		    return elements;
		  }
		  function children(element, selector) {
		    element = toNode(element);
		    const children2 = element ? toArray(element.children) : [];
		    return selector ? filter$1(children2, selector) : children2;
		  }
		  function index(element, ref) {
		    return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
		  }
		  function isSameSiteAnchor(el) {
		    el = toNode(el);
		    return el && ["origin", "pathname", "search"].every(part => el[part] === location[part]);
		  }
		  function getTargetedElement(el) {
		    if (isSameSiteAnchor(el)) {
		      el = toNode(el);
		      const id = decodeURIComponent(el.hash).substring(1);
		      return document.getElementById(id) || document.getElementsByName(id)[0];
		    }
		  }
		  function query(selector, context) {
		    return find(selector, getContext(selector, context));
		  }
		  function queryAll(selector, context) {
		    return findAll(selector, getContext(selector, context));
		  }
		  function find(selector, context) {
		    return toNode(_query(selector, toNode(context), "querySelector"));
		  }
		  function findAll(selector, context) {
		    return toNodes(_query(selector, toNode(context), "querySelectorAll"));
		  }
		  const contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
		  const isContextSelector = memoize(selector => selector.match(contextSelectorRe));
		  function getContext(selector, context = document) {
		    return isString(selector) && isContextSelector(selector) || isDocument(context) ? context : context.ownerDocument;
		  }
		  const contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
		  const sanatize = memoize(selector => selector.replace(contextSanitizeRe, "$1 *"));
		  function _query(selector, context = document, queryFn) {
		    if (!selector || !isString(selector)) {
		      return selector;
		    }
		    selector = sanatize(selector);
		    if (isContextSelector(selector)) {
		      const split = splitSelector(selector);
		      selector = "";
		      for (let sel of split) {
		        let ctx = context;
		        if (sel[0] === "!") {
		          const selectors = sel.substr(1).trim().split(" ");
		          ctx = closest(parent(context), selectors[0]);
		          sel = selectors.slice(1).join(" ").trim();
		          if (!sel.length && split.length === 1) {
		            return ctx;
		          }
		        }
		        if (sel[0] === "-") {
		          const selectors = sel.substr(1).trim().split(" ");
		          const prev = (ctx || context).previousElementSibling;
		          ctx = matches(prev, sel.substr(1)) ? prev : null;
		          sel = selectors.slice(1).join(" ");
		        }
		        if (ctx) {
		          selector += `${selector ? "," : ""}${domPath(ctx)} ${sel}`;
		        }
		      }
		      context = document;
		    }
		    try {
		      return context[queryFn](selector);
		    } catch (e) {
		      return null;
		    }
		  }
		  const selectorRe = /.*?[^\\](?:,|$)/g;
		  const splitSelector = memoize(selector => selector.match(selectorRe).map(selector2 => selector2.replace(/,$/, "").trim()));
		  function domPath(element) {
		    const names = [];
		    while (element.parentNode) {
		      const id = attr(element, "id");
		      if (id) {
		        names.unshift(`#${escape(id)}`);
		        break;
		      } else {
		        let {
		          tagName
		        } = element;
		        if (tagName !== "HTML") {
		          tagName += `:nth-child(${index(element) + 1})`;
		        }
		        names.unshift(tagName);
		        element = element.parentNode;
		      }
		    }
		    return names.join(" > ");
		  }
		  function escape(css) {
		    return isString(css) ? CSS.escape(css) : "";
		  }
		  function on(...args) {
		    let [targets, types, selector, listener, useCapture = false] = getArgs(args);
		    if (listener.length > 1) {
		      listener = detail(listener);
		    }
		    if (useCapture == null ? void 0 : useCapture.self) {
		      listener = selfFilter(listener);
		    }
		    if (selector) {
		      listener = delegate(selector, listener);
		    }
		    for (const type of types) {
		      for (const target of targets) {
		        target.addEventListener(type, listener, useCapture);
		      }
		    }
		    return () => off(targets, types, listener, useCapture);
		  }
		  function off(...args) {
		    let [targets, types,, listener, useCapture = false] = getArgs(args);
		    for (const type of types) {
		      for (const target of targets) {
		        target.removeEventListener(type, listener, useCapture);
		      }
		    }
		  }
		  function once(...args) {
		    const [element, types, selector, listener, useCapture = false, condition] = getArgs(args);
		    const off2 = on(element, types, selector, e => {
		      const result = !condition || condition(e);
		      if (result) {
		        off2();
		        listener(e, result);
		      }
		    }, useCapture);
		    return off2;
		  }
		  function trigger(targets, event, detail2) {
		    return toEventTargets(targets).every(target => target.dispatchEvent(createEvent(event, true, true, detail2)));
		  }
		  function createEvent(e, bubbles = true, cancelable = false, detail2) {
		    if (isString(e)) {
		      e = new CustomEvent(e, {
		        bubbles,
		        cancelable,
		        detail: detail2
		      });
		    }
		    return e;
		  }
		  function getArgs(args) {
		    args[0] = toEventTargets(args[0]);
		    if (isString(args[1])) {
		      args[1] = args[1].split(" ");
		    }
		    if (isFunction(args[2])) {
		      args.splice(2, 0, false);
		    }
		    return args;
		  }
		  function delegate(selector, listener) {
		    return e => {
		      const current = selector[0] === ">" ? findAll(selector, e.currentTarget).reverse().filter(element => within(e.target, element))[0] : closest(e.target, selector);
		      if (current) {
		        e.current = current;
		        listener.call(this, e);
		        delete e.current;
		      }
		    };
		  }
		  function detail(listener) {
		    return e => isArray(e.detail) ? listener(e, ...e.detail) : listener(e);
		  }
		  function selfFilter(listener) {
		    return function (e) {
		      if (e.target === e.currentTarget || e.target === e.current) {
		        return listener.call(null, e);
		      }
		    };
		  }
		  function isEventTarget(target) {
		    return target && "addEventListener" in target;
		  }
		  function toEventTarget(target) {
		    return isEventTarget(target) ? target : toNode(target);
		  }
		  function toEventTargets(target) {
		    return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [target] : toNodes(target);
		  }
		  function isTouch(e) {
		    return e.pointerType === "touch" || !!e.touches;
		  }
		  function getEventPos(e) {
		    var _a, _b;
		    const {
		      clientX: x,
		      clientY: y
		    } = ((_a = e.touches) == null ? void 0 : _a[0]) || ((_b = e.changedTouches) == null ? void 0 : _b[0]) || e;
		    return {
		      x,
		      y
		    };
		  }
		  const cssNumber = {
		    "animation-iteration-count": true,
		    "column-count": true,
		    "fill-opacity": true,
		    "flex-grow": true,
		    "flex-shrink": true,
		    "font-weight": true,
		    "line-height": true,
		    opacity: true,
		    order: true,
		    orphans: true,
		    "stroke-dasharray": true,
		    "stroke-dashoffset": true,
		    widows: true,
		    "z-index": true,
		    zoom: true
		  };
		  function css(element, property, value, priority) {
		    const elements = toNodes(element);
		    for (const element2 of elements) {
		      if (isString(property)) {
		        property = propName(property);
		        if (isUndefined(value)) {
		          return getComputedStyle(element2).getPropertyValue(property);
		        } else {
		          element2.style.setProperty(property, isNumeric(value) && !cssNumber[property] ? `${value}px` : value || isNumber(value) ? value : "", priority);
		        }
		      } else if (isArray(property)) {
		        const props = {};
		        for (const prop of property) {
		          props[prop] = css(element2, prop);
		        }
		        return props;
		      } else if (isObject(property)) {
		        priority = value;
		        each(property, (value2, property2) => css(element2, property2, value2, priority));
		      }
		    }
		    return elements[0];
		  }
		  const propName = memoize(name => vendorPropName(name));
		  function vendorPropName(name) {
		    if (startsWith(name, "--")) {
		      return name;
		    }
		    name = hyphenate(name);
		    const {
		      style
		    } = document.documentElement;
		    if (name in style) {
		      return name;
		    }
		    for (const prefix of ["webkit", "moz"]) {
		      const prefixedName = `-${prefix}-${name}`;
		      if (prefixedName in style) {
		        return prefixedName;
		      }
		    }
		  }
		  function addClass(element, ...args) {
		    apply$1(element, args, "add");
		  }
		  function removeClass(element, ...args) {
		    apply$1(element, args, "remove");
		  }
		  function removeClasses(element, cls) {
		    attr(element, "class", value => (value || "").replace(new RegExp(`\\b${cls}\\b\\s?`, "g"), ""));
		  }
		  function replaceClass(element, ...args) {
		    args[0] && removeClass(element, args[0]);
		    args[1] && addClass(element, args[1]);
		  }
		  function hasClass(element, cls) {
		    [cls] = getClasses(cls);
		    return !!cls && toNodes(element).some(node => node.classList.contains(cls));
		  }
		  function toggleClass(element, cls, force) {
		    const classes = getClasses(cls);
		    if (!isUndefined(force)) {
		      force = !!force;
		    }
		    for (const node of toNodes(element)) {
		      for (const cls2 of classes) {
		        node.classList.toggle(cls2, force);
		      }
		    }
		  }
		  function apply$1(element, args, fn) {
		    args = args.reduce((args2, arg) => args2.concat(getClasses(arg)), []);
		    for (const node of toNodes(element)) {
		      node.classList[fn](...args);
		    }
		  }
		  function getClasses(str) {
		    return String(str).split(/[ ,]/).filter(Boolean);
		  }
		  function transition$1(element, props, duration = 400, timing = "linear") {
		    duration = Math.round(duration);
		    return Promise.all(toNodes(element).map(element2 => new Promise((resolve, reject) => {
		      for (const name in props) {
		        const value = css(element2, name);
		        if (value === "") {
		          css(element2, name, value);
		        }
		      }
		      const timer = setTimeout(() => trigger(element2, "transitionend"), duration);
		      once(element2, "transitionend transitioncanceled", ({
		        type
		      }) => {
		        clearTimeout(timer);
		        removeClass(element2, "uk-transition");
		        css(element2, {
		          transitionProperty: "",
		          transitionDuration: "",
		          transitionTimingFunction: ""
		        });
		        type === "transitioncanceled" ? reject() : resolve(element2);
		      }, {
		        self: true
		      });
		      addClass(element2, "uk-transition");
		      css(element2, {
		        transitionProperty: Object.keys(props).map(propName).join(","),
		        transitionDuration: `${duration}ms`,
		        transitionTimingFunction: timing,
		        ...props
		      });
		    })));
		  }
		  const Transition = {
		    start: transition$1,
		    async stop(element) {
		      trigger(element, "transitionend");
		      await Promise.resolve();
		    },
		    async cancel(element) {
		      trigger(element, "transitioncanceled");
		      await Promise.resolve();
		    },
		    inProgress(element) {
		      return hasClass(element, "uk-transition");
		    }
		  };
		  const animationPrefix = "uk-animation-";
		  function animate$2(element, animation, duration = 200, origin, out) {
		    return Promise.all(toNodes(element).map(element2 => new Promise((resolve, reject) => {
		      trigger(element2, "animationcanceled");
		      const timer = setTimeout(() => trigger(element2, "animationend"), duration);
		      once(element2, "animationend animationcanceled", ({
		        type
		      }) => {
		        clearTimeout(timer);
		        type === "animationcanceled" ? reject() : resolve(element2);
		        css(element2, "animationDuration", "");
		        removeClasses(element2, `${animationPrefix}\\S*`);
		      }, {
		        self: true
		      });
		      css(element2, "animationDuration", `${duration}ms`);
		      addClass(element2, animation, animationPrefix + (out ? "leave" : "enter"));
		      if (startsWith(animation, animationPrefix)) {
		        origin && addClass(element2, `uk-transform-origin-${origin}`);
		        out && addClass(element2, `${animationPrefix}reverse`);
		      }
		    })));
		  }
		  const inProgressRe = new RegExp(`${animationPrefix}(enter|leave)`);
		  const Animation = {
		    in: animate$2,
		    out(element, animation, duration, origin) {
		      return animate$2(element, animation, duration, origin, true);
		    },
		    inProgress(element) {
		      return inProgressRe.test(attr(element, "class"));
		    },
		    cancel(element) {
		      trigger(element, "animationcanceled");
		    }
		  };
		  function ready(fn) {
		    if (document.readyState !== "loading") {
		      fn();
		      return;
		    }
		    once(document, "DOMContentLoaded", fn);
		  }
		  function isTag(element, ...tagNames) {
		    return tagNames.some(tagName => {
		      var _a;
		      return ((_a = element == null ? void 0 : element.tagName) == null ? void 0 : _a.toLowerCase()) === tagName.toLowerCase();
		    });
		  }
		  function empty(element) {
		    element = $(element);
		    element.innerHTML = "";
		    return element;
		  }
		  function html(parent2, html2) {
		    return isUndefined(html2) ? $(parent2).innerHTML : append(empty(parent2), html2);
		  }
		  const prepend = applyFn("prepend");
		  const append = applyFn("append");
		  const before = applyFn("before");
		  const after = applyFn("after");
		  function applyFn(fn) {
		    return function (ref, element) {
		      var _a;
		      const nodes = toNodes(isString(element) ? fragment(element) : element);
		      (_a = $(ref)) == null ? void 0 : _a[fn](...nodes);
		      return unwrapSingle(nodes);
		    };
		  }
		  function remove$1(element) {
		    toNodes(element).forEach(element2 => element2.remove());
		  }
		  function wrapAll(element, structure) {
		    structure = toNode(before(element, structure));
		    while (structure.firstChild) {
		      structure = structure.firstChild;
		    }
		    append(structure, element);
		    return structure;
		  }
		  function wrapInner(element, structure) {
		    return toNodes(toNodes(element).map(element2 => element2.hasChildNodes() ? wrapAll(toArray(element2.childNodes), structure) : append(element2, structure)));
		  }
		  function unwrap(element) {
		    toNodes(element).map(parent).filter((value, index, self) => self.indexOf(value) === index).forEach(parent2 => parent2.replaceWith(...parent2.childNodes));
		  }
		  const fragmentRe = /^\s*<(\w+|!)[^>]*>/;
		  const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
		  function fragment(html2) {
		    const matches = singleTagRe.exec(html2);
		    if (matches) {
		      return document.createElement(matches[1]);
		    }
		    const container = document.createElement("div");
		    if (fragmentRe.test(html2)) {
		      container.insertAdjacentHTML("beforeend", html2.trim());
		    } else {
		      container.textContent = html2;
		    }
		    return unwrapSingle(container.childNodes);
		  }
		  function unwrapSingle(nodes) {
		    return nodes.length > 1 ? nodes : nodes[0];
		  }
		  function apply(node, fn) {
		    if (!isElement(node)) {
		      return;
		    }
		    fn(node);
		    node = node.firstElementChild;
		    while (node) {
		      const next = node.nextElementSibling;
		      apply(node, fn);
		      node = next;
		    }
		  }
		  function $(selector, context) {
		    return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
		  }
		  function $$(selector, context) {
		    return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
		  }
		  function isHtml(str) {
		    return isString(str) && startsWith(str.trim(), "<");
		  }
		  const dirs$1 = {
		    width: ["left", "right"],
		    height: ["top", "bottom"]
		  };
		  function dimensions$1(element) {
		    const rect = isElement(element) ? toNode(element).getBoundingClientRect() : {
		      height: height(element),
		      width: width(element),
		      top: 0,
		      left: 0
		    };
		    return {
		      height: rect.height,
		      width: rect.width,
		      top: rect.top,
		      left: rect.left,
		      bottom: rect.top + rect.height,
		      right: rect.left + rect.width
		    };
		  }
		  function offset(element, coordinates) {
		    const currentOffset = dimensions$1(element);
		    if (element) {
		      const {
		        scrollY,
		        scrollX
		      } = toWindow(element);
		      const offsetBy = {
		        height: scrollY,
		        width: scrollX
		      };
		      for (const dir in dirs$1) {
		        for (const prop of dirs$1[dir]) {
		          currentOffset[prop] += offsetBy[dir];
		        }
		      }
		    }
		    if (!coordinates) {
		      return currentOffset;
		    }
		    const pos = css(element, "position");
		    each(css(element, ["left", "top"]), (value, prop) => css(element, prop, coordinates[prop] - currentOffset[prop] + toFloat(pos === "absolute" && value === "auto" ? position(element)[prop] : value)));
		  }
		  function position(element) {
		    let {
		      top,
		      left
		    } = offset(element);
		    const {
		      ownerDocument: {
		        body,
		        documentElement
		      },
		      offsetParent
		    } = toNode(element);
		    let parent = offsetParent || documentElement;
		    while (parent && (parent === body || parent === documentElement) && css(parent, "position") === "static") {
		      parent = parent.parentNode;
		    }
		    if (isElement(parent)) {
		      const parentOffset = offset(parent);
		      top -= parentOffset.top + toFloat(css(parent, "borderTopWidth"));
		      left -= parentOffset.left + toFloat(css(parent, "borderLeftWidth"));
		    }
		    return {
		      top: top - toFloat(css(element, "marginTop")),
		      left: left - toFloat(css(element, "marginLeft"))
		    };
		  }
		  function offsetPosition(element) {
		    element = toNode(element);
		    const offset2 = [element.offsetTop, element.offsetLeft];
		    while (element = element.offsetParent) {
		      offset2[0] += element.offsetTop + toFloat(css(element, `borderTopWidth`));
		      offset2[1] += element.offsetLeft + toFloat(css(element, `borderLeftWidth`));
		      if (css(element, "position") === "fixed") {
		        const win = toWindow(element);
		        offset2[0] += win.scrollY;
		        offset2[1] += win.scrollX;
		        return offset2;
		      }
		    }
		    return offset2;
		  }
		  const height = dimension("height");
		  const width = dimension("width");
		  function dimension(prop) {
		    const propName = ucfirst(prop);
		    return (element, value) => {
		      if (isUndefined(value)) {
		        if (isWindow(element)) {
		          return element[`inner${propName}`];
		        }
		        if (isDocument(element)) {
		          const doc = element.documentElement;
		          return Math.max(doc[`offset${propName}`], doc[`scroll${propName}`]);
		        }
		        element = toNode(element);
		        value = css(element, prop);
		        value = value === "auto" ? element[`offset${propName}`] : toFloat(value) || 0;
		        return value - boxModelAdjust(element, prop);
		      } else {
		        return css(element, prop, !value && value !== 0 ? "" : +value + boxModelAdjust(element, prop) + "px");
		      }
		    };
		  }
		  function boxModelAdjust(element, prop, sizing = "border-box") {
		    return css(element, "boxSizing") === sizing ? sumBy(dirs$1[prop].map(ucfirst), prop2 => toFloat(css(element, `padding${prop2}`)) + toFloat(css(element, `border${prop2}Width`))) : 0;
		  }
		  function flipPosition(pos) {
		    for (const dir in dirs$1) {
		      for (const i in dirs$1[dir]) {
		        if (dirs$1[dir][i] === pos) {
		          return dirs$1[dir][1 - i];
		        }
		      }
		    }
		    return pos;
		  }
		  function toPx(value, property = "width", element = window, offsetDim = false) {
		    if (!isString(value)) {
		      return toFloat(value);
		    }
		    return sumBy(parseCalc(value), value2 => {
		      const unit = parseUnit(value2);
		      return unit ? percent(unit === "vh" ? getViewportHeight() : unit === "vw" ? width(toWindow(element)) : offsetDim ? element[`offset${ucfirst(property)}`] : dimensions$1(element)[property], value2) : value2;
		    });
		  }
		  const calcRe = /-?\d+(?:\.\d+)?(?:v[wh]|%|px)?/g;
		  const parseCalc = memoize(calc => calc.toString().replace(/\s/g, "").match(calcRe) || []);
		  const unitRe$1 = /(?:v[hw]|%)$/;
		  const parseUnit = memoize(str => (str.match(unitRe$1) || [])[0]);
		  function percent(base, value) {
		    return base * toFloat(value) / 100;
		  }
		  let vh;
		  let vhEl;
		  function getViewportHeight() {
		    if (vh) {
		      return vh;
		    }
		    if (!vhEl) {
		      vhEl = $("<div>");
		      css(vhEl, {
		        height: "100vh",
		        position: "fixed"
		      });
		      on(window, "resize", () => vh = null);
		    }
		    append(document.body, vhEl);
		    vh = vhEl.clientHeight;
		    remove$1(vhEl);
		    return vh;
		  }
		  const inBrowser = typeof window !== "undefined";
		  const isRtl = inBrowser && document.dir === "rtl";
		  const hasTouch = inBrowser && "ontouchstart" in window;
		  const hasPointerEvents = inBrowser && window.PointerEvent;
		  const pointerDown$1 = hasPointerEvents ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
		  const pointerMove$1 = hasPointerEvents ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
		  const pointerUp$1 = hasPointerEvents ? "pointerup" : hasTouch ? "touchend" : "mouseup";
		  const pointerEnter = hasPointerEvents ? "pointerenter" : hasTouch ? "" : "mouseenter";
		  const pointerLeave = hasPointerEvents ? "pointerleave" : hasTouch ? "" : "mouseleave";
		  const pointerCancel = hasPointerEvents ? "pointercancel" : "touchcancel";
		  const fastdom = {
		    reads: [],
		    writes: [],
		    read(task) {
		      this.reads.push(task);
		      scheduleFlush();
		      return task;
		    },
		    write(task) {
		      this.writes.push(task);
		      scheduleFlush();
		      return task;
		    },
		    clear(task) {
		      remove(this.reads, task);
		      remove(this.writes, task);
		    },
		    flush
		  };
		  function flush(recursion) {
		    runTasks(fastdom.reads);
		    runTasks(fastdom.writes.splice(0));
		    fastdom.scheduled = false;
		    if (fastdom.reads.length || fastdom.writes.length) {
		      scheduleFlush(recursion + 1);
		    }
		  }
		  const RECURSION_LIMIT = 4;
		  function scheduleFlush(recursion) {
		    if (fastdom.scheduled) {
		      return;
		    }
		    fastdom.scheduled = true;
		    if (recursion && recursion < RECURSION_LIMIT) {
		      Promise.resolve().then(() => flush(recursion));
		    } else {
		      requestAnimationFrame(() => flush(1));
		    }
		  }
		  function runTasks(tasks) {
		    let task;
		    while (task = tasks.shift()) {
		      try {
		        task();
		      } catch (e) {
		        console.error(e);
		      }
		    }
		  }
		  function remove(array, item) {
		    const index = array.indexOf(item);
		    return ~index && array.splice(index, 1);
		  }
		  function MouseTracker() {}
		  MouseTracker.prototype = {
		    positions: [],
		    init() {
		      this.positions = [];
		      let position;
		      this.unbind = on(document, "mousemove", e => position = getEventPos(e));
		      this.interval = setInterval(() => {
		        if (!position) {
		          return;
		        }
		        this.positions.push(position);
		        if (this.positions.length > 5) {
		          this.positions.shift();
		        }
		      }, 50);
		    },
		    cancel() {
		      var _a;
		      (_a = this.unbind) == null ? void 0 : _a.call(this);
		      clearInterval(this.interval);
		    },
		    movesTo(target) {
		      if (this.positions.length < 2) {
		        return false;
		      }
		      const p = target.getBoundingClientRect();
		      const {
		        left,
		        right,
		        top,
		        bottom
		      } = p;
		      const [prevPosition] = this.positions;
		      const position = last(this.positions);
		      const path = [prevPosition, position];
		      if (pointInRect(position, p)) {
		        return false;
		      }
		      const diagonals = [[{
		        x: left,
		        y: top
		      }, {
		        x: right,
		        y: bottom
		      }], [{
		        x: left,
		        y: bottom
		      }, {
		        x: right,
		        y: top
		      }]];
		      return diagonals.some(diagonal => {
		        const intersection = intersect(path, diagonal);
		        return intersection && pointInRect(intersection, p);
		      });
		    }
		  };
		  function intersect([{
		    x: x1,
		    y: y1
		  }, {
		    x: x2,
		    y: y2
		  }], [{
		    x: x3,
		    y: y3
		  }, {
		    x: x4,
		    y: y4
		  }]) {
		    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
		    if (denominator === 0) {
		      return false;
		    }
		    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
		    if (ua < 0) {
		      return false;
		    }
		    return {
		      x: x1 + ua * (x2 - x1),
		      y: y1 + ua * (y2 - y1)
		    };
		  }
		  function observeIntersection(targets, cb, options = {}, {
		    intersecting = true
		  } = {}) {
		    const observer = new IntersectionObserver(intersecting ? (entries, observer2) => {
		      if (entries.some(entry => entry.isIntersecting)) {
		        cb(entries, observer2);
		      }
		    } : cb, options);
		    for (const el of toNodes(targets)) {
		      observer.observe(el);
		    }
		    return observer;
		  }
		  const hasResizeObserver = inBrowser && window.ResizeObserver;
		  function observeResize(targets, cb, options = {
		    box: "border-box"
		  }) {
		    if (hasResizeObserver) {
		      return observe$1(ResizeObserver, targets, cb, options);
		    }
		    const off = [on(window, "load resize", cb), on(document, "loadedmetadata load", cb, true)];
		    return {
		      disconnect: () => off.map(cb2 => cb2())
		    };
		  }
		  function observeViewportResize(cb) {
		    return {
		      disconnect: on([window, window.visualViewport], "resize", cb)
		    };
		  }
		  function observeMutation(targets, cb, options) {
		    return observe$1(MutationObserver, targets, cb, options);
		  }
		  function observe$1(Observer, targets, cb, options) {
		    const observer = new Observer(cb);
		    for (const el of toNodes(targets)) {
		      observer.observe(el, options);
		    }
		    return observer;
		  }
		  function play(el) {
		    if (isIFrame(el)) {
		      call(el, {
		        func: "playVideo",
		        method: "play"
		      });
		    }
		    if (isHTML5(el)) {
		      try {
		        el.play().catch(noop);
		      } catch (e) {}
		    }
		  }
		  function pause(el) {
		    if (isIFrame(el)) {
		      call(el, {
		        func: "pauseVideo",
		        method: "pause"
		      });
		    }
		    if (isHTML5(el)) {
		      el.pause();
		    }
		  }
		  function mute(el) {
		    if (isIFrame(el)) {
		      call(el, {
		        func: "mute",
		        method: "setVolume",
		        value: 0
		      });
		    }
		    if (isHTML5(el)) {
		      el.muted = true;
		    }
		  }
		  function isVideo(el) {
		    return isHTML5(el) || isIFrame(el);
		  }
		  function isHTML5(el) {
		    return isTag(el, "video");
		  }
		  function isIFrame(el) {
		    return isTag(el, "iframe") && (isYoutube(el) || isVimeo(el));
		  }
		  function isYoutube(el) {
		    return !!el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
		  }
		  function isVimeo(el) {
		    return !!el.src.match(/vimeo\.com\/video\/.*/);
		  }
		  async function call(el, cmd) {
		    await enableApi(el);
		    post(el, cmd);
		  }
		  function post(el, cmd) {
		    try {
		      el.contentWindow.postMessage(JSON.stringify({
		        event: "command",
		        ...cmd
		      }), "*");
		    } catch (e) {}
		  }
		  const stateKey = "_ukPlayer";
		  let counter = 0;
		  function enableApi(el) {
		    if (el[stateKey]) {
		      return el[stateKey];
		    }
		    const youtube = isYoutube(el);
		    const vimeo = isVimeo(el);
		    const id = ++counter;
		    let poller;
		    return el[stateKey] = new Promise(resolve => {
		      youtube && once(el, "load", () => {
		        const listener = () => post(el, {
		          event: "listening",
		          id
		        });
		        poller = setInterval(listener, 100);
		        listener();
		      });
		      once(window, "message", resolve, false, ({
		        data
		      }) => {
		        try {
		          data = JSON.parse(data);
		          return youtube && (data == null ? void 0 : data.id) === id && data.event === "onReady" || vimeo && Number(data == null ? void 0 : data.player_id) === id;
		        } catch (e) {}
		      });
		      el.src = `${el.src}${includes(el.src, "?") ? "&" : "?"}${youtube ? "enablejsapi=1" : `api=1&player_id=${id}`}`;
		    }).then(() => clearInterval(poller));
		  }
		  function isInView(element, offsetTop = 0, offsetLeft = 0) {
		    if (!isVisible(element)) {
		      return false;
		    }
		    return intersectRect(...overflowParents(element).map(parent => {
		      const {
		        top,
		        left,
		        bottom,
		        right
		      } = offsetViewport(parent);
		      return {
		        top: top - offsetTop,
		        left: left - offsetLeft,
		        bottom: bottom + offsetTop,
		        right: right + offsetLeft
		      };
		    }).concat(offset(element)));
		  }
		  function scrollIntoView(element, {
		    offset: offsetBy = 0
		  } = {}) {
		    const parents2 = isVisible(element) ? scrollParents(element, false, ["hidden"]) : [];
		    return parents2.reduce((fn, scrollElement, i) => {
		      const {
		        scrollTop,
		        scrollHeight,
		        offsetHeight
		      } = scrollElement;
		      const viewport = offsetViewport(scrollElement);
		      const maxScroll = scrollHeight - viewport.height;
		      const {
		        height: elHeight,
		        top: elTop
		      } = parents2[i - 1] ? offsetViewport(parents2[i - 1]) : offset(element);
		      let top = Math.ceil(elTop - viewport.top - offsetBy + scrollTop);
		      if (offsetBy > 0 && offsetHeight < elHeight + offsetBy) {
		        top += offsetBy;
		      } else {
		        offsetBy = 0;
		      }
		      if (top > maxScroll) {
		        offsetBy -= top - maxScroll;
		        top = maxScroll;
		      } else if (top < 0) {
		        offsetBy -= top;
		        top = 0;
		      }
		      return () => scrollTo(scrollElement, top - scrollTop).then(fn);
		    }, () => Promise.resolve())();
		    function scrollTo(element2, top) {
		      return new Promise(resolve => {
		        const scroll = element2.scrollTop;
		        const duration = getDuration(Math.abs(top));
		        const start = Date.now();
		        (function step() {
		          const percent = ease(clamp((Date.now() - start) / duration));
		          element2.scrollTop = scroll + top * percent;
		          if (percent === 1) {
		            resolve();
		          } else {
		            requestAnimationFrame(step);
		          }
		        })();
		      });
		    }
		    function getDuration(dist) {
		      return 40 * Math.pow(dist, 0.375);
		    }
		    function ease(k) {
		      return 0.5 * (1 - Math.cos(Math.PI * k));
		    }
		  }
		  function scrolledOver(element, startOffset = 0, endOffset = 0) {
		    if (!isVisible(element)) {
		      return 0;
		    }
		    const scrollElement = scrollParent(element, true);
		    const {
		      scrollHeight,
		      scrollTop
		    } = scrollElement;
		    const {
		      height: viewportHeight
		    } = offsetViewport(scrollElement);
		    const maxScroll = scrollHeight - viewportHeight;
		    const elementOffsetTop = offsetPosition(element)[0] - offsetPosition(scrollElement)[0];
		    const start = Math.max(0, elementOffsetTop - viewportHeight + startOffset);
		    const end = Math.min(maxScroll, elementOffsetTop + element.offsetHeight - endOffset);
		    return clamp((scrollTop - start) / (end - start));
		  }
		  function scrollParents(element, scrollable = false, props = []) {
		    const scrollEl = scrollingElement(element);
		    let ancestors = parents(element).reverse();
		    ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
		    const fixedIndex = findIndex(ancestors, el => css(el, "position") === "fixed");
		    if (~fixedIndex) {
		      ancestors = ancestors.slice(fixedIndex);
		    }
		    return [scrollEl].concat(ancestors.filter(parent => css(parent, "overflow").split(" ").some(prop => includes(["auto", "scroll", ...props], prop)) && (!scrollable || parent.scrollHeight > offsetViewport(parent).height))).reverse();
		  }
		  function scrollParent(...args) {
		    return scrollParents(...args)[0];
		  }
		  function overflowParents(element) {
		    return scrollParents(element, false, ["hidden", "clip"]);
		  }
		  function offsetViewport(scrollElement) {
		    const window = toWindow(scrollElement);
		    const {
		      visualViewport,
		      document: {
		        documentElement
		      }
		    } = window;
		    let viewportElement = scrollElement === scrollingElement(scrollElement) ? window : scrollElement;
		    if (isWindow(viewportElement) && visualViewport) {
		      let {
		        height,
		        width,
		        scale,
		        pageTop: top,
		        pageLeft: left
		      } = visualViewport;
		      height = Math.round(height * scale);
		      width = Math.round(width * scale);
		      return {
		        height,
		        width,
		        top,
		        left,
		        bottom: top + height,
		        right: left + width
		      };
		    }
		    let rect = offset(viewportElement);
		    if (css(viewportElement, "display") === "inline") {
		      return rect;
		    }
		    for (let [prop, dir, start, end] of [["width", "x", "left", "right"], ["height", "y", "top", "bottom"]]) {
		      if (isWindow(viewportElement)) {
		        viewportElement = documentElement;
		      } else {
		        rect[start] += toFloat(css(viewportElement, `border-${start}-width`));
		      }
		      const subpixel = rect[prop] % 1;
		      rect[prop] = rect[dir] = viewportElement[`client${ucfirst(prop)}`] - (subpixel ? subpixel < 0.5 ? -subpixel : 1 - subpixel : 0);
		      rect[end] = rect[prop] + rect[start];
		    }
		    return rect;
		  }
		  function scrollingElement(element) {
		    return toWindow(element).document.scrollingElement;
		  }
		  const dirs = [["width", "x", "left", "right"], ["height", "y", "top", "bottom"]];
		  function positionAt(element, target, options) {
		    options = {
		      attach: {
		        element: ["left", "top"],
		        target: ["left", "top"],
		        ...options.attach
		      },
		      offset: [0, 0],
		      placement: [],
		      ...options
		    };
		    if (!isArray(target)) {
		      target = [target, target];
		    }
		    offset(element, getPosition(element, target, options));
		  }
		  function getPosition(element, target, options) {
		    const position = attachTo(element, target, options);
		    const {
		      boundary,
		      viewportOffset = 0,
		      placement
		    } = options;
		    let offsetPosition = position;
		    for (const [i, [prop,, start, end]] of Object.entries(dirs)) {
		      const viewport = getViewport$2(element, target[i], viewportOffset, boundary, i);
		      if (isWithin(position, viewport, i)) {
		        continue;
		      }
		      let offsetBy = 0;
		      if (placement[i] === "flip") {
		        const attach = options.attach.target[i];
		        if (attach === end && position[end] <= viewport[end] || attach === start && position[start] >= viewport[start]) {
		          continue;
		        }
		        offsetBy = flip(element, target, options, i)[start] - position[start];
		        const scrollArea = getScrollArea(element, target[i], viewportOffset, i);
		        if (!isWithin(applyOffset(position, offsetBy, i), scrollArea, i)) {
		          if (isWithin(position, scrollArea, i)) {
		            continue;
		          }
		          if (options.recursion) {
		            return false;
		          }
		          const newPos = flipAxis(element, target, options);
		          if (newPos && isWithin(newPos, scrollArea, 1 - i)) {
		            return newPos;
		          }
		          continue;
		        }
		      } else if (placement[i] === "shift") {
		        const targetDim = offset(target[i]);
		        const {
		          offset: elOffset
		        } = options;
		        offsetBy = clamp(clamp(position[start], viewport[start], viewport[end] - position[prop]), targetDim[start] - position[prop] + elOffset[i], targetDim[end] - elOffset[i]) - position[start];
		      }
		      offsetPosition = applyOffset(offsetPosition, offsetBy, i);
		    }
		    return offsetPosition;
		  }
		  function attachTo(element, target, options) {
		    let {
		      attach,
		      offset: offsetBy
		    } = {
		      attach: {
		        element: ["left", "top"],
		        target: ["left", "top"],
		        ...options.attach
		      },
		      offset: [0, 0],
		      ...options
		    };
		    let elOffset = offset(element);
		    for (const [i, [prop,, start, end]] of Object.entries(dirs)) {
		      const targetOffset = attach.target[i] === attach.element[i] ? offsetViewport(target[i]) : offset(target[i]);
		      elOffset = applyOffset(elOffset, targetOffset[start] - elOffset[start] + moveBy(attach.target[i], end, targetOffset[prop]) - moveBy(attach.element[i], end, elOffset[prop]) + +offsetBy[i], i);
		    }
		    return elOffset;
		  }
		  function applyOffset(position, offset2, i) {
		    const [, dir, start, end] = dirs[i];
		    const newPos = {
		      ...position
		    };
		    newPos[start] = position[dir] = position[start] + offset2;
		    newPos[end] += offset2;
		    return newPos;
		  }
		  function moveBy(attach, end, dim) {
		    return attach === "center" ? dim / 2 : attach === end ? dim : 0;
		  }
		  function getViewport$2(element, target, viewportOffset, boundary, i) {
		    let viewport = getIntersectionArea(...commonScrollParents(element, target).map(offsetViewport));
		    if (viewportOffset) {
		      viewport[dirs[i][2]] += viewportOffset;
		      viewport[dirs[i][3]] -= viewportOffset;
		    }
		    if (boundary) {
		      viewport = getIntersectionArea(viewport, offset(isArray(boundary) ? boundary[i] : boundary));
		    }
		    return viewport;
		  }
		  function getScrollArea(element, target, viewportOffset, i) {
		    const [prop, axis, start, end] = dirs[i];
		    const [scrollElement] = commonScrollParents(element, target);
		    const viewport = offsetViewport(scrollElement);
		    if (["auto", "scroll"].includes(css(scrollElement, `overflow-${axis}`))) {
		      viewport[start] -= scrollElement[`scroll${ucfirst(start)}`];
		      viewport[end] = viewport[start] + scrollElement[`scroll${ucfirst(prop)}`];
		    }
		    viewport[start] += viewportOffset;
		    viewport[end] -= viewportOffset;
		    return viewport;
		  }
		  function commonScrollParents(element, target) {
		    return overflowParents(target).filter(parent => within(element, parent));
		  }
		  function getIntersectionArea(...rects) {
		    let area = {};
		    for (const rect of rects) {
		      for (const [,, start, end] of dirs) {
		        area[start] = Math.max(area[start] || 0, rect[start]);
		        area[end] = Math.min(...[area[end], rect[end]].filter(Boolean));
		      }
		    }
		    return area;
		  }
		  function isWithin(positionA, positionB, i) {
		    const [,, start, end] = dirs[i];
		    return positionA[start] >= positionB[start] && positionA[end] <= positionB[end];
		  }
		  function flip(element, target, {
		    offset: offset2,
		    attach
		  }, i) {
		    return attachTo(element, target, {
		      attach: {
		        element: flipAttach(attach.element, i),
		        target: flipAttach(attach.target, i)
		      },
		      offset: flipOffset(offset2, i)
		    });
		  }
		  function flipAxis(element, target, options) {
		    return getPosition(element, target, {
		      ...options,
		      attach: {
		        element: options.attach.element.map(flipAttachAxis).reverse(),
		        target: options.attach.target.map(flipAttachAxis).reverse()
		      },
		      offset: options.offset.reverse(),
		      placement: options.placement.reverse(),
		      recursion: true
		    });
		  }
		  function flipAttach(attach, i) {
		    const newAttach = [...attach];
		    const index = dirs[i].indexOf(attach[i]);
		    if (~index) {
		      newAttach[i] = dirs[i][1 - index % 2 + 2];
		    }
		    return newAttach;
		  }
		  function flipAttachAxis(prop) {
		    for (let i = 0; i < dirs.length; i++) {
		      const index = dirs[i].indexOf(prop);
		      if (~index) {
		        return dirs[1 - i][index % 2 + 2];
		      }
		    }
		  }
		  function flipOffset(offset2, i) {
		    offset2 = [...offset2];
		    offset2[i] *= -1;
		    return offset2;
		  }
		  var util = /*#__PURE__*/Object.freeze({
		    __proto__: null,
		    $: $,
		    $$: $$,
		    Animation: Animation,
		    Dimensions: Dimensions,
		    MouseTracker: MouseTracker,
		    Transition: Transition,
		    addClass: addClass,
		    after: after,
		    append: append,
		    apply: apply,
		    assign: assign,
		    attr: attr,
		    before: before,
		    boxModelAdjust: boxModelAdjust,
		    camelize: camelize,
		    children: children,
		    clamp: clamp,
		    closest: closest,
		    createEvent: createEvent,
		    css: css,
		    data: data,
		    dimensions: dimensions$1,
		    each: each,
		    empty: empty,
		    endsWith: endsWith,
		    escape: escape,
		    fastdom: fastdom,
		    filter: filter$1,
		    find: find,
		    findAll: findAll,
		    findIndex: findIndex,
		    flipPosition: flipPosition,
		    fragment: fragment,
		    getEventPos: getEventPos,
		    getIndex: getIndex,
		    getTargetedElement: getTargetedElement,
		    hasAttr: hasAttr,
		    hasClass: hasClass,
		    hasOwn: hasOwn,
		    hasTouch: hasTouch,
		    height: height,
		    html: html,
		    hyphenate: hyphenate,
		    inBrowser: inBrowser,
		    includes: includes,
		    index: index,
		    intersectRect: intersectRect,
		    isArray: isArray,
		    isBoolean: isBoolean,
		    isDocument: isDocument,
		    isElement: isElement,
		    isEmpty: isEmpty,
		    isEqual: isEqual,
		    isFocusable: isFocusable,
		    isFunction: isFunction,
		    isInView: isInView,
		    isInput: isInput,
		    isNode: isNode,
		    isNumber: isNumber,
		    isNumeric: isNumeric,
		    isObject: isObject,
		    isPlainObject: isPlainObject,
		    isRtl: isRtl,
		    isSameSiteAnchor: isSameSiteAnchor,
		    isString: isString,
		    isTag: isTag,
		    isTouch: isTouch,
		    isUndefined: isUndefined,
		    isVideo: isVideo,
		    isVisible: isVisible,
		    isVoidElement: isVoidElement,
		    isWindow: isWindow,
		    last: last,
		    matches: matches,
		    memoize: memoize,
		    mute: mute,
		    noop: noop,
		    observeIntersection: observeIntersection,
		    observeMutation: observeMutation,
		    observeResize: observeResize,
		    observeViewportResize: observeViewportResize,
		    off: off,
		    offset: offset,
		    offsetPosition: offsetPosition,
		    offsetViewport: offsetViewport,
		    on: on,
		    once: once,
		    overflowParents: overflowParents,
		    parent: parent,
		    parents: parents,
		    pause: pause,
		    pick: pick,
		    play: play,
		    pointInRect: pointInRect,
		    pointerCancel: pointerCancel,
		    pointerDown: pointerDown$1,
		    pointerEnter: pointerEnter,
		    pointerLeave: pointerLeave,
		    pointerMove: pointerMove$1,
		    pointerUp: pointerUp$1,
		    position: position,
		    positionAt: positionAt,
		    prepend: prepend,
		    propName: propName,
		    query: query,
		    queryAll: queryAll,
		    ready: ready,
		    remove: remove$1,
		    removeAttr: removeAttr,
		    removeClass: removeClass,
		    removeClasses: removeClasses,
		    replaceClass: replaceClass,
		    scrollIntoView: scrollIntoView,
		    scrollParent: scrollParent,
		    scrollParents: scrollParents,
		    scrolledOver: scrolledOver,
		    selFocusable: selFocusable,
		    selInput: selInput,
		    sortBy: sortBy$1,
		    startsWith: startsWith,
		    sumBy: sumBy,
		    swap: swap,
		    toArray: toArray,
		    toBoolean: toBoolean,
		    toEventTargets: toEventTargets,
		    toFloat: toFloat,
		    toNode: toNode,
		    toNodes: toNodes,
		    toNumber: toNumber,
		    toPx: toPx,
		    toWindow: toWindow,
		    toggleClass: toggleClass,
		    trigger: trigger,
		    ucfirst: ucfirst,
		    uniqueBy: uniqueBy,
		    unwrap: unwrap,
		    width: width,
		    within: within,
		    wrapAll: wrapAll,
		    wrapInner: wrapInner
		  });
		  function initWatches(instance) {
		    instance._watches = [];
		    for (const watches of instance.$options.watch || []) {
		      for (const [name, watch] of Object.entries(watches)) {
		        registerWatch(instance, watch, name);
		      }
		    }
		    instance._initial = true;
		  }
		  function registerWatch(instance, watch, name) {
		    instance._watches.push({
		      name,
		      ...(isPlainObject(watch) ? watch : {
		        handler: watch
		      })
		    });
		  }
		  function runWatches(instance, values) {
		    for (const {
		      name,
		      handler,
		      immediate = true
		    } of instance._watches) {
		      if (instance._initial && immediate || hasOwn(values, name) && !isEqual(values[name], instance[name])) {
		        handler.call(instance, instance[name], values[name]);
		      }
		    }
		    instance._initial = false;
		  }
		  function initUpdates(instance) {
		    instance._data = {};
		    instance._updates = [...(instance.$options.update || [])];
		  }
		  function prependUpdate(instance, update) {
		    instance._updates.unshift(update);
		  }
		  function clearUpdateData(instance) {
		    delete instance._data;
		  }
		  function callUpdate(instance, e = "update") {
		    if (!instance._connected) {
		      return;
		    }
		    if (!instance._updates.length) {
		      return;
		    }
		    if (!instance._queued) {
		      instance._queued = /* @__PURE__ */new Set();
		      fastdom.read(() => {
		        if (instance._connected) {
		          runUpdates(instance, instance._queued);
		        }
		        delete instance._queued;
		      });
		    }
		    instance._queued.add(e.type || e);
		  }
		  function runUpdates(instance, types) {
		    for (const {
		      read,
		      write,
		      events = []
		    } of instance._updates) {
		      if (!types.has("update") && !events.some(type => types.has(type))) {
		        continue;
		      }
		      let result;
		      if (read) {
		        result = read.call(instance, instance._data, types);
		        if (result && isPlainObject(result)) {
		          assign(instance._data, result);
		        }
		      }
		      if (write && result !== false) {
		        fastdom.write(() => {
		          if (instance._connected) {
		            write.call(instance, instance._data, types);
		          }
		        });
		      }
		    }
		  }
		  function initComputed(instance) {
		    const {
		      computed
		    } = instance.$options;
		    instance._computed = {};
		    if (computed) {
		      for (const key in computed) {
		        registerComputed(instance, key, computed[key]);
		      }
		    }
		  }
		  function registerComputed(instance, key, cb) {
		    instance._hasComputed = true;
		    Object.defineProperty(instance, key, {
		      enumerable: true,
		      get() {
		        const {
		          _computed,
		          $props,
		          $el
		        } = instance;
		        if (!hasOwn(_computed, key)) {
		          _computed[key] = (cb.get || cb).call(instance, $props, $el);
		        }
		        return _computed[key];
		      },
		      set(value) {
		        const {
		          _computed
		        } = instance;
		        _computed[key] = cb.set ? cb.set.call(instance, value) : value;
		        if (isUndefined(_computed[key])) {
		          delete _computed[key];
		        }
		      }
		    });
		  }
		  function initComputedUpdates(instance) {
		    if (!instance._hasComputed) {
		      return;
		    }
		    prependUpdate(instance, {
		      read: () => runWatches(instance, resetComputed(instance)),
		      events: ["resize", "computed"]
		    });
		    registerComputedObserver();
		    instances$1.add(instance);
		  }
		  function disconnectComputedUpdates(instance) {
		    instances$1 == null ? void 0 : instances$1.delete(instance);
		    resetComputed(instance);
		  }
		  function resetComputed(instance) {
		    const values = {
		      ...instance._computed
		    };
		    instance._computed = {};
		    return values;
		  }
		  let observer;
		  let instances$1;
		  function registerComputedObserver() {
		    if (observer) {
		      return;
		    }
		    instances$1 = /* @__PURE__ */new Set();
		    observer = new MutationObserver(() => {
		      for (const instance of instances$1) {
		        callUpdate(instance, "computed");
		      }
		    });
		    observer.observe(document, {
		      childList: true,
		      subtree: true
		    });
		  }
		  function initEvents(instance) {
		    instance._events = [];
		    for (const event of instance.$options.events || []) {
		      if (hasOwn(event, "handler")) {
		        registerEvent(instance, event);
		      } else {
		        for (const key in event) {
		          registerEvent(instance, event[key], key);
		        }
		      }
		    }
		  }
		  function unbindEvents(instance) {
		    instance._events.forEach(unbind => unbind());
		    delete instance._events;
		  }
		  function registerEvent(instance, event, key) {
		    let {
		      name,
		      el,
		      handler,
		      capture,
		      passive,
		      delegate,
		      filter,
		      self
		    } = isPlainObject(event) ? event : {
		      name: key,
		      handler: event
		    };
		    el = isFunction(el) ? el.call(instance, instance) : el || instance.$el;
		    if (isArray(el)) {
		      el.forEach(el2 => registerEvent(instance, {
		        ...event,
		        el: el2
		      }, key));
		      return;
		    }
		    if (!el || filter && !filter.call(instance)) {
		      return;
		    }
		    instance._events.push(on(el, name, delegate ? isString(delegate) ? delegate : delegate.call(instance, instance) : null, isString(handler) ? instance[handler] : handler.bind(instance), {
		      passive,
		      capture,
		      self
		    }));
		  }
		  function initObservers(instance) {
		    instance._observers = [];
		    for (const observer of instance.$options.observe || []) {
		      if (hasOwn(observer, "handler")) {
		        registerObservable(instance, observer);
		      } else {
		        for (const observable of observer) {
		          registerObservable(instance, observable);
		        }
		      }
		    }
		  }
		  function registerObserver(instance, ...observer) {
		    instance._observers.push(...observer);
		  }
		  function disconnectObservers(instance) {
		    for (const observer of instance._observers) {
		      observer.disconnect();
		    }
		  }
		  function registerObservable(instance, observable) {
		    let {
		      observe,
		      target = instance.$el,
		      handler,
		      options,
		      filter,
		      args
		    } = observable;
		    if (filter && !filter.call(instance, instance)) {
		      return;
		    }
		    const key = `_observe${instance._observers.length}`;
		    if (isFunction(target) && !hasOwn(instance, key)) {
		      registerComputed(instance, key, () => target.call(instance, instance));
		    }
		    handler = isString(handler) ? instance[handler] : handler.bind(instance);
		    if (isFunction(options)) {
		      options = options.call(instance, instance);
		    }
		    const targets = hasOwn(instance, key) ? instance[key] : target;
		    const observer = observe(targets, handler, options, args);
		    if (isFunction(target) && isArray(instance[key]) && observer.unobserve) {
		      registerWatch(instance, {
		        handler: updateTargets(observer),
		        immediate: false
		      }, key);
		    }
		    registerObserver(instance, observer);
		  }
		  function updateTargets(observer) {
		    return (targets, prev) => {
		      for (const target of prev) {
		        !includes(targets, target) && observer.unobserve(target);
		      }
		      for (const target of targets) {
		        !includes(prev, target) && observer.observe(target);
		      }
		    };
		  }
		  const strats = {};
		  strats.events = strats.watch = strats.observe = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;
		  strats.args = function (parentVal, childVal) {
		    return childVal !== false && concatStrat(childVal || parentVal);
		  };
		  strats.update = function (parentVal, childVal) {
		    return sortBy$1(concatStrat(parentVal, isFunction(childVal) ? {
		      read: childVal
		    } : childVal), "order");
		  };
		  strats.props = function (parentVal, childVal) {
		    if (isArray(childVal)) {
		      const value = {};
		      for (const key of childVal) {
		        value[key] = String;
		      }
		      childVal = value;
		    }
		    return strats.methods(parentVal, childVal);
		  };
		  strats.computed = strats.methods = function (parentVal, childVal) {
		    return childVal ? parentVal ? {
		      ...parentVal,
		      ...childVal
		    } : childVal : parentVal;
		  };
		  strats.i18n = strats.data = function (parentVal, childVal, vm) {
		    if (!vm) {
		      if (!childVal) {
		        return parentVal;
		      }
		      if (!parentVal) {
		        return childVal;
		      }
		      return function (vm2) {
		        return mergeFnData(parentVal, childVal, vm2);
		      };
		    }
		    return mergeFnData(parentVal, childVal, vm);
		  };
		  function mergeFnData(parentVal, childVal, vm) {
		    return strats.computed(isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal, isFunction(childVal) ? childVal.call(vm, vm) : childVal);
		  }
		  function concatStrat(parentVal, childVal) {
		    parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;
		    return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
		  }
		  function defaultStrat(parentVal, childVal) {
		    return isUndefined(childVal) ? parentVal : childVal;
		  }
		  function mergeOptions(parent, child, vm) {
		    const options = {};
		    if (isFunction(child)) {
		      child = child.options;
		    }
		    if (child.extends) {
		      parent = mergeOptions(parent, child.extends, vm);
		    }
		    if (child.mixins) {
		      for (const mixin of child.mixins) {
		        parent = mergeOptions(parent, mixin, vm);
		      }
		    }
		    for (const key in parent) {
		      mergeKey(key);
		    }
		    for (const key in child) {
		      if (!hasOwn(parent, key)) {
		        mergeKey(key);
		      }
		    }
		    function mergeKey(key) {
		      options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
		    }
		    return options;
		  }
		  function parseOptions(options, args = []) {
		    try {
		      return options ? startsWith(options, "{") ? JSON.parse(options) : args.length && !includes(options, ":") ? {
		        [args[0]]: options
		      } : options.split(";").reduce((options2, option) => {
		        const [key, value] = option.split(/:(.*)/);
		        if (key && !isUndefined(value)) {
		          options2[key.trim()] = value.trim();
		        }
		        return options2;
		      }, {}) : {};
		    } catch (e) {
		      return {};
		    }
		  }
		  function coerce$1(type, value) {
		    if (type === Boolean) {
		      return toBoolean(value);
		    } else if (type === Number) {
		      return toNumber(value);
		    } else if (type === "list") {
		      return toList(value);
		    } else if (type === Object && isString(value)) {
		      return parseOptions(value);
		    }
		    return type ? type(value) : value;
		  }
		  function toList(value) {
		    return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map(value2 => isNumeric(value2) ? toNumber(value2) : toBoolean(value2.trim())) : [value];
		  }
		  function initProps(instance) {
		    const props = getProps$1(instance.$options);
		    for (let key in props) {
		      if (!isUndefined(props[key])) {
		        instance.$props[key] = props[key];
		      }
		    }
		    const exclude = [instance.$options.computed, instance.$options.methods];
		    for (let key in instance.$props) {
		      if (key in props && notIn(exclude, key)) {
		        instance[key] = instance.$props[key];
		      }
		    }
		  }
		  function getProps$1(opts) {
		    const data$1 = {};
		    const {
		      args = [],
		      props = {},
		      el,
		      id
		    } = opts;
		    if (!props) {
		      return data$1;
		    }
		    for (const key in props) {
		      const prop = hyphenate(key);
		      let value = data(el, prop);
		      if (isUndefined(value)) {
		        continue;
		      }
		      value = props[key] === Boolean && value === "" ? true : coerce$1(props[key], value);
		      if (prop === "target" && startsWith(value, "_")) {
		        continue;
		      }
		      data$1[key] = value;
		    }
		    const options = parseOptions(data(el, id), args);
		    for (const key in options) {
		      const prop = camelize(key);
		      if (!isUndefined(props[prop])) {
		        data$1[prop] = coerce$1(props[prop], options[key]);
		      }
		    }
		    return data$1;
		  }
		  function notIn(options, key) {
		    return options.every(arr => !arr || !hasOwn(arr, key));
		  }
		  function initPropsObserver(instance) {
		    const {
		      $options,
		      $props
		    } = instance;
		    const {
		      id,
		      props,
		      el
		    } = $options;
		    if (!props) {
		      return;
		    }
		    const attributes = Object.keys(props);
		    const filter = attributes.map(key => hyphenate(key)).concat(id);
		    const observer = new MutationObserver(records => {
		      const data = getProps$1($options);
		      if (records.some(({
		        attributeName
		      }) => {
		        const prop = attributeName.replace("data-", "");
		        return (prop === id ? attributes : [camelize(prop), camelize(attributeName)]).some(prop2 => !isUndefined(data[prop2]) && data[prop2] !== $props[prop2]);
		      })) {
		        instance.$reset();
		      }
		    });
		    observer.observe(el, {
		      attributes: true,
		      attributeFilter: filter.concat(filter.map(key => `data-${key}`))
		    });
		    registerObserver(instance, observer);
		  }
		  function callHook(instance, hook) {
		    var _a;
		    (_a = instance.$options[hook]) == null ? void 0 : _a.forEach(handler => handler.call(instance));
		  }
		  function callConnected(instance) {
		    if (instance._connected) {
		      return;
		    }
		    initProps(instance);
		    callHook(instance, "beforeConnect");
		    instance._connected = true;
		    initEvents(instance);
		    initUpdates(instance);
		    initWatches(instance);
		    initObservers(instance);
		    initPropsObserver(instance);
		    initComputedUpdates(instance);
		    callHook(instance, "connected");
		    callUpdate(instance);
		  }
		  function callDisconnected(instance) {
		    if (!instance._connected) {
		      return;
		    }
		    callHook(instance, "beforeDisconnect");
		    unbindEvents(instance);
		    clearUpdateData(instance);
		    disconnectObservers(instance);
		    disconnectComputedUpdates(instance);
		    callHook(instance, "disconnected");
		    instance._connected = false;
		  }
		  let uid = 0;
		  function init$1(instance, options = {}) {
		    options.data = normalizeData(options, instance.constructor.options);
		    instance.$options = mergeOptions(instance.constructor.options, options, instance);
		    instance.$props = {};
		    instance._uid = uid++;
		    initData(instance);
		    initMethods(instance);
		    initComputed(instance);
		    callHook(instance, "created");
		    if (options.el) {
		      instance.$mount(options.el);
		    }
		  }
		  function initData(instance) {
		    const {
		      data = {}
		    } = instance.$options;
		    for (const key in data) {
		      instance.$props[key] = instance[key] = data[key];
		    }
		  }
		  function initMethods(instance) {
		    const {
		      methods
		    } = instance.$options;
		    if (methods) {
		      for (const key in methods) {
		        instance[key] = methods[key].bind(instance);
		      }
		    }
		  }
		  function normalizeData({
		    data = {}
		  }, {
		    args = [],
		    props = {}
		  }) {
		    if (isArray(data)) {
		      data = data.slice(0, args.length).reduce((data2, value, index) => {
		        if (isPlainObject(value)) {
		          assign(data2, value);
		        } else {
		          data2[args[index]] = value;
		        }
		        return data2;
		      }, {});
		    }
		    for (const key in data) {
		      if (isUndefined(data[key])) {
		        delete data[key];
		      } else if (props[key]) {
		        data[key] = coerce$1(props[key], data[key]);
		      }
		    }
		    return data;
		  }
		  const App = function (options) {
		    init$1(this, options);
		  };
		  App.util = util;
		  App.options = {};
		  App.version = "3.16.22";
		  const PREFIX = "uk-";
		  const DATA = "__uikit__";
		  const components$2 = {};
		  function component(name, options) {
		    var _a;
		    const id = PREFIX + hyphenate(name);
		    if (!options) {
		      if (isPlainObject(components$2[id])) {
		        components$2[id] = App.extend(components$2[id]);
		      }
		      return components$2[id];
		    }
		    name = camelize(name);
		    App[name] = (element, data) => createComponent(name, element, data);
		    const opt = isPlainObject(options) ? {
		      ...options
		    } : options.options;
		    opt.id = id;
		    opt.name = name;
		    (_a = opt.install) == null ? void 0 : _a.call(opt, App, opt, name);
		    if (App._initialized && !opt.functional) {
		      requestAnimationFrame(() => createComponent(name, `[${id}],[data-${id}]`));
		    }
		    return components$2[id] = opt;
		  }
		  function createComponent(name, element, data, ...args) {
		    const Component = component(name);
		    return Component.options.functional ? new Component({
		      data: isPlainObject(element) ? element : [element, data, ...args]
		    }) : element ? $$(element).map(init)[0] : init();
		    function init(element2) {
		      const instance = getComponent(element2, name);
		      if (instance) {
		        if (data) {
		          instance.$destroy();
		        } else {
		          return instance;
		        }
		      }
		      return new Component({
		        el: element2,
		        data
		      });
		    }
		  }
		  function getComponents(element) {
		    return (element == null ? void 0 : element[DATA]) || {};
		  }
		  function getComponent(element, name) {
		    return getComponents(element)[name];
		  }
		  function attachToElement(element, instance) {
		    if (!element[DATA]) {
		      element[DATA] = {};
		    }
		    element[DATA][instance.$options.name] = instance;
		  }
		  function detachFromElement(element, instance) {
		    var _a;
		    (_a = element[DATA]) == null ? true : delete _a[instance.$options.name];
		    if (!isEmpty(element[DATA])) {
		      delete element[DATA];
		    }
		  }
		  function globalApi(App) {
		    App.component = component;
		    App.getComponents = getComponents;
		    App.getComponent = getComponent;
		    App.update = update;
		    App.use = function (plugin) {
		      if (plugin.installed) {
		        return;
		      }
		      plugin.call(null, this);
		      plugin.installed = true;
		      return this;
		    };
		    App.mixin = function (mixin, component2) {
		      component2 = (isString(component2) ? this.component(component2) : component2) || this;
		      component2.options = mergeOptions(component2.options, mixin);
		    };
		    App.extend = function (options) {
		      options || (options = {});
		      const Super = this;
		      const Sub = function UIkitComponent(options2) {
		        init$1(this, options2);
		      };
		      Sub.prototype = Object.create(Super.prototype);
		      Sub.prototype.constructor = Sub;
		      Sub.options = mergeOptions(Super.options, options);
		      Sub.super = Super;
		      Sub.extend = Super.extend;
		      return Sub;
		    };
		    let container;
		    Object.defineProperty(App, "container", {
		      get() {
		        return container || document.body;
		      },
		      set(element) {
		        container = $(element);
		      }
		    });
		  }
		  function update(element, e) {
		    element = element ? toNode(element) : document.body;
		    for (const parentEl of parents(element).reverse()) {
		      updateElement(parentEl, e);
		    }
		    apply(element, element2 => updateElement(element2, e));
		  }
		  function updateElement(element, e) {
		    const components = getComponents(element);
		    for (const name in components) {
		      callUpdate(components[name], e);
		    }
		  }
		  function instanceApi(App) {
		    App.prototype.$mount = function (el) {
		      const instance = this;
		      attachToElement(el, instance);
		      instance.$options.el = el;
		      if (within(el, document)) {
		        callConnected(instance);
		      }
		    };
		    App.prototype.$destroy = function (removeEl = false) {
		      const instance = this;
		      const {
		        el
		      } = instance.$options;
		      if (el) {
		        callDisconnected(instance);
		      }
		      callHook(instance, "destroy");
		      detachFromElement(el, instance);
		      if (removeEl) {
		        remove$1(instance.$el);
		      }
		    };
		    App.prototype.$create = createComponent;
		    App.prototype.$emit = function (e) {
		      callUpdate(this, e);
		    };
		    App.prototype.$update = function (element = this.$el, e) {
		      update(element, e);
		    };
		    App.prototype.$reset = function () {
		      callDisconnected(this);
		      callConnected(this);
		    };
		    App.prototype.$getComponent = getComponent;
		    Object.defineProperties(App.prototype, {
		      $el: {
		        get() {
		          return this.$options.el;
		        }
		      },
		      $container: Object.getOwnPropertyDescriptor(App, "container")
		    });
		  }
		  function generateId(instance, el = instance.$el, postfix = "") {
		    if (el.id) {
		      return el.id;
		    }
		    let id = `${instance.$options.id}-${instance._uid}${postfix}`;
		    if ($(`#${id}`)) {
		      id = generateId(instance, el, `${postfix}-2`);
		    }
		    return id;
		  }
		  globalApi(App);
		  instanceApi(App);
		  function boot(App) {
		    if (inBrowser && window.MutationObserver) {
		      if (document.body) {
		        requestAnimationFrame(() => init(App));
		      } else {
		        new MutationObserver((records, observer) => {
		          if (document.body) {
		            init(App);
		            observer.disconnect();
		          }
		        }).observe(document.documentElement, {
		          childList: true
		        });
		      }
		    }
		  }
		  function init(App) {
		    trigger(document, "uikit:init", App);
		    if (document.body) {
		      apply(document.body, connect);
		    }
		    new MutationObserver(records => records.forEach(applyChildListMutation)).observe(document, {
		      childList: true,
		      subtree: true
		    });
		    new MutationObserver(records => records.forEach(applyAttributeMutation)).observe(document, {
		      attributes: true,
		      subtree: true
		    });
		    App._initialized = true;
		  }
		  function applyChildListMutation({
		    addedNodes,
		    removedNodes
		  }) {
		    for (const node of addedNodes) {
		      apply(node, connect);
		    }
		    for (const node of removedNodes) {
		      apply(node, disconnect);
		    }
		  }
		  function applyAttributeMutation({
		    target,
		    attributeName
		  }) {
		    var _a;
		    const name = getComponentName(attributeName);
		    if (name) {
		      if (hasAttr(target, attributeName)) {
		        createComponent(name, target);
		        return;
		      }
		      (_a = getComponent(target, name)) == null ? void 0 : _a.$destroy();
		    }
		  }
		  function connect(node) {
		    const components2 = getComponents(node);
		    for (const name in getComponents(node)) {
		      callConnected(components2[name]);
		    }
		    for (const attributeName of node.getAttributeNames()) {
		      const name = getComponentName(attributeName);
		      name && createComponent(name, node);
		    }
		  }
		  function disconnect(node) {
		    const components2 = getComponents(node);
		    for (const name in getComponents(node)) {
		      callDisconnected(components2[name]);
		    }
		  }
		  function getComponentName(attribute) {
		    if (startsWith(attribute, "data-")) {
		      attribute = attribute.slice(5);
		    }
		    const cmp = components$2[attribute];
		    return cmp && (isPlainObject(cmp) ? cmp : cmp.options).name;
		  }
		  var Class = {
		    connected() {
		      addClass(this.$el, this.$options.id);
		    }
		  };
		  var Togglable = {
		    props: {
		      cls: Boolean,
		      animation: "list",
		      duration: Number,
		      velocity: Number,
		      origin: String,
		      transition: String
		    },
		    data: {
		      cls: false,
		      animation: [false],
		      duration: 200,
		      velocity: 0.2,
		      origin: false,
		      transition: "ease",
		      clsEnter: "uk-togglabe-enter",
		      clsLeave: "uk-togglabe-leave"
		    },
		    computed: {
		      hasAnimation({
		        animation
		      }) {
		        return !!animation[0];
		      },
		      hasTransition({
		        animation
		      }) {
		        return ["slide", "reveal"].some(transition => startsWith(animation[0], transition));
		      }
		    },
		    methods: {
		      async toggleElement(targets, toggle, animate) {
		        try {
		          await Promise.all(toNodes(targets).map(el => {
		            const show = isBoolean(toggle) ? toggle : !this.isToggled(el);
		            if (!trigger(el, `before${show ? "show" : "hide"}`, [this])) {
		              return Promise.reject();
		            }
		            const promise = (isFunction(animate) ? animate : animate === false || !this.hasAnimation ? toggleInstant : this.hasTransition ? toggleTransition : toggleAnimation)(el, show, this);
		            const cls = show ? this.clsEnter : this.clsLeave;
		            addClass(el, cls);
		            trigger(el, show ? "show" : "hide", [this]);
		            const done = () => {
		              removeClass(el, cls);
		              trigger(el, show ? "shown" : "hidden", [this]);
		            };
		            return promise ? promise.then(done, () => {
		              removeClass(el, cls);
		              return Promise.reject();
		            }) : done();
		          }));
		          return true;
		        } catch (e) {
		          return false;
		        }
		      },
		      isToggled(el = this.$el) {
		        el = toNode(el);
		        return hasClass(el, this.clsEnter) ? true : hasClass(el, this.clsLeave) ? false : this.cls ? hasClass(el, this.cls.split(" ")[0]) : isVisible(el);
		      },
		      _toggle(el, toggled) {
		        if (!el) {
		          return;
		        }
		        toggled = Boolean(toggled);
		        let changed;
		        if (this.cls) {
		          changed = includes(this.cls, " ") || toggled !== hasClass(el, this.cls);
		          changed && toggleClass(el, this.cls, includes(this.cls, " ") ? void 0 : toggled);
		        } else {
		          changed = toggled === el.hidden;
		          changed && (el.hidden = !toggled);
		        }
		        $$("[autofocus]", el).some(el2 => isVisible(el2) ? el2.focus() || true : el2.blur());
		        if (changed) {
		          trigger(el, "toggled", [toggled, this]);
		        }
		      }
		    }
		  };
		  function toggleInstant(el, show, {
		    _toggle
		  }) {
		    Animation.cancel(el);
		    Transition.cancel(el);
		    return _toggle(el, show);
		  }
		  async function toggleTransition(el, show, {
		    animation,
		    duration,
		    velocity,
		    transition,
		    _toggle
		  }) {
		    var _a;
		    const [mode = "reveal", startProp = "top"] = ((_a = animation[0]) == null ? void 0 : _a.split("-")) || [];
		    const dirs = [["left", "right"], ["top", "bottom"]];
		    const dir = dirs[includes(dirs[0], startProp) ? 0 : 1];
		    const end = dir[1] === startProp;
		    const props = ["width", "height"];
		    const dimProp = props[dirs.indexOf(dir)];
		    const marginProp = `margin-${dir[0]}`;
		    const marginStartProp = `margin-${startProp}`;
		    let currentDim = dimensions$1(el)[dimProp];
		    const inProgress = Transition.inProgress(el);
		    await Transition.cancel(el);
		    if (show) {
		      _toggle(el, true);
		    }
		    const prevProps = Object.fromEntries(["padding", "border", "width", "height", "minWidth", "minHeight", "overflowY", "overflowX", marginProp, marginStartProp].map(key => [key, el.style[key]]));
		    const dim = dimensions$1(el);
		    const currentMargin = toFloat(css(el, marginProp));
		    const marginStart = toFloat(css(el, marginStartProp));
		    const endDim = dim[dimProp] + marginStart;
		    if (!inProgress && !show) {
		      currentDim += marginStart;
		    }
		    const [wrapper] = wrapInner(el, "<div>");
		    css(wrapper, {
		      boxSizing: "border-box",
		      height: dim.height,
		      width: dim.width,
		      ...css(el, ["overflow", "padding", "borderTop", "borderRight", "borderBottom", "borderLeft", "borderImage", marginStartProp])
		    });
		    css(el, {
		      padding: 0,
		      border: 0,
		      minWidth: 0,
		      minHeight: 0,
		      [marginStartProp]: 0,
		      width: dim.width,
		      height: dim.height,
		      overflow: "hidden",
		      [dimProp]: currentDim
		    });
		    const percent = currentDim / endDim;
		    duration = (velocity * endDim + duration) * (show ? 1 - percent : percent);
		    const endProps = {
		      [dimProp]: show ? endDim : 0
		    };
		    if (end) {
		      css(el, marginProp, endDim - currentDim + currentMargin);
		      endProps[marginProp] = show ? currentMargin : endDim + currentMargin;
		    }
		    if (!end ^ mode === "reveal") {
		      css(wrapper, marginProp, -endDim + currentDim);
		      Transition.start(wrapper, {
		        [marginProp]: show ? 0 : -endDim
		      }, duration, transition);
		    }
		    try {
		      await Transition.start(el, endProps, duration, transition);
		    } finally {
		      css(el, prevProps);
		      unwrap(wrapper.firstChild);
		      if (!show) {
		        _toggle(el, false);
		      }
		    }
		  }
		  function toggleAnimation(el, show, cmp) {
		    Animation.cancel(el);
		    const {
		      animation,
		      duration,
		      _toggle
		    } = cmp;
		    if (show) {
		      _toggle(el, true);
		      return Animation.in(el, animation[0], duration, cmp.origin);
		    }
		    return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(() => _toggle(el, false));
		  }
		  const keyMap = {
		    TAB: 9,
		    ESC: 27,
		    SPACE: 32,
		    END: 35,
		    HOME: 36,
		    LEFT: 37,
		    UP: 38,
		    RIGHT: 39,
		    DOWN: 40
		  };
		  function resize(options) {
		    return observe(observeResize, options, "resize");
		  }
		  function intersection(options) {
		    return observe(observeIntersection, options);
		  }
		  function mutation(options) {
		    return observe(observeMutation, options);
		  }
		  function lazyload(options = {}) {
		    return intersection({
		      handler: function (entries, observer) {
		        const {
		          targets = this.$el,
		          preload = 5
		        } = options;
		        for (const el of toNodes(isFunction(targets) ? targets(this) : targets)) {
		          $$('[loading="lazy"]', el).slice(0, preload - 1).forEach(el2 => removeAttr(el2, "loading"));
		        }
		        for (const el of entries.filter(({
		          isIntersecting
		        }) => isIntersecting).map(({
		          target
		        }) => target)) {
		          observer.unobserve(el);
		        }
		      },
		      ...options
		    });
		  }
		  function viewport() {
		    return observe((target, handler) => observeViewportResize(handler));
		  }
		  function scroll$1(options) {
		    return observe((target, handler) => ({
		      disconnect: on(target, "scroll", handler, {
		        passive: true,
		        capture: true
		      })
		    }), {
		      target: () => document,
		      ...options
		    }, "scroll");
		  }
		  function swipe(options) {
		    return {
		      observe(target, handler) {
		        return {
		          observe: noop,
		          unobserve: noop,
		          disconnect: on(target, pointerDown$1, handler, {
		            passive: true
		          })
		        };
		      },
		      handler(e) {
		        if (!isTouch(e)) {
		          return;
		        }
		        const pos = getEventPos(e);
		        const target = "tagName" in e.target ? e.target : parent(e.target);
		        once(document, `${pointerUp$1} ${pointerCancel} scroll`, e2 => {
		          const {
		            x,
		            y
		          } = getEventPos(e2);
		          if (e2.type !== "scroll" && target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {
		            setTimeout(() => {
		              trigger(target, "swipe");
		              trigger(target, `swipe${swipeDirection(pos.x, pos.y, x, y)}`);
		            });
		          }
		        });
		      },
		      ...options
		    };
		  }
		  function observe(observe2, options, emit) {
		    return {
		      observe: observe2,
		      handler() {
		        this.$emit(emit);
		      },
		      ...options
		    };
		  }
		  function swipeDirection(x1, y1, x2, y2) {
		    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? "Left" : "Right" : y1 - y2 > 0 ? "Up" : "Down";
		  }
		  var Accordion = {
		    mixins: [Class, Togglable],
		    props: {
		      animation: Boolean,
		      targets: String,
		      active: null,
		      collapsible: Boolean,
		      multiple: Boolean,
		      toggle: String,
		      content: String,
		      offset: Number
		    },
		    data: {
		      targets: "> *",
		      active: false,
		      animation: true,
		      collapsible: true,
		      multiple: false,
		      clsOpen: "uk-open",
		      toggle: "> .uk-accordion-title",
		      content: "> .uk-accordion-content",
		      offset: 0
		    },
		    computed: {
		      items({
		        targets
		      }, $el) {
		        return $$(targets, $el);
		      },
		      toggles({
		        toggle
		      }) {
		        return this.items.map(item => $(toggle, item));
		      },
		      contents({
		        content
		      }) {
		        return this.items.map(item => {
		          var _a;
		          return ((_a = item._wrapper) == null ? void 0 : _a.firstElementChild) || $(content, item);
		        });
		      }
		    },
		    watch: {
		      items(items, prev) {
		        if (prev || hasClass(items, this.clsOpen)) {
		          return;
		        }
		        const active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
		        if (active) {
		          this.toggle(active, false);
		        }
		      },
		      toggles() {
		        this.$emit();
		      },
		      contents(items) {
		        for (const el of items) {
		          const isOpen = hasClass(this.items.find(item => within(el, item)), this.clsOpen);
		          hide(el, !isOpen);
		        }
		        this.$emit();
		      }
		    },
		    observe: lazyload(),
		    events: [{
		      name: "click keydown",
		      delegate() {
		        return `${this.targets} ${this.$props.toggle}`;
		      },
		      async handler(e) {
		        var _a;
		        if (e.type === "keydown" && e.keyCode !== keyMap.SPACE) {
		          return;
		        }
		        e.preventDefault();
		        (_a = this._off) == null ? void 0 : _a.call(this);
		        this._off = keepScrollPosition(e.target);
		        await this.toggle(index(this.toggles, e.current));
		        this._off();
		      }
		    }, {
		      name: "shown hidden",
		      self: true,
		      delegate() {
		        return this.targets;
		      },
		      handler() {
		        this.$emit();
		      }
		    }],
		    update() {
		      const activeItems = filter$1(this.items, `.${this.clsOpen}`);
		      for (const index2 in this.items) {
		        const toggle = this.toggles[index2];
		        const content = this.contents[index2];
		        if (!toggle || !content) {
		          continue;
		        }
		        toggle.id = generateId(this, toggle, `-title-${index2}`);
		        content.id = generateId(this, content, `-content-${index2}`);
		        const active = includes(activeItems, this.items[index2]);
		        attr(toggle, {
		          role: isTag(toggle, "a") ? "button" : null,
		          "aria-controls": content.id,
		          "aria-expanded": active,
		          "aria-disabled": !this.collapsible && activeItems.length < 2 && active
		        });
		        attr(content, {
		          role: "region",
		          "aria-labelledby": toggle.id
		        });
		        if (isTag(content, "ul")) {
		          attr(children(content), "role", "presentation");
		        }
		      }
		    },
		    methods: {
		      toggle(item, animate) {
		        item = this.items[getIndex(item, this.items)];
		        let items = [item];
		        const activeItems = filter$1(this.items, `.${this.clsOpen}`);
		        if (!this.multiple && !includes(activeItems, items[0])) {
		          items = items.concat(activeItems);
		        }
		        if (!this.collapsible && activeItems.length < 2 && includes(activeItems, item)) {
		          return;
		        }
		        return Promise.all(items.map(el => this.toggleElement(el, !includes(activeItems, el), (el2, show) => {
		          toggleClass(el2, this.clsOpen, show);
		          if (animate === false || !this.animation) {
		            hide($(this.content, el2), !show);
		            return;
		          }
		          return transition(el2, show, this);
		        })));
		      }
		    }
		  };
		  function hide(el, hide2) {
		    el && (el.hidden = hide2);
		  }
		  async function transition(el, show, {
		    content,
		    duration,
		    velocity,
		    transition: transition2
		  }) {
		    var _a;
		    content = ((_a = el._wrapper) == null ? void 0 : _a.firstElementChild) || $(content, el);
		    if (!el._wrapper) {
		      el._wrapper = wrapAll(content, "<div>");
		    }
		    const wrapper = el._wrapper;
		    css(wrapper, "overflow", "hidden");
		    const currentHeight = toFloat(css(wrapper, "height"));
		    await Transition.cancel(wrapper);
		    hide(content, false);
		    const endHeight = sumBy(["marginTop", "marginBottom"], prop => css(content, prop)) + dimensions$1(content).height;
		    const percent = currentHeight / endHeight;
		    duration = (velocity * endHeight + duration) * (show ? 1 - percent : percent);
		    css(wrapper, "height", currentHeight);
		    await Transition.start(wrapper, {
		      height: show ? endHeight : 0
		    }, duration, transition2);
		    unwrap(content);
		    delete el._wrapper;
		    if (!show) {
		      hide(content, true);
		    }
		  }
		  function keepScrollPosition(el) {
		    const scrollElement = scrollParent(el, true);
		    let frame;
		    (function scroll() {
		      frame = requestAnimationFrame(() => {
		        const {
		          top
		        } = el.getBoundingClientRect();
		        if (top < 0) {
		          scrollElement.scrollTop += top;
		        }
		        scroll();
		      });
		    })();
		    return () => requestAnimationFrame(() => cancelAnimationFrame(frame));
		  }
		  var alert = {
		    mixins: [Class, Togglable],
		    args: "animation",
		    props: {
		      animation: Boolean,
		      close: String
		    },
		    data: {
		      animation: true,
		      selClose: ".uk-alert-close",
		      duration: 150
		    },
		    events: {
		      name: "click",
		      delegate() {
		        return this.selClose;
		      },
		      handler(e) {
		        e.preventDefault();
		        this.close();
		      }
		    },
		    methods: {
		      async close() {
		        await this.toggleElement(this.$el, false, animate$1);
		        this.$destroy(true);
		      }
		    }
		  };
		  function animate$1(el, show, {
		    duration,
		    transition,
		    velocity
		  }) {
		    const height = toFloat(css(el, "height"));
		    css(el, "height", height);
		    return Transition.start(el, {
		      height: 0,
		      marginTop: 0,
		      marginBottom: 0,
		      paddingTop: 0,
		      paddingBottom: 0,
		      borderTop: 0,
		      borderBottom: 0,
		      opacity: 0
		    }, velocity * height + duration, transition);
		  }
		  var Video = {
		    args: "autoplay",
		    props: {
		      automute: Boolean,
		      autoplay: Boolean
		    },
		    data: {
		      automute: false,
		      autoplay: true
		    },
		    connected() {
		      this.inView = this.autoplay === "inview";
		      if (this.inView && !hasAttr(this.$el, "preload")) {
		        this.$el.preload = "none";
		      }
		      if (isTag(this.$el, "iframe") && !hasAttr(this.$el, "allow")) {
		        this.$el.allow = "autoplay";
		      }
		      if (this.automute) {
		        mute(this.$el);
		      }
		    },
		    observe: [intersection({
		      args: {
		        intersecting: false
		      }
		    }), resize()],
		    update: {
		      read({
		        visible
		      }) {
		        if (!isVideo(this.$el)) {
		          return false;
		        }
		        return {
		          prev: visible,
		          visible: isVisible(this.$el),
		          inView: this.inView && isInView(this.$el)
		        };
		      },
		      write({
		        prev,
		        visible,
		        inView
		      }) {
		        if (!visible || this.inView && !inView) {
		          pause(this.$el);
		        } else if (this.autoplay === true && !prev || inView) {
		          play(this.$el);
		        }
		      },
		      events: ["resize"]
		    }
		  };
		  var cover = {
		    mixins: [Video],
		    props: {
		      width: Number,
		      height: Number
		    },
		    data: {
		      automute: true
		    },
		    events: {
		      "load loadedmetadata"() {
		        this.$emit("resize");
		      }
		    },
		    observe: resize({
		      target: ({
		        $el
		      }) => [getPositionedParent($el) || parent($el)]
		    }),
		    update: {
		      read() {
		        const {
		          ratio,
		          cover
		        } = Dimensions;
		        const {
		          $el,
		          width,
		          height
		        } = this;
		        let dim = {
		          width,
		          height
		        };
		        if (!width || !height) {
		          const intrinsic = {
		            width: $el.naturalWidth || $el.videoWidth || $el.clientWidth,
		            height: $el.naturalHeight || $el.videoHeight || $el.clientHeight
		          };
		          if (width) {
		            dim = ratio(intrinsic, "width", width);
		          } else if (height) {
		            dim = ratio(intrinsic, "height", height);
		          } else {
		            dim = intrinsic;
		          }
		        }
		        const {
		          offsetHeight: coverHeight,
		          offsetWidth: coverWidth
		        } = getPositionedParent($el) || parent($el);
		        const coverDim = cover(dim, {
		          width: coverWidth + (coverWidth % 2 ? 1 : 0),
		          height: coverHeight + (coverHeight % 2 ? 1 : 0)
		        });
		        if (!coverDim.width || !coverDim.height) {
		          return false;
		        }
		        return coverDim;
		      },
		      write({
		        height,
		        width
		      }) {
		        css(this.$el, {
		          height,
		          width
		        });
		      },
		      events: ["resize"]
		    }
		  };
		  function getPositionedParent(el) {
		    while (el = parent(el)) {
		      if (css(el, "position") !== "static") {
		        return el;
		      }
		    }
		  }
		  var Position = {
		    props: {
		      pos: String,
		      offset: null,
		      flip: Boolean,
		      shift: Boolean,
		      inset: Boolean
		    },
		    data: {
		      pos: `bottom-${isRtl ? "right" : "left"}`,
		      offset: false,
		      flip: true,
		      shift: true,
		      inset: false
		    },
		    connected() {
		      this.pos = this.$props.pos.split("-").concat("center").slice(0, 2);
		      [this.dir, this.align] = this.pos;
		      this.axis = includes(["top", "bottom"], this.dir) ? "y" : "x";
		    },
		    methods: {
		      positionAt(element, target, boundary) {
		        let offset = [this.getPositionOffset(element), this.getShiftOffset(element)];
		        const placement = [this.flip && "flip", this.shift && "shift"];
		        const attach = {
		          element: [this.inset ? this.dir : flipPosition(this.dir), this.align],
		          target: [this.dir, this.align]
		        };
		        if (this.axis === "y") {
		          for (const prop in attach) {
		            attach[prop].reverse();
		          }
		          offset.reverse();
		          placement.reverse();
		        }
		        const restoreScrollPosition = storeScrollPosition(element);
		        const elDim = dimensions$1(element);
		        css(element, {
		          top: -elDim.height,
		          left: -elDim.width
		        });
		        positionAt(element, target, {
		          attach,
		          offset,
		          boundary,
		          placement,
		          viewportOffset: this.getViewportOffset(element)
		        });
		        restoreScrollPosition();
		      },
		      getPositionOffset(element) {
		        return toPx(this.offset === false ? css(element, "--uk-position-offset") : this.offset, this.axis === "x" ? "width" : "height", element) * (includes(["left", "top"], this.dir) ? -1 : 1) * (this.inset ? -1 : 1);
		      },
		      getShiftOffset(element) {
		        return this.align === "center" ? 0 : toPx(css(element, "--uk-position-shift-offset"), this.axis === "y" ? "width" : "height", element) * (includes(["left", "top"], this.align) ? 1 : -1);
		      },
		      getViewportOffset(element) {
		        return toPx(css(element, "--uk-position-viewport-offset"));
		      }
		    }
		  };
		  function storeScrollPosition(element) {
		    const scrollElement = scrollParent(element);
		    const {
		      scrollTop
		    } = scrollElement;
		    return () => {
		      if (scrollTop !== scrollElement.scrollTop) {
		        scrollElement.scrollTop = scrollTop;
		      }
		    };
		  }
		  var Container = {
		    props: {
		      container: Boolean
		    },
		    data: {
		      container: true
		    },
		    computed: {
		      container({
		        container
		      }) {
		        return container === true && this.$container || container && $(container);
		      }
		    }
		  };
		  let prevented;
		  function preventBackgroundScroll(el) {
		    const off = on(el, "touchmove", e => {
		      if (e.targetTouches.length !== 1 || matches(e.target, 'input[type="range"')) {
		        return;
		      }
		      let {
		        scrollHeight,
		        clientHeight
		      } = scrollParent(e.target);
		      if (clientHeight >= scrollHeight && e.cancelable) {
		        e.preventDefault();
		      }
		    }, {
		      passive: false
		    });
		    if (prevented) {
		      return off;
		    }
		    prevented = true;
		    const {
		      scrollingElement
		    } = document;
		    css(scrollingElement, {
		      overflowY: CSS.supports("overflow", "clip") ? "clip" : "hidden",
		      touchAction: "none",
		      paddingRight: width(window) - scrollingElement.clientWidth || ""
		    });
		    return () => {
		      prevented = false;
		      off();
		      css(scrollingElement, {
		        overflowY: "",
		        touchAction: "",
		        paddingRight: ""
		      });
		    };
		  }
		  let active$1;
		  var drop = {
		    mixins: [Container, Position, Togglable],
		    args: "pos",
		    props: {
		      mode: "list",
		      toggle: Boolean,
		      boundary: Boolean,
		      boundaryX: Boolean,
		      boundaryY: Boolean,
		      target: Boolean,
		      targetX: Boolean,
		      targetY: Boolean,
		      stretch: Boolean,
		      delayShow: Number,
		      delayHide: Number,
		      autoUpdate: Boolean,
		      clsDrop: String,
		      animateOut: Boolean,
		      bgScroll: Boolean
		    },
		    data: {
		      mode: ["click", "hover"],
		      toggle: "- *",
		      boundary: false,
		      boundaryX: false,
		      boundaryY: false,
		      target: false,
		      targetX: false,
		      targetY: false,
		      stretch: false,
		      delayShow: 0,
		      delayHide: 800,
		      autoUpdate: true,
		      clsDrop: false,
		      animateOut: false,
		      bgScroll: true,
		      animation: ["uk-animation-fade"],
		      cls: "uk-open",
		      container: false
		    },
		    computed: {
		      boundary({
		        boundary,
		        boundaryX,
		        boundaryY
		      }, $el) {
		        return [query(boundaryX || boundary, $el) || window, query(boundaryY || boundary, $el) || window];
		      },
		      target({
		        target,
		        targetX,
		        targetY
		      }, $el) {
		        targetX || (targetX = target || this.targetEl);
		        targetY || (targetY = target || this.targetEl);
		        return [targetX === true ? window : query(targetX, $el), targetY === true ? window : query(targetY, $el)];
		      }
		    },
		    created() {
		      this.tracker = new MouseTracker();
		    },
		    beforeConnect() {
		      this.clsDrop = this.$props.clsDrop || `uk-${this.$options.name}`;
		    },
		    connected() {
		      addClass(this.$el, "uk-drop", this.clsDrop);
		      if (this.toggle && !this.targetEl) {
		        this.targetEl = createToggleComponent(this);
		      }
		      this._style = pick(this.$el.style, ["width", "height"]);
		    },
		    disconnected() {
		      if (this.isActive()) {
		        this.hide(false);
		        active$1 = null;
		      }
		      css(this.$el, this._style);
		    },
		    observe: lazyload({
		      target: ({
		        toggle,
		        $el
		      }) => query(toggle, $el),
		      targets: ({
		        $el
		      }) => $el
		    }),
		    events: [{
		      name: "click",
		      delegate() {
		        return ".uk-drop-close";
		      },
		      handler(e) {
		        e.preventDefault();
		        this.hide(false);
		      }
		    }, {
		      name: "click",
		      delegate() {
		        return 'a[href*="#"]';
		      },
		      handler({
		        defaultPrevented,
		        current
		      }) {
		        const {
		          hash
		        } = current;
		        if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, this.$el)) {
		          this.hide(false);
		        }
		      }
		    }, {
		      name: "beforescroll",
		      handler() {
		        this.hide(false);
		      }
		    }, {
		      name: "toggle",
		      self: true,
		      handler(e, toggle) {
		        e.preventDefault();
		        if (this.isToggled()) {
		          this.hide(false);
		        } else {
		          this.show(toggle == null ? void 0 : toggle.$el, false);
		        }
		      }
		    }, {
		      name: "toggleshow",
		      self: true,
		      handler(e, toggle) {
		        e.preventDefault();
		        this.show(toggle == null ? void 0 : toggle.$el);
		      }
		    }, {
		      name: "togglehide",
		      self: true,
		      handler(e) {
		        e.preventDefault();
		        if (!matches(this.$el, ":focus,:hover")) {
		          this.hide();
		        }
		      }
		    }, {
		      name: `${pointerEnter} focusin`,
		      filter() {
		        return includes(this.mode, "hover");
		      },
		      handler(e) {
		        if (!isTouch(e)) {
		          this.clearTimers();
		        }
		      }
		    }, {
		      name: `${pointerLeave} focusout`,
		      filter() {
		        return includes(this.mode, "hover");
		      },
		      handler(e) {
		        if (!isTouch(e) && e.relatedTarget) {
		          this.hide();
		        }
		      }
		    }, {
		      name: "toggled",
		      self: true,
		      handler(e, toggled) {
		        attr(this.targetEl, "aria-expanded", toggled ? true : null);
		        if (!toggled) {
		          return;
		        }
		        this.clearTimers();
		        this.position();
		      }
		    }, {
		      name: "show",
		      self: true,
		      handler() {
		        active$1 = this;
		        this.tracker.init();
		        const handlers = [listenForResize(this), listenForEscClose$1(this), listenForBackgroundClose$1(this), this.autoUpdate && listenForScroll(this), !this.bgScroll && preventBackgroundScroll(this.$el)];
		        once(this.$el, "hide", () => handlers.forEach(handler => handler && handler()), {
		          self: true
		        });
		      }
		    }, {
		      name: "beforehide",
		      self: true,
		      handler() {
		        this.clearTimers();
		      }
		    }, {
		      name: "hide",
		      handler({
		        target
		      }) {
		        if (this.$el !== target) {
		          active$1 = active$1 === null && within(target, this.$el) && this.isToggled() ? this : active$1;
		          return;
		        }
		        active$1 = this.isActive() ? null : active$1;
		        this.tracker.cancel();
		      }
		    }],
		    update: {
		      write() {
		        if (this.isToggled() && !hasClass(this.$el, this.clsEnter)) {
		          this.position();
		        }
		      }
		    },
		    methods: {
		      show(target = this.targetEl, delay = true) {
		        if (this.isToggled() && target && this.targetEl && target !== this.targetEl) {
		          this.hide(false, false);
		        }
		        this.targetEl = target;
		        this.clearTimers();
		        if (this.isActive()) {
		          return;
		        }
		        if (active$1) {
		          if (delay && active$1.isDelaying) {
		            this.showTimer = setTimeout(() => matches(target, ":hover") && this.show(), 10);
		            return;
		          }
		          let prev;
		          while (active$1 && prev !== active$1 && !within(this.$el, active$1.$el)) {
		            prev = active$1;
		            active$1.hide(false, false);
		          }
		        }
		        if (this.container && parent(this.$el) !== this.container) {
		          append(this.container, this.$el);
		        }
		        this.showTimer = setTimeout(() => this.toggleElement(this.$el, true), delay && this.delayShow || 0);
		      },
		      hide(delay = true, animate = true) {
		        const hide = () => this.toggleElement(this.$el, false, this.animateOut && animate);
		        this.clearTimers();
		        this.isDelaying = getPositionedElements(this.$el).some(el => this.tracker.movesTo(el));
		        if (delay && this.isDelaying) {
		          this.hideTimer = setTimeout(this.hide, 50);
		        } else if (delay && this.delayHide) {
		          this.hideTimer = setTimeout(hide, this.delayHide);
		        } else {
		          hide();
		        }
		      },
		      clearTimers() {
		        clearTimeout(this.showTimer);
		        clearTimeout(this.hideTimer);
		        this.showTimer = null;
		        this.hideTimer = null;
		        this.isDelaying = false;
		      },
		      isActive() {
		        return active$1 === this;
		      },
		      position() {
		        removeClass(this.$el, "uk-drop-stack");
		        css(this.$el, this._style);
		        this.$el.hidden = true;
		        const viewports = this.target.map(target => getViewport$1(this.$el, target));
		        const viewportOffset = this.getViewportOffset(this.$el);
		        const dirs = [[0, ["x", "width", "left", "right"]], [1, ["y", "height", "top", "bottom"]]];
		        for (const [i, [axis, prop]] of dirs) {
		          if (this.axis !== axis && includes([axis, true], this.stretch)) {
		            css(this.$el, {
		              [prop]: Math.min(offset(this.boundary[i])[prop], viewports[i][prop] - 2 * viewportOffset),
		              [`overflow-${axis}`]: "auto"
		            });
		          }
		        }
		        const maxWidth = viewports[0].width - 2 * viewportOffset;
		        this.$el.hidden = false;
		        css(this.$el, "maxWidth", "");
		        if (this.$el.offsetWidth > maxWidth) {
		          addClass(this.$el, "uk-drop-stack");
		        }
		        css(this.$el, "maxWidth", maxWidth);
		        this.positionAt(this.$el, this.target, this.boundary);
		        for (const [i, [axis, prop, start, end]] of dirs) {
		          if (this.axis === axis && includes([axis, true], this.stretch)) {
		            const positionOffset = Math.abs(this.getPositionOffset(this.$el));
		            const targetOffset = offset(this.target[i]);
		            const elOffset = offset(this.$el);
		            css(this.$el, {
		              [prop]: (targetOffset[start] > elOffset[start] ? targetOffset[this.inset ? end : start] - Math.max(offset(this.boundary[i])[start], viewports[i][start] + viewportOffset) : Math.min(offset(this.boundary[i])[end], viewports[i][end] - viewportOffset) - targetOffset[this.inset ? start : end]) - positionOffset,
		              [`overflow-${axis}`]: "auto"
		            });
		            this.positionAt(this.$el, this.target, this.boundary);
		          }
		        }
		      }
		    }
		  };
		  function getPositionedElements(el) {
		    const result = [];
		    apply(el, el2 => css(el2, "position") !== "static" && result.push(el2));
		    return result;
		  }
		  function getViewport$1(el, target) {
		    return offsetViewport(overflowParents(target).find(parent2 => within(el, parent2)));
		  }
		  function createToggleComponent(drop) {
		    const {
		      $el
		    } = drop.$create("toggle", query(drop.toggle, drop.$el), {
		      target: drop.$el,
		      mode: drop.mode
		    });
		    attr($el, "aria-haspopup", true);
		    return $el;
		  }
		  function listenForResize(drop) {
		    const update = () => drop.$emit();
		    const off = [observeViewportResize(update), observeResize(overflowParents(drop.$el).concat(drop.target), update)];
		    return () => off.map(observer => observer.disconnect());
		  }
		  function listenForScroll(drop) {
		    return on([document, ...overflowParents(drop.$el)], "scroll", () => drop.$emit(), {
		      passive: true
		    });
		  }
		  function listenForEscClose$1(drop) {
		    return on(document, "keydown", e => {
		      if (e.keyCode === keyMap.ESC) {
		        drop.hide(false);
		      }
		    });
		  }
		  function listenForBackgroundClose$1(drop) {
		    return on(document, pointerDown$1, ({
		      target
		    }) => {
		      if (!within(target, drop.$el)) {
		        once(document, `${pointerUp$1} ${pointerCancel} scroll`, ({
		          defaultPrevented,
		          type,
		          target: newTarget
		        }) => {
		          if (!defaultPrevented && type === pointerUp$1 && target === newTarget && !(drop.targetEl && within(target, drop.targetEl))) {
		            drop.hide(false);
		          }
		        }, true);
		      }
		    });
		  }
		  var Dropnav = {
		    mixins: [Class, Container],
		    props: {
		      align: String,
		      clsDrop: String,
		      boundary: Boolean,
		      dropbar: Boolean,
		      dropbarAnchor: Boolean,
		      duration: Number,
		      mode: Boolean,
		      offset: Boolean,
		      stretch: Boolean,
		      delayShow: Boolean,
		      delayHide: Boolean,
		      target: Boolean,
		      targetX: Boolean,
		      targetY: Boolean,
		      animation: Boolean,
		      animateOut: Boolean
		    },
		    data: {
		      align: isRtl ? "right" : "left",
		      clsDrop: "uk-dropdown",
		      clsDropbar: "uk-dropnav-dropbar",
		      boundary: true,
		      dropbar: false,
		      dropbarAnchor: false,
		      duration: 200,
		      container: false,
		      selNavItem: "> li > a, > ul > li > a"
		    },
		    computed: {
		      dropbarAnchor({
		        dropbarAnchor
		      }, $el) {
		        return query(dropbarAnchor, $el) || $el;
		      },
		      dropbar({
		        dropbar
		      }) {
		        if (!dropbar) {
		          return null;
		        }
		        dropbar = this._dropbar || query(dropbar, this.$el) || $(`+ .${this.clsDropbar}`, this.$el);
		        return dropbar ? dropbar : this._dropbar = $("<div></div>");
		      },
		      dropContainer(_, $el) {
		        return this.container || $el;
		      },
		      dropdowns({
		        clsDrop
		      }, $el) {
		        var _a;
		        const dropdowns = $$(`.${clsDrop}`, $el);
		        if (this.dropContainer !== $el) {
		          for (const el of $$(`.${clsDrop}`, this.dropContainer)) {
		            const target = (_a = this.getDropdown(el)) == null ? void 0 : _a.targetEl;
		            if (!includes(dropdowns, el) && target && within(target, this.$el)) {
		              dropdowns.push(el);
		            }
		          }
		        }
		        return dropdowns;
		      },
		      items({
		        selNavItem
		      }, $el) {
		        return $$(selNavItem, $el);
		      }
		    },
		    watch: {
		      dropbar(dropbar) {
		        addClass(dropbar, "uk-dropbar", "uk-dropbar-top", this.clsDropbar, `uk-${this.$options.name}-dropbar`);
		      },
		      dropdowns(dropdowns) {
		        this.$create("drop", dropdowns.filter(el => !this.getDropdown(el)), {
		          ...this.$props,
		          flip: false,
		          shift: true,
		          pos: `bottom-${this.align}`,
		          boundary: this.boundary === true ? this.$el : this.boundary
		        });
		      }
		    },
		    disconnected() {
		      remove$1(this._dropbar);
		      delete this._dropbar;
		    },
		    events: [{
		      name: "mouseover focusin",
		      delegate() {
		        return this.selNavItem;
		      },
		      handler({
		        current
		      }) {
		        const active2 = this.getActive();
		        if (active2 && includes(active2.mode, "hover") && active2.targetEl && !within(active2.targetEl, current) && !active2.isDelaying) {
		          active2.hide(false);
		        }
		      }
		    }, {
		      name: "keydown",
		      self: true,
		      delegate() {
		        return this.selNavItem;
		      },
		      handler(e) {
		        var _a;
		        const {
		          current,
		          keyCode
		        } = e;
		        const active2 = this.getActive();
		        if (keyCode === keyMap.DOWN && (active2 == null ? void 0 : active2.targetEl) === current) {
		          e.preventDefault();
		          (_a = $(selFocusable, active2.$el)) == null ? void 0 : _a.focus();
		        }
		        handleNavItemNavigation(e, this.items, active2);
		      }
		    }, {
		      name: "keydown",
		      el() {
		        return this.dropContainer;
		      },
		      delegate() {
		        return `.${this.clsDrop}`;
		      },
		      handler(e) {
		        var _a;
		        const {
		          current,
		          keyCode
		        } = e;
		        if (!includes(this.dropdowns, current)) {
		          return;
		        }
		        const active2 = this.getActive();
		        let next = -1;
		        if (keyCode === keyMap.HOME) {
		          next = 0;
		        } else if (keyCode === keyMap.END) {
		          next = "last";
		        } else if (keyCode === keyMap.UP) {
		          next = "previous";
		        } else if (keyCode === keyMap.DOWN) {
		          next = "next";
		        } else if (keyCode === keyMap.ESC) {
		          (_a = active2.targetEl) == null ? void 0 : _a.focus();
		        }
		        if (~next) {
		          e.preventDefault();
		          const elements = $$(selFocusable, current);
		          elements[getIndex(next, elements, findIndex(elements, el => matches(el, ":focus")))].focus();
		        }
		        handleNavItemNavigation(e, this.items, active2);
		      }
		    }, {
		      name: "mouseleave",
		      el() {
		        return this.dropbar;
		      },
		      filter() {
		        return this.dropbar;
		      },
		      handler() {
		        const active2 = this.getActive();
		        if (active2 && includes(active2.mode, "hover") && !this.dropdowns.some(el => matches(el, ":hover"))) {
		          active2.hide();
		        }
		      }
		    }, {
		      name: "beforeshow",
		      el() {
		        return this.dropContainer;
		      },
		      filter() {
		        return this.dropbar;
		      },
		      handler({
		        target
		      }) {
		        if (!this.isDropbarDrop(target)) {
		          return;
		        }
		        if (this.dropbar.previousElementSibling !== this.dropbarAnchor) {
		          after(this.dropbarAnchor, this.dropbar);
		        }
		        addClass(target, `${this.clsDrop}-dropbar`);
		      }
		    }, {
		      name: "show",
		      el() {
		        return this.dropContainer;
		      },
		      filter() {
		        return this.dropbar;
		      },
		      handler({
		        target
		      }) {
		        if (!this.isDropbarDrop(target)) {
		          return;
		        }
		        const drop = this.getDropdown(target);
		        const adjustHeight = () => {
		          const targetOffsets = parents(target, `.${this.clsDrop}`).concat(target).map(el => offset(el));
		          const minTop = Math.min(...targetOffsets.map(({
		            top
		          }) => top));
		          const maxBottom = Math.max(...targetOffsets.map(({
		            bottom
		          }) => bottom));
		          const dropbarOffset = offset(this.dropbar);
		          css(this.dropbar, "top", this.dropbar.offsetTop - (dropbarOffset.top - minTop));
		          this.transitionTo(maxBottom - minTop + toFloat(css(target, "marginBottom")), target);
		        };
		        this._observer = observeResize([drop.$el, ...drop.target], adjustHeight);
		        adjustHeight();
		      }
		    }, {
		      name: "beforehide",
		      el() {
		        return this.dropContainer;
		      },
		      filter() {
		        return this.dropbar;
		      },
		      handler(e) {
		        const active2 = this.getActive();
		        if (matches(this.dropbar, ":hover") && active2.$el === e.target && !this.items.some(el => active2.targetEl !== el && matches(el, ":focus"))) {
		          e.preventDefault();
		        }
		      }
		    }, {
		      name: "hide",
		      el() {
		        return this.dropContainer;
		      },
		      filter() {
		        return this.dropbar;
		      },
		      handler({
		        target
		      }) {
		        var _a;
		        if (!this.isDropbarDrop(target)) {
		          return;
		        }
		        (_a = this._observer) == null ? void 0 : _a.disconnect();
		        const active2 = this.getActive();
		        if (!active2 || active2.$el === target) {
		          this.transitionTo(0);
		        }
		      }
		    }],
		    methods: {
		      getActive() {
		        var _a;
		        return includes(this.dropdowns, (_a = active$1) == null ? void 0 : _a.$el) && active$1;
		      },
		      async transitionTo(newHeight, el) {
		        const {
		          dropbar
		        } = this;
		        const oldHeight = height(dropbar);
		        el = oldHeight < newHeight && el;
		        await Transition.cancel([el, dropbar]);
		        css(el, "clipPath", `polygon(0 0,100% 0,100% ${oldHeight}px,0 ${oldHeight}px)`);
		        height(dropbar, oldHeight);
		        await Promise.all([Transition.start(dropbar, {
		          height: newHeight
		        }, this.duration), Transition.start(el, {
		          clipPath: `polygon(0 0,100% 0,100% ${newHeight}px,0 ${newHeight}px)`
		        }, this.duration).finally(() => css(el, {
		          clipPath: ""
		        }))]).catch(noop);
		      },
		      getDropdown(el) {
		        return this.$getComponent(el, "drop") || this.$getComponent(el, "dropdown");
		      },
		      isDropbarDrop(el) {
		        return this.getDropdown(el) && hasClass(el, this.clsDrop);
		      }
		    }
		  };
		  function handleNavItemNavigation(e, toggles, active2) {
		    var _a, _b, _c;
		    const {
		      current,
		      keyCode
		    } = e;
		    let next = -1;
		    if (keyCode === keyMap.HOME) {
		      next = 0;
		    } else if (keyCode === keyMap.END) {
		      next = "last";
		    } else if (keyCode === keyMap.LEFT) {
		      next = "previous";
		    } else if (keyCode === keyMap.RIGHT) {
		      next = "next";
		    } else if (keyCode === keyMap.TAB) {
		      (_a = active2.targetEl) == null ? void 0 : _a.focus();
		      (_b = active2.hide) == null ? void 0 : _b.call(active2, false);
		    }
		    if (~next) {
		      e.preventDefault();
		      (_c = active2.hide) == null ? void 0 : _c.call(active2, false);
		      toggles[getIndex(next, toggles, toggles.indexOf(active2.targetEl || current))].focus();
		    }
		  }
		  var formCustom = {
		    mixins: [Class],
		    args: "target",
		    props: {
		      target: Boolean
		    },
		    data: {
		      target: false
		    },
		    computed: {
		      input(_, $el) {
		        return $(selInput, $el);
		      },
		      state() {
		        return this.input.nextElementSibling;
		      },
		      target({
		        target
		      }, $el) {
		        return target && (target === true && parent(this.input) === $el && this.input.nextElementSibling || $(target, $el));
		      }
		    },
		    update() {
		      var _a;
		      const {
		        target,
		        input
		      } = this;
		      if (!target) {
		        return;
		      }
		      let option;
		      const prop = isInput(target) ? "value" : "textContent";
		      const prev = target[prop];
		      const value = ((_a = input.files) == null ? void 0 : _a[0]) ? input.files[0].name : matches(input, "select") && (option = $$("option", input).filter(el => el.selected)[0]) ? option.textContent : input.value;
		      if (prev !== value) {
		        target[prop] = value;
		      }
		    },
		    events: [{
		      name: "change",
		      handler() {
		        this.$emit();
		      }
		    }, {
		      name: "reset",
		      el() {
		        return closest(this.$el, "form");
		      },
		      handler() {
		        this.$emit();
		      }
		    }]
		  };
		  var Margin = {
		    props: {
		      margin: String,
		      firstColumn: Boolean
		    },
		    data: {
		      margin: "uk-margin-small-top",
		      firstColumn: "uk-first-column"
		    },
		    observe: [mutation({
		      options: {
		        childList: true,
		        attributes: true,
		        attributeFilter: ["style"]
		      }
		    }), resize({
		      target: ({
		        $el
		      }) => [$el, ...children($el)]
		    })],
		    update: {
		      read() {
		        const rows = getRows(this.$el.children);
		        return {
		          rows,
		          columns: getColumns(rows)
		        };
		      },
		      write({
		        columns,
		        rows
		      }) {
		        for (const row of rows) {
		          for (const column of row) {
		            toggleClass(column, this.margin, rows[0] !== row);
		            toggleClass(column, this.firstColumn, columns[0].includes(column));
		          }
		        }
		      },
		      events: ["resize"]
		    }
		  };
		  function getRows(items) {
		    return sortBy(items, "top", "bottom");
		  }
		  function getColumns(rows) {
		    const columns = [];
		    for (const row of rows) {
		      const sorted = sortBy(row, "left", "right");
		      for (let j = 0; j < sorted.length; j++) {
		        columns[j] = columns[j] ? columns[j].concat(sorted[j]) : sorted[j];
		      }
		    }
		    return isRtl ? columns.reverse() : columns;
		  }
		  function sortBy(items, startProp, endProp) {
		    const sorted = [[]];
		    for (const el of items) {
		      if (!isVisible(el)) {
		        continue;
		      }
		      let dim = getOffset(el);
		      for (let i = sorted.length - 1; i >= 0; i--) {
		        const current = sorted[i];
		        if (!current[0]) {
		          current.push(el);
		          break;
		        }
		        let startDim;
		        if (current[0].offsetParent === el.offsetParent) {
		          startDim = getOffset(current[0]);
		        } else {
		          dim = getOffset(el, true);
		          startDim = getOffset(current[0], true);
		        }
		        if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
		          sorted.push([el]);
		          break;
		        }
		        if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
		          current.push(el);
		          break;
		        }
		        if (i === 0) {
		          sorted.unshift([el]);
		          break;
		        }
		      }
		    }
		    return sorted;
		  }
		  function getOffset(element, offset = false) {
		    let {
		      offsetTop,
		      offsetLeft,
		      offsetHeight,
		      offsetWidth
		    } = element;
		    if (offset) {
		      [offsetTop, offsetLeft] = offsetPosition(element);
		    }
		    return {
		      top: offsetTop,
		      left: offsetLeft,
		      bottom: offsetTop + offsetHeight,
		      right: offsetLeft + offsetWidth
		    };
		  }
		  var grid = {
		    extends: Margin,
		    mixins: [Class],
		    name: "grid",
		    props: {
		      masonry: Boolean,
		      parallax: Number
		    },
		    data: {
		      margin: "uk-grid-margin",
		      clsStack: "uk-grid-stack",
		      masonry: false,
		      parallax: 0
		    },
		    connected() {
		      this.masonry && addClass(this.$el, "uk-flex-top uk-flex-wrap-top");
		    },
		    observe: scroll$1({
		      filter: ({
		        parallax
		      }) => parallax
		    }),
		    update: [{
		      write({
		        columns
		      }) {
		        toggleClass(this.$el, this.clsStack, columns.length < 2);
		      },
		      events: ["resize"]
		    }, {
		      read(data) {
		        let {
		          columns,
		          rows
		        } = data;
		        if (!columns.length || !this.masonry && !this.parallax || positionedAbsolute(this.$el)) {
		          data.translates = false;
		          return false;
		        }
		        let translates = false;
		        const nodes = children(this.$el);
		        const columnHeights = columns.map(column => sumBy(column, "offsetHeight"));
		        const margin = getMarginTop(nodes, this.margin) * (rows.length - 1);
		        const elHeight = Math.max(...columnHeights) + margin;
		        if (this.masonry) {
		          columns = columns.map(column => sortBy$1(column, "offsetTop"));
		          translates = getTranslates(rows, columns);
		        }
		        let padding = Math.abs(this.parallax);
		        if (padding) {
		          padding = columnHeights.reduce((newPadding, hgt, i) => Math.max(newPadding, hgt + margin + (i % 2 ? padding : padding / 8) - elHeight), 0);
		        }
		        return {
		          padding,
		          columns,
		          translates,
		          height: translates ? elHeight : ""
		        };
		      },
		      write({
		        height,
		        padding
		      }) {
		        css(this.$el, "paddingBottom", padding || "");
		        height !== false && css(this.$el, "height", height);
		      },
		      events: ["resize"]
		    }, {
		      read() {
		        if (this.parallax && positionedAbsolute(this.$el)) {
		          return false;
		        }
		        return {
		          scrolled: this.parallax ? scrolledOver(this.$el) * Math.abs(this.parallax) : false
		        };
		      },
		      write({
		        columns,
		        scrolled,
		        translates
		      }) {
		        if (scrolled === false && !translates) {
		          return;
		        }
		        columns.forEach((column, i) => column.forEach((el, j) => css(el, "transform", !scrolled && !translates ? "" : `translateY(${(translates && -translates[i][j]) + (scrolled ? i % 2 ? scrolled : scrolled / 8 : 0)}px)`)));
		      },
		      events: ["scroll", "resize"]
		    }]
		  };
		  function positionedAbsolute(el) {
		    return children(el).some(el2 => css(el2, "position") === "absolute");
		  }
		  function getTranslates(rows, columns) {
		    const rowHeights = rows.map(row => Math.max(...row.map(el => el.offsetHeight)));
		    return columns.map(elements => {
		      let prev = 0;
		      return elements.map((element, row) => prev += row ? rowHeights[row - 1] - elements[row - 1].offsetHeight : 0);
		    });
		  }
		  function getMarginTop(nodes, cls) {
		    const [node] = nodes.filter(el => hasClass(el, cls));
		    return toFloat(node ? css(node, "marginTop") : css(nodes[0], "paddingLeft"));
		  }
		  var heightMatch = {
		    args: "target",
		    props: {
		      target: String,
		      row: Boolean
		    },
		    data: {
		      target: "> *",
		      row: true
		    },
		    computed: {
		      elements({
		        target
		      }, $el) {
		        return $$(target, $el);
		      }
		    },
		    observe: resize({
		      target: ({
		        $el,
		        elements
		      }) => [$el, ...elements]
		    }),
		    update: {
		      read() {
		        return {
		          rows: (this.row ? getRows(this.elements) : [this.elements]).map(match$1)
		        };
		      },
		      write({
		        rows
		      }) {
		        for (const {
		          heights,
		          elements
		        } of rows) {
		          elements.forEach((el, i) => css(el, "minHeight", heights[i]));
		        }
		      },
		      events: ["resize"]
		    }
		  };
		  function match$1(elements) {
		    if (elements.length < 2) {
		      return {
		        heights: [""],
		        elements
		      };
		    }
		    let heights = elements.map(getHeight);
		    const max = Math.max(...heights);
		    return {
		      heights: elements.map((el, i) => heights[i].toFixed(2) === max.toFixed(2) ? "" : max),
		      elements
		    };
		  }
		  function getHeight(element) {
		    const style = pick(element.style, ["display", "minHeight"]);
		    if (!isVisible(element)) {
		      css(element, "display", "block", "important");
		    }
		    css(element, "minHeight", "");
		    const height = dimensions$1(element).height - boxModelAdjust(element, "height", "content-box");
		    css(element, style);
		    return height;
		  }
		  var heightViewport = {
		    props: {
		      expand: Boolean,
		      offsetTop: Boolean,
		      offsetBottom: Boolean,
		      minHeight: Number
		    },
		    data: {
		      expand: false,
		      offsetTop: false,
		      offsetBottom: false,
		      minHeight: 0
		    },
		    // check for offsetTop change
		    observe: resize({
		      target: ({
		        $el
		      }) => [$el, ...scrollParents($el)]
		    }),
		    update: {
		      read() {
		        if (!isVisible(this.$el)) {
		          return false;
		        }
		        let minHeight = "";
		        const box = boxModelAdjust(this.$el, "height", "content-box");
		        const {
		          body,
		          scrollingElement
		        } = document;
		        const scrollElement = scrollParent(this.$el);
		        const {
		          height: viewportHeight
		        } = offsetViewport(scrollElement === body ? scrollingElement : scrollElement);
		        if (this.expand) {
		          minHeight = `${viewportHeight - (dimensions$1(scrollElement).height - dimensions$1(this.$el).height) - box}px`;
		        } else {
		          const isScrollingElement = scrollingElement === scrollElement || body === scrollElement;
		          minHeight = `calc(${isScrollingElement ? "100vh" : `${viewportHeight}px`}`;
		          if (this.offsetTop) {
		            if (isScrollingElement) {
		              const top = offsetPosition(this.$el)[0] - offsetPosition(scrollElement)[0];
		              minHeight += top > 0 && top < viewportHeight / 2 ? ` - ${top}px` : "";
		            } else {
		              minHeight += ` - ${css(scrollElement, "paddingTop")}`;
		            }
		          }
		          if (this.offsetBottom === true) {
		            minHeight += ` - ${dimensions$1(this.$el.nextElementSibling).height}px`;
		          } else if (isNumeric(this.offsetBottom)) {
		            minHeight += ` - ${this.offsetBottom}vh`;
		          } else if (this.offsetBottom && endsWith(this.offsetBottom, "px")) {
		            minHeight += ` - ${toFloat(this.offsetBottom)}px`;
		          } else if (isString(this.offsetBottom)) {
		            minHeight += ` - ${dimensions$1(query(this.offsetBottom, this.$el)).height}px`;
		          }
		          minHeight += `${box ? ` - ${box}px` : ""})`;
		        }
		        return {
		          minHeight
		        };
		      },
		      write({
		        minHeight
		      }) {
		        css(this.$el, "minHeight", `max(${this.minHeight || 0}px, ${minHeight})`);
		      },
		      events: ["resize"]
		    }
		  };
		  var Svg = {
		    args: "src",
		    props: {
		      width: Number,
		      height: Number,
		      ratio: Number
		    },
		    data: {
		      ratio: 1
		    },
		    connected() {
		      this.svg = this.getSvg().then(el => {
		        if (!this._connected) {
		          return;
		        }
		        const svg = insertSVG(el, this.$el);
		        if (this.svgEl && svg !== this.svgEl) {
		          remove$1(this.svgEl);
		        }
		        applyWidthAndHeight.call(this, svg, el);
		        return this.svgEl = svg;
		      }, noop);
		    },
		    disconnected() {
		      this.svg.then(svg => {
		        if (this._connected) {
		          return;
		        }
		        if (isVoidElement(this.$el)) {
		          this.$el.hidden = false;
		        }
		        remove$1(svg);
		        this.svgEl = null;
		      });
		      this.svg = null;
		    },
		    methods: {
		      async getSvg() {}
		    }
		  };
		  function insertSVG(el, root) {
		    if (isVoidElement(root) || isTag(root, "canvas")) {
		      root.hidden = true;
		      const next = root.nextElementSibling;
		      return equals(el, next) ? next : after(root, el);
		    }
		    const last = root.lastElementChild;
		    return equals(el, last) ? last : append(root, el);
		  }
		  function equals(el, other) {
		    return isTag(el, "svg") && isTag(other, "svg") && el.innerHTML === other.innerHTML;
		  }
		  function applyWidthAndHeight(el, ref) {
		    const props = ["width", "height"];
		    let dimensions = props.map(prop => this[prop]);
		    if (!dimensions.some(val => val)) {
		      dimensions = props.map(prop => attr(ref, prop));
		    }
		    const viewBox = attr(ref, "viewBox");
		    if (viewBox && !dimensions.some(val => val)) {
		      dimensions = viewBox.split(" ").slice(2);
		    }
		    dimensions.forEach((val, i) => attr(el, props[i], toFloat(val) * this.ratio || null));
		  }
		  var I18n = {
		    props: {
		      i18n: Object
		    },
		    data: {
		      i18n: null
		    },
		    methods: {
		      t(key, ...params) {
		        var _a, _b, _c;
		        let i = 0;
		        return ((_c = ((_a = this.i18n) == null ? void 0 : _a[key]) || ((_b = this.$options.i18n) == null ? void 0 : _b[key])) == null ? void 0 : _c.replace(/%s/g, () => params[i++] || "")) || "";
		      }
		    }
		  };
		  var closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";
		  var closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";
		  var dropParentIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";
		  var marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"/><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"/></svg>";
		  var navParentIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";
		  var navParentIconLarge = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 4 7 10 13 4\"/></svg>";
		  var navbarParentIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";
		  var navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><style>.uk-navbar-toggle-animate svg&gt;[class*=&quot;line-&quot;]{transition:0.2s ease-in-out;transition-property:transform, opacity;transform-origin:center;opacity:1}.uk-navbar-toggle svg&gt;.line-3{opacity:0}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-3{opacity:1}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-2{transform:rotate(45deg)}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-3{transform:rotate(-45deg)}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-1,.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-4{opacity:0}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-1{transform:translateY(6px) scaleX(0)}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-4{transform:translateY(-6px) scaleX(0)}</style><rect class=\"line-1\" y=\"3\" width=\"20\" height=\"2\"/><rect class=\"line-2\" y=\"9\" width=\"20\" height=\"2\"/><rect class=\"line-3\" y=\"9\" width=\"20\" height=\"2\"/><rect class=\"line-4\" y=\"15\" width=\"20\" height=\"2\"/></svg>";
		  var overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"/><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"/></svg>";
		  var paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";
		  var paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";
		  var searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";
		  var searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";
		  var searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";
		  var slidenavNext = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1\"/></svg>";
		  var slidenavNextLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5\"/></svg>";
		  var slidenavPrevious = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23\"/></svg>";
		  var slidenavPreviousLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547\"/></svg>";
		  var spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";
		  var totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9\"/></svg>";
		  const icons = {
		    spinner,
		    totop,
		    marker,
		    "close-icon": closeIcon,
		    "close-large": closeLarge,
		    "drop-parent-icon": dropParentIcon,
		    "nav-parent-icon": navParentIcon,
		    "nav-parent-icon-large": navParentIconLarge,
		    "navbar-parent-icon": navbarParentIcon,
		    "navbar-toggle-icon": navbarToggleIcon,
		    "overlay-icon": overlayIcon,
		    "pagination-next": paginationNext,
		    "pagination-previous": paginationPrevious,
		    "search-icon": searchIcon,
		    "search-large": searchLarge,
		    "search-navbar": searchNavbar,
		    "slidenav-next": slidenavNext,
		    "slidenav-next-large": slidenavNextLarge,
		    "slidenav-previous": slidenavPrevious,
		    "slidenav-previous-large": slidenavPreviousLarge
		  };
		  const Icon = {
		    install: install$3,
		    mixins: [Svg],
		    args: "icon",
		    props: {
		      icon: String
		    },
		    isIcon: true,
		    beforeConnect() {
		      addClass(this.$el, "uk-icon");
		    },
		    methods: {
		      async getSvg() {
		        const icon = getIcon(this.icon);
		        if (!icon) {
		          throw "Icon not found.";
		        }
		        return icon;
		      }
		    }
		  };
		  const IconComponent = {
		    args: false,
		    extends: Icon,
		    data: vm => ({
		      icon: hyphenate(vm.constructor.options.name)
		    }),
		    beforeConnect() {
		      addClass(this.$el, this.$options.id);
		    }
		  };
		  const NavParentIcon = {
		    extends: IconComponent,
		    beforeConnect() {
		      const icon = this.$props.icon;
		      this.icon = closest(this.$el, ".uk-nav-primary") ? `${icon}-large` : icon;
		    }
		  };
		  const Search = {
		    extends: IconComponent,
		    mixins: [I18n],
		    i18n: {
		      toggle: "Open Search",
		      submit: "Submit Search"
		    },
		    beforeConnect() {
		      this.icon = hasClass(this.$el, "uk-search-icon") && parents(this.$el, ".uk-search-large").length ? "search-large" : parents(this.$el, ".uk-search-navbar").length ? "search-navbar" : this.$props.icon;
		      if (hasAttr(this.$el, "aria-label")) {
		        return;
		      }
		      if (hasClass(this.$el, "uk-search-toggle") || hasClass(this.$el, "uk-navbar-toggle")) {
		        const label = this.t("toggle");
		        attr(this.$el, "aria-label", label);
		      } else {
		        const button = closest(this.$el, "a,button");
		        if (button) {
		          const label = this.t("submit");
		          attr(button, "aria-label", label);
		        }
		      }
		    }
		  };
		  const Spinner = {
		    extends: IconComponent,
		    beforeConnect() {
		      attr(this.$el, "role", "status");
		    },
		    methods: {
		      async getSvg() {
		        const icon = await Icon.methods.getSvg.call(this);
		        if (this.ratio !== 1) {
		          css($("circle", icon), "strokeWidth", 1 / this.ratio);
		        }
		        return icon;
		      }
		    }
		  };
		  const ButtonComponent = {
		    extends: IconComponent,
		    mixins: [I18n],
		    beforeConnect() {
		      const button = closest(this.$el, "a,button");
		      attr(button, "role", this.role !== null && isTag(button, "a") ? "button" : this.role);
		      const label = this.t("label");
		      if (label && !hasAttr(button, "aria-label")) {
		        attr(button, "aria-label", label);
		      }
		    }
		  };
		  const Slidenav = {
		    extends: ButtonComponent,
		    beforeConnect() {
		      addClass(this.$el, "uk-slidenav");
		      const icon = this.$props.icon;
		      this.icon = hasClass(this.$el, "uk-slidenav-large") ? `${icon}-large` : icon;
		    }
		  };
		  const NavbarToggleIcon = {
		    extends: ButtonComponent,
		    i18n: {
		      label: "Open menu"
		    }
		  };
		  const Close = {
		    extends: ButtonComponent,
		    i18n: {
		      label: "Close"
		    },
		    beforeConnect() {
		      this.icon = `close-${hasClass(this.$el, "uk-close-large") ? "large" : "icon"}`;
		    }
		  };
		  const Marker = {
		    extends: ButtonComponent,
		    i18n: {
		      label: "Open"
		    }
		  };
		  const Totop = {
		    extends: ButtonComponent,
		    i18n: {
		      label: "Back to top"
		    }
		  };
		  const PaginationNext = {
		    extends: ButtonComponent,
		    i18n: {
		      label: "Next page"
		    },
		    data: {
		      role: null
		    }
		  };
		  const PaginationPrevious = {
		    extends: ButtonComponent,
		    i18n: {
		      label: "Previous page"
		    },
		    data: {
		      role: null
		    }
		  };
		  const parsed = {};
		  function install$3(UIkit) {
		    UIkit.icon.add = (name, svg) => {
		      const added = isString(name) ? {
		        [name]: svg
		      } : name;
		      each(added, (svg2, name2) => {
		        icons[name2] = svg2;
		        delete parsed[name2];
		      });
		      if (UIkit._initialized) {
		        apply(document.body, el => each(UIkit.getComponents(el), cmp => {
		          cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
		        }));
		      }
		    };
		  }
		  function getIcon(icon) {
		    if (!icons[icon]) {
		      return null;
		    }
		    if (!parsed[icon]) {
		      parsed[icon] = $((icons[applyRtl(icon)] || icons[icon]).trim());
		    }
		    return parsed[icon].cloneNode(true);
		  }
		  function applyRtl(icon) {
		    return isRtl ? swap(swap(icon, "left", "right"), "previous", "next") : icon;
		  }
		  const nativeLazyLoad = inBrowser && "loading" in HTMLImageElement.prototype;
		  var img = {
		    args: "dataSrc",
		    props: {
		      dataSrc: String,
		      sources: String,
		      margin: String,
		      target: String,
		      loading: String
		    },
		    data: {
		      dataSrc: "",
		      sources: false,
		      margin: "50%",
		      target: false,
		      loading: "lazy"
		    },
		    connected() {
		      if (this.loading !== "lazy") {
		        this.load();
		        return;
		      }
		      if (nativeLazyLoad && isImg(this.$el)) {
		        this.$el.loading = "lazy";
		        setSrcAttrs(this.$el);
		      }
		      ensureSrcAttribute(this.$el);
		    },
		    disconnected() {
		      if (this.img) {
		        this.img.onload = "";
		      }
		      delete this.img;
		    },
		    observe: intersection({
		      target: ({
		        $el,
		        $props
		      }) => [$el, ...queryAll($props.target, $el)],
		      handler(entries, observer) {
		        this.load();
		        observer.disconnect();
		      },
		      options: ({
		        margin
		      }) => ({
		        rootMargin: margin
		      }),
		      filter: ({
		        loading
		      }) => loading === "lazy"
		    }),
		    methods: {
		      load() {
		        if (this.img) {
		          return this.img;
		        }
		        const image = isImg(this.$el) ? this.$el : getImageFromElement(this.$el, this.dataSrc, this.sources);
		        removeAttr(image, "loading");
		        setSrcAttrs(this.$el, image.currentSrc);
		        return this.img = image;
		      }
		    }
		  };
		  function setSrcAttrs(el, src) {
		    if (isImg(el)) {
		      const parentNode = parent(el);
		      const elements = isTag(parentNode, "picture") ? children(parentNode) : [el];
		      elements.forEach(el2 => setSourceProps(el2, el2));
		    } else if (src) {
		      const change = !includes(el.style.backgroundImage, src);
		      if (change) {
		        css(el, "backgroundImage", `url(${escape(src)})`);
		        trigger(el, createEvent("load", false));
		      }
		    }
		  }
		  const srcProps = ["data-src", "data-srcset", "sizes"];
		  function setSourceProps(sourceEl, targetEl) {
		    for (const prop of srcProps) {
		      const value = data(sourceEl, prop);
		      if (value) {
		        attr(targetEl, prop.replace(/^(data-)+/, ""), value);
		      }
		    }
		  }
		  function getImageFromElement(el, src, sources) {
		    const img = new Image();
		    wrapInPicture(img, sources);
		    setSourceProps(el, img);
		    img.onload = () => {
		      setSrcAttrs(el, img.currentSrc);
		    };
		    attr(img, "src", src);
		    return img;
		  }
		  function wrapInPicture(img, sources) {
		    sources = parseSources(sources);
		    if (sources.length) {
		      const picture = fragment("<picture>");
		      for (const attrs of sources) {
		        const source = fragment("<source>");
		        attr(source, attrs);
		        append(picture, source);
		      }
		      append(picture, img);
		    }
		  }
		  function parseSources(sources) {
		    if (!sources) {
		      return [];
		    }
		    if (startsWith(sources, "[")) {
		      try {
		        sources = JSON.parse(sources);
		      } catch (e) {
		        sources = [];
		      }
		    } else {
		      sources = parseOptions(sources);
		    }
		    if (!isArray(sources)) {
		      sources = [sources];
		    }
		    return sources.filter(source => !isEmpty(source));
		  }
		  function ensureSrcAttribute(el) {
		    if (isImg(el) && !hasAttr(el, "src")) {
		      attr(el, "src", 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
		    }
		  }
		  function isImg(el) {
		    return isTag(el, "img");
		  }
		  var Media = {
		    props: {
		      media: Boolean
		    },
		    data: {
		      media: false
		    },
		    connected() {
		      const media = toMedia(this.media, this.$el);
		      this.matchMedia = true;
		      if (media) {
		        this.mediaObj = window.matchMedia(media);
		        const handler = () => {
		          this.matchMedia = this.mediaObj.matches;
		          trigger(this.$el, createEvent("mediachange", false, true, [this.mediaObj]));
		        };
		        this.offMediaObj = on(this.mediaObj, "change", () => {
		          handler();
		          this.$emit("resize");
		        });
		        handler();
		      }
		    },
		    disconnected() {
		      var _a;
		      (_a = this.offMediaObj) == null ? void 0 : _a.call(this);
		    }
		  };
		  function toMedia(value, element) {
		    if (isString(value)) {
		      if (startsWith(value, "@")) {
		        value = toFloat(css(element, `--uk-breakpoint-${value.substr(1)}`));
		      } else if (isNaN(value)) {
		        return value;
		      }
		    }
		    return value && isNumeric(value) ? `(min-width: ${value}px)` : "";
		  }
		  var leader = {
		    mixins: [Class, Media],
		    props: {
		      fill: String
		    },
		    data: {
		      fill: "",
		      clsWrapper: "uk-leader-fill",
		      clsHide: "uk-leader-hide",
		      attrFill: "data-fill"
		    },
		    computed: {
		      fill({
		        fill
		      }) {
		        return fill || css(this.$el, "--uk-leader-fill-content");
		      }
		    },
		    connected() {
		      [this.wrapper] = wrapInner(this.$el, `<span class="${this.clsWrapper}">`);
		    },
		    disconnected() {
		      unwrap(this.wrapper.childNodes);
		    },
		    observe: resize(),
		    update: {
		      read() {
		        const width = Math.trunc(this.$el.offsetWidth / 2);
		        return {
		          width,
		          fill: this.fill,
		          hide: !this.matchMedia
		        };
		      },
		      write({
		        width,
		        fill,
		        hide
		      }) {
		        toggleClass(this.wrapper, this.clsHide, hide);
		        attr(this.wrapper, this.attrFill, new Array(width).join(fill));
		      },
		      events: ["resize"]
		    }
		  };
		  const active = [];
		  var Modal = {
		    mixins: [Class, Container, Togglable],
		    props: {
		      selPanel: String,
		      selClose: String,
		      escClose: Boolean,
		      bgClose: Boolean,
		      stack: Boolean,
		      role: String
		    },
		    data: {
		      cls: "uk-open",
		      escClose: true,
		      bgClose: true,
		      overlay: true,
		      stack: false,
		      role: "dialog"
		    },
		    computed: {
		      panel({
		        selPanel
		      }, $el) {
		        return $(selPanel, $el);
		      },
		      transitionElement() {
		        return this.panel;
		      },
		      bgClose({
		        bgClose
		      }) {
		        return bgClose && this.panel;
		      }
		    },
		    connected() {
		      attr(this.panel || this.$el, "role", this.role);
		      if (this.overlay) {
		        attr(this.panel || this.$el, "aria-modal", true);
		      }
		    },
		    beforeDisconnect() {
		      if (includes(active, this)) {
		        this.toggleElement(this.$el, false, false);
		      }
		    },
		    events: [{
		      name: "click",
		      delegate() {
		        return `${this.selClose},a[href*="#"]`;
		      },
		      handler(e) {
		        const {
		          current,
		          defaultPrevented
		        } = e;
		        const {
		          hash
		        } = current;
		        if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, this.$el) && $(hash, document.body)) {
		          this.hide();
		        } else if (matches(current, this.selClose)) {
		          e.preventDefault();
		          this.hide();
		        }
		      }
		    }, {
		      name: "toggle",
		      self: true,
		      handler(e) {
		        if (e.defaultPrevented) {
		          return;
		        }
		        e.preventDefault();
		        if (this.isToggled() === includes(active, this)) {
		          this.toggle();
		        }
		      }
		    }, {
		      name: "beforeshow",
		      self: true,
		      handler(e) {
		        if (includes(active, this)) {
		          return false;
		        }
		        if (!this.stack && active.length) {
		          Promise.all(active.map(modal => modal.hide())).then(this.show);
		          e.preventDefault();
		        } else {
		          active.push(this);
		        }
		      }
		    }, {
		      name: "show",
		      self: true,
		      handler() {
		        if (this.stack) {
		          css(this.$el, "zIndex", toFloat(css(this.$el, "zIndex")) + active.length);
		        }
		        const handlers = [this.overlay && preventBackgroundFocus(this), this.overlay && preventBackgroundScroll(this.$el), this.bgClose && listenForBackgroundClose(this), this.escClose && listenForEscClose(this)];
		        once(this.$el, "hidden", () => handlers.forEach(handler => handler && handler()), {
		          self: true
		        });
		        addClass(document.documentElement, this.clsPage);
		      }
		    }, {
		      name: "shown",
		      self: true,
		      handler() {
		        if (!isFocusable(this.$el)) {
		          attr(this.$el, "tabindex", "-1");
		        }
		        if (!matches(this.$el, ":focus-within")) {
		          this.$el.focus();
		        }
		      }
		    }, {
		      name: "hidden",
		      self: true,
		      handler() {
		        if (includes(active, this)) {
		          active.splice(active.indexOf(this), 1);
		        }
		        css(this.$el, "zIndex", "");
		        if (!active.some(modal => modal.clsPage === this.clsPage)) {
		          removeClass(document.documentElement, this.clsPage);
		        }
		      }
		    }],
		    methods: {
		      toggle() {
		        return this.isToggled() ? this.hide() : this.show();
		      },
		      show() {
		        if (this.container && parent(this.$el) !== this.container) {
		          append(this.container, this.$el);
		          return new Promise(resolve => requestAnimationFrame(() => this.show().then(resolve)));
		        }
		        return this.toggleElement(this.$el, true, animate);
		      },
		      hide() {
		        return this.toggleElement(this.$el, false, animate);
		      }
		    }
		  };
		  function animate(el, show, {
		    transitionElement,
		    _toggle
		  }) {
		    return new Promise((resolve, reject) => once(el, "show hide", () => {
		      var _a;
		      (_a = el._reject) == null ? void 0 : _a.call(el);
		      el._reject = reject;
		      _toggle(el, show);
		      const off = once(transitionElement, "transitionstart", () => {
		        once(transitionElement, "transitionend transitioncancel", resolve, {
		          self: true
		        });
		        clearTimeout(timer);
		      }, {
		        self: true
		      });
		      const timer = setTimeout(() => {
		        off();
		        resolve();
		      }, toMs(css(transitionElement, "transitionDuration")));
		    })).then(() => delete el._reject);
		  }
		  function toMs(time) {
		    return time ? endsWith(time, "ms") ? toFloat(time) : toFloat(time) * 1e3 : 0;
		  }
		  function preventBackgroundFocus(modal) {
		    return on(document, "focusin", e => {
		      if (last(active) === modal && !within(e.target, modal.$el)) {
		        modal.$el.focus();
		      }
		    });
		  }
		  function listenForBackgroundClose(modal) {
		    return on(document, pointerDown$1, ({
		      target
		    }) => {
		      if (last(active) !== modal || modal.overlay && !within(target, modal.$el) || within(target, modal.panel)) {
		        return;
		      }
		      once(document, `${pointerUp$1} ${pointerCancel} scroll`, ({
		        defaultPrevented,
		        type,
		        target: newTarget
		      }) => {
		        if (!defaultPrevented && type === pointerUp$1 && target === newTarget) {
		          modal.hide();
		        }
		      }, true);
		    });
		  }
		  function listenForEscClose(modal) {
		    return on(document, "keydown", e => {
		      if (e.keyCode === 27 && last(active) === modal) {
		        modal.hide();
		      }
		    });
		  }
		  var modal = {
		    install: install$2,
		    mixins: [Modal],
		    data: {
		      clsPage: "uk-modal-page",
		      selPanel: ".uk-modal-dialog",
		      selClose: ".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"
		    },
		    events: [{
		      name: "show",
		      self: true,
		      handler() {
		        if (hasClass(this.panel, "uk-margin-auto-vertical")) {
		          addClass(this.$el, "uk-flex");
		        } else {
		          css(this.$el, "display", "block");
		        }
		        height(this.$el);
		      }
		    }, {
		      name: "hidden",
		      self: true,
		      handler() {
		        css(this.$el, "display", "");
		        removeClass(this.$el, "uk-flex");
		      }
		    }]
		  };
		  function install$2({
		    modal
		  }) {
		    modal.dialog = function (content, options) {
		      const dialog = modal(`<div class="uk-modal"> <div class="uk-modal-dialog">${content}</div> </div>`, {
		        stack: true,
		        role: "alertdialog",
		        ...options
		      });
		      dialog.show();
		      on(dialog.$el, "hidden", async () => {
		        await Promise.resolve();
		        dialog.$destroy(true);
		      }, {
		        self: true
		      });
		      return dialog;
		    };
		    modal.alert = function (message, options) {
		      return openDialog(({
		        i18n
		      }) => `<div class="uk-modal-body">${isString(message) ? message : html(message)}</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>${i18n.ok}</button> </div>`, options);
		    };
		    modal.confirm = function (message, options) {
		      return openDialog(({
		        i18n
		      }) => `<form> <div class="uk-modal-body">${isString(message) ? message : html(message)}</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">${i18n.cancel}</button> <button class="uk-button uk-button-primary" autofocus>${i18n.ok}</button> </div> </form>`, options, () => Promise.reject());
		    };
		    modal.prompt = function (message, value, options) {
		      const promise = openDialog(({
		        i18n
		      }) => `<form class="uk-form-stacked"> <div class="uk-modal-body"> <label>${isString(message) ? message : html(message)}</label> <input class="uk-input" value="${value || ""}" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">${i18n.cancel}</button> <button class="uk-button uk-button-primary">${i18n.ok}</button> </div> </form>`, options, () => null, () => input.value);
		      const {
		        $el
		      } = promise.dialog;
		      const input = $("input", $el);
		      on($el, "show", () => input.select());
		      return promise;
		    };
		    modal.i18n = {
		      ok: "Ok",
		      cancel: "Cancel"
		    };
		    function openDialog(tmpl, options, hideFn = noop, submitFn = noop) {
		      options = {
		        bgClose: false,
		        escClose: true,
		        ...options,
		        i18n: {
		          ...modal.i18n,
		          ...(options == null ? void 0 : options.i18n)
		        }
		      };
		      const dialog = modal.dialog(tmpl(options), options);
		      return assign(new Promise(resolve => {
		        const off = on(dialog.$el, "hide", () => resolve(hideFn()));
		        on(dialog.$el, "submit", "form", e => {
		          e.preventDefault();
		          resolve(submitFn(dialog));
		          off();
		          dialog.hide();
		        });
		      }), {
		        dialog
		      });
		    }
		  }
		  var nav = {
		    extends: Accordion,
		    data: {
		      targets: "> .uk-parent",
		      toggle: "> a",
		      content: "> ul"
		    }
		  };
		  var navbar = {
		    extends: Dropnav,
		    data: {
		      clsDrop: "uk-navbar-dropdown",
		      selNavItem: ".uk-navbar-nav > li > a,a.uk-navbar-item,button.uk-navbar-item,.uk-navbar-item a,.uk-navbar-item button,.uk-navbar-toggle"
		      // Simplify with :where() selector once browser target is Safari 14+
		    },

		    watch: {
		      items() {
		        const justify = hasClass(this.$el, "uk-navbar-justify");
		        for (const container of $$(".uk-navbar-nav, .uk-navbar-left, .uk-navbar-right", this.$el)) {
		          css(container, "flexGrow", justify ? $$(".uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle", container).length : "");
		        }
		      }
		    }
		  };
		  var offcanvas = {
		    mixins: [Modal],
		    args: "mode",
		    props: {
		      mode: String,
		      flip: Boolean,
		      overlay: Boolean,
		      swiping: Boolean
		    },
		    data: {
		      mode: "slide",
		      flip: false,
		      overlay: false,
		      clsPage: "uk-offcanvas-page",
		      clsContainer: "uk-offcanvas-container",
		      selPanel: ".uk-offcanvas-bar",
		      clsFlip: "uk-offcanvas-flip",
		      clsContainerAnimation: "uk-offcanvas-container-animation",
		      clsSidebarAnimation: "uk-offcanvas-bar-animation",
		      clsMode: "uk-offcanvas",
		      clsOverlay: "uk-offcanvas-overlay",
		      selClose: ".uk-offcanvas-close",
		      container: false,
		      swiping: true
		    },
		    computed: {
		      clsFlip({
		        flip,
		        clsFlip
		      }) {
		        return flip ? clsFlip : "";
		      },
		      clsOverlay({
		        overlay,
		        clsOverlay
		      }) {
		        return overlay ? clsOverlay : "";
		      },
		      clsMode({
		        mode,
		        clsMode
		      }) {
		        return `${clsMode}-${mode}`;
		      },
		      clsSidebarAnimation({
		        mode,
		        clsSidebarAnimation
		      }) {
		        return mode === "none" || mode === "reveal" ? "" : clsSidebarAnimation;
		      },
		      clsContainerAnimation({
		        mode,
		        clsContainerAnimation
		      }) {
		        return mode !== "push" && mode !== "reveal" ? "" : clsContainerAnimation;
		      },
		      transitionElement({
		        mode
		      }) {
		        return mode === "reveal" ? parent(this.panel) : this.panel;
		      }
		    },
		    observe: swipe({
		      filter: ({
		        swiping
		      }) => swiping
		    }),
		    update: {
		      read() {
		        if (this.isToggled() && !isVisible(this.$el)) {
		          this.hide();
		        }
		      },
		      events: ["resize"]
		    },
		    events: [{
		      name: "touchmove",
		      self: true,
		      passive: false,
		      filter() {
		        return this.overlay;
		      },
		      handler(e) {
		        e.cancelable && e.preventDefault();
		      }
		    }, {
		      name: "show",
		      self: true,
		      handler() {
		        if (this.mode === "reveal" && !hasClass(parent(this.panel), this.clsMode)) {
		          wrapAll(this.panel, "<div>");
		          addClass(parent(this.panel), this.clsMode);
		        }
		        const {
		          body,
		          scrollingElement
		        } = document;
		        addClass(body, this.clsContainer, this.clsFlip);
		        css(body, "touch-action", "pan-y pinch-zoom");
		        css(this.$el, "display", "block");
		        css(this.panel, "maxWidth", scrollingElement.clientWidth);
		        addClass(this.$el, this.clsOverlay);
		        addClass(this.panel, this.clsSidebarAnimation, this.mode === "reveal" ? "" : this.clsMode);
		        height(body);
		        addClass(body, this.clsContainerAnimation);
		        this.clsContainerAnimation && suppressUserScale();
		      }
		    }, {
		      name: "hide",
		      self: true,
		      handler() {
		        removeClass(document.body, this.clsContainerAnimation);
		        css(document.body, "touch-action", "");
		      }
		    }, {
		      name: "hidden",
		      self: true,
		      handler() {
		        this.clsContainerAnimation && resumeUserScale();
		        if (this.mode === "reveal") {
		          unwrap(this.panel);
		        }
		        removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
		        removeClass(this.$el, this.clsOverlay);
		        css(this.$el, "display", "");
		        css(this.panel, "maxWidth", "");
		        removeClass(document.body, this.clsContainer, this.clsFlip);
		      }
		    }, {
		      name: "swipeLeft swipeRight",
		      handler(e) {
		        if (this.isToggled() && endsWith(e.type, "Left") ^ this.flip) {
		          this.hide();
		        }
		      }
		    }]
		  };
		  function suppressUserScale() {
		    getViewport().content += ",user-scalable=0";
		  }
		  function resumeUserScale() {
		    const viewport = getViewport();
		    viewport.content = viewport.content.replace(/,user-scalable=0$/, "");
		  }
		  function getViewport() {
		    return $('meta[name="viewport"]', document.head) || append(document.head, '<meta name="viewport">');
		  }
		  var overflowAuto = {
		    mixins: [Class],
		    props: {
		      selContainer: String,
		      selContent: String,
		      minHeight: Number
		    },
		    data: {
		      selContainer: ".uk-modal",
		      selContent: ".uk-modal-dialog",
		      minHeight: 150
		    },
		    computed: {
		      container({
		        selContainer
		      }, $el) {
		        return closest($el, selContainer);
		      },
		      content({
		        selContent
		      }, $el) {
		        return closest($el, selContent);
		      }
		    },
		    observe: resize({
		      target: ({
		        container,
		        content
		      }) => [container, content]
		    }),
		    update: {
		      read() {
		        if (!this.content || !this.container || !isVisible(this.$el)) {
		          return false;
		        }
		        return {
		          max: Math.max(this.minHeight, height(this.container) - (dimensions$1(this.content).height - height(this.$el)))
		        };
		      },
		      write({
		        max
		      }) {
		        css(this.$el, {
		          minHeight: this.minHeight,
		          maxHeight: max
		        });
		      },
		      events: ["resize"]
		    }
		  };
		  var responsive = {
		    props: ["width", "height"],
		    connected() {
		      addClass(this.$el, "uk-responsive-width");
		    },
		    observe: resize({
		      target: ({
		        $el
		      }) => [$el, parent($el)]
		    }),
		    update: {
		      read() {
		        return isVisible(this.$el) && this.width && this.height ? {
		          width: width(parent(this.$el)),
		          height: this.height
		        } : false;
		      },
		      write(dim) {
		        height(this.$el, Dimensions.contain({
		          height: this.height,
		          width: this.width
		        }, dim).height);
		      },
		      events: ["resize"]
		    }
		  };
		  var scroll = {
		    props: {
		      offset: Number
		    },
		    data: {
		      offset: 0
		    },
		    connected() {
		      registerClick(this);
		    },
		    disconnected() {
		      unregisterClick(this);
		    },
		    methods: {
		      async scrollTo(el) {
		        el = el && $(el) || document.body;
		        if (trigger(this.$el, "beforescroll", [this, el])) {
		          await scrollIntoView(el, {
		            offset: this.offset
		          });
		          trigger(this.$el, "scrolled", [this, el]);
		        }
		      }
		    }
		  };
		  const instances = /* @__PURE__ */new Set();
		  function registerClick(cmp) {
		    if (!instances.size) {
		      on(document, "click", clickHandler);
		    }
		    instances.add(cmp);
		  }
		  function unregisterClick(cmp) {
		    instances.delete(cmp);
		    if (!instances.size) {
		      off(document, "click", clickHandler);
		    }
		  }
		  function clickHandler(e) {
		    if (e.defaultPrevented) {
		      return;
		    }
		    for (const instance of instances) {
		      if (within(e.target, instance.$el) && isSameSiteAnchor(instance.$el)) {
		        e.preventDefault();
		        if (window.location.href !== instance.$el.href) {
		          window.history.pushState({}, "", instance.$el.href);
		        }
		        instance.scrollTo(getTargetedElement(instance.$el));
		      }
		    }
		  }
		  var scrollspy = {
		    args: "cls",
		    props: {
		      cls: String,
		      target: String,
		      hidden: Boolean,
		      margin: String,
		      repeat: Boolean,
		      delay: Number
		    },
		    data: () => ({
		      cls: "",
		      target: false,
		      hidden: true,
		      margin: "-1px",
		      repeat: false,
		      delay: 0,
		      inViewClass: "uk-scrollspy-inview"
		    }),
		    computed: {
		      elements({
		        target
		      }, $el) {
		        return target ? $$(target, $el) : [$el];
		      }
		    },
		    watch: {
		      elements(elements) {
		        if (this.hidden) {
		          css(filter$1(elements, `:not(.${this.inViewClass})`), "opacity", 0);
		        }
		      }
		    },
		    connected() {
		      this.elementData = /* @__PURE__ */new Map();
		    },
		    disconnected() {
		      for (const [el, state] of this.elementData.entries()) {
		        removeClass(el, this.inViewClass, (state == null ? void 0 : state.cls) || "");
		      }
		      delete this.elementData;
		    },
		    observe: intersection({
		      target: ({
		        elements
		      }) => elements,
		      handler(records) {
		        const elements = this.elementData;
		        for (const {
		          target: el,
		          isIntersecting
		        } of records) {
		          if (!elements.has(el)) {
		            elements.set(el, {
		              cls: data(el, "uk-scrollspy-class") || this.cls
		            });
		          }
		          const state = elements.get(el);
		          if (!this.repeat && state.show) {
		            continue;
		          }
		          state.show = isIntersecting;
		        }
		        this.$emit();
		      },
		      options: instance => ({
		        rootMargin: instance.margin
		      }),
		      args: {
		        intersecting: false
		      }
		    }),
		    update: [{
		      write(data) {
		        for (const [el, state] of this.elementData.entries()) {
		          if (state.show && !state.inview && !state.queued) {
		            state.queued = true;
		            data.promise = (data.promise || Promise.resolve()).then(() => new Promise(resolve => setTimeout(resolve, this.delay))).then(() => {
		              this.toggle(el, true);
		              setTimeout(() => {
		                state.queued = false;
		                this.$emit();
		              }, 300);
		            });
		          } else if (!state.show && state.inview && !state.queued && this.repeat) {
		            this.toggle(el, false);
		          }
		        }
		      }
		    }],
		    methods: {
		      toggle(el, inview) {
		        var _a;
		        const state = this.elementData.get(el);
		        if (!state) {
		          return;
		        }
		        (_a = state.off) == null ? void 0 : _a.call(state);
		        css(el, "opacity", !inview && this.hidden ? 0 : "");
		        toggleClass(el, this.inViewClass, inview);
		        toggleClass(el, state.cls);
		        if (/\buk-animation-/.test(state.cls)) {
		          const removeAnimationClasses = () => removeClasses(el, "uk-animation-[\\w-]+");
		          if (inview) {
		            state.off = once(el, "animationcancel animationend", removeAnimationClasses);
		          } else {
		            removeAnimationClasses();
		          }
		        }
		        trigger(el, inview ? "inview" : "outview");
		        state.inview = inview;
		        this.$update(el);
		      }
		    }
		  };
		  var scrollspyNav = {
		    props: {
		      cls: String,
		      closest: String,
		      scroll: Boolean,
		      overflow: Boolean,
		      offset: Number
		    },
		    data: {
		      cls: "uk-active",
		      closest: false,
		      scroll: false,
		      overflow: true,
		      offset: 0
		    },
		    computed: {
		      links(_, $el) {
		        return $$('a[href*="#"]', $el).filter(el => el.hash && isSameSiteAnchor(el));
		      },
		      elements({
		        closest: selector
		      }) {
		        return closest(this.links, selector || "*");
		      }
		    },
		    watch: {
		      links(links) {
		        if (this.scroll) {
		          this.$create("scroll", links, {
		            offset: this.offset || 0
		          });
		        }
		      }
		    },
		    observe: [intersection(), scroll$1()],
		    update: [{
		      read() {
		        const targets = this.links.map(getTargetedElement).filter(Boolean);
		        const {
		          length
		        } = targets;
		        if (!length || !isVisible(this.$el)) {
		          return false;
		        }
		        const scrollElement = scrollParent(targets, true);
		        const {
		          scrollTop,
		          scrollHeight
		        } = scrollElement;
		        const viewport = offsetViewport(scrollElement);
		        const max = scrollHeight - viewport.height;
		        let active = false;
		        if (scrollTop === max) {
		          active = length - 1;
		        } else {
		          for (let i = 0; i < targets.length; i++) {
		            if (offset(targets[i]).top - viewport.top - this.offset > 0) {
		              break;
		            }
		            active = +i;
		          }
		          if (active === false && this.overflow) {
		            active = 0;
		          }
		        }
		        return {
		          active
		        };
		      },
		      write({
		        active
		      }) {
		        const changed = active !== false && !hasClass(this.elements[active], this.cls);
		        this.links.forEach(el => el.blur());
		        for (let i = 0; i < this.elements.length; i++) {
		          toggleClass(this.elements[i], this.cls, +i === active);
		        }
		        if (changed) {
		          trigger(this.$el, "active", [active, this.elements[active]]);
		        }
		      },
		      events: ["scroll", "resize"]
		    }]
		  };
		  var sticky = {
		    mixins: [Class, Media],
		    props: {
		      position: String,
		      top: null,
		      bottom: null,
		      start: null,
		      end: null,
		      offset: String,
		      overflowFlip: Boolean,
		      animation: String,
		      clsActive: String,
		      clsInactive: String,
		      clsFixed: String,
		      clsBelow: String,
		      selTarget: String,
		      showOnUp: Boolean,
		      targetOffset: Number
		    },
		    data: {
		      position: "top",
		      top: false,
		      bottom: false,
		      start: false,
		      end: false,
		      offset: 0,
		      overflowFlip: false,
		      animation: "",
		      clsActive: "uk-active",
		      clsInactive: "",
		      clsFixed: "uk-sticky-fixed",
		      clsBelow: "uk-sticky-below",
		      selTarget: "",
		      showOnUp: false,
		      targetOffset: false
		    },
		    computed: {
		      selTarget({
		        selTarget
		      }, $el) {
		        return selTarget && $(selTarget, $el) || $el;
		      }
		    },
		    connected() {
		      this.start = coerce(this.start || this.top);
		      this.end = coerce(this.end || this.bottom);
		      this.placeholder = $("+ .uk-sticky-placeholder", this.$el) || $('<div class="uk-sticky-placeholder"></div>');
		      this.isFixed = false;
		      this.setActive(false);
		    },
		    disconnected() {
		      if (this.isFixed) {
		        this.hide();
		        removeClass(this.selTarget, this.clsInactive);
		      }
		      reset(this.$el);
		      remove$1(this.placeholder);
		      this.placeholder = null;
		    },
		    observe: [resize({
		      target: ({
		        $el
		      }) => [$el, document.scrollingElement]
		    }), viewport(), scroll$1()],
		    events: [{
		      name: "load hashchange popstate",
		      el() {
		        return window;
		      },
		      filter() {
		        return this.targetOffset !== false;
		      },
		      handler() {
		        const {
		          scrollingElement
		        } = document;
		        if (!location.hash || scrollingElement.scrollTop === 0) {
		          return;
		        }
		        setTimeout(() => {
		          const targetOffset = offset($(location.hash));
		          const elOffset = offset(this.$el);
		          if (this.isFixed && intersectRect(targetOffset, elOffset)) {
		            scrollingElement.scrollTop = targetOffset.top - elOffset.height - toPx(this.targetOffset, "height", this.placeholder) - toPx(this.offset, "height", this.placeholder);
		          }
		        });
		      }
		    }, {
		      name: "transitionstart",
		      capture: true,
		      handler() {
		        this.transitionInProgress = once(this.$el, "transitionend transitioncancel", () => this.transitionInProgress = null);
		      }
		    }],
		    update: [{
		      read({
		        height: height$1,
		        width,
		        margin,
		        sticky
		      }) {
		        this.inactive = !this.matchMedia || !isVisible(this.$el);
		        if (this.inactive) {
		          return;
		        }
		        const hide = this.isFixed && !this.transitionInProgress;
		        if (hide) {
		          preventTransition(this.selTarget);
		          this.hide();
		        }
		        if (!this.active) {
		          ({
		            height: height$1,
		            width
		          } = offset(this.$el));
		          margin = css(this.$el, "margin");
		        }
		        if (hide) {
		          this.show();
		        }
		        const viewport2 = toPx("100vh", "height");
		        const dynamicViewport = height(window);
		        const maxScrollHeight = document.scrollingElement.scrollHeight - viewport2;
		        let position = this.position;
		        if (this.overflowFlip && height$1 > viewport2) {
		          position = position === "top" ? "bottom" : "top";
		        }
		        const referenceElement = this.isFixed ? this.placeholder : this.$el;
		        let offset$1 = toPx(this.offset, "height", sticky ? this.$el : referenceElement);
		        if (position === "bottom" && (height$1 < dynamicViewport || this.overflowFlip)) {
		          offset$1 += dynamicViewport - height$1;
		        }
		        const overflow = this.overflowFlip ? 0 : Math.max(0, height$1 + offset$1 - viewport2);
		        const topOffset = offset(referenceElement).top;
		        const elHeight = offset(this.$el).height;
		        const start = (this.start === false ? topOffset : parseProp(this.start, this.$el, topOffset)) - offset$1;
		        const end = this.end === false ? maxScrollHeight : Math.min(maxScrollHeight, parseProp(this.end, this.$el, topOffset + height$1, true) - elHeight - offset$1 + overflow);
		        sticky = maxScrollHeight && !this.showOnUp && start + offset$1 === topOffset && end === Math.min(maxScrollHeight, parseProp("!*", this.$el, 0, true) - elHeight - offset$1 + overflow) && css(parent(this.$el), "overflowY") === "visible";
		        return {
		          start,
		          end,
		          offset: offset$1,
		          overflow,
		          topOffset,
		          height: height$1,
		          elHeight,
		          width,
		          margin,
		          top: offsetPosition(referenceElement)[0],
		          sticky
		        };
		      },
		      write({
		        height,
		        width,
		        margin,
		        offset,
		        sticky
		      }) {
		        if (this.inactive || sticky || !this.isFixed) {
		          reset(this.$el);
		        }
		        if (this.inactive) {
		          return;
		        }
		        if (sticky) {
		          height = width = margin = 0;
		          css(this.$el, {
		            position: "sticky",
		            top: offset
		          });
		        }
		        const {
		          placeholder
		        } = this;
		        css(placeholder, {
		          height,
		          width,
		          margin
		        });
		        if (!within(placeholder, document)) {
		          placeholder.hidden = true;
		        }
		        (sticky ? before : after)(this.$el, placeholder);
		      },
		      events: ["resize"]
		    }, {
		      read({
		        scroll: prevScroll = 0,
		        dir: prevDir = "down",
		        overflow,
		        overflowScroll = 0,
		        start,
		        end
		      }) {
		        const scroll2 = document.scrollingElement.scrollTop;
		        const dir = prevScroll <= scroll2 ? "down" : "up";
		        return {
		          dir,
		          prevDir,
		          scroll: scroll2,
		          prevScroll,
		          offsetParentTop: offset((this.isFixed ? this.placeholder : this.$el).offsetParent).top,
		          overflowScroll: clamp(overflowScroll + clamp(scroll2, start, end) - clamp(prevScroll, start, end), 0, overflow)
		        };
		      },
		      write(data, types) {
		        const isScrollUpdate = types.has("scroll");
		        const {
		          initTimestamp = 0,
		          dir,
		          prevDir,
		          scroll: scroll2,
		          prevScroll = 0,
		          top,
		          start,
		          topOffset,
		          height
		        } = data;
		        if (scroll2 < 0 || scroll2 === prevScroll && isScrollUpdate || this.showOnUp && !isScrollUpdate && !this.isFixed) {
		          return;
		        }
		        const now = Date.now();
		        if (now - initTimestamp > 300 || dir !== prevDir) {
		          data.initScroll = scroll2;
		          data.initTimestamp = now;
		        }
		        if (this.showOnUp && !this.isFixed && Math.abs(data.initScroll - scroll2) <= 30 && Math.abs(prevScroll - scroll2) <= 10) {
		          return;
		        }
		        if (this.inactive || scroll2 < start || this.showOnUp && (scroll2 <= start || dir === "down" && isScrollUpdate || dir === "up" && !this.isFixed && scroll2 <= topOffset + height)) {
		          if (!this.isFixed) {
		            if (Animation.inProgress(this.$el) && top > scroll2) {
		              Animation.cancel(this.$el);
		              this.hide();
		            }
		            return;
		          }
		          if (this.animation && scroll2 > topOffset) {
		            Animation.cancel(this.$el);
		            Animation.out(this.$el, this.animation).then(() => this.hide(), noop);
		          } else {
		            this.hide();
		          }
		        } else if (this.isFixed) {
		          this.update();
		        } else if (this.animation && scroll2 > topOffset) {
		          Animation.cancel(this.$el);
		          this.show();
		          Animation.in(this.$el, this.animation).catch(noop);
		        } else {
		          preventTransition(this.selTarget);
		          this.show();
		        }
		      },
		      events: ["resize", "resizeViewport", "scroll"]
		    }],
		    methods: {
		      show() {
		        this.isFixed = true;
		        this.update();
		        this.placeholder.hidden = false;
		      },
		      hide() {
		        const {
		          offset,
		          sticky
		        } = this._data;
		        this.setActive(false);
		        removeClass(this.$el, this.clsFixed, this.clsBelow);
		        if (sticky) {
		          css(this.$el, "top", offset);
		        } else {
		          css(this.$el, {
		            position: "",
		            top: "",
		            width: "",
		            marginTop: ""
		          });
		        }
		        this.placeholder.hidden = true;
		        this.isFixed = false;
		      },
		      update() {
		        let {
		          width,
		          scroll: scroll2 = 0,
		          overflow,
		          overflowScroll = 0,
		          start,
		          end,
		          offset,
		          topOffset,
		          height,
		          elHeight,
		          offsetParentTop,
		          sticky
		        } = this._data;
		        const active = start !== 0 || scroll2 > start;
		        if (!sticky) {
		          let position = "fixed";
		          if (scroll2 > end) {
		            offset += end - offsetParentTop;
		            position = "absolute";
		          }
		          css(this.$el, {
		            position,
		            width,
		            marginTop: 0
		          }, "important");
		        }
		        if (overflow) {
		          offset -= overflowScroll;
		        }
		        css(this.$el, "top", offset);
		        this.setActive(active);
		        toggleClass(this.$el, this.clsBelow, scroll2 > topOffset + (sticky ? Math.min(height, elHeight) : height));
		        addClass(this.$el, this.clsFixed);
		      },
		      setActive(active) {
		        const prev = this.active;
		        this.active = active;
		        if (active) {
		          replaceClass(this.selTarget, this.clsInactive, this.clsActive);
		          prev !== active && trigger(this.$el, "active");
		        } else {
		          replaceClass(this.selTarget, this.clsActive, this.clsInactive);
		          prev !== active && trigger(this.$el, "inactive");
		        }
		      }
		    }
		  };
		  function parseProp(value, el, propOffset, padding) {
		    if (!value) {
		      return 0;
		    }
		    if (isNumeric(value) || isString(value) && value.match(/^-?\d/)) {
		      return propOffset + toPx(value, "height", el, true);
		    } else {
		      const refElement = value === true ? parent(el) : query(value, el);
		      return offset(refElement).bottom - (padding && refElement && within(el, refElement) ? toFloat(css(refElement, "paddingBottom")) : 0);
		    }
		  }
		  function coerce(value) {
		    if (value === "true") {
		      return true;
		    } else if (value === "false") {
		      return false;
		    }
		    return value;
		  }
		  function reset(el) {
		    css(el, {
		      position: "",
		      top: "",
		      marginTop: "",
		      width: ""
		    });
		  }
		  function preventTransition(el) {
		    css(el, "transition", "0s");
		    requestAnimationFrame(() => css(el, "transition", ""));
		  }
		  function getMaxPathLength(el) {
		    return Math.ceil(Math.max(0, ...$$("[stroke]", el).map(stroke => {
		      try {
		        return stroke.getTotalLength();
		      } catch (e) {
		        return 0;
		      }
		    })));
		  }
		  var svg = {
		    mixins: [Svg],
		    args: "src",
		    props: {
		      src: String,
		      icon: String,
		      attributes: "list",
		      strokeAnimation: Boolean
		    },
		    data: {
		      strokeAnimation: false
		    },
		    observe: [mutation({
		      async handler() {
		        const svg = await this.svg;
		        if (svg) {
		          applyAttributes.call(this, svg);
		        }
		      },
		      options: {
		        attributes: true,
		        attributeFilter: ["id", "class", "style"]
		      }
		    })],
		    async connected() {
		      if (includes(this.src, "#")) {
		        [this.src, this.icon] = this.src.split("#");
		      }
		      const svg = await this.svg;
		      if (svg) {
		        applyAttributes.call(this, svg);
		        if (this.strokeAnimation) {
		          applyAnimation(svg);
		        }
		      }
		    },
		    methods: {
		      async getSvg() {
		        if (isTag(this.$el, "img") && !this.$el.complete && this.$el.loading === "lazy") {
		          return new Promise(resolve => once(this.$el, "load", () => resolve(this.getSvg())));
		        }
		        return parseSVG(await loadSVG(this.src), this.icon) || Promise.reject("SVG not found.");
		      }
		    }
		  };
		  function applyAttributes(el) {
		    const {
		      $el
		    } = this;
		    addClass(el, attr($el, "class"), "uk-svg");
		    for (let i = 0; i < $el.style.length; i++) {
		      const prop = $el.style[i];
		      css(el, prop, css($el, prop));
		    }
		    for (const attribute in this.attributes) {
		      const [prop, value] = this.attributes[attribute].split(":", 2);
		      attr(el, prop, value);
		    }
		    if (!this.$el.id) {
		      removeAttr(el, "id");
		    }
		  }
		  const loadSVG = memoize(async src => {
		    if (src) {
		      if (startsWith(src, "data:")) {
		        return decodeURIComponent(src.split(",")[1]);
		      } else {
		        return (await fetch(src)).text();
		      }
		    } else {
		      return Promise.reject();
		    }
		  });
		  function parseSVG(svg, icon) {
		    if (icon && includes(svg, "<symbol")) {
		      svg = parseSymbols(svg)[icon] || svg;
		    }
		    svg = $(svg.substr(svg.indexOf("<svg")));
		    return (svg == null ? void 0 : svg.hasChildNodes()) && svg;
		  }
		  const symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
		  const parseSymbols = memoize(function (svg) {
		    const symbols = {};
		    symbolRe.lastIndex = 0;
		    let match;
		    while (match = symbolRe.exec(svg)) {
		      symbols[match[3]] = `<svg ${match[1]}svg>`;
		    }
		    return symbols;
		  });
		  function applyAnimation(el) {
		    const length = getMaxPathLength(el);
		    if (length) {
		      css(el, "--uk-animation-stroke", length);
		    }
		  }
		  const selDisabled = ".uk-disabled *, .uk-disabled, [disabled]";
		  var Switcher = {
		    mixins: [Togglable],
		    args: "connect",
		    props: {
		      connect: String,
		      toggle: String,
		      itemNav: String,
		      active: Number,
		      followFocus: Boolean,
		      swiping: Boolean
		    },
		    data: {
		      connect: "~.uk-switcher",
		      toggle: "> * > :first-child",
		      itemNav: false,
		      active: 0,
		      cls: "uk-active",
		      attrItem: "uk-switcher-item",
		      selVertical: ".uk-nav",
		      followFocus: false,
		      swiping: true
		    },
		    computed: {
		      connects({
		        connect
		      }, $el) {
		        return queryAll(connect, $el);
		      },
		      connectChildren() {
		        return this.connects.map(el => children(el)).flat();
		      },
		      toggles({
		        toggle
		      }, $el) {
		        return $$(toggle, $el);
		      },
		      children() {
		        return children(this.$el).filter(child => this.toggles.some(toggle => within(toggle, child)));
		      }
		    },
		    watch: {
		      connects(connects) {
		        if (this.swiping) {
		          css(connects, "touchAction", "pan-y pinch-zoom");
		        }
		        this.$emit();
		      },
		      connectChildren() {
		        let index = Math.max(0, this.index());
		        for (const el of this.connects) {
		          children(el).forEach((child, i) => toggleClass(child, this.cls, i === index));
		        }
		        this.$emit();
		      },
		      toggles(toggles) {
		        this.$emit();
		        const active = this.index();
		        this.show(~active ? active : toggles[this.active] || toggles[0]);
		      }
		    },
		    connected() {
		      attr(this.$el, "role", "tablist");
		    },
		    observe: [lazyload({
		      targets: ({
		        connectChildren
		      }) => connectChildren
		    }), swipe({
		      target: ({
		        connects
		      }) => connects,
		      filter: ({
		        swiping
		      }) => swiping
		    })],
		    events: [{
		      name: "click keydown",
		      delegate() {
		        return this.toggle;
		      },
		      handler(e) {
		        if (!matches(e.current, selDisabled) && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
		          e.preventDefault();
		          this.show(e.current);
		        }
		      }
		    }, {
		      name: "keydown",
		      delegate() {
		        return this.toggle;
		      },
		      handler(e) {
		        const {
		          current,
		          keyCode
		        } = e;
		        const isVertical = matches(this.$el, this.selVertical);
		        let i = keyCode === keyMap.HOME ? 0 : keyCode === keyMap.END ? "last" : keyCode === keyMap.LEFT && !isVertical || keyCode === keyMap.UP && isVertical ? "previous" : keyCode === keyMap.RIGHT && !isVertical || keyCode === keyMap.DOWN && isVertical ? "next" : -1;
		        if (~i) {
		          e.preventDefault();
		          const toggles = this.toggles.filter(el => !matches(el, selDisabled));
		          const next = toggles[getIndex(i, toggles, toggles.indexOf(current))];
		          next.focus();
		          if (this.followFocus) {
		            this.show(next);
		          }
		        }
		      }
		    }, {
		      name: "click",
		      el() {
		        return this.connects.concat(this.itemNav ? queryAll(this.itemNav, this.$el) : []);
		      },
		      delegate() {
		        return `[${this.attrItem}],[data-${this.attrItem}]`;
		      },
		      handler(e) {
		        if (closest(e.target, "a,button")) {
		          e.preventDefault();
		          this.show(data(e.current, this.attrItem));
		        }
		      }
		    }, {
		      name: "swipeRight swipeLeft",
		      filter() {
		        return this.swiping;
		      },
		      el() {
		        return this.connects;
		      },
		      handler({
		        type
		      }) {
		        this.show(endsWith(type, "Left") ? "next" : "previous");
		      }
		    }],
		    update() {
		      var _a;
		      attr(this.connects, "role", "presentation");
		      attr(children(this.$el), "role", "presentation");
		      for (const index in this.toggles) {
		        const toggle = this.toggles[index];
		        const item = (_a = this.connects[0]) == null ? void 0 : _a.children[index];
		        attr(toggle, "role", "tab");
		        if (!item) {
		          continue;
		        }
		        toggle.id = generateId(this, toggle, `-tab-${index}`);
		        item.id = generateId(this, item, `-tabpanel-${index}`);
		        attr(toggle, "aria-controls", item.id);
		        attr(item, {
		          role: "tabpanel",
		          "aria-labelledby": toggle.id
		        });
		      }
		      attr(this.$el, "aria-orientation", matches(this.$el, this.selVertical) ? "vertical" : null);
		    },
		    methods: {
		      index() {
		        return findIndex(this.children, el => hasClass(el, this.cls));
		      },
		      show(item) {
		        const toggles = this.toggles.filter(el => !matches(el, selDisabled));
		        const prev = this.index();
		        const next = getIndex(!isNode(item) || includes(toggles, item) ? item : 0, toggles, getIndex(this.toggles[prev], toggles));
		        const active = getIndex(toggles[next], this.toggles);
		        this.children.forEach((child, i) => {
		          toggleClass(child, this.cls, active === i);
		          attr(this.toggles[i], {
		            "aria-selected": active === i,
		            tabindex: active === i ? null : -1
		          });
		        });
		        const animate = prev >= 0 && prev !== next;
		        this.connects.forEach(async ({
		          children: children2
		        }) => {
		          const actives = toArray(children2).filter((child, i) => i !== active && hasClass(child, this.cls));
		          await this.toggleElement(actives, false, animate);
		          await this.toggleElement(children2[active], true, animate);
		        });
		      }
		    }
		  };
		  var tab = {
		    mixins: [Class],
		    extends: Switcher,
		    props: {
		      media: Boolean
		    },
		    data: {
		      media: 960,
		      attrItem: "uk-tab-item",
		      selVertical: ".uk-tab-left,.uk-tab-right"
		    },
		    connected() {
		      const cls = hasClass(this.$el, "uk-tab-left") ? "uk-tab-left" : hasClass(this.$el, "uk-tab-right") ? "uk-tab-right" : false;
		      if (cls) {
		        this.$create("toggle", this.$el, {
		          cls,
		          mode: "media",
		          media: this.media
		        });
		      }
		    }
		  };
		  const KEY_SPACE = 32;
		  var toggle = {
		    mixins: [Media, Togglable],
		    args: "target",
		    props: {
		      href: String,
		      target: null,
		      mode: "list",
		      queued: Boolean
		    },
		    data: {
		      href: false,
		      target: false,
		      mode: "click",
		      queued: true
		    },
		    computed: {
		      target({
		        target
		      }, $el) {
		        target = queryAll(target || $el.hash, $el);
		        return target.length && target || [$el];
		      }
		    },
		    connected() {
		      if (!includes(this.mode, "media")) {
		        if (!isFocusable(this.$el)) {
		          attr(this.$el, "tabindex", "0");
		        }
		        if (!this.cls && isTag(this.$el, "a")) {
		          attr(this.$el, "role", "button");
		        }
		      }
		    },
		    observe: lazyload({
		      target: ({
		        target
		      }) => target
		    }),
		    events: [{
		      name: pointerDown$1,
		      filter() {
		        return includes(this.mode, "hover");
		      },
		      handler(e) {
		        this._preventClick = null;
		        if (!isTouch(e) || isBoolean(this._showState) || this.$el.disabled) {
		          return;
		        }
		        trigger(this.$el, "focus");
		        once(document, pointerDown$1, () => trigger(this.$el, "blur"), true, e2 => !within(e2.target, this.$el));
		        if (includes(this.mode, "click")) {
		          this._preventClick = true;
		        }
		      }
		    }, {
		      name: `${pointerEnter} ${pointerLeave} focus blur`,
		      filter() {
		        return includes(this.mode, "hover");
		      },
		      handler(e) {
		        if (isTouch(e) || this.$el.disabled) {
		          return;
		        }
		        const show = includes([pointerEnter, "focus"], e.type);
		        const expanded = this.isToggled(this.target);
		        if (!show && (!isBoolean(this._showState) || expanded === this._showState || e.type === pointerLeave && matches(this.$el, ":focus") || e.type === "blur" && matches(this.$el, ":hover"))) {
		          if (expanded === this._showState) {
		            this._showState = null;
		          }
		          return;
		        }
		        if (show && isBoolean(this._showState) && expanded !== this._showState) {
		          return;
		        }
		        this._showState = show ? expanded : null;
		        this.toggle(`toggle${show ? "show" : "hide"}`);
		      }
		    }, {
		      name: "keydown",
		      filter() {
		        return includes(this.mode, "click") && !isTag(this.$el, "input");
		      },
		      handler(e) {
		        if (e.keyCode === KEY_SPACE) {
		          e.preventDefault();
		          this.$el.click();
		        }
		      }
		    }, {
		      name: "click",
		      filter() {
		        return ["click", "hover"].some(mode => includes(this.mode, mode));
		      },
		      handler(e) {
		        let link;
		        if (this._preventClick || closest(e.target, 'a[href="#"], a[href=""]') || (link = closest(e.target, "a[href]")) && (!this.isToggled(this.target) || link.hash && matches(this.target, link.hash))) {
		          e.preventDefault();
		        }
		        if (!this._preventClick && includes(this.mode, "click")) {
		          this.toggle();
		        }
		      }
		    }, {
		      name: "mediachange",
		      filter() {
		        return includes(this.mode, "media");
		      },
		      el() {
		        return this.target;
		      },
		      handler(e, mediaObj) {
		        if (mediaObj.matches ^ this.isToggled(this.target)) {
		          this.toggle();
		        }
		      }
		    }],
		    methods: {
		      async toggle(type) {
		        if (!trigger(this.target, type || "toggle", [this])) {
		          return;
		        }
		        if (hasAttr(this.$el, "aria-expanded")) {
		          attr(this.$el, "aria-expanded", !this.isToggled(this.target));
		        }
		        if (!this.queued) {
		          return this.toggleElement(this.target);
		        }
		        const leaving = this.target.filter(el => hasClass(el, this.clsLeave));
		        if (leaving.length) {
		          for (const el of this.target) {
		            const isLeaving = includes(leaving, el);
		            this.toggleElement(el, isLeaving, isLeaving);
		          }
		          return;
		        }
		        const toggled = this.target.filter(this.isToggled);
		        if (await this.toggleElement(toggled, false)) {
		          await this.toggleElement(this.target.filter(el => !includes(toggled, el)), true);
		        }
		      }
		    }
		  };
		  var components$1 = /*#__PURE__*/Object.freeze({
		    __proto__: null,
		    Accordion: Accordion,
		    Alert: alert,
		    Close: Close,
		    Cover: cover,
		    Drop: drop,
		    DropParentIcon: IconComponent,
		    Dropdown: drop,
		    Dropnav: Dropnav,
		    FormCustom: formCustom,
		    Grid: grid,
		    HeightMatch: heightMatch,
		    HeightViewport: heightViewport,
		    Icon: Icon,
		    Img: img,
		    Leader: leader,
		    Margin: Margin,
		    Marker: Marker,
		    Modal: modal,
		    Nav: nav,
		    NavParentIcon: NavParentIcon,
		    Navbar: navbar,
		    NavbarParentIcon: IconComponent,
		    NavbarToggleIcon: NavbarToggleIcon,
		    Offcanvas: offcanvas,
		    OverflowAuto: overflowAuto,
		    OverlayIcon: IconComponent,
		    PaginationNext: PaginationNext,
		    PaginationPrevious: PaginationPrevious,
		    Responsive: responsive,
		    Scroll: scroll,
		    Scrollspy: scrollspy,
		    ScrollspyNav: scrollspyNav,
		    SearchIcon: Search,
		    SlidenavNext: Slidenav,
		    SlidenavPrevious: Slidenav,
		    Spinner: Spinner,
		    Sticky: sticky,
		    Svg: svg,
		    Switcher: Switcher,
		    Tab: tab,
		    Toggle: toggle,
		    Totop: Totop,
		    Video: Video
		  });
		  each(components$1, (component, name) => App.component(name, component));
		  boot(App);
		  const units = ["days", "hours", "minutes", "seconds"];
		  var countdown = {
		    mixins: [Class],
		    props: {
		      date: String,
		      clsWrapper: String,
		      role: String
		    },
		    data: {
		      date: "",
		      clsWrapper: ".uk-countdown-%unit%",
		      role: "timer"
		    },
		    connected() {
		      attr(this.$el, "role", this.role);
		      this.date = toFloat(Date.parse(this.$props.date));
		      this.end = false;
		      this.start();
		    },
		    disconnected() {
		      this.stop();
		    },
		    events: {
		      name: "visibilitychange",
		      el() {
		        return document;
		      },
		      handler() {
		        if (document.hidden) {
		          this.stop();
		        } else {
		          this.start();
		        }
		      }
		    },
		    methods: {
		      start() {
		        this.stop();
		        this.update();
		        if (!this.timer) {
		          trigger(this.$el, "countdownstart");
		          this.timer = setInterval(this.update, 1e3);
		        }
		      },
		      stop() {
		        if (this.timer) {
		          clearInterval(this.timer);
		          trigger(this.$el, "countdownstop");
		          this.timer = null;
		        }
		      },
		      update() {
		        const timespan = getTimeSpan(this.date);
		        if (!timespan.total) {
		          this.stop();
		          if (!this.end) {
		            trigger(this.$el, "countdownend");
		            this.end = true;
		          }
		        }
		        for (const unit of units) {
		          const el = $(this.clsWrapper.replace("%unit%", unit), this.$el);
		          if (!el) {
		            continue;
		          }
		          let digits = String(Math.trunc(timespan[unit]));
		          digits = digits.length < 2 ? `0${digits}` : digits;
		          if (el.textContent !== digits) {
		            digits = digits.split("");
		            if (digits.length !== el.children.length) {
		              html(el, digits.map(() => "<span></span>").join(""));
		            }
		            digits.forEach((digit, i) => el.children[i].textContent = digit);
		          }
		        }
		      }
		    }
		  };
		  function getTimeSpan(date) {
		    const total = Math.max(0, date - Date.now()) / 1e3;
		    return {
		      total,
		      seconds: total % 60,
		      minutes: total / 60 % 60,
		      hours: total / 60 / 60 % 24,
		      days: total / 60 / 60 / 24
		    };
		  }
		  const clsLeave = "uk-transition-leave";
		  const clsEnter = "uk-transition-enter";
		  function fade(action, target, duration, stagger = 0) {
		    const index = transitionIndex(target, true);
		    const propsIn = {
		      opacity: 1
		    };
		    const propsOut = {
		      opacity: 0
		    };
		    const wrapIndexFn = fn => () => index === transitionIndex(target) ? fn() : Promise.reject();
		    const leaveFn = wrapIndexFn(async () => {
		      addClass(target, clsLeave);
		      await Promise.all(getTransitionNodes(target).map((child, i) => new Promise(resolve => setTimeout(() => Transition.start(child, propsOut, duration / 2, "ease").then(resolve), i * stagger))));
		      removeClass(target, clsLeave);
		    });
		    const enterFn = wrapIndexFn(async () => {
		      const oldHeight = height(target);
		      addClass(target, clsEnter);
		      action();
		      css(children(target), {
		        opacity: 0
		      });
		      await awaitFrame$1();
		      const nodes = children(target);
		      const newHeight = height(target);
		      css(target, "alignContent", "flex-start");
		      height(target, oldHeight);
		      const transitionNodes = getTransitionNodes(target);
		      css(nodes, propsOut);
		      const transitions = transitionNodes.map(async (child, i) => {
		        await awaitTimeout(i * stagger);
		        await Transition.start(child, propsIn, duration / 2, "ease");
		      });
		      if (oldHeight !== newHeight) {
		        transitions.push(Transition.start(target, {
		          height: newHeight
		        }, duration / 2 + transitionNodes.length * stagger, "ease"));
		      }
		      await Promise.all(transitions).then(() => {
		        removeClass(target, clsEnter);
		        if (index === transitionIndex(target)) {
		          css(target, {
		            height: "",
		            alignContent: ""
		          });
		          css(nodes, {
		            opacity: ""
		          });
		          delete target.dataset.transition;
		        }
		      });
		    });
		    return hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
		  }
		  function transitionIndex(target, next) {
		    if (next) {
		      target.dataset.transition = 1 + transitionIndex(target);
		    }
		    return toNumber(target.dataset.transition) || 0;
		  }
		  function waitTransitionend(target) {
		    return Promise.all(children(target).filter(Transition.inProgress).map(el => new Promise(resolve => once(el, "transitionend transitioncanceled", resolve))));
		  }
		  function getTransitionNodes(target) {
		    return getRows(children(target)).reduce((nodes, row) => nodes.concat(sortBy$1(row.filter(el => isInView(el)), "offsetLeft")), []);
		  }
		  function awaitFrame$1() {
		    return new Promise(resolve => requestAnimationFrame(resolve));
		  }
		  function awaitTimeout(timeout) {
		    return new Promise(resolve => setTimeout(resolve, timeout));
		  }
		  async function slide(action, target, duration) {
		    await awaitFrame();
		    let nodes = children(target);
		    const currentProps = nodes.map(el => getProps(el, true));
		    const targetProps = {
		      ...css(target, ["height", "padding"]),
		      display: "block"
		    };
		    await Promise.all(nodes.concat(target).map(Transition.cancel));
		    action();
		    nodes = nodes.concat(children(target).filter(el => !includes(nodes, el)));
		    await Promise.resolve();
		    fastdom.flush();
		    const targetStyle = attr(target, "style");
		    const targetPropsTo = css(target, ["height", "padding"]);
		    const [propsTo, propsFrom] = getTransitionProps(target, nodes, currentProps);
		    const attrsTo = nodes.map(el => ({
		      style: attr(el, "style")
		    }));
		    nodes.forEach((el, i) => propsFrom[i] && css(el, propsFrom[i]));
		    css(target, targetProps);
		    trigger(target, "scroll");
		    fastdom.flush();
		    await awaitFrame();
		    const transitions = nodes.map((el, i) => parent(el) === target && Transition.start(el, propsTo[i], duration, "ease")).concat(Transition.start(target, targetPropsTo, duration, "ease"));
		    try {
		      await Promise.all(transitions);
		      nodes.forEach((el, i) => {
		        attr(el, attrsTo[i]);
		        if (parent(el) === target) {
		          css(el, "display", propsTo[i].opacity === 0 ? "none" : "");
		        }
		      });
		      attr(target, "style", targetStyle);
		    } catch (e) {
		      attr(nodes, "style", "");
		      resetProps(target, targetProps);
		    }
		  }
		  function getProps(el, opacity) {
		    const zIndex = css(el, "zIndex");
		    return isVisible(el) ? {
		      display: "",
		      opacity: opacity ? css(el, "opacity") : "0",
		      pointerEvents: "none",
		      position: "absolute",
		      zIndex: zIndex === "auto" ? index(el) : zIndex,
		      ...getPositionWithMargin(el)
		    } : false;
		  }
		  function getTransitionProps(target, nodes, currentProps) {
		    const propsTo = nodes.map((el, i) => parent(el) && i in currentProps ? currentProps[i] ? isVisible(el) ? getPositionWithMargin(el) : {
		      opacity: 0
		    } : {
		      opacity: isVisible(el) ? 1 : 0
		    } : false);
		    const propsFrom = propsTo.map((props, i) => {
		      const from = parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));
		      if (!from) {
		        return false;
		      }
		      if (!props) {
		        delete from.opacity;
		      } else if (!("opacity" in props)) {
		        const {
		          opacity
		        } = from;
		        if (opacity % 1) {
		          props.opacity = 1;
		        } else {
		          delete from.opacity;
		        }
		      }
		      return from;
		    });
		    return [propsTo, propsFrom];
		  }
		  function resetProps(el, props) {
		    for (const prop in props) {
		      css(el, prop, "");
		    }
		  }
		  function getPositionWithMargin(el) {
		    const {
		      height,
		      width
		    } = offset(el);
		    return {
		      height,
		      width,
		      transform: "",
		      ...position(el),
		      ...css(el, ["marginTop", "marginLeft"])
		    };
		  }
		  function awaitFrame() {
		    return new Promise(resolve => requestAnimationFrame(resolve));
		  }
		  var Animate = {
		    props: {
		      duration: Number,
		      animation: Boolean
		    },
		    data: {
		      duration: 150,
		      animation: "slide"
		    },
		    methods: {
		      animate(action, target = this.$el) {
		        const name = this.animation;
		        const animationFn = name === "fade" ? fade : name === "delayed-fade" ? (...args) => fade(...args, 40) : name ? slide : () => {
		          action();
		          return Promise.resolve();
		        };
		        return animationFn(action, target, this.duration).catch(noop);
		      }
		    }
		  };
		  var filter = {
		    mixins: [Animate],
		    args: "target",
		    props: {
		      target: String,
		      selActive: Boolean
		    },
		    data: {
		      target: "",
		      selActive: false,
		      attrItem: "uk-filter-control",
		      cls: "uk-active",
		      duration: 250
		    },
		    computed: {
		      toggles({
		        attrItem
		      }, $el) {
		        return $$(`[${attrItem}],[data-${attrItem}]`, $el);
		      },
		      children({
		        target
		      }, $el) {
		        return $$(`${target} > *`, $el);
		      }
		    },
		    watch: {
		      toggles(toggles) {
		        this.updateState();
		        const actives = $$(this.selActive, this.$el);
		        for (const toggle of toggles) {
		          if (this.selActive !== false) {
		            toggleClass(toggle, this.cls, includes(actives, toggle));
		          }
		          const button = findButton(toggle);
		          if (isTag(button, "a")) {
		            attr(button, "role", "button");
		          }
		        }
		      },
		      children(list, prev) {
		        if (prev) {
		          this.updateState();
		        }
		      }
		    },
		    events: {
		      name: "click keydown",
		      delegate() {
		        return `[${this.attrItem}],[data-${this.attrItem}]`;
		      },
		      handler(e) {
		        if (e.type === "keydown" && e.keyCode !== keyMap.SPACE) {
		          return;
		        }
		        if (closest(e.target, "a,button")) {
		          e.preventDefault();
		          this.apply(e.current);
		        }
		      }
		    },
		    methods: {
		      apply(el) {
		        const prevState = this.getState();
		        const newState = mergeState(el, this.attrItem, this.getState());
		        if (!isEqualState(prevState, newState)) {
		          this.setState(newState);
		        }
		      },
		      getState() {
		        return this.toggles.filter(item => hasClass(item, this.cls)).reduce((state, el) => mergeState(el, this.attrItem, state), {
		          filter: {
		            "": ""
		          },
		          sort: []
		        });
		      },
		      async setState(state, animate = true) {
		        state = {
		          filter: {
		            "": ""
		          },
		          sort: [],
		          ...state
		        };
		        trigger(this.$el, "beforeFilter", [this, state]);
		        for (const toggle of this.toggles) {
		          toggleClass(toggle, this.cls, matchFilter(toggle, this.attrItem, state));
		        }
		        await Promise.all($$(this.target, this.$el).map(target => {
		          const filterFn = () => {
		            applyState(state, target, children(target));
		            this.$update(this.$el);
		          };
		          return animate ? this.animate(filterFn, target) : filterFn();
		        }));
		        trigger(this.$el, "afterFilter", [this]);
		      },
		      updateState() {
		        fastdom.write(() => this.setState(this.getState(), false));
		      }
		    }
		  };
		  function getFilter(el, attr2) {
		    return parseOptions(data(el, attr2), ["filter"]);
		  }
		  function isEqualState(stateA, stateB) {
		    return ["filter", "sort"].every(prop => isEqual(stateA[prop], stateB[prop]));
		  }
		  function applyState(state, target, children) {
		    const selector = getSelector(state);
		    children.forEach(el => css(el, "display", selector && !matches(el, selector) ? "none" : ""));
		    const [sort, order] = state.sort;
		    if (sort) {
		      const sorted = sortItems(children, sort, order);
		      if (!isEqual(sorted, children)) {
		        append(target, sorted);
		      }
		    }
		  }
		  function mergeState(el, attr2, state) {
		    const {
		      filter,
		      group,
		      sort,
		      order = "asc"
		    } = getFilter(el, attr2);
		    if (filter || isUndefined(sort)) {
		      if (group) {
		        if (filter) {
		          delete state.filter[""];
		          state.filter[group] = filter;
		        } else {
		          delete state.filter[group];
		          if (isEmpty(state.filter) || "" in state.filter) {
		            state.filter = {
		              "": filter || ""
		            };
		          }
		        }
		      } else {
		        state.filter = {
		          "": filter || ""
		        };
		      }
		    }
		    if (!isUndefined(sort)) {
		      state.sort = [sort, order];
		    }
		    return state;
		  }
		  function matchFilter(el, attr2, {
		    filter: stateFilter = {
		      "": ""
		    },
		    sort: [stateSort, stateOrder]
		  }) {
		    const {
		      filter = "",
		      group = "",
		      sort,
		      order = "asc"
		    } = getFilter(el, attr2);
		    return isUndefined(sort) ? group in stateFilter && filter === stateFilter[group] || !filter && group && !(group in stateFilter) && !stateFilter[""] : stateSort === sort && stateOrder === order;
		  }
		  function getSelector({
		    filter
		  }) {
		    let selector = "";
		    each(filter, value => selector += value || "");
		    return selector;
		  }
		  function sortItems(nodes, sort, order) {
		    return [...nodes].sort((a, b) => data(a, sort).localeCompare(data(b, sort), void 0, {
		      numeric: true
		    }) * (order === "asc" || -1));
		  }
		  function findButton(el) {
		    return $("a,button", el) || el;
		  }
		  var Animations$2 = {
		    slide: {
		      show(dir) {
		        return [{
		          transform: translate(dir * -100)
		        }, {
		          transform: translate()
		        }];
		      },
		      percent(current) {
		        return translated(current);
		      },
		      translate(percent, dir) {
		        return [{
		          transform: translate(dir * -100 * percent)
		        }, {
		          transform: translate(dir * 100 * (1 - percent))
		        }];
		      }
		    }
		  };
		  function translated(el) {
		    return Math.abs(css(el, "transform").split(",")[4] / el.offsetWidth) || 0;
		  }
		  function translate(value = 0, unit = "%") {
		    value += value ? unit : "";
		    return `translate3d(${value}, 0, 0)`;
		  }
		  function scale3d(value) {
		    return `scale3d(${value}, ${value}, 1)`;
		  }
		  var Animations$1 = {
		    ...Animations$2,
		    fade: {
		      show() {
		        return [{
		          opacity: 0
		        }, {
		          opacity: 1
		        }];
		      },
		      percent(current) {
		        return 1 - css(current, "opacity");
		      },
		      translate(percent) {
		        return [{
		          opacity: 1 - percent
		        }, {
		          opacity: percent
		        }];
		      }
		    },
		    scale: {
		      show() {
		        return [{
		          opacity: 0,
		          transform: scale3d(1 - 0.2)
		        }, {
		          opacity: 1,
		          transform: scale3d(1)
		        }];
		      },
		      percent(current) {
		        return 1 - css(current, "opacity");
		      },
		      translate(percent) {
		        return [{
		          opacity: 1 - percent,
		          transform: scale3d(1 - 0.2 * percent)
		        }, {
		          opacity: percent,
		          transform: scale3d(1 - 0.2 + 0.2 * percent)
		        }];
		      }
		    }
		  };
		  function Transitioner$1(prev, next, dir, {
		    animation,
		    easing
		  }) {
		    const {
		      percent,
		      translate,
		      show = noop
		    } = animation;
		    const props = show(dir);
		    let resolve;
		    return {
		      dir,
		      show(duration, percent2 = 0, linear) {
		        const timing = linear ? "linear" : easing;
		        duration -= Math.round(duration * clamp(percent2, -1, 1));
		        this.translate(percent2);
		        triggerUpdate$1(next, "itemin", {
		          percent: percent2,
		          duration,
		          timing,
		          dir
		        });
		        triggerUpdate$1(prev, "itemout", {
		          percent: 1 - percent2,
		          duration,
		          timing,
		          dir
		        });
		        return new Promise(res => {
		          resolve || (resolve = res);
		          Promise.all([Transition.start(next, props[1], duration, timing), Transition.start(prev, props[0], duration, timing)]).then(() => {
		            this.reset();
		            resolve();
		          }, noop);
		        });
		      },
		      cancel() {
		        return Transition.cancel([next, prev]);
		      },
		      reset() {
		        for (const prop in props[0]) {
		          css([next, prev], prop, "");
		        }
		      },
		      async forward(duration, percent2 = this.percent()) {
		        await this.cancel();
		        return this.show(duration, percent2, true);
		      },
		      translate(percent2) {
		        this.reset();
		        const props2 = translate(percent2, dir);
		        css(next, props2[1]);
		        css(prev, props2[0]);
		        triggerUpdate$1(next, "itemtranslatein", {
		          percent: percent2,
		          dir
		        });
		        triggerUpdate$1(prev, "itemtranslateout", {
		          percent: 1 - percent2,
		          dir
		        });
		      },
		      percent() {
		        return percent(prev || next, next, dir);
		      },
		      getDistance() {
		        return prev == null ? void 0 : prev.offsetWidth;
		      }
		    };
		  }
		  function triggerUpdate$1(el, type, data) {
		    trigger(el, createEvent(type, false, false, data));
		  }
		  var SliderNav = {
		    i18n: {
		      next: "Next slide",
		      previous: "Previous slide",
		      slideX: "Slide %s",
		      slideLabel: "%s of %s",
		      role: "String"
		    },
		    data: {
		      selNav: false,
		      role: "region"
		    },
		    computed: {
		      nav({
		        selNav
		      }, $el) {
		        return $(selNav, $el);
		      },
		      navChildren() {
		        return children(this.nav);
		      },
		      selNavItem({
		        attrItem
		      }) {
		        return `[${attrItem}],[data-${attrItem}]`;
		      },
		      navItems(_, $el) {
		        return $$(this.selNavItem, $el);
		      }
		    },
		    watch: {
		      nav(nav, prev) {
		        attr(nav, "role", "tablist");
		        if (prev) {
		          this.$emit();
		        }
		      },
		      list(list) {
		        attr(list, "role", "presentation");
		      },
		      navChildren(children2) {
		        attr(children2, "role", "presentation");
		      },
		      navItems(items) {
		        for (const el of items) {
		          const cmd = data(el, this.attrItem);
		          const button = $("a,button", el) || el;
		          let ariaLabel;
		          let ariaControls = null;
		          if (isNumeric(cmd)) {
		            const item = toNumber(cmd);
		            const slide = this.slides[item];
		            if (slide) {
		              if (!slide.id) {
		                slide.id = generateId(this, slide, `-item-${cmd}`);
		              }
		              ariaControls = slide.id;
		            }
		            ariaLabel = this.t("slideX", toFloat(cmd) + 1);
		            attr(button, "role", "tab");
		          } else {
		            if (this.list) {
		              if (!this.list.id) {
		                this.list.id = generateId(this, this.list, "-items");
		              }
		              ariaControls = this.list.id;
		            }
		            ariaLabel = this.t(cmd);
		          }
		          attr(button, {
		            "aria-controls": ariaControls,
		            "aria-label": attr(button, "aria-label") || ariaLabel
		          });
		        }
		      },
		      slides(slides) {
		        slides.forEach((slide, i) => attr(slide, {
		          role: this.nav ? "tabpanel" : "group",
		          "aria-label": this.t("slideLabel", i + 1, this.length),
		          "aria-roledescription": this.nav ? null : "slide"
		        }));
		      },
		      length(length) {
		        const navLength = this.navChildren.length;
		        if (this.nav && length !== navLength) {
		          empty(this.nav);
		          for (let i = 0; i < length; i++) {
		            append(this.nav, `<li ${this.attrItem}="${i}"><a href></a></li>`);
		          }
		        }
		      }
		    },
		    connected() {
		      attr(this.$el, {
		        role: this.role,
		        "aria-roledescription": "carousel"
		      });
		    },
		    update: [{
		      write() {
		        this.navItems.concat(this.nav).forEach(el => el && (el.hidden = !this.maxIndex));
		        this.updateNav();
		      },
		      events: ["resize"]
		    }],
		    events: [{
		      name: "click keydown",
		      delegate() {
		        return this.selNavItem;
		      },
		      handler(e) {
		        if (closest(e.target, "a,button") && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
		          e.preventDefault();
		          this.show(data(e.current, this.attrItem));
		        }
		      }
		    }, {
		      name: "itemshow",
		      handler: "updateNav"
		    }, {
		      name: "keydown",
		      delegate() {
		        return this.selNavItem;
		      },
		      handler(e) {
		        const {
		          current,
		          keyCode
		        } = e;
		        const cmd = data(current, this.attrItem);
		        if (!isNumeric(cmd)) {
		          return;
		        }
		        let i = keyCode === keyMap.HOME ? 0 : keyCode === keyMap.END ? "last" : keyCode === keyMap.LEFT ? "previous" : keyCode === keyMap.RIGHT ? "next" : -1;
		        if (~i) {
		          e.preventDefault();
		          this.show(i);
		        }
		      }
		    }],
		    methods: {
		      updateNav() {
		        const index = this.getValidIndex();
		        let focus;
		        let focusEl;
		        for (const el of this.navItems) {
		          const cmd = data(el, this.attrItem);
		          const button = $("a,button", el) || el;
		          if (isNumeric(cmd)) {
		            const item = toNumber(cmd);
		            const active = item === index;
		            toggleClass(el, this.clsActive, active);
		            attr(button, {
		              "aria-selected": active,
		              tabindex: active ? null : -1
		            });
		            if (active) {
		              focusEl = button;
		            }
		            focus || (focus = matches(button, ":focus"));
		          } else {
		            toggleClass(el, "uk-invisible", this.finite && (cmd === "previous" && index === 0 || cmd === "next" && index >= this.maxIndex));
		          }
		          if (focus && focusEl) {
		            focusEl.focus();
		          }
		        }
		      }
		    }
		  };
		  const pointerOptions = {
		    passive: false,
		    capture: true
		  };
		  const pointerUpOptions = {
		    passive: true,
		    capture: true
		  };
		  const pointerDown = "touchstart mousedown";
		  const pointerMove = "touchmove mousemove";
		  const pointerUp = "touchend touchcancel mouseup click input scroll";
		  var SliderDrag = {
		    props: {
		      draggable: Boolean
		    },
		    data: {
		      draggable: true,
		      threshold: 10
		    },
		    created() {
		      for (const key of ["start", "move", "end"]) {
		        const fn = this[key];
		        this[key] = e => {
		          const pos = getEventPos(e).x * (isRtl ? -1 : 1);
		          this.prevPos = pos === this.pos ? this.prevPos : this.pos;
		          this.pos = pos;
		          fn(e);
		        };
		      }
		    },
		    events: [{
		      name: pointerDown,
		      passive: true,
		      delegate() {
		        return `${this.selList} > *`;
		      },
		      handler(e) {
		        if (!this.draggable || !isTouch(e) && hasSelectableText(e.target) || closest(e.target, selInput) || e.button > 0 || this.length < 2) {
		          return;
		        }
		        this.start(e);
		      }
		    }, {
		      name: "dragstart",
		      handler(e) {
		        e.preventDefault();
		      }
		    }, {
		      // iOS workaround for slider stopping if swiping fast
		      name: pointerMove,
		      el() {
		        return this.list;
		      },
		      handler: noop,
		      ...pointerOptions
		    }],
		    methods: {
		      start() {
		        this.drag = this.pos;
		        if (this._transitioner) {
		          this.percent = this._transitioner.percent();
		          this.drag += this._transitioner.getDistance() * this.percent * this.dir;
		          this._transitioner.cancel();
		          this._transitioner.translate(this.percent);
		          this.dragging = true;
		          this.stack = [];
		        } else {
		          this.prevIndex = this.index;
		        }
		        on(document, pointerMove, this.move, pointerOptions);
		        on(document, pointerUp, this.end, pointerUpOptions);
		        css(this.list, "userSelect", "none");
		      },
		      move(e) {
		        const distance = this.pos - this.drag;
		        if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
		          return;
		        }
		        css(this.list, "pointerEvents", "none");
		        e.cancelable && e.preventDefault();
		        this.dragging = true;
		        this.dir = distance < 0 ? 1 : -1;
		        let {
		          slides,
		          prevIndex
		        } = this;
		        let dis = Math.abs(distance);
		        let nextIndex = this.getIndex(prevIndex + this.dir);
		        let width = this._getDistance(prevIndex, nextIndex);
		        while (nextIndex !== prevIndex && dis > width) {
		          this.drag -= width * this.dir;
		          prevIndex = nextIndex;
		          dis -= width;
		          nextIndex = this.getIndex(prevIndex + this.dir);
		          width = this._getDistance(prevIndex, nextIndex);
		        }
		        this.percent = dis / width;
		        const prev = slides[prevIndex];
		        const next = slides[nextIndex];
		        const changed = this.index !== nextIndex;
		        const edge = prevIndex === nextIndex;
		        let itemShown;
		        for (const i of [this.index, this.prevIndex]) {
		          if (!includes([nextIndex, prevIndex], i)) {
		            trigger(slides[i], "itemhidden", [this]);
		            if (edge) {
		              itemShown = true;
		              this.prevIndex = prevIndex;
		            }
		          }
		        }
		        if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
		          trigger(slides[this.index], "itemshown", [this]);
		        }
		        if (changed) {
		          this.prevIndex = prevIndex;
		          this.index = nextIndex;
		          !edge && trigger(prev, "beforeitemhide", [this]);
		          trigger(next, "beforeitemshow", [this]);
		        }
		        this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
		        if (changed) {
		          !edge && trigger(prev, "itemhide", [this]);
		          trigger(next, "itemshow", [this]);
		        }
		      },
		      end() {
		        off(document, pointerMove, this.move, pointerOptions);
		        off(document, pointerUp, this.end, pointerUpOptions);
		        if (this.dragging) {
		          this.dragging = null;
		          if (this.index === this.prevIndex) {
		            this.percent = 1 - this.percent;
		            this.dir *= -1;
		            this._show(false, this.index, true);
		            this._transitioner = null;
		          } else {
		            const dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
		            this.index = dirChange ? this.index : this.prevIndex;
		            if (dirChange) {
		              this.percent = 1 - this.percent;
		            }
		            this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? "next" : "previous", true);
		          }
		        }
		        css(this.list, {
		          userSelect: "",
		          pointerEvents: ""
		        });
		        this.drag = this.percent = null;
		      },
		      _getDistance(prev, next) {
		        return this._getTransitioner(prev, prev !== next && next).getDistance() || this.slides[prev].offsetWidth;
		      }
		    }
		  };
		  function hasSelectableText(el) {
		    return css(el, "userSelect") !== "none" && toArray(el.childNodes).some(el2 => el2.nodeType === 3 && el2.textContent.trim());
		  }
		  var SliderAutoplay = {
		    props: {
		      autoplay: Boolean,
		      autoplayInterval: Number,
		      pauseOnHover: Boolean
		    },
		    data: {
		      autoplay: false,
		      autoplayInterval: 7e3,
		      pauseOnHover: true
		    },
		    connected() {
		      attr(this.list, "aria-live", this.autoplay ? "off" : "polite");
		      this.autoplay && this.startAutoplay();
		    },
		    disconnected() {
		      this.stopAutoplay();
		    },
		    update() {
		      attr(this.slides, "tabindex", "-1");
		    },
		    events: [{
		      name: "visibilitychange",
		      el() {
		        return document;
		      },
		      filter() {
		        return this.autoplay;
		      },
		      handler() {
		        if (document.hidden) {
		          this.stopAutoplay();
		        } else {
		          this.startAutoplay();
		        }
		      }
		    }],
		    methods: {
		      startAutoplay() {
		        this.stopAutoplay();
		        this.interval = setInterval(() => {
		          if (!(this.stack.length || this.draggable && matches(this.$el, ":focus-within") || this.pauseOnHover && matches(this.$el, ":hover"))) {
		            this.show("next");
		          }
		        }, this.autoplayInterval);
		      },
		      stopAutoplay() {
		        clearInterval(this.interval);
		      }
		    }
		  };
		  var Slider = {
		    mixins: [SliderAutoplay, SliderDrag, SliderNav, I18n],
		    props: {
		      clsActivated: Boolean,
		      easing: String,
		      index: Number,
		      finite: Boolean,
		      velocity: Number
		    },
		    data: () => ({
		      easing: "ease",
		      finite: false,
		      velocity: 1,
		      index: 0,
		      prevIndex: -1,
		      stack: [],
		      percent: 0,
		      clsActive: "uk-active",
		      clsActivated: false,
		      Transitioner: false,
		      transitionOptions: {}
		    }),
		    connected() {
		      this.prevIndex = -1;
		      this.index = this.getValidIndex(this.$props.index);
		      this.stack = [];
		    },
		    disconnected() {
		      removeClass(this.slides, this.clsActive);
		    },
		    computed: {
		      duration({
		        velocity
		      }, $el) {
		        return speedUp($el.offsetWidth / velocity);
		      },
		      list({
		        selList
		      }, $el) {
		        return $(selList, $el);
		      },
		      maxIndex() {
		        return this.length - 1;
		      },
		      slides() {
		        return children(this.list);
		      },
		      length() {
		        return this.slides.length;
		      }
		    },
		    watch: {
		      slides(slides, prev) {
		        if (prev) {
		          this.$emit();
		        }
		      }
		    },
		    observe: resize(),
		    methods: {
		      show(index, force = false) {
		        var _a;
		        if (this.dragging || !this.length) {
		          return;
		        }
		        const {
		          stack
		        } = this;
		        const queueIndex = force ? 0 : stack.length;
		        const reset = () => {
		          stack.splice(queueIndex, 1);
		          if (stack.length) {
		            this.show(stack.shift(), true);
		          }
		        };
		        stack[force ? "unshift" : "push"](index);
		        if (!force && stack.length > 1) {
		          if (stack.length === 2) {
		            (_a = this._transitioner) == null ? void 0 : _a.forward(Math.min(this.duration, 200));
		          }
		          return;
		        }
		        const prevIndex = this.getIndex(this.index);
		        const prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
		        const nextIndex = this.getIndex(index, this.index);
		        const next = this.slides[nextIndex];
		        if (prev === next) {
		          reset();
		          return;
		        }
		        this.dir = getDirection(index, prevIndex);
		        this.prevIndex = prevIndex;
		        this.index = nextIndex;
		        if (prev && !trigger(prev, "beforeitemhide", [this]) || !trigger(next, "beforeitemshow", [this, prev])) {
		          this.index = this.prevIndex;
		          reset();
		          return;
		        }
		        const promise = this._show(prev, next, force).then(() => {
		          prev && trigger(prev, "itemhidden", [this]);
		          trigger(next, "itemshown", [this]);
		          stack.shift();
		          this._transitioner = null;
		          requestAnimationFrame(() => stack.length && this.show(stack.shift(), true));
		        });
		        prev && trigger(prev, "itemhide", [this]);
		        trigger(next, "itemshow", [this]);
		        return promise;
		      },
		      getIndex(index = this.index, prev = this.index) {
		        return clamp(getIndex(index, this.slides, prev, this.finite), 0, Math.max(0, this.maxIndex));
		      },
		      getValidIndex(index = this.index, prevIndex = this.prevIndex) {
		        return this.getIndex(index, prevIndex);
		      },
		      _show(prev, next, force) {
		        this._transitioner = this._getTransitioner(prev, next, this.dir, {
		          easing: force ? next.offsetWidth < 600 ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "cubic-bezier(0.165, 0.84, 0.44, 1)" : this.easing,
		          ...this.transitionOptions
		        });
		        if (!force && !prev) {
		          this._translate(1);
		          return Promise.resolve();
		        }
		        const {
		          length
		        } = this.stack;
		        return this._transitioner[length > 1 ? "forward" : "show"](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);
		      },
		      _translate(percent, prev = this.prevIndex, next = this.index) {
		        const transitioner = this._getTransitioner(prev === next ? false : prev, next);
		        transitioner.translate(percent);
		        return transitioner;
		      },
		      _getTransitioner(prev = this.prevIndex, next = this.index, dir = this.dir || 1, options = this.transitionOptions) {
		        return new this.Transitioner(this.slides[prev] || prev, this.slides[next] || next, dir * (isRtl ? -1 : 1), options);
		      }
		    }
		  };
		  function getDirection(index, prevIndex) {
		    return index === "next" ? 1 : index === "previous" ? -1 : index < prevIndex ? -1 : 1;
		  }
		  function speedUp(x) {
		    return 0.5 * x + 300;
		  }
		  var Slideshow = {
		    mixins: [Slider],
		    props: {
		      animation: String
		    },
		    data: {
		      animation: "slide",
		      clsActivated: "uk-transition-active",
		      Animations: Animations$2,
		      Transitioner: Transitioner$1
		    },
		    computed: {
		      animation({
		        animation,
		        Animations: Animations2
		      }) {
		        return {
		          ...(Animations2[animation] || Animations2.slide),
		          name: animation
		        };
		      },
		      transitionOptions() {
		        return {
		          animation: this.animation
		        };
		      }
		    },
		    events: {
		      beforeitemshow({
		        target
		      }) {
		        addClass(target, this.clsActive);
		      },
		      itemshown({
		        target
		      }) {
		        addClass(target, this.clsActivated);
		      },
		      itemhidden({
		        target
		      }) {
		        removeClass(target, this.clsActive, this.clsActivated);
		      }
		    }
		  };
		  var LightboxPanel = {
		    mixins: [Modal, Slideshow],
		    functional: true,
		    props: {
		      delayControls: Number,
		      preload: Number,
		      videoAutoplay: Boolean,
		      template: String
		    },
		    data: () => ({
		      preload: 1,
		      videoAutoplay: false,
		      delayControls: 3e3,
		      items: [],
		      cls: "uk-open",
		      clsPage: "uk-lightbox-page",
		      selList: ".uk-lightbox-items",
		      attrItem: "uk-lightbox-item",
		      selClose: ".uk-close-large",
		      selCaption: ".uk-lightbox-caption",
		      pauseOnHover: false,
		      velocity: 2,
		      Animations: Animations$1,
		      template: `<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>`
		    }),
		    created() {
		      const $el = $(this.template);
		      const list = $(this.selList, $el);
		      this.items.forEach(() => append(list, "<li>"));
		      const close = $("[uk-close]", $el);
		      const closeLabel = this.t("close");
		      if (close && closeLabel) {
		        close.dataset.i18n = JSON.stringify({
		          label: closeLabel
		        });
		      }
		      this.$mount(append(this.container, $el));
		    },
		    computed: {
		      caption({
		        selCaption
		      }, $el) {
		        return $(selCaption, $el);
		      }
		    },
		    events: [{
		      name: `${pointerMove$1} ${pointerDown$1} keydown`,
		      handler: "showControls"
		    }, {
		      name: "click",
		      self: true,
		      delegate() {
		        return `${this.selList} > *`;
		      },
		      handler(e) {
		        if (!e.defaultPrevented) {
		          this.hide();
		        }
		      }
		    }, {
		      name: "shown",
		      self: true,
		      handler() {
		        this.showControls();
		      }
		    }, {
		      name: "hide",
		      self: true,
		      handler() {
		        this.hideControls();
		        removeClass(this.slides, this.clsActive);
		        Transition.stop(this.slides);
		      }
		    }, {
		      name: "hidden",
		      self: true,
		      handler() {
		        this.$destroy(true);
		      }
		    }, {
		      name: "keyup",
		      el() {
		        return document;
		      },
		      handler({
		        keyCode
		      }) {
		        if (!this.isToggled(this.$el) || !this.draggable) {
		          return;
		        }
		        let i = -1;
		        if (keyCode === keyMap.LEFT) {
		          i = "previous";
		        } else if (keyCode === keyMap.RIGHT) {
		          i = "next";
		        } else if (keyCode === keyMap.HOME) {
		          i = 0;
		        } else if (keyCode === keyMap.END) {
		          i = "last";
		        }
		        if (~i) {
		          this.show(i);
		        }
		      }
		    }, {
		      name: "beforeitemshow",
		      handler(e) {
		        if (this.isToggled()) {
		          return;
		        }
		        this.draggable = false;
		        e.preventDefault();
		        this.toggleElement(this.$el, true, false);
		        this.animation = Animations$1["scale"];
		        removeClass(e.target, this.clsActive);
		        this.stack.splice(1, 0, this.index);
		      }
		    }, {
		      name: "itemshow",
		      handler() {
		        html(this.caption, this.getItem().caption || "");
		        for (let j = -this.preload; j <= this.preload; j++) {
		          this.loadItem(this.index + j);
		        }
		      }
		    }, {
		      name: "itemshown",
		      handler() {
		        this.draggable = this.$props.draggable;
		      }
		    }, {
		      name: "itemload",
		      async handler(_, item) {
		        const {
		          source: src,
		          type,
		          alt = "",
		          poster,
		          attrs = {}
		        } = item;
		        this.setItem(item, "<span uk-spinner></span>");
		        if (!src) {
		          return;
		        }
		        let matches;
		        const iframeAttrs = {
		          allowfullscreen: "",
		          style: "max-width: 100%; box-sizing: border-box;",
		          "uk-responsive": "",
		          "uk-video": `${this.videoAutoplay}`
		        };
		        if (type === "image" || src.match(/\.(avif|jpe?g|jfif|a?png|gif|svg|webp)($|\?)/i)) {
		          const img = createEl("img", {
		            src,
		            alt,
		            ...attrs
		          });
		          on(img, "load", () => this.setItem(item, img));
		          on(img, "error", () => this.setError(item));
		        } else if (type === "video" || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {
		          const video = createEl("video", {
		            src,
		            poster,
		            controls: "",
		            playsinline: "",
		            "uk-video": `${this.videoAutoplay}`,
		            ...attrs
		          });
		          on(video, "loadedmetadata", () => this.setItem(item, video));
		          on(video, "error", () => this.setError(item));
		        } else if (type === "iframe" || src.match(/\.(html|php)($|\?)/i)) {
		          this.setItem(item, createEl("iframe", {
		            src,
		            allowfullscreen: "",
		            class: "uk-lightbox-iframe",
		            ...attrs
		          }));
		        } else if (matches = src.match(/\/\/(?:.*?youtube(-nocookie)?\..*?(?:[?&]v=|\/shorts\/)|youtu\.be\/)([\w-]{11})[&?]?(.*)?/)) {
		          this.setItem(item, createEl("iframe", {
		            src: `https://www.youtube${matches[1] || ""}.com/embed/${matches[2]}${matches[3] ? `?${matches[3]}` : ""}`,
		            width: 1920,
		            height: 1080,
		            ...iframeAttrs,
		            ...attrs
		          }));
		        } else if (matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/)) {
		          try {
		            const {
		              height,
		              width
		            } = await (await fetch(`https://vimeo.com/api/oembed.json?maxwidth=1920&url=${encodeURI(src)}`, {
		              credentials: "omit"
		            })).json();
		            this.setItem(item, createEl("iframe", {
		              src: `https://player.vimeo.com/video/${matches[1]}${matches[2] ? `?${matches[2]}` : ""}`,
		              width,
		              height,
		              ...iframeAttrs,
		              ...attrs
		            }));
		          } catch (e) {
		            this.setError(item);
		          }
		        }
		      }
		    }],
		    methods: {
		      loadItem(index = this.index) {
		        const item = this.getItem(index);
		        if (!this.getSlide(item).childElementCount) {
		          trigger(this.$el, "itemload", [item]);
		        }
		      },
		      getItem(index = this.index) {
		        return this.items[getIndex(index, this.slides)];
		      },
		      setItem(item, content) {
		        trigger(this.$el, "itemloaded", [this, html(this.getSlide(item), content)]);
		      },
		      getSlide(item) {
		        return this.slides[this.items.indexOf(item)];
		      },
		      setError(item) {
		        this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
		      },
		      showControls() {
		        clearTimeout(this.controlsTimer);
		        this.controlsTimer = setTimeout(this.hideControls, this.delayControls);
		        addClass(this.$el, "uk-active", "uk-transition-active");
		      },
		      hideControls() {
		        removeClass(this.$el, "uk-active", "uk-transition-active");
		      }
		    }
		  };
		  function createEl(tag, attrs) {
		    const el = fragment(`<${tag}>`);
		    attr(el, attrs);
		    return el;
		  }
		  var lightbox = {
		    install: install$1,
		    props: {
		      toggle: String
		    },
		    data: {
		      toggle: "a"
		    },
		    computed: {
		      toggles({
		        toggle
		      }, $el) {
		        return $$(toggle, $el);
		      }
		    },
		    watch: {
		      toggles(toggles) {
		        this.hide();
		        for (const toggle of toggles) {
		          if (isTag(toggle, "a")) {
		            attr(toggle, "role", "button");
		          }
		        }
		      }
		    },
		    disconnected() {
		      this.hide();
		    },
		    events: {
		      name: "click",
		      delegate() {
		        return `${this.toggle}:not(.uk-disabled)`;
		      },
		      handler(e) {
		        e.preventDefault();
		        this.show(e.current);
		      }
		    },
		    methods: {
		      show(index) {
		        const items = uniqueBy(this.toggles.map(toItem), "source");
		        if (isElement(index)) {
		          const {
		            source
		          } = toItem(index);
		          index = findIndex(items, ({
		            source: src
		          }) => source === src);
		        }
		        this.panel = this.panel || this.$create("lightboxPanel", {
		          ...this.$props,
		          items
		        });
		        on(this.panel.$el, "hidden", () => this.panel = null);
		        return this.panel.show(index);
		      },
		      hide() {
		        var _a;
		        return (_a = this.panel) == null ? void 0 : _a.hide();
		      }
		    }
		  };
		  function install$1(UIkit, Lightbox) {
		    if (!UIkit.lightboxPanel) {
		      UIkit.component("lightboxPanel", LightboxPanel);
		    }
		    assign(Lightbox.props, UIkit.component("lightboxPanel").options.props);
		  }
		  function toItem(el) {
		    const item = {};
		    for (const attr2 of ["href", "caption", "type", "poster", "alt", "attrs"]) {
		      item[attr2 === "href" ? "source" : attr2] = data(el, attr2);
		    }
		    item.attrs = parseOptions(item.attrs);
		    return item;
		  }
		  var notification = {
		    mixins: [Container],
		    functional: true,
		    args: ["message", "status"],
		    data: {
		      message: "",
		      status: "",
		      timeout: 5e3,
		      group: null,
		      pos: "top-center",
		      clsContainer: "uk-notification",
		      clsClose: "uk-notification-close",
		      clsMsg: "uk-notification-message"
		    },
		    install,
		    computed: {
		      marginProp({
		        pos
		      }) {
		        return `margin${startsWith(pos, "top") ? "Top" : "Bottom"}`;
		      },
		      startProps() {
		        return {
		          opacity: 0,
		          [this.marginProp]: -this.$el.offsetHeight
		        };
		      }
		    },
		    created() {
		      const posClass = `${this.clsContainer}-${this.pos}`;
		      let container = $(`.${posClass}`, this.container);
		      if (!container || !isVisible(container)) {
		        container = append(this.container, `<div class="${this.clsContainer} ${posClass}"></div>`);
		      }
		      this.$mount(append(container, `<div class="${this.clsMsg}${this.status ? ` ${this.clsMsg}-${this.status}` : ""}" role="alert"> <a href class="${this.clsClose}" data-uk-close></a> <div>${this.message}</div> </div>`));
		    },
		    async connected() {
		      const margin = toFloat(css(this.$el, this.marginProp));
		      await Transition.start(css(this.$el, this.startProps), {
		        opacity: 1,
		        [this.marginProp]: margin
		      });
		      if (this.timeout) {
		        this.timer = setTimeout(this.close, this.timeout);
		      }
		    },
		    events: {
		      click(e) {
		        if (closest(e.target, 'a[href="#"],a[href=""]')) {
		          e.preventDefault();
		        }
		        this.close();
		      },
		      [pointerEnter]() {
		        if (this.timer) {
		          clearTimeout(this.timer);
		        }
		      },
		      [pointerLeave]() {
		        if (this.timeout) {
		          this.timer = setTimeout(this.close, this.timeout);
		        }
		      }
		    },
		    methods: {
		      async close(immediate) {
		        const removeFn = el => {
		          const container = parent(el);
		          trigger(el, "close", [this]);
		          remove$1(el);
		          if (!(container == null ? void 0 : container.hasChildNodes())) {
		            remove$1(container);
		          }
		        };
		        if (this.timer) {
		          clearTimeout(this.timer);
		        }
		        if (!immediate) {
		          await Transition.start(this.$el, this.startProps);
		        }
		        removeFn(this.$el);
		      }
		    }
		  };
		  function install(UIkit) {
		    UIkit.notification.closeAll = function (group, immediate) {
		      apply(document.body, el => {
		        const notification = UIkit.getComponent(el, "notification");
		        if (notification && (!group || group === notification.group)) {
		          notification.close(immediate);
		        }
		      });
		    };
		  }
		  const props = {
		    x: transformFn,
		    y: transformFn,
		    rotate: transformFn,
		    scale: transformFn,
		    color: colorFn,
		    backgroundColor: colorFn,
		    borderColor: colorFn,
		    blur: filterFn,
		    hue: filterFn,
		    fopacity: filterFn,
		    grayscale: filterFn,
		    invert: filterFn,
		    saturate: filterFn,
		    sepia: filterFn,
		    opacity: cssPropFn,
		    stroke: strokeFn,
		    bgx: backgroundFn,
		    bgy: backgroundFn
		  };
		  const {
		    keys
		  } = Object;
		  var Parallax = {
		    mixins: [Media],
		    props: fillObject(keys(props), "list"),
		    data: fillObject(keys(props), void 0),
		    computed: {
		      props(properties, $el) {
		        const stops = {};
		        for (const prop in properties) {
		          if (prop in props && !isUndefined(properties[prop])) {
		            stops[prop] = properties[prop].slice();
		          }
		        }
		        const result = {};
		        for (const prop in stops) {
		          result[prop] = props[prop](prop, $el, stops[prop], stops);
		        }
		        return result;
		      }
		    },
		    events: {
		      load() {
		        this.$emit();
		      }
		    },
		    methods: {
		      reset() {
		        for (const prop in this.getCss(0)) {
		          css(this.$el, prop, "");
		        }
		      },
		      getCss(percent) {
		        const css2 = {
		          transform: "",
		          filter: ""
		        };
		        for (const prop in this.props) {
		          this.props[prop](css2, clamp(percent));
		        }
		        css2.willChange = Object.keys(css2).filter(key => css2[key] !== "").map(propName).join(",");
		        return css2;
		      }
		    }
		  };
		  function transformFn(prop, el, stops) {
		    let unit = getUnit(stops) || {
		      x: "px",
		      y: "px",
		      rotate: "deg"
		    }[prop] || "";
		    let transformFn2;
		    if (prop === "x" || prop === "y") {
		      prop = `translate${ucfirst(prop)}`;
		      transformFn2 = stop => toFloat(toFloat(stop).toFixed(unit === "px" ? 0 : 6));
		    } else if (prop === "scale") {
		      unit = "";
		      transformFn2 = stop => getUnit([stop]) ? toPx(stop, "width", el, true) / el.offsetWidth : stop;
		    }
		    if (stops.length === 1) {
		      stops.unshift(prop === "scale" ? 1 : 0);
		    }
		    stops = parseStops(stops, transformFn2);
		    return (css2, percent) => {
		      css2.transform += ` ${prop}(${getValue(stops, percent)}${unit})`;
		    };
		  }
		  function colorFn(prop, el, stops) {
		    if (stops.length === 1) {
		      stops.unshift(getCssValue(el, prop, ""));
		    }
		    stops = parseStops(stops, stop => parseColor(el, stop));
		    return (css2, percent) => {
		      const [start, end, p] = getStop(stops, percent);
		      const value = start.map((value2, i) => {
		        value2 += p * (end[i] - value2);
		        return i === 3 ? toFloat(value2) : parseInt(value2, 10);
		      }).join(",");
		      css2[prop] = `rgba(${value})`;
		    };
		  }
		  function parseColor(el, color) {
		    return getCssValue(el, "color", color).split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(toFloat);
		  }
		  function filterFn(prop, el, stops) {
		    if (stops.length === 1) {
		      stops.unshift(0);
		    }
		    const unit = getUnit(stops) || {
		      blur: "px",
		      hue: "deg"
		    }[prop] || "%";
		    prop = {
		      fopacity: "opacity",
		      hue: "hue-rotate"
		    }[prop] || prop;
		    stops = parseStops(stops);
		    return (css2, percent) => {
		      const value = getValue(stops, percent);
		      css2.filter += ` ${prop}(${value + unit})`;
		    };
		  }
		  function cssPropFn(prop, el, stops) {
		    if (stops.length === 1) {
		      stops.unshift(getCssValue(el, prop, ""));
		    }
		    stops = parseStops(stops);
		    return (css2, percent) => {
		      css2[prop] = getValue(stops, percent);
		    };
		  }
		  function strokeFn(prop, el, stops) {
		    if (stops.length === 1) {
		      stops.unshift(0);
		    }
		    const unit = getUnit(stops);
		    const length = getMaxPathLength(el);
		    stops = parseStops(stops.reverse(), stop => {
		      stop = toFloat(stop);
		      return unit === "%" ? stop * length / 100 : stop;
		    });
		    if (!stops.some(([value]) => value)) {
		      return noop;
		    }
		    css(el, "strokeDasharray", length);
		    return (css2, percent) => {
		      css2.strokeDashoffset = getValue(stops, percent);
		    };
		  }
		  function backgroundFn(prop, el, stops, props2) {
		    if (stops.length === 1) {
		      stops.unshift(0);
		    }
		    const attr = prop === "bgy" ? "height" : "width";
		    props2[prop] = parseStops(stops, stop => toPx(stop, attr, el));
		    const bgProps = ["bgx", "bgy"].filter(prop2 => prop2 in props2);
		    if (bgProps.length === 2 && prop === "bgx") {
		      return noop;
		    }
		    if (getCssValue(el, "backgroundSize", "") === "cover") {
		      return backgroundCoverFn(prop, el, stops, props2);
		    }
		    const positions = {};
		    for (const prop2 of bgProps) {
		      positions[prop2] = getBackgroundPos(el, prop2);
		    }
		    return setBackgroundPosFn(bgProps, positions, props2);
		  }
		  function backgroundCoverFn(prop, el, stops, props2) {
		    const dimImage = getBackgroundImageDimensions(el);
		    if (!dimImage.width) {
		      return noop;
		    }
		    const dimEl = {
		      width: el.offsetWidth,
		      height: el.offsetHeight
		    };
		    const bgProps = ["bgx", "bgy"].filter(prop2 => prop2 in props2);
		    const positions = {};
		    for (const prop2 of bgProps) {
		      const values = props2[prop2].map(([value]) => value);
		      const min = Math.min(...values);
		      const max = Math.max(...values);
		      const down = values.indexOf(min) < values.indexOf(max);
		      const diff = max - min;
		      positions[prop2] = `${(down ? -diff : 0) - (down ? min : max)}px`;
		      dimEl[prop2 === "bgy" ? "height" : "width"] += diff;
		    }
		    const dim = Dimensions.cover(dimImage, dimEl);
		    for (const prop2 of bgProps) {
		      const attr = prop2 === "bgy" ? "height" : "width";
		      const overflow = dim[attr] - dimEl[attr];
		      positions[prop2] = `max(${getBackgroundPos(el, prop2)},-${overflow}px) + ${positions[prop2]}`;
		    }
		    const fn = setBackgroundPosFn(bgProps, positions, props2);
		    return (css2, percent) => {
		      fn(css2, percent);
		      css2.backgroundSize = `${dim.width}px ${dim.height}px`;
		      css2.backgroundRepeat = "no-repeat";
		    };
		  }
		  function getBackgroundPos(el, prop) {
		    return getCssValue(el, `background-position-${prop.substr(-1)}`, "");
		  }
		  function setBackgroundPosFn(bgProps, positions, props2) {
		    return function (css2, percent) {
		      for (const prop of bgProps) {
		        const value = getValue(props2[prop], percent);
		        css2[`background-position-${prop.substr(-1)}`] = `calc(${positions[prop]} + ${value}px)`;
		      }
		    };
		  }
		  const dimensions = {};
		  function getBackgroundImageDimensions(el) {
		    const src = css(el, "backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/, "$1");
		    if (dimensions[src]) {
		      return dimensions[src];
		    }
		    const image = new Image();
		    if (src) {
		      image.src = src;
		      if (!image.naturalWidth) {
		        image.onload = () => {
		          dimensions[src] = toDimensions(image);
		          trigger(el, createEvent("load", false));
		        };
		        return toDimensions(image);
		      }
		    }
		    return dimensions[src] = toDimensions(image);
		  }
		  function toDimensions(image) {
		    return {
		      width: image.naturalWidth,
		      height: image.naturalHeight
		    };
		  }
		  function parseStops(stops, fn = toFloat) {
		    const result = [];
		    const {
		      length
		    } = stops;
		    let nullIndex = 0;
		    for (let i = 0; i < length; i++) {
		      let [value, percent] = isString(stops[i]) ? stops[i].trim().split(/ (?![^(]*\))/) : [stops[i]];
		      value = fn(value);
		      percent = percent ? toFloat(percent) / 100 : null;
		      if (i === 0) {
		        if (percent === null) {
		          percent = 0;
		        } else if (percent) {
		          result.push([value, 0]);
		        }
		      } else if (i === length - 1) {
		        if (percent === null) {
		          percent = 1;
		        } else if (percent !== 1) {
		          result.push([value, percent]);
		          percent = 1;
		        }
		      }
		      result.push([value, percent]);
		      if (percent === null) {
		        nullIndex++;
		      } else if (nullIndex) {
		        const leftPercent = result[i - nullIndex - 1][1];
		        const p = (percent - leftPercent) / (nullIndex + 1);
		        for (let j = nullIndex; j > 0; j--) {
		          result[i - j][1] = leftPercent + p * (nullIndex - j + 1);
		        }
		        nullIndex = 0;
		      }
		    }
		    return result;
		  }
		  function getStop(stops, percent) {
		    const index = findIndex(stops.slice(1), ([, targetPercent]) => percent <= targetPercent) + 1;
		    return [stops[index - 1][0], stops[index][0], (percent - stops[index - 1][1]) / (stops[index][1] - stops[index - 1][1])];
		  }
		  function getValue(stops, percent) {
		    const [start, end, p] = getStop(stops, percent);
		    return isNumber(start) ? start + Math.abs(start - end) * p * (start < end ? 1 : -1) : +end;
		  }
		  const unitRe = /^-?\d+(\S+)?/;
		  function getUnit(stops, defaultUnit) {
		    var _a;
		    for (const stop of stops) {
		      const match = (_a = stop.match) == null ? void 0 : _a.call(stop, unitRe);
		      if (match) {
		        return match[1];
		      }
		    }
		    return defaultUnit;
		  }
		  function getCssValue(el, prop, value) {
		    const prev = el.style[prop];
		    const val = css(css(el, prop, value), prop);
		    el.style[prop] = prev;
		    return val;
		  }
		  function fillObject(keys2, value) {
		    return keys2.reduce((data, prop) => {
		      data[prop] = value;
		      return data;
		    }, {});
		  }
		  var parallax = {
		    mixins: [Parallax],
		    props: {
		      target: String,
		      viewport: Number,
		      // Deprecated
		      easing: Number,
		      start: String,
		      end: String
		    },
		    data: {
		      target: false,
		      viewport: 1,
		      easing: 1,
		      start: 0,
		      end: 0
		    },
		    computed: {
		      target({
		        target
		      }, $el) {
		        return getOffsetElement(target && query(target, $el) || $el);
		      },
		      start({
		        start
		      }) {
		        return toPx(start, "height", this.target, true);
		      },
		      end({
		        end,
		        viewport: viewport2
		      }) {
		        return toPx(end || (viewport2 = (1 - viewport2) * 100) && `${viewport2}vh+${viewport2}%`, "height", this.target, true);
		      }
		    },
		    observe: [resize({
		      target: ({
		        $el,
		        target
		      }) => [$el, target, scrollParent(target, true)]
		    }), scroll$1(), viewport()],
		    update: {
		      read({
		        percent
		      }, types) {
		        if (!types.has("scroll")) {
		          percent = false;
		        }
		        if (!isVisible(this.$el)) {
		          return false;
		        }
		        if (!this.matchMedia) {
		          return;
		        }
		        const prev = percent;
		        percent = ease(scrolledOver(this.target, this.start, this.end), this.easing);
		        return {
		          percent,
		          style: prev === percent ? false : this.getCss(percent)
		        };
		      },
		      write({
		        style
		      }) {
		        if (!this.matchMedia) {
		          this.reset();
		          return;
		        }
		        style && css(this.$el, style);
		      },
		      events: ["scroll", "resize"]
		    }
		  };
		  function ease(percent, easing) {
		    return easing >= 0 ? Math.pow(percent, easing + 1) : 1 - Math.pow(1 - percent, 1 - easing);
		  }
		  function getOffsetElement(el) {
		    return el ? "offsetTop" in el ? el : getOffsetElement(parent(el)) : document.documentElement;
		  }
		  var SliderReactive = {
		    update: {
		      write() {
		        if (this.stack.length || this.dragging) {
		          return;
		        }
		        const index = this.getValidIndex(this.index);
		        if (!~this.prevIndex || this.index !== index) {
		          this.show(index);
		        } else {
		          this._translate(1, this.prevIndex, this.index);
		        }
		      },
		      events: ["resize"]
		    }
		  };
		  var SliderPreload = {
		    observe: lazyload({
		      target: ({
		        slides
		      }) => slides,
		      targets: instance => instance.getAdjacentSlides()
		    })
		  };
		  function Transitioner(prev, next, dir, {
		    center,
		    easing,
		    list
		  }) {
		    const from = prev ? getLeft(prev, list, center) : getLeft(next, list, center) + dimensions$1(next).width * dir;
		    const to = next ? getLeft(next, list, center) : from + dimensions$1(prev).width * dir * (isRtl ? -1 : 1);
		    let resolve;
		    return {
		      dir,
		      show(duration, percent = 0, linear) {
		        const timing = linear ? "linear" : easing;
		        duration -= Math.round(duration * clamp(percent, -1, 1));
		        this.translate(percent);
		        percent = prev ? percent : clamp(percent, 0, 1);
		        triggerUpdate(this.getItemIn(), "itemin", {
		          percent,
		          duration,
		          timing,
		          dir
		        });
		        prev && triggerUpdate(this.getItemIn(true), "itemout", {
		          percent: 1 - percent,
		          duration,
		          timing,
		          dir
		        });
		        return new Promise(res => {
		          resolve || (resolve = res);
		          Transition.start(list, {
		            transform: translate(-to * (isRtl ? -1 : 1), "px")
		          }, duration, timing).then(resolve, noop);
		        });
		      },
		      cancel() {
		        return Transition.cancel(list);
		      },
		      reset() {
		        css(list, "transform", "");
		      },
		      async forward(duration, percent = this.percent()) {
		        await this.cancel();
		        return this.show(duration, percent, true);
		      },
		      translate(percent) {
		        const distance = this.getDistance() * dir * (isRtl ? -1 : 1);
		        css(list, "transform", translate(clamp(-to + (distance - distance * percent), -getWidth(list), dimensions$1(list).width) * (isRtl ? -1 : 1), "px"));
		        const actives = this.getActives();
		        const itemIn = this.getItemIn();
		        const itemOut = this.getItemIn(true);
		        percent = prev ? clamp(percent, -1, 1) : 0;
		        for (const slide of children(list)) {
		          const isActive = includes(actives, slide);
		          const isIn = slide === itemIn;
		          const isOut = slide === itemOut;
		          const translateIn = isIn || !isOut && (isActive || dir * (isRtl ? -1 : 1) === -1 ^ getElLeft(slide, list) > getElLeft(prev || next));
		          triggerUpdate(slide, `itemtranslate${translateIn ? "in" : "out"}`, {
		            dir,
		            percent: isOut ? 1 - percent : isIn ? percent : isActive ? 1 : 0
		          });
		        }
		      },
		      percent() {
		        return Math.abs((css(list, "transform").split(",")[4] * (isRtl ? -1 : 1) + from) / (to - from));
		      },
		      getDistance() {
		        return Math.abs(to - from);
		      },
		      getItemIn(out = false) {
		        let actives = this.getActives();
		        let nextActives = inView(list, getLeft(next || prev, list, center));
		        if (out) {
		          const temp = actives;
		          actives = nextActives;
		          nextActives = temp;
		        }
		        return nextActives[findIndex(nextActives, el => !includes(actives, el))];
		      },
		      getActives() {
		        return inView(list, getLeft(prev || next, list, center));
		      }
		    };
		  }
		  function getLeft(el, list, center) {
		    const left = getElLeft(el, list);
		    return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
		  }
		  function getMax(list) {
		    return Math.max(0, getWidth(list) - dimensions$1(list).width);
		  }
		  function getWidth(list) {
		    return sumBy(children(list), el => dimensions$1(el).width);
		  }
		  function centerEl(el, list) {
		    return dimensions$1(list).width / 2 - dimensions$1(el).width / 2;
		  }
		  function getElLeft(el, list) {
		    return el && (position(el).left + (isRtl ? dimensions$1(el).width - dimensions$1(list).width : 0)) * (isRtl ? -1 : 1) || 0;
		  }
		  function inView(list, listLeft) {
		    listLeft -= 1;
		    const listWidth = dimensions$1(list).width;
		    const listRight = listLeft + listWidth + 2;
		    return children(list).filter(slide => {
		      const slideLeft = getElLeft(slide, list);
		      const slideRight = slideLeft + Math.min(dimensions$1(slide).width, listWidth);
		      return slideLeft >= listLeft && slideRight <= listRight;
		    });
		  }
		  function triggerUpdate(el, type, data) {
		    trigger(el, createEvent(type, false, false, data));
		  }
		  var slider = {
		    mixins: [Class, Slider, SliderReactive, SliderPreload],
		    props: {
		      center: Boolean,
		      sets: Boolean
		    },
		    data: {
		      center: false,
		      sets: false,
		      attrItem: "uk-slider-item",
		      selList: ".uk-slider-items",
		      selNav: ".uk-slider-nav",
		      clsContainer: "uk-slider-container",
		      Transitioner
		    },
		    computed: {
		      avgWidth() {
		        return getWidth(this.list) / this.length;
		      },
		      finite({
		        finite
		      }) {
		        return finite || isFinite(this.list, this.center);
		      },
		      maxIndex() {
		        if (!this.finite || this.center && !this.sets) {
		          return this.length - 1;
		        }
		        if (this.center) {
		          return last(this.sets);
		        }
		        let lft = 0;
		        const max = getMax(this.list);
		        const index = findIndex(this.slides, el => {
		          if (lft >= max) {
		            return true;
		          }
		          lft += dimensions$1(el).width;
		        });
		        return ~index ? index : this.length - 1;
		      },
		      sets({
		        sets: enabled
		      }) {
		        if (!enabled) {
		          return;
		        }
		        let left = 0;
		        const sets = [];
		        const width = dimensions$1(this.list).width;
		        for (let i = 0; i < this.length; i++) {
		          const slideWidth = dimensions$1(this.slides[i]).width;
		          if (left + slideWidth > width) {
		            left = 0;
		          }
		          if (this.center) {
		            if (left < width / 2 && left + slideWidth + dimensions$1(getIndex(+i + 1, this.slides)).width / 2 > width / 2) {
		              sets.push(+i);
		              left = width / 2 - slideWidth / 2;
		            }
		          } else if (left === 0) {
		            sets.push(Math.min(+i, this.maxIndex));
		          }
		          left += slideWidth;
		        }
		        if (sets.length) {
		          return sets;
		        }
		      },
		      transitionOptions() {
		        return {
		          center: this.center,
		          list: this.list
		        };
		      },
		      slides() {
		        return children(this.list).filter(isVisible);
		      }
		    },
		    connected() {
		      toggleClass(this.$el, this.clsContainer, !$(`.${this.clsContainer}`, this.$el));
		    },
		    observe: resize({
		      target: ({
		        slides
		      }) => slides
		    }),
		    update: {
		      write() {
		        for (const el of this.navItems) {
		          const index = toNumber(data(el, this.attrItem));
		          if (index !== false) {
		            el.hidden = !this.maxIndex || index > this.maxIndex || this.sets && !includes(this.sets, index);
		          }
		        }
		        if (this.length && !this.dragging && !this.stack.length) {
		          this.reorder();
		          this._translate(1);
		        }
		        this.updateActiveClasses();
		      },
		      events: ["resize"]
		    },
		    events: {
		      beforeitemshow(e) {
		        if (!this.dragging && this.sets && this.stack.length < 2 && !includes(this.sets, this.index)) {
		          this.index = this.getValidIndex();
		        }
		        const diff = Math.abs(this.index - this.prevIndex + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0));
		        if (!this.dragging && diff > 1) {
		          for (let i = 0; i < diff; i++) {
		            this.stack.splice(1, 0, this.dir > 0 ? "next" : "previous");
		          }
		          e.preventDefault();
		          return;
		        }
		        const index = this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex;
		        this.duration = speedUp(this.avgWidth / this.velocity) * (dimensions$1(this.slides[index]).width / this.avgWidth);
		        this.reorder();
		      },
		      itemshow() {
		        if (~this.prevIndex) {
		          addClass(this._getTransitioner().getItemIn(), this.clsActive);
		        }
		      },
		      itemshown() {
		        this.updateActiveClasses();
		      }
		    },
		    methods: {
		      reorder() {
		        if (this.finite) {
		          css(this.slides, "order", "");
		          return;
		        }
		        const index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;
		        this.slides.forEach((slide, i) => css(slide, "order", this.dir > 0 && i < index ? 1 : this.dir < 0 && i >= this.index ? -1 : ""));
		        if (!this.center) {
		          return;
		        }
		        const next = this.slides[index];
		        let width = dimensions$1(this.list).width / 2 - dimensions$1(next).width / 2;
		        let j = 0;
		        while (width > 0) {
		          const slideIndex = this.getIndex(--j + index, index);
		          const slide = this.slides[slideIndex];
		          css(slide, "order", slideIndex > index ? -2 : -1);
		          width -= dimensions$1(slide).width;
		        }
		      },
		      updateActiveClasses() {
		        const actives = this._getTransitioner(this.index).getActives();
		        const activeClasses = [this.clsActive, (!this.sets || includes(this.sets, toFloat(this.index))) && this.clsActivated || ""];
		        for (const slide of this.slides) {
		          const active = includes(actives, slide);
		          toggleClass(slide, activeClasses, active);
		          attr(slide, "aria-hidden", !active);
		          for (const focusable of $$(selFocusable, slide)) {
		            if (!hasOwn(focusable, "_tabindex")) {
		              focusable._tabindex = attr(focusable, "tabindex");
		            }
		            attr(focusable, "tabindex", active ? focusable._tabindex : -1);
		          }
		        }
		      },
		      getValidIndex(index = this.index, prevIndex = this.prevIndex) {
		        index = this.getIndex(index, prevIndex);
		        if (!this.sets) {
		          return index;
		        }
		        let prev;
		        do {
		          if (includes(this.sets, index)) {
		            return index;
		          }
		          prev = index;
		          index = this.getIndex(index + this.dir, prevIndex);
		        } while (index !== prev);
		        return index;
		      },
		      getAdjacentSlides() {
		        const {
		          width
		        } = dimensions$1(this.list);
		        const left = -width;
		        const right = width * 2;
		        const slideWidth = dimensions$1(this.slides[this.index]).width;
		        const slideLeft = this.center ? width / 2 - slideWidth / 2 : 0;
		        const slides = /* @__PURE__ */new Set();
		        for (const i of [-1, 1]) {
		          let currentLeft = slideLeft + (i > 0 ? slideWidth : 0);
		          let j = 0;
		          do {
		            const slide = this.slides[this.getIndex(this.index + i + j++ * i)];
		            currentLeft += dimensions$1(slide).width * i;
		            slides.add(slide);
		          } while (this.length > j && currentLeft > left && currentLeft < right);
		        }
		        return Array.from(slides);
		      }
		    }
		  };
		  function isFinite(list, center) {
		    if (!list || list.length < 2) {
		      return true;
		    }
		    const {
		      width: listWidth
		    } = dimensions$1(list);
		    if (!center) {
		      return Math.ceil(getWidth(list)) < Math.trunc(listWidth + getMaxElWidth(list));
		    }
		    const slides = children(list);
		    const listHalf = Math.trunc(listWidth / 2);
		    for (const index in slides) {
		      const slide = slides[index];
		      const slideWidth = dimensions$1(slide).width;
		      const slidesInView = /* @__PURE__ */new Set([slide]);
		      let diff = 0;
		      for (const i of [-1, 1]) {
		        let left = slideWidth / 2;
		        let j = 0;
		        while (left < listHalf) {
		          const nextSlide = slides[getIndex(+index + i + j++ * i, slides)];
		          if (slidesInView.has(nextSlide)) {
		            return true;
		          }
		          left += dimensions$1(nextSlide).width;
		          slidesInView.add(nextSlide);
		        }
		        diff = Math.max(diff, slideWidth / 2 + dimensions$1(slides[getIndex(+index + i, slides)]).width / 2 - (left - listHalf));
		      }
		      if (diff > sumBy(slides.filter(slide2 => !slidesInView.has(slide2)), slide2 => dimensions$1(slide2).width)) {
		        return true;
		      }
		    }
		    return false;
		  }
		  function getMaxElWidth(list) {
		    return Math.max(0, ...children(list).map(el => dimensions$1(el).width));
		  }
		  var sliderParallax = {
		    mixins: [Parallax],
		    data: {
		      selItem: "!li"
		    },
		    beforeConnect() {
		      this.item = query(this.selItem, this.$el);
		    },
		    disconnected() {
		      this.item = null;
		    },
		    events: [{
		      name: "itemin itemout",
		      self: true,
		      el() {
		        return this.item;
		      },
		      handler({
		        type,
		        detail: {
		          percent,
		          duration,
		          timing,
		          dir
		        }
		      }) {
		        fastdom.read(() => {
		          if (!this.matchMedia) {
		            return;
		          }
		          const propsFrom = this.getCss(getCurrentPercent(type, dir, percent));
		          const propsTo = this.getCss(isIn(type) ? 0.5 : dir > 0 ? 1 : 0);
		          fastdom.write(() => {
		            css(this.$el, propsFrom);
		            Transition.start(this.$el, propsTo, duration, timing).catch(noop);
		          });
		        });
		      }
		    }, {
		      name: "transitioncanceled transitionend",
		      self: true,
		      el() {
		        return this.item;
		      },
		      handler() {
		        Transition.cancel(this.$el);
		      }
		    }, {
		      name: "itemtranslatein itemtranslateout",
		      self: true,
		      el() {
		        return this.item;
		      },
		      handler({
		        type,
		        detail: {
		          percent,
		          dir
		        }
		      }) {
		        fastdom.read(() => {
		          if (!this.matchMedia) {
		            this.reset();
		            return;
		          }
		          const props = this.getCss(getCurrentPercent(type, dir, percent));
		          fastdom.write(() => css(this.$el, props));
		        });
		      }
		    }]
		  };
		  function isIn(type) {
		    return endsWith(type, "in");
		  }
		  function getCurrentPercent(type, dir, percent) {
		    percent /= 2;
		    return isIn(type) ^ dir < 0 ? percent : 1 - percent;
		  }
		  var Animations = {
		    ...Animations$2,
		    fade: {
		      show() {
		        return [{
		          opacity: 0,
		          zIndex: 0
		        }, {
		          zIndex: -1
		        }];
		      },
		      percent(current) {
		        return 1 - css(current, "opacity");
		      },
		      translate(percent) {
		        return [{
		          opacity: 1 - percent,
		          zIndex: 0
		        }, {
		          zIndex: -1
		        }];
		      }
		    },
		    scale: {
		      show() {
		        return [{
		          opacity: 0,
		          transform: scale3d(1 + 0.5),
		          zIndex: 0
		        }, {
		          zIndex: -1
		        }];
		      },
		      percent(current) {
		        return 1 - css(current, "opacity");
		      },
		      translate(percent) {
		        return [{
		          opacity: 1 - percent,
		          transform: scale3d(1 + 0.5 * percent),
		          zIndex: 0
		        }, {
		          zIndex: -1
		        }];
		      }
		    },
		    pull: {
		      show(dir) {
		        return dir < 0 ? [{
		          transform: translate(30),
		          zIndex: -1
		        }, {
		          transform: translate(),
		          zIndex: 0
		        }] : [{
		          transform: translate(-100),
		          zIndex: 0
		        }, {
		          transform: translate(),
		          zIndex: -1
		        }];
		      },
		      percent(current, next, dir) {
		        return dir < 0 ? 1 - translated(next) : translated(current);
		      },
		      translate(percent, dir) {
		        return dir < 0 ? [{
		          transform: translate(30 * percent),
		          zIndex: -1
		        }, {
		          transform: translate(-100 * (1 - percent)),
		          zIndex: 0
		        }] : [{
		          transform: translate(-percent * 100),
		          zIndex: 0
		        }, {
		          transform: translate(30 * (1 - percent)),
		          zIndex: -1
		        }];
		      }
		    },
		    push: {
		      show(dir) {
		        return dir < 0 ? [{
		          transform: translate(100),
		          zIndex: 0
		        }, {
		          transform: translate(),
		          zIndex: -1
		        }] : [{
		          transform: translate(-30),
		          zIndex: -1
		        }, {
		          transform: translate(),
		          zIndex: 0
		        }];
		      },
		      percent(current, next, dir) {
		        return dir > 0 ? 1 - translated(next) : translated(current);
		      },
		      translate(percent, dir) {
		        return dir < 0 ? [{
		          transform: translate(percent * 100),
		          zIndex: 0
		        }, {
		          transform: translate(-30 * (1 - percent)),
		          zIndex: -1
		        }] : [{
		          transform: translate(-30 * percent),
		          zIndex: -1
		        }, {
		          transform: translate(100 * (1 - percent)),
		          zIndex: 0
		        }];
		      }
		    }
		  };
		  var slideshow = {
		    mixins: [Class, Slideshow, SliderReactive, SliderPreload],
		    props: {
		      ratio: String,
		      minHeight: Number,
		      maxHeight: Number
		    },
		    data: {
		      ratio: "16:9",
		      minHeight: false,
		      maxHeight: false,
		      selList: ".uk-slideshow-items",
		      attrItem: "uk-slideshow-item",
		      selNav: ".uk-slideshow-nav",
		      Animations
		    },
		    update: {
		      read() {
		        if (!this.list) {
		          return false;
		        }
		        let [width, height] = this.ratio.split(":").map(Number);
		        height = height * this.list.offsetWidth / width || 0;
		        if (this.minHeight) {
		          height = Math.max(this.minHeight, height);
		        }
		        if (this.maxHeight) {
		          height = Math.min(this.maxHeight, height);
		        }
		        return {
		          height: height - boxModelAdjust(this.list, "height", "content-box")
		        };
		      },
		      write({
		        height
		      }) {
		        height > 0 && css(this.list, "minHeight", height);
		      },
		      events: ["resize"]
		    },
		    methods: {
		      getAdjacentSlides() {
		        return [1, -1].map(i => this.slides[this.getIndex(this.index + i)]);
		      }
		    }
		  };
		  var sortable = {
		    mixins: [Class, Animate],
		    props: {
		      group: String,
		      threshold: Number,
		      clsItem: String,
		      clsPlaceholder: String,
		      clsDrag: String,
		      clsDragState: String,
		      clsBase: String,
		      clsNoDrag: String,
		      clsEmpty: String,
		      clsCustom: String,
		      handle: String
		    },
		    data: {
		      group: false,
		      threshold: 5,
		      clsItem: "uk-sortable-item",
		      clsPlaceholder: "uk-sortable-placeholder",
		      clsDrag: "uk-sortable-drag",
		      clsDragState: "uk-drag",
		      clsBase: "uk-sortable",
		      clsNoDrag: "uk-sortable-nodrag",
		      clsEmpty: "uk-sortable-empty",
		      clsCustom: "",
		      handle: false,
		      pos: {}
		    },
		    created() {
		      for (const key of ["init", "start", "move", "end"]) {
		        const fn = this[key];
		        this[key] = e => {
		          assign(this.pos, getEventPos(e));
		          fn(e);
		        };
		      }
		    },
		    events: {
		      name: pointerDown$1,
		      passive: false,
		      handler: "init"
		    },
		    computed: {
		      target() {
		        return (this.$el.tBodies || [this.$el])[0];
		      },
		      items() {
		        return children(this.target);
		      },
		      isEmpty() {
		        return isEmpty(this.items);
		      },
		      handles({
		        handle
		      }, el) {
		        return handle ? $$(handle, el) : this.items;
		      }
		    },
		    watch: {
		      isEmpty(empty) {
		        toggleClass(this.target, this.clsEmpty, empty);
		      },
		      handles(handles, prev) {
		        css(prev, {
		          touchAction: "",
		          userSelect: ""
		        });
		        css(handles, {
		          touchAction: hasTouch ? "none" : "",
		          userSelect: "none"
		        });
		      }
		    },
		    update: {
		      write(data) {
		        if (!this.drag || !parent(this.placeholder)) {
		          return;
		        }
		        const {
		          pos: {
		            x,
		            y
		          },
		          origin: {
		            offsetTop,
		            offsetLeft
		          },
		          placeholder
		        } = this;
		        css(this.drag, {
		          top: y - offsetTop,
		          left: x - offsetLeft
		        });
		        const sortable = this.getSortable(document.elementFromPoint(x, y));
		        if (!sortable) {
		          return;
		        }
		        const {
		          items
		        } = sortable;
		        if (items.some(Transition.inProgress)) {
		          return;
		        }
		        const target = findTarget(items, {
		          x,
		          y
		        });
		        if (items.length && (!target || target === placeholder)) {
		          return;
		        }
		        const previous = this.getSortable(placeholder);
		        const insertTarget = findInsertTarget(sortable.target, target, placeholder, x, y, sortable === previous && data.moved !== target);
		        if (insertTarget === false) {
		          return;
		        }
		        if (insertTarget && placeholder === insertTarget) {
		          return;
		        }
		        if (sortable !== previous) {
		          previous.remove(placeholder);
		          data.moved = target;
		        } else {
		          delete data.moved;
		        }
		        sortable.insert(placeholder, insertTarget);
		        this.touched.add(sortable);
		      },
		      events: ["move"]
		    },
		    methods: {
		      init(e) {
		        const {
		          target,
		          button,
		          defaultPrevented
		        } = e;
		        const [placeholder] = this.items.filter(el => within(target, el));
		        if (!placeholder || defaultPrevented || button > 0 || isInput(target) || within(target, `.${this.clsNoDrag}`) || this.handle && !within(target, this.handle)) {
		          return;
		        }
		        e.preventDefault();
		        this.touched = /* @__PURE__ */new Set([this]);
		        this.placeholder = placeholder;
		        this.origin = {
		          target,
		          index: index(placeholder),
		          ...this.pos
		        };
		        on(document, pointerMove$1, this.move);
		        on(document, pointerUp$1, this.end);
		        if (!this.threshold) {
		          this.start(e);
		        }
		      },
		      start(e) {
		        this.drag = appendDrag(this.$container, this.placeholder);
		        const {
		          left,
		          top
		        } = this.placeholder.getBoundingClientRect();
		        assign(this.origin, {
		          offsetLeft: this.pos.x - left,
		          offsetTop: this.pos.y - top
		        });
		        addClass(this.drag, this.clsDrag, this.clsCustom);
		        addClass(this.placeholder, this.clsPlaceholder);
		        addClass(this.items, this.clsItem);
		        addClass(document.documentElement, this.clsDragState);
		        trigger(this.$el, "start", [this, this.placeholder]);
		        trackScroll(this.pos);
		        this.move(e);
		      },
		      move(e) {
		        if (this.drag) {
		          this.$emit("move");
		        } else if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
		          this.start(e);
		        }
		      },
		      end() {
		        off(document, pointerMove$1, this.move);
		        off(document, pointerUp$1, this.end);
		        if (!this.drag) {
		          return;
		        }
		        untrackScroll();
		        const sortable = this.getSortable(this.placeholder);
		        if (this === sortable) {
		          if (this.origin.index !== index(this.placeholder)) {
		            trigger(this.$el, "moved", [this, this.placeholder]);
		          }
		        } else {
		          trigger(sortable.$el, "added", [sortable, this.placeholder]);
		          trigger(this.$el, "removed", [this, this.placeholder]);
		        }
		        trigger(this.$el, "stop", [this, this.placeholder]);
		        remove$1(this.drag);
		        this.drag = null;
		        for (const {
		          clsPlaceholder,
		          clsItem
		        } of this.touched) {
		          for (const sortable2 of this.touched) {
		            removeClass(sortable2.items, clsPlaceholder, clsItem);
		          }
		        }
		        this.touched = null;
		        removeClass(document.documentElement, this.clsDragState);
		      },
		      insert(element, target) {
		        addClass(this.items, this.clsItem);
		        const insert = () => target ? before(target, element) : append(this.target, element);
		        this.animate(insert);
		      },
		      remove(element) {
		        if (!within(element, this.target)) {
		          return;
		        }
		        this.animate(() => remove$1(element));
		      },
		      getSortable(element) {
		        do {
		          const sortable = this.$getComponent(element, "sortable");
		          if (sortable && (sortable === this || this.group !== false && sortable.group === this.group)) {
		            return sortable;
		          }
		        } while (element = parent(element));
		      }
		    }
		  };
		  let trackTimer;
		  function trackScroll(pos) {
		    let last = Date.now();
		    trackTimer = setInterval(() => {
		      let {
		        x,
		        y
		      } = pos;
		      y += document.scrollingElement.scrollTop;
		      const dist = (Date.now() - last) * 0.3;
		      last = Date.now();
		      scrollParents(document.elementFromPoint(x, pos.y)).reverse().some(scrollEl => {
		        let {
		          scrollTop: scroll,
		          scrollHeight
		        } = scrollEl;
		        const {
		          top,
		          bottom,
		          height: height2
		        } = offsetViewport(scrollEl);
		        if (top < y && top + 35 > y) {
		          scroll -= dist;
		        } else if (bottom > y && bottom - 35 < y) {
		          scroll += dist;
		        } else {
		          return;
		        }
		        if (scroll > 0 && scroll < scrollHeight - height2) {
		          scrollEl.scrollTop = scroll;
		          return true;
		        }
		      });
		    }, 15);
		  }
		  function untrackScroll() {
		    clearInterval(trackTimer);
		  }
		  function appendDrag(container, element) {
		    let clone;
		    if (isTag(element, "li", "tr")) {
		      clone = $("<div>");
		      append(clone, element.cloneNode(true).children);
		      for (const attribute of element.getAttributeNames()) {
		        attr(clone, attribute, element.getAttribute(attribute));
		      }
		    } else {
		      clone = element.cloneNode(true);
		    }
		    append(container, clone);
		    css(clone, "margin", "0", "important");
		    css(clone, {
		      boxSizing: "border-box",
		      width: element.offsetWidth,
		      height: element.offsetHeight,
		      padding: css(element, "padding")
		    });
		    height(clone.firstElementChild, height(element.firstElementChild));
		    return clone;
		  }
		  function findTarget(items, point) {
		    return items[findIndex(items, item => pointInRect(point, item.getBoundingClientRect()))];
		  }
		  function findInsertTarget(list, target, placeholder, x, y, sameList) {
		    if (!children(list).length) {
		      return;
		    }
		    const rect = target.getBoundingClientRect();
		    if (!sameList) {
		      if (!isHorizontal(list, placeholder)) {
		        return y < rect.top + rect.height / 2 ? target : target.nextElementSibling;
		      }
		      return target;
		    }
		    const placeholderRect = placeholder.getBoundingClientRect();
		    const sameRow = linesIntersect([rect.top, rect.bottom], [placeholderRect.top, placeholderRect.bottom]);
		    const [pointerPos, lengthProp, startProp, endProp] = sameRow ? [x, "width", "left", "right"] : [y, "height", "top", "bottom"];
		    const diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;
		    if (placeholderRect[startProp] < rect[startProp]) {
		      if (diff && pointerPos < rect[startProp] + diff) {
		        return false;
		      }
		      return target.nextElementSibling;
		    }
		    if (diff && pointerPos > rect[endProp] - diff) {
		      return false;
		    }
		    return target;
		  }
		  function isHorizontal(list, placeholder) {
		    const single = children(list).length === 1;
		    if (single) {
		      append(list, placeholder);
		    }
		    const items = children(list);
		    const isHorizontal2 = items.some((el, i) => {
		      const rectA = el.getBoundingClientRect();
		      return items.slice(i + 1).some(el2 => {
		        const rectB = el2.getBoundingClientRect();
		        return !linesIntersect([rectA.left, rectA.right], [rectB.left, rectB.right]);
		      });
		    });
		    if (single) {
		      remove$1(placeholder);
		    }
		    return isHorizontal2;
		  }
		  function linesIntersect(lineA, lineB) {
		    return lineA[1] > lineB[0] && lineB[1] > lineA[0];
		  }
		  var tooltip = {
		    mixins: [Container, Togglable, Position],
		    args: "title",
		    props: {
		      delay: Number,
		      title: String
		    },
		    data: {
		      pos: "top",
		      title: "",
		      delay: 0,
		      animation: ["uk-animation-scale-up"],
		      duration: 100,
		      cls: "uk-active"
		    },
		    beforeConnect() {
		      this.id = generateId(this, {});
		      this._hasTitle = hasAttr(this.$el, "title");
		      attr(this.$el, {
		        title: "",
		        "aria-describedby": this.id
		      });
		      makeFocusable(this.$el);
		    },
		    disconnected() {
		      this.hide();
		      if (!attr(this.$el, "title")) {
		        attr(this.$el, "title", this._hasTitle ? this.title : null);
		      }
		    },
		    methods: {
		      show() {
		        if (this.isToggled(this.tooltip || null) || !this.title) {
		          return;
		        }
		        clearTimeout(this.showTimer);
		        this.showTimer = setTimeout(this._show, this.delay);
		      },
		      async hide() {
		        if (matches(this.$el, "input:focus")) {
		          return;
		        }
		        clearTimeout(this.showTimer);
		        if (this.isToggled(this.tooltip || null)) {
		          await this.toggleElement(this.tooltip, false, false);
		        }
		        remove$1(this.tooltip);
		        this.tooltip = null;
		      },
		      async _show() {
		        this.tooltip = append(this.container, `<div id="${this.id}" class="uk-${this.$options.name}" role="tooltip"> <div class="uk-${this.$options.name}-inner">${this.title}</div> </div>`);
		        on(this.tooltip, "toggled", (e, toggled) => {
		          if (!toggled) {
		            return;
		          }
		          const update = () => this.positionAt(this.tooltip, this.$el);
		          update();
		          const [dir, align] = getAlignment(this.tooltip, this.$el, this.pos);
		          this.origin = this.axis === "y" ? `${flipPosition(dir)}-${align}` : `${align}-${flipPosition(dir)}`;
		          const handlers = [once(document, `keydown ${pointerDown$1}`, this.hide, false, e2 => e2.type === pointerDown$1 && !within(e2.target, this.$el) || e2.type === "keydown" && e2.keyCode === keyMap.ESC), on([document, ...overflowParents(this.$el)], "scroll", update, {
		            passive: true
		          })];
		          once(this.tooltip, "hide", () => handlers.forEach(handler => handler()), {
		            self: true
		          });
		        });
		        if (!(await this.toggleElement(this.tooltip, true))) {
		          this.hide();
		        }
		      }
		    },
		    events: {
		      focus: "show",
		      blur: "hide",
		      [`${pointerEnter} ${pointerLeave}`](e) {
		        if (!isTouch(e)) {
		          this[e.type === pointerEnter ? "show" : "hide"]();
		        }
		      },
		      // Clicking a button does not give it focus on all browsers and platforms
		      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
		      [pointerDown$1](e) {
		        if (isTouch(e)) {
		          this.show();
		        }
		      }
		    }
		  };
		  function makeFocusable(el) {
		    if (!isFocusable(el)) {
		      attr(el, "tabindex", "0");
		    }
		  }
		  function getAlignment(el, target, [dir, align]) {
		    const elOffset = offset(el);
		    const targetOffset = offset(target);
		    const properties = [["left", "right"], ["top", "bottom"]];
		    for (const props2 of properties) {
		      if (elOffset[props2[0]] >= targetOffset[props2[1]]) {
		        dir = props2[1];
		        break;
		      }
		      if (elOffset[props2[1]] <= targetOffset[props2[0]]) {
		        dir = props2[0];
		        break;
		      }
		    }
		    const props = includes(properties[0], dir) ? properties[1] : properties[0];
		    if (elOffset[props[0]] === targetOffset[props[0]]) {
		      align = props[0];
		    } else if (elOffset[props[1]] === targetOffset[props[1]]) {
		      align = props[1];
		    } else {
		      align = "center";
		    }
		    return [dir, align];
		  }
		  var upload = {
		    mixins: [I18n],
		    i18n: {
		      invalidMime: "Invalid File Type: %s",
		      invalidName: "Invalid File Name: %s",
		      invalidSize: "Invalid File Size: %s Kilobytes Max"
		    },
		    props: {
		      allow: String,
		      clsDragover: String,
		      concurrent: Number,
		      maxSize: Number,
		      method: String,
		      mime: String,
		      multiple: Boolean,
		      name: String,
		      params: Object,
		      type: String,
		      url: String
		    },
		    data: {
		      allow: false,
		      clsDragover: "uk-dragover",
		      concurrent: 1,
		      maxSize: 0,
		      method: "POST",
		      mime: false,
		      multiple: false,
		      name: "files[]",
		      params: {},
		      type: "",
		      url: "",
		      abort: noop,
		      beforeAll: noop,
		      beforeSend: noop,
		      complete: noop,
		      completeAll: noop,
		      error: noop,
		      fail: noop,
		      load: noop,
		      loadEnd: noop,
		      loadStart: noop,
		      progress: noop
		    },
		    events: {
		      change(e) {
		        if (!matches(e.target, 'input[type="file"]')) {
		          return;
		        }
		        e.preventDefault();
		        if (e.target.files) {
		          this.upload(e.target.files);
		        }
		        e.target.value = "";
		      },
		      drop(e) {
		        stop(e);
		        const transfer = e.dataTransfer;
		        if (!(transfer == null ? void 0 : transfer.files)) {
		          return;
		        }
		        removeClass(this.$el, this.clsDragover);
		        this.upload(transfer.files);
		      },
		      dragenter(e) {
		        stop(e);
		      },
		      dragover(e) {
		        stop(e);
		        addClass(this.$el, this.clsDragover);
		      },
		      dragleave(e) {
		        stop(e);
		        removeClass(this.$el, this.clsDragover);
		      }
		    },
		    methods: {
		      async upload(files) {
		        files = toArray(files);
		        if (!files.length) {
		          return;
		        }
		        trigger(this.$el, "upload", [files]);
		        for (const file of files) {
		          if (this.maxSize && this.maxSize * 1e3 < file.size) {
		            this.fail(this.t("invalidSize", this.maxSize));
		            return;
		          }
		          if (this.allow && !match(this.allow, file.name)) {
		            this.fail(this.t("invalidName", this.allow));
		            return;
		          }
		          if (this.mime && !match(this.mime, file.type)) {
		            this.fail(this.t("invalidMime", this.mime));
		            return;
		          }
		        }
		        if (!this.multiple) {
		          files = files.slice(0, 1);
		        }
		        this.beforeAll(this, files);
		        const chunks = chunk(files, this.concurrent);
		        const upload = async files2 => {
		          const data = new FormData();
		          files2.forEach(file => data.append(this.name, file));
		          for (const key in this.params) {
		            data.append(key, this.params[key]);
		          }
		          try {
		            const xhr = await ajax(this.url, {
		              data,
		              method: this.method,
		              responseType: this.type,
		              beforeSend: env => {
		                const {
		                  xhr: xhr2
		                } = env;
		                on(xhr2.upload, "progress", this.progress);
		                for (const type of ["loadStart", "load", "loadEnd", "abort"]) {
		                  on(xhr2, type.toLowerCase(), this[type]);
		                }
		                return this.beforeSend(env);
		              }
		            });
		            this.complete(xhr);
		            if (chunks.length) {
		              await upload(chunks.shift());
		            } else {
		              this.completeAll(xhr);
		            }
		          } catch (e) {
		            this.error(e);
		          }
		        };
		        await upload(chunks.shift());
		      }
		    }
		  };
		  function match(pattern, path) {
		    return path.match(new RegExp(`^${pattern.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.")}$`, "i"));
		  }
		  function chunk(files, size) {
		    const chunks = [];
		    for (let i = 0; i < files.length; i += size) {
		      chunks.push(files.slice(i, i + size));
		    }
		    return chunks;
		  }
		  function stop(e) {
		    e.preventDefault();
		    e.stopPropagation();
		  }
		  function ajax(url, options) {
		    const env = {
		      data: null,
		      method: "GET",
		      headers: {},
		      xhr: new XMLHttpRequest(),
		      beforeSend: noop,
		      responseType: "",
		      ...options
		    };
		    return Promise.resolve().then(() => env.beforeSend(env)).then(() => send(url, env));
		  }
		  function send(url, env) {
		    return new Promise((resolve, reject) => {
		      const {
		        xhr
		      } = env;
		      for (const prop in env) {
		        if (prop in xhr) {
		          try {
		            xhr[prop] = env[prop];
		          } catch (e) {}
		        }
		      }
		      xhr.open(env.method.toUpperCase(), url);
		      for (const header in env.headers) {
		        xhr.setRequestHeader(header, env.headers[header]);
		      }
		      on(xhr, "load", () => {
		        if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
		          resolve(xhr);
		        } else {
		          reject(assign(Error(xhr.statusText), {
		            xhr,
		            status: xhr.status
		          }));
		        }
		      });
		      on(xhr, "error", () => reject(assign(Error("Network Error"), {
		        xhr
		      })));
		      on(xhr, "timeout", () => reject(assign(Error("Network Timeout"), {
		        xhr
		      })));
		      xhr.send(env.data);
		    });
		  }
		  var components = /*#__PURE__*/Object.freeze({
		    __proto__: null,
		    Countdown: countdown,
		    Filter: filter,
		    Lightbox: lightbox,
		    LightboxPanel: LightboxPanel,
		    Notification: notification,
		    Parallax: parallax,
		    Slider: slider,
		    SliderParallax: sliderParallax,
		    Slideshow: slideshow,
		    SlideshowParallax: sliderParallax,
		    Sortable: sortable,
		    Tooltip: tooltip,
		    Upload: upload
		  });
		  each(components, (component, name) => App.component(name, component));
		  return App;
		});
	} (uikit));

	jQuery(function ($) {
	  const navbarToggler = $('#navbarToggler');
	  const searchToggler = $('#searchToggler');
	  const searchInput = $('#searchInput');
	  const searchInputEl = $('#searchInput input');

	  // Mobile Menu Icon
	  $(navbarToggler).on('click', function () {
	    $(this).toggleClass('open');
	  });

	  // Search Menu Icon
	  $(searchToggler).on('click', function (event) {
	    event.preventDefault();
	    if ($(searchInput).is(':visible')) {
	      // If #searchInput is visible, reverse the order
	      $(searchInput).fadeOut(100, function () {
	        $('.menu-col').fadeIn();
	      });
	    } else {
	      // If #searchInput is not visible, execute as before
	      $('.menu-col').fadeToggle(100, function () {
	        $(searchInput).fadeIn();
	        const x = window.scrollX;
	        const y = window.scrollY;
	        $(searchInputEl).focus();
	        window.scrollTo(x, y);
	      });
	    }
	  });

	  // Hide search bar when clicking outside of it
	  $(document).on('click', function (event) {
	    if (searchToggler.is(':visible') && searchInput.is(':visible') && !searchInput.is(event.target) && !searchInput.has(event.target).length) {
	      // Click is outside of #searchInput, hide it and show .menu-col
	      searchInput.fadeOut(100, function () {
	        $('.menu-col').fadeIn();
	      });
	    }
	  });

	  // toTopButton
	  $(window).scroll(function () {
	    if ($(this).scrollTop() > 300) {
	      $('#toTopButton').removeClass('hidden');
	    } else {
	      $('#toTopButton').addClass('hidden');
	    }
	  });

	  // Smoothly scroll back to top when the button is clicked
	  $('#toTopButton').click(function (event) {
	    event.preventDefault();
	    window.scrollTo({
	      top: 0,
	      behavior: 'smooth'
	    });
	  });

	  // Enable linking to Bootstrap tabs
	  window.addEventListener('load', function () {
	    // Check if the URL contains a hash
	    if (window.location.hash) {
	      var targetTab = window.location.hash;
	      $(targetTab + 'Tab').click();
	      // Scroll to targetTab
	      $('html, body').animate({
	        scrollTop: $(targetTab + 'Tab').offset().top - 200
	      }, 200);
	    }
	  });

	  // Home Values – Insert svg inside .home-values
	  $('.home-values').prepend('<img class="position-absolute d-none d-md-block top-50 start-50 translate-middle w-100 mw-100 mx-auto uk-animation-stroke" src="/wp-content/themes/opennorth/images/home-values.svg" uk-svg="stroke-animation: true"><img class="position-absolute d-block d-md-none top-50 start-50 translate-middle w-100 mw-100 mx-auto uk-animation-stroke" src="/wp-content/themes/opennorth/images/home-values-vertical.svg" uk-svg="stroke-animation: true">');

	  // Links – insert svg inside .arrow-link
	  $('.arrow-link a').append('<img class="ms-2" src="/wp-content/themes/opennorth/images/icon-arrow-link.svg">');

	  // Scrollspy Elements
	  $(window).load(function () {
	    $('.scroll-in').attr('uk-scrollspy', 'cls: uk-animation-slide-bottom-medium; delay: 200');
	    $('.fade-in').attr('uk-scrollspy', 'cls: uk-animation-fade; delay: 200');
	    $('.scroll-in-children').attr('uk-scrollspy', 'target: > div; cls: uk-animation-slide-bottom-small; delay: 200');
	  });

	  //////////////////////////
	  //    Ajax Filtering    //
	  //////////////////////////

	  var filterTypes = ['rtype', 'subject', 'area'];

	  // Loop through each filter type
	  filterTypes.forEach(filterType => {
	    // When filterType is clicked
	    $('#' + filterType + 'All').on('click', function () {
	      if ($('#' + filterType + 'All').prop('checked', true)) {
	        // If already checked, prevent unchecking "all"
	        $('#' + filterType + 'All').prop('checked', true);
	      }
	      // Uncheck all input with name filterType
	      $('input[name="' + filterType + '"].subcheck').prop('checked', false);
	    });
	    // When any filterType subcheck is clicked
	    $('input[name="' + filterType + '"].subcheck').on('click', function () {
	      // Uncheck "All" input with name filterType
	      if ($('input[name="' + filterType + '"].subcheck:not(:checked)').length === $('input[name="' + filterType + '"].subcheck').length) {
	        $('#' + filterType + 'All').prop('checked', true);
	      } else {
	        $('#' + filterType + 'All').prop('checked', false);
	      }
	    });
	  });

	  // Filter Resources
	  var currentPage = 1;
	  function filterResources() {
	    var selectedResourceType = $('input[name="rtype"]:checked').map(function () {
	      return $(this).val();
	    }).get();
	    var selectedResourceSubject = $('input[name="subject"]:checked').map(function () {
	      return $(this).val();
	    }).get();
	    var sortOrder = $('#sortResources').val();
	    var searchResourceTerm = $('#resourceSearch').val();
	    $.ajax({
	      url: '/wp-admin/admin-ajax.php',
	      // WordPress provides the 'ajaxurl' global variable
	      type: 'POST',
	      data: {
	        action: 'filter_resources',
	        page: currentPage,
	        rtype: selectedResourceType,
	        subject: selectedResourceSubject,
	        search: searchResourceTerm,
	        sort: sortOrder
	      },
	      beforeSend: function () {
	        $('#filteredResources').html('<div class="my-6 py-6 text-center"><div class="my-lg-6 spinner-grow text-white text-center mx-auto" role="status"><span class="visually-hidden">Loading...</span></div></div>');
	      },
	      success: function (response) {
	        $('#filteredResources').html(response);
	      }
	    });
	  }
	  function changeSortValue() {
	    // If value of sortResources is "ASC", change to "DESC", and vice versa
	    if ($('#sortResources').val() === 'DESC') {
	      $('#sortResources').val('ASC');
	      // if html language is french
	      if ($('html').attr('lang') == 'en-CA') {
	        $('#sortResources span').html('Oldest first');
	      } else if ($('html').attr('lang') == 'fr-CA') {
	        $('#sortResources span').html('Les plus anciens en premier');
	      }
	    } else {
	      $('#sortResources').val('DESC');
	      if ($('html').attr('lang') == 'en-CA') {
	        $('#sortResources span').html('Newest first');
	      } else if ($('html').attr('lang') == 'fr-CA') {
	        $('#sortResources span').html('Les plus récents en premier');
	      }
	    }
	    $('#sortResources img').toggleClass('rotate-180');
	    filterResources();
	  }
	  function filterCourses() {
	    var selectedCourseType = $('input[name="area"]:checked').map(function () {
	      return $(this).val();
	    }).get();
	    var searchCourseTerm = $('#courseSearch').val();
	    $.ajax({
	      url: '/wp-admin/admin-ajax.php',
	      // WordPress provides the 'ajaxurl' global variable
	      type: 'post',
	      data: {
	        action: 'filter_courses',
	        page: currentPage,
	        area: selectedCourseType,
	        search: searchCourseTerm
	      },
	      beforeSend: function () {
	        $('#filteredCourses').html('<div class="my-6 py-6 text-center"><div class="my-lg-6 spinner-grow text-white text-center mx-auto" role="status"><span class="visually-hidden">Loading...</span></div></div>');
	      },
	      success: function (response) {
	        $('#filteredCourses').html(response);
	      }
	    });
	  }

	  // Filter Resources
	  $('#filterResources input[type="checkbox"').on('change', function () {
	    currentPage = 1;
	    filterResources();
	  });
	  $('#filterResources #resourceSearch').on('keydown', function (event) {
	    if (event.keyCode == 13) {
	      filterResources();
	    }
	  });
	  $('#filterResources #buttonSearch').on('click', filterResources);
	  $('#filterResources #sortResources').on('click', changeSortValue);
	  // Pagination handling
	  $(document).on('click', '.resources .pagination a', function (e) {
	    e.preventDefault();
	    $(this).attr('href');
	    currentPage = $(this).attr('data-page'); // Update the page number from pagination links
	    // Scroll to top of Resource list
	    $('html, body').animate({
	      scrollTop: $('#filteredResources').offset().top - 200
	    }, 200);
	    filterResources();
	  });

	  // Filter Courses
	  $('#filterCourses input[type="checkbox"').on('change', function () {
	    currentPage = 1;
	    filterCourses();
	  });
	  $('#filterCourses #courseSearch').on('keydown', function (event) {
	    if (event.keyCode == 13) {
	      filterCourses();
	    }
	  });
	  $('#filterCourses #buttonSearch').on('click', filterCourses);
	  // Pagination handling
	  $(document).on('click', '.courses-list .pagination a', function (e) {
	    e.preventDefault();
	    $(this).attr('href');
	    currentPage = $(this).attr('data-page'); // Update the page number from pagination links
	    // Scroll to top of Resource list
	    $('html, body').animate({
	      scrollTop: $('#filteredCourses').offset().top - 200
	    }, 200);
	    filterCourses();
	  });
	});

	exports.Alert = alert;
	exports.Button = button;
	exports.Carousel = carousel;
	exports.Collapse = collapse;
	exports.Dropdown = dropdown;
	exports.Modal = modal;
	exports.Offcanvas = offcanvas;
	exports.Popover = popover;
	exports.Scrollspy = scrollspy;
	exports.Tab = tab;
	exports.Toast = toast;
	exports.Tooltip = tooltip;

}));
//# sourceMappingURL=child-theme.js.map
