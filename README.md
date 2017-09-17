# AdbPushFavAndRetweet
AmazonDashButton(ADB)が押されるとTwitterにてお気に入りとリツイートがされるプログラム

## 確認動作環境
* Nodejs v4.2.6

## 必要なモジュール
```bash
npm install twitter
npm install node-dash-button
```

## 仕様
* ボタンを押されたら"お気に入り"と"リツイート"をする
* ついでにフォローしていないフォロワーをフォローする
* 巻き込みお気に入りとリツイートを避けるために@(アットマーク)がついているツイートは除外する


## プログラム
AdbPushFavAndRetweet.jsについて

※TwitterのToken等とADBのIPアドレスが入手できている前提で記述します

```javascript
//Twitterのkey,secret,tokenを記述
var client = new Twitter({
 consumer_key: '',
 consumer_secret: '',
 access_token_key: '',
 access_token_secret: ''
});

/////中略/////

//ADBのIPを記述
var dash_ip = 'YOUR_DASH_BUTTON_IP';

/////中略/////

//ADBのcall
const dash = dash_button(dash_ip, null, null, 'all');
dash.on('detected', () => {
    //フォロワーの取得 フォロワーを取得したいTwitterID記述
    AutoFollow(client, 'TWITTER_ID');

    //リツイートとお気に入り
    GetHomeTimeLine(client);

});

```