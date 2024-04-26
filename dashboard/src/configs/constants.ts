export const baseUrl: string = "http://localhost:3000/api";

export const OK: number = 200
export const BAD_REQUEST: number = 400
export const NOT_FOUND: number = 404
export const INTERNAL_SERVER: number = 500
export const NOT_CHANGED: number = 304
export const FORBIDDEN: number = 403
export const NOT_AUTHORIZED: number = 401
export const ALREADY_EXISTS: number = 409

export const announcements = [
    {
      _id: "1",
      title: "Important Announcement 1",
      description: "This is the description for the first announcement. This is a long description that may span multiple lines to test the layout.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-28T08:00:00.000Z",
      importance: "high",
      is_pinned: false,
    },
    {
      _id: "2",
      title: "Normal Announcement 2",
      description: "This is the description for the second announcement.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-27T08:00:00.000Z",
      importance: "normal",
      is_pinned: true,
    },
    {
      _id: "3",
      title: "Warning Announcement 3",
      description: "This is the description for the third announcement.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-26T08:00:00.000Z",
      importance: "warning",
      is_pinned: false,
    },
    // Add more announcements as needed
    {
      _id: "4",
      title: "Important Announcement 4",
      description: "This is the description for the fourth announcement.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-25T08:00:00.000Z",
      importance: "high",
      is_pinned: true,
    },
    {
      _id: "5",
      title: "Normal Announcement 5",
      description: "This is the description for the fifth announcement.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-24T08:00:00.000Z",
      importance: "normal",
      is_pinned: false,
    },
    {
      _id: "6",
      title: "Warning Announcement 6",
      description: "This is the description for the sixth announcement.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-23T08:00:00.000Z",
      importance: "warning",
      is_pinned: false,
    },
    {
      _id: "7",
      title: "Important Announcement 7",
      description: "This is the description for the seventh announcement.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-22T08:00:00.000Z",
      importance: "high",
      is_pinned: false,
    },
    {
      _id: "8",
      title: "Normal Announcement 8",
      description: "This is the description for the eighth announcement.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-21T08:00:00.000Z",
      importance: "normal",
      is_pinned: false,
    },
    {
      _id: "9",
      title: "Warning Announcement 9",
      description: "This is the description for the ninth announcement.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-20T08:00:00.000Z",
      importance: "warning",
      is_pinned: true,
    },
    {
      _id: "10",
      title: "Important Announcement 10",
      description: "This is the description for the tenth announcement.",
      image: "https://via.placeholder.com/150",
      created_at: "2024-02-19T08:00:00.000Z",
      importance: "high",
      is_pinned: false,
    },
];
  
  