import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Layout, InputNumber, Input, Button, Form, Row, Divider, message} from 'antd'
import {calcul} from './function_calculation'

//import 'antd/dist/antd.min.css';

const styles = {
  input: {width: 100, float: 'left'},
  item: {},
  content: {
    paddingTop: '2%',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
const Content = Layout

function Joint(props) {
  const [formData, setFormData] = useState({})
  const [buttonStatus, setButtonStatus] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const recoverDatas = async () => {
      const storageData = JSON.parse(sessionStorage.getItem('donnee'))
      if (storageData.joint) {
        setButtonStatus(!buttonStatus)
        setFormData(storageData.joint)
        props.changeMenuStatus('finish')
        props.addData(storageData.joint)
        setLoading(true)
      } else {
        setLoading(true)
      }
    }
    recoverDatas()
  }, [])

  const handleClick = async () => {
    try {
      const values = await form.validateFields()
      props.addData(formData)
      if (!buttonStatus) {
        props.changeMenuStatus('finish')
        setButtonStatus(!buttonStatus)
        let datas = JSON.parse(sessionStorage.getItem('donnee'))
        sessionStorage.setItem('donnee', JSON.stringify({...datas, joint: formData}))
      } else {
        props.changeMenuStatus('finish')
        setButtonStatus(!buttonStatus)
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }
  const calculClick=async()=>{
    console.log(props.menuStatusDisplay)
        if(!props.menuStatusDisplay.localisationStatus
      &&!props.menuStatusDisplay.boulonnerieStatus
      &&!props.menuStatusDisplay.geometrieStatus
      &&!props.menuStatusDisplay.chargementStatus
      &&!props.menuStatusDisplay.jointStatus
      &&!props.menuStatusDisplay.finishStatus){

        let resultat = await calcul(props.datas)
        props.addResult({...resultat})
        props.changeMenuStatus('calcul')

    }else{

      messageApi.open({type:'error', content:"valider l'ensemble des données"})
      

    }
    
  }

  if (loading) {
    return (
      <Content style={styles.content}>
        {contextHolder}
        <Divider orientation='center'>Paramètres du joint</Divider>
        <Form
          form={form}
          labelCol={{span: 14}}
          layout='horizontal'
          labelWrap
          wrapperCol={{span: 4}}
          initialValues={{
            Type: formData.Type,
            Dje: parseFloat(formData.Dje),
            Dji: parseFloat(formData.Dji),
            m: parseFloat(formData.m),
            Y: parseFloat(formData.Y),
            Pmax: parseFloat(formData.Pmax)
          }}
          style={{alignItems: 'end'}}>
          <Form.Item name={'Type'} label='Designation du joint' rules={[{required: true, message: 'Type:'}]}>
            <Input
              placeholder='NGRAS, PGAC...'
              disabled={buttonStatus}
              style={{width: 300}}
              onChange={(e) => setFormData({...formData, Type: e.target.value})}
              value={formData.Type}
            />
          </Form.Item>

          <Form.Item
            name={'Dje'}
            style={styles.item}
            label='Diamètre extérieur Dje (mm): '
            rules={[{required: true, message: 'entrer une valeur'}]}>
            <InputNumber
              disabled={buttonStatus}
              placeholder='Dje (mm)'
              style={styles.input}
              onChange={(e) => setFormData({...formData, Dje: e})}
              value={formData.Dje}
            />
          </Form.Item>

          <Form.Item
            name={'Dji'}
            style={styles.item}
            label='Diamètre intérieur Dji (mm): '
            rules={[{required: true, message: 'entrer une valeur'}]}>
            <InputNumber
              disabled={buttonStatus}
              placeholder='Dji (mm)'
              style={styles.input}
              onChange={(e) => setFormData({...formData, Dji: e})}
              value={formData.Dji}
            />
          </Form.Item>

          <Form.Item
            name={'m'}
            style={styles.item}
            label='Coefficient de serrage m: '
            rules={[{required: true, message: 'entrer une valeur'}]}>
            <InputNumber
              disabled={buttonStatus}
              placeholder='m'
              style={styles.input}
              onChange={(e) => setFormData({...formData, m: e})}
              value={formData.m}
            />
          </Form.Item>

          <Form.Item
            name={'Y'}
            style={styles.item}
            label='Pression assise (MPa): '
            rules={[{required: true, message: 'entrer une valeur'}]}>
            <InputNumber
              disabled={buttonStatus}
              placeholder='Y (MPa)'
              style={styles.input}
              onChange={(e) => setFormData({...formData, Y: e})}
              value={formData.Y}
            />
          </Form.Item>

          <Form.Item
            name={'Pmax'}
            style={styles.item}
            label='Pression max admissible (MPa): '
            rules={[{required: true, message: 'entrer une valeur'}]}>
            <InputNumber
              disabled={buttonStatus}
              placeholder='Pmax (MPa)'
              style={styles.input}
              onChange={(e) => setFormData({...formData, Pmax: e})}
              value={formData.Pmax}
            />
          </Form.Item>
        </Form>

        <Row justify='space-around'>
          <Button type='primary' onClick={() => handleClick()} style={{marginTop: 15}}>
            {buttonStatus ? 'Modifier' : 'Valider'}
          </Button>
        </Row>
        
        <Divider></Divider>
        <Row justify='space-around'>
          <Button type='primary' onClick={() => calculClick()} style={{marginTop: 15}}>
            Lancer le calcul
           
          </Button>
        </Row>
      </Content>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeMenuStatus: function (data) {
      dispatch({type: data})
    },
    addData: function (data) {
      dispatch({type: 'add_joint', data: data})
    },
    addResult: function (result) {
      dispatch({type: 'add_result', result: result})
    }
  }
}

function mapStateToProps(state) {
  return {menuStatusDisplay: state.menuStatus, datas: state.data}
}

export default connect(mapStateToProps, mapDispatchToProps)(Joint)
