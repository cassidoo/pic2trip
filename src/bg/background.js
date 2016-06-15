chrome.contextMenus.create({
  "id": "tripadifai",
  "title": "Tripadifai",
  "contexts": ["image"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  generateLink(info.linkUrl);
});

function generateLink(imgurl) {
  Clarifai.getTagsByUrl(imgurl, {
    'model': 'travel-v0.1'
  }).then(function(r){
    var tag = r.results[0].result.tag.classes[0].replace(/ /g,"+");
    chrome.tabs.create({
      "url" : "https://www.tripadvisor.com/Search?q=" + tag
    });
  }, function(err) {
    console.log(err);
  });
}
