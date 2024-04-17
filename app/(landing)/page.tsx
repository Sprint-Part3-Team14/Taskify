import RootLayout from './layout';

import MainButton from '@/components/common/button/loginButton';

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
        <MainButton>어무이</MainButton>
      </div>
    </RootLayout>
  );
};

export default Home;
