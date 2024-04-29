import { ACCESS_TOKEN } from '../temporaryToken';

interface ChangeDashBoardData {
  dashBoardId: number;
  changeData: {
    title: string;
    color: string;
  };
}

export const changeDashBoard = async ({ dashBoardId, changeData }: ChangeDashBoardData) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/dashboards/${dashBoardId}`, {
    method: 'PUT',
    body: JSON.stringify(changeData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });

  const result = await response.json();
  return result;
};
