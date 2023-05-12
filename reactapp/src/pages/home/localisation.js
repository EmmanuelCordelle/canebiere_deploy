import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Layout, Select, Input, Button, Form, Row, Divider} from 'antd'
import {cnpeList, trancheList, bigrammeList, systElemList} from '../../data/repere_fonctionnel'
import 'antd/dist/antd.min.css'

const Content = Layout

function Localisation(props) {
  const [formData, setFormData] = useState({})
  const [buttonStatus, setButtonStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const recoverDatas = async () => {
      const storageData = JSON.parse(sessionStorage.getItem('donnee'))
      if (storageData) {
        setButtonStatus(!buttonStatus)
        setFormData(storageData.localisation)
        console.log(storageData.localisation.Numero)
        props.changeMenuStatus()
        props.addData(storageData.localisation)
        setLoading(true)
      } else {
        setLoading(true)
      }
    }
    recoverDatas()
  }, [])

  var cnpeDisplay = cnpeList.map((e) => (
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
    console.log(buttonStatus)
    if (!buttonStatus) {
      try {
        const values = await form.validateFields()
        setButtonStatus(!buttonStatus)
        props.addData(formData)
        let datas = {localisation: formData}
        sessionStorage.setItem('donnee', JSON.stringify(datas))
      } catch (errorInfo) {
        console.log('Failed:', errorInfo)
      }
    } else {
      setButtonStatus(!buttonStatus)
    }
    props.changeMenuStatus()
  }

  if (loading === true) {
    return (
      <Layout>
        <Content
          style={{
            padding: 24,
            marginTop: '2%'
          }}>
          <Divider orientation='center'>Localisation de l'assemblage</Divider>
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
            <Form.Item name={'site'} rules={[{required: true, message: 'selectionner le CNPE'}]}>
              <Select
                placeholder='Site'
                style={{
                  width: 120,
                  margin: 10
                }}
                disabled={buttonStatus}
                onSelect={(e) => setFormData({...formData, Cnpe: e})}>
                {cnpeDisplay}
              </Select>
            </Form.Item>

            <Form.Item
              name={'tranche'}
              rules={[
                {
                  required: true,
                  message: 'selectionner le numéro de tranche'
                }
              ]}>
              <Select
                placeholder='Tranche'
                style={{
                  width: 120,
                  margin: 10
                }}
                disabled={buttonStatus}
                onSelect={(e) => setFormData({...formData, Tranche: e})}>
                {trancheDisplay}
              </Select>
            </Form.Item>

            <Form.Item
              name={'systeme'}
              rules={[
                {
                  required: true,
                  message: 'selectionner le système élémentaire'
                }
              ]}>
              <Select
                placeholder='systeme'
                style={{
                  width: 120,
                  margin: 10
                }}
                disabled={buttonStatus}
                onSelect={(e) => setFormData({...formData, Systeme: e})}>
                {systemeDisplay}
              </Select>
            </Form.Item>
            <Form.Item
              name={'repere'}
              rules={[
                {required: true, message: 'entrer 3 chiffres'},
                {pattern: /^(?:\d*)$/, message: 'entrer des entiers'},
                {validator:(_,value)=>value.length<3?Promise.reject('entrer 3 chiffres'):Promise.resolve()}
                //{min: 3, message: 'entrer 3 chiffres'}
              ]}>
              <Input
                placeholder='000'
                maxLength={3}
                onChange={(e) => {
                  setFormData({...formData, Numero: e.target.value})
                }}
                value={formData.Numero}
                disabled={buttonStatus}
                style={{width: 120, margin: 10}}
              />
            </Form.Item>

            <Form.Item name={'bigramme'} rules={[{required: true, message: 'selectionner le bigramme'}]}>
              {/* Liste des bigrammes */}
              <Select
                placeholder='Bigramme'
                style={{
                  width: 120,
                  margin: 10
                }}
                disabled={buttonStatus}
                onSelect={(e) => setFormData({...formData, Bigramme: e})}>
                {bigrammeDisplay}
              </Select>
            </Form.Item>
          </Form>

          <Row justify='space-around'>
            <Button type='primary' onClick={() => handleClick()} style={{marginTop: 15}}>
              {buttonStatus ? 'Modifier' : 'Valider'}
            </Button>
          </Row>
        </Content>
      </Layout>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeMenuStatus: function () {
      dispatch({type: 'localisation'})
    },
    addData: function (data) {
      dispatch({type: 'add_localisation', data: data})
    }
  }
}

function mapStateToProps(state) {
  return {menuStatusDisplay: state.menuStatus}
}

export default connect(mapStateToProps, mapDispatchToProps)(Localisation)
