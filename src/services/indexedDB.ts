import { openDB } from 'idb';

const DB_NAME = "PasswordDB";
const STORE_NAME = "passwords";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function savePassword(value: string) {
  const db = await getDB();
  await db.add(STORE_NAME, {
    value,
    createdAt: new Date(),
  });
}

export async function getAllPasswords(): Promise<{ id: number, value: string, createdAt: Date }[]> {
  const db = await getDB();
  return (await db.getAll(STORE_NAME)).map(record => ({
    ...record,
    createdAt: new Date(record.createdAt)
  }));
}
