/**
 * Scroll in viewport add data attribute
 * スクロールしてビューポートに入ったらdata属性を与える
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

const ATTR_INVIEW = 'data-inview';
const ATTR_ROOT = 'data-inview-root';
const ATTR_MARGIN = 'data-inview-rootMargin';
const ATTR_THRESHOLD = 'data-inview-threshold';

const DEFAULT = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

/**
 * in view controller
 */
export default class {

  /**
   * コンストラクタ
   * ターゲット一覧を精査して、 data-inview-root、data-inview-rootMargin、data-inview-threshold が設定されていないか確認する。
   * 上記属性毎に observer を作成する。
   * @param {string} targetString DOM selector string
   * @param {object} option IntersectionObserver Option
   */
  constructor(targetString, option = {}) {
    this.targetList = {};
    this.option = Object.assign(DEFAULT, option);

    document.querySelectorAll(targetString).forEach((target)=>{
      this.initTargetList(target);
    });
  }

  /**
   * ターゲットとオプションの管理リストを作成
   */
  initTargetList(target) {
    const root = target.getAttribute(ATTR_ROOT) || this.option.root;
    const rootMargin = target.getAttribute(ATTR_MARGIN) || this.option.rootMargin;
    const threshold = target.getAttribute(ATTR_THRESHOLD) || this.option.threshold;
    const key = `${root}-${rootMargin}-${threshold}`;

    if (key in this.targetList === false){
      const option = {
        root: root,
        rootMargin: rootMargin,
        threshold: threshold,
      };
      const observer = new IntersectionObserver(this._observerCallback, option);

      this.targetList[key] = {
        list: [],
        observer
      };
    }

    this.targetList[key].list.push(target);
  }

  /**
   * スクロール検知処理を開始
   * @public
   */
  start() {
    Object.keys(this.targetList).forEach(key => {
      const targetObj = this.targetList[key];

      targetObj.list.forEach(target => {
        targetObj.observer.observe(target);
      });
    });
  }

  /**
   * 画面に入ったら ATTR_INVIEW のdata属性に true を入れる。
   * オブザーバーから監視解除される。
   * @param {*} target
   */
   _observerCallback(entries, object) {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;

      object.unobserve(entry.target);
      entry.target.setAttribute(ATTR_INVIEW, 'true');
    });
  }
}


