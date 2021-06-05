import { ethers } from "ethers"
import { networkID } from "../constants";
import networks from "../utils/networks.json"

type Address = string;
type EthereumProvider = string | ethers.providers.ExternalProvider;

export const createEthereumProvider = (provider: EthereumProvider): ethers.providers.JsonRpcProvider => {
  if (typeof provider === "string") {
    return new ethers.providers.JsonRpcProvider(provider);
  } else {
    return new ethers.providers.Web3Provider(provider);
  }
}

export const getReadOnlyProvider = (): ethers.providers.JsonRpcProvider => {
  const currentNetwork = networks[networkID]
  return new ethers.providers.JsonRpcProvider(currentNetwork.node)
}

export const getContract = (address: Address, abi: string[], providerOrSigner: ethers.providers.JsonRpcProvider | ethers.providers.JsonRpcSigner): ethers.Contract => {
  return new ethers.Contract(address, abi, providerOrSigner);
}

export const deployContract = async (
  abi: ethers.ContractInterface,
  bytecode: string,
  provider: ethers.providers.JsonRpcProvider,
  ...args: unknown[]
): Promise<Address> => {
  const factory = new ethers.ContractFactory(abi, bytecode, provider.getSigner());
  const contract = await factory.deploy(...args);
  await contract.deployTransaction.wait();
  return contract.address;
}

export const callView = async (
  address: Address,
  method: string,
  args: string[],
  provider?: ethers.providers.JsonRpcProvider
): Promise<string> => {
  let contract: ethers.Contract

  if(!provider) {
    const infuraProvider = getReadOnlyProvider()
    contract = getContract(address, [method], infuraProvider)
  } else {
    contract = getContract(address, [method], provider.getSigner());
  }

  const funcs = Object.keys(contract.interface.functions);
  const res = await contract[funcs[0]](...args);
  return res.toString();
}

export const sendTransaction = async (
  address: Address,
  method: string,
  args: (string | Record<string, string | number> )[],
  provider: ethers.providers.JsonRpcProvider
): Promise<ethers.providers.TransactionReceipt> => {
  const contract = getContract(address, [method], provider.getSigner());
  const funcs = Object.keys(contract.interface.functions);
  try {
    const tx = await contract[funcs[0]](...args);
    return await tx.wait();
  } catch (error) {
    console.log(error);
    throw error;
  }
}