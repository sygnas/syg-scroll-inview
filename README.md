# syg-scroll-inview
Scroll in viewport add data attribute.


## Description
スクロールしてビューポートに入ったら `data-invew` 属性を `true` にする。

画面に入ったらエフェクトを加えたいけど、余計な機能は不要、cssは自分で書く、という人向け。

## Release

- 2021.04.21
  - IE11非対応にし、InterscrtionObserver方式のみ対応。
  - `data-inview-margin`属性を廃止。
  - 個別に InterscrtionObserver のオプションを指定できるように `data-inview-rootMargin`、`data-inview-root`属性を追加
- 2020.05.02
  - `data-inview-margin`属性、`data-inview-threshold`属性を追加。
- 2019.11.11
  - オプションを intersectionObserver に合わせた方式に変更。
  - 上記にあわせ`offset`値はマイナスをデフォルトに変更。
- 2019.8.27
  - intersectionObserver に対応。

## Usage

### Install

```sh
npm install --save @sygnas/scroll-inview
```
### html / JS / css

```Html
<div class="js-inview .inview">foo</div>
<div class="js-inview .inview" data-inview-threshold="1">bar</div>
```

```JavaScript
import ScrollInView from '@sygnas/scroll-inview';

const in_view = new ScrollInView($('.js-inview'));
in_view.start();
```

```Sass
.inview{
    opacity: 0;
    transform: translateY(20px);
    transition: .2s;

    // ビューポートに入ると data-inview属性が「true」になるので、
    // エレメントを表示させる
    &[data-inview = "true"]{
        opacity: 1;
        transform: translateY(0);
    }
}
```

## Methods

### コンストラクタ

syg-scroll-inview のインスタンスを作成。

```javascript
const in_view = new ScrollInView('.js-inview');
```

`IntersectionObserver()` のオプションを指定できる。
https://developer.mozilla.org/ja/docs/Web/API/IntersectionObserver

```javascript
const option = {
  rootMargin: '-10%'
};
const in_view = new ScrollInView('.js-inview', option);
```


### start()

スクロールの監視を開始する。

```javascript
in_view.start();
```

## Attributes

data属性で個別に option を指定できる。

```Html
<div class="js-inview .inview" data-inview-threshold="1">bar</div>
```


| 属性 | デフォルト | 機能 |
| --- | --- | --- |
| data-inview-root | null | IntersectionObserver の root |
| data-inview-rootMargin | '0px' | IntersectionObserver の rootMargin |
| data-inview-threshold | 0 | IntersectionObserver の threshold |


## License
MIT