export interface IOverview {
  uniqueMessageUsers: {
    total: number;
    thisMonth: number;
  };
  uniqueCommentUsers: {
    total: number;
    thisMonth: number;
  };
  messages: {
    replied: number;
    received: number;
  };
  comments: {
    replied: number;
    received: number;
  };
  disabled: {
    messages: number;
    comments: number;
  };
  reachData: { date: string; value: number }[];
  engagementData: {
    date: string;
    likes: number;
    comments: number;
    shares: number;
  }[];
  recentActivity: {
    icon: string;
    title: string;
    description: string;
    time: string;
    color: string;
    link?: string;
  }[];
  demographics: { name: string; value: number; color: string }[];
  topLocations: { country: string; percentage: number }[];
}
