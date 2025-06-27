import { useEffect, useState } from "react";
import { getAllPasswords } from "../../services/indexedDB";
import { Loader } from "../Loader/Loader";
import styles from "./PasswordList.module.css";

export function PasswordList() {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPasswords = async () => {
      setLoading(true);
      const result = await getAllPasswords();
      setPasswords(result.map(r => r.value));
      setLoading(false);
    };
    fetchPasswords();
  }, []);

  return (
    <div className={styles.listWrapper}>
      {loading ? <Loader /> : (
        <ul>
          {passwords.map((pwd, idx) => (
            <li key={idx}>{pwd}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
