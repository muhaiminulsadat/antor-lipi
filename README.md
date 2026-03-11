# অন্তর্লিপি · Antorlipi

> *Your private sanctuary for thought, reflection, and emotional clarity.*

Antorlipi is a full-stack personal journaling application built with the Next.js App Router. It offers a distraction-free writing experience with mood tracking, collection-based organization, and analytics — all wrapped in a warm, minimal aesthetic.

---

## ✨ Features

- **Rich Text Journaling** — Powered by BlockNote, supporting headings, lists, bold, italic, and more
- **Mood Tracking** — Tag every entry with a mood and score to track your emotional patterns over time
- **Collections** — Organise entries into named folders, with an Unorganized catch-all
- **Mood Analytics Dashboard** — Visual area chart showing average mood score over 7, 15, or 30 days
- **Authentication** — Secure email/password auth via Better Auth with session caching
- **Fully Responsive** — Mobile-first design with a floating glassmorphism navbar
- **Inline Editing** — Edit title, mood, collection, and content directly on the entry detail page

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript (JSX) |
| Auth | Better Auth |
| Database | MongoDB via Mongoose |
| Styling | Tailwind CSS + ShadCN UI (New York) |
| Rich Text | BlockNote |
| Charts | Recharts |
| Icons | Lucide React |
| Toast | react-hot-toast |
| Date Utils | date-fns |

---

## 📁 Project Structure

```
antorlipi/
├── app/
│   ├── (auth)/
│   │   ├── login/               # Login page
│   │   └── sign-up/             # Sign up page
│   ├── (landing)/
│   │   └── page.jsx             # Public landing page
│   ├── (main)/
│   │   ├── dashboard/           # Mood analytics dashboard
│   │   ├── collection/
│   │   │   └── [collectionId]/  # Collection detail + entries
│   │   └── journal/
│   │       └── [journalId]/     # Entry detail + inline edit
│   ├── journal/
│   │   └── write/               # New entry page
│   └── api/
│       └── auth/[...all]/       # Better Auth API handler
├── actions/
│   ├── journal.action.js        # Journal server actions
│   └── collection.action.js     # Collection server actions
├── components/
│   ├── layout/                  # Navbar, Footer, BackButton
│   └── collection/              # Folder UI components
├── hooks/
│   └── auth.hook.js             # Auth hooks
├── lib/
│   ├── auth.js                  # Better Auth server config
│   ├── auth-client.js           # Better Auth client config
│   └── db.js                    # MongoDB connection
├── models/
│   ├── entry.model.js
│   ├── collection.model.js
│   └── draft.model.js
└── middleware.js                 # Route protection
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/antorlipi.git
cd antorlipi

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄 Database Models

### Entry
```js
{
  title: String,        // required
  content: String,      // BlockNote JSON stringified
  mood: String,         // e.g. "happy", "calm"
  moodScore: Number,    // 1–10
  collectionId: String, // optional
  userId: String        // required
}
```

### Collection
```js
{
  name: String,         // required
  description: String,  // optional
  userId: String        // required
}
```

---

## 🔐 Authentication

Authentication is handled by [Better Auth](https://www.better-auth.com). Sessions are cached via cookies with a 1-hour TTL. Route protection is enforced in `middleware.js` using `betterFetch` to validate sessions on every protected request.

**Protected routes:** `/dashboard`, `/journal`, `/collection`  
**Auth routes (redirect if logged in):** `/login`, `/sign-up`

---

## 📊 Mood Analytics

The dashboard tracks mood data across selected time ranges:

- **Total Entries** — count of entries in the period
- **Average Mood Score** — mean score across all entries
- **Dominant Mood** — most frequently logged mood
- **Area Chart** — daily average mood score plotted over time

---

## 🧱 Architecture Decisions

### Server Components for Data Fetching
Every `page.jsx` is a server component that fetches data and passes it to client `_components`. No loading spinners for initial data, no exposed API keys.

### Server Actions Pattern
All mutations go through server actions returning a consistent shape:
```js
{ success: true, data: ... }   // on success
{ success: false, error: "..." } // on failure
```
The client handles toasts and redirects. The server stays pure.

### BlockNote SSR
BlockNote uses browser-only APIs. All BlockNote components are wrapped in `dynamic(() => import(...), { ssr: false })` inside a client wrapper component to prevent server-side rendering errors.

---

## 📝 License

MIT © [Sadat](https://github.com/yourusername)

---

<p align="center">Made with ❤️ by Sadat the Handsome</p>