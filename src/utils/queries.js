import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.feeds.pub/graphql';

export const signIn = async ({ emailOrName, password }) => {

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'x-access-token': localStorage.getItem('token') || '',
    },
  });

  const SIGNIN = `
    mutation signin($emailOrName: String!, $password: String!) {
      signin(emailOrName: $emailOrName, password: $password) {
        token
        username
        email
      }
    }
  `;

  const res = await graphQLClient.request(SIGNIN, {
    emailOrName, password,
  });

  return res;
}

export const getUnreadSummaries = async () => {

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'x-access-token': localStorage.getItem('token') || '',
    },
  });

  const GET_USER_UNREAD = `
    query unreadContents($feedId: String, $afterTS: String) {
      unreadContents(feedId: $feedId, afterTS: $afterTS) {
        summaries {
          feedId
          title
          website
          updatedAt
          unreadCount
        }
      }
    }
  `;

  const res = await graphQLClient.request(GET_USER_UNREAD);

  return res;
}