import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/signin');
  }

  let initialTodos = [];

  try {
    const res = await fetch(`${API_URL}/todos?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Ensure we always fetch fresh data on the server
      cache: 'no-store'
    });

    if (res.ok) {
      const json = await res.json();
      initialTodos = json.data || [];
    } else {
      console.error('Failed to fetch initial todos:', res.statusText);
    }
  } catch (error) {
    console.error('Server-side error fetching todos:', error);
  }

  return <DashboardClient initialTodos={initialTodos} />;
}