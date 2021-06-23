import ReactHtmlParser from 'react-html-parser'

export default function addrShortener(addr: string) {
  return ReactHtmlParser(
    addr.substring(0, 5) +
      '&bull;&bull;&bull;' +
      addr.substring(addr.length - 4, addr.length - 1),
  )
}
