import { BACKEND_URL } from "@/config/variables";
import { useEffect, useState } from "react";

export default function useSecret() {
  const [secretState, setSecretState] = useState<'hide' | 'disc' | 'fdisc' |  | null>(null);
  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/secret/a-random-endpoint-that-users-should-not-access-easily)`)
        const data = await response.json();
        if (data.ok) {

        }
      } catch (error) {
        console.error("Error fetching secret:", error);
      }
    };
    fetchSecret();
  }, []);

  
}