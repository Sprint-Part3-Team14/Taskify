import { getAccessToken } from '../handleToken';

interface I_createCard {
  title: string;
  dashboardId: number;
  columnId: number;
  description: string;
  dueDate: string;
  tags: Array<string>;
  imageUrl: string;
  assigneeUserId: number;
}

export const createCard = async ({
  assigneeUserId,
  title,
  dashboardId,
  dueDate,
  columnId,
  description,
  tags,
  imageUrl,
}: I_createCard) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assigneeUserId: assigneeUserId,
      dashboardId: dashboardId,
      columnId: columnId,
      title: title,
      description: description,
      dueDate: dueDate,
      tags: tags,
      imageUrl: imageUrl,
    }),
  });
  return response;
};
