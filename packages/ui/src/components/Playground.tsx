/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Button, Styled, Field } from 'theme-ui'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWeb3ApiQuery } from "@web3api/react";
import { useStateValue } from '../state/state'

import Badge from './Badge'
import Stars from './Stars'
import BGWave from './BGWave'
import SelectBox from './SelectBox'
import SearchBox from './SearchBox'

import Close from '../../public/images/close.svg'

import getPackageSchemaFromAPIObject from '../services/ipfs/getPackageSchemaFromAPIObject'
import getPackageQueriesFromAPIObject from '../services/ipfs/getPackageQueriesFromAPIObject'

import GQLCodeBlock from '../components/GQLCodeBlock'
import cleanSchema from '../utils/cleanSchema'
import { responseData } from '../constants'

type PlaygroundProps = {
  api?: any
}

const Playground = ({ api }: PlaygroundProps) => {
  const [{ dapp }] = useStateValue()
  const router = useRouter()
  const [apiOptions] = useState(dapp.apis)

  const [apiContents, setapiContents] = useState<any>({})
  const [loadingContents, setloadingContents] = useState(false)

  const [showschema, setshowschema] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('')

  const [structuredschema, setstructuredschema] = useState<any>()

  const [clientresponse, setclientresponse] = useState<any>('')

  const [varformstoggle, setvarformstoggle] = useState(false)

  const { data, errors, loading, execute } = useWeb3ApiQuery({
    uri: "TODO: ens/rinkeby/simplestorage-meta.web3api.eth",
    query: "...",
    variables { ... }
  });

  /*
    data.methodName = whatever is returned (string, bool, object)

    if (data && data.methodName) {
      setOutput(JSON.stringify(data.methodName))
    }
  */

  const varsList = [...selectedMethod.matchAll(/\$([a-zA-Z0-9_-]{1,})/g)] || null

  function handleShowSchema(e: React.BaseSyntheticEvent) {
    return setshowschema(!showschema)
  }

  function handleQueryValuesChange(method) {
    return setSelectedMethod(method[0].value)
  }

  function handleSaveBtnClick() {
    const fileData = JSON.stringify(clientresponse)
    const blob = new Blob([fileData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `response.json`
    link.href = url
    link.click()
  }

  function handleRunBtnClick() {
    setclientresponse(responseData)
    // TODO: execute();
  }

  function handleClearBtnClick() {
    setclientresponse('')
  }

  function handleVarsFormToggle() {
    setvarformstoggle(!varformstoggle)
  }

  useEffect(() => {
    if (router.asPath.includes('ens/')) {
      setloadingContents(true)
    }
  }, [router])

  useEffect(() => {
    async function go() {
      let schemaData = await getPackageSchemaFromAPIObject(api)
      let queriesData = await getPackageQueriesFromAPIObject(api)
      setapiContents({
        schema: schemaData,
        queries: queriesData,
      })
      const {
        localqueries,
        localmutations,
        localcustom,
        importedqueries,
        importedmutations,
      } = cleanSchema(schemaData)
      setstructuredschema({
        localqueries: localqueries,
        localmutations: localmutations,
        localcustom: localcustom,
        importedqueries: importedqueries,
        importedmutations: importedmutations,
      })
      setloadingContents(false)
    }
    if (loadingContents === true) {
      go()
    }
  }, [loadingContents])

  return (
    <div
      className="playground"
      sx={{
        backgroundColor: 'w3shade3',
        borderRadius: '1rem',
        overflow: 'hidden',
        'code, pre, textarea': {
          border: 'none',
          fontSize: '0.875rem',
          lineHeight: '0.875rem',
        },
      }}
    >
      <Flex
        className="header"
        sx={{
          p: '1.5rem',
          backgroundColor: 'w3shade2',
          '*': { display: 'flex' },
          label: {
            display: 'none',
          },
        }}
      >
        {api === undefined ? (
          <SearchBox
            key={'search-api-box'}
            dark
            searchBy="name"
            placeholder={'Search API’s'}
            labelField="name"
            valueField="name"
            options={apiOptions}
            values={[]}
            onChange={(e) => {
              if (e.length > 0) {
                router.push('/playground/ens/' + e[0].pointerUris[0])
                console.log('TODO')
              }
            }}
          />
        ) : (
          <Styled.h1 sx={{ mb: 0 }}>{api.name}</Styled.h1>
        )}
        <Flex
          className="selection-detail"
          sx={{
            ml: 4,
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <div className="left">
            <Stars count={0} onDark />
            <ul className="category-Badges" sx={{ ml: 3 }}>
              <li>
                <Badge label="IPFS" onDark />
              </li>
            </ul>
          </div>
          <div className="right">
            <a
              className="text-nav"
              href={router.asPath.replace('playground', 'apis')}
              sx={{ '&:hover': { textDecoration: 'underline' } }}
            >
              GO TO API PAGE
            </a>
          </div>
        </Flex>
      </Flex>
      <Flex className="body" sx={{ height: '65vh' }}>
        <div
          className="query"
          sx={{
            width: '40%',
            backgroundColor: 'w3PlayGroundNavy',
            p: '1.5rem',
            minWidth: '435px',
          }}
        >
          <Flex
            className="templates"
            sx={{ flex: 1, mb: 4, justifyContent: 'space-between' }}
          >
            {apiContents?.queries && (
              <SelectBox
                key={'queries-box'}
                dark
                skinny
                labelField="id"
                valueField="id"
                placeholder={'Select Query'}
                options={apiContents.queries}
                onChange={handleQueryValuesChange}
              />
            )}
          </Flex>
          <Styled.code>
            <textarea
              onChange={() => {}}
              sx={{
                resize: 'none',
                width: '100%',
                height: '18rem',
                bg: 'transparent',
                color: 'w3PlaygroundSoftBlue',
                border: '2px solid rgba(205,208,227,0.295455) !important',
                borderRadius: '4px',
              }}
              value={selectedMethod}
            ></textarea>
             {/* <GQLCodeBlock
                value={selectedMethod}
                height={'300px'}
              /> */}
          </Styled.code>
          <div
            className={varformstoggle ? 'vars expanded' : 'vars'}
            sx={{
              display: varsList.length > 0 ? 'block' : 'none',
              position: 'absolute',
              width: '100%',
              height: '40px',
              bottom: 0,
              left: 0,
              '&.expanded': { height: 'max-content' },
            }}
          >
            <div
              className="lip"
              onClick={handleVarsFormToggle}
              sx={{
                bg: 'gray',
                height: '40px',
                px: 3,
                alignItems: 'center',
                display: 'grid',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Vars
            </div>
            <form sx={{ bg: 'white', p: 3 }}>
              {varsList.map((varItem) => (
                <Field
                  label={varItem[0]}
                  name={varItem[1]}
                  defaultValue=""
                  key={varItem[1]}
                />
              ))}
            </form>
          </div>
        </div>
        &nbsp;
        <div
          className="result"
          sx={{
            width: '70%',
            backgroundColor: 'w3PlayGroundNavy',
            display: 'flex',
            flexDirection: 'column',
            p: '1.5rem',
            pb: 0,
          }}
        >
          <Flex
            className="controls"
            sx={{
              justifyContent: 'space-between',
              mb: 2,
              '*': { display: 'flex', alignItems: 'center' },
            }}
          >
            <div className="left" sx={{ '> *': { mr: '1rem !important' } }}>
              <Button variant="primarySmall" onClick={handleRunBtnClick}>
                Run
              </Button>
              {clientresponse !== '' && (
                <React.Fragment>
                  <Button variant="secondarySmall" onClick={handleSaveBtnClick}>
                    Save
                  </Button>
                  <Button variant="secondarySmall" onClick={handleClearBtnClick}>
                    Clear
                  </Button>
                </React.Fragment>
              )}
            </div>
            <div className="right">
              {loadingContents ? (
                'Loading Schema...'
              ) : (
                <span
                  className="text-nav left-chevron"
                  onClick={handleShowSchema}
                  sx={{ cursor: 'pointer' }}
                >
                  {loadingContents && 'Loading Schema...'}
                  <span sx={{ fontSize: '2.5rem', pr: '1rem' }}>‹</span>
                  <span>Show Schema</span>
                </span>
              )}
            </div>
          </Flex>
          <Styled.pre
            sx={{ height: '100%', color: 'w3PlaygroundSoftBlue', pb: 0, mb: 0 }}
          >
            {clientresponse !== '' && JSON.stringify(clientresponse, undefined, 2)}
          </Styled.pre>
        </div>
        {structuredschema?.localqueries && (
          <Flex
            sx={{
              p: 0,
              position: 'absolute',
              right: !showschema ? '-100%' : '0',
              transition: '.25s all ease',
              height: '510px',
              overflowY: 'scroll',
              width: 'max-content',
              borderRadius: '8px',
              borderTopRightRadius: '0px',
            }}
          >
            <Close
              onClick={handleShowSchema}
              sx={{
                fill: '#FFF',
                width: '30px',
                height: '30px',
                top: '1rem',
                '&:hover': {
                  fill: 'w3PlaygroundSoftBlue',
                  cursor: 'pointer',
                },
              }}
            />
            <aside
              className="hidden-schema-panel"
              sx={{
                color: 'w3shade3',
                width: '400px',
              }}
            >
              <GQLCodeBlock
                readOnly
                title="Queries"
                value={structuredschema.localqueries}
              />
              <GQLCodeBlock
                readOnly
                title="Mutations"
                value={structuredschema.localmutations}
              />
              <GQLCodeBlock
                readOnly
                title="Custom Types"
                value={structuredschema.localcustom}
              />
              <GQLCodeBlock
                readOnly
                title="Imported Queries"
                value={structuredschema.importedqueries}
              />
              <GQLCodeBlock
                readOnly
                title="Imported Mutations"
                value={structuredschema.importedmutations}
              />
            </aside>
          </Flex>
        )}
      </Flex>
      <BGWave dark />
    </div>
  )
}

export default Playground
