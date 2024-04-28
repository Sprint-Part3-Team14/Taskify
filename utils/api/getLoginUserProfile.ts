import { ACCESS_TOKEN } from '@/utils/temporaryToken';

export const getLoginUserProfile = async () => {
  const response = await fetch('https://sp-taskify-api.vercel.app/14/users/me', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      authorization: ACCESS_TOKEN,
    },
  });

  if (response.ok) {
    const result = response.json();
    return result;
  }

  switch (response.status) {
    case 401: {
      throw new Error('프로필 정보 로드에 실패했습니다. 다시 로그인해 주세요.');
    }
    case 404: {
      throw new Error('존재하지 않는 유저입니다. 다시 로그인해 주세요.');
    }
  }
};
