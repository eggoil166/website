import React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import type { DirNode, FileNode } from './filesystem';
import { fileSystem } from './filesystem';
export type CommandFunction = (
    args: string[],
    cwd: string[],
    setCwd?: Dispatch<SetStateAction<string[]>>,
    setActiveApp?: (name: string | null) => void
) => string | React.ReactNode | { clear?: boolean };


function getDir(path: string[], fs: DirNode = fileSystem): DirNode | null {
    let current: DirNode | FileNode | undefined = fs;
    for (const p of path) {
        if (current == null) return null;
        if (typeof current !== 'object' || !(p in current)) return null;
        const asDir = current as DirNode;
        const next = asDir[p];
        if (next === undefined) return null;
        current = next;
    }
    return current && typeof current === 'object' ? (current as DirNode) : null;
}


function resolvePath(inputPath: string, cwd: string[]): string[] {
    const parts = inputPath.split('/').filter(Boolean);
    let newPath: string[] = inputPath.startsWith('/') ? [] : [...cwd];
    for (const part of parts) {
        if (part === '..') newPath.pop();
        else if (part !== '.') newPath.push(part);
    }
    return newPath;
}


export const whoami: CommandFunction = () => 'eggoil@admin';
export const pwd: CommandFunction = (_, cwd) => '/' + cwd.join('/');


export const ls: CommandFunction = (args, cwd) => {
    const dirPath = resolvePath(args[0] || '.', cwd);
    const dir = getDir(dirPath);
    if (!dir) return `ls: cannot access '${args[0]}': No such directory`;
    return Object.keys(dir).join(' ');
};


export const cd: CommandFunction = (args, cwd, setCwd) => {
    if (!setCwd) return 'cd: error';
    const target = resolvePath(args[0] || '/', cwd);
    const dir = getDir(target);
    if (!dir) return `cd: ${args[0]}: No such directory`;
    setCwd(target);
    return '';
};


export const cat: CommandFunction = (args, cwd, _, setActiveApp) => {
    if (!args[0]) return 'Usage: cat <filename>';
    const targetPath = resolvePath(args[0], cwd);
    const fileName = targetPath.pop();
    const dir = getDir(targetPath);
    if (!dir || !fileName || !(fileName in dir)) return `cat: ${args[0]}: No such file`;
    const node = dir[fileName];
    if (typeof node === 'object' && !React.isValidElement(node)) return `cat: ${args[0]}: Is a directory`;
    if (fileName.endsWith('.exe')) {
        setActiveApp?.(fileName);
        return `Opening ${fileName}...`;
    }

    return node;
};


export const echo: CommandFunction = (args) => args.join(' ');
export const clear: CommandFunction = () => ({ clear: true });
export const help: CommandFunction = () => 'available: ls cd echo pwd cat clear whoami help';

const commands: Record<string, CommandFunction> = {
    whoami, pwd, ls, cd, cat, echo, clear, help
};


export default commands;