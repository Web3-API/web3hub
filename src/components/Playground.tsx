/** @jsxImportSource theme-ui **/
import { Flex, Button, Themed, Field } from 'theme-ui'
import React, { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWeb3ApiQuery } from '@web3api/react'
import { useStateValue } from '../state/state'

import Badge from './Badge'
import Stars from './Stars'
import BGWave from './BGWave'
import SelectBox from './SelectBox'
import SearchBox from './SearchBox'
import LoadingSpinner from './LoadingSpinner'

import Close from '../../public/images/close.svg'

import getPackageSchemaFromAPIObject from '../services/ipfs/getPackageSchemaFromAPIObject'
import getPackageQueriesFromAPIObject, {
  QueryAttributes,
} from '../services/ipfs/getPackageQueriesFromAPIObject'

import GQLCodeBlock from '../components/GQLCodeBlock'
import cleanSchema, { StructuredSchema } from '../utils/cleanSchema'
import { networkID } from '../constants'
import networks from '../utils/networks.json'
import stripIPFSPrefix from '../utils/stripIPFSPrefix'
import { APIData } from '../hooks/ens/useGetAPIfromENS'
import { QueryApiResult } from '@web3api/client-js'
import { OnChange } from '@monaco-editor/react'
import JSONEditor from './JSONEditor'

type PlaygroundProps = {
  api?: APIData
}

interface APIContents {
  schema?: string
  queries?: QueryAttributes[]
}

