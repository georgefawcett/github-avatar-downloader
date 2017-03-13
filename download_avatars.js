if (process.argv[2] && process.argv[3]) { // Ensure command line arguments are provided

  var repoOwner = process.argv[2];
  var repoName = process.argv[3];

  var request = require('request');
  var fs = require('fs');

  var GITHUB_USER = "georgefawcett";
  var GITHUB_TOKEN = "b08ac5e931cb20eec33f71674c10e2b405c15610";

  console.log('Welcome to the GitHub Avatar Downloader!');

  function getRepoContributors(repoOwner, repoName, cb) {

    // Add required User-Agent header to URL, creating object
    var options = {
    url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'georgefawcett'
      }
    }

    // Send request for avatar image URLs via callback function
    request.get(options, function(err, response, body) {

      cb(err, response, body);

    });

  };



  getRepoContributors("jquery", "jquery", function(err, response, body) {

      if (err) {
        throw err;
        console.log('Response Status Code: ', response.statusCode);
        return;
      }

      if (response.statusCode === 200) {
        var data = JSON.parse(body);
        // Call downloadImageByURL function for each avatar URL, naming downloads after GitHub login
        for (i = 0; i < data.length; i++) {
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
             console.log('Downloading avatar...');
             console.log('Response Status Message: ', response.statusMessage, 'Content Type: ', response.headers['content-type']);
           })
           .pipe(fs.createWriteStream(filePath));
  }


} else { // If command line arguments were not provided

  console.log("A repository owner and name are required.");

}

