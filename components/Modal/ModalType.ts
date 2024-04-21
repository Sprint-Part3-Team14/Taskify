import { MouseEvent } from 'react';

export interface I_ModalSubtitle {
  placeholder?: string;
}

export type I_Modal = keyof I_ModalTitle;

export interface I_Modals {
  createColumn: {};
}

export type I_ModalTitle = '초대하기' | '컬럼 관리' | '할 일 생성' | '새 컬럼 생성' | '할 일 수정';

export interface I_ModalToggle {
  handleModal: (event: MouseEvent<HTMLElement>) => void;
  onClickFirstButton?: (event: MouseEvent<HTMLElement>) => void;
  onClickSecondButton?: (event: MouseEvent<HTMLElement>) => void;
  onSelectColor?: (color: string) => void;
  onChange: (title: string) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}
