import { useState } from "react";
import styles from "./PasswordGenerator.module.css";
import { savePassword } from "../../services/indexedDB";
import { Loader } from "../Loader/Loader";

export function PasswordGenerator() {
  const [length, setLength] = useState<number>(8);
  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<string>("");

  const handleGenerate = async () => {
    if (!includeAlphabets && !includeNumbers && !includeSymbols) {
      alert("Please select at least one option.");
      return;
    }

    setLoading(true);
    const pool = [
      includeAlphabets ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
      includeNumbers ? "0123456789" : "",
      includeSymbols ? "!@#$%^&*()_+-=[]{}|;:,.<>?/`~" : "",
    ].join("");

    let password = "";
    for (let i = 0; i < length; i++) {
      password += pool[Math.floor(Math.random() * pool.length)];
    }
    setGenerated(password);

    await savePassword(password);
    setLoading(false);
  };

  return (
    <div className={styles.generatorWrapper}>
      {loading && <Loader />}
      <div className={styles.formGroup}>
        <label>Password Length</label>
        <input
          type="number"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>
      <div className={styles.formGroup}>
        <label>
          <input
            type="checkbox"
            checked={includeAlphabets}
            onChange={(e) => setIncludeAlphabets(e.target.checked)}
          />
          Include Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>
      <button onClick={handleGenerate}>Generate Password</button>
      {generated && (
        <div className={styles.generatedPassword}>
          <strong>Generated:</strong> {generated}
        </div>
      )}
    </div>
  );
}
