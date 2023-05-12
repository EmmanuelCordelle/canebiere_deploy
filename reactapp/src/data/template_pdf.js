import React from 'react'

import {Layout, Table, Button} from 'antd'

// fonction d'arrondie à 2 chiffres après la virgule
const Round10 = function (number) {
  return Math.round(number * 100) / 100
}

const style = {
  Table: {
    marginTop: '2%'
  },
  Th: {
    FontSize: 12
  },
  Td: {
    FontSize: 12
  }
}

function Tab_Resultat_PDF(props) {
  const result = props.result

  const Column_defaut = [
    {title: 'label', dataIndex: 'label', key: 'label'},
    {title: 'valeur', dataIndex: 'valeur', key: 'valeur'}
  ]

  //tableau du couple de serrage

  const result_couple = [
    {key: 'Couple', label: 'Couple de serrage (N.m)', valeur: result.Couple.Couple},
    {key: 'FSmax', label: 'Effort max (N)', valeur: result.Couple.FSmax},
    {key: 'FSmin', label: 'Effort min (N)', valeur: result.Couple.FSmin}
  ]

  let table_couple = result_couple.map((item, k) => (
    <tr key={k} style={style.Td}>
      <td>{item.label}</td>
      <td>{item.valeur}</td>
    </tr>
  ))

  //tableau des paramètres du joint

  const result_joint = [
    {key: 'Dje', label: 'Dje (mm)', valeur: result.joint.Dje},
    {key: 'Dji', label: 'Dji (mm)', valeur: result.joint.Dji},
    {key: 'b0', label: 'b0 (mm)', valeur: result.joint.b0},
    {key: 'b', label: 'b (mm)', valeur: result.joint.b},
    {key: 'Dj', label: 'Dj (mm)', valeur: result.joint.Dj},
    {key: 'Fj', label: 'Fj (N)', valeur: result.joint.Fj}
  ]

  //initialisation des lignes du tableau des efforts

  const Column_tab_categorie = [{title: 'label', dataIndex: 'label', key: 'label'}]
  const Result_effort = [
    {key: 'Peq', label: 'Peq (MPa)'},
    {key: 'FF', label: 'FF (N)'},
    {key: 'FM', label: 'FM (N)'},
    {key: 'FS', label: 'FS (N)'}
  ]

  //tableau des bras de levier

  const Result_bras_levier = [
    {key: 'hd', label: 'hd (mm)', valeur: Round10(result.bras_levier.hd)},
    {key: 'ht', label: 'ht (mm)', valeur: Round10(result.bras_levier.ht)},
    {key: 'hg', label: 'hg (mm)', valeur: Round10(result.bras_levier.hg)},
    {key: 'C0', label: 'C0', valeur: Round10(result.bras_levier.C0)}
  ]

  //initialisation des lignes du tableau des moments

  const Result_moment = [
    {key: 'HD', label: 'HD (N)'},
    {key: 'HD_ext', label: "HD' (N)"},
    {key: 'HT', label: 'HT (N)'},
    {key: 'HT_ext', label: "HT' (N)"},
    {key: 'HG', label: 'HG (N)'},
    {key: 'MD', label: 'MD (N.mm)'},
    {key: 'MD_ext', label: "MD' (N.mm)"},
    {key: 'MT', label: 'MT (N.mm)'},
    {key: 'MT_ext', label: "MT' (N.mm)"},
    {key: 'MG', label: 'MG (N.mm)'},
    {key: 'M0', label: 'M0 (N.mm)'}
  ]

  // initialisation des colonnes du tableau des contraintes
  const Column_tab_contrainte = [
    {title: 'label', dataIndex: 'label', key: 'label'},
    {title: 'valeur (MPa)', dataIndex: 'contrainte', key: 'contrainte'},
    {title: 'critere', dataIndex: 'critere', key: 'critere'},
    {title: 'valeur critere (MPa)', dataIndex: 'critereValue', key: 'critereValue'},
    {title: 'ratio', dataIndex: 'ratio', key: 'ratio'}
  ]

  //initialisation des lignes du tableau des contraintes
  const Result_contrainte = {
    categorie_0: [
      {
        key: 'SH',
        label: 'SH (MPa)',
        critere: '1.5 S (MPa)',
        critereValue: 1.5 * props.datas.chargement.categorie_0.Sbride
      },
      {
        key: 'SR',
        label: 'SR (MPa)',
        critere: 'S (MPa)',
        critereValue: props.datas.chargement.categorie_0.Sbride
      },
      {
        key: 'ST',
        label: 'ST (MPa)',
        critere: 'S (MPa)',
        critereValue: props.datas.chargement.categorie_0.Sbride
      },
      {
        key: 'SMAX',
        label: 'Smax (MPa)',
        critere: 'S (MPa)',
        critereValue: props.datas.chargement.categorie_0.Sbride
      }
    ],
    categorie_2: [
      {
        key: 'SH',
        label: 'SH (MPa)',
        critere: '1.5 S (MPa)',
        critereValue: 1.5 * props.datas.chargement.categorie_2.Sbride
      },
      {
        key: 'SR',
        label: 'SR (MPa)',
        critere: '1.5 S (MPa)',
        critereValue: 1.5 * props.datas.chargement.categorie_2.Sbride,
        ratio: 'ratio_SR'
      },
      {
        key: 'ST',
        label: 'ST (MPa)',
        critere: '1.5 S (MPa)',
        critereValue: 1.5 * props.datas.chargement.categorie_2.Sbride
      }
    ],
    categorie_3: [
      {
        key: 'SH',
        label: 'SH (MPa)',
        critere: '1.8 S (MPa)',
        critereValue: 1.8 * props.datas.chargement.categorie_3.Sbride
      },
      {
        key: 'SR',
        label: 'SR (MPa)',
        critere: '1.8 S (MPa)',
        critereValue: 1.8 * props.datas.chargement.categorie_3.Sbride
      },
      {
        key: 'ST',
        label: 'ST (MPa)',
        critere: '1.8 S (MPa)',
        critereValue: 1.8 * props.datas.chargement.categorie_3.Sbride
      }
    ],
    categorie_4: [
      {
        key: 'SH',
        label: 'SH (MPa)',
        critere: '2.4 S (MPa)',
        critereValue: 2.4 * props.datas.chargement.categorie_4.Sbride
      },
      {
        key: 'SR',
        label: 'SR (MPa)',
        critere: '2.4 S (MPa)',
        critereValue: 2.4 * props.datas.chargement.categorie_4.Sbride
      },
      {
        key: 'ST',
        label: 'ST (MPa)',
        critere: '2.4 S (MPa)',
        critereValue: 2.4 * props.datas.chargement.categorie_4.Sbride
      }
    ],
    categorie_EH: [
      {
        key: 'SH',
        label: 'SH (MPa)',
        critere: '1.35 Sy (MPa)',
        critereValue: 1.35 * props.datas.chargement.categorie_EH.Sybride
      },
      {
        key: 'SR',
        label: 'SR (MPa)',
        critere: '0.9 Sy (MPa)',
        critereValue: 0.9 * props.datas.chargement.categorie_EH.Sybride
      },
      {
        key: 'ST',
        label: 'ST (MPa)',
        critere: '0.9 Sy (MPa)',
        critereValue: 0.9 * props.datas.chargement.categorie_EH.Sybride
      }
    ]
  }

  const Tableau_contrainte = []

  // initialisation du tableau de la boulonnerie

  const Column_tab_boulon = [
    {title: '', dataIndex: 'label', key: 'label'},
    {title: 'assise', dataIndex: 'assise', key: 'assise'}
  ]

  const Result_boulon = [
    {key: 'Sa', label: 'Sa (mm²)', assise: Round10(result.Sa_assise)},
    {
      key: 'ratio',
      label: 'ratio',
      assise: Round10(result.Sa_assise / result.Sb)
    }
  ]

  // initialisation du tableau de la dégradation du joint

  const Result_contrainte_joint = [
    {
      key: 'Sjoint',
      label: 'Contrainte sur le joint Sjoint (MPa)',
      assise: Round10(result.Contrainte_joint_assise)
    },
    {
      key: 'ratio',
      label: 'ratio (Sjoint/Pmax)',
      assise: Round10(result.Contrainte_joint_assise / props.datas.joint.Pmax)
    }
  ]

  for (const categorie in props.datas.chargement) {
    if (props.datas.chargement[categorie].check === true) {
      Column_tab_categorie.push({
        title: [categorie],
        dataIndex: [categorie],
        key: [categorie]
      })

      Column_tab_boulon.push({
        title: [categorie],
        dataIndex: [categorie],
        key: [categorie]
      })

      Result_boulon[0][categorie] = Round10(result[categorie].Sa)
      Result_boulon[1][categorie] = Round10(result[categorie].Sa / result.Sb)

      Result_contrainte_joint[0][categorie] = Round10(result[categorie].Contrainte_joint)
      Result_contrainte_joint[1][categorie] = Round10(result[categorie].Contrainte_joint / props.datas.joint.Pmax)

      for (const effort of Result_effort) {
        effort[categorie] = Round10(result[categorie][effort.key])
      }
      for (const moment of Result_moment) {
        moment[categorie] = Round10(result[categorie][moment.key])
      }
      for (const contrainte of Result_contrainte[categorie]) {
        contrainte['contrainte'] = Round10(result[categorie][contrainte.key])
        contrainte['ratio'] = Round10(result[categorie][`ratio_` + contrainte.key])
      }

      Tableau_contrainte.push(
        <Table
          style={style.Table}
          pagination={false}
          bordered={true}
          dataSource={Result_contrainte[categorie]}
          columns={Column_tab_contrainte}
          title={() => 'Calcul des contraintes ' + categorie}
        />
      )
    }
  }

  return (
    <div id='tableaux_test'>
      <h2>Resultat</h2>
      <table>
        <thead>
          <tr>
            <th style={style.Th} colSpan={2}>
              Couple
            </th>
          </tr>
        </thead>
        <tbody>{table_couple}</tbody>
      </table>
    </div>

    // <Layout
    //   id='tableaux_resultats'
    //   style={{
    //     display: 'flex',

    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     //width: '100%',
    //     paddingTop: '2%'
    //   }}>
    //   <Table
    //     style={style.Table}
    //     pagination={false}
    //     bordered={true}
    //     dataSource={result_couple}
    //     title={() => 'Résultats'}
    //     columns={Column_defaut}
    //   />
    //   <Table
    //     style={style.Table}
    //     pagination={false}
    //     bordered={true}
    //     dataSource={result_joint}
    //     title={() => 'Paramètres du joint'}
    //     columns={Column_defaut}
    //   />

    //   <Table
    //     style={style.Table}
    //     pagination={false}
    //     bordered={true}
    //     dataSource={Result_effort}
    //     columns={Column_tab_categorie}
    //     footer={() => 'FSo (N) : ' + Round10(result.FS0)}
    //   />

    //   <Table
    //     style={style.Table}
    //     pagination={false}
    //     bordered={true}
    //     title={() => 'Bras de levier et facteur correctif'}
    //     dataSource={Result_bras_levier}
    //     columns={Column_defaut}
    //   />

    //   <Table
    //     style={style.Table}
    //     pagination={false}
    //     bordered={true}
    //     dataSource={Result_moment}
    //     columns={Column_tab_categorie}
    //     title={() => 'Calcul des moments'}
    //     footer={() => 'MA (N.mm) : ' + Round10(result.FS0)}
    //   />

    //   {Tableau_contrainte}

    //   <Table
    //     style={style.Table}
    //     pagination={false}
    //     bordered={true}
    //     dataSource={Result_boulon}
    //     columns={Column_tab_boulon}
    //     title={() => 'Vérification de la boulonnerie'}
    //   />

    //   <Table
    //     style={style.Table}
    //     pagination={false}
    //     bordered={true}
    //     dataSource={Result_contrainte_joint}
    //     columns={Column_tab_boulon}
    //     title={() => 'Vérification de la non dégradation du joint'}
    //   />
    // </Layout>
  )
}

export default Tab_Resultat_PDF
