const GIG_CATEGORIES = [
  'Technology',
  'Design & Creative',
  'Writing & Content',
  'Marketing & Sales',
  'Events & Hospitality',
  'Manual Labor',
  'Delivery & Logistics',
  'Teaching & Tutoring',
  'Healthcare',
  'Agriculture',
  'Construction',
  'Cleaning & Domestic',
  'Photography & Video',
  'Music & Entertainment',
  'Other'
]

const GIG_TYPES = ['one-time', 'recurring', 'project-based', 'weekend-only']

const COMPENSATION_TYPES = ['fixed', 'negotiable', 'per-hour', 'per-day', 'unpaid']

const GIG_STATUS = ['draft', 'active', 'closed', 'filled', 'cancelled']

const USER_ROLES = ['youth', 'organization', 'admin']

const APPLICATION_STATUS = ['pending', 'reviewing', 'shortlisted', 'accepted', 'rejected', 'withdrawn']

const NOTIFICATION_TYPES = ['new_gig', 'application_received', 'application_update', 'message', 'gig_reminder', 'system']

module.exports = {
  GIG_CATEGORIES,
  GIG_TYPES,
  COMPENSATION_TYPES,
  GIG_STATUS,
  USER_ROLES,
  APPLICATION_STATUS,
  NOTIFICATION_TYPES
}