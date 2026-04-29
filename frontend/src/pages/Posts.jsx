export default function Posts() {
  const { data, loading, error } = useFetch(getPosts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data?.posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}