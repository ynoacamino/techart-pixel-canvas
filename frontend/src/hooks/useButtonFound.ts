import { BACKEND_URL } from '@/config/variables';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useButtonFound() {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const fetchSecret = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/secret/generate`,
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
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } catch (error) {
      console.error('Error fetching secret:', error);
    }
  };
  const handleClick = async () => {
    setDisabled(true);
    await fetchSecret();
    router.push('/a-secret-page-where-you-should-not-be');
  };
  return { disabled, handleClick };
}
