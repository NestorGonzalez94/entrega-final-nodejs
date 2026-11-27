import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase.config.js';
import AppError from '../errors/AppError.js';

const collectionName = 'products';

const productsCollection = () => {
  if (!isFirebaseConfigured || !db) {
    throw new AppError('Firebase no está configurado. Completá las variables FIREBASE_* en .env', 500);
  }
  return collection(db, collectionName);
};

export const findAll = async () => {
  const snapshot = await getDocs(productsCollection());
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
};

export const findById = async (id) => {
  const snapshot = await getDoc(doc(productsCollection(), id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const create = async (product) => {
  const reference = await addDoc(productsCollection(), product);
  return { id: reference.id, ...product };
};

export const update = async (id, product) => {
  const reference = doc(productsCollection(), id);
  const snapshot = await getDoc(reference);
  if (!snapshot.exists()) return null;
  await updateDoc(reference, product);
  return { id, ...snapshot.data(), ...product };
};

export const remove = async (id) => {
  const reference = doc(productsCollection(), id);
  const snapshot = await getDoc(reference);
  if (!snapshot.exists()) return false;
  await deleteDoc(reference);
  return true;
};
