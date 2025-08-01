export const env = {
  isDev: import.meta.env.DEV,
  apiUrl: import.meta.env.VITE_BASE_URL ?? "http://localhost:5173",
};
