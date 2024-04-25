import { getAccessToken } from '../handleToken';

export const getMyInvitationList = async () => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/invitations?size=10`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  return result;
};

export const getAddInvitationList = async ({ targetId }: { targetId: string }) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/invitations?size=10&cursorId=${targetId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  return result;
};
