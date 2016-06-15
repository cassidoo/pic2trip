chrome.contextMenus.create({
  "id": "tripadifai",
  "title": "Tripadifai",
  "contexts": ["image"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log(info.linkUrl);
  chrome.tabs.create({
    "url" : info.linkUrl
  });
});
