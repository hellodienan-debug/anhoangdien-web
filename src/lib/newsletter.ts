import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function subscribeEmail(email: string) {
  try {
    await addDoc(collection(db, 'subscribers'), {
      email,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error subscribing email:', error);
    throw error;
  }
}
