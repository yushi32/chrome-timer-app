export function Header({ mode, setMode }) {

  const changeMode = (e) => {
    switch (e.target.textContent) {
      case 'Count Up':
        setMode('countup');
        break;
      case 'Logs':
        setMode('logs');
        break;
    }
  };

  return (
    <nav className="fixed top-0 grid grid-cols-2 m-4 text-center text-base text-bold">
      <button onClick={changeMode} className={`col-span-1 w-24 hover:text-blue-400 ${mode === 'countup' && 'border-b border-blue-400'}`}>Count Up</button>
      <button onClick={changeMode} className={`col-span-1 w-24 hover:text-blue-400 ${mode === 'logs' && 'border-b border-blue-400'}`}>Logs</button>
    </nav>
  );
}