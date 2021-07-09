import axios from 'axios'
import { Element } from 'cheerio'
import { ApiData } from '../../api/models/types'
import { cloudFlareGateway } from '../../constants'
import { APIData } from '../../hooks/ens/useGetAPIfromENS'
import get_CFG_UI_DOM from '../../utils/get_CFG_UI_DOM'

export interface QueryAttributes {
  id: string
  value: string
  recipe?: string
}

const getInfo = async (row: Element, folder: string): Promise<QueryAttributes> => {
  const queryData = await axios.get(
    `${cloudFlareGateway.replace('/ipfs/', '')}${row.attribs.href}`,
  )
  const key = row.attribs.href.split(`meta/${folder}/`)[1].split('.graphql')[0]
  return { id: key, value: queryData.data }
}

const getPackageQueries = async (api: APIData): Promise<QueryAttributes[]> => {
  const $queries = await get_CFG_UI_DOM(api, '/meta/queries')
  const queriesInformation = Array.from($queries('table tr td:nth-child(2) a'))
  queriesInformation.shift() // dump .. in row 1

  const queries = await Promise.all(queriesInformation.map((q) => getInfo(q, 'queries')))

  const recipes = await getPackageRecipes(api)

  console.log({ queries })
  const g = queries.map((query) => {
    console.log({ queryName: query.id })
    const recipeOfQuery = recipes.find((r) => {
      const [recipeName] = r.id.split('.json')
      return recipeName === query.id
    })

    if (recipeOfQuery) {
      return {
        ...query,
        recipe: recipeOfQuery.value,
      }
    }
    return query
  })
  console.log({ g })
  return g
}

async function getPackageRecipes(api: ApiData): Promise<QueryAttributes[]> {
  try {
    let $recipes = await get_CFG_UI_DOM(api, '/meta/recipes')
    let recipesInformation = Array.from($recipes('table tr td:nth-child(2) a'))
    recipesInformation.shift()

    const recipes = await Promise.all(
      recipesInformation.map((r) => getInfo(r, 'recipes')),
    )
    return recipes
  } catch {
    return []
  }
}

export default getPackageQueries
