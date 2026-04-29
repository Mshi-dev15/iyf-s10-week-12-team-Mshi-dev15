export default function Posts() { return <div className="p-6"><h1 className="text-2xl font-bold">Opportunities</h1><p className="mt-2 text-gray-600">List view coming soon.</p></div> }
import useFetch from "../hooks/useFetch";
import { getPosts } from "../services/postsAPI";

export default function Posts() {
  const { data, loading, error } = useFetch(getPosts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}