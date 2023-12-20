import { useState, useEffect } from "react";

export function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'get-logs' }, (res) => {
      if (Array.isArray(res)) {
        setLogs(res);
      }
    });
  }, []);

  // 左側の列のためのデータ
  const leftColumnLogs = logs.slice(0, 5);
  // 右側の列のためのデータ
  const rightColumnLogs = logs.slice(5);

  return (
    <div className="grid grid-cols-2 mt-6 gap-x-2 text-center">
      <div className="mt-2">
        {leftColumnLogs.map((log) => (
          <div key={log.duration} className="pt-1 px-2 border-r">
            <div>{log.timestamp}</div>
            <div className="text-sm">{log.duration}</div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        {rightColumnLogs.map((log) => (
          <div key={log.duration} className="pt-1 px-2 ">
            <div>{log.timestamp}</div>
            <div className="text-sm">{log.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}