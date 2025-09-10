// Cấu hình API Key - Thay đổi giá trị này khi cần
export const API_CONFIG = {
  // Thay đổi API key của bạn tại đây
  GEMINI_API_KEY: 'your_gemini_api_key_here',
  
  // Các cấu hình khác
  API_BASE_URL: 'https://generativelanguage.googleapis.com',
} as const;

// Hàm lấy API key với fallback
export const getGeminiApiKey = (): string => {
  // Ưu tiên lấy từ localStorage (do user nhập)
  const storedKey = localStorage.getItem('gemini_api_key');
  if (storedKey) {
    return storedKey;
  }
  
  // Fallback về key trong config
  return API_CONFIG.GEMINI_API_KEY;
};