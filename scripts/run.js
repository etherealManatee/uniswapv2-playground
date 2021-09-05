async function main() {

    const [deployer] = await ethers.getSigners();

    const UniswapV2Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
    const UniswapV2FactoryContract = await UniswapV2Factory.deploy(deployer.address);

    await UniswapV2FactoryContract.deployed();

    console.log("contract deployed to:", UniswapV2FactoryContract.address);

    const Token1Factory = await hre.ethers.getContractFactory("Token1")
    const Token1FactoryContract = await Token1Factory.deploy()
    await Token1FactoryContract.deployed()
    let token1Address = Token1FactoryContract.address
    console.log("Token1 address: ", token1Address)

    const Token2Factory = await hre.ethers.getContractFactory("Token2")
    const Token2FactoryContract = await Token2Factory.deploy()
    await Token2FactoryContract.deployed()
    let token2Address = Token2FactoryContract.address
    console.log("Token2 address: ", token2Address)

    let createPairTxn = await UniswapV2FactoryContract.createPair(token1Address,token2Address)
    await createPairTxn.wait()
    console.log("pair created")

    let WETHFactory = await hre.ethers.getContractFactory("WETH")
    let WETHFactoryContract = await WETHFactory.deploy()
    await WETHFactoryContract.deployed()
    console.log("WETH Address: ", WETHFactoryContract.address)

    let UniswapV2Router02Factory = await hre.ethers.getContractFactory("UniswapV2Router02");
    let UniswapV2Router02FactoryContract = await UniswapV2Router02Factory.deploy(UniswapV2FactoryContract.address, WETHFactoryContract.address)
    await UniswapV2Router02FactoryContract.deployed()
    console.log("router Address: ", UniswapV2Router02FactoryContract.address)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
  });
