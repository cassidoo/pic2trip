Clarifai.initialize({
  'clientId': CLIENT_ID,
  'clientSecret': CLIENT_SECRET
});

chrome.contextMenus.create({
  "id": "tripadifai",
  "title": "Tripadifai",
  "contexts": ["image"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  generateLink(info.srcUrl);
});

function getSearchString(tags) {
  var string = '';
  for (var i = 0; i < 4; i++) {
    string += tags[i].replace(/ /g,'+');
    string += '+';
  }

  return string;
}

function generateLink(imgurl) {
  Clarifai.getTagsByUrl(imgurl, {
    'model': 'travel-v0.1'
  }).then(function(r){
    var tags = r.results[0].result.tag.classes;
    chrome.tabs.create({
      "url" : "https://www.tripadvisor.com/Search?q=" + getSearchString(tags)
    });
  }, function(err) {
    console.log(err);
  });
}
