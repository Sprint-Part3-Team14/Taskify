import { getAccessToken } from '../handleToken';

export const getCommentList = async ({ cardId }: { cardId: number }) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/comments?size=10&cardId=${cardId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();

  return result;
};

interface Props {
  targetId: string;
  cardId: number;
}

export const getAddCommentList = async ({ targetId, cardId }: Props) => {
  const accessToken = getAccessToken();
  const response = await fetch(
    `https://sp-taskify-api.vercel.app/4-14/comments?size=10&cursorId=${targetId}&cardId=${cardId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result = response.json();
  return result;
};
