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

  if (response.status === 204) {
    return 'success';
  }

  const result = response.json();

  return result;
};
