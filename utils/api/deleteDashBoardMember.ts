import { ACCESS_TOKEN } from '../temporaryToken';

export const deleteDashBoardMember = async ({ memberId }: { memberId }) => {
  await fetch(`https://sp-taskify-api.vercel.app/14/members/${memberId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
  });
};
