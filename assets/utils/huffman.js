export function calculateFrequency(data) {
    const frequency = {};
    for (const char of data) {
      if (!frequency[char]) frequency[char] = 0;
      frequency[char]++;
    }
    return frequency;
  }
  
  export function buildHuffmanTree(frequency) {
    const heap = Object.entries(frequency).map(([value, freq]) => ({ value, freq }));
    heap.sort((a, b) => a.freq - b.freq);
  
    while (heap.length > 1) {
      const left = heap.shift();
      const right = heap.shift();
      const newNode = {
        value: null,
        freq: left.freq + right.freq,
        left,
        right
      };
      heap.push(newNode);
      heap.sort((a, b) => a.freq - b.freq);
    }
  
    return heap[0];
  }
  
  export function generateHuffmanCodes(tree, prefix = '', codes = {}) {
    if (tree.value !== null) {
      codes[tree.value] = prefix;
    } else {
      generateHuffmanCodes(tree.left, prefix + '0', codes);
      generateHuffmanCodes(tree.right, prefix + '1', codes);
    }
    return codes;
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
  
  export function huffmanDecode(data, codes) {
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
  