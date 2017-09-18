//Twitter
var Twitter = require('twitter');
var client = new Twitter({
 consumer_key: '',
 consumer_secret: '',
 access_token_key: '',
 access_token_secret: ''
});

//AmazonDashButton
var dash_button = require('node-dash-button');
var dash_ip = 'YOUR_DASH_BUTTON_IP';

//adb recv
const dash = dash_button(dash_ip, null, null, 'all');
dash.on('detected', () => {
    AutoFollow(client, 'TWITTER_ID');
    GetHomeTimeLine(client);

});


//HomeTimeLineのフォローとリツイート
function GetHomeTimeLine(client){
    var params = {exclude_replies: true, count:50};
    client.get('statuses/home_timeline', params,function(error, tweets, response) {
        if (!error) {
            Object.keys(tweets).forEach(function(key) {
            var val = this[key];
            var obj = (key, val);

            var Id = obj['id_str'];
            var Text = obj['text'];
            var Favorited = obj['favorited'];
            var Retweeted = obj['retweeted'];


            if (!Text.match(/RT @/)) { //リツイートのものは除去
                //お気に入り
                if(Favorited == false){
                    client.post('favorites/create', {id: Id}, function(error, response){
                        if(error) return;
                        else console.log('favorited!!');
                    });
                }
                //リツイート
                if(Retweeted == false){
                    client.post('statuses/retweet', {id: Id}, function(error, response){
                        if(error) return;
                        else console.log('Retweeted!!');
                    });
                }
            }
          }, tweets);
        }
    });
}


//ユーザータイムラインからのフォローとリツイート
function GetUserTimeLine(client, screenname){
    var params = {screen_name: screenname, exclude_replies: true, count:50};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          Object.keys(tweets).forEach(function(key) {
            var val = this[key];
            var obj = (key, val);

            var Id = obj['id_str'];
            var Text = obj['text'];
            var Favorited = obj['favorited'];
            var Retweeted = obj['retweeted'];


            if (!Text.match(/RT @/)) { //リツイートのものは除去
                //お気に入り
                if(Favorited == false){
                    client.post('favorites/create', {id: Id}, function(error, response){
                        if(error) return;
                        else console.log('favorited!!');
                    });
                }
                //リツイート
                if(Retweeted == false){
                    client.post('statuses/retweet', {id: Id}, function(error, response){
                        if(error) return;
                        else console.log('Retweeted!!');
                    });
                }
            }
          }, tweets);
        }
    });
}


//自動フォロー
function AutoFollow(client, screenname){
    var params = {screen_name: screenname};
    client.get('followers/list', params, function(error, profiles, response) {
        if (!error) {
            var profile = profiles['users'];

            profile.forEach(function(obj){
                var Id = obj['id_str'];
                var ScreenName = obj['screen_name'];
                var Following = obj['following'];

                if(Following == false){
                    client.post('friendships/create', {user_id: Id}, function(error, response){
                        if(error) return;
                    });
                }
            });
        }
    });
}
