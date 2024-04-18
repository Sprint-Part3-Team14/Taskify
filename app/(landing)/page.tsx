import RootLayout from './layout';

import AddButton from '@/components/common/button/add';
import AddColumnButton from '@/components/common/button/addColumn';
import ConfirmButton from '@/components/common/button/confirm';
import MainButton from '@/components/common/button/login';
import Pagenation from '@/components/common/button/pagenation';

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
      </div>
    </RootLayout>
  );
};

export default Home;
