import type { ReactNode } from 'react';

export type FileNode = string | ReactNode;

export interface DirNode {
  [key: string]: FileNode | DirNode;
}

export const fileSystem: DirNode = {
      'readme.txt': 'Hi! My name is Daniel Yi (aka eggoil), current freshman at University of Maryland College Park studying CS/Math. Move along the directory to discover more about me and my projects.',
      research: {
        'readme.txt': 'example',
        'research.exe': 'placeholder'
      },
      hackathons: {
        'readme.txt': 'example',
        'hackathons.exe': 'placeholder'
      },
      projects: {
        'readme.txt': 'example',
        'portfolio.exe': 'placeholder'
      },
      cool_stuff: {
        'readme.txt': 'example',
        'fun.exe': 'placeholder'
      }
};