import { ACCESS_TOKEN } from '../temporaryToken';

interface GetMembersProps {
  currentPage: number;
  showCount: number;
  dashboardId: number;
}

export const getDashBoardMembers = async ({ currentPage, showCount, dashboardId }: GetMembersProps) => {
  const query = `?page=${currentPage}&size=${showCount}&dashboardId=${dashboardId}`;
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/members${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });
  const result = response.json();
  switch (response.status) {
    case 200: {
      return result;
    }
    case 404: {
      throw new Error('대쉬보드의 구성원이 존재하지 않습니다.');
    }
    default: {
      throw new Error('알 수 없는 이유로 대시보드 구성원 조회에 실패했습니다. 다시 로그인해 주세요.');
    }
  }
};
