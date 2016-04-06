const githubURL = 'https://github.com/login/oauth/authorize?client_id=b3b5b16b1f12a7f01567&redirect_url=http://codesmith.io';

function authenticate(omni) {
  omni.addItems({
    title : "Authenticate with Github",
    link: githubURL,
  });
  omni.sendFeedback();
}












module.exports = function(omni, query) {

  authenticate(omni);
  // if (query.length > 0 && query[0] == '>') {

  // }


};

