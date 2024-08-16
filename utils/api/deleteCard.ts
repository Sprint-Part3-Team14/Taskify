import { getAccessToken } from '../handleToken';

export const deleteCard = async ({ cardId }: { cardId: number }) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  if (response.ok) {
    window.location.reload();
  }
};
