export default function (str: string) {
  return str.replaceAll('ipfs://', '').replaceAll('ipfs/', '')
}