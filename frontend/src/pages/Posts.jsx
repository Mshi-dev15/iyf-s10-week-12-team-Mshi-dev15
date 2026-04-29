// frontend/src/pages/Posts.jsx
export default function Posts() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                    Opportunities
                </h1>
            </div>

            {/* Placeholder — Backend Person 5 will connect real data */}
            <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <p className="text-4xl mb-3">🔍</p>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Opportunities coming soon
                </h2>
                <p className="text-sm text-gray-500">
                    Our team is building this page. Check back soon!
                </p>
            </div>
        </div>
    )
}