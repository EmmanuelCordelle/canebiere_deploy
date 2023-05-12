import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import TabResultat from '../home/tableaux_resultats'
import {Layout} from 'antd'

function View(props) {
  const [etude, setEtude] = useState()
  const [isLoading, setIsloading] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    const getEtude = async function () {
      let dataEtude = await fetch('/etudeByID', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `id=${id}`
      })
      let dataEtudeParse = await dataEtude.json()

      setIsloading(true)
      setEtude(dataEtudeParse.etude[0])
    }
    getEtude()
  }, [])

  if (isLoading) {
    return (
      <Layout>
        <TabResultat result={etude.result} datas={etude.donnee} />
      </Layout>
    )
  }
}

export default View
