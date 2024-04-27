import { ACCESS_TOKEN } from '@/utils/temporaryToken';

export const getLoginUserProfile = async () => {
  const response = await fetch('https://sp-taskify-api.vercel.app/14/users/me', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      authorization: ACCESS_TOKEN,
    },
  });
  const result = response.json();
  switch (response.status) {
    case 200: {
      return result;
    }
    case 401: {
      throw new Error('올바르지 않은 조회입니다. 다시 로그인해 주세요.');
    }
    case 404: {
      throw new Error('존재하지 않는 대시보드입니다.');
    }
    default: {
      throw new Error('알 수 없는 이유로 회원정보 조회에 실패했습니다. 다시 로그인해 주세요.');
    }
  }
};
