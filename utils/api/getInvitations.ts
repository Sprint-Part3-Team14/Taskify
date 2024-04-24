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
  return result;
};
