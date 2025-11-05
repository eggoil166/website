import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

interface NameProps {
  name?: string;
  href?: string;
}

const Name: React.FC<NameProps> = ({ name = "some name", href = "/" }) => {
  const [displayText, setDisplayText] = useState<string>(name);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const revealIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fixedLettersRef = useRef<number>(0);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=:;/?.<>[]{}|';

  const getRandomChar = (): string => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const scrambleText = useCallback(() => {
    setDisplayText(prev => {
      return prev
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < fixedLettersRef.current) return name[index];
          return getRandomChar();
        })
        .join('');
    });
  }, [name]);

  const startScramble = useCallback(() => {
    setIsHovering(true);
    fixedLettersRef.current = 0;

    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);

    scrambleIntervalRef.current = setInterval(scrambleText, 25);

    revealIntervalRef.current = setInterval(() => {
      fixedLettersRef.current += 1;

      if (fixedLettersRef.current > name.length) {
        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
        if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
        setDisplayText(name);
      }
    }, 200);
  }, [name, scrambleText]);

  const stopScramble = useCallback(() => {
    setIsHovering(false);

    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
      scrambleIntervalRef.current = null;
    }
    if (revealIntervalRef.current) {
      clearInterval(revealIntervalRef.current);
      revealIntervalRef.current = null;
    }

    setDisplayText(name);
    fixedLettersRef.current = 0;
  }, [name]);

  useEffect(() => {
    return () => {
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
      if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
    };
  }, []);

  return (
    <div
      className='space-y-4 flex flex-col'
      style={{
        textDecoration: 'none',
        color: 'inherit',
        position: 'fixed',
        left: '8vh',
        top: '29vh',
        transform: 'translateY(-50%)',
        textOrientation: 'mixed'
      }}>
      <a
        href={href}
        onMouseEnter={startScramble}
        onMouseLeave={stopScramble}
        style={{
          fontSize: '4rem'
        }}
      >
        {displayText}
      </a>
      <a
        className='ml-5 mt-4 mb-4 flex items-center gap-2'
        href='https://github.com/eggoil166'>
        Github
        <FaGithub className='size-7 transition-transform hover:scale-110 inline-block' />
      </a>
      <a
        className='ml-5 mt-4 mb-4 flex items-center gap-2'
        href='mailto:e.g.g.wp16@gmail.com'>
        Email
        <MdEmail className='size-7 transition-transform hover:scale-110 inline-block' />
      </a>
      <a
        className='ml-5 mt-4 mb-4 flex items-center gap-2'
        href='https://linkedin.com/in/daniel-s-yi'>
        LinkedIn
        <FaLinkedin className='size-7 transition-transform hover:scale-110 inline-block' />
      </a>
      <a
        className='ml-5 mt-4 mb-4 flex items-center gap-2'
        href='/resume.pdf'>
        Resume
        <FaFilePdf className='size-7 transition-transform hover:scale-110 inline-block' />
      </a>
    </div>
  );
};

export default Name;