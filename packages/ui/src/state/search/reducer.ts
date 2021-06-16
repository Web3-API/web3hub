import initialState, { State } from "../initialState"
import { SearchAction } from "./action"

export function searchReducer(_: State, action: SearchAction): State["search"] {
  let newStateObj = initialState.search
  switch (action.type) {
    case 'sortSelectApi':
      newStateObj.sortedApi = action.payload
      return newStateObj
  }
}