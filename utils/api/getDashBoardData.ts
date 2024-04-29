import { ACCESS_TOKEN } from '../temporaryToken';

export const getDashBoardData = async dashBoardId => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/dashboards/${dashBoardId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });

  if (response.ok) {
    const result = response.json();
    return result;
  }

  switch (response.status) {
    case 404: {
      throw new Error('대시보드가 존재하지 않습니다. 다시 확인해 주세요.');
    }
  }
};
