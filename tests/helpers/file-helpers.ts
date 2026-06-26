import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"
import { log } from "console"

export default { readCsv, readFile, writeFile } 
function readCsv(filepath: string) {
    const csvDataStr = fs.readFileSync(filepath, { encoding: "utf-8" })
    const dataArr = parse(csvDataStr, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    return dataArr
}

function readFile(filepath: string): any {
    if (!fs.existsSync(filepath)) {
        throw new Error(`File not found: ${filepath}`);
    }
log("info", `Reading file: ${filepath}`);
    const fileData = fs.readFileSync(filepath, { encoding: "utf-8" });
    return fileData;
}

function writeFile(filepath: string, data: any) {
    try {
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filepath, data, { encoding: "utf-8" });
        log("info", `File written successfully: ${filepath}`);
    } catch (error) {
        log("error", `Error writing file: ${filepath}, ${error}`);
        throw error;
    }
}