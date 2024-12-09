import { useEffect, useState } from "react";
import CryptoPair from "./components/CryptoPair";
import { IconCheck, IconX } from "@tabler/icons-react";

const App = () => {
  const [adjustPair, setAdjustPair] = useState<boolean>(false);
  const [newPair, setNewPair] = useState<string>("");

  const [pairs, setPairs] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("cryptoPairs") || "[]").length > 0
      ? JSON.parse(localStorage.getItem("cryptoPairs") || "[]")
      : ["btcusdt", "ethusdt", "solusdt", "bnbusdt", "xrpusdt"]
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
      alert("Invalid trading pair format. Example: BTCUSDT");
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
    <div className="w-[400px] h-auto max-h-[600px] overflow-auto p-5 shadow-md bg-blue-glow ">
      <h1 className="text-center text-2xl mb-5 font-bold">
        Live Crypto Price Monitor ({pairs.length})
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
        <div className="flex items-center justify-between gap-2 mt-5">
          <input
            type="text"
            onChange={(e) => setNewPair(e.target.value)}
            className="bg-transparent border rounded-md p-2 w-full uppercase text-lg"
            placeholder="EX: BTCUSDT"
          />
          <div className="flex items-center gap-2">
            <button
              className="border rounded-md p-2 border-green-400"
              onClick={() => handleAddPair()}
            >
              <IconCheck stroke={2} color="green" />
            </button>
            <button
              className="border rounded-md p-2 border-red-400"
              onClick={() => setAdjustPair(false)}
            >
              <IconX stroke={2} color="red" />
            </button>
          </div>
        </div>
      )}

      {!adjustPair && (
        <button
          className={`border rounded-md p-2 w-full mt-5 "border-white`}
          onClick={() => setAdjustPair(true)}
        >
          <span className="text-lg">Adjust Pair</span>
        </button>
      )}
    </div>
  );
};

export default App;
