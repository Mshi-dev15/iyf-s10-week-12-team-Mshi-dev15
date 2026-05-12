import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import PagePlaceholder from '../components/shared/PagePlaceholder'
import { getUserProfile } from '../services/postsAPI'

const getAuthorName = (user) => {
  if (!user) return 'Unknown'
  if (user.username) return user.username
  const name = `${user.profile?.firstName || ''} ${user.profile?.lastName || ''}`.trim()
  return name || user.email || 'Unknown'
}

export default function UserProfile() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const userData = await getUserProfile(userId)
        setUser(userData)
      } catch (err) {
        setError(err.response?.data?.error?.message || err.message || 'Failed to load user profile')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (loading) return <PagePlaceholder type="detail" />
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>
  if (!user) return <div className="text-center py-12">User not found</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/posts" className="text-blue-600 hover:underline">
        ← Back to Opportunities
      </Link>

      <Card className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                {user.username?.charAt(0).toUpperCase() || user.profile?.firstName?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getAuthorName(user)}</h1>
                <p className="text-gray-600">@{user.username}</p>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>

            {user.profile?.bio && (
              <p className="text-gray-700 mb-4">{user.profile.bio}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {user.profile?.county && (
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <p className="text-gray-600">{user.profile.county}{user.profile.town ? `, ${user.profile.town}` : ''}</p>
                </div>
              )}

              {user.profile?.phone && (
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-600">{user.profile.phone}</p>
                </div>
              )}

              {user.stats && (
                <div>
                  <span className="font-medium text-gray-700">Stats:</span>
                  <p className="text-gray-600">
                    {user.stats.gigsPosted || 0} posts • {user.stats.gigsApplied || 0} applications
                  </p>
                </div>
              )}

              {user.profile?.skills?.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.profile.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Options */}
          <div className="md:w-80">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Contact Options</h3>
              <div className="space-y-2">
                {user.profile?.phone && (
                  <Button
                    variant="outline"
                    size="small"
                    fullWidth
                    onClick={() => window.open(`tel:${user.profile.phone}`)}
                    className="justify-start"
                  >
                    📞 Call {user.profile.phone}
                  </Button>
                )}

                {user.email && (
                  <Button
                    variant="outline"
                    size="small"
                    fullWidth
                    onClick={() => window.open(`mailto:${user.email}`)}
                    className="justify-start"
                  >
                    ✉️ Email {user.email}
                  </Button>
                )}

                {user.profile?.socials?.linkedin && (
                  <Button
                    variant="outline"
                    size="small"
                    fullWidth
                    onClick={() => window.open(user.profile.socials.linkedin, '_blank')}
                    className="justify-start"
                  >
                    💼 LinkedIn Profile
                  </Button>
                )}

                {user.profile?.socials?.portfolio && (
                  <Button
                    variant="outline"
                    size="small"
                    fullWidth
                    onClick={() => window.open(user.profile.socials.portfolio, '_blank')}
                    className="justify-start"
                  >
                    🌐 Portfolio Website
                  </Button>
                )}

                {(!user.profile?.phone && !user.email && !user.profile?.socials?.linkedin && !user.profile?.socials?.portfolio) && (
                  <p className="text-sm text-gray-500 text-center py-2">
                    No contact information available
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
}

