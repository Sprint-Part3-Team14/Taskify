import { getAccessToken } from '../handleToken';

export const acceptInvitation = async ({ id }) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/invitations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ inviteAccepted: true }),
  });
  const result = response.json();
  console.log(result);
  return result;
};
