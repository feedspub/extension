const setUnreadBadge = (count) => {
  if (count === 0) {
    chrome.browserAction.setBadgeText({text: ''});
    console.log('setbadge, background');
  } else {
    chrome.browserAction.setBadgeText({text: count + ''});
    chrome.browserAction.setBadgeBackgroundColor({ color: '#61B04B' });
  }
}

export default setUnreadBadge;
