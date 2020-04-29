import { getUnreadSummaries } from './queries';
import setUnreadBadge from './setUnreadBadge';

const getUnreadCount = async () => {
  console.log('going to get unread')
  const res = await getUnreadSummaries();
  const unreadCount = res.unreadContents.summaries.reduce((pre, cur) => cur.unreadCount + pre, 0);
  setUnreadBadge(unreadCount);
}

export default getUnreadCount;
