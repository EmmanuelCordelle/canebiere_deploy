export default function (data = {}, action) {
  let dataCopy = data

  switch (action.type) {
    case 'add_localisation':
      dataCopy.localisation = action.data
      return {...dataCopy}
    case 'add_bride':
      dataCopy.bride = action.data
      return {...dataCopy}
    case 'add_boulonnerie':
      dataCopy.boulon = action.data
      return {...dataCopy}
    case 'add_chargement':
      dataCopy.chargement = action.data
      return {...dataCopy}
    case 'add_joint':
      dataCopy.joint = action.data
      return {...dataCopy}
    case 'charger':
      return {...action.data}

    default:
      return dataCopy
  }
}
