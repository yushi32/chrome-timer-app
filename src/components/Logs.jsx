import { useState, useEffect } from "react";

export function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'history' }, (res) => {
      setLogs(res);
    });
  }, []);

  return (
    <div>
      <div>計測時間</div>
      <div>計測日時</div>
    </div>
  );
}