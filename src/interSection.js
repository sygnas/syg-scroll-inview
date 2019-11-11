/**
 * intersectionObserver を使う方法
 */

// デフォルト値
const defaults = {
  threshold: 0,
  offset: -50,
};

const ATTR_INVIEW = 'data-inview';
// const ATTR_INVIEW_OFFSET = 'data-inview-offset';


export default class {
  /**
   * コンストラクタ
   * @param {string} target DOM selector string
   * @param {object} config
   */
  constructor(target, config) {
    this.opt = Object.assign(defaults, config);
    // 対象エレメントのセレクタ文字列
    this.target_string = target;
    // 開始したか
    this.is_started = false;
  }

  /**
   * 対象のオブジェクトを取得して、IntersectionObserverに登録する
   */
  start() {
    const offset = String(this.opt.offset).match(/(%|px)$/) ? this.opt.offset : `${this.opt.offset}px`;

    const option = {
      rootMargin: offset,
      threshold: this.opt.threshold,
    };
    const observer = new IntersectionObserver(this._observerCallback, option);

    document.querySelectorAll(this.target_string).forEach(target => {
      observer.observe(target);
    });
  }
  /**
   * 判定を全て停める
   * @public
   */
  stop() {
  }


  /** *******************************
   * プライベートメソッド
   */

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