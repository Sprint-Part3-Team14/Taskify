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

  if (response.ok) {
    const result = response.json();
    return result;
  }

  switch (response.status) {
    case 400: {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }
    case 403: {
      throw new Error('대시보드 초대 권한이 없습니다.');
    }
    case 404: {
      throw new Error('사용자가 존재하지 않습니다.');
    }
    case 409: {
      throw new Error('이미 대시보드에 초대된 멤버입니다.');
    }
  }
};
