import { useState, useEffect } from 'react';

function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export default useIsClient;
