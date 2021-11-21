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
    threshold: 0,
};
/**
 * in view controller
 */
var default_1 = /** @class */ (function () {
    /**
     * コンストラクタ
     * ターゲット一覧を精査して、 data-inview-root、data-inview-rootMargin、data-inview-threshold が設定されていないか確認する。
     * 上記属性毎に observer を作成する。
     */
    function default_1(target, option) {
        var _this = this;
        if (option === void 0) { option = {}; }
        this.targetList = {};
        this.opt = Object.assign(DEFAULT, option);
        document.querySelectorAll(target).forEach(function (target) {
            _this.initTargetList(target);
        });
    }
    /**
     * ターゲットとオプションの管理リストを作成
     */
    default_1.prototype.initTargetList = function (target) {
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
                threshold: threshold,
            };
            var observer = new IntersectionObserver(this.observerCallback, option);
            this.targetList[key] = {
                list: [],
                observer: observer
            };
        }
        this.targetList[key].list.push(target);
    };
    /**
     * スクロール検知処理を開始
     */
    default_1.prototype.start = function () {
        var _this = this;
        Object.keys(this.targetList).forEach(function (key) {
            var targetObj = _this.targetList[key];
            targetObj.list.forEach(function (target) {
                targetObj.observer.observe(target);
            });
        });
    };
    /**
     * 画面に入ったら ATTR_INVIEW のdata属性に true を入れる。
     * オブザーバーから監視解除される。
     */
    default_1.prototype.observerCallback = function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting)
                return;
            observer.unobserve(entry.target);
            entry.target.setAttribute(ATTR_INVIEW, 'true');
        });
    };
    return default_1;
}());

export { default_1 as default };
