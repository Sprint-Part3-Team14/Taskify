export interface I_ModalSubtitle {
  placeholder?: string;
}

export type I_Modal = keyof I_ModalTitle;

export interface I_Modals {
  createColumn: {};
}

export type I_ModalTitle = '초대하기' | '컬럼 관리' | '할 일 생성' | '새 컬럼 생성' | '할 일 수정';
