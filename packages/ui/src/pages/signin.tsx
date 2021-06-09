/** @jsxImportSource theme-ui **/
import { Flex, Themed } from 'theme-ui'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useStateValue } from '../state/state'
import axios from 'axios'

import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import BGWave from '../components/BGWave'
import Header from '../components/Header'
import { useSet } from '../hooks/auth'

const Signin = () => {
  const [, dispatch] = useStateValue()
  const router = useRouter()
  const set = useSet()

  useEffect(() => {
    ;(async () => {
      if (router.query.code) {
        const response = await axios.get(
          `http://localhost:3001/auth/github/callback/${router.query.code}`,
          {
            withCredentials: true,
          },
        )
        if ('access_token' in response.data) {
          console.log('Access token: ', response.data.access_token)

          await set('basicProfile', response.data.access_token)
          console.log('Basic profile set!')
          dispatch({
            type: 'SET_GITHUB_USER',
            payload: response.data.access_token,
          })
        }
        router.push(localStorage.getItem('w3hubLastURLb4Signin'))
      }
    })()
  }, [router.query])
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents">
            <Header title="Browse APIs" />
            <section
              className="content"
              sx={{ display: 'grid', placeItems: 'center', height: '50%' }}
            >
              <Themed.h1>Signing In...</Themed.h1>
            </section>
          </div>
        </main>
      </Flex>
      <BGWave light />
    </Layout>
  )
}

export default Signin
