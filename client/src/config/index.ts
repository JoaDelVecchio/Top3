if (!import.meta.env.VITE_API_BASE_URL) {
  console.error("Missing required arguments");
  process.exit(1);
}

export const API_URL = import.meta.env.VITE_API_BASE_URL;
