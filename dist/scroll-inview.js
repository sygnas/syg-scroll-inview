var sygScrollInview = (function () {
    'use strict';

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

    return default_1;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludmlldy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU2Nyb2xsIGluIHZpZXdwb3J0IGFkZCBkYXRhIGF0dHJpYnV0ZVxuICog44K544Kv44Ot44O844Or44GX44Gm44OT44Ol44O844Od44O844OI44Gr5YWl44Gj44Gf44KJZGF0YeWxnuaAp+OCkuS4juOBiOOCi1xuICpcbiAqIEBhdXRob3IgICBIaXJvc2hpIEZ1a3VkYSA8aW5mby5zeWduYXNAZ21haWwuY29tPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cblxuaW1wb3J0IHsgVFRhcmdldEl0ZW0sIFRUYXJnZXRMaXN0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgQVRUUl9JTlZJRVc6IHN0cmluZyA9ICdkYXRhLWludmlldyc7XG5jb25zdCBBVFRSX1JPT1Q6IHN0cmluZyA9ICdkYXRhLWludmlldy1yb290JztcbmNvbnN0IEFUVFJfTUFSR0lOOiBzdHJpbmcgPSAnZGF0YS1pbnZpZXctcm9vdE1hcmdpbic7XG5jb25zdCBBVFRSX1RIUkVTSE9MRDogc3RyaW5nID0gJ2RhdGEtaW52aWV3LXRocmVzaG9sZCc7XG5cbmNvbnN0IERFRkFVTFQ6IEludGVyc2VjdGlvbk9ic2VydmVySW5pdCA9IHtcbiAgcm9vdDogbnVsbCxcbiAgcm9vdE1hcmdpbjogJzBweCcsXG4gIHRocmVzaG9sZDogMCxcbn07XG5cbi8qKlxuICogaW4gdmlldyBjb250cm9sbGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICBwcml2YXRlIHRhcmdldExpc3Q6IFRUYXJnZXRMaXN0O1xuICBwcml2YXRlIG9wdDogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0O1xuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICog44K/44O844Ky44OD44OI5LiA6Kan44KS57K+5p+744GX44Gm44CBIGRhdGEtaW52aWV3LXJvb3TjgIFkYXRhLWludmlldy1yb290TWFyZ2lu44CBZGF0YS1pbnZpZXctdGhyZXNob2xkIOOBjOioreWumuOBleOCjOOBpuOBhOOBquOBhOOBi+eiuuiqjeOBmeOCi+OAglxuICAgKiDkuIroqJjlsZ7mgKfmr47jgasgb2JzZXJ2ZXIg44KS5L2c5oiQ44GZ44KL44CCXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXQ6IHN0cmluZywgb3B0aW9uOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7fSkge1xuICAgIHRoaXMudGFyZ2V0TGlzdCA9IHt9O1xuICAgIHRoaXMub3B0ID0gT2JqZWN0LmFzc2lnbihERUZBVUxULCBvcHRpb24pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4odGFyZ2V0KS5mb3JFYWNoKCh0YXJnZXQ6IEhUTUxFbGVtZW50KT0+e1xuICAgICAgdGhpcy5pbml0VGFyZ2V0TGlzdCh0YXJnZXQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCv+ODvOOCsuODg+ODiOOBqOOCquODl+OCt+ODp+ODs+OBrueuoeeQhuODquOCueODiOOCkuS9nOaIkFxuICAgKi9cbiAgcHJpdmF0ZSBpbml0VGFyZ2V0TGlzdCh0YXJnZXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgLy8g55uj6KaW5a++6LGh44Ko44Os44Oh44Oz44OI44Gr54us6Ieq5oyH5a6a44GM44GC44KM44Gw44Gd44Gh44KJ44KS5L2/44GG44CCXG4gICAgLy8g54Sh44GR44KM44Gw44Kq44OX44K344On44Oz6Kit5a6a44KS5L2/44GGXG4gICAgY29uc3Qgcm9vdCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoQVRUUl9ST09UKSB8fCB0aGlzLm9wdC5yb290O1xuICAgIGNvbnN0IHJvb3RNYXJnaW46IHN0cmluZyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoQVRUUl9NQVJHSU4pIHx8IHRoaXMub3B0LnJvb3RNYXJnaW4gYXMgc3RyaW5nO1xuICAgIGNvbnN0IHRocmVzaG9sZDogbnVtYmVyID0gTnVtYmVyKHRhcmdldC5nZXRBdHRyaWJ1dGUoQVRUUl9USFJFU0hPTEQpKSB8fCB0aGlzLm9wdC50aHJlc2hvbGQgYXMgbnVtYmVyO1xuICAgIGNvbnN0IGtleTogc3RyaW5nID0gYCR7cm9vdH0tJHtyb290TWFyZ2lufS0ke3RocmVzaG9sZH1gO1xuXG4gICAgaWYgKGtleSBpbiB0aGlzLnRhcmdldExpc3QgPT09IGZhbHNlKXtcbiAgICAgIGNvbnN0IG9wdGlvbjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0ge1xuICAgICAgICByb290OiByb290IGFzIEhUTUxFbGVtZW50LFxuICAgICAgICByb290TWFyZ2luOiByb290TWFyZ2luLFxuICAgICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodGhpcy5vYnNlcnZlckNhbGxiYWNrLCBvcHRpb24pO1xuXG4gICAgICB0aGlzLnRhcmdldExpc3Rba2V5XSA9IHtcbiAgICAgICAgbGlzdDogW10sXG4gICAgICAgIG9ic2VydmVyXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnRhcmdldExpc3Rba2V5XS5saXN0LnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrnjgq/jg63jg7zjg6vmpJznn6Xlh6bnkIbjgpLplovlp4tcbiAgICovXG4gICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy50YXJnZXRMaXN0KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRPYmogPSB0aGlzLnRhcmdldExpc3Rba2V5XTtcblxuICAgICAgdGFyZ2V0T2JqLmxpc3QuZm9yRWFjaCh0YXJnZXQgPT4ge1xuICAgICAgICB0YXJnZXRPYmoub2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog55S76Z2i44Gr5YWl44Gj44Gf44KJIEFUVFJfSU5WSUVXIOOBrmRhdGHlsZ7mgKfjgasgdHJ1ZSDjgpLlhaXjgozjgovjgIJcbiAgICog44Kq44OW44K244O844OQ44O844GL44KJ55uj6KaW6Kej6Zmk44GV44KM44KL44CCXG4gICAqL1xuICAgcHJpdmF0ZSBvYnNlcnZlckNhbGxiYWNrKGVudHJpZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXSwgb2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyKTogdm9pZCB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmKCFlbnRyeS5pc0ludGVyc2VjdGluZykgcmV0dXJuO1xuXG4gICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgIGVudHJ5LnRhcmdldC5zZXRBdHRyaWJ1dGUoQVRUUl9JTlZJRVcsICd0cnVlJyk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7Ozs7Ozs7SUFXQSxJQUFNLFdBQVcsR0FBVyxhQUFhLENBQUM7SUFDMUMsSUFBTSxTQUFTLEdBQVcsa0JBQWtCLENBQUM7SUFDN0MsSUFBTSxXQUFXLEdBQVcsd0JBQXdCLENBQUM7SUFDckQsSUFBTSxjQUFjLEdBQVcsdUJBQXVCLENBQUM7SUFFdkQsSUFBTSxPQUFPLEdBQTZCO1FBQ3hDLElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLEtBQUs7UUFDakIsU0FBUyxFQUFFLENBQUM7S0FDYixDQUFDO0lBRUY7Ozs7Ozs7OztRQWFFLG1CQUFZLE1BQWMsRUFBRSxNQUFxQztZQUFqRSxpQkFPQztZQVAyQix1QkFBQSxFQUFBLFdBQXFDO1lBQy9ELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFMUMsUUFBUSxDQUFDLGdCQUFnQixDQUFjLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQW1CO2dCQUN6RSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdCLENBQUMsQ0FBQztTQUNKOzs7O1FBS08sa0NBQWMsR0FBdEIsVUFBdUIsTUFBbUI7OztZQUd4QyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQzdELElBQU0sVUFBVSxHQUFXLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFvQixDQUFDO1lBQzdGLElBQU0sU0FBUyxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFtQixDQUFDO1lBQ3RHLElBQU0sR0FBRyxHQUFXLFVBQUcsSUFBSSxjQUFJLFVBQVUsY0FBSSxTQUFTLENBQUUsQ0FBQztZQUV6RCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBQztnQkFDbkMsSUFBTSxNQUFNLEdBQTZCO29CQUN2QyxJQUFJLEVBQUUsSUFBbUI7b0JBQ3pCLFVBQVUsRUFBRSxVQUFVO29CQUN0QixTQUFTLEVBQUUsU0FBUztpQkFDckIsQ0FBQztnQkFDRixJQUFNLFFBQVEsR0FBeUIsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRS9GLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUc7b0JBQ3JCLElBQUksRUFBRSxFQUFFO29CQUNSLFFBQVEsVUFBQTtpQkFDVCxDQUFDO2FBQ0g7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEM7Ozs7UUFLTyx5QkFBSyxHQUFaO1lBQUEsaUJBUUE7WUFQQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUN0QyxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUV2QyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07b0JBQzNCLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQyxDQUFDLENBQUM7YUFDSixDQUFDLENBQUM7U0FDSjs7Ozs7UUFNUSxvQ0FBZ0IsR0FBeEIsVUFBeUIsT0FBb0MsRUFBRSxRQUE4QjtZQUM1RixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztnQkFDbkIsSUFBRyxDQUFDLEtBQUssQ0FBQyxjQUFjO29CQUFFLE9BQU87Z0JBRWpDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDaEQsQ0FBQyxDQUFDO1NBQ0o7UUFDSCxnQkFBQztJQUFELENBQUM7Ozs7Ozs7OyJ9
