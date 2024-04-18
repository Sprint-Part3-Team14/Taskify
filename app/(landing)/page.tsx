import RootLayout from './layout';

import AddButton from '@/components/common/button/add';
import AddColumnButton from '@/components/common/button/addColumn';
import AddDashboardButton from '@/components/common/button/addDashboard';
import ConfirmButton from '@/components/common/button/confirm';
import MainButton from '@/components/common/button/login';
import Pagenation from '@/components/common/button/pagenation';
import RemoveButton from '@/components/common/button/remove';

const Home = () => {
  // const router = useRouter();

  // const isLoggedIn = false;

  // if (isLoggedIn) {
  //   router.push('/dashboard');
  //   return null;
  // }

  return (
    <RootLayout>
      <div>
        <AddButton />
        <br />
        <Pagenation />
        <br />
        <AddColumnButton />
        <br />
        <RemoveButton />
        <br />
        <AddDashboardButton />
      </div>
    </RootLayout>
  );
};

export default Home;
