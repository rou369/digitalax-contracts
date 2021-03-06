const prompt = require('prompt-sync')();
const FactoryArtifact = require('../artifacts/DigitalaxGarmentFactory.json');

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log(
    "Creating a garment and wrapping using factory with address:",
    deployerAddress
  );

  const factoryAddress = prompt('Factory address? ');
  const factory = new ethers.Contract(
    factoryAddress,
    FactoryArtifact.abi,
    deployer
  );

  //await factory.createNewStrands(['randStrandUri1', 'randStrandUri2']);

  await factory.createGarmentAndMintStrands(
    'newGarmentWhat',
    '0x12D062B19a2DF1920eb9FC28Bd6E9A7E936de4c2',
    ['3','4'],
    ['2', '9'],
    '0x12D062B19a2DF1920eb9FC28Bd6E9A7E936de4c2'
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
