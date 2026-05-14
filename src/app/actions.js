"use server";
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

export async function addTodoAction(formData) {
  const title = formData.get('title');
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token || !title || !title.trim()) {
    return { error: 'Missing token or title' };
  }

  try {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          title: title.trim(),
          isCompleted: false,
          // user is assigned automatically by our Strict Backend Policy via ctx.state.user
        }
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to create todo');
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { error: 'Failed to add task.' };
  }
}
