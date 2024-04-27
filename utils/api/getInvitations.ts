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
  const result = await response.json();
  switch (response.status) {
    case 200: {
      return result;
    }
    case 403: {
      throw new Error('대시보드 초대 조회 권한이 없습니다.');
    }
    case 404: {
      throw new Error('존재하지 않는 대시보드입니다.');
    }
    default: {
      throw new Error('알 수 없는 이유로 대시보드 초대 조회에 실패했습니다. 다시 로그인해 주세요.');
    }
  }
};
