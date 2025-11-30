// Mock Data Index - Tüm mock verileri export eden ana dosya

import usersData from './users.json';
import postsData from './posts.json';
import postCommentsData from './post-comments.json';
import jobsData from './jobs.json';
import topicsData from './topics.json';
import entriesData from './entries.json';
import academicMaterialsData from './academic-materials.json';
import venuesData from './venues.json';
import venueReviewsData from './venue-reviews.json';
import eventsData from './events.json';
import placesData from './places.json';
import notificationsData from './notifications.json';
import coinTransactionsData from './coin-transactions.json';
import referralsData from './referrals.json';
import leaderboardData from './leaderboard.json';
import questsData from './quests.json';
import categoriesData from './categories.json';
import badgesData from './badges.json';
import configData from './config.json';

// Users
export const users = usersData.users;
export type MockUser = typeof users[number];

// Posts
export const posts = postsData.posts;
export type MockPost = typeof posts[number];

// Post Comments
export const postComments = postCommentsData.postComments;
export type MockPostComment = typeof postComments[number];

// Jobs
export const jobs = jobsData.jobs;
export type MockJob = typeof jobs[number];

// Topics
export const topics = topicsData.topics;
export type MockTopic = typeof topics[number];

// Entries
export const entries = entriesData.entries;
export type MockEntry = typeof entries[number];

// Academic Materials
export const academicMaterials = academicMaterialsData.academicMaterials;
export type MockAcademicMaterial = typeof academicMaterials[number];

// Venues
export const venues = venuesData.venues;
export type MockVenue = typeof venues[number];

// Venue Reviews
export const venueReviews = venueReviewsData.venueReviews;
export type MockVenueReview = typeof venueReviews[number];

// Events
export const events = eventsData.events;
export type MockEvent = typeof events[number];

// Places
export const places = placesData.places;
export type MockPlace = typeof places[number];

// Notifications
export const notifications = notificationsData.notifications;
export type MockNotification = typeof notifications[number];

// Coin Transactions
export const coinTransactions = coinTransactionsData.coinTransactions;
export type MockCoinTransaction = typeof coinTransactions[number];

// Referrals
export const referrals = referralsData.referrals;
export const userReferralStats = referralsData.userReferralStats;
export type MockReferral = typeof referrals[number];

// Leaderboard
export const leaderboard = leaderboardData.leaderboard;
export type MockLeaderboard = typeof leaderboard;

// Quests
export const quests = questsData.quests;
export type MockQuests = typeof quests;

// Categories
export const categories = categoriesData.categories;
export type MockCategories = typeof categories;

// Badges
export const badges = badgesData.badges;
export const rarityColors = badgesData.rarityColors;
export type MockBadge = typeof badges[number];

// Config
export const appConfig = configData.appConfig;
export const coinConfig = configData.coinConfig;
export const roles = configData.roles;
export const pagination = configData.pagination;
export const venueAmenities = configData.venueAmenities;

// Helper Functions
export const getUserById = (id: string) => users.find(user => user.id === id);
export const getPostById = (id: string) => posts.find(post => post.id === id);
export const getTopicById = (id: string) => topics.find(topic => topic.id === id);
export const getTopicBySlug = (slug: string) => topics.find(topic => topic.slug === slug);
export const getVenueById = (id: string) => venues.find(venue => venue.id === id);
export const getVenueBySlug = (slug: string) => venues.find(venue => venue.slug === slug);
export const getEventById = (id: string) => events.find(event => event.id === id);
export const getPlaceById = (id: string) => places.find(place => place.id === id);
export const getPlaceBySlug = (slug: string) => places.find(place => place.slug === slug);

export const getPostComments = (postId: string) => 
  postComments.filter(comment => comment.postId === postId);

export const getTopicEntries = (topicId: string) => 
  entries.filter(entry => entry.topicId === topicId);

export const getVenueReviews = (venueId: string) => 
  venueReviews.filter(review => review.venueId === venueId);

export const getUserNotifications = (userId: string) => 
  notifications.filter(notification => notification.userId === userId);

export const getUserTransactions = (userId: string) => 
  coinTransactions.filter(transaction => transaction.userId === userId);

export const getJobsByCategory = (category: string) => 
  jobs.filter(job => job.category === category);

export const getTopicsByCategory = (category: string) => 
  topics.filter(topic => topic.category === category);

// Kullanıcının postlarını getir
export const getUserPosts = (userId: string) => 
  posts.filter(post => post.authorId === userId);

// Post için yorum sayısını getir
export const getPostCommentCount = (postId: string) => 
  postComments.filter(c => c.postId === postId).length;

// Pagination helper
export const paginateArray = <T>(array: T[], page: number, limit: number): { data: T[], total: number, totalPages: number, currentPage: number } => {
  const total = array.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: array.slice(start, end),
    total,
    totalPages,
    currentPage: page
  };
};

// Kullanıcının yorumlarını getir
export const getUserComments = (userId: string) =>
  postComments.filter(comment => comment.authorId === userId);

// Kullanıcının iş ilanlarını getir
export const getUserJobs = (userId: string) =>
  jobs.filter(job => job.authorId === userId);

// Post detail with comments (nested)
export const getPostWithComments = (postId: string) => {
  const post = getPostById(postId);
  if (!post) return null;

  const author = getUserById(post.authorId);
  const comments = getPostComments(postId);

  // Build nested comment tree
  const rootComments = comments.filter(c => !c.parentCommentId);
  
  const buildCommentTree = (comment: typeof comments[number]): any => {
    const replies = comments.filter(c => c.parentCommentId === comment.id);
    const commentAuthor = getUserById(comment.authorId);
    
    return {
      ...comment,
      author: commentAuthor,
      isPostAuthor: comment.authorId === post.authorId,
      replies: replies.map(buildCommentTree)
    };
  };

  return {
    ...post,
    author,
    comments: rootComments.map(buildCommentTree)
  };
};

// Topic detail with entries
export const getTopicWithEntries = (topicIdOrSlug: string) => {
  const topic = getTopicById(topicIdOrSlug) || getTopicBySlug(topicIdOrSlug);
  if (!topic) return null;

  const topicEntries = getTopicEntries(topic.id);
  const creator = getUserById(topic.createdBy);

  return {
    ...topic,
    creator,
    entries: topicEntries.map(entry => ({
      ...entry,
      author: getUserById(entry.authorId)
    }))
  };
};

// Venue detail with reviews
export const getVenueWithReviews = (venueIdOrSlug: string) => {
  const venue = getVenueById(venueIdOrSlug) || getVenueBySlug(venueIdOrSlug);
  if (!venue) return null;

  const reviews = getVenueReviews(venue.id);

  return {
    ...venue,
    reviews: reviews.map(review => ({
      ...review,
      author: getUserById(review.authorId)
    }))
  };
};

// Default export with all data
export default {
  users,
  posts,
  postComments,
  jobs,
  topics,
  entries,
  academicMaterials,
  venues,
  venueReviews,
  events,
  places,
  notifications,
  coinTransactions,
  referrals,
  userReferralStats,
  leaderboard,
  quests,
  categories,
  badges,
  rarityColors,
  appConfig,
  coinConfig,
  roles,
  pagination,
  venueAmenities
};

