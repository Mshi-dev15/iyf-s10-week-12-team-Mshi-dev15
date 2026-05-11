# iyf-s10-week-12-Mshi-dev15
CommunityHub-Full-stack final project
## Testing the API

### Getting a Test JWT Token
1. Register a user:
POST /api/auth/register
{"username": "testuser", "email": "test@test.com", "password": "password123"}

2. Login to get your token:
POST /api/auth/login
{"email": "test@test.com", "password": "password123"}

3. Copy the token from the response and use it in the Authorization header:
Authorization: Bearer YOUR_TOKEN_HERE

### Example Requests
GET /api/posts?page=1&limit=10&search=hello&sort=newest
GET /api/posts?sort=popular
GET /api/posts?author=USER_ID