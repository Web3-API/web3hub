import { keccak256, toUtf8Bytes } from "ethers/lib/utils"

export const utf8ToKeccak256 = (value: string) => {
  return keccak256(toUtf8Bytes(value))
}