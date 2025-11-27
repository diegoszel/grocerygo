# GroceryGo – Final Project (FS Web 2025)

Full-stack grocery store demo with:

- Node.js + Express + MongoDB (Atlas) backend
- React + Vite frontend
- JWT authentication (register/login)
- Role-based admin area
- Products CRUD (admin)
- Favorites per user
- Search, category filter, in-stock filter, price range filter, sorting
- Cart & checkout (client-side, with localStorage)
- Ready to deploy on Render

## Structure

- `server/` – Express API
- `client/` – React frontend
- `products.json` – 50 grocery products for MongoDB import

## Backend – Setup

```bash
cd server
npm install
cp .env.example .env   # fill MONGO_URI, JWT_SECRET, CLIENT_URL
npm run dev            # or: npm start
```

## Frontend – Setup

Create `.env` inside `client`:

```env
VITE_API_URL=http://localhost:5000/api
```

Then:

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## MongoDB products import

In MongoDB Atlas:

1. Select your database (e.g. `grocerygo`)
2. Create collection `products` (if missing)
3. Click **Import**
4. Choose `products.json` from this project
5. Import as JSON

Refresh your `/products` page – you will see 50 products with images.

## Deploy to Render (summary)

Backend (Web Service):

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment:
  - `MONGO_URI` – your Atlas string
  - `JWT_SECRET` – any strong value
  - `CLIENT_URL` – your frontend Render URL

Frontend (Static Site):

- Root directory: `client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment:
  - `VITE_API_URL` – your backend Render URL + `/api`

Redeploy both and test:

- `GET /api` → `{ "message": "GroceryGo API is running" }`
- Frontend `/products` → products visible with images
```

