// Helper function for Greatest Common Divisor
const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
};

// Helper for correct modulo arithmetic on negative numbers
const mod = (n: number, m: number): number => {
    return ((n % m) + m) % m;
}

// Function to compute modular inverse using Extended Euclidean Algorithm
const modInverse = (a: number, m: number): number => {
    const m0 = m;
    let y = 0;
    let x = 1;

    if (m === 1) return 0;

    a = mod(a, m);

    while (a > 1) {
        const q = Math.floor(a / m);
        let t = m;
        m = a % m;
        a = t;
        t = y;
        y = x - q * y;
        x = t;
    }

    if (x < 0) {
        x = x + m0;
    }

    return x;
};

const det2x2 = (m: number[][]): number => {
    return mod(m[0][0] * m[1][1] - m[0][1] * m[1][0], 26);
};

const det3x3 = (m: number[][]): number => {
    const term1 = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]);
    const term2 = m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]);
    const term3 = m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    return mod(term1 - term2 + term3, 26);
};

export const isKeyValid = (matrix: number[][], n: 2 | 3): boolean => {
    let det: number;
    if (n === 2) {
        det = det2x2(matrix);
    } else {
        det = det3x3(matrix);
    }
    return gcd(det, 26) === 1;
};

const cofactor3x3 = (m: number[][]): number[][] => {
    const cof: number[][] = Array(3).fill(0).map(() => Array(3).fill(0));
    cof[0][0] = mod(m[1][1] * m[2][2] - m[1][2] * m[2][1], 26);
    cof[0][1] = mod(-(m[1][0] * m[2][2] - m[1][2] * m[2][0]), 26);
    cof[0][2] = mod(m[1][0] * m[2][1] - m[1][1] * m[2][0], 26);
    cof[1][0] = mod(-(m[0][1] * m[2][2] - m[0][2] * m[2][1]), 26);
    cof[1][1] = mod(m[0][0] * m[2][2] - m[0][2] * m[2][0], 26);
    cof[1][2] = mod(-(m[0][0] * m[2][1] - m[0][1] * m[2][0]), 26);
    cof[2][0] = mod(m[0][1] * m[1][2] - m[0][2] * m[1][1], 26);
    cof[2][1] = mod(-(m[0][0] * m[1][2] - m[0][2] * m[1][0]), 26);
    cof[2][2] = mod(m[0][0] * m[1][1] - m[0][1] * m[1][0], 26);
    return cof;
};

const transpose = (m: number[][]): number[][] => {
    const n = m.length;
    const transposed: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            transposed[i][j] = m[j][i];
        }
    }
    return transposed;
};

const getInverse = (matrix: number[][], n: 2 | 3): number[][] | null => {
    if (!isKeyValid(matrix, n)) {
        return null;
    }

    const det = n === 2 ? det2x2(matrix) : det3x3(matrix);
    const invDet = modInverse(det, 26);

    if (n === 2) {
        const adj = [
            [matrix[1][1], mod(-matrix[0][1], 26)],
            [mod(-matrix[1][0], 26), matrix[0][0]]
        ];
        return adj.map(row => row.map(cell => mod(cell * invDet, 26)));
    } else { // n === 3
        const cof = cofactor3x3(matrix);
        const adj = transpose(cof);
        return adj.map(row => row.map(cell => mod(cell * invDet, 26)));
    }
};

const processText = (text: string, keyMatrix: number[][], n: 2 | 3, isEncrypt: boolean): string | null => {
    const matrixToUse = isEncrypt ? keyMatrix : getInverse(keyMatrix, n);
    if (matrixToUse === null) return null;

    let processedText = text.toUpperCase().replace(/[^A-Z]/g, '');
    const A_CHAR_CODE = 'A'.charCodeAt(0);

    if (isEncrypt) {
      while (processedText.length % n !== 0) {
          processedText += 'X'; // Pad with 'X'
      }
    }

    if (processedText.length % n !== 0) {
      throw new Error(`Ciphertext length must be a multiple of ${n}.`);
    }

    const nums = Array.from(processedText).map(c => c.charCodeAt(0) - A_CHAR_CODE);
    let result = '';

    for (let i = 0; i < nums.length; i += n) {
        const block = nums.slice(i, i + n);
        const resultBlock: number[] = Array(n).fill(0);
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                resultBlock[j] += matrixToUse[j][k] * block[k];
            }
            resultBlock[j] = mod(resultBlock[j], 26);
        }
        result += resultBlock.map(r => String.fromCharCode(r + A_CHAR_CODE)).join('');
    }

    return isEncrypt ? result : result.replace(/X+$/, ''); // Remove padding on decrypt
};

export const encrypt = (plaintext: string, keyMatrix: number[][], n: 2 | 3): string => {
    const result = processText(plaintext, keyMatrix, n, true);
    if (result === null) throw new Error("Encryption key is invalid."); // Should not happen if logic is correct
    return result;
};

export const decrypt = (ciphertext: string, keyMatrix: number[][], n: 2 | 3): string | null => {
    return processText(ciphertext, keyMatrix, n, false);
};