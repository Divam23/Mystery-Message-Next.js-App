<h1>🕵️‍♂️ Mystery Message</h1>

A modern, anonymous social messaging platform built with Next.js, MongoDB, and OpenAI. Inspired by Qooh.me — this app allows users to create public message boards and receive anonymous questions or thoughts, with AI-generated message suggestions to spark interaction.

<h3>📸 Features</h3>

- ✅ User Authentication via NextAuth
- ✅ Anonymous message sending
- ✅ AI-generated question suggestions using OpenAI
- ✅ User dashboard to view/delete received messages
- ✅ Mobile responsive UI with Tailwind CSS
- ✅ Toast notifications and loading states
- ✅ REST API routes for CRUD operations
- ✅ Vercel deployment ready

<h3>🧰 Tech Stack</h3>

- Next.js (React framework with App Router)
- MongoDB (via Mongoose)
- NextAuth.js (Authentication)
- OpenAI API (AI-generated messages)
- Tailwind CSS (UI Styling)
- Axios (API requests)
- ShadCN/ui (Pre-built components)
- Vercel (Hosting)

<h3>🚀 Getting Started</h3>

1. Clone the repo
   git clone https://github.com/yourusername/mystery-message.git
   cd mystery-message

2. Install dependencies
   npm install

3. Set up environment variables
   Create a `.env.local` file:

   MONGODB_URI=your-mongodb-connection-string<br>
   NEXTAUTH_SECRET=your-secret<br>
   NEXTAUTH_URL=http://localhost:3000<br>
   OPENAI_API_KEY=your-openai-api-key

4. Run locally
   npm run dev

   Visit: http://localhost:3000

<h3>🛠 Project Structure</h3>

/
├── app/<br>
│   ├── api/<br>
│   │   ├── send-message/<br>
│   │   ├── suggest-messages/<br>
│   │   ├── delete-message/[messageid]/<br>
│   │   └── get-messages/<br>
│   ├── [username]/page.tsx<br>
│   ├── dashboard/page.tsx<br>
│   ├── sign-up/<br>
│   └── login/<br>
├── components/<br>
│   ├── MessageCard.tsx<br>
│   ├── FormUI.tsx<br>
│   ├── Toast.tsx<br>
│   └── ...other components...<br>
├── lib/<br>
│   ├── dbConnect.ts<br>
│   └── authOptions.ts<br>
├── schemas/<br>
│   └── message.schema.ts<br>
├── public/<br>
│   └── ...static assets...<br>
├── styles/<br>
│   └── ...global styles...<br>
├── .env.local<br>
├── package.json<br>
└── README.md<br>

<h3>🧠 AI Integration</h3>

Uses @ai-sdk/openai and @ai-sdk/react to stream suggested messages with a predefined prompt.

<h3>📦 Deployment (Vercel)</h3>

1. Push your code to GitHub
2. Import repo into Vercel
3. Set environment variables
4. Deploy 🎉


<h3>💬 Acknowledgements</h3>

- Next.js
- MongoDB Atlas
- NextAuth.js
- OpenAI
- ShadCN UI
- Chai aur Code (Youtube)