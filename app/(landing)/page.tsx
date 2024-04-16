// import { useRouter } from 'next/navigation';

import RootLayout from './layout';

import Article from '@/components/landing/article';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import MainSection from '@/components/landing/mainSection';
// import ModalDescription from '@/components/landing/modalDescription';
// import SubArticle from '@/components/landing/subarticle';

const Home = () => {
  // const router = useRouter();

  // const isLoggedIn = false;

  // if (isLoggedIn) {
  //   router.push('/dashboard');
  //   return null;
  // }

  return (
    <RootLayout>
      <div className='flex flex-center flex-col gap-24 bg-white'>
        <Header />
        <MainSection />
        <Article />
        {/* <SubArticle />
        <p className='text-20 font-bold tablet:text-[36px]'>생산성을 높이는 다양한 설정 ⚡</p>
        <ModalDescription /> */}
        <Footer />
      </div>
    </RootLayout>
  );
};

export default Home;
