import { ACCESS_TOKEN } from '../temporaryToken';

interface I_DeletePostInvitation {
  dashboardId: number;
  invitationId: number;
}

export const deletePostInvitation = async ({ dashboardId, invitationId }: I_DeletePostInvitation) => {
  const response = await fetch(
    `https://sp-taskify-api.vercel.app/14/dashboards/${dashboardId}/invitations/${invitationId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ACCESS_TOKEN,
      },
    }
  );

  const result = await response.json();

  switch (response.status) {
    case 204: {
      return 'success';
    }
    case 403: {
      throw new Error('대시보드 초대 취소 권한이 없습니다. 다시 로그인해 주세요.');
    }
    case 404: {
      throw new Error('존재하지 않는 초대 내역입니다.');
    }
    default: {
      throw new Error('알 수 없는 이유로 초대 취소에 실패했습니다. 다시 로그인해 주세요.');
    }
  }
};
