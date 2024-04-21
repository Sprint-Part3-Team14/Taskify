export interface I_CardList {
  cardDatas?: I_Card[];
  title: string;
}

export interface I_DashboardTitle {
  title: string;
  count: number;
  columnId: string;
  dashboardId: string;
}

export interface I_DashboardColumns {
  result: string;
  data: [];
}

export interface I_DashboardColumnsItem {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface I_Column {
  column: { id: string; title: string; cardIds: string[] };
  cards: {
    id: number;
    content: {
      image?: string;
      title: string;
      tag: [];
      date: string;
      user: string | null;
    };
  }[];
  index: number;
  dashboardId: string;
}

export interface I_Card {
  card: {
    id: number;
    content: {
      image?: string;
      title: string;
      tag: [];
      date: string;
      user: string | null;
    };
  };
  index: number;
}
