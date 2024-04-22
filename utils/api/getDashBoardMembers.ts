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
  return result;
};
