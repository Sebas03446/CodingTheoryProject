<template>
  <div id="app">
    <file-pond
      name="test"
      ref="pond"
      label-idle="Arrastra y suelta tus archivos o <span class='filepond--label-action'> Busca </span>"
      v-bind:allow-multiple="true"
      accepted-file-types="text/plain"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
      v-on:addfile="handleFileUpload"
    />
    <button @click="compressFile">Comprimir Archivo</button>
    <input type="file" @change="handleCompressedFileUpload" />
    <button @click="decompressFile">Descomprimir Archivo</button>
  </div>
</template>

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {
  calculateFrequency,
  buildHuffmanTree,
  generateHuffmanCodes,
  encodeData,
  createBinaryData,
  extractCodesAndData,
  huffmanDecode
} from '~/assets/utils/huffman';

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "app",
  data: function () {
    return { myFiles: [], fileContent: null, compressedData: null };
  },
  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");
    },
    handleFileUpload: function () {
      let file = this.$refs.pond.getFiles()[0].file;
      this.readFile(file);
    },
    readFile(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.fileContent = event.target.result;
      };
      reader.readAsText(file);
    },
    compressFile() {
      if (!this.fileContent) return;
      
      const text = this.fileContent;
      const frequency = calculateFrequency(text);
      const huffmanTree = buildHuffmanTree(frequency);
      const huffmanCodes = generateHuffmanCodes(huffmanTree);
      const encodedData = encodeData(text, huffmanCodes);

      const binaryData = createBinaryData(huffmanCodes, encodedData);
      this.downloadCompressedFile(binaryData);
    },
    downloadCompressedFile(data) {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compressed_file.bin';
      a.click();
      URL.revokeObjectURL(url);
    },
    handleCompressedFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.compressedData = e.target.result;
      };
      reader.readAsArrayBuffer(file);
    },
    decompressFile() {
      if (!this.compressedData) return;

      const dataView = new Uint8Array(this.compressedData);
      const binaryString = Array.from(dataView)
        .map(byte => byte.toString(2).padStart(8, '0'))
        .join('');

      const { codes, encodedData } = extractCodesAndData(binaryString);
      const decodedData = huffmanDecode(encodedData, codes);
      this.downloadDecompressedFile(decodedData);
    },
    downloadDecompressedFile(data) {
      const blob = new Blob([data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'decompressed_file.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  },
  components: {
    FilePond,
  },
};
</script>

<style>
/* Add some basic styling */
</style>

