dojo.require('dijit.form.Button');
dojo.require('dijit.Dialog');
dojo.require('dijit.form.ValidationTextBox');
dojo.require('dojo.io.script');

dojo.addOnLoad(function(){
       var loadBtn = dijit.byId('loadBtn');
       var userDialog = dijit.byId('userDialog');
       var okBtn = dijit.byId('okBtn');
       var userTxt = dijit.byId('userTxt');
    
        dojo.connect(loadBtn,'onClick',function(){
            userDialog.show();
        });
    
        dojo.connect(okBtn,'onClick',function(){
            if(userTxt.validate()){
                userDialog.hide();
                var output = dojo.byId('output');
                output.innerHTML = 'loading...';
                
                dojo.io.script.get({
                    url: 'http://twitter.com/statuses/user_timeline.json',
                    content: {
                        screen_name: userTxt.getValue()
                    },
                    callbackParamName : 'callback',
                    timeout: 8000,
                    load: function(resp){
                        output.innerHTML ='';
                        dojo.forEach(resp,function(tweet){                            
                            
                        //Regex text formatting based on @Derek's example
                        tweet.text = tweet.text.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1" target="_blank">$1<\/a>').replace(/@([a-zA-Z0-9_]+)/gi,'<a href="http://twitter.com/$1" target="_blank">@$1<\/a>').replace(/#([a-zA-Z0-9_]+)/gi,'<a href="http://search.twitter.com/search?q=%23$1" target="_blank">#$1<\/a>');  
                            
                          var n = dojo.create('div',
                              {innerHTML:tweet.text,
                               class: 'tweetBox'
                              });
                            
                           //add user's image if they have one
                          if(tweet.user && tweet.user.profile_image_url){
                               var img = dojo.create('img',
                                   {src:tweet.user.profile_image_url,
                                    align:'left'});
                                dojo.place(img, n, 'first');                  
                          }
                          
                          dojo.place(n, output, 'last');
                            console.log(tweet);
                        });                            
                    },
                    error: function(e){
                        output.innerHTML = 'Error retrieving tweets: ' + e;
                    },
                    preventCache: true,
                    handleAs: 'json'
              });
            }
        });
    
    //show main form now that parsing and event hanlding is setup
    dojo.byId('main').style.display = '';
    
});