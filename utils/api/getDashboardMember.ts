import { getAccessToken } from '../handleToken';

export const getDashboardMember = async ({ dashboard }: { dashboard: string }) => {
  const accessToken = getAccessToken();
  const response = await fetch(
    `https://sp-taskify-api.vercel.app/4-14/members?page=1&size=20&dashboardId=${dashboard}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result = response.json();
  return result;
};
