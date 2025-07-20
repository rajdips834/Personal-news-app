# 🧠 Personalized Content Dashboard

A customizable content dashboard that aggregates personalized news, movie recommendations, and trending posts. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit**, **NextAuth.js**, and **react-i18next**, this project supports multi-language UI, dark mode, route protection, real-time updates, and content bookmarking.

---

## 🚀 Features

### 🌐 Core Functionality

- 📰 **Content Feed**: Personalized and categorized content (News, Movies, Posts)
- 🔍 **Search & Filter**: Find and filter content with ease
- 📌 **Favorites**: Bookmark and view favorite content
- 📊 **Trending Section**: View what’s hot across categories

### 🛠 User Features

- 🙋 **User Profile**: Basic customizable user profile
- ✅ **Protected Routes**: Authenticated-only access
- 💾 **Session Persistence**: Via `redux-persist` and NextAuth session
- 🤌 **Dragable UI**: Via `React DnD

---

## 🧱 Tech Stack

| Technology        | Description                                     |
| ----------------- | ----------------------------------------------- |
| **Next.js**       | React Framework for SSR and routing             |
| **TypeScript**    | Type-safe development                           |
| **Tailwind CSS**  | Utility-first styling framework                 |
| **Redux Toolkit** | Global state management                         |
| **redux-persist** | Store session and state across reloads          |
| **NextAuth.js**   | Authentication (mock/credentials-based)         |
| **react-i18next** | Multi-language translation support              |
| **Framer Motion** | Smooth component animations                     |
| **Heroicons**     | Modern icon set used for actions like bookmarks |

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rajdips834/Personal-news-app
cd personalized-content-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file at the root:

```env
NEXT_PUBLIC_NEWS_API_KEY=your_key
NEXT_PUBLIC_TMDB_API_KEY=your_key


```

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

---

---

## 📁 Project Structure

```
components/        → UI components (cards, tabs, navbar, etc.)
store/             → Redux slices and configuration
pages/api/auth/    → NextAuth API routes
app/               → App Router-based structure
types/             → TypeScript interfaces and types
```

---

## 🧩 Future Enhancements

- OAuth providers (Google, GitHub)
- Real-time updates using WebSockets or SSE
- Richer profile customization
- Saved filters and feed personalization
- Notification center

---

## 🧑 Author

Made with ❤️ by **Rajdip Sinha**

- GitHub: [@rajdipsinha](https://github.com/rajdipsinha)
- Portfolio: [rajdipsinha.dev](https://rajdipsinha.dev)

---
