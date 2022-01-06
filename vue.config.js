module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,
      preload: 'src/preload.js',
      externals: ['electron-overlay', 'node-ovhook'], 
    }
  },
}
