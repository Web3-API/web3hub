import { Web3ApiClient } from "@web3api/client-js";

const client = new Web3ApiClient();

export default async function getPackageSchema(path) {
  console.log(client)
  const manifest = await client.loadWeb3Api(path);
  console.log(manifest)
  // let schema = manifest.getSchema(client)
  // console.log(schema)
  
  // manifest.modules.query.schema // ./schema.graphql

  // client.getFile(uri, manifest.modules.query.schema);

  // // @web3api/schema-parse
  // const typeInfo = parseSchema(schema);

  // // Lookup the ethereum connection imported type
  // const type = find(
  //   "Connection from ethereum.web3api.eth",
  //   typeInfo.importedObjectTypes
  // )

  // // let schemaResponse = await axios.get(
  // //   `${cloudFlareGateway}${api.locationUri}/schema.graphql`,
  // // )
  // return schemaResponse.data
  return {}
}
