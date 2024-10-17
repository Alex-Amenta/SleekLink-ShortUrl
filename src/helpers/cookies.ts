import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export function getOrCreateAnonymousId() {
  const cookieStore = cookies();
  let anonymousId = cookieStore.get('anonymousId');

  if (!anonymousId) {
    anonymousId = nanoid();
    cookieStore.set('anonymousId', anonymousId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return anonymousId;
}
