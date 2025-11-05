import React from 'react';
import Terminal from './components/Terminal';
import Name from './components/Name';
import Application from './components/Application';

export default function App() {
  const [activeApp, setActiveApp] = React.useState<string | null>(null);
  return (
    <div>
      <Name name="EGGOIL" href="/" />
      <Application activeApp={activeApp} setActiveApp={setActiveApp} />
      <div className="container-screen">
        <div className="terminal-frame">
          <Terminal setActiveApp={setActiveApp} />
        </div>
      </div>
    </div>
  );
}