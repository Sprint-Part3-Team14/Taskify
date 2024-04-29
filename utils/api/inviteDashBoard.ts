export const inviteDashBoard = async ({ dashboardId }: { dashboardId: string }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/dashboards/${dashboardId}/invitations`);
  const result = await response.json();
  return result;
};
