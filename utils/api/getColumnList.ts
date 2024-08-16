import { getAccessToken } from '../handleToken';

export const getColumnList = async ({ id }: { id: string }) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns?dashboardId=${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  return result;
};
