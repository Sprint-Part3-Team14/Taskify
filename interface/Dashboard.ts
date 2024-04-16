import { I_Card } from './Card';

export interface I_CardList {
  cardDatas?: I_Card[];
  title: string;
}

export interface I_DashboardTitle {
  title: string;
  count: number;
}
