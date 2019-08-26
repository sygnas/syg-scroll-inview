/**
 * Scroll in viewport add data attribute
 * スクロールしてビューポートに入ったらdata属性を与える
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

import onScroll from './onScroll';
import interSection from './interSection';

/**
 * in view controller
 */
export default class {

    /**
     * コンストラクタ
     * @param {string} target DOM selector string
     * @param {object} config
     */
    constructor(target, config) {
      this.controller = null;

      // IntersectionObserverの対応状況で方法を切り替える
      if (typeof window !== 'object') {
        this.controller = new interSection(target, config);
        return;
      }

      if ('IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
        this.controller = new interSection(target, config);
        return;
      }

      // 対応していなければ scroll イベントを使う
      this.controller = new onScroll(target, config);
    }

    /**
     * スクロール検知処理を開始
     * @public
     */
    start() {
      this.controller.start();
    }

    /**
     * ビューポート判定を全て停める
     * @public
     */
    stop() {
      this.controller.stop();
    }

}


