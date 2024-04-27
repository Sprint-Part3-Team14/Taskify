import { getAccessToken } from '../handleToken';

interface CreateDashborad {
  title: string;
  color: string;
}

export const createDashborad = async ({ title, color }: CreateDashborad) => {
  const accessToken = getAccessToken();
  const response = await fetch('https://sp-taskify-api.vercel.app/4-14/dashboards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: title,
      color: color,
    }),
  });
  const result = response.json();
  return result;
};
