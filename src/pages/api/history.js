import fs from "fs";
import path from "path";
import Papa from "papaparse";

export default function handler(req, res) {
    const history = getHistory();

    res.status(200).json(history);
};

export function getHistory() {
    const filePath = path.join(process.cwd(), 'public', 'data', 'ToTo.csv');
    const file = fs.readFileSync(filePath, 'utf8');

    const parsed = Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
    });

    const temp = parsed.data.map(function(h) {
        const array = [];
        array.push(parseInt(h["Winning Number 1"]));
        array.push(parseInt(h["2"]));
        array.push(parseInt(h["3"]));
        array.push(parseInt(h["4"]));
        array.push(parseInt(h["5"]));
        array.push(parseInt(h["6"]));

        return array.sort()
    });

    return temp;
}