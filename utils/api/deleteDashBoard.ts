import { ACCESS_TOKEN } from '../temporaryToken';

export const deleteDashBoard = async ({ dashboardId }: { dashboardId: number }) => {
  await fetch(`https://sp-taskify-api.vercel.app/14/dashboards/${dashboardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });
};
