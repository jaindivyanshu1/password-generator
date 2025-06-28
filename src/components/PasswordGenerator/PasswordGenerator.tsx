import { useState } from "react";
import { savePassword, getAllPasswords } from "../../services/indexedDB";
import { Loader } from "../Loader/Loader";
import styles from "./PasswordGenerator.module.css";

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

    if (length < 8 || length >120){
      alert("Please enter length in the range between 8 to 120");
      return;
    }

    setLoading(true);
    const pool = [
      includeAlphabets ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
      includeNumbers ? "0123456789" : "",
      includeSymbols ? "!@#$%^&*()_+-=[]{}|;:,.<>?/`~" : "",
    ].join("");

    try {
      const existing = await getAllPasswords();
      const existingValues = existing.map(e => e.value);

      let password = "";
      let attempts = 0;
      const threshold = existing.length * 0.1;
      const maxAttempts = threshold > 10 ? threshold : 10;

      do {
        password = "";
        for (let i = 0; i < length; i++) {
          password += pool[Math.floor(Math.random() * pool.length)];
        }
        attempts++;
        if (attempts > maxAttempts) {
          alert("Could not generate a unique password after 100 tries.");
          setLoading(false);
          return;
        }
      } while (existingValues.includes(password));

      await savePassword(password);
      setGenerated(password);
    } catch (error) {
      console.error("Error generating password", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
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
          <span className={styles.generatedPasswordHeading}>Generated password:</span> 
          <span className={styles.generatedPasswordText}>{generated}</span>
        </div>
      )}
    </div>
  );
}
