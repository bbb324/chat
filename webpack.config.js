module.exports = {
  entry: "./public/js/main.js",
  output: {
    filename: "./public/js/bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [
      //.css 文件使用 style-loader 和 css-loader 来处理
      {
        test: /\.css$/,
        loader: "style!css"
      },
      //.js 文件使用 jsx-loader 来编译处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: []
};

