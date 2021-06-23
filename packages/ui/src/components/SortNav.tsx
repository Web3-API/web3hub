/** @jsxImportSource theme-ui **/
import { Flex, Select } from 'theme-ui'
import { useState, useEffect } from 'react'
import { useStateValue } from '../state/state'
import SearchBox from './SearchBox'
import { APIData } from '../hooks/ens/useGetAPIfromENS'

const SortNav = () => {
  const [{ dapp }, dispatch] = useStateValue()

  const [searchOptions, setsearchOptions] = useState(dapp.apis)
  const handleSearchValuesChange = (value: APIData[]) => {
    if(value.length === 0) {
      dispatch({
        type: 'sortSelectApi',
        payload: -1
      })  
    } else {
      dispatch({
        type: 'sortSelectApi',
        payload: value
      })
    }
  }

  useEffect(() => {
    setsearchOptions(dapp.apis)
  }, [dapp.apis])

  return (
    <nav>
      <form>
        {dapp.apis && dapp.apis.length > 0 && (
          <SearchBox
            detachedResults
            large
            searchBy="name"
            placeholder={'Search'}
            labelField="name"
            valueField="name"
            options={searchOptions}
            values={[]}
            onChange={handleSearchValuesChange}
          />
        )}

        <br />
        <Flex
          sx={{
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
            color: 'w3darkGreen',
            fontFamily: 'Montserrat',
            fontSize: '0.9375rem',
            fontWeight: '500',
            lineHeight: '1.125rem',
            letterSpacing: '-0.025rem',
            textAlign: 'right',
            pb: 2
          }}
        >
          <span>
            <b>{dapp.apis.length}</b>&nbsp;API's
          </span>
          <div>
            <Select sx={{ minWidth: '8rem', border: 'none' }}>
              <option value="HighestRated">Higest Rated</option>
              <option value="MostRecent">Most Recent</option>
              <option value="Alphabetical">Alphabetical</option>
            </Select>
          </div>
        </Flex>
      </form>
    </nav>
  )
}

export default SortNav
