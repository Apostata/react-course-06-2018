const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack ={
    devtool:'cheap-module-eval-source-map',
    mode: 'development',
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        fileName: 'bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: ''
    },

    resolve: {
        extensions:['.js', '.jsx'] 
    },

    module:{
        rules:[ 
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {loader:'babel-loader'}
                ]
            },

            {
                test: /\.css$/,
                use: [ 
                    {loader: 'style-loader'},
                    {loader: 'css-loader',
                        options:{
                            importLoaders: 2, 
                            modules: true,
                            localIdentNames: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options:{
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browsers:[
                                        "> 1%", 
                                        "last 2 versions"
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },

            {
                test:/\.(png|jpe?g|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[ext]',
                },
            },
            { 
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use:[
                    {
                        loader: "file-loader",
                        options:{
                            name:"[name].[ext]",
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
          template: __dirname + '/src/index.html' ,
          filename:'index.html',
          inject: 'body' 
        })
    ]
};

module.exports = webpack;