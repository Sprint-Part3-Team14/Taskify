import { ACCESS_TOKEN } from '../temporaryToken';

export const changeUserProfileImage = async ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`https://sp-taskify-api.vercel.app/14/users/me/image`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  });
  const result = await response.json();
  return result;
};
