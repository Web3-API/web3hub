/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Button, Styled, Field } from 'theme-ui'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWeb3ApiQuery } from '@web3api/react'
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
  const [newSelectedMethod, setnewSelectedMethod] = useState('')

  const [structuredschema, setstructuredschema] = useState<any>()

  const [clientresponse, setclientresponse] = useState<any>('')

  const [varformstoggle, setvarformstoggle] = useState(false)

  const varsList = [...selectedMethod.matchAll(/\$([a-zA-Z0-9_-]{1,})/g)] || null

  const [formVarsToSubmit, setformVarsToSubmit] = useState({})

  const { data: queryResponse, errors, loading, execute } = useWeb3ApiQuery({
    uri: 'ens/rinkeby/' + router.asPath.split('/playground/ens/')[1],
    query: selectedMethod,
    variables: formVarsToSubmit,
  })

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

  function handleRunBtnClick(e) {
    e.preventDefault()
    let varsToSubmit = {}
    Array.from(e.target)
      .filter((item: any) => item.type !== 'submit')
      .map((input: any) => (varsToSubmit[input.name] = input.value))
    setformVarsToSubmit(varsToSubmit)
    // setclientresponse(responseData)
  }

  useEffect(() => {
    async function runQuery() {
      if (Object.keys(formVarsToSubmit).length > 0) {
        console.log({
          uri: 'ens/rinkeby/' + router.asPath.split('/playground/ens/')[1],
          query: selectedMethod,
          variables: formVarsToSubmit,
        })
        await execute()
        console.log({ queryResponse, errors, loading })
        if(errors !== undefined || queryResponse !== undefined) {
          setclientresponse(queryResponse || [...errors].toString() )
        } else {
          console.log('if this is empty - async race condtion issue')
        }
        
        // data.methodName = whatever is returned (string, bool, object)
        // if (data && data.methodName) {
        //   setOutput(JSON.stringify(data.methodName))
        // }
      }
    }
    runQuery()
  }, [formVarsToSubmit])

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

  useEffect(() => {
    if (selectedMethod !== newSelectedMethod) {
      setnewSelectedMethod(selectedMethod)
    }
  }, [selectedMethod])

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
            {api.locationUri && (
              <div className="category-Badges" sx={{ ml: 3 }}>
                <Badge label="IPFS" onDark ipfsHash={api.locationUri} />
              </div>
            )}
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
              />
            </div>
          )}
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
            <form
              onSubmit={handleRunBtnClick}
              sx={{ bg: 'white', p: 3, pt: '0.6rem', label: { fontSize: '.9rem' } }}
            >
              {varsList.map((varItem) => (
                <Field
                  sx={{
                    p: '0 .5rem',
                  }}
                  label={varItem[0]}
                  name={varItem[1]}
                  key={varItem[1]}
                />
              ))}
              <input type="submit" value="Submit" sx={{ display: 'none' }} />
            </form>
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
              <Styled.h3 sx={{ m: 0, p: '.75rem', bg: '#cecece' }}>Schema</Styled.h3>
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
