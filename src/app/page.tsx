"use client"

import { useState } from "react";

export default function Home() {
  
  const [histories, setHistories] = useState([]);

  const [data, setData] = useState([]);
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(false);

  const generateNumber = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generator');
      const json = await res.json();

      setData(json.results);
      setQuote(json.quote);

      histories.unshift(json);
      setHistories(histories)
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={generateNumber}>
            {loading ? "Loading..." : "Generate Numbers"}
          </button>

          {/* <div style={{ marginTop: 20 }}>
            {data.length > 0 ? (
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {quote["QUOTE"]}
                  </h5>

                  <p className="font-normal text-gray-700 dark:text-gray-400 text-right">
                    {quote["AUTHOR"]}
                  </p>

                  <br/>
                  
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    {data.join(", ")}
                  </h5>
                </div>
              </div>
            ) : (
              <p>No data loaded yet.</p>
            )}
          </div> */}

          <div style={{ marginTop: 20 }}>
            { histories.length > 0 ? histories.map((history, i) => <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {history["quote"]["QUOTE"]}
                    </h5>

                    <p className="font-normal text-gray-700 dark:text-gray-400 text-right">
                      {history["quote"]["AUTHOR"]}
                    </p>

                    <br/>
                    
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                      {history["results"].join(", ")}
                    </h5>
                  </div>
                </div>) : (
              <p>No data loaded yet.</p>
            )}
          </div>

        </div>
      </div>
  );
}
