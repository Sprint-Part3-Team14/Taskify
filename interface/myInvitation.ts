export interface I_MyDashboardListItem {
  id?: number;
  title: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
  createdByMe: boolean;
  userId: number;
}

export interface I_MyDashboardList {
  myDashboards: I_MyDashboardListItem[];
  cursorId?: number;
  totalCount?: number;
}

export interface I_SearchBarProps {
  onSearch: (keyword: string) => void;
}

export interface I_MYInviteList {
  invitationList: I_MYInviteListItem[];
  handleAccept: (id: number) => void;
  handleReject: (id: number) => void;
}

export interface I_MYInviteListItem {
  id: number;
  inviter: { nickname: string; email: string; id: number };
  teamId: string;
  dashboard: { title: string; id: number };
  invitee: { nickname: string; email: string; id: number };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}
