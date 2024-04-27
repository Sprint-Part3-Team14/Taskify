import { getAccessToken } from '../handleToken';

export const deleteColumn = async ({ column }: { column: string }) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns/${column}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  return result;
};
