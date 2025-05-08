import { BACKEND_URL } from '@/config/variables';
import { useEffect, useState } from 'react';

export default function useSecret() {
  const [secretState, setSecretState] = useState<'trap' | 'disc' | 'firstdisc' | null>(null);
  const [discoveredBy, setDiscoveredBy] = useState<number | null>(null);
  const fetchSecret = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/secret/a-random-endpoint-that-users-should-not-access-easily`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (data.ok) {
        if (data.discovered) {
          setSecretState('disc');
        } else {
          setSecretState('firstdisc');
        }
      } else {
        setSecretState('trap');
      }
      setDiscoveredBy(data.discoveredBy);
    } catch (error) {
      console.error('Error fetching secret:', error);
    }
  };

  useEffect(() => {
    fetchSecret();
  }, []);
  return { secretState, discoveredBy };
}
