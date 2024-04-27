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

  if (response.ok) {
    const result = response.json();
    return result;
  }

  switch (response.status) {
    default: {
      throw new Error('프로필 이미지를 업로드할 수 없습니다. 사진을 변경해 주세요.');
    }
  }
};
