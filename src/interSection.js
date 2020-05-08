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

    this.opt.rootMargin = offset;

    // intersectionObserverのインスタンスを格納するオブジェクト
    const observerList = {};

    // // デフォルトを作成
    const defaultName = this._getObserverName();
    const defaultObserver = this._getObserver();
    observerList[defaultName] = defaultObserver;

    // ターゲットエレメントをオブザーバーに登録
    document.querySelectorAll(this.target_string).forEach(target => {
      this._setTargetObserver(observerList, target);
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
    * エレメントをオブザーバーに登録
    */
   _setTargetObserver (observerList, target) {
      // エレメントの data-inview-margin / data-inview-threshold からパラメーターを取得
      // 該当するデータ属性がなければデフォルト値から
      const rootMargin = target.dataset['inviewMargin'] || this.opt.rootMargin;
      const threshold = target.dataset['inviewThreshold'] || this.opt.threshold;
      const name = this._getObserverName(rootMargin, threshold);
      let observer;

      // 同じ設定の observer が存在しなければ新たに作成
      // 存在するならそれを使う
      if (observerList[name]) {
        observer = observerList[name];
      } else {
        observer = this._getObserver(rootMargin, threshold);
        observerList[name] = observer;
      }

      observer.observe(target);
   }

   /**
    * obserberList に格納するキー名を取得
    */
   _getObserverName (rootMargin = null, threshold = null) {
      const nameMargin = rootMargin || this.opt.rootMargin;
      const nameThreshold = threshold || this.opt.threshold;
      return `${nameMargin}:${nameThreshold}`
   }

   /**
    * IntersectionObserverを生成する
    */
   _getObserver (rootMargin = null, threshold = null) {
     const param = {
       rootMargin: rootMargin || this.opt.rootMargin,
       threshold: threshold || this.opt.threshold,
     };
     return new IntersectionObserver(this._observerCallback, param);
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