import { ACCESS_TOKEN } from '@utils/temporaryToken';

export const getLoginUserProfile = async () => {
  const response = await fetch('https://sp-taskify-api.vercel.app/14/users/me', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      authorization: ACCESS_TOKEN,
    },
  });
  const result = response.json();
  return result;
};

// 현재 임의로 쿠키 값을 넣어줌
