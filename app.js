const fs = require('fs');
const readline = require('readline-sync');

// Funkce pro výpočty
function calculate(operator, num1, num2 = null) {
    const a = parseFloat(num1);
    const b = num2 !== null ? parseFloat(num2) : null;
    
    if (isNaN(a) || (num2 !== null && isNaN(b))) {
        return 'Chyba: Neplatny vstup';
    }
    
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Chyba: Deleni nulou';
        case '%': return a % b;
        case '^': return Math.pow(a, b);
        case 'sqrt': return Math.sqrt(a);
        case '!': return factorial(a);
        default: return 'Chyba: Neznama operace';
    }
}

// Výpočet faktoriálu
function factorial(n) {
    if (n < 0) return 'Chyba: Zaporne cislo';
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Čtení souboru
function readFromFile(filename) {
    try {
        return fs.readFileSync(filename, 'utf8').split('\n').map(line => line.trim()).filter(line => line);
    } catch (err) {
        console.log('Chyba pri cteni souboru:', err);
        return [];
    }
}

// Zápis do souboru
function writeToFile(result) {
    fs.appendFileSync('results.txt', result + '\n');
}

// Hlavní program
console.log('Vyberte zpusob zadani: 1 - Konzole, 2 - Soubor');
const choice = readline.question('Vase volba: ');

if (choice === '1') {
    const operator = readline.question('Zadejte operator (+, -, *, /, %, ^, sqrt, !): ');
    let num1 = readline.question('Zadejte prvni cislo: ');
    let num2 = null;
    if (operator !== 'sqrt' && operator !== '!') {
        num2 = readline.question('Zadejte druhe cislo: ');
    }
    
    const result = `Vysledek: ${calculate(operator, num1, num2)}`;
    console.log(result);
    writeToFile(result);
} else if (choice === '2') {
    const filename = readline.question('Zadejte nazev souboru: ');
    const lines = readFromFile(filename);
    lines.forEach(line => {
        const [num1, operator, num2] = line.split(' ');
        const result = `Vysledek: ${calculate(operator, num1, num2)}`;
        console.log(result);
        writeToFile(result);
    });
} else {
    console.log('Špatna volba');
}
