import { ACCESS_TOKEN } from '../temporaryToken';

export const deleteDashBoardMember = async ({ memberId }: { memberId }) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/members/${memberId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });

  switch (response.status) {
    case 204: {
      return 'success';
    }
    case 403: {
      throw new Error('대시보드 구성원에 대한 삭제 권한이 없습니다. 다시 로그인해 주세요.');
    }
    case 404: {
      throw new Error('존재하지 않는 구성원입니다.');
    }
    default: {
      throw new Error('알 수 없는 이유로 구성원 삭제에 실패했습니다. 다시 로그인해 주세요.');
    }
  }
};
