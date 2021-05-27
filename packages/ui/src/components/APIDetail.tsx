/** @jsxImportSource theme-ui **/
import { Flex, Themed, Button } from 'theme-ui'
import BottomSpace from '../components/BottomSpace'
import Stars from '../components/Stars'
import PlaygroundImg from '../../public/images/playground.svg'
import { cloudFlareGateway } from '../constants'
import { useRouter } from 'next/router'

type APIDetailProps = {
  api?: any
}

const APIDetail = ({
  api,
}: APIDetailProps) => {
  const router = useRouter()
  return (
    <div
      className="wrap"
      sx={{
        borderRadius: '0.5rem',
        bg: 'white',
        px: '2rem',
        py: '2rem',
      }}
    >
      <Flex className="top">
        <img
          className="api-logo"
          src={`${cloudFlareGateway}${
            api.locationUri.split('ipfs/')[0]
          }${api.icon.replace('./', '/')}`}
          sx={{
            width: '13.125rem',
            height: '13.125rem',
            mr: 4,
          }}
        />
        <div className="api-info" sx={{ mr: 4, width: '28.125rem' }}>
          <Themed.h1
            className="title"
            sx={{
              mb: 3,
              mt: 4,
              fontWeight: 'bold',
              fontSize: 66,
              color: 'black',
              lineHeight: '5rem',
              letterSpacing: '-0.125rem',
            }}
          >
            {api.name}
          </Themed.h1>
          <div
            className="subtitle"
            sx={{
              mb: 4,
              color: '#86909F',
              fontSize: '1.125rem',
              fontWeight: '500',
              lineHeight: '1.3713rem',
            }}
          >
            {api.subtext}
          </div>
          <p
            className="description"
            sx={{
              lineHeight: '1.25rem',
            }}
          >
            {api.description}
          </p>
        </div>
        <div
          className="info-card"
          sx={{
            px: '1.5rem',
            py: '2rem',
            width: '360px',
            boxShadow: '0rem 1.5625rem 2.5rem rgba(0, 0, 0, 0.06)',
            borderRadius: '0.5rem',
            top: 4,
            position: 'absolute',
            right: 0,
            zIndex: 1,
            background: 'white',
          }}
        >
          <Flex
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <div className="left">
              <Themed.h4
                className="title"
                sx={{
                  mb: 0,
                  color: 'black',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '14px',
                  letterSpacing: '-0.004em',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                }}
              >
                {api.name}
              </Themed.h4>
            </div>
            <div className="right">
              <Stars count={0} large />
            </div>
          </Flex>
          <ul
            className="links"
            sx={{
              '*': {
                color: 'w3green',
                textDecoration: 'none',
              },
              li: {
                fontFamily: 'Istok Web',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '1rem',
                lineHeight: '23px',
                mb: 3,
                mixBlendMode: 'normal',
              },
            }}
          >
            {'pointerUris' in api &&
              api.pointerUris.map((pointer, idx) => {
                return (
                  <li sx={{ display: 'flex' }} key={idx+'pointerURI'}>
                    <img
                      sx={{ maxWidth: '1.1875rem', mr: 2 }}
                      src="/images/link.svg"
                      alt="icon"
                    />
                    <a href={pointer} target="_BLANK">
                      {pointer}
                    </a>
                  </li>
                )
              })}
            {'links' in api &&
              api.links.map((link, idx) => {
                if (link.name === 'github') {
                  return (
                    <li sx={{ display: 'flex' }} key={'apilink' + idx}>
                      <img
                        sx={{ maxWidth: '1.1875rem', mr: 2 }}
                        src="/images/github.svg"
                        alt="icon"
                      />
                      <a href="https://www.github.com/ORG/REPO" target="_BLANK">
                        github.com/ORG/REPO
                      </a>
                    </li>
                  )
                }
                if (link.name === 'website') {
                  return (
                    <li sx={{ display: 'flex' }} key={'apilink' + idx}>
                      <img
                        sx={{ maxWidth: '1.1875rem', mr: 2 }}
                        src="/images/doc.svg"
                        alt="icon"
                      />
                      <a href="https://www.github.com/ORG/docs" target="_BLANK">
                        github.com/ORG/DOCS
                      </a>
                    </li>
                  )
                }
              })}
          </ul>
          <br />
          <Button
            variant="calloutLarge"
            sx={{ pl: 4, width: '100%' }}
            onClick={() => {
              router.push(`/playground/ens/${api.pointerUris[0]}`)
            }}
          >
            <Flex sx={{ alignItems: 'center', justifyContent: 'left' }}>
              <img
                sx={{ maxWidth: '1.1875rem', mr: 2 }}
                src="/images/playground.svg"
                alt="icon"
              />
              <PlaygroundImg
                stroke="#FFF"
                sx={{
                  width: '2.125rem',
                  height: '2rem',
                  position: 'absolute',
                  left: '-12%',
                }}
              />
              <span>Playground</span>
            </Flex>
          </Button>
        </div>
      </Flex>

      <Flex
        className="bottom"
        sx={{ bg: '#FCFDFD', borderTop: '0.0625rem solid #ECF4F2', mt: 4, pt: 4 }}
      >
        <img
          className="api-logo"
          src="api-logo.svg"
          sx={{
            opacity: 0,
            width: '13.125rem',
            height: '13.125rem',
            mr: 4,
          }}
        />
        <div sx={{ width: '38.375rem' }}>
          <Themed.h2 sx={{ textAlign: 'center' }}>Get Started</Themed.h2>
          <Themed.code>
            <Themed.pre>{`yarn install @web3api/client`}</Themed.pre>
          </Themed.code>
          <Themed.code>
            <Themed.pre>
              {`import {
  Web3API,
  Ethereum,
  IPFS,
  Subgraph
} from "@web3api/client-js";

const api = new Web3API({
  uri: "simplestorage.eth",
  portals: {
    ethereum: new Ethereum({ provider: (window as any).ethereum }),
    ipfs: new IPFS({ provider: "http://localhost:5001" }),
    subgraph: new Subgraph({ provider: "http://localhost:8020" })
  }
})`}
            </Themed.pre>
          </Themed.code>
        </div>
      </Flex>
      <BottomSpace />
      <div className="Playground" />
    </div>
  )
}

export default APIDetail
