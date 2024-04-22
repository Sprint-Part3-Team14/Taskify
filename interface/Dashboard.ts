export interface I_ColumnOrder_Columns {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface I_ColumnOrder_Cards {
  id: number;
  title: string;
  description: string;
  tags: Array<string>;
  dueDate: string;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: any;
  };
  imageUrl: string;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface I_Column {
  column: I_ColumnList;
  cards: I_CardItem[];
  index: number;
  dashboardId: string;
  dragDropItem: I_DragDropItem;
  id?: number;
  title?: string;
}

export interface I_ColumnList {
  id: string;
  title: string;
  cardIds: [];
}

export interface I_CardItem {
  content: { title: string; image: string; dsecription: string; date: string; tag: Array<string>; user: string };
  id: number;
  length: number;
}

export interface I_DragDropItem {
  cards: {
    [key: string]: {
      id: number;
      content: {
        title: string;
        image: string;
        description: string;
        date: string;
        tag: string[];
        user: string;
      };
    };
  };
  columns: {
    [key: string]: {
      id: string;
      title: string;
      cardIds: number[];
    };
  };
  columnOrder: string[];
}

export interface I_DashboardMember {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: any;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

export interface I_Card {
  column: I_ColumnList;
  cards: I_CardItem;
  index?: number;
  dashboardId?: string;
  dragDropItem: I_DragDropItem;
  members: I_DashboardMember[];
}
