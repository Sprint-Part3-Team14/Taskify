import Setting from './setting';

import SettingImage from '@/public/image/landing3.jpg';
import InviteImage from '@/public/image/landing4.jpg';
import MemberImage from '@/public/image/landing5.jpg';

const SettingSection = () => {
  return (
    <div className='flex flex-col justify-center pc:flex-row'>
      <Setting
        imageUrl={SettingImage.src}
        title={'대시보드 설정'}
        description={'대시보드 사진과 이름을 변경할 수 있어요.'}
      />
      <Setting imageUrl={InviteImage.src} title={'초대'} description={'새로운 팀원을 초대할 수 있어요.'} />
      <Setting imageUrl={MemberImage.src} title={'구성원'} description={'구성원을 초대하고 내보낼 수 있어요.'} />
    </div>
  );
};
export default SettingSection;
