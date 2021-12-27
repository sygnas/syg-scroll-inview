/**
 * Scroll in viewport add data attribute
 * スクロールしてビューポートに入ったらdata属性を与える
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */


import { TTargetItem, TTargetList, TOnInviewFunc } from "./types";

const ATTR_INVIEW: string = 'data-inview';
const ATTR_ROOT: string = 'data-inview-root';
const ATTR_MARGIN: string = 'data-inview-rootMargin';
const ATTR_THRESHOLD: string = 'data-inview-threshold';

const DEFAULT: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

/**
 * in view controller
 */
export default class {

  public onInviewFunc: TOnInviewFunc | undefined = undefined;
  private targetList: TTargetList;
  private opt: IntersectionObserverInit;

  /**
   * コンストラクタ
   * ターゲット一覧を精査して、 data-inview-root、data-inview-rootMargin、data-inview-threshold が設定されていないか確認する。
   * 上記属性毎に observer を作成する。
   */
  constructor(target: string, option: IntersectionObserverInit = {}) {
    this.targetList = {};
    this.opt = Object.assign(DEFAULT, option);
    this.onInviewFunc = undefined;

    document.querySelectorAll<HTMLElement>(target).forEach((target: HTMLElement)=>{
      this.initTargetList(target);
    });
  }

  /**
   * ターゲットとオプションの管理リストを作成
   */
  private initTargetList(target: HTMLElement): void {
    // 監視対象エレメントに独自指定があればそちらを使う。
    // 無ければオプション設定を使う
    const root = target.getAttribute(ATTR_ROOT) || this.opt.root;
    const rootMargin: string = target.getAttribute(ATTR_MARGIN) || this.opt.rootMargin as string;
    const threshold: number = Number(target.getAttribute(ATTR_THRESHOLD)) || this.opt.threshold as number;
    const key: string = `${root}-${rootMargin}-${threshold}`;

    if (key in this.targetList === false){
      const option: IntersectionObserverInit = {
        root: root as HTMLElement,
        rootMargin: rootMargin,
        threshold: threshold,
      };
      const observer: IntersectionObserver = new IntersectionObserver(this.observerCallback.bind(this), option);

      this.targetList[key] = {
        list: [],
        observer
      };
    }
    this.targetList[key].list.push(target);
  }

  /**
   * スクロール検知処理を開始
   */
   public start(): void {
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
   */
   private observerCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;

      // inviewした時に実行する外部関数
      if(this.onInviewFunc){
        this.onInviewFunc(entry.target);
      }

      observer.unobserve(entry.target);
      entry.target.setAttribute(ATTR_INVIEW, 'true');
    });
  }
}


