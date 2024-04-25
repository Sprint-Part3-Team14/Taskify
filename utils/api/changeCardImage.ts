import { getAccessToken } from '../handleToken';

export const changeCardImage = async ({ file, columnId }: { file: File; columnId: number }) => {
  const formData = new FormData();
  formData.append('image', file);

  const accessToken = getAccessToken();
  const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns/${columnId}/card-image`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await response.json();
  return result;
};
