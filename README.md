# 🗂️ Kanban Board with Drag & Drop and Animation

A fully functional Kanban board built using **Next.js**, **Supabase**, **Tailwind CSS**, and **Framer Motion**. This project features custom drag-and-drop functionality with smooth animations, inspired by a tutorial video—but implemented entirely by me with my own twist.

## 🚀 Features

- ✅ Add, edit, and delete **cards**
- ✅ Add, edit, and delete **columns**
- ✅ Drag and drop **cards** between columns
- ✅ Drag and drop to **reorder columns**
- 🎞️ Smooth animations using **Framer Motion**

## 🛠️ Tech Stack

- **Next.js** – React framework for server-rendered and static web apps
- **Supabase** – Backend-as-a-Service (authentication, database, and API)
- **Tailwind CSS** – Utility-first CSS for styling
- **Framer Motion** – Powerful animation library for React

## 📚 What I Learned

- How to build a custom drag-and-drop experience with animations
- How to manage and persist board state using Supabase
- Best practices for dynamic UI updates and layout transitions

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/kanflow.git
cd kanflow
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it in action.

## 🧠 Inspiration

The core idea and structure were inspired by a YouTube video, but all animations, drag logic, and design decisions were implemented independently.

## 📸 Screenshots

> *(Optional: add screenshots or a demo GIF here)*

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to star ⭐ this repo if you found it useful!
