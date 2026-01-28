morocco-ai-guide/
├─ db/
│  └─ db.json                # fake database (json-server)
│
├─ public/
│
├─ src/
│  ├─ db/ 
│  │  └─ db.json 
│  ├─ api/
│  │  ├─ geminiApi.js        # call Gemini AI (from .env)
│  │  ├─ jsonApi.js          # all fetch() to json-server
│  │  └─ uploadHelper.js     # image to base64 (optional)
│  │
│  ├─ auth/
│  │  ├─ Login.jsx
│  │  ├─ Register.jsx
│  │  └─ authService.js      # fake auth with json-server
│  │
│  ├─ layouts/
│  │  ├─ ClientLayout.jsx    # navbar + sidebar (client)
│  │  ├─ AdminLayout.jsx     # admin sidebar
│  │  └─ AuthLayout.jsx      # login/register layout
│  │
│  ├─ routes/
│  │  ├─ AppRoutes.jsx       # all routes
│  │  ├─ PrivateRoute.jsx    # user logged in?
│  │  └─ AdminRoute.jsx      # role === admin?
│  │
│  ├─ pages/
│  │  ├─ admin/
│  │  │  ├─ AdminDashboard.jsx
│  │  │  ├─ ManageCities.jsx
│  │  │  ├─ ManageSpots.jsx
│  │  │  ├─ ManageScams.jsx
│  │  │  ├─ ManagePosts.jsx
│  │  │
│  │  ├─ ChatPage.jsx
│  │  ├─ CreatePostPage.jsx
│  │  ├─ FeedPage.jsx 
│  │  ├─ PostCard.jsx 
│  │  └─ ProfilePage.jsx
│  │  
│  ├─ App.jsx
│  │
│  ├─ index.js
│  └─ index.css
│
├─ .env
├─ package.json
└─ README.md
