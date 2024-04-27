import { getAccessToken } from '../handleToken';

interface GetMembersProps {
  currentPage: number;
  showCount: number;
}

export const getMyDashboardList = async ({ currentPage, showCount }: GetMembersProps) => {
  const accessToken = getAccessToken();
  const response = await fetch(
    `https://sp-taskify-api.vercel.app/4-14/dashboards?navigationMethod=pagination&page=${currentPage}&size=${showCount}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result = response.json();
  return result;
};
