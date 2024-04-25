import { getAccessToken } from '../handleToken';

interface CreateColumnProps {
  title: string;
  dashboardId: number;
}

export const createColumn = async ({ title, dashboardId }: CreateColumnProps) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      dashboardId: dashboardId,
    }),
  });
  const result = response.json();
  return result;
};
