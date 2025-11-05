import React, { useRef, useState, useEffect } from 'react';
import Prompt from './Prompt';
import type { CommandFunction } from '../lib/commands';
import commands from '../lib/commands';

interface TerminalProps {
  setActiveApp: (name: string | null) => void;
}

export default function Terminal({ setActiveApp }: TerminalProps) {
  const [lines, setLines] = useState<string[]>(["welcome", "type 'help' to see available commands"]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [cwd, setCwd] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleScreenClick() {
    inputRef.current?.focus();
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines]);

  useEffect(() => {
    function onGlobalKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key;

      const active = document.activeElement as HTMLElement | null;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
        return;
      }

      inputRef.current?.focus();

      if (key.length === 1) {
        setInput(prev => prev + key);
        e.preventDefault();
      } else if (key === 'Backspace') {
        setInput(prev => prev.slice(0, -1));
        e.preventDefault();
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (!history.length) return;
        const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (!history.length) return;
        if (historyIndex === null) {
          setInput('');
          return;
        }
        if (historyIndex >= history.length - 1) {
          setHistoryIndex(null);
          setInput('');
          return;
        }
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex] ?? '');
      }
    }

    window.addEventListener('keydown', onGlobalKeyDown);
    return () => window.removeEventListener('keydown', onGlobalKeyDown);
  }, [history, historyIndex]);


  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight });
  }, [lines]);

  function runCommand(raw: string) {
    if (!raw.trim()) return;
    setLines(prev => [...prev, `eggoil@admin:~/${cwd.join('/')}$ ${raw}`]);
    setHistory(prev => [...prev, raw]);
    setHistoryIndex(null);


    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);


    const fn: CommandFunction | undefined = (commands as Record<string, CommandFunction>)[cmd];
    if (!fn) {
      setLines(prev => [...prev, `${cmd}: command not found`]);
      return;
    }
    const result = fn(args, cwd, setCwd, setActiveApp);

    if (result != null && typeof result === 'object' && (result as any).clear) {
      setLines([]);
      return;
    }

    if (typeof result === 'string') {
      setLines(prev => [...prev, ...result.split('\n')]);
    }
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runCommand(input);
    setInput('');
  }


  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!history.length) return;
      if (historyIndex === null) {
        setInput('');
        return;
      }
      if (historyIndex >= history.length - 1) {
        setHistoryIndex(null);
        setInput('');
        return;
      }
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? '');
    }
  }

  return (
    <div className="terminal-container h-screen w-full">
      <div
        ref={containerRef}
        className="terminal-screen h-full overflow-y-auto p-4"
        onKeyDown={handleKeyDown}
        onClick={handleScreenClick}
        tabIndex={0}
      >
        <div className="terminal-content">
          {lines.map((line, idx) => <div key={idx} className="whitespace-pre-wrap">{line}</div>)}
          <div className="prompt-line">
            <Prompt onSubmit={handleSubmit} currentValue={input} onChange={setInput} cwd={cwd} inputRef={inputRef} />
          </div>
        </div>
      </div>
    </div>
  );
}