import { ACCESS_TOKEN } from '../temporaryToken';

export const deleteDashBoardMember = async ({ memberId }: { memberId }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/members/${memberId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });

  if (response.ok) {
    return;
  }

  switch (response.status) {
    case 403: {
      throw new Error('구성원 삭제 권한이 없습니다.');
    }
    case 404: {
      throw new Error('해당 구성원이 존재하지 않습니다.');
    }
  }
};
