import React from "react";
import useWebSocket from "../utils/useWebSocket";
import { IconTrash } from "@tabler/icons-react";

interface CryptoPairProps {
  pair: string;
  adjustPair: boolean;
  handleDeletePair: (pair: string) => void;
}

const CryptoPair: React.FC<CryptoPairProps> = ({ pair, adjustPair, handleDeletePair }) => {
  const { price } = useWebSocket(pair);

  return (
    <div className="p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">{pair.toUpperCase()}</p>
        <div className="flex items-center justify-center">
          <p className="text-lg font-semibold">
            {price ? (
              `${parseFloat(price)}`
            ) : (
              <img src="/loader.svg" alt="loader" width={20} height={20} className="animate-spin" />
            )}
          </p>
          {adjustPair && (
            <IconTrash
              stroke={2}
              color="red"
              className="ml-5"
              onClick={() => handleDeletePair(pair)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoPair;
