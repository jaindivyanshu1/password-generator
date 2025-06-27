import { PasswordGenerator } from "../PasswordGenerator/PasswordGenerator";
import { PasswordList } from "../PasswordList/PasswordList";
import styles from "./TabContainer.module.css";

interface TabContainerProps {
  selectedTab: "generate" | "list";
  onTabChange: (tab: "generate" | "list") => void;
}

export function TabContainer({ selectedTab, onTabChange }: TabContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.tabSelector}>
        <button
          className={selectedTab === "generate" ? styles.activeTab : ""}
          onClick={() => onTabChange("generate")}
        >
          Generate
        </button>
        <button
          className={selectedTab === "list" ? styles.activeTab : ""}
          onClick={() => onTabChange("list")}
        >
          Password List
        </button>
      </div>
      <div className={styles.tabContent}>
        {selectedTab === "generate" && <PasswordGenerator />}
        {selectedTab === "list" && <PasswordList />}
      </div>
    </div>
  );
}
