// @ts-nocheck

import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export async function getOrCreateAnonymousId() {
  const cookieStore = await cookies();
  let anonymousId = cookieStore.get('anonymousId');

  if (!anonymousId) {
    anonymousId = nanoid();
    cookieStore.set('anonymousId', anonymousId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS
      maxAge: 24 * 60 * 60,  // 24 horas
    });
  }

  return anonymousId;
}
