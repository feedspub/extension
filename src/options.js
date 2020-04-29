import setUnreadBadge from './utils/setUnreadBadge';

document.querySelector('#signoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  chrome.browserAction.setPopup({ popup: 'popup.html' });
  alert('ok');
  setUnreadBadge(0);
});
