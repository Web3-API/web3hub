import axios from 'axios'
import { cloudFlareGateway } from '../constants'
import cheerio from 'cheerio'

const cleaner = require('clean-html')

export default async function get_CFG_UI_DOM(api: any, path: string) {
  console.log('Path calling in CFG:', `${cloudFlareGateway}${api.locationUri}${path}`)
  let response = await axios.get(`${cloudFlareGateway}${api.locationUri}${path}`)
  console.log('This is the response: ', response)
  let siteURLHTMLClean = ''
  cleaner.clean(response.data, (html: string) => (siteURLHTMLClean = html))
  let $ = cheerio.load(siteURLHTMLClean)
  return $
}
