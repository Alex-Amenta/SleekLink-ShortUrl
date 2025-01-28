
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export async function getOrCreateAnonymousId() {
   // Obtenemos el almacenamiento de cookies
   const cookieStore = cookies();
  
   let anonymousId = cookieStore.get('anonymousId')?.value; // Accedemos a la propiedad .value
   
   if (!anonymousId) {
     anonymousId = nanoid(); // Generamos un nuevo ID anónimo
     
     // Establecemos la cookie
     cookieStore.set('anonymousId', anonymousId, {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production', 
       maxAge: 24 * 60 * 60,  // 24 horas en segundos
     });
   }
   
   // Retornamos el ID anónimo
   return anonymousId;
}