const Playground = ({ api }: PlaygroundProps) => {
  const [{ dapp }] = useStateValue()
  const router = useRouter()
  const [apiOptions] = useState(dapp.apis)

  const [searchboxvalues, setsearchboxvalues] = useState([])

  const [apiContents, setapiContents] = useState<APIContents>()
  const [loadingPackageContents, setloadingPackageContents] = useState(false)

  const [showschema, setshowschema] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('')
  const [newSelectedMethod, setnewSelectedMethod] = useState('')
  const [methodName, setMethodName] = useState('')

  const [structuredschema, setstructuredschema] = useState<StructuredSchema>()

  const [clientresponded, setclientresponed] = useState<
    QueryApiResult<Record<string, any>>
  >()

  const [customquerytext, setcustomquerytext] = useState('')

  const [varformstoggle, setvarformstoggle] = useState(false)

  const varsList =
    [...selectedMethod.matchAll(/\$([a-zA-Z0-9_-]{1,})/g)].concat([
      ...customquerytext.matchAll(/\$([a-zA-Z0-9_-]{1,})/g),
    ]) || null

  const [formVarsToSubmit, setformVarsToSubmit] = useState({})
  // const { name: networkName } = networks[networkID]

  const { loading, execute } = useWeb3ApiQuery({
    uri: 'ens/v2.uniswap.web3api.eth',
    query: selectedMethod,
    variables: formVarsToSubmit,
  })

  function handleShowSchema(e: React.BaseSyntheticEvent) {
    return setshowschema(!showschema)
  }

  function handleQueryValuesChange(method: { value: string; id: string }[]) {
    setMethodName(method[0].id)
    setSelectedMethod(method[0].value)
  }

  function handleSaveBtnClick() {
    const fileData = JSON.stringify(clientresponded)
    const blob = new Blob([fileData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `response.json`
    link.href = url
    link.click()
  }

  const handleVariableChanges = (e: string) => {
    try {
      setformVarsToSubmit(JSON.parse(e))
    } catch (error) {}
  }

  function handleClearBtnClick() {
    setclientresponed(undefined)
  }

  function handleVarsFormToggle() {
    setvarformstoggle(!varformstoggle)
  }

  const handleEditorChange: OnChange = (e) => {
    setcustomquerytext(e)
  }

  async function exec() {
    try {
      let response = await execute()
      setclientresponed(response)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (router.asPath.includes('ens/')) {
      setloadingPackageContents(true)
    }
  }, [router])

  useEffect(() => {
    async function go() {
      let schemaData = await getPackageSchemaFromAPIObject(api)
      let queriesData = await getPackageQueriesFromAPIObject(api)
      queriesData.push({
        id: 'custom',
        value: '\n\n\n\n\n\n\n\n\n\n',
      })
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
      setloadingPackageContents(false)
    }
    if (loadingPackageContents && api) {
      go()
    }
  }, [loadingPackageContents, api])

  useEffect(() => {
    if (selectedMethod !== newSelectedMethod) {
      setnewSelectedMethod(selectedMethod)
    }
  }, [selectedMethod])

  useEffect(() => {
    const queryInfo = apiContents && apiContents.queries.find((q) => q.id === methodName)
    let newVars = queryInfo && queryInfo.recipe ? queryInfo.recipe : {}
    setformVarsToSubmit(newVars)
  }, [newSelectedMethod])

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
          '&label': {
            display: 'none',
          },
          '.react-dropdown-select-input': {
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
            values={searchboxvalues}
            searchable={false}
            onChange={(values) => {
              setsearchboxvalues(values)
              if (values.length > 0) {
                if (values[0]?.pointerUris.length > 0) {
                  router.push('/playground/ens/' + values[0].pointerUris[0])
                } else {
                  router.push(
                    '/playground/ipfs/' + stripIPFSPrefix(values[0].locationUri[0]),
                  )
                }
              }
            }}
          />
        ) : (
          <Themed.h1 sx={{ mb: 0 }}>{api.name}</Themed.h1>
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
            {api?.locationUri && (
              <div className="category-Badges" sx={{ ml: 3 }}>
                <Badge label="IPFS" onDark ipfsHash={api.locationUri} />
              </div>
            )}
          </div>
          <div className="right">
            <a
              className="text-nav"
              href={router.asPath.replace('playground', 'apis')}
              sx={{ '&:hover': { textDecoration: 'underline' }, color: 'w3TextNavTeal' }}
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
          {selectedMethod !== '' && selectedMethod === newSelectedMethod && (
            <div
              sx={{
                border: '2px solid gray',
                borderRadius: '8px',
                overflow: 'Hidden',
                bg: '#002b36',
              }}
            >
              <GQLCodeBlock
                key={newSelectedMethod}
                value={selectedMethod}
                height={'300px'}
                handleEditorChange={handleEditorChange}
              />
            </div>
          )}
          <div
            className={varformstoggle ? 'vars expanded' : 'vars'}
            sx={{
              display: varsList.length ? 'block' : 'none',
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
                bg: '#284c5d',
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
            <JSONEditor
              value={formVarsToSubmit}
              handleEditorChange={handleVariableChanges}
            />
          </div>
        </div>
        &nbsp;
        <div
          className="result"
          sx={{
            width: '60%',
            maxWidth: '712px',
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
              {apiContents?.queries && (
                <Button variant="primarySmall" onClick={exec}>
                  Run
                </Button>
              )}

              {clientresponded !== undefined && (
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
              {loadingPackageContents
                ? 'Loading Schema...'
                : apiContents?.schema && (
                    <span
                      className="text-nav left-chevron"
                      onClick={handleShowSchema}
                      sx={{ cursor: 'pointer' }}
                    >
                      {loadingPackageContents && 'Loading Schema...'}
                      <span sx={{ fontSize: '2.5rem', pr: '1rem' }}>‹</span>
                      <span>Show Schema</span>
                    </span>
                  )}
            </div>
          </Flex>
          <Themed.pre
            sx={{ height: '100%', color: 'w3PlaygroundSoftBlue', pb: 0, mb: 0 }}
          >
            {loading ? (
              <div sx={{ display: 'grid', placeItems: 'center', height: '60%' }}>
                <LoadingSpinner />
              </div>
            ) : (
              <React.Fragment>
                {clientresponded !== undefined &&
                  JSON.stringify(clientresponded.data, undefined, 2)}
                {clientresponded !== undefined &&
                  clientresponded.errors !== undefined &&
                  clientresponded.errors.toString()}
              </React.Fragment>
            )}
          </Themed.pre>
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
                top: '18px',
                position: 'sticky',
                left: 0,
                '&:hover': {
                  fill: 'w3PlaygroundSoftBlue',
                  cursor: 'pointer',
                },
              }}
            />
            <div>
              <Themed.h3 sx={{ m: 0, p: '.75rem', bg: '#cecece' }}>Schema</Themed.h3>
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
            </div>
          </Flex>
        )}
      </Flex>
      <BGWave dark />
    </div>
  )
}

export default Playground
