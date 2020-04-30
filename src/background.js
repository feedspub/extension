import getUnreadCount from './utils/getUnreadCount';
import setUnreadBadge from './utils/setUnreadBadge';

chrome.runtime.onStartup.addListener(async () => {
  // Get unread number
  if (localStorage.getItem('token')) {
    await getUnreadCount();
  }
})

chrome.browserAction.onClicked.addListener(() => {
  const token = localStorage.getItem('token');
  if (token) {
    chrome.tabs.create({ url: 'https://feeds.pub' });
    setUnreadBadge(0);
  } else {
    chrome.browserAction.setPopup({ popup: 'popup.html' });
  }
});

// check every minute, if last check is 30 mins ago do query
chrome.alarms.create({ periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(async () => {
  const lastCheckTime = Number(localStorage.getItem('lastCheckTime'));
  const now = new Date().getTime();
  if (
    now - new Date(lastCheckTime).getTime() > 1000 * 60 * 10
    || !lastCheckTime
  ) {
    await getUnreadCount();
    localStorage.setItem('lastCheckTime', now);
  }
});
