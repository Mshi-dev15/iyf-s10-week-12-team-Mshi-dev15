import { useEffect, useState, useCallback } from "react";

export default function useFetch(fetchFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Wrap fetch logic in useCallback so it can be returned as refetch
  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    return fetchFunction()
      .then((res) => {
        setData(res?.data ?? res);
        return res;
      })
      .catch((err) => {
        setError(err.message || err);
        throw err; // Re-throw so caller can handle if needed
      })
      .finally(() => setLoading(false));
  }, [fetchFunction]); // Re-create if fetchFunction changes

  // Auto-fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Return refetch for manual re-fetching (e.g., Retry button)
  return { data, loading, error, refetch: fetchData };
}