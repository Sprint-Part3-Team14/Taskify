import { ACCESS_TOKEN } from '../temporaryToken';

export const deleteDashBoard = async ({ dashboardId }: { dashboardId: number }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/dashboards/${dashboardId}`, {
    method: 'DELETE',
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
    case 403: {
      throw new Error('대시보드 삭제 권한이 없습니다. 다시 로그인해 주세요.');
    }
    case 404: {
      throw new Error('존재하지 않는 대시보드입니다.');
    }
    default: {
      throw new Error('알 수 없는 이유로 대시보드 삭제에 실패했습니다. 다시 로그인해 주세요.');
    }
  }
};
