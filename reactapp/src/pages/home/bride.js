import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Layout, InputNumber, Button, Form, Row, Image, Radio, Divider} from 'antd'
import 'antd/dist/antd.min.css'

const Content = Layout

function Bride(props) {
  const [formData, setFormData] = useState({Type_bride: 'collerette', Type_face: 'plate'})
  const [buttonStatus, setButtonStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const recoverDatas = async () => {
      const storageData = JSON.parse(sessionStorage.getItem('donnee'))
      if (storageData.bride) {
        setButtonStatus(!buttonStatus)
        setFormData(storageData.bride)
        props.changeMenuStatus()
        props.addData(storageData.bride)
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
        setButtonStatus(!buttonStatus)
        props.changeMenuStatus()
        props.addData(formData)
        let datas = JSON.parse(sessionStorage.getItem('donnee'))
        sessionStorage.setItem('donnee', JSON.stringify({...datas, bride: formData}))
      } catch (errorInfo) {
        console.log('Failed:', errorInfo)
      }
    } else {
      setButtonStatus(!buttonStatus)
    }
  }

  const inputProps = [
    {
      name: 'A',
      label: 'Diamètre extérieur (A) (mm): ',
      placeholder: 'A',
      plate: true
    },
    {
      name: 'B',
      label: 'Diamètre intérieur (B) (mm): ',
      placeholder: 'B',
      plate: true
    },
    {
      name: 'C',
      label: 'Diamètre du cercle de percage de la boulonnerie (C) (mm): ',
      placeholder: 'C',
      plate: true
    },
    {
      name: 'Dtp',
      label: 'Diamètre des trous de passage de la boulonnerie (mm): ',
      placeholder: 'Dtp',
      plate: true
    },
    {
      name: 'G0',
      label: 'Epaisseur de raccordement collerette / tuyauterie (g0) (mm): ',
      placeholder: 'g0',
      plate: false
    },
    {
      name: 'G1',
      label: 'Epaisseur de raccordement collerette / plateau (g1) (mm): ',
      placeholder: 'g1',
      plate: false
    },
    {
      name: 'Ep',
      label: 'Epaisseur du plateau (mm): ',
      placeholder: 'Ep',
      plate: true
    },
    {
      name: 'h',
      label: 'Hauteur de la collerette (h) (mm): ',
      placeholder: 'h',
      plate: false
    }
  ]

  if (loading === true) {
    return (
      <Content
        style={{
          padding: 24,
          margin: 0,
          marginTop: '1%'
        }}>
        <Divider orientation='center'>Géométrie de la bride</Divider>
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
              Type_bride: formData.Type_bride,
              Type_face: formData.Type_face
            }}
            labelCol={{span: 18}}
            labelAlign='left'
            labelWrap
            wrapperCol={{span: 4}}
            style={{alignItems: 'end'}}>
            <Form.Item name={'Type_bride'} label='Type de bride: '>
              <Radio.Group
                disabled={buttonStatus}
                style={{width: 150, textAlign: 'left'}}
                onChange={(e) => setFormData({...formData, Type_bride: e.target.value})}
                defaultValue='collerette'
                value={formData['Type_bride']}>
                <Radio checked={true} value={'plate'}>
                  Plate
                </Radio>
                <Radio value={'collerette'}>A collerette</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name={'Type_face'} label='Face des brides: '>
              <Radio.Group
                disabled={buttonStatus}
                style={{width: 150, textAlign: 'left'}}
                onChange={(e) => setFormData({...formData, Type_face: e.target.value})}
                defaultValue='plate'
                value={formData['Type_face']}>
                <Radio checked={true} value={'plate'}>
                  Face plate
                </Radio>
                <Radio value={'surelevee'}>Face surélevée</Radio>
              </Radio.Group>
            </Form.Item>

            {inputProps.map((prop, e) =>
              formData.Type_bride === 'collerette' ? (
                <Form.Item
                  key={e}
                  name={prop.name}
                  label={prop.label}
                  initialValue={parseFloat(formData[prop.name])}
                  rules={[{required: true, message: 'entrer une valeur'}]}>
                  <InputNumber
                    key={e}
                    placeholder={prop.placeholder}
                    style={styles.input}
                    disabled={buttonStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [prop.name]: e
                      })
                    }
                    value={formData[prop.name]}
                  />
                </Form.Item>
              ) : (
                prop.plate && (
                  <Form.Item
                    key={e}
                    initialValue={parseFloat(formData[prop.name])}
                    name={prop.name}
                    label={prop.label}
                    rules={[{required: true, message: 'entrer une valeur'}]}>
                    <InputNumber
                      key={e}
                      placeholder={prop.placeholder}
                      style={styles.input}
                      disabled={buttonStatus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [prop.name]: e
                        })
                      }
                      value={formData[prop.name]}
                    />
                  </Form.Item>
                )
              )
            )}

            {formData.Type_face === 'surelevee' && (
              <Form.Item
                name={'Dfs'}
                initialValue={formData.Dfs}
                label='diamètre de la face surélevée (mm): '
                rules={[{required: true, message: 'entrer une valeur'}]}>
                <InputNumber
                  placeholder='Dfs'
                  style={styles.input}
                  disabled={buttonStatus}
                  onChange={(e) => setFormData({...formData, Dfs: e})}
                  value={formData['Dfs']}
                />
              </Form.Item>
            )}
          </Form>

          <Image src='./img/Bride_collerette.png' width={800} />
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
      dispatch({type: 'bride'})
    },
    addData: function (data) {
      dispatch({type: 'add_bride', data: data})
    }
  }
}
function mapStateToProps(state) {
  return {menuStatusDisplay: state.menuStatus}
}

export default connect(mapStateToProps, mapDispatchToProps)(Bride)
