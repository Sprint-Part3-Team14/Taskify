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
  switch (response.status) {
    case 204: {
      return 'success';
    }
    case 400: {
      throw new Error('400');
    }
    case 404: {
      throw new Error('존재하지 않는 유저입니다.');
    }
    default: {
      throw new Error('알 수 없는 이유로 비밀번호 변경에 실패했습니다. 다시 로그인해 주세요.');
    }
  }
};
