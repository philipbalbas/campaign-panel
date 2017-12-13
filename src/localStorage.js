import store from 'store'

export const loadState = () => {
  try {
    const serializedState = store.get('state')
    if (serializedState === null) {
      return undefined
    }
    return serializedState
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    store.set('state', state)
  } catch (err) {
    throw err
  }
}

export const clearState = () => {
  try {
    store.clearAll()
  } catch (err) {
    throw err
  }
}
