import { useState } from 'react';
import styles from './App.module.css';
import { TabContainer } from "./components/TabContainer/TabContainer";

function App() {
  const [selectedTab, setSelectedTab] = useState<"generate" | "list">("generate");

  return (
    <div className={styles.appWrapper}>
      <TabContainer
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
    </div>
  );
}

export default App;
