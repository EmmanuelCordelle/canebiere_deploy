import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Layout, Select, Input, InputNumber, Button, Form, Row, Divider} from 'antd'
import {bddFiletage} from '../../data/boulon_data'
import 'antd/dist/antd.min.css'

const Content = Layout

//const listFiletage=bddFiletage.map(e=>e.filetage)

function Boulon(props) {
  const [Filetage, setFiletage] = useState(null)
  const [formData, setFormData] = useState({})
  const [buttonStatus, setButtonStatus] = useState(false)
  const [loading, setLoading] = useState(false)

  var FiletageDisplay = bddFiletage.map((e, index) => (
    <Select.Option key={index} value={e.filetage}>
      {e.filetage}
    </Select.Option>
  ))

  const [form] = Form.useForm()

  useEffect(() => {
    if (Filetage && Filetage !== 'Autre') {
      let index = bddFiletage.findIndex((e) => e.filetage === Filetage)
      setFormData({
        ...formData,
        ['Filetage']: Filetage,
        ['Dn']: bddFiletage[index].dn,
        ['Pas']: bddFiletage[index].pas,
        ['Dpe']: bddFiletage[index].dpe
      })
    }
  }, [Filetage])

  useEffect(() => {
    const recoverDatas = async () => {
      const storageData = JSON.parse(sessionStorage.getItem('donnee'))
      if (storageData.boulon) {
        setButtonStatus(!buttonStatus)
        setFormData(storageData.boulon)
        props.changeMenuStatus()
        props.addData(storageData.boulon)
        setLoading(true)
      } else {
        setLoading(true)
      }
    }
    recoverDatas()
  }, [])

  const handleClick = async () => {
    if (!buttonStatus) {
      try {
        const values = await form.validateFields()
        console.log('Success:', formData)
        setButtonStatus(!buttonStatus)
        props.changeMenuStatus()
        props.addData(formData)
        let datas = JSON.parse(sessionStorage.getItem('donnee'))
        sessionStorage.setItem('donnee', JSON.stringify({...datas, boulon: formData}))
      } catch (errorInfo) {
        console.log('Failed:', errorInfo)
      }
    } else {
      setButtonStatus(!buttonStatus)
    }
  }

  if (loading) {
    return (
      <Content
        style={{
          padding: 24,
          margin: 0
        }}>
        <Divider orientation='center'>Géométrie de la boulonnerie</Divider>
        <Layout
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
          <Form
            form={form}
            initialValues={{
              incertitude: parseFloat(formData.Incertitude),
              coef_frottement: parseFloat(formData.Coef_frottement),
              Filetage: formData.Filetage,
              Dn: parseFloat(formData.Dn),
              Pas: parseFloat(formData.Pas),
              Dpe: parseFloat(formData.Dpe),
              Nombre: parseFloat(formData.Nombre),
              Materiau: formData.Materiau,
              Nombre: parseFloat(formData.Nombre),
              Ec_boul: parseFloat(formData.Ec_boul),
              Syc_boul: parseFloat(formData.Syc_boul),
              Sc_boul: parseFloat(formData.Sc_boul)
            }}
            labelCol={{span: 18}}
            labelAlign='left'
            labelWrap
            wrapperCol={{span: 4}}
            style={{alignItems: 'end'}}>
            <Form.Item
              name={'incertitude'}
              label='incertitude outil de serrage (%): '
              rules={[
                {
                  required: true,
                  message: 'entrer une valeur'
                }
              ]}>
              <InputNumber
                placeholder='%'
                style={styles.input}
                disabled={buttonStatus}
                onChange={(e) => setFormData({...formData, ['Incertitude']: e})}
                value={formData['Incertitude']}
              />
            </Form.Item>
            <Form.Item
              name={'coef_frottement'}
              label='coefficient de frottement: '
              rules={[
                {
                  required: true,
                  message: 'entrer une valeur'
                }
              ]}>
              <InputNumber
                placeholder=''
                style={styles.input}
                disabled={buttonStatus}
                onChange={(e) => setFormData({...formData, ['Coef_frottement']: e})}
                value={formData['Coef_frottement']}
              />
            </Form.Item>
            <Form.Item name={'Filetage'} rules={[{required: true, message: 'Filetage:'}]}>
              <Select
                placeholder='Filetage'
                style={{
                  width: 120,
                  margin: 10
                }}
                disabled={buttonStatus}
                onSelect={(e) => {
                  setFiletage(e)
                  setFormData({...formData, ['Filetage']: e})
                }}>
                {FiletageDisplay}
              </Select>
            </Form.Item>

            <Form.Item
              name={'Dn'}
              label='Diamètre nominal (mm): '
              rules={[
                {
                  required: Filetage && Filetage !== 'Autre' ? false : true,
                  message: 'entrer une valeur'
                }
              ]}>
              <InputNumber
                disabled={Filetage !== (null || 'Autre') || buttonStatus ? true : false}
                placeholder={Filetage !== (null || 'Autre') ? formData.Dn : 'Dn'}
                style={styles.input}
                defaultValue={formData['Dn']}
                onChange={(e) => setFormData({...formData, ['Dn']: e})}
                value={formData['Dn']}
              />
            </Form.Item>

            <Form.Item
              name={'Pas'}
              label='Pas (mm): '
              rules={[
                {
                  required: Filetage && Filetage !== 'Autre' ? false : true,
                  message: 'entrer une valeur'
                }
              ]}>
              <InputNumber
                disabled={Filetage !== (null || 'Autre') || buttonStatus ? true : false}
                placeholder={Filetage !== (null || 'Autre') ? formData.Pas : 'Pas'}
                style={styles.input}
                onChange={(e) => setFormData({...formData, ['Pas']: e})}
                value={formData['Pas']}
              />
            </Form.Item>
            <Form.Item
              name={'Dpe'}
              label="Diamètre du plat d'écrou (mm): "
              rules={[
                {
                  required: Filetage && Filetage !== 'Autre' ? false : true,
                  message: 'entrer une valeur'
                }
              ]}>
              <InputNumber
                disabled={Filetage !== (null || 'Autre') || buttonStatus ? true : false}
                placeholder={Filetage !== (null || 'Autre') ? formData.Dpe : 'Dpe'}
                style={styles.input}
                onChange={(e) => setFormData({...formData, ['Dpe']: e})}
                value={formData['Dpe']}
              />
            </Form.Item>

            <Form.Item
              name={'Nombre'}
              label='Nombre de boulons: '
              rules={[{required: true, message: 'entrer une valeur'}]}>
              <InputNumber
                placeholder='n'
                style={styles.input}
                disabled={buttonStatus}
                onChange={(e) => setFormData({...formData, ['Nombre']: e})}
                value={formData['Nombre']}
              />
            </Form.Item>
            <Form.Item name={'Materiau'} label='Materiau: ' rules={[{required: true, message: 'entrer une valeur'}]}>
              <Input
                style={styles.input}
                disabled={buttonStatus}
                onChange={(e) => setFormData({...formData, ['Materiau']: e.target.value})}
                value={formData['Materiau']}
              />
            </Form.Item>
            <Form.Item
              name={'Ec_boul'}
              label="Module d'Young à froid: "
              placeholder='Ec_boul'
              rules={[{required: true, message: 'entrer une valeur'}]}>
              <InputNumber
                style={styles.input}
                disabled={buttonStatus}
                onChange={(e) => setFormData({...formData, ['Ec_boul']: e})}
                value={formData['Ec_boul']}
              />
            </Form.Item>
            <Form.Item
              name={'Syc_boul'}
              label='Limite élastique à froid: '
              placeholder='Syc_boul'
              rules={[{required: true, message: 'entrer une valeur'}]}>
              <InputNumber
                style={styles.input}
                disabled={buttonStatus}
                onChange={(e) => setFormData({...formData, ['Syc_boul']: e})}
                value={formData['Syc_boul']}
              />
            </Form.Item>
            <Form.Item
              name={'Sc_boul'}
              label='Contrainte admissible à froid: '
              placeholder='Sc_boul'
              rules={[{required: true, message: 'entrer une valeur'}]}>
              <InputNumber
                style={styles.input}
                disabled={buttonStatus}
                onChange={(e) => setFormData({...formData, ['Sc_boul']: e})}
                value={formData['Sc_boul']}
              />
            </Form.Item>
          </Form>
        </Layout>
        <Row justify='space-around'>
          <Button type='primary' onClick={() => handleClick()} style={{marginTop: 15}}>
            {buttonStatus ? 'Modifier' : 'Valider'}
          </Button>
        </Row>
      </Content>
    )
  }
}

const styles = {
  input: {width: 100, margin: 10}
}

function mapDispatchToProps(dispatch) {
  return {
    changeMenuStatus: function () {
      dispatch({type: 'boulon'})
    },
    addData: function (data) {
      dispatch({type: 'add_boulonnerie', data: data})
    }
  }
}

function mapStateToProps(state) {
  return {menuStatusDisplay: state.menuStatus}
}

export default connect(mapStateToProps, mapDispatchToProps)(Boulon)
