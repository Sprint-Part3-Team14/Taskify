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
      throw new Error('대시보드가 존재하지 않습니다. 다시 시도해 주세요.');
    }
    default: {
      throw new Error('알 수 없는 이유로 대시보드 삭제에 실패했습니다. 다시 로그인해 주세요.');
    }
  }
};
