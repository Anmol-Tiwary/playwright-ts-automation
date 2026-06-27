import * as fs from 'fs';
import * as path from 'path';

/**
 * Read a JSON file and return parsed content
 */
export function readJsonFile<T>(filePath: string): T {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent) as T;
}

/**
 * Write data to a JSON file
 */
export function writeJsonFile(filePath: string, data: unknown): void {
    const absolutePath = path.resolve(filePath);
    const dir = path.dirname(absolutePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Check if a file exists
 */
export function fileExists(filePath: string): boolean {
    return fs.existsSync(path.resolve(filePath));
}

/**
 * Create directory if it doesn't exist
 */
export function ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
