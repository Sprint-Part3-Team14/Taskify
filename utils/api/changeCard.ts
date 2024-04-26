import { getAccessToken } from '../handleToken';

interface ChangeNewColumnTitle {
  column: number;
  changeTitle: {
    title: string;
  };
}

export const changeNewColumnTitle = async ({ column, changeTitle }: ChangeNewColumnTitle) => {
  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns/${column}`, {
    method: 'PUT',
    body: JSON.stringify(changeTitle),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = response.json();
  return result;
};
