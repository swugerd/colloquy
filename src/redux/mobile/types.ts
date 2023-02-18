export interface MobileState {
  title: string;
  isSidebarShow: boolean;
  isHeaderShow: boolean;
  hasArrowButton: boolean;
  hasAddButton: boolean;
  infoName: string;
  backText: string;
  membersCount: number;
  backButtonType: 'link' | 'button';
  chatId: number;
}
