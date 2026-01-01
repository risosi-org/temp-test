import { Audience } from "../audience/audience.model";
import { Messages } from "../messages/messages.model";
import { Comments } from "../comments/comments.model";
import { Posts } from "../posts/posts.model";
import { IOverview } from "./overview.interface";

const getOverviewStats = async (): Promise<IOverview> => {
  const adminUser = await Audience.findOne({ isAdmin: true });
  const adminUserId = adminUser?.userid;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // Unique Message Users
  const getUniqueMessageUsers = async (since?: Date) => {
    const match: any = adminUserId
      ? { $or: [{ sender: adminUserId }, { receiver: adminUserId }] }
      : {};
    if (since) match.createdAt = { $gte: since };

    const result = await Messages.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", adminUserId] }, "$receiver", "$sender"],
          },
        },
      },
      { $count: "count" },
    ]);
    return result[0]?.count || 0;
  };

  // Unique Comment Users (excluding admin)
  const getUniqueCommentUsers = async (since?: Date) => {
    const match: any = adminUserId ? { userId: { $ne: adminUserId } } : {};
    if (since) match.createdAt = { $gte: since };

    const result = await Comments.aggregate([
      { $match: match },
      { $group: { _id: "$userId" } },
      { $count: "count" },
    ]);
    return result[0]?.count || 0;
  };

  // Message Stats
  const messageReplied = adminUserId
    ? await Messages.countDocuments({ sender: adminUserId })
    : 0;
  const messageReceived = adminUserId
    ? await Messages.countDocuments({ receiver: adminUserId })
    : 0;

  // Comment Stats
  const commentReplied = adminUserId
    ? await Comments.countDocuments({ userId: adminUserId })
    : 0;
  const commentReceived = adminUserId
    ? await Comments.countDocuments({ userId: { $ne: adminUserId } })
    : 0;

  // Disabled Stats
  const disabledMessages = await Audience.countDocuments({
    isMessageEnabled: false,
  });
  const disabledComments = await Audience.countDocuments({
    isCommentEnabled: false,
  });

  // Fetch Reach and Engagement Data from Posts (last 7 days)
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const postsStats = await Posts.aggregate([
    { $match: { createdAt: { $gte: last7Days } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        reach: { $sum: "$reach" },
        likes: { $sum: "$likes" },
        comments: { $sum: "$comments" },
        shares: { $sum: "$shares" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const reachData = postsStats.map((stat) => ({
    date: stat._id,
    value: stat.reach,
  }));

  const engagementData = postsStats.map((stat) => ({
    date: stat._id,
    likes: stat.likes,
    comments: stat.comments,
    shares: stat.shares,
  }));

  // Recent Activity
  const recentPosts = await Posts.find().sort({ createdAt: -1 }).limit(2);
  const recentComments = await Comments.find().sort({ createdAt: -1 }).limit(2);

  const activities: any[] = [];

  recentPosts.forEach((post: any) => {
    activities.push({
      icon: "FileText",
      title: "New post published",
      description: post.caption.substring(0, 30) + "...",
      time: post.createdAt,
      color: "text-primary",
      link: `/posts`,
    });
  });

  recentComments.forEach((comment: any) => {
    activities.push({
      icon: "MessageSquare",
      title: "New comment received",
      description: comment.content.substring(0, 30) + "...",
      time: comment.createdAt,
      color: "text-chart-2",
      link: `/comments`,
    });
  });

  // Sort activities by time (descending)
  activities.sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeB - timeA;
  });

  // Convert time to string for the response
  const formattedActivities = activities.map((activity) => ({
    ...activity,
    time: activity.time.toISOString(),
  }));

  return {
    uniqueMessageUsers: {
      total: await getUniqueMessageUsers(),
      thisMonth: await getUniqueMessageUsers(monthStart),
    },
    uniqueCommentUsers: {
      total: await getUniqueCommentUsers(),
      thisMonth: await getUniqueCommentUsers(monthStart),
    },
    messages: {
      replied: messageReplied,
      received: messageReceived,
    },
    comments: {
      replied: commentReplied,
      received: commentReceived,
    },
    disabled: {
      messages: disabledMessages,
      comments: disabledComments,
    },
    reachData,
    engagementData,
    recentActivity: formattedActivities,
    demographics: [
      { name: "18-24", value: 22, color: "rgb(147, 51, 234)" },
      { name: "25-34", value: 38, color: "rgb(59, 130, 246)" },
      { name: "35-44", value: 24, color: "rgb(34, 197, 94)" },
      { name: "45+", value: 16, color: "rgb(234, 179, 8)" },
    ],
    topLocations: [
      { country: "United States", percentage: 42 },
      { country: "United Kingdom", percentage: 18 },
      { country: "Canada", percentage: 12 },
      { country: "Australia", percentage: 8 },
      { country: "Others", percentage: 20 },
    ],
  };
};

export const OverviewService = {
  getOverviewStats,
};
