import fs from "fs";
import path from "path";
import Papa from "papaparse";

export default function handler(req, res) {
    const quotes = getQuotes();

    res.status(200).json(quotes);
};

export function getQuotes() {
    const filePath = path.join(process.cwd(), 'public', 'data', 'Quotes.csv');
    const file = fs.readFileSync(filePath, 'utf8');

    return Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        delimiter: ";"
    }).data;
}