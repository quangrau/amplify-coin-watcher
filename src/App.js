import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import "./App.css";

function App() {
  // create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);
  const limit = 20;
  const start = 0;

  // define function to all API
  async function fetchCoins() {
    console.log("fetching...");
    const data = await API.get(
      "cryptoapi",
      `/coins?limit=${limit}&start=${start}`
    );
    console.log({ data });
    updateCoins(data.coins);
  }

  // call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello from AWS Amplify</h1>
      </header>
      <main className="App-main">
        <section className="coins">
          {coins.map((coin, index) => (
            <div className="coins__row" key={index}>
              <div>
                {coin.name} - <code>{coin.symbol}</code>
              </div>
              <div>${coin.price_usd}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
