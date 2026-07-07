import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseData.js";

export interface Book {
  id: string;
  title: string;
  authorFirstname: string;
  authorLastname: string;
  price: number;
}

const booksCollection = collection(db, "books");

export const findAll = async (): Promise<Book[]> => {
  const snapshot = await getDocs(booksCollection);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Book, "id">),
  }));
};

export const findById = async (id: string): Promise<Book | undefined> => {
  const docRef = doc(db, "books", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return undefined;

  return { id: docSnap.id, ...(docSnap.data() as Omit<Book, "id">) };
};

export const create = async (data: Omit<Book, "id">): Promise<Book> => {
  const docRef = await addDoc(booksCollection, data);
  return { id: docRef.id, ...data };
};

export const update = async (
  id: string,
  data: Partial<Omit<Book, "id">>
): Promise<Book | undefined> => {
  const docRef = doc(db, "books", id);
  const existing = await getDoc(docRef);

  if (!existing.exists()) return undefined;

  await updateDoc(docRef, data);

  return { id, ...(existing.data() as Omit<Book, "id">), ...data };
};

export const remove = async (id: string): Promise<boolean> => {
  const docRef = doc(db, "books", id);
  const existing = await getDoc(docRef);

  if (!existing.exists()) return false;

  await deleteDoc(docRef);
  return true;
};