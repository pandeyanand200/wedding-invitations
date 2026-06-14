import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface RSVPData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  attending: 'yes' | 'no' | 'maybe';
  dietary: string;
  message: string;
}

export async function submitRSVP(data: RSVPData): Promise<{ success: boolean; error?: string }> {
  try {
    await addDoc(collection(db, 'rsvps'), {
      ...data,
      submittedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('RSVP submission error:', error);
    return { success: false, error: 'Failed to submit RSVP. Please try again.' };
  }
}
