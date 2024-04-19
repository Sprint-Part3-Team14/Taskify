import { ACCESS_TOKEN } from '../temporaryToken';

interface NewProfileProps {
  nickname: string;
  profileImageUrl: string;
}

export const changeUserProfile = async ({ newProfileData }: { newProfileData: NewProfileProps }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/users/me`, {
    method: 'PUT',
    body: JSON.stringify(newProfileData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });
  const result = response.json();
  return result;
};
