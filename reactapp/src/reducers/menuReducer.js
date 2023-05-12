export default function (
  menuStatus = {
    localisationStatus: false,
    geometrieStatus: true,
    boulonnerieStatus: true,
    jointStatus: true,
    chargementStatus: true,
    finishStatus: true,
    calculStatus: true
  },
  action
) {
  let newMenuStatus = menuStatus
  switch (action.type) {
    case 'localisation':
      newMenuStatus.geometrieStatus = !menuStatus.geometrieStatus
      return {...newMenuStatus}
    case 'bride':
      newMenuStatus.boulonnerieStatus = !menuStatus.boulonnerieStatus
      return {...newMenuStatus}
    case 'boulon':
      newMenuStatus.chargementStatus = !menuStatus.chargementStatus
      return {...newMenuStatus}
    case 'chargement':
      newMenuStatus.jointStatus = !menuStatus.jointStatus
      return {...newMenuStatus}
    case 'finish':
      newMenuStatus.finishStatus = !menuStatus.finishStatus
      return {...newMenuStatus}
    case 'calcul':
      newMenuStatus.calculStatus = !menuStatus.calculStatus
      return {...newMenuStatus}
    case 'charger':
      return {
        localisationStatus: false,
        geometrieStatus: false,
        boulonnerieStatus: false,
        jointStatus: false,
        chargementStatus: false,
        finishStatus: false,
        calculStatus: false
      }

    default:
      console.log('défaut')
      return newMenuStatus
  }
}
