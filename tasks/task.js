const config = require("hardhat/config")

const upgradeJ = require("../artifacts/contracts/ProxyAdmin.sol/ProxyAdmin.json")
const lockJ = require("../artifacts/contracts/Lock.sol/Lock.json")

   task("upgrade", "upgrade contruct", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    const sing = await hre.ethers.getSigner();
    for (const account of accounts) {
        console.log("account.address:",account.address);
        console.log("sing.address:", sing.address);
    }

    //调用未升级的合约
    const Contract = new hre.ethers.Contract("0x91A610cAEA0A84517D0a0A2958fB3Aa932cd6199", lockJ.abi, sing)
    // let balance = await Contract.balance()
    // console.log("balance", balance.toString());
    //初始化一次init
    // const init = await Contract.init()
    // console.log("init", init);
    balance = await Contract.balance();
    console.log("balance", balance.toString());
    const deposit = await Contract.deposit(996)
    console.log("deposit", deposit);
    balance = await Contract.balance()
    console.log("balance", balance.toString());
    const withdraw = await Contract.withdraw()
    console.log("withdraw", withdraw);
    balance = await Contract.balance()
    console.log("balance", balance.toString());

    //合约升级

    const Contract2 = new hre.ethers.Contract("0x84873714443a3fEDaB602aDdB33C30a059AE8561", upgradeJ.abi, sing)
    const upgrade = await Contract2.upgrade("0x9Ad38650730338A335d6dF507d55663CD896A83c", "0xDC9082AEDA28c908C03CfE3F1c893f82a1e791A5")
    console.log("upgrade", upgrade);

    //调用升级的合约
    const Contract3 = new hre.ethers.Contract("0xDEF3ab1872A657edcC6c3Ee9a7cd7c78D2751983", lockJ.abi, sing)
    const balance1 = await Contract3.balance()
    console.log("balance 1", balance1.toString());

    const deposit2 = await Contract3.deposit(996)
    console.log("deposit2", 0);
    const balance22 = await Contract3.balance()
    console.log("balance  2", balance22.toString());
    const withdraw2 = await Contract3.withdraw()
    console.log("withdraw2", 0);
    const balance3 = await Contract3.balance()
    console.log("balance  3", balance3.toString());
    console.log("end");
});

task("abi", "verify upgrade contruct", async () => {
    console.log("LockJ.abi:", lockJ.abi);
})