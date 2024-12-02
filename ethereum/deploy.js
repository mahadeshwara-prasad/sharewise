import { readFile } from 'fs/promises';
const compiledFactory = JSON.parse(
    await readFile(
      new URL('./build/Factory.json', import.meta.url)
    )
);
import {ethers} from "ethers";

const provider = "Your Provider"

const privatekey = "Your Private Key";

const wallet = new ethers.Wallet(privatekey,provider);

async function deployFactory(){

    console.log("Attepmting to deploy contract from account ",wallet.address);

    const contract = new ethers.ContractFactory(compiledFactory.abi,compiledFactory.bytecode,wallet);
    const factory = await contract.deploy();

    console.log("Contract Deployed at ",await factory.getAddress());
    
}

deployFactory();