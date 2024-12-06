import { useEffect, useState } from "react";
import CryptoPair from "./CryptoPair";
import { IconCheck } from "@tabler/icons-react";

const App = () => {
  const [adjustPair, setAdjustPair] = useState<boolean>(false);
  const [newPair, setNewPair] = useState<string>("");

  const [pairs, setPairs] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("cryptoPairs") || "[]").length > 0
      ? JSON.parse(localStorage.getItem("cryptoPairs") || "[]")
      : ["btcusdt", "ethusdt", "solusdt", "bnbusdt", "xrpusdt", "mantausdt"]
  );

  useEffect(() => {
    localStorage.setItem("cryptoPairs", JSON.stringify(pairs));
  }, [pairs]);

  const handleAddPair = () => {
    const lowerPair = newPair.toLowerCase();
    const pairRegex = /^[a-z]{3,10}usdt$/;

    if (!newPair) {
      alert("Please enter a trading pair.");
      return;
    }
    if (!pairRegex.test(lowerPair)) {
      alert("Invalid trading pair format. Example: btcusdt");
      return;
    }
    if (pairs.includes(lowerPair)) {
      alert("This trading pair is already being tracked.");
      return;
    }

    setPairs((prev) => [...prev, lowerPair]);
    setNewPair("");
    setAdjustPair(false);
  };

  const handleDeletePair = (pair: string) => {
    const filteredPairs = pairs.filter((p) => p !== pair);

    setPairs(filteredPairs);

    localStorage.setItem("cryptoPairs", JSON.stringify(filteredPairs));
  };

  return (
    <div className="w-[400px] h-[600px] overflow-auto p-5 shadow-md bg-slate-900">
      <h1 className="text-center text-2xl mb-5 font-bold">
        Crypto Price Tracking ({pairs.length})
      </h1>

      {pairs.map((pair) => (
        <CryptoPair
          key={pair}
          pair={pair}
          adjustPair={adjustPair}
          handleDeletePair={handleDeletePair}
        />
      ))}

      {adjustPair && (
        <div className="flex items-center justify-between gap-2">
          <input
            type="text"
            onChange={(e) => setNewPair(e.target.value)}
            className="bg-transparent border rounded-md p-2 w-full uppercase"
            placeholder="BTC"
          />
          <button
            className="border rounded-md p-2 border-green-400"
            onClick={() => handleAddPair()}
          >
            <IconCheck stroke={2} color="green" />
          </button>
        </div>
      )}

      <button
        className={`border rounded-md p-2 w-full mt-5 ${
          adjustPair ? "border-red-500" : "border-white"
        }`}
        disabled={pairs.length === 10}
        onClick={() => setAdjustPair(!adjustPair)}
      >
        {adjustPair ? <span className="text-red-500">Cancel</span> : <span>Adjust Pair</span>}
      </button>
    </div>
  );
};

export default App;
