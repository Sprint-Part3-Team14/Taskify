import { ACCESS_TOKEN } from '../temporaryToken';

export const getDashBoardData = async dashBoardId => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/dashboards/${dashBoardId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });

  const result = response.json();
  return result;
};
