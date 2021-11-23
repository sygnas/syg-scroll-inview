/**
 * Scroll in viewport add data attribute
 * スクロールしてビューポートに入ったらdata属性を与える
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
/**
 * in view controller
 */
export default class {
    private targetList;
    private opt;
    /**
     * コンストラクタ
     * ターゲット一覧を精査して、 data-inview-root、data-inview-rootMargin、data-inview-threshold が設定されていないか確認する。
     * 上記属性毎に observer を作成する。
     */
    constructor(target: string, option?: IntersectionObserverInit);
    /**
     * ターゲットとオプションの管理リストを作成
     */
    private initTargetList;
    /**
     * スクロール検知処理を開始
     */
    start(): void;
    /**
     * 画面に入ったら ATTR_INVIEW のdata属性に true を入れる。
     * オブザーバーから監視解除される。
     */
    private observerCallback;
}
