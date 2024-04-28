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

  if (response.ok) {
    return;
  }

  switch (response.status) {
    case 403: {
      throw new Error('대시보드 초대 취소 권한이 없습니다.');
    }
    case 404: {
      throw new Error('대시보드가 존재하지 않습니다.');
    }
  }
};
