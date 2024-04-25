import { ACCESS_TOKEN } from '../temporaryToken';

interface I_DeletePostInvitation {
  dashboardId: number;
  invitationId: number;
}

export const deletePostInvitation = async ({ dashboardId, invitationId }: I_DeletePostInvitation) => {
  const response = await fetch(
    `https://sp-taskify-api.vercel.app/14/dashboards/${dashboardId}/invitations/${invitationId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ACCESS_TOKEN,
      },
    }
  );

  const result = await response.json();
  return result;
};
