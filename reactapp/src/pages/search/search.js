import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Nav from '../nav'
import {Link, useNavigate, Navigate} from 'react-router-dom'

import {Layout, Select, Input, Button, Form, Row, Table} from 'antd'
import {cnpeList, trancheList, bigrammeList, systElemList} from '../../data/repere_fonctionnel'
import 'antd/dist/antd.min.css'

const Content = Layout

function Search(props) {
  const [formData, setFormData] = useState({})
  const [etudes, setEtudes] = useState([])
  const [result, setResult] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  useEffect(() => {
    const userStored = sessionStorage.getItem('user')
    if (userStored) {
      setUser(userStored)
    }
  }, [])

  const Column_result = [
    {title: 'Cnpe', dataIndex: 'Cnpe', key: 'Cnpe'},
    {title: 'Tranche', dataIndex: 'Tranche', key: 'Tranche'},
    {title: 'Systeme', dataIndex: 'Systeme', key: 'Systeme'},
    {title: 'Numero', dataIndex: 'Numero', key: 'Numero'},
    {title: 'Bigramme', dataIndex: 'Bigramme', key: 'Bigramme'},
    {title: 'Indice', dataIndex: 'Indice', key: 'Indice'},
    {
      title: '',
      dataIndex: 'voir',
      key: 'voir',
      render: (_, etudes) => (
        <Link to={`./view/${etudes._id}`} target={'_blank'}>
          Voir
        </Link>
      )
    },
    {
      title: 'Charger',
      dataIndex: 'charger',
      key: 'charger',
      render: (_, etudes) => (
        <Button type='primary' onClick={() => load(etudes._id)}>
          Charger
        </Button>
      )
    }
  ]
  const load = async (id) => {
    let dataEtude = await fetch('/etudeByID', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `id=${id}`
    })
    let dataEtudeParse = await dataEtude.json()
    let etude = dataEtudeParse.etude[0]

    // Ajout d'un comportement asynchrone le temps de charger les données dans la session
    const newpromise = Promise.resolve().then(sessionStorage.setItem('donnee', JSON.stringify(etude.donnee)))
    newpromise.then(() => {
      props.changeMenuStatus()
      props.addData(etude.donnee)
      props.addResult(etude.result)
      navigate('/')
    })
  }

  let cnpeDisplay = cnpeList.map((e) => (
    <Select.Option key={e} value={e}>
      {e}
    </Select.Option>
  ))
  var trancheDisplay = trancheList.map((e) => (
    <Select.Option key={e} value={e}>
      {e}
    </Select.Option>
  ))
  var bigrammeDisplay = bigrammeList.map((e) => (
    <Select.Option key={e} value={e}>
      {e}
    </Select.Option>
  ))
  var systemeDisplay = systElemList.map((e) => (
    <Select.Option key={e} value={e}>
      {e}
    </Select.Option>
  ))

  const handleClick = async () => {
    let values
    try {
      values = await form.validateFields()
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }

    let rawResponse = await fetch('/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    })
    let response = await rawResponse.json()
    if (response.result) {
      setResult(true)
      setEtudes(response.etudes)
    } else {
      setResult(false)
      setErrorMessage('pas de resultat')
    }
  }
  const mes_etudes = async () => {
    console.log(props)
    let rawResponse = await fetch('/mes_etudes', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `user=${props.token}`
    })
    let response = await rawResponse.json()

    if (response.result) {
      setResult(true)
      setEtudes(response.etudes)
    } else {
      setResult(false)
      setErrorMessage('pas de resultat')
    }
  }


  if (props.token !== undefined) {
    return (
      <Layout>
        <Nav selectedKey={['2']} />
        <Row justify='space-around'>
          <Button type='primary' onClick={() => mes_etudes()} style={{margin: 15}}>
            Voir mes études
          </Button>
        </Row>
        <h2>Rechercher une étude</h2>
        <Content
          style={{
            padding: 24,
            margin: 0,
            height: '100vh'
          }}>
          {/* Liste des cnpe */}
          <Form
            form={form}
            style={{display: 'flex', justifyContent: 'center'}}
            initialValues={{
              site: formData.Cnpe,
              tranche: formData.Tranche,
              systeme: formData.Systeme,
              repere: formData.Numero,
              bigramme: formData.Bigramme
            }}>
            <Form.Item name={'site'}>
              <Select
                placeholder='Site'
                style={{
                  width: 120,
                  margin: 10
                }}
                onSelect={(e) => setFormData({...formData, Cnpe: e})}>
                {cnpeDisplay}
              </Select>
            </Form.Item>

            <Form.Item name={'tranche'}>
              <Select
                placeholder='Tranche'
                style={{
                  width: 120,
                  margin: 10
                }}
                onSelect={(e) => setFormData({...formData, Tranche: e})}>
                {trancheDisplay}
              </Select>
            </Form.Item>

            <Form.Item name={'systeme'}>
              <Select
                placeholder='systeme'
                style={{
                  width: 120,
                  margin: 10
                }}
                onSelect={(e) => setFormData({...formData, Systeme: e})}>
                {systemeDisplay}
              </Select>
            </Form.Item>
            <Form.Item
              name={'repere'}
              rules={[
                {pattern: /^(?:\d*)$/, message: 'entrer des entiers'},
                {min: 3, message: 'entrer 3 chiffres'}
              ]}>
              <Input
                placeholder='000'
                minLength={3}
                maxLength={3}
                onChange={(e) => {
                  setFormData({...formData, Numero: e.target.value})
                }}
                value={formData.Numero}
                style={{width: 120, margin: 10}}
              />
            </Form.Item>

            <Form.Item name={'bigramme'}>
              {/* Liste des bigrammes */}
              <Select
                placeholder='Bigramme'
                style={{
                  width: 120,
                  margin: 10
                }}
                onSelect={(e) => setFormData({...formData, Bigramme: e})}>
                {bigrammeDisplay}
              </Select>
            </Form.Item>
          </Form>

          <Row justify='space-around'>
            <Button type='primary' onClick={() => handleClick()} style={{marginTop: 15}}>
              Rechercher
            </Button>
          </Row>

          {result ? (
            <Table
              pagination={false}
              bordered={true}
              dataSource={etudes}
              title={() => 'Resultats'}
              columns={Column_result}
            />
          ) : (
            errorMessage
          )}
        </Content>
      </Layout>
    )
  } else {
    return <Navigate to='/' />
  }
}
function mapDispatchToProps(dispatch) {
  return {
    changeMenuStatus: function () {
      dispatch({type: 'charger'})
    },
    addData: function (data) {
      dispatch({type: 'charger', data: data})
    },
    addResult: function (result) {
      dispatch({type: 'add_result', result: result})
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
