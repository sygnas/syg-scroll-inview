(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@sygnas/throttle')) :
	typeof define === 'function' && define.amd ? define(['@sygnas/throttle'], factory) :
	(global['syg-scroll-inview'] = factory(global.throttle));
}(this, (function (throttle) { 'use strict';

throttle = throttle && throttle.hasOwnProperty('default') ? throttle['default'] : throttle;

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var space = '[' + _stringWs + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = _fails(function () {
    return !!_stringWs[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  _export(_export.P + _export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(_defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

var _stringTrim = exporter;

var $parseInt = _global.parseInt;
var $trim = _stringTrim.trim;

var hex = /^[-+]?0[xX]/;

var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

// 20.1.2.13 Number.parseInt(string, radix)
_export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', { parseInt: _parseInt });

var _parseInt$2 = parseInt;

var _parseInt$4 = createCommonjsModule(function (module) {
module.exports = { "default": _parseInt$2, __esModule: true };
});

var _Number$parseInt = unwrapExports(_parseInt$4);

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$2 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

var _Object$assign = unwrapExports(assign$2);

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$2 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty, __esModule: true };
});

unwrapExports(defineProperty$2);

var createClass = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

var classCallCheck = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

/**
 * Scroll in viewport add data attribute
 * スクロールしてビューポートに入ったらdata属性を与える
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

// デフォルト値
var defaults = {
    offset: 50,
    doc_bottom_offset: 50,
    on_view: function on_view() {}
};

var ATTR_INVIEW = 'data-inview';
var ATTR_INVIEW_OFFSET = 'data-inview-offset';

/**
 * エレメント情報を格納したクラス
 */

var TargetClass = function TargetClass(elm) {
    _classCallCheck(this, TargetClass);

    // ビューポートに入ったかチェックするエレメント
    this.elm = elm;
    // ビューポートの判定オフセット
    this.offset = 0;
    // ドキュメント内の座標
    this.top = 0;
    // ドキュメント内の座標＋エレメント高さ
    this.bottom = 0;
    // 表示したか
    this.is_inview = false;
};

/**
 * in view controller
 */


var _class = function () {

    /**
     * コンストラクタ
     * @param {string} target DOM selector string
     * @param {object} config
     */
    function _class(target, config) {
        _classCallCheck(this, _class);

        this.opt = _Object$assign(defaults, config);
        // 対象エレメントのセレクタ文字列
        this.target_string = target;
        // 対象エレメントと、座標を格納したリスト
        this.target_list = [];
        // 開始したか
        this.is_started = false;
        // ウィンドウの高さ
        this.win_height = 0;
        // ドキュメント全体の高さ
        this.doc_height = 0;
        // 対象エレメントの高さをチェックするための setInterval ID
        this.interval_id = null;
        // スクロールイベント
        this.ev_scroll = null;
        // リサイズイベント
        this.ev_resize = null;

        // ターゲットエレメントを取得
        this.reset_target();
    }

    /**
     * エレメント、top座標、bottom座標を格納したクラスの配列を作り直す
     * @public
     */


    _createClass(_class, [{
        key: 'reset_target',
        value: function reset_target() {
            var _this = this;

            var opt = this.opt;
            this.target_list = [];

            var node_list = document.querySelectorAll(this.target_string);

            get_node_array(node_list).forEach(function (elm) {
                var target = new TargetClass(elm);
                var offset = _Number$parseInt(elm.getAttribute(ATTR_INVIEW_OFFSET), 10);
                target.offset = offset || opt.offset;
                _this.target_list.push(target);
            });
        }

        /**
         * スクロール検知処理を開始
         * @public
         */

    }, {
        key: 'start',
        value: function start() {

            // すでに開始していたら無視
            if (this.is_started) return;

            // 各アイテムの高さをチェック
            this.$_check_element_position();

            // ウィンドウ、ドキュメントの高さをチェック
            this.ev_resize = throttle(50, this.$_check_document_height, this);
            window.addEventListener('resize', this.ev_resize);
            this.$_check_document_height();

            // スクロールイベント
            this.ev_scroll = throttle(40, this.$_check_inview, this);
            window.addEventListener('scroll', this.ev_scroll);
            this.$_check_inview();

            this.is_started = true;
        }

        /**
         * ビューポート判定を全て停める
         * @public
         */

    }, {
        key: 'stop',
        value: function stop() {
            window.removeEventListener('scroll', this.ev_scroll);
            window.removeEventListener('resize', this.ev_resize);
            this.is_started = false;
        }

        /**
         * プライベートメソッド
         */

        /**
         * 対象エレメントの上下座標をチェックして、this.target_list のオブジェクトを更新
         */

    }, {
        key: '$_check_element_position',
        value: function $_check_element_position() {
            this.target_list.forEach(function (target) {
                var elm = target.elm;
                var scroll_top = window.pageYOffset;
                var rect = elm.getBoundingClientRect();
                target.top = scroll_top + rect.top;
                target.bottom = scroll_top + rect.bottom;
            });
        }

        /**
        * ウィンドウをリサイズしたら高さなどをチェック
        */

    }, {
        key: '$_check_document_height',
        value: function $_check_document_height() {
            this.win_height = window.window.innerHeight;
            this.doc_height = document.documentElement.scrollHeight;
        }

        /**
         * スクロール処理
         * 各エレメントが画面内に存在するか
         */

    }, {
        key: '$_check_inview',
        value: function $_check_inview() {
            var _this2 = this;

            var is_all_inview = true;

            // スクロール上位置と下位置
            var scroll_top = window.pageYOffset;
            var scroll_bottom = scroll_top + this.win_height;

            // 場面下端までいったら強制的に全部表示して、scroll処理を止める
            if (this.$_check_arrived_document_bottom(scroll_bottom)) {
                return;
            }

            // 対象エレメントを順にチェック
            // 全てのエレメントが表示されたら is_all_inview が true になる
            this.target_list.forEach(function (target) {
                is_all_inview = _this2.$_check_inview_target(target, scroll_top, scroll_bottom) && is_all_inview;
            });

            // 全てのエレメントが表示されたら処理を止める
            if (is_all_inview) this.stop();
        }

        /**
         * ドキュメント下端までスクロールしたら、強制的に全表示。
         * スクロール検知も止める
         * @param {Number} scroll_bottom 画面の下端座標
         * @return {Boolean} 画面下端までスクロールしたら ture を返す
         */

    }, {
        key: '$_check_arrived_document_bottom',
        value: function $_check_arrived_document_bottom(scroll_bottom) {
            var _this3 = this;

            if (scroll_bottom >= this.doc_height - this.opt.doc_bottom_offset) {

                this.target_list.forEach(function (target) {
                    _this3.$_set_target_visible(target, true);
                });
                this.stop();
                return true;
            }
            return false;
        }

        /**
         * 指定されたターゲットエレメントがビューポートにあるかチェック
         * @param {Object} target エレメント、上下座標を格納したオブジェクト
         * @param {Number} scroll_top ウィンドウのスクロール座標上辺
         * @param {Number} scroll_bottom ウィンドウのスクロール座標下辺
         * @return {Boolean} ビューポートに入って表示したら true を返す
         */

    }, {
        key: '$_check_inview_target',
        value: function $_check_inview_target(target, scroll_top, scroll_bottom) {
            // すでにビューポートに入って表示されていたら無視
            if (target.is_inview) return true;

            // 画面内に入っていたら、通り過ぎていたら data-inview="true" にする
            if (target.top + target.offset <= scroll_bottom) {
                this.$_set_target_visible(target, true);
            }

            return target.is_inview;
        }

        /**
         * ターゲットエレメントの表示・非表示切り替え
         * @param {*} TargetClass ターゲットクラス
         * @param {*} bool 表示は true / 非表示は false
         */

    }, {
        key: '$_set_target_visible',
        value: function $_set_target_visible(target, bool) {
            target.elm.setAttribute(ATTR_INVIEW, bool ? 'true' : 'false');
            target.is_inview = bool;
        }
    }]);

    return _class;
}();

function get_node_array(node_list) {
    return Array.prototype.slice.call(node_list, 0);
}

return _class;

})));
//# sourceMappingURL=scroll-inview.js.map
