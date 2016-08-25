module.exports = function base64(omni, query) {
  let result
  query = query.trim()
  if (/^\s*-d\s+\S+/.test(query)) {
    result = atob(query.split(/\s+/)[1])
  } else {
    result = btoa(query)
  }
  omni.removeItems()
  omni.addItems({
    title: result,
    clipboard: result
  })
  omni.sendFeedback()
}
