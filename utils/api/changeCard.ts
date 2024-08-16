import { getAccessToken } from '../handleToken';

interface I_ChangeCard {
  title: string;
  columnId: number;
  description: string;
  dueDate: string;
  tags: Array<string>;
  imageUrl: string;
  assigneeUserId: number;
  id: number;
}

export const changeCard = async ({
  assigneeUserId,
  title,
  dueDate,
  columnId,
  description,
  tags,
  imageUrl,
  id,
}: I_ChangeCard) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/cards/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assigneeUserId: assigneeUserId,
      columnId: columnId,
      title: title,
      description: description,
      dueDate: dueDate,
      tags: tags,
      imageUrl: imageUrl,
    }),
  });
  window.location.reload();
  return response;
};
