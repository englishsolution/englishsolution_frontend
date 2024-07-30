// mockData.js

const youtubeVideoData = [
  {
    video_id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    video_id: "e-ORhEE9VVg",
    title: "Toto - Africa (Official Music Video)",
    thumbnail: "https://img.youtube.com/vi/e-ORhEE9VVg/hqdefault.jpg",
  },
  {
    video_id: "M7lc1UVf-VE",
    title: "YouTube Developers - YouTube API - The Official Introduction",
    thumbnail: "https://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg",
  },
  {
    video_id: "L_j8tBcl4FQ",
    title: "How to Make a Perfect Espresso",
    thumbnail: "https://img.youtube.com/vi/L_j8tBcl4FQ/hqdefault.jpg",
  },
  {
    video_id: "5qap5aO4i9A",
    title: "Relaxing Jazz Music - Coffee Shop Music",
    thumbnail: "https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg",
  },
  {
    video_id: "bB2A84LB0e4",
    title: "The Science Behind a Perfect Cup of Coffee",
    thumbnail: "https://img.youtube.com/vi/bB2A84LB0e4/hqdefault.jpg",
  },
  {
    video_id: "l0c-z7FICLw",
    title: "Travel Vlog - Exploring Kyoto",
    thumbnail: "https://img.youtube.com/vi/l0c-z7FICLw/hqdefault.jpg",
  },
  {
    video_id: "a6c9o5Cnd7k",
    title: "Daily Routine - Morning Exercises",
    thumbnail: "https://img.youtube.com/vi/a6c9o5Cnd7k/hqdefault.jpg",
  },
  {
    video_id: "7wT6fN8xgwA",
    title: "Top 10 Best Coding Practices",
    thumbnail: "https://img.youtube.com/vi/7wT6fN8xgwA/hqdefault.jpg",
  },
  {
    video_id: "bSyCZ5GSwJM",
    title: "Learning Python - Beginner's Guide",
    thumbnail: "https://img.youtube.com/vi/bSyCZ5GSwJM/hqdefault.jpg",
  },
  {
    video_id: "gbi1skNH2hw",
    title: "DIY Home Improvement - Easy Fixes",
    thumbnail: "https://img.youtube.com/vi/gbi1skNH2hw/hqdefault.jpg",
  },
  {
    video_id: "ABkj-I8c4z4",
    title: "Meditation Music - Relaxing and Calming",
    thumbnail: "https://img.youtube.com/vi/ABkj-I8c4z4/hqdefault.jpg",
  },
];

const generateSentences = (videoId, count) => {
  return Array.from({ length: count }, (_, index) => ({
    sentence_id: index + 1,
    video_id: videoId,
    sentence_eg: `Sample sentence ${index + 1} for video ${videoId}`,
    sentence_kr: `샘플 문장 ${index + 1} for video ${videoId}`,
    save_date: "2024-07-25",
    state: "saved",
  }));
};

const generateWords = (videoId, count) => {
  return Array.from({ length: count }, (_, index) => ({
    word_id: index + 1,
    video_id: videoId,
    word_eg: `word${index + 1}`,
    word_kr: `단어${index + 1}`,
    save_date: "2024-07-25",
    state: "saved",
  }));
};

const mockData = youtubeVideoData.map((video, index) => ({
  video_id: video.video_id,
  user_id: 1, // Unified user_id
  link: `https://www.youtube.com/watch?v=${video.video_id}`,
  title: video.title,
  save_date: "2024-07-25",
  view_count: Math.floor(Math.random() * 5000), // Random view count for variety
  img: video.thumbnail,
  sentences: generateSentences(video.video_id, index < 2 ? 30 : 20), // 30 sentences for the first 2 videos, 20 for the rest
  words: generateWords(video.video_id, index < 2 ? 30 : 20), // 30 words for the first 2 videos, 20 for the rest
}));

export default mockData;
