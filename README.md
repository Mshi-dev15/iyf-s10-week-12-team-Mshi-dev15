# iyf-s10-week-12-Mshi-dev15
CommunityHub-Full-stack final project
Feature | Frontend Owner | Backend Owner | Contract |
|---------|--------------|---------------|----------|
| **🔌 API Connectivity & Health** | FE Person 2 | **BE Person 1** | `GET /api/health` → `{ status: 'ok', uptime, db: 'connected' }` |
| **Auth Flow** | FE Person 5 | BE Person 4 | `POST /api/auth/login` → `{ token, user }` |
| **Posts List** | FE Person 4 | BE Person 2 | `GET /api/posts?search=&sort=` → `[{ id, title, author }]` |
| **Create Post** | FE Person 4 | BE Person 2 | `POST /api/posts` with auth header → `201 + post` |
| **Like Post** | FE Person 4 | BE Person 2 | `PATCH /api/posts/:id/like` → `{ likes: n }` |
| **User Profile** | FE Person 1 | BE Person 3 | `GET /api/users/:id` → `{ username, posts[] }` |
| **Comments** | FE Person 2 | BE Person 5 | Nested routes, auth required for create/delete |