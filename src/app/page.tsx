"use client"

import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface History {
  results: [number];
  quote: Quote;
};

type Quote = {
  QUOTE: string,
  AUTHOR: string,
  GENRE: string
}

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [histories, setHistories] = useState([] as any);
  const [loading, setLoading] = useState(false);

  const generateNumber = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generator');
      const json = await res.json();
      histories.unshift(json as History);
      setHistories(histories);
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

          <div style={{ marginTop: 20 }}>
            { histories.length > 0 ? histories.map(function (history: History, i: number) {
              // let quote = (history["quote"] as object)["QUOTE"];
              // let author = history["quote"]["AUTHOR"];
              // let result = history["results"].join(", ");

              const quote = history.quote.QUOTE;
              const author = history.quote.AUTHOR;
              const result = history.results.join(", ");

              return (<div key={i} className="max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      { quote }
                    </h5>

                    <p className="font-normal text-gray-700 dark:text-gray-400 text-right">
                      { author }
                    </p>

                    <br/>
                    
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                      { result }
                    </h5>
                  </div>
                </div>
              )}) : (
              <p>No data loaded yet.</p>
            )}
          </div>

        </div>
      </div>
  );
}
