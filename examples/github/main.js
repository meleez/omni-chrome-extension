function authenticate(omni) {
  omni.addOauth({
    oauth: "github",
    client_secret: "a7d4c45e9dc563b07fb5e241f63c5e2f87241828",
    client_id : "1649235ae4e380dd699c",
    redirect_url: "http://localhost:1337?client_secret=a7d4c45e9dc563b07fb5e241f63c5e2f87241828&client_id=1649235ae4e380dd699c"
  });
  omni.sendFeedback();
}



module.exports = function(omni, query) {

  authenticate(omni);
  // if (query.length > 0 && query[0] == '>') {

  // }


};

