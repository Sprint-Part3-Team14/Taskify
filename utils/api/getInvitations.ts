import { ACCESS_TOKEN } from '../temporaryToken';

interface InvitationsProps {
  currentPage: number;
  showCount: number;
  dashboardId: number;
}

export const getInvitations = async ({ currentPage, showCount, dashboardId }: InvitationsProps) => {
  const response = await fetch(
    `https://sp-taskify-api.vercel.app/14/dashboards/${dashboardId}/invitations?page=${currentPage}&size=${showCount}`,
    {
      headers: {
        'Contetn-Type': 'application/json',
        Authorization: ACCESS_TOKEN,
      },
    }
  );
  if (response.ok) {
    const result = await response.json();
    return result;
  }

  switch (response.status) {
    case 403: {
      throw new Error('대시보드 초대 조회 권한이 없습니다.');
    }
    case 404: {
      throw new Error('대시보드가 존재하지 않습니다.');
    }
  }
};
