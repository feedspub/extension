import { signIn } from './utils/queries';
import getUnreadCount from './utils/getUnreadCount';

document.querySelector('#signinBtn').addEventListener('click', async () => {
  const emailOrName = document.querySelector('#emailOrName').value;
  const password = document.querySelector('#password').value;

  document.querySelector('#signinBtn').innerText = 'Loading...';
  try {
    const res = await signIn({ emailOrName, password });
    const token = res.signin.token;
    localStorage.setItem('token', token);
    chrome.browserAction.setPopup({ popup: '' });
    await getUnreadCount();
    window.close();
  } catch (error) {
    alert(error.message.split(':')[0]);
    document.querySelector('#signinBtn').innerText = 'Sign up';
  }

});

// make link clickable - http://stackoverflow.com/questions/8915845/chrome-extension-open-a-link-from-popup-html-in-a-new-tab
window.addEventListener('click',function(e){
  if(e.target.href !== undefined){
    chrome.tabs.create({ url: e.target.href })
  }
});
