import { useCallback, useState } from "react";

export function useHomeLogic() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return {
    loading,
    handleLoadingComplete,
  };
}
