import { ACCESS_TOKEN } from '../temporaryToken';

interface ChangeDashBoardData {
  dashBoardId: number;
  changeData: {
    title: string;
    color: string;
  };
}

export const changeDashBoard = async ({ dashBoardId, changeData }: ChangeDashBoardData) => {
  const response = await fetch(`https://sp-taskify-api.vercel.app/14/dashboards/${dashBoardId}`, {
    method: 'PUT',
    body: JSON.stringify(changeData),
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
      throw new Error('수정할 내용을 입력해 주세요.');
    }
    case 403: {
      throw new Error('대시보드가 존재하지 않습니다.');
    }
    case 404: {
      throw new Error('대시보드가 존재하지 않습니다.');
    }
    default: {
      throw new Error('알 수 없는 이유로 대시보드 정보 수정에 실패했습니다.');
    }
  }
};
