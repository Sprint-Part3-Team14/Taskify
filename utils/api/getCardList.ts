import { getAccessToken } from '../handleToken';

const accessToken = getAccessToken();

export const getCardList = async ({ column }: { column: number }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards?size=10&columnId=${column}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  return result;
};

export const getAddCardList = async ({ column, targetId }: { column: number; targetId: string }) => {
  const response = await fetch(
    `https://sp-taskify-api.vercel.app/4-14/cards?size=5&cursorId=${targetId}&columnId=${column}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result = response.json();
  return result;
};
