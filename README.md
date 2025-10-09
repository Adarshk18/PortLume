# 🌟 PortLume — Illuminate Your Developer Presence

**PortLume** is an AI-powered SaaS that automatically builds and updates your developer portfolio — powered by your **GitHub, LinkedIn, and resume** data.  
No design skills. No manual updates. Just connect your profiles, and **PortLume** crafts a polished, interactive portfolio that truly represents you.

---

## 🚀 Features

### 🧩 MVP Highlights
- **GitHub Sync** — fetch repos, stars, and tech stack automatically  
- **Resume Parser** — extract experience, skills, and education from PDF/DOCX  
- **AI Content Generator** — write professional project summaries and About sections  
- **Custom Themes** — dynamic, animated, and share-ready portfolio themes  
- **Public Profile URL** — `username.portlume.dev` (or custom domain for Pro users)  
- **Dashboard** — manage projects, edit AI text, publish/unpublish, and view analytics  

### 💎 Pro Features (coming soon)
- **Custom Domain Mapping + SSL**
- **Advanced Analytics** (traffic, repo clicks, referrers)
- **Resume Export** — beautiful branded resume PDF
- **Marketplace** — community-built portfolio themes
- **LeetCode / Codeforces Integration**
- **Social Embeds** for sharing your profile

---

## 💰 Monetization Model
**Freemium** — start for free, upgrade when you’re ready:
| Tier | Features |
|------|-----------|
| Free | Auto portfolio, basic theme, watermark, 5 AI generations/mo |
| Pro | Custom domain, remove watermark, unlimited AI, analytics, PDF export |
| Team/Enterprise | Bulk onboarding for universities or dev communities |

Payment handled via **Stripe** with global currency support.

---

## 🏗️ Tech Stack

**Frontend:** React (Next.js or Vite) + TailwindCSS + Framer Motion  
**Backend:** Node.js + Express  
**Database:** MongoDB Atlas  
**AI Engine:** OpenAI API (or compatible LLM)  
**Auth:** GitHub OAuth + JWT  
**File Storage:** Cloudinary / AWS S3  
**Deployment:** Vercel (frontend) + Render (backend)

---

## ⚙️ Installation (Developer Setup)

```bash
# Clone the repo
git clone https://github.com/yourusername/portlume.git
cd portlume

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Create a .env file and add:
MONGO_URI=your_mongo_url
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
OPENAI_API_KEY=your_openai_key
JWT_SECRET=supersecretkey

# Run servers
npm run dev  # (frontend)
npm run dev  # (backend)
