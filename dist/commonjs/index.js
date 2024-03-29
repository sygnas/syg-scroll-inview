'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_virtual/_rollupPluginBabelHelpers.js');

/**
 * Scroll in viewport add data attribute
 * スクロールしてビューポートに入ったらdata属性を与える
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
var ATTR_INVIEW = 'data-inview';
var ATTR_ROOT = 'data-inview-root';
var ATTR_MARGIN = 'data-inview-rootMargin';
var ATTR_THRESHOLD = 'data-inview-threshold';
var DEFAULT = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};
/**
 * in view controller
 */

var _default = /*#__PURE__*/function () {
  /**
   * コンストラクタ
   * ターゲット一覧を精査して、 data-inview-root、data-inview-rootMargin、data-inview-threshold が設定されていないか確認する。
   * 上記属性毎に observer を作成する。
   */
  function _default(target) {
    var _this = this;

    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _rollupPluginBabelHelpers.classCallCheck(this, _default);

    _rollupPluginBabelHelpers.defineProperty(this, "onInviewFunc", undefined);

    _rollupPluginBabelHelpers.defineProperty(this, "targetList", void 0);

    _rollupPluginBabelHelpers.defineProperty(this, "opt", void 0);

    this.targetList = {};
    this.opt = Object.assign(DEFAULT, option);
    this.onInviewFunc = undefined;
    document.querySelectorAll(target).forEach(function (target) {
      _this.initTargetList(target);
    });
  }
  /**
   * ターゲットとオプションの管理リストを作成
   */


  _rollupPluginBabelHelpers.createClass(_default, [{
    key: "initTargetList",
    value: function initTargetList(target) {
      // 監視対象エレメントに独自指定があればそちらを使う。
      // 無ければオプション設定を使う
      var root = target.getAttribute(ATTR_ROOT) || this.opt.root;
      var rootMargin = target.getAttribute(ATTR_MARGIN) || this.opt.rootMargin;
      var threshold = Number(target.getAttribute(ATTR_THRESHOLD)) || this.opt.threshold;
      var key = "".concat(root, "-").concat(rootMargin, "-").concat(threshold);

      if (key in this.targetList === false) {
        var option = {
          root: root,
          rootMargin: rootMargin,
          threshold: threshold
        };
        var observer = new IntersectionObserver(this.observerCallback.bind(this), option);
        this.targetList[key] = {
          list: [],
          observer: observer
        };
      }

      this.targetList[key].list.push(target);
    }
    /**
     * スクロール検知処理を開始
     */

  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      Object.keys(this.targetList).forEach(function (key) {
        var targetObj = _this2.targetList[key];
        targetObj.list.forEach(function (target) {
          targetObj.observer.observe(target);
        });
      });
    }
    /**
     * 画面に入ったら ATTR_INVIEW のdata属性に true を入れる。
     * オブザーバーから監視解除される。
     */

  }, {
    key: "observerCallback",
    value: function observerCallback(entries, observer) {
      var _this3 = this;

      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return; // inviewした時に実行する外部関数

        if (_this3.onInviewFunc) {
          _this3.onInviewFunc(entry.target);
        }

        observer.unobserve(entry.target);
        entry.target.setAttribute(ATTR_INVIEW, 'true');
      });
    }
  }]);

  return _default;
}();

exports["default"] = _default;
//# sourceMappingURL=index.js.map
