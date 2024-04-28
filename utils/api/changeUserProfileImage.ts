import { getAccessToken } from '../handleToken';

export const changeUserProfileImage = async ({ file }: { file: File }) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://sp-taskify-api.vercel.app/14/users/me/image`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    return result;
  }
};
