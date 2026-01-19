import { useState } from "react";

export function useHomeLogic() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return {
    loading,
    handleLoadingComplete,
  };
}
