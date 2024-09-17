# module-federation-remote
Webpack module federation remote

# Practical Module Federation 2.0
## A walking skeleton
For **Practical Module Federation 2.0**, a simple walking skeleton would involve two applications:
 
1. **Host Application** (or the shell) – which consumes modules from a remote.
2. **Remote Application** – which exposes certain modules to be consumed by the host.
 
### Setup: 
We will build this with **Webpack Module Federation** (as of Webpack 5) using two applications:
- **app-host**: The main application that loads remote components.
- **app-remote**: The remote application that exposes components to the host.
 
Here’s a simple step-by-step guide for setting up a walking skeleton using Webpack Module Federation.

### Prerequisites:
- Node.js (v14+)
- Webpack (v5+)
- React (optional, but in this example we’ll use React)

### Step 1: **Initialize the Projects**

#### 1.1 Create directory
```bash
mkdir app-remote
```

#### 1.2 Initialize `package.json`
```bash
cd app-host
npm init -y
cd ../app-remote
npm init -y
```

### Step 2: **Install Dependencies**
Install Webpack, React, and necessary loaders in both `app-host` and `app-remote`.
 
#### run:
```bash
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
npm install react react-dom
npm install babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
```
### Step 3: **Configure Webpack Module Federation**
 
#### 3.1 **Remote Application Setup (`app-remote`)**
 
1. Create the folder structure for the remote app:
 
```bash
app-remote/
    ├── src/
    │   ├── index.js
    │   └── Button.js
    └── webpack.config.js
```
 
2. **Expose the Button component** via Module Federation:
 
**src/Button.js**:
```javascript
import React from 'react';
 
const Button = () => {
  return <button>I am a button from Remote!</button>;
};
 
export default Button;
```
 
**src/index.js**:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
 
const App = () => (
<div>
<h2>Remote App</h2>
<Button />
</div>
);
 
ReactDOM.render(<App />, document.getElementById('root'));
```
 
**webpack.config.js**:
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
 
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3001,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'app_remote',
      filename: 'remoteEntry.js', // This file will be loaded remotely by the host.
      exposes: {
        './Button': './src/Button', // Expose the Button component.
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ],
};
```
