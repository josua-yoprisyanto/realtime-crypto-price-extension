import { useEffect, useState } from "react";

const useWebSocket = (pair: string) => {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

    ws.onopen = () => {
      setConnectionStatus("Connected");
      setLoading(false);
      console.log(`WebSocket Connected for ${pair}`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setPrice(data.p);
    };

    ws.onclose = () => {
      setConnectionStatus("Disconnected");
      setLoading(false);
      console.log(`WebSocket Disconnected for ${pair}`);
    };

    ws.onerror = (error) => {
      setConnectionStatus("Error");
      console.error(`WebSocket Error for ${pair}:`, error);
    };

    return () => {
      ws.close();
    };
  }, [pair]);

  return { price, connectionStatus, loading };
};

export default useWebSocket;
