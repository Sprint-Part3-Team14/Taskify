import { getAccessToken } from '../handleToken';

const accessToken = getAccessToken();

export const acceptInvitationData = async ({ id, inviteAccepted }: { id: number; inviteAccepted: boolean }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/comments/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inviteAccepted: inviteAccepted,
    }),
  });
  const result = response.json();
  return result;
};

export const deleteInvitationData = async ({ id, inviteAccepted }: { id: number; inviteAccepted: boolean }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/comments/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inviteAccepted: inviteAccepted,
    }),
  });
  const result = response.json();
  return result;
};
