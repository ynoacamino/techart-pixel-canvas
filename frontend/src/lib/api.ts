import { BACKEND_URL } from '@/config/variables';
import { User } from './models';

export class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = BACKEND_URL;
  }

  async getUser(): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  }
}

export const api = new Api();
