export default function stripIPFSPrefix (str: string) {
  return str.replaceAll('ipfs://', '').replaceAll('ipfs/', '')
}