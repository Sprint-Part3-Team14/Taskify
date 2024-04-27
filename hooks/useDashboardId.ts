import { usePathname } from 'next/navigation';

export const useDashboardId = () => {
  const path = usePathname();
  const dashboardId = Number(path.split('/')[2]);

  return { dashboardId };
};
