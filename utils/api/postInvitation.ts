import { ACCESS_TOKEN } from '../temporaryToken';

export const postInvitation = async ({ email, dashboardId }: { email: string; dashboardId: number }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/dashboards/${dashboardId}/invitations`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });

  const result = response.json();
  switch (response.status) {
    case 201: {
      return result;
    }
    case 400: {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }
    case 403: {
      throw new Error('대시보드 초대 권한이 없습니다.');
    }
    case 404: {
      throw new Error('존재하지 않는 대시보드입니다.');
    }
    case 409: {
      throw new Error('이미 대시보드에 초대된 멤버입니다.');
    }
    default: {
      throw new Error('알 수 없는 이유로 대시보드 초대에 실패했습니다. 다시 로그인해 주세요.');
    }
  }
};
