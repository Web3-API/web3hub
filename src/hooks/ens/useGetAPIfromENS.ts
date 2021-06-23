import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export interface APIData {
  id: number;
  name: string;
  subtext: string;
  description: string;
  icon: string;
  locationUri: string;
  pointerUris: string[];
}

export const useGetAPIfromENSParamInURL = () => {
  const router = useRouter()
  const [error, setError] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<APIData>()
  useEffect(() => {
    async function fetchApiDetails() {
      setIsLoading(true)
      try {
        if (router.query.view !== undefined) {
          const { data: apiData } = await axios.get<{ api: APIData }>(
            `http://localhost:3001/apis/find/ens/${router.asPath.split('ens/')[1]}`,
          )
          setData(apiData.api)
        }
      } catch (e) {
        setError(e)
      }
      setIsLoading(false)
    }
    fetchApiDetails()
  }, [router.query.view])
  return [{ error, isLoading, data }] as const
}
