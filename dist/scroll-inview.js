(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@sygnas/throttle')) :
	typeof define === 'function' && define.amd ? define(['@sygnas/throttle'], factory) :
	(global['syg-scroll-inview'] = factory(global.throttle));
}(this, (function (throttle) { 'use strict';

throttle = throttle && throttle.hasOwnProperty('default') ? throttle['default'] : throttle;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * Scroll in viewport add data attribute
 * スクロールしてビューポートに入ったらdata属性を与える
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

// デフォルト値
var defaults = {
    offset: 50,
    doc_bottom_offset: 50,
    on_view: function on_view() {}
};

var ATTR_INVIEW = 'data-inview';
var ATTR_INVIEW_OFFSET = 'data-inview-offset';

/**
 * エレメント情報を格納したクラス
 */

var TargetClass = function TargetClass(elm) {
    classCallCheck(this, TargetClass);

    // ビューポートに入ったかチェックするエレメント
    this.elm = elm;
    // ビューポートの判定オフセット
    this.offset = 0;
    // ドキュメント内の座標
    this.top = 0;
    // ドキュメント内の座標＋エレメント高さ
    this.bottom = 0;
    // 表示したか
    this.is_inview = false;
};

/**
 * in view controller
 */


var _class = function () {

    /**
     * コンストラクタ
     * @param {string} target DOM selector string
     * @param {object} config
     */
    function _class(target, config) {
        classCallCheck(this, _class);


        this.opt = Object.assign(defaults, config);
        // 対象エレメントのセレクタ文字列
        this.target_string = target;
        // 対象エレメントと、座標を格納したリスト
        this.target_list = [];
        // 開始したか
        this.is_started = false;
        // ウィンドウの高さ
        this.win_height = 0;
        // ドキュメント全体の高さ
        this.doc_height = 0;
        // 対象エレメントの高さをチェックするための setInterval ID
        this.interval_id = null;
        // スクロールイベント
        this.ev_scroll = null;
        // リサイズイベント
        this.ev_resize = null;

        // ターゲットエレメントを取得
        this.reset_target();
    }

    /**
     * エレメント、top座標、bottom座標を格納したクラスの配列を作り直す
     * @public
     */


    createClass(_class, [{
        key: 'reset_target',
        value: function reset_target() {
            var _this = this;

            var opt = this.opt;
            this.target_list = [];

            var node_list = document.querySelectorAll(this.target_string);

            get_node_array(node_list).forEach(function (elm) {
                var target = new TargetClass(elm);
                var offset = Number.parseInt(elm.getAttribute(ATTR_INVIEW_OFFSET), 10);
                target.offset = offset || opt.offset;
                _this.target_list.push(target);
            });
        }

        /**
         * スクロール検知処理を開始
         * @public
         */

    }, {
        key: 'start',
        value: function start() {

            // すでに開始していたら無視
            if (this.is_started) return;

            // 各アイテムの高さをチェック
            this.$_check_element_position();

            // ウィンドウ、ドキュメントの高さをチェック
            this.ev_resize = throttle(50, this.$_check_document_height, this);
            window.addEventListener('resize', this.ev_resize);
            this.$_check_document_height();

            // スクロールイベント
            this.ev_scroll = throttle(40, this.$_check_inview, this);
            window.addEventListener('scroll', this.ev_scroll);
            this.$_check_inview();

            this.is_started = true;
        }

        /**
         * ビューポート判定を全て停める
         * @public
         */

    }, {
        key: 'stop',
        value: function stop() {
            window.removeEventListener('scroll', this.ev_scroll);
            window.removeEventListener('resize', this.ev_resize);
            this.is_started = false;
        }

        /**
         * プライベートメソッド
         */

        /**
         * 対象エレメントの上下座標をチェックして、this.target_list のオブジェクトを更新
         */

    }, {
        key: '$_check_element_position',
        value: function $_check_element_position() {
            this.target_list.forEach(function (target) {
                var elm = target.elm;
                var scroll_top = window.pageYOffset;
                var rect = elm.getBoundingClientRect();
                target.top = scroll_top + rect.top;
                target.bottom = scroll_top + rect.bottom;
            });
        }

        /**
        * ウィンドウをリサイズしたら高さなどをチェック
        */

    }, {
        key: '$_check_document_height',
        value: function $_check_document_height() {
            this.win_height = window.window.innerHeight;
            this.doc_height = document.documentElement.scrollHeight;
        }

        /**
         * スクロール処理
         * 各エレメントが画面内に存在するか
         */

    }, {
        key: '$_check_inview',
        value: function $_check_inview() {
            var _this2 = this;

            var is_all_inview = true;

            // スクロール上位置と下位置
            var scroll_top = window.pageYOffset;
            var scroll_bottom = scroll_top + this.win_height;

            // 場面下端までいったら強制的に全部表示して、scroll処理を止める
            if (this.$_check_arrived_document_bottom(scroll_bottom)) {
                return;
            }

            // 対象エレメントを順にチェック
            // 全てのエレメントが表示されたら is_all_inview が true になる
            this.target_list.forEach(function (target) {
                is_all_inview = _this2.$_check_inview_target(target, scroll_top, scroll_bottom) && is_all_inview;
            });

            // 全てのエレメントが表示されたら処理を止める
            if (is_all_inview) this.stop();
        }

        /**
         * ドキュメント下端までスクロールしたら、強制的に全表示。
         * スクロール検知も止める
         * @param {Number} scroll_bottom 画面の下端座標
         * @return {Boolean} 画面下端までスクロールしたら ture を返す
         */

    }, {
        key: '$_check_arrived_document_bottom',
        value: function $_check_arrived_document_bottom(scroll_bottom) {
            var _this3 = this;

            if (scroll_bottom >= this.doc_height - this.opt.doc_bottom_offset) {

                this.target_list.forEach(function (target) {
                    _this3.$_set_target_visible(target, true);
                });
                this.stop();
                return true;
            }
            return false;
        }

        /**
         * 指定されたターゲットエレメントがビューポートにあるかチェック
         * @param {Object} target エレメント、上下座標を格納したオブジェクト
         * @param {Number} scroll_top ウィンドウのスクロール座標上辺
         * @param {Number} scroll_bottom ウィンドウのスクロール座標下辺
         * @return {Boolean} ビューポートに入って表示したら true を返す
         */

    }, {
        key: '$_check_inview_target',
        value: function $_check_inview_target(target, scroll_top, scroll_bottom) {
            // すでにビューポートに入って表示されていたら無視
            if (target.is_inview) return true;

            // 画面内に入っていたら、通り過ぎていたら data-inview="true" にする
            if (target.top + target.offset <= scroll_bottom) {
                this.$_set_target_visible(target, true);
            }

            return target.is_inview;
        }

        /**
         * ターゲットエレメントの表示・非表示切り替え
         * @param {*} TargetClass ターゲットクラス
         * @param {*} bool 表示は true / 非表示は false
         */

    }, {
        key: '$_set_target_visible',
        value: function $_set_target_visible(target, bool) {
            target.elm.setAttribute(ATTR_INVIEW, bool ? 'true' : 'false');
            target.is_inview = bool;
        }
    }]);
    return _class;
}();

function get_node_array(node_list) {
    return Array.prototype.slice.call(node_list, 0);
}

return _class;

})));
//# sourceMappingURL=scroll-inview.js.map
