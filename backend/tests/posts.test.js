const request = require('supertest')
const app = require('../src/app')
const Post = require('../src/models/Post')

describe('Posts API', () => {
  let testPost
  let authToken

  beforeAll(async () => {
    // Setup test user and get auth token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      })
    authToken = registerRes.body.token
  })

  beforeEach(async () => {
    // Create test post
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Opportunity',
        content: 'This is a test post for the CommunityHub',
        category: 'internship',
        location: 'Nairobi'
      })
    testPost = res.body
  })

  afterEach(async () => {
    await Post.deleteMany({ title: 'Test Opportunity' })
  })

  test('GET /api/posts returns list of posts', async () => {
    const res = await request(app).get('/api/posts')
    
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.posts || res.body)).toBe(true)
  })

  test('GET /api/posts/:id returns single post', async () => {
    const res = await request(app).get(`/api/posts/${testPost._id}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body.title).toBe('Test Opportunity')
  })

  test('POST /api/posts creates new post (auth required)', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'New Test Post',
        content: 'Testing post creation',
        category: 'gig'
      })
    
    expect(res.statusCode).toBe(201)
    expect(res.body.title).toBe('New Test Post')
    expect(res.body.author).toBeDefined()
  })

  test('POST /api/posts fails without auth', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Should Fail', content: 'No auth' })
    
    expect(res.statusCode).toBe(401)
  })
})