import { ethers } from "ethers";
import { namehash } from "ethers/lib/utils"
import { ENS_REGISTRY } from "../../constants"
import { callView } from "../../utils/ethereum";

export const getOwner = async (domain: string, web3?: ethers.providers.JsonRpcProvider) => {
  return await callView(
    ENS_REGISTRY,
    "function owner(bytes32 node) external view returns (address)",
    [namehash(domain)],
    web3
  );
}
