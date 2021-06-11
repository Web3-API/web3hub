import axios from 'axios'

export const useGetAPIfromURLPATH = async (router) => {
  let apiData = null
  let uri = router.query.uri

  if (uri) {
    let authority = uri[0]
    let network = null
    let path = uri[uri.length - 1]
    if (uri.length === 3) {
      network = uri[1]
    }
    const { data } = await axios.get(
      `http://localhost:3001/apis/find/${authority}/${
        network ? network + '/' : ''
      }${path}`,
    );

    apiData = data
  }
  return apiData
}
