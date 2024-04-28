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
    return;
  }

  switch (response.status) {
    case 403: {
      throw new Error('대시보드 생성자만 삭제할 수 있습니다.');
    }
    case 404: {
      throw new Error('대시보드가 존재하지 않습니다.');
    }
  }
};
