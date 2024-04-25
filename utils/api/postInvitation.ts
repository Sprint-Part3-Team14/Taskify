import { ACCESS_TOKEN } from '../temporaryToken';

export const postInvitation = async ({ email, dashboardId }: { email: string; dashboardId: number }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/dashboards/${dashboardId}/invitations`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });

  const result = response.json();
  return result;
};
