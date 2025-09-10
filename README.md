# DESIGN24 - AI Chat Assistant

AI chatbot hỗ trợ cho khóa học "AI Skills for Tour Guides" của DESIGN24.

## 🚀 Deploy lên Netlify

### Bước 1: Cấu hình API Key
Trước khi deploy, thay đổi API key trong file `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  // Thay đổi API key của bạn tại đây
  GEMINI_API_KEY: 'your_actual_gemini_api_key_here',
  
  API_BASE_URL: 'https://generativelanguage.googleapis.com',
} as const;
```

### Bước 2: Deploy
1. Nén toàn bộ source code thành file ZIP
2. Vào [Netlify](https://app.netlify.com/)
3. Kéo thả file ZIP vào Netlify Deploy
4. Netlify sẽ tự động build và deploy

### Cấu hình Build
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

## 🔧 Chạy Local

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## 📁 Cấu trúc Project

```
src/
├── components/          # React components
├── config/             # Cấu hình API
├── data/               # Course database
├── services/           # API services
└── pages/              # App pages
```

## 🔑 Quản lý API Key

Ứng dụng hỗ trợ 2 cách cấu hình API key:

1. **Trong source code** (file `src/config/api.ts`) - Thích hợp cho deploy
2. **Nhập từ UI** - API key sẽ được lưu vào localStorage

## 📞 Hỗ trợ

- Email: Design24.vn@gmail.com
- Phone: 0704.888.009 | 0784.888.009

---

## Project info

**URL**: https://lovable.dev/projects/7e4965a9-f9db-42a3-8bd9-565476a758de

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7e4965a9-f9db-42a3-8bd9-565476a758de) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7e4965a9-f9db-42a3-8bd9-565476a758de) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
