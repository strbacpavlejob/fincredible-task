import { useEffect, useState } from "react";
import "./App.css";
import { getToken, getBankData } from "./api/index";
import { DataTabs } from "./components/DataTabs";

function App() {
  const [bankData, setBankData] = useState(null);

  // load token on startup
  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      try {
        const fetchedData = await getBankData();
        setBankData(fetchedData);
      } catch (e) {
        setBankData(null);
      }
    };
    fetchData();
  }, []);

  const handleDataReload = async () => {
    const fetchedData = await getBankData();
    setBankData(fetchedData);
  };
  return (
    <>
      <div>
        <button onClick={handleDataReload}>reload data</button>
        <DataTabs bankData={bankData} />
      </div>
    </>
  );
}

export default App;
