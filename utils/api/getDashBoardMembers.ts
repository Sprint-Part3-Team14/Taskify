import { ACCESS_TOKEN } from '../temporaryToken';

interface GetMembersProps {
  currentPage: number;
  dashboardId: number;
}

export const getDashBoardMembers = async ({ currentPage, dashboardId }: GetMembersProps) => {
  const query = `?page=${currentPage}&size=4&dashboardId=${dashboardId}`;
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/members${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });
  const result = response.json();
  return result;
};
