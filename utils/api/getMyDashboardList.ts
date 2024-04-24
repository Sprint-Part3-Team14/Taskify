import { getAccessToken } from '../handleToken';

interface GetMyDashboardListProps {
  currentPage: number;
  showCount: number;
}

export const getMyDashboardList = async ({ currentPage, showCount }: GetMyDashboardListProps) => {
  const accessToken = getAccessToken();
  const response = await fetch(
    `https://sp-taskify-api.vercel.app/4-14/dashboards?navigationMethod=pagination&page=${currentPage}&size=${showCount}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result = response.json();
  console.log(result);
  return result;
};
