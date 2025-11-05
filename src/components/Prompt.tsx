import React from 'react';

interface PromptProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  currentValue: string;
  onChange: (value: string) => void;
  cwd: string[];
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function Prompt({ onSubmit, currentValue, onChange, cwd, inputRef }: PromptProps) {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 w-full">
      <span className="prompt-prefix">eggoil@admin:~/{cwd.join('/')}$</span>
      <input
        ref={inputRef}
        autoFocus
        value={currentValue}
        onChange={e => onChange(e.target.value)}
        className="prompt-input"
        spellCheck={false}
      />
    </form>
  );
}
