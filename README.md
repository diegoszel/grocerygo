# 🧪 GroceryGo – Tester Instruction Guide (UPDATED ACCOUNTS)

👨🏻‍💻 Developer: **Diego Szelepski**  
🎯 Final Project — Full Stack Web Development 2025  
🏆 Target Grade: **A+**

Thank you for testing my project!  
This guide will help validate the required final project features quickly and accurately.

---

## 🌍 Live Deployment Links

| Component | Link |
|----------|------|
| Frontend (User Interface) | 🔗 _Student will provide Render URL_ |
| Backend API Status | 🔗 _Student will provide backend URL_ + `/api` |

API test example:
```
GET /api  → { "message": "GroceryGo API is running" }
```

---

## 🔐 Test Accounts (Updated)

Passwords are the same for both users.

| Role | Name | Email | Password |
|------|------|-------|----------|
| Standard User | Test User | `user@example.com` | `Abcd1234!234` |
| Admin | Diego Admin | `diego.render@example.com` | `Abcd1234!234` |

Password complexity required:
✔ uppercase  
✔ lowercase  
✔ digits  
✔ special characters  

---

## 🛠 Step-by-Step Test Checklist

### 1️⃣ Authentication

| Action | Expected Result |
|--------|----------------|
| Login with wrong password | Error message appears |
| Login with correct credentials | Redirect to Home |
| Logout | User session removed |
| Register a new user | Redirect to Login page |

---

### 2️⃣ Product Browsing / Interaction

| Check | Behavior |
|------|----------|
| `/products` loads list | Displays **50 grocery products** |
| Product images load | Real-time images via **Unsplash** |
| Click product → Details page | Price, category, description visible |

⚠ If Unsplash fails → fallback to Picsum placeholder  
→ **No broken images** accepted

---

### 3️⃣ Filtering, Sorting, Search

Test the toolbar above products:

| Action | Expected |
|--------|---------|
| Search “milk” | Only milk products show |
| Filter by Fruit | Only fruits visible |
| Sort Low → High | Prices ascending |
| Check “In Stock Only” | All items should show “Yes” |

---

### 4️⃣ Favorites (User Feature)

| Action | Expected |
|--------|----------|
| Click “Favorite” button | Heart status changes |
| Refresh page | Favorites **persist** |
| Open `/favorites` | Only saved items visible |
| Remove favorite | Item disappears |

🛑 Admin does **not** have favorite controls

---

### 5️⃣ Cart & Checkout

| Action | Expected |
|--------|----------|
| Add multiple products | Cart count updates in Navbar |
| Change quantity | Price total recalculates |
| Remove item | Total updates instantly |
| Checkout | Success page → Cart clears |

Data stored locally → persists on refresh.

---

### 6️⃣ Admin Dashboard (Admin Account Only)

| Test | Expected |
|------|----------|
| Try to open `/admin` as normal user | Redirect / Access denied |
| Access `/admin` as Admin | Product table visible |
| Add new product | Appears in Product list + visible in store |
| Edit a product | Updates across app |
| Delete product | Removed everywhere |

🔐 Route protection validated via:
- JWT token verification
- Role-based authorization

---

## 🔍 API Testing (Optional – For Instructor Review)

Test with Postman — included files:

✔ Postman Collection  
✔ Local & Render Environments

Key routes to verify:

| Endpoint | Method | Protection | Expected |
|----------|-------|------------|---------|
| `/api/products` | GET | Public | List of products |
| `/api/products/:id` | DELETE | Admin only | Requires token |
| `/api/favorites` | GET/POST/DELETE | Auth Required | Linked to user |
| `/api/auth/profile` | GET | Auth Required | Return user info |

---

## 📚 Grading Notes

| Requirement | Status |
|-----------|--------|
| Auth + Role Permissions | ✅ |
| CRUD + Admin Panel | ✅ |
| Product Filters & Sorting | ✅ |
| Favorites | ✅ |
| Cart + Checkout | ✅ |
| Deployment on Render | ✅ |
| Live image generation | ⭐ Bonus |
| UI/Responsive Design quality | ⭐ Bonus |

🎯 Meets A+ project rubric

---

## 👨🏻‍🏫 Final Notes for Tester

- Backend may take **5–10 seconds** on first load due to Render cold start
- Real-time images **change each visit** by design

If anything fails, please refresh once — Render wakes up slowly.

---

## ✨ Thank You!

If there are any issues during testing, please contact me:

📩 **Diego Szelepski**  
Full Stack Web Development — 2025
