AdbPushFavAndRetweet
====
AmazonDashButton(ADB)が押されるとTwitterにてお気に入りとリツイートがされるアプリケーション

## Description
ADBを押すとRaspberryPiが押すイベントを受取り、最新のTwitterタイムラインのツイートに対して"いいね"とリツイートを行う。

その後、フォロワーが増えていればフォローをする。

## Requirement
* Nodejs v4.2.6

* Install Library
    ```bash
    npm install twitter
    npm install node-dash-button
    ```

* [Twitter API](https://apps.twitter.com/)

## Usage
1. run program
    ```bash
    $ sudo node AdbPushFavAndRetweet.jp
    ```
2. 好きなときにADBを押す

## Install
AdbPushFavAndRetweet.jsの書き換え
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

## Licence
This software is released under the MIT License, see LICENSE.

## Author
[Twitter](https://twitter.com/momijinn_aka)

[Blog](http://www.autumn-color.com/)