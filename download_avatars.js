var request = require('request');

var GITHUB_USER = "georgefawcett";
var GITHUB_TOKEN = "b08ac5e931cb20eec33f71674c10e2b405c15610";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: {
    'User-Agent': 'georgefawcett'
    }
  }

  request.get(options, function(err, response, body) {

  cb(err, response, body);

  });

};


getRepoContributors("jquery", "jquery", function(err, response, body) {

    if (err) {
      throw err;
      console.log('Response Status Code:', response.statusCode);
      return;
    }

    if (response.statusCode === 200) {
      var data = JSON.parse(body);
      for (i = 0; i < data.length; i++) {
        console.log(data[i].avatar_url);
      }
    }
});