import Image from 'next/image';
interface FeatureSectionProps {
  imageUrl: string;
  title: string;
  description: string;
}

const Setting = ({ imageUrl, title, description }: FeatureSectionProps) => {
  return (
    <div className='m-4 flex h-347 w-343 flex-col rounded-md bg-gradient-to-b py-26 tb:h-[384px] tb:w-[378px]'>
      <div className='flex justify-center items-center h-[235px] tb:h-[260px] bg-violet-100'>
        <Image src={imageUrl} alt='Illustration' width={300} height={230} />
      </div>
      <div className='mt-3 px-8 text-left text-[18px] font-bold tb:mt-4'>{title}</div>
      <div className='px-8 text-left text-[16px]'>{description}</div>
    </div>
  );
};

export default Setting;
