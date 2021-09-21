const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
    scripts: path.join(__dirname, '/src/scripts'),
    styles: path.join(__dirname, '/src/styles'),
    assets: path.join(__dirname, '/src/assets'),
    node: path.join(__dirname, '/node_modules'),
};

const viewNames = [];
const htmlPlugins = viewNames.map(viewName => {
    return new HtmlWebpackPlugin({
        template: `./src/${viewName}.html`,
        filename: `${viewName}.html`,
        chunks: [`${viewName}`]
    });
});

let config = {

    mode: 'development',

    entry: {
        main: './src/scripts/main.js',
    },

    resolve: {
        modules: [
            PATHS.scripts,
            PATHS.styles,
            PATHS.assets,
            PATHS.node,
        ]
    },

    output: {
        path: PATHS.dist,
        filename: 'scripts/[name].js',
    },

    devServer: {
        client: {
            overlay: false
        }
    },

    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                sources: {
                    list: [{
                        attribute: 'src',
                        type: 'src'
                    }]
                }
            }
        },
        {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
            test: /\.(sass|scss)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
            test: /favicon\.ico$/,
            loader: 'url-loader',
            options: {
                limit: 1,
                name: 'assets/medias/[hash]-[name].[ext]',
                esModule: false
            }
        },
        {
            test: /\.(mov|mp4|mp3)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'assets/medias/',
                esModule: false,
            }
        },
        {
            test: /\.(woff(2)?|ttf|eot|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts/',
                    esModule: false,
                },
            }]
        },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main']
        })
    ].concat(htmlPlugins)
};

module.exports = config
