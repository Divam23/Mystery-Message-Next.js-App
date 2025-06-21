🕵️‍♂️ Mystery Message

A modern, anonymous social messaging platform built with Next.js, MongoDB, and OpenAI. Inspired by Qooh.me — this app allows users to create public message boards and receive anonymous questions or thoughts, with AI-generated message suggestions to spark interaction.

📸 Features
- ✅ User Authentication via NextAuth
- ✅ Anonymous message sending
- ✅ AI-generated question suggestions using OpenAI
- ✅ User dashboard to view/delete received messages
- ✅ Mobile responsive UI with Tailwind CSS
- ✅ Toast notifications and loading states
- ✅ REST API routes for CRUD operations
- ✅ Vercel deployment ready

🧰 Tech Stack
- Next.js (React framework with App Router)
- MongoDB (via Mongoose)
- NextAuth.js (Authentication)
- OpenAI API (AI-generated messages)
- Tailwind CSS (UI Styling)
- Axios (API requests)
- ShadCN/ui (Pre-built components)
- Vercel (Hosting)

🚀 Getting Started
1. Clone the repo
   git clone https://github.com/yourusername/mystery-message.git
   cd mystery-message

2. Install dependencies
   npm install

3. Set up environment variables
   Create a `.env.local` file:

   MONGODB_URI=your-mongodb-connection-string
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=http://localhost:3000
   OPENAI_API_KEY=your-openai-api-key

4. Run locally
   npm run dev

   Visit: http://localhost:3000

🛠 Project Structure
/
├── app/
│   ├── api/
│   │   ├── send-message/
│   │   ├── suggest-messages/
│   │   ├── delete-message/[messageid]/
│   │   └── get-messages/
│   ├── [username]/page.tsx
│   ├── dashboard/page.tsx
│   ├── sign-up/
│   └── login/
├── components/
│   ├── MessageCard.tsx
│   ├── FormUI.tsx
│   ├── Toast.tsx
│   └── ...other components...
├── lib/
│   ├── dbConnect.ts
│   └── authOptions.ts
├── schemas/
│   └── message.schema.ts
├── public/
│   └── ...static assets...
├── styles/
│   └── ...global styles...
├── .env.local
├── package.json
└── README.md

🧠 AI Integration
Uses @ai-sdk/openai and @ai-sdk/react to stream suggested messages with a predefined prompt.

📦 Deployment (Vercel)
1. Push your code to GitHub
2. Import repo into Vercel
3. Set environment variables
4. Deploy 🎉


💬 Acknowledgements
- Next.js
- MongoDB Atlas
- NextAuth.js
- OpenAI
- ShadCN UI
- Chai aur Code (Youtube)