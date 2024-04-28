import { getAccessToken } from '../handleToken';

interface ChangeDashBoardData {
  dashBoardId: number;
  changeData: {
    title: string;
    color: string;
  };
}

export const changeDashBoard = async ({ dashBoardId, changeData }: ChangeDashBoardData) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const response = await fetch(`https://sp-taskify-api.vercel.app/14/dashboards/${dashBoardId}`, {
      method: 'PUT',
      body: JSON.stringify(changeData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }

    switch (response.status) {
      case 400: {
        throw new Error('수정할 내용을 입력해 주세요.');
      }
      case 403: {
        throw new Error('대시보드 수정 권한이 없습니다.');
      }
      case 404: {
        throw new Error('대시보드가 존재하지 않습니다.');
      }
    }
  }
};
