const INDEX_POSITION = [
  'right-0 flex',
  'right-[28px] flex',
  'right-[56px] flex',
  'right-[84px] hidden pc:flex',
  'right-[112px] hidden pc:flex',
];

const CONTAINER_SIZE = ['w-[40px]', 'w-[70px]', 'w-[100px]', 'w-[100px] pc:w-[130px]', 'w-[100px] pc:w-[160px]'];

export interface MembersProps {
  members: MemberProps[];
  totalCount: number;
}

interface MemberProps {
  id: number;
  userId?: number;
  email?: string;
  nickname: string;
  profileImageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  isOwner?: boolean;
}

const Members = ({ members, totalCount }: MembersProps) => {
  const extraCount = {
    pc: totalCount > 5 ? totalCount - 4 : 0,
    tablet: totalCount > 3 ? totalCount - 2 : 0,
  };
  const slicedMembers = members.slice(0, 5);
  const containerSize = CONTAINER_SIZE[slicedMembers.length - 1];

  return (
    <ul className={`relative flex h-[42px] items-center justify-end ${containerSize}`}>
      {slicedMembers.map((member, index) => (
        <li key={member.id} className='h-[38px]'>
          {member.profileImageUrl ? (
            <ImageMember profileImageUrl={member.profileImageUrl} index={slicedMembers.length - index - 1} />
          ) : (
            <DefaultMember key={member.id} nickname={member.nickname} index={slicedMembers.length - index - 1} />
          )}
        </li>
      ))}
      {extraCount.pc > 0 && (
        <li className='border-solid-white absolute right-0 hidden h-[38px] w-[38px] items-center justify-center rounded-full bg-tp-pink text-tp-violet_900 pc:flex'>
          {`+${extraCount.pc}`}
        </li>
      )}
      {extraCount.tablet > 0 && (
        <li className='border-solid-white absolute right-0 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-tp-pink text-tp-violet_900 pc:hidden'>
          {`+${extraCount.tablet}`}
        </li>
      )}
    </ul>
  );
};

export default Members;

interface ImageMember {
  index: number;
  profileImageUrl: string;
}

function ImageMember({ profileImageUrl, index }: ImageMember) {
  return (
    <div
      className={`border-solid-white absolute h-[38px] w-38 items-center justify-center overflow-hidden rounded-full ${INDEX_POSITION[index]}`}>
      <img
        src={profileImageUrl}
        style={{
          objectFit: 'cover',
        }}
        alt='멤버 프로필 이미지'
      />
    </div>
  );
}

export const COLOR_LIST = [
  'bg-[#5be352]', // green
  'bg-[#bc57ff]', // purple
  'bg-[#FFC85A]', // orange
  'bg-[#9DD7ED]', // blue
  'bg-[#ff6ee0]', // pink
];

interface DefaultMember {
  index: number;
  nickname: string;
}

function DefaultMember({ nickname, index }: DefaultMember) {
  const initial = nickname[0].toUpperCase();

  const colorIndex = initial.charCodeAt(0) % COLOR_LIST.length;
  const color = COLOR_LIST[colorIndex];

  return (
    <div
      className={`border-solid-white text-base font-semibold subheading-normal absolute h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full text-WHITE ${color} ${INDEX_POSITION[index]}`}>
      {initial}
    </div>
  );
}
