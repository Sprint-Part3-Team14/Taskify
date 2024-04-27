import { getAccessToken } from '../handleToken';

const accessToken = getAccessToken();

interface I_CreateCommentApi {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

interface I_GetCommentApi {
  targetId: string;
  cardId: number;
}

export const getCommentList = async ({ cardId }: { cardId: number }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/comments?size=10&cardId=${cardId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();

  return result;
};

export const getAddCommentList = async ({ targetId, cardId }: I_GetCommentApi) => {
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

export const createCommentData = async ({ content, cardId, columnId, dashboardId }: I_CreateCommentApi) => {
  const response = await fetch('https://sp-taskify-api.vercel.app/4-14/comments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content,
      cardId: cardId,
      columnId: columnId,
      dashboardId: dashboardId,
    }),
  });
};

export const changeCommentData = async ({ id, content }: { id: number; content: string }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/comments/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content,
    }),
  });
};

export const deleteCommentData = async ({ id }: { id: number }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  return result;
};
