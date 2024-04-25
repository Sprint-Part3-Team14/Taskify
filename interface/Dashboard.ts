export interface I_Column {
  id?: number;
  title?: string;
  teamId?: string;
  createdAt?: string;
  updatedAt?: string;
  dashboardId: string;
}

export interface I_Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  imageUrl: string | null;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface I_Members {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: any;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}
