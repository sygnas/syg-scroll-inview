/**
 * Scroll in viewport add data attribute
 * スクロールしてビューポートに入ったらdata属性を与える
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

const ATTR_INVIEW = 'data-inview';

/**
 * in view controller
 */
export default class {

  /**
   * コンストラクタ
   * @param {string} targetString DOM selector string
   * @param {object} option IntersectionObserver Option
   */
  constructor(targetString, option = {}) {
    this.targetString = targetString;
    this.observer = new IntersectionObserver(this._observerCallback, option);
  }

  /**
   * スクロール検知処理を開始
   * @public
   */
  start() {
    document.querySelectorAll(this.targetString).forEach(target => {
      this.observer.observe(target);
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


