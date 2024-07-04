<template>
  <div id="app" class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
    <div class="w-full max-w-lg p-5 bg-white shadow-lg rounded-lg">
      <file-pond
        name="test"
        ref="pond"
        class="mb-5"
        label-idle="Arrastra y suelta tus archivos o <span class='filepond--label-action'> Busca </span>"
        v-bind:allow-multiple="true"
        accepted-file-types="text/plain"
        v-bind:files="myFiles"
        v-on:init="handleFilePondInit"
        v-on:addfile="handleFileUpload"
      />
      <div class="flex flex-col items-center space-y-3">
        <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark" @click="compressFile">Comprimir Archivo</button>
        <input type="file" class="file-input" @change="handleCompressedFileUpload" />
        <button class="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark" @click="decompressFile">Descomprimir Archivo</button>
      </div>
    </div>
    <div class="mt-5"></div> 
    <table v-if="Object.keys(frequencyData).length"
      class="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Símbolo
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cantidad
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Porcentaje
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(value, key) in frequencyData" :key="key" class="hover:bg-gray-100">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ key }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ value }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ calculatePercentage(value) }}%
          </td>
        </tr>
        <tr class="bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            Total
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ totalCharacters }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            100%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {
  calculateFrequency,
  buildShannonFanoTable,
  encodeData,
  createBinaryData,
  extractCodesAndData,
  shannonFanoDecode
} from '~/assets/utils/shannonFano';

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "app",
  data: function () {
    return { myFiles: [], fileContent: null, compressedData: null,
      frequencyData: {},
      totalCharacters: 0
     };
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
      this.frequencyData = frequency;
      const shannonFanoTable = buildShannonFanoTable(frequency);
      const encodedData = encodeData(text, shannonFanoTable);

      const binaryData = createBinaryData(shannonFanoTable, encodedData);
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
      const decodedData = shannonFanoDecode(encodedData, codes);
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
    },
    calculatePercentage(count) {
      const totalCharacters = Object.values(this.frequencyData).reduce((acc, curr) => acc + curr, 0);
      this.totalCharacters = totalCharacters;
      return (count / totalCharacters * 100).toFixed(2);
    }
  },
  components: {
    FilePond,
  },
};
</script>

<style>
</style>
