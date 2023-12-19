let elapsedTime = 0;

// タイマーを開始する関数
const startTimer = () => {
  const startTimeValue = new Date().getTime();
  // ローカルストレージに開始時刻を保存する
  chrome.storage.local.set({startTime: startTimeValue}, () => {});
};

// タイマー表示を更新する関数
const updateTimerDisplay = (sendResponse) => {
  // chrome.storageの中でさらにchrome.storageを呼ぶと、外側のスコープで取得した値は読み取れなくなる
  chrome.storage.local.get(['startTime', 'progressTime'], (result) => {
    if (result.startTime) {
        const startTime = result.startTime;
        const progressTime = result.progressTime ? result.progressTime : 0;
        const currentTime = new Date().getTime(); // 現在時刻を取得
        elapsedTime = currentTime - startTime + progressTime; // 開始時刻からの経過時間を計算
        const seconds = Math.floor(elapsedTime / 1000); // ミリ秒を秒に変換
        sendResponse(formatTime(seconds));      
    }
  });
};

// 秒を時分秒の形式にフォーマットする関数
const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const displayHours = hours.toString().padStart(2, '0');
  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes}:${displaySeconds}`;
};

const stopTimer = () => {
  chrome.storage.local.get(['startTime', 'progressTime'], (result) => {
    if (result.startTime) {
      const currentTime = new Date().getTime();
      const progressTime = result.progressTime ? result.progressTime : 0;
      elapsedTime = currentTime - result.startTime + progressTime;
      chrome.storage.local.set({ progressTime: elapsedTime }, () => {});
      chrome.storage.local.remove(['startTime'], () => {});
    }
  });
};

const finishTimer = () => {
  chrome.storage.local.remove(['startTime', 'progressTime'], () => {});
};

const initApp = (sendResponse) => {
  chrome.storage.local.get(['startTime', 'progressTime'], (result) => {
    const startTime = result.startTime ? result.startTime : 0;
    const progressTime = result.progressTime ? result.progressTime : 0;
    const currentTime = new Date().getTime(); // 現在時刻を取得
    elapsedTime = startTime ? currentTime - startTime + progressTime : progressTime;
    const seconds = Math.floor(elapsedTime / 1000); // ミリ秒を秒に変換
    sendResponse({
      isRunning: result.startTime ? true : false,
      display: formatTime(seconds) || '00:00:00',
    });
  })
};

const changeHistory = (data) => {
  chrome.storage.local.get(['history'], (result) => {
    const duration = formatTime(Math.floor(data / 1000));

    // 20xx年MM月dd日tt時mm分の形式のタイムスタンプを作る
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timestamp = `${year}/${month}/${day} ${hours}時${minutes}分`;

    const history = result.history || []; // 既存の履歴を取得、なければ空の配列を使う
    
    if (history.length > 9) history.shift();
    history.push({
      duration,
      timestamp,
    });

    // 更新された履歴を保存
    chrome.storage.local.set({ history: history }, () => {});
  });
};

const getHistory = (sendResponse) => {
  chrome.storage.local.get(['history'], (result) => {
    sendResponse(result.history);
  })
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //console.log(message.type);
  switch (message.type) {
    case 'init' :
      initApp(sendResponse);
      return true;
    case 'start':
      startTimer()
      sendResponse();
      return true;
    case 'update':
      updateTimerDisplay(sendResponse);
      return true; // 非同期でレスポンスを返すことを明示する
    case 'stop':
      stopTimer();
      sendResponse();
      return true;
    case 'finish':
      finishTimer();
      changeHistory(elapsedTime);
      sendResponse();
      return true;
    case 'get-logs':
      getHistory(sendResponse);
      return true;
  }
});

export {};