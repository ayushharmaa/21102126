const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

let storedNumbers = [];
let avg = 0;

const fetchNumbers = async (type) => {
    try {
        const response = await axios.get(`http://20.244.56.144/test/${type}`, {
            headers: {
                Authorization: 'Bearer zpKKbc' 
            }
        });
        return response.data.numbers;
    } catch (error) {
        console.error('Error fetching numbers:', error);
        return [];
    }
};

const calculateAverage = () => {
    if (storedNumbers.length === 0) return 0;
    const sum = storedNumbers.  reduce((acc, num) => acc + num, 0);
    return sum / storedNumbers.length;
};

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    let numbers = [];

    switch (numberid) {
        case 'p':
        case 'primes':
            numbers = await fetchNumbers('primes');
            break;
        case 'f':
        case 'fibonacci':
            numbers = await fetchNumbers('fibo');
            break;
        case 'e':
        case 'even':
            numbers = await fetchNumbers('even');
            break;
        case 'r':
        case 'random':
            numbers = await fetchNumbers('rand');
            break;
        default:
            return res.status(400).json({ error: 'Invalid number ID' });
    }

    storedNumbers = [...new Set([...numbers, ...storedNumbers])].slice(-WINDOW_SIZE);
    avg = calculateAverage();

    return res.status(200).json({
        windowPrevState: storedNumbers.slice(0, -numbers.length),
        windowCurrState: storedNumbers,
        numbers,
        avg
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});