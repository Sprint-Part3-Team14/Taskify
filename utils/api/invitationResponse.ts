import { getAccessToken } from '../handleToken';

export const acceptInvitation = async ({ id }: { id: number; inviteAccepted: boolean }) => {
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
  return result;
};

export const rejectInvitation = async ({ id }: { id: number; inviteAccepted: boolean }) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/invitations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ inviteAccepted: false }),
  });
  const result = response.json();
  return result;
};
