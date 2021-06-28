import { providers } from 'ethers'
import ENS, { getEnsAddress } from '@ensdomains/ensjs'

const { helpers } = require('content-hash')

interface CheckContentResponse {
  valid: boolean
  message?: string
}

export const checkContentIsValid = async (
  pointers: string[],
  location: string,
): Promise<CheckContentResponse> => {
  const provider = new providers.JsonRpcProvider(process.env.ETH_RPC_NODE)

  const ens = new ENS({
    provider,
    ensAddress: getEnsAddress('3'),
  })

  const getContents = async (pointers: string[]): Promise<{ value: string }[]> => {
    const contentsPromises = pointers.map((p) => {
      return ens.name(p).getContent()
    })
    return await Promise.all(contentsPromises)
  }

  const contents = await getContents(pointers)

  const invalidPointers = contents.filter(({ value }) => {
    return !value
  })

  if (invalidPointers.length) {
    return {
      message: `Pointer: ${pointers[0]} is not registered`,
      valid: false,
    }
  }

  const invalidLocation = contents.filter(({ value }) => {
    let hash = value.split('/').slice(-1)[0]

    if (location.includes('bafy')) {
      hash = helpers.cidV0ToV1Base32(hash)
    }

    return !location.includes(hash)
  })

  if (invalidLocation.length) {
    return {
      valid: false,
      message: `Pointer ${pointers[0]} is not pointing to given location`,
    }
  }

  return { valid: true }
}
