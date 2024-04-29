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

  if (response.ok) {
    const result = response.json();
    return result;
  }

  switch (response.status) {
    case 404: {
      throw new Error('대시보드의 멤버가 아닙니다. 대시보드를 확인해 주세요.');
    }
  }
};
