import RootLayout from './layout';

import ConfirmButton from '@/components/common/button/confirm';
import MainButton from '@/components/common/button/login';

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
        <ConfirmButton buttonColor='reject'>거절</ConfirmButton>
      </div>
    </RootLayout>
  );
};

export default Home;
