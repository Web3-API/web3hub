import { PublishAction } from "."
import initialState, { State } from "../initialState"

export function publishReducer(state: State, action: PublishAction): State["publish"] {
  let newStateObj = initialState.publish
  switch (action.type) {
    case 'setsubdomain':
      newStateObj.subdomain = action.payload
      return newStateObj
    case 'setipfs':
      newStateObj.ipfs = action.payload
      return newStateObj
    case 'setsubdomainError':
      newStateObj.subdomainError = action.payload
      return newStateObj
    case 'setsubdomainLookupSuccess':
      newStateObj.subdomainLookupSuccess = action.payload
      return newStateObj
    case 'setsubdomainRegisterSuccess':
      newStateObj.subdomainRegisterSuccess = action.payload
      return newStateObj
    case 'setsubdomainLoading':
      newStateObj.subdomainLoading = action.payload
      return newStateObj
    case 'setipfsLoading':
      newStateObj.ipfsLoading = action.payload
      return newStateObj
    case 'setipfsError':
      newStateObj.ipfsError = action.payload
      return newStateObj
    case 'setipfsSuccess':
      newStateObj.ipfsSuccess = action.payload
      return newStateObj
    case 'setShowConnectModal':
      newStateObj.showConnectModal = action.payload
      return newStateObj
    case 'setShowSignInModal':
      newStateObj.showSignInModal = action.payload
      return newStateObj
    case 'setShowSuccessModal':
      newStateObj.showSuccessModal = action.payload
      return newStateObj
    case 'setApiData':
      newStateObj.apiData = action.payload
      return newStateObj
    case 'registrationStatus':
      newStateObj.registrationStatus = action.payload
      return newStateObj
    default:
      return state.publish
  }
}