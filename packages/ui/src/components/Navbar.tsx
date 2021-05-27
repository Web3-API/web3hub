/** @jsxImportSource theme-ui **/
import { Flex, useThemeUI } from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import APIs from '../../public/images/apis.svg'
import PlaygroundImg from '../../public/images/playground.svg'
import Doc from '../../public/images/doc.svg'

const Navbar = () => {
  const router = useRouter()
  const { theme } = useThemeUI()
  return (
    <nav
      role="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 4,
        backgroundColor: 'w3NavGrayGreen',
        flexDirection: 'column',
        height: '100vh',
        maxWidth: '7rem',
        zIndex: 100,
        '*': { display: 'flex', flexDirection: 'column' },
        '.col': { flex: 3, '&:last-of-type': { justifyContent: 'flex-end' } },
      }}
    >
      <div className="col">
        <div className="brand" sx={{ mb: 3 }}>
          <Link href="/">
            <a>
              <div className="logo">
                <img src="/images/web3hub-logo.svg" alt="web3hub-logo" />
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className="col" sx={{ flex: '6 !important', justifyContent: 'center' }}>
        <Flex sx={{ flex: 1 }}>
          <ul
            sx={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              li: {
                // transition: 'border-left-color, background-color 2s ease',
                display: 'flex',
                alignItems: 'center',
                borderLeft: '0.125rem solid',
                borderLeftColor: 'w3NavGrayGreen',
                svg: {
                  stroke: 'w3green',
                },
                '&:hover': {
                  borderLeftColor: 'w3NavHighlightTeal',
                  backgroundColor: 'w3NavHighlightTeal',
                },
                '&.active': {
                  borderLeftColor: 'w3NavNeonHighlightTeal',
                  backgroundColor: 'w3NavHighlightTeal',
                  span: { color: 'white !important' },
                  svg: {
                    stroke: 'white',
                  },
                },
                a: {
                  px: 3,
                  py: 4,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                },
              },
            }}
          >
            <li
              className={
                router.pathname === '/' || router.pathname.includes('/apis')
                  ? 'active'
                  : ''
              }
            >
              <Link href="/">
                <a sx={{ alignItems: 'center' }}>
                  <APIs />
                  <span sx={{ height: 2 }}>&nbsp;</span>
                  <span className="text-nav" sx={{ color: 'w3TextNavTeal'}}>API's</span>
                </a>
              </Link>
            </li>
            <li className={router.pathname.includes('/playground') ? 'active' : ''}>
              <Link href="/playground">
                <a className="text-nav">
                  <PlaygroundImg />
                  <span sx={{ height: 2 }}>&nbsp;</span>
                  <span className="text-nav" sx={{ color: 'w3TextNavTeal'}}>Playground</span>
                </a>
              </Link>
            </li>
            <li>
              <a className="text-nav" href="https://web3api.dev" target="_BLANK">
                <Doc />
                <span>&nbsp;</span>
                <span className="text-nav" sx={{ color: 'w3TextNavTeal'}}>Docs</span>
              </a>
            </li>
          </ul>
          
        </Flex>
      </div>
      <div className="col" sx={{ flex: '3 !important' }}>
        <a href="https://web3api.typeform.com/to/AkTwem3f" target="_BLANK" sx={{
          color: 'white',
          fontSize: 1,
          '&:hover': {
            textDecoration: 'underline'
          }
        }}>Feedback</a>
      </div>
    </nav>
  )
}

export default Navbar
