# syg-scroll-inview
Scroll in viewport add data attribute.


## Description
スクロールしてビューポートに入ったらdata属性を与える。

画面に入ったらエフェクトを加えたいけど、余計な機能は不要、cssは自分で書く、という人向け。

## Release

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
<div class="js-inview .inview" data-inview-offset="50">bar</div>
```

```JavaScript
import ScrollInView from '@sygnas/scroll-inview';

const in_view = new ScrollInView($('.js-inview'), {
    // Options
});
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

## Attributes

```Html
<header class="js-inview" data-inview-margin=".5" data-inview-threshold="-200px">
```

| name | default | comment |
| ---- | ---- | --- |
| data-inview | false | 自動で付与される。エレメントがビューポートに入ると true になる。 |
| data-inview-margin | 0 | ビューポート内の端から何pxの位置で表示するか（px指定） |
| data-inview-threshold | 0 | 対象エレメントがビューポートに何割入ったら表示するか。（0〜1） |

## Methods

### コンストラクタ

syg-scroll-inview のインスタンスを作成。

```javascript
const in_view = new ScrollInView({options});
```

#### Options

| option | default | comment |
| ---- | ---- | ---- |
| doc_bottom_offset | 50 | `addEventListener('scroll')`方式のみ使用。ドキュメント最下部のスクロール座標オフセット |
| offset | -50 | data属性「data-inview-margin」と同じだが、data属性のほうが優先される |
| threshold | 0 | `IntersectionObserver()`のみ使用。対象エレメントの何割が画面に入ったら表示したと判定するか |

### start()

スクロールの監視を開始する。

```javascript
in_view.start();
```

### stop()

スクロールの監視を停止する。
※intersectionObserver方式の時は無効。

```javascript
in_view.stop();
```

### reset_target()

対象エレメントが増えたら `reset_target()` を実行して、対象エレメントをリセットする。


```javascript
in_view.reset_target()
```


## License
MIT