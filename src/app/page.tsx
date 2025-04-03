"use client"

import { useState } from "react";

export default function Home() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateNumber = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generator');
      const json = await res.json();
      setData(json.results);
    } catch (e) {
      console.error('Error fetching CSV:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
        <div className="flex flex-col items-center p-7 rounded-2xl">
          <h1>Crazy Rich Koreans</h1>
          <p>Welcome</p>
          <p></p>
          <p>v0.0.1</p>
        </div>

        <div className="flex flex-col items-center">
          <button type="button" onClick={generateNumber}>
            {loading ? "Loading..." : "Generate Numbers"}
          </button>

          <div style={{ marginTop: 20 }}>
            {data.length > 0 ? (
              <pre>{JSON.stringify(data.join(", "))}</pre>
            ) : (
              <p>No data loaded yet.</p>
            )}
          </div>
        </div>
      </div>
  );
}