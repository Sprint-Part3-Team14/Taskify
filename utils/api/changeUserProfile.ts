import { getAccessToken } from '../handleToken';

interface NewProfileProps {
  nickname: string;
  profileImageUrl: string;
}

export const changeUserProfile = async ({ newProfileData }: { newProfileData: NewProfileProps }) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/users/me`, {
      method: 'PUT',
      body: JSON.stringify(newProfileData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const result = response.json();
      return result;
    }

    switch (response.status) {
      case 400: {
        throw new Error('닉네임은 10자 이하로 작성해 주세요.');
      }
      case 401: {
        throw new Error('프로필 변경에 실패했습니다. 다시 로그인해 주세요.');
      }
    }
  }
};
