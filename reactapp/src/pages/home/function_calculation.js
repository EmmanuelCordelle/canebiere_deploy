import {coef} from './function_coef'

const calcul_couple = function (FSmax, FSmin, Dn, p, nb, incertitude, Dpe, Dtp, Coef_frottement) {
  let Rma = (Math.pow(Dpe, 3) - Math.pow(Dtp, 3)) / (3 * (Dpe * Dpe - Dtp * Dtp))
  let kb =
    p / (2 * Math.PI) +
    (Coef_frottement * (Dn - 0.6495 * p)) / (2 * Math.cos((30 * Math.PI) / 180)) +
    Coef_frottement * Rma
  console.log(Coef_frottement)
  console.log((Coef_frottement * (Dn - 0.6495 * p)) / (2 * Math.cos((30 * Math.PI) / 180)))
  let FSnom = FSmax / (1 + incertitude / 100)
  let Fmin = FSnom * (1 - incertitude / 100)
  console.log('Fmin :', Fmin, 'FSmin :', FSmin, 'kb ', kb)

  if (Fmin >= FSmin) {
    return Math.ceil((kb * FSnom) / (nb * 1000) - 1)
  } else {
    return "Effort min inférieur au mini d'étanchéité"
  }
}

export async function calcul(datas) {
  console.log(datas)
  // CF note D450721003455 [1]

  // calcul de la largeur réelle du joint (surface utile)

  let Dje
  const Dji = datas.joint.Dji
  const Cconv = 25.4

  // calcul de l'espacement entre les boulons
  const nb = datas.boulon.Nombre
  const C = datas.bride.C
  const B = datas.bride.B
  const G0 = datas.bride.Type_bride === 'plate' ? 0 : datas.bride.G0
  const G1 = datas.bride.Type_bride === 'plate' ? 0 : datas.bride.G1
  const Dn = datas.boulon.Dn
  const Ep = datas.bride.Ep
  const h = datas.bride.Type_bride === 'plate' ? 0 : datas.bride.h
  let space = (Math.PI * C) / nb

  let C0 = space > 2 * Dn + Ep ? Math.sqrt((Math.PI * C) / (nb * (2 * Dn + Ep))) : 1

  let Sb = Math.PI * Math.pow(Dn - 1.2268 * datas.boulon.Pas, 2) * nb

  let error = false

  if (datas.bride.Dfs !== undefined) {
    datas.joint.Dje < datas.bride.Dfs ? (Dje = datas.joint.Dje) : (Dje = datas.bride.Dfs)
  } else {
    Dje = datas.joint.Dje
  }

  let N = (Dje - Dji) / 2

  let b0 = N / 2

  // calcul de la largeur efficace du joint
  let b
  b0 > 6.35 ? (b = 0.5 * Cconv * Math.sqrt(b0 / Cconv)) : (b = b0)

  //calcul du diametre de reaction du joint
  let Dj = Dje - 2 * b

  const R = (C - B) / 2 - G1
  const hd = R + G1 / 2
  const hg = (C - Dj) / 2
  const ht = (R + G1 + hg) / 2

  //calcul de l'effort d'assise du joint

  let Fj = Math.round(Math.PI * Dj * b * datas.joint.Y)

  //calcul de l'effort de maintien de l'etancheite
  let resultat = {joint: {Dje, Dji, b0, b, Dj, Fj}, bras_levier: {hd, ht, hg, R, C0}, error: null}
  let FF_tab = []

  for (let categorie in datas.chargement) {
    let data = datas.chargement[categorie]
    if (data.check === true) {
      // calcul de l'effort de serrage assurant l'assise du joint
      let FM = 2 * Math.PI * Dj * datas.joint.m * b * data.Pc
      let FF, Peq, FS

      if (categorie === 'categorie_0') {
        //calcul de l'effet de fond en situation de calcul
        FF = (Math.PI / 4) * Dj * Dj * data.Pc
        FS = FF + FM
        Peq = 0
        FF_tab.push(FS)
      } else {
        // Calcul de la pression equivalente avec les torseurs
        Peq = (16 * data.Mf) / (Math.PI * Math.pow(Dj, 3)) + (4 * data.Fa) / (Math.PI * Dj * Dj)
        // Calcul de l'effet de fond dans les autres situations
        FF = (Math.PI * Dj * Dj * (data.Pc + Peq)) / 4
        FS = ((FF + FM) * datas.boulon.Ec_boul) / data.Eh_boul
        FF_tab.push(FS)
      }

      // calcul de l'effort de serrage pour chaque catégorie

      let categorie_resultat = {Peq, FM, FF, FS}
      resultat = {...resultat, [categorie]: categorie_resultat}
    }
  }

  let FS0 = Math.max(...FF_tab)
  let FSmin = Math.max(FS0, Fj)

  // verification de la boulonnerie
  resultat = {...resultat, Sb, FS0}

  // récupération des coeffcients
  let coefficient_asme = coef(datas.bride.A, B, G1, G0, h, Ep, datas.bride.Type_bride)

  // variables pour le calcul des contraintes
  let Pc,
    Sa,
    Sa_assise,
    Fa,
    Mf,
    HD,
    HT,
    HD_ext,
    HT_ext,
    HG,
    MD,
    MT,
    MD_ext,
    MT_ext,
    MG,
    M0,
    M,
    k,
    SH,
    SH1,
    SH2,
    SR,
    ST,
    SMAX = 0,
    critere,
    ratio_SH,
    ratio_SR,
    ratio_ST,
    ratio_SMAX,
    Contrainte_joint,
    Contrainte_joint_assise,
    Ma

  let FSmax = FSmin

  while (error !== true) {
    for (let categorie in datas.chargement) {
      if (datas.chargement[categorie].check === true) {
        // vérification de la boulonnerie
        if (categorie === 'categorie_0') {
          Sa = resultat[categorie].FS / datas.chargement[categorie].Sboul
          Contrainte_joint = (resultat[categorie].FS - resultat[categorie].FF) / (Math.PI * Dj * b)
        } else if (categorie !== 'categorie_EH') {
          Sa =
            (FSmax * (datas.chargement[categorie].Eh_boul / datas.boulon.Ec_boul)) /
            Math.min(2 * datas.chargement[categorie].Sboul, (2 / 3) * datas.chargement[categorie].Sy_boul)
          Contrainte_joint = (FSmax - resultat.categorie_0.FF) / (Math.PI * Dj * b)
        } else {
          Sa = FSmax / ((2 / 3) * datas.chargement[categorie].Sy_boul)
          Contrainte_joint = (FSmax - resultat.categorie_0.FF) / (Math.PI * Dj * b)
        }

        // calcul de Sa en situation d'assise
        Sa_assise = FSmax / Math.min(2 * datas.boulon.Sc_boul, (2 / 3) * datas.boulon.Syc_boul)

        Contrainte_joint_assise = FSmax / (Math.PI * Dj * b)
        resultat = {...resultat, Sa_assise, Contrainte_joint_assise}
        if (Sb < Sa || Sb < Sa_assise) error = true

        //vérification de la non dégradation du joint

        if (Contrainte_joint > datas.joint.Pmax || Contrainte_joint_assise > datas.joint.Pmax) error = true

        // calcul du moment Ma en situation d'assise

        Ma = FSmax * hg

        if (error === false) {
          Pc = datas.chargement[categorie].Pc
          Fa = datas.chargement[categorie].Fa
          Mf = datas.chargement[categorie].Mf
          HD = (Math.PI * B * B * Pc) / 4
          HT = (Math.PI * (Dj * Dj - B * B) * Pc) / 4

          if (categorie !== 'categorie_0') {
            HD_ext = (4 * Mf * B * B) / Math.pow(Dj, 3) + (Fa * B * B) / (Dj * Dj)

            HT_ext = (4 * Mf * (Dj * Dj - B * B)) / Math.pow(Dj, 3) + (Fa * (Dj * Dj - B * B)) / (Dj * Dj)
            HG = (FSmax * datas.chargement[categorie].Eh_boul) / datas.boulon.Ec_boul - (HD + HD_ext) - (HT + HT_ext)
          } else {
            HD_ext = 0
            HT_ext = 0
            HG = resultat[categorie].FS - (HD + HD_ext) - (HT + HT_ext)
          }

          MD = HD * hd
          MT = HT * ht
          MD_ext = HD_ext * hd
          MT_ext = HT_ext * ht
          MG = HG * hg
          M0 = MD + MD_ext + MT + MT_ext + MG

          // pour la situation de calcul, M est le moment sous l'effet de la pression de calcul seule

          M = categorie === 'categorie_0' ? C0 * M0 : Math.max(C0 * Ma, C0 * M0)

          // calcul des contraintes
          if (datas.bride.Type_bride === 'plate') {
            SH = 0
            SH1 = 0
            SH2 = 0
            SR = 0
            ST = (coefficient_asme.Y * M) / (B * Ep * Ep)
          } else {
            SH1 = M / (coefficient_asme.L * G1 * G1 * coefficient_asme.B1) + (Pc * B) / (4 * G0)
            SH2 =
              (coefficient_asme.lambda * M) / (coefficient_asme.L * G1 * G1 * coefficient_asme.B1) + (Pc * B) / (4 * G0)
            SH = Math.max(SH1, SH2)
            SR = (((4 / 3) * Ep * coefficient_asme.e + 1) * M) / (coefficient_asme.L * Ep * Ep * B)
            ST = (coefficient_asme.Y * M) / (B * Ep * Ep) - coefficient_asme.Z * SR
          }

          // vérification des critères

          switch (categorie) {
            case 'categorie_0':
              k = 1
              critere = datas.chargement[categorie].Sbride
              SMAX = categorie === 'categorie_0' ? 0 : Math.max((SH + ST) / 2, (SH + SR) / 2)
              ratio_SH = SH / (1.5 * critere)
              ratio_SR = SR / critere
              ratio_ST = ST / critere
              ratio_SMAX = SMAX / critere

              if (ratio_SH > 1 || ratio_SR > 1 || ratio_ST > 1 || ratio_SMAX > 1) {
                error = true
              }
              break
            case 'categorie_2':
              critere = 1.5 * datas.chargement[categorie].Sbride
              ratio_SH = SH / critere
              ratio_SR = SR / critere
              ratio_ST = ST / critere

              if (ratio_SH > 1 || ratio_SR > 1 || ratio_ST > 1) {
                error = true
              }
              break
            case 'categorie_3':
              critere = 1.8 * datas.chargement[categorie].Sbride
              ratio_SH = SH / critere
              ratio_SR = SR / critere
              ratio_ST = ST / critere
              if (ratio_SH > 1 || ratio_SR > 1 || ratio_ST > 1) {
                error = true
              }
              break
            case 'categorie_4':
              critere = 2.4 * datas.chargement[categorie].Sbride
              ratio_SH = SH / critere
              ratio_SR = SR / critere
              ratio_ST = ST / critere
              if (ratio_SH > 1 || ratio_SR > 1 || ratio_ST > 1) {
                error = true
              }
              break
            case 'categorie_EH':
              critere = datas.chargement[categorie].Sybride
              ratio_SH = SH / (1.35 * critere)
              ratio_SR = SR / (0.9 * critere)
              ratio_ST = ST / (0.9 * critere)
              if (SH > 1 || SR > 1 || ST > 1) {
                error = true
              }
              break
          }

          console.log('hg :', resultat['categorie_0'].HG)
          resultat = {...resultat, Ma}

          resultat[categorie] = {
            ...resultat[categorie],
            Sa,
            Contrainte_joint,
            HD,
            HD_ext,
            HT,
            HT_ext,
            HG,
            MD,
            MD_ext,
            MT,
            MT_ext,
            MG,
            M0,
            M,
            SH,
            SR,
            ST,
            SMAX,
            critere,
            ratio_SH,
            ratio_SR,
            ratio_ST,
            ratio_SMAX
          }
        }
      }
    }

    if (error === false) {
      FSmax += 1
    }
    console.log(FSmax)

    let Couple = calcul_couple(
      FSmax,
      FSmin,
      Dn,
      datas.boulon.Pas,
      nb,
      datas.boulon.Incertitude,
      datas.boulon.Dpe,
      datas.bride.Dtp,
      datas.boulon.Coef_frottement
    )

    resultat['couple'] = {Couple, FSmax, FSmin}

    resultat = {...resultat, Ma}
  }
  console.log(coefficient_asme)
  console.log(resultat)
  return resultat
}
