export function getQueryString(name) {
  var result = window.location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i')
  )

  if (result == null || result.length < 1) {
    return ''
  }

  return result[1]
}
export const types = [
  'Houses', //0
  'Apartment', //1
  'Flat', //2
  'Garden', //3
  'Swimming pool', //4
  'Garage' //5
]