var request = require('request');
var fs = require('fs');

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
  console.log(options.url);

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
        downloadImageByURL(data[i].avatar_url, "avatars/avatar-" + data[i].login + ".jpg")
      }
    }
});


function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           console.log('Download complete.')
           console.log('Response Status Message: ', response.statusMessage, 'Content Type: ', response.headers['content-type']);
         })
         .pipe(fs.createWriteStream(filePath));
}


// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")






