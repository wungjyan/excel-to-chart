export const getColumns = (sheetJson) => {
  const o = { ...sheetJson[0] }
  return _objectToArray(o)
}

const _objectToArray = (obj) => {
  const arr = []
  for (const key in obj) {
    arr.push(obj[key])
  }
  return arr
}

export const getRows = (sheetJson) => {
  const arr = [...sheetJson]
  const firstObj = arr.shift()
  const rows = []
  arr.forEach(item => {
    const keys = Object.keys(item)
    const _obj = {}
    keys.forEach(key => {
      _obj[firstObj[key]] = item[key]
    })
    rows.push(_obj)
  })
  return rows
}
