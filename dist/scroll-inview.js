var sygScrollInview = (function () {
  'use strict';

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

      _classCallCheck(this, _default);

      _defineProperty(this, "targetList", void 0);

      _defineProperty(this, "opt", void 0);

      this.targetList = {};
      this.opt = Object.assign(DEFAULT, option);
      document.querySelectorAll(target).forEach(function (target) {
        _this.initTargetList(target);
      });
    }
    /**
     * ターゲットとオプションの管理リストを作成
     */


    _createClass(_default, [{
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
          var observer = new IntersectionObserver(this.observerCallback, option);
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
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          entry.target.setAttribute(ATTR_INVIEW, 'true');
        });
      }
    }]);

    return _default;
  }();

  return _default;

})();
//# sourceMappingURL=scroll-inview.js.map
