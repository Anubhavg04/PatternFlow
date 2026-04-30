# 🚀 PatternFlow — AI-powered DSA Learning System
<p align="center">
  <b>Understand DSA. Not memorize it.</b>
</p>
<p align="center">
  <img src="./public/dashboard.png" alt="PatternFlow Dashboard" width="600" />
</p>
<p align="center">
  <i>AI-powered pattern recognition dashboard</i>
</p>

> Stop memorizing solutions. Start recognizing patterns.

PatternFlow is an AI-powered platform that helps developers learn Data Structures & Algorithms by focusing on **pattern recognition**, not brute-force solution memorization.

---

## 🧠 Problem

Most platforms (LeetCode, GFG, etc.) focus on:
- ❌ Giving full solutions too early  
- ❌ Encouraging passive learning  
- ❌ No pattern-level understanding  
- ❌ No personalized feedback  

**Result:**  
Users solve problems but fail in interviews.

---

## 💡 Solution

```
Problem → Think First → Guided Hints → Pattern Recognition → Learning Reinforced
```

Instead of giving answers, PatternFlow:
- Trains thinking  
- Reveals patterns gradually  
- Builds intuition  

---

## Solve Preview
<p align="center">
  <img src="./public/solve.png" alt="PatternFlow Solve" width="600" />
</p>

---

## ✨ Features

### 🧩 Solve Flow
- Paste problem (LeetCode, GFG, Codeforces supported)
- AI extracts:
  - Problem summary
  - Pattern detection
  - Difficulty
- Guided hints (step-by-step)

---

### 🔒 Smart Paywall (Learning-first)
Free users get:
- Think-first prompt
- 2 hints

Locked:
- Final hint
- Pattern reveal
- Memory hook
- Similar problems
- Missing concepts

---

### 🧠 Pattern Learning
- Pattern detection (Hash Map, DP, Sliding Window, etc.)
- Memory hooks for retention
- Interview spotting tips

---

### 📊 Dashboard
- Problems solved
- Patterns seen
- Pattern mastery
- Streak tracking
- Recent solves

---

### ⚡ AI Optimization
- Rate limiting
- Token usage tracking
- Semantic caching (in progress)
- Cost control

---

### 💳 Monetization
- Razorpay integration
- Plans:
  - Free
  - Basic (₹149/month)
  - Pro (₹299/month)

---

## 🏗️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Supabase (PostgreSQL DB)
- Clerk Auth 

### AI
- OpenAI API
- Prompt engineering (pattern-focused)

### Payments
- Razorpay

---

## ⚙️ Setup Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-username/patternflow.git
cd patternflow
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# OpenAI
OPENAI_API_KEY=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

---

### 4. Run Locally

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 🚀 Deployment

Recommended: Vercel

```bash
npx vercel
```

---

## 🔐 Payment Flow

```
Frontend → Create Order → Razorpay Popup  
→ Payment Success → Backend Verification  
→ DB Update → Plan Activated
```

---

## 🧠 Learning Philosophy

PatternFlow is built on:

> “Don’t solve problems. Understand patterns.”

We enforce:
- Delayed answers  
- Active thinking  
- Pattern abstraction  

---

## 📈 Roadmap

- Semantic caching (problem similarity)
- Interview mode (timed + pressure)
- Pattern flashcards
- Personalized learning path
- AI mentor mode

---

## 🤝 Contributing

Currently early-stage / private.

---

## 📬 Contact

Built by: Anubhav Gupta  
(Add your Twitter / LinkedIn here)

---

## ⭐ Support

If you like this project, consider giving it a ⭐
