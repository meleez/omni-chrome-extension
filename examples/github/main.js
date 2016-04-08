function authenticate(omni) {
  // omni.addOauth({
  //   oauth: "github",
  //   client_secret: "a7d4c45e9dc563b07fb5e241f63c5e2f87241828",
  //   client_id : "1649235ae4e380dd699c",
  //   redirect_url: "http://localhost:1337?client_secret=a7d4c45e9dc563b07fb5e241f63c5e2f87241828&client_id=1649235ae4e380dd699c"
  // });
  console.log('authenticate');
  var CALLBACK_URL = 'https://'+chrome.runtime.id+'.chromiumapp.org';
  var AUTH_URL = 'https://github.com/login/oauth/authorize/?client_id=1649235ae4e380dd699c&redirect_uri='+CALLBACK_URL+'&scope=notifications'; 
  
  console.log('chrome', chrome);
  chrome.identity.launchWebAuthFlow({
    url: AUTH_URL,
    interactive: true,
  }, function(redirectURL) {
    console.log(redirectURL);
    var q = redirectURL.substr(redirectURL.indexOf('#')+1);
    var parts = q.split('&');
    for (var i = 0; i < parts.length; i++) {
      var kv = parts[i].split('=');
      if (kv[0] == 'access_token') {
        token = kv[1];
        console.log('token is', token);
      }
    }
  }); 
  
  omni.sendFeedback();
}



module.exports = function(omni, query) {

  authenticate(omni);
  // if (query.length > 0 && query[0] == '>') {

  // }


};

