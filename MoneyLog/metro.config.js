const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Reduce file watchers para evitar el error EMFILE en macOS
// Excluye node_modules anidados EXCEPTO los de react-native
config.resolver.blockList = [
  /node_modules\/(?!react-native[/\\]).*\/node_modules\/.*/,
];

// Apunta directamente al paquete que Metro no encuentra
config.resolver.extraNodeModules = {
  '@react-native/virtualized-lists': path.resolve(
    __dirname,
    'node_modules/react-native/node_modules/@react-native/virtualized-lists'
  ),
};

module.exports = config;
