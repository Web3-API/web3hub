import axios from 'axios'

export const useGetAPIfromURLPATH = async (router) => {
  let apiData = null
  let uri = router.query.uri
  let fullPath = ''
  if (uri) {
    let protocol = uri[0]
    let network = null
    let api = uri[uri.length - 1]
    if (uri.length === 3) {
      network = uri[1]
    }
    const { data } = await axios.get(
      `http://localhost:3001/apis/find/${protocol + '/'}${
        network ? network + '/' : ''
      }${api}`,
    )
    apiData = data
  }
  return apiData
}
