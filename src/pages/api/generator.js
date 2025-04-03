import { getHistory } from "./history";
const history = getHistory();

export default function handler(req, res) {
    
    res.status(200).json({ 
        result: generateRandomInteger(1, 49),
        results: generateNumbers(history)
    });
};

function generateNumbers(history) {
    const numbers = generateRandomIntegers([], 6, 1, 49);
    if (hasNumberInHistory(history, numbers)) {
        return generateNumbers()
    }

    return numbers;
}

function hasNumberInHistory(history, numbers) {
    return history.includes(numbers);
}


function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function generateRandomIntegers(numbers, size, min, max) {
    if (numbers.length == size) return numbers;

    const num = Math.floor(min + Math.random() * (max + 1 - min));
    if (numbers.includes(num)) {
        return generateRandomIntegers(numbers, size, min, max);
    } else {
        numbers.push(num);
    }

    if (numbers.length < size) {
        return generateRandomIntegers(numbers, size, min, max)
    } else {
        return numbers;
    }
}
