import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

export function readCsv(filepath: string) {
    const csvDataStr = fs.readFileSync(filepath, { encoding: "utf-8" })
    const dataArr = parse(csvDataStr, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    return dataArr
}