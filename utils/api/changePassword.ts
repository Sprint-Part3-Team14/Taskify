import { ACCESS_TOKEN } from '../temporaryToken';

export interface PasswordData {
  password: string;
  newPassword: string;
}

export const changePassWord = async ({ changePasswordValue }: { changePasswordValue: PasswordData }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/auth/password`, {
    method: 'PUT',
    body: JSON.stringify(changePasswordValue),
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });

  if (response.ok) {
    return;
  }

  switch (response.status) {
    case 400: {
      throw new Error('400');
    }
    case 404: {
      throw new Error('유저 정보가 확인되지 않습니다. 다시 로그인해 주세요.');
    }
  }
};
