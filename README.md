# Web3Hub

## Key Principles Of Seperation (App <> API)

**1.** POST: Only use API URIs as args
   > Example:  
   /api/publish&uri="/ipfs/QmHASH"
   > Example:  
   /api/publish&uri="/ens/domain.eth"

**2.** GET: can have any number of args (filters)

**3.** Core functionality of the app should not need the backend, only used for optional additive features.
   > Example:  
   "un-index" API "about" page should be viewable w/ all metadata except it might lack the feature of "other pointer URIs for this package"
   > Example:  
     playground can be used w/ an "un-index" URI, but the "owner" may not be able to be gotten (since this is something the backend has)

**4.** All "base" functionality of the Web3Hub SHOULD be supported through the Client & its types
   > Example:  
   fetching an API's metadata

**5.** Build the Web3Hub in a way that ~any other Web3ApiClient developer~ could do the same thing
