export default function (result = {}, action) {
  if (action.type === 'add_result') {
    let newResult = action.result
    return {...newResult}
  } else {
    return result
  }
}
