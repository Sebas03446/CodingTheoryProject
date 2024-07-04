export function calculateFrequency(data) {
    const frequency = {};
    for (const char of data) {
      if (!frequency[char]) frequency[char] = 0;
      frequency[char]++;
    }
    return frequency;
  }
  
  export function buildShannonFanoTable(frequency) {
    const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const shannonFanoTable = {};
  
    function shannonFanoRecursive(array, code) {
      if (array.length === 1) {
        shannonFanoTable[array[0][0]] = code;
        return;
      }
  
      const totalFrequency = array.reduce((sum, item) => sum + item[1], 0);
      let cumulativeFrequency = 0;
      let splitIndex = 0;
  
      for (let i = 0; i < array.length; i++) {
        cumulativeFrequency += array[i][1];
        if (cumulativeFrequency >= totalFrequency / 2) {
          splitIndex = i + 1;
          break;
        }
      }
  
      shannonFanoRecursive(array.slice(0, splitIndex), code + '0');
      shannonFanoRecursive(array.slice(splitIndex), code + '1');
    }
  
    shannonFanoRecursive(sortedFrequency, '');
    return shannonFanoTable;
  }
  
  export function encodeData(data, codes) {
    return data.split('').map(char => codes[char]).join('');
  }
  
  export function createBinaryData(codes, encodedData) {
    const codeMap = Object.entries(codes).map(([char, code]) => ({ char, code }));
    const codeMapLength = codeMap.length;
  
    let binaryString = codeMapLength.toString(2).padStart(16, '0');
    codeMap.forEach(({ char, code }) => {
      const charCode = char.charCodeAt(0).toString(2).padStart(8, '0');
      const codeLength = code.length.toString(2).padStart(8, '0');
      binaryString += charCode + codeLength + code;
    });
  
    binaryString += encodedData;
  
    const buffer = new ArrayBuffer(Math.ceil(binaryString.length / 8));
    const dataView = new Uint8Array(buffer);
  
    for (let i = 0; i < binaryString.length; i += 8) {
      const byte = binaryString.slice(i, i + 8).padEnd(8, '0');
      dataView[i / 8] = parseInt(byte, 2);
    }
  
    return buffer;
  }
  
  export function extractCodesAndData(binaryString) {
    const codeMapLength = parseInt(binaryString.slice(0, 16), 2);
    let index = 16;
    const codes = {};
  
    for (let i = 0; i < codeMapLength; i++) {
      const char = String.fromCharCode(parseInt(binaryString.slice(index, index + 8), 2));
      index += 8;
      const codeLength = parseInt(binaryString.slice(index, index + 8), 2);
      index += 8;
      const code = binaryString.slice(index, index + codeLength);
      index += codeLength;
      codes[char] = code;
    }
  
    const encodedData = binaryString.slice(index);
    return { codes, encodedData };
  }
  
  export function shannonFanoDecode(data, codes) {
    const invertedCodes = Object.fromEntries(Object.entries(codes).map(([k, v]) => [v, k]));
    let decodedData = '';
    let currentCode = '';
    for (const bit of data) {
      currentCode += bit;
      if (invertedCodes[currentCode]) {
        decodedData += invertedCodes[currentCode];
        currentCode = '';
      }
    }
    return decodedData;
  }
  