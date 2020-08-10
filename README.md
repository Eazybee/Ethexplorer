<div align="center"><h1>EthExplorer</h1></div>
 

## Getting Started
This is a simple web app that logs [Transfer](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#transfer-1) / [Approval](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approval) Event between a Wallet and Token(Smart Contract).


 E.g. A user enters his account address and contract address of desired ERC20 asset, the app syncs logs history and displays it for the user.

<img width="1436" alt="Screenshot 2020-08-08 at 23 15 50" src="https://user-images.githubusercontent.com/36575414/89720744-83253c00-d9cd-11ea-90f1-3380f5d6977b.png">

## Hosted
* [Ethlogexplorer](https://ethlogexplorer.herokuapp.com/) on  Heroku

## Prerequisite
-  Nodejs and Npm
-  redis
- Api Access to Ethereuem Network ( You can get one at [infura.io](infura.io))

## Technologies
- react
- typescript
- nodejs / express
- web3
- scss
- axios
- eslint
- prettier

## How to get a copy
### Install
Run this command in your terminal to install dependencies
```bash
npm install
```

### How to run this project
- Create a `.env` file using `.env.sample` file( as guide) in the following directories:
  - / (root folder)
  - /server

- Run this command in your terminal
#### `Development`
```bash
npm run start:dev
```
#### `Production`
```bash
npm run production
```

## Author
Ilori Ezekiel [@Eazybee](https://github.com/eazybee)
