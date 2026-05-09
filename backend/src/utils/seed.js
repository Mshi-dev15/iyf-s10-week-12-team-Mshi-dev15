require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../config/database')
const User = require('../models/User')
const Post = require('../models/Post')
const Gig = require('../models/Gig')

const seed = async () => {
  try {
    await connectDB()
    console.log('🌱 Seeding database...')

    await User.deleteMany({})
    await Post.deleteMany({})
    await Gig.deleteMany({})

    const youth = await User.create({
      username: 'johnyouth',
      email: 'youth@example.com',
      password: 'password123',
      role: 'youth',
      profile: {
        firstName: 'John',
        lastName: 'Kamau',
        phone: '+254712345678',
        county: 'Nairobi',
        town: 'Westlands',
        skills: ['JavaScript', 'Graphic Design'],
        bio: 'Aspiring developer looking for gigs'
      }
    })

    const org = await User.create({
      username: 'sarahorg',
      email: 'org@example.com',
      password: 'password123',
      role: 'organization',
      profile: {
        firstName: 'Sarah',
        lastName: 'Wanjiku',
        phone: '+254723456789',
        county: 'Nairobi',
        town: 'Karen',
        bio: 'Event planning company'
      }
    })

    // Create placeholder posts
    await Post.create([
      {
        title: 'Internship Opportunity at Tech Startup',
        content: 'Join our fast-growing tech startup as a software development intern. We offer hands-on experience with modern technologies including React, Node.js, and MongoDB. This is a great opportunity for students and recent graduates to build real-world skills.',
        category: 'internship',
        author: youth._id,
        location: 'Nairobi, Kenya',
        tags: ['tech', 'internship', 'software'],
        published: true
      },
      {
        title: 'Weekend Photography Gig Available',
        content: 'Looking for a photographer for a corporate event this Saturday in Westlands. Must have own camera equipment and portfolio. Payment is KES 5,000 for the day. Contact us if interested!',
        category: 'gig',
        author: org._id,
        location: 'Westlands, Nairobi',
        tags: ['photography', 'weekend', 'event'],
        published: true
      },
      {
        title: 'Volunteer Teaching Opportunity',
        content: 'Community center in Kibera is looking for volunteers to teach computer skills to children. No experience required - we provide training. Great way to give back and gain teaching experience.',
        category: 'volunteer',
        author: org._id,
        location: 'Kibera, Nairobi',
        tags: ['teaching', 'volunteer', 'community'],
        published: true
      }
    ])

    await Gig.create([
      {
        title: 'Weekend Event Photographer Needed',
        description: 'We need a photographer for a corporate event this Saturday. Must have own camera.',
        category: 'Photography & Video',
        gigType: 'one-time',
        location: { county: 'Nairobi', town: 'Westlands', isRemote: false },
        postedBy: org._id,
        organization: { name: 'Wanjiku Events', verified: false },
        requirements: ['Own camera', 'Portfolio', 'Available Saturday 8am-6pm'],
        skillsNeeded: ['Photography', 'Photo Editing'],
        schedule: {
          startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          duration: '1 day',
          hoursPerDay: 10
        },
        compensation: { type: 'fixed', amount: 5000, currency: 'KES' },
        tags: ['photography', 'weekend', 'event']
      },
      {
        title: 'Logo Design for New Restaurant',
        description: 'Design a modern logo for a new restaurant opening in Kilimani.',
        category: 'Design & Creative',
        gigType: 'project-based',
        location: { county: 'Nairobi', town: 'Kilimani', isRemote: true },
        postedBy: org._id,
        organization: { name: 'Kilimani Bites', verified: true },
        requirements: ['Portfolio', '3 revision rounds', 'Source files'],
        skillsNeeded: ['Logo Design', 'Adobe Illustrator', 'Branding'],
        schedule: {
          startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          duration: '1 week'
        },
        compensation: { type: 'negotiable', currency: 'KES', notes: 'Budget: KES 3,000 - 8,000' },
        tags: ['design', 'logo', 'branding']
      },
      {
        title: 'Delivery Rider - Westlands Area',
        description: 'Part-time delivery rider needed for food delivery service. Must have motorbike.',
        category: 'Delivery & Logistics',
        gigType: 'recurring',
        location: { county: 'Nairobi', town: 'Westlands', isRemote: false },
        postedBy: org._id,
        organization: { name: 'FastBoda Delivery', verified: true },
        requirements: ['Motorbike', 'Valid license', 'Smartphone', 'Helmet'],
        skillsNeeded: ['Navigation', 'Time Management'],
        schedule: {
          startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          duration: 'Ongoing',
          hoursPerDay: 6
        },
        compensation: { type: 'per-day', amount: 1500, currency: 'KES', notes: 'Plus tips and fuel allowance' },
        tags: ['delivery', 'motorbike', 'part-time']
      }
    ])

    console.log('✅ Seed complete!')
    console.log('👤 Test accounts:')
    console.log('   Youth: youth@example.com / password123')
    console.log('   Org:   org@example.com / password123')
    console.log('📝 Placeholder posts created')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  }
}

seed()