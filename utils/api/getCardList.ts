import { getAccessToken } from '../handleToken';

export const getCardList = async ({ column }: { column: number }) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards?size=10&columnId=${column}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  return result;
};
