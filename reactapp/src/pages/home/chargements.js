import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Layout, InputNumber, Button, Form, Row, Checkbox, Divider} from 'antd'
import 'antd/dist/antd.min.css'

const styles = {
  input: {width: '5rem', margin: 2},
  form: {justifyContent: 'center', border: 'ridge'},
  content: {
    padding: 10,
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
}
const LabelColValue = 16
const WrapperColValue = 24
const Content = Layout

function Chargement(props) {
  // Etat de selection de catégories de situation

  const [form] = Form.useForm()

  // Etat des champs des formulaires
  const [formData, setFormData] = useState({
    categorie_0: {check: true},
    categorie_2: {
      check: true
    },
    categorie_3: {check: true},
    categorie_4: {
      check: true
    },
    categorie_EH: {
      check: true
    }
  })
  const [buttonStatus, setButtonStatus] = useState(false)
  const [loading, setLoading] = useState(false)

  // liste de champs pour chaque situation de calcul

  //const str = '-6'
  const inputProps_calcul = [
    {
      name: 'temperature_calcul',
      label: 'Température (°C): ',
      placeholder: 'Tc (°C)',
      state_name: 'Tc'
    },
    {
      name: 'Pression_calcul',
      label: 'Pression (MPa): ',
      placeholder: 'Pc (MPa)',
      state_name: 'Pc'
    },
    {
      name: 'Sbride_calcul',
      label: 'Contrainte admissible bride (MPa): ',
      placeholder: 'Sbride (MPa)',
      state_name: 'Sbride'
    },
    {
      name: 'Sboulon_calcul',
      label: 'Contrainte admissible boulon (MPa): ',
      placeholder: 'Sboul (MPa)',
      state_name: 'Sboul'
    }
  ]

  const inputProps_2ecat = [
    {
      name: 'temperature_2eme_cat',
      label: 'Température (°C): ',
      placeholder: 'Tc (°C)',
      state_name: 'Tc'
    },
    {
      name: 'Pression_2eme_cat',
      label: 'Pression (MPa): ',
      placeholder: 'Pc (MPa)',
      state_name: 'Pc'
    },
    {
      name: 'Effort_axial_2eme_cat',
      label: 'Effort axial (N): ',
      placeholder: 'Fa (N)',
      state_name: 'Fa'
    },
    {
      name: 'Moment_flexion_2eme_cat',
      label: 'Moment flexion (N.mm): ',
      placeholder: 'Mf (N.mm)',
      state_name: 'Mf'
    },
    {
      name: 'Sbride_2eme_cat',
      label: 'Contrainte admissible bride (MPa): ',
      placeholder: 'Sbride (MPa)',
      state_name: 'Sbride'
    },
    // ajout du coefficient de dilatation pour le calcul de l'effort thermique
    // {
    //   name: 'Abride_2eme_cat',
    //   label: 'Coefficient de dilatation bride (.10^-6/°C) :',
    //   placeholder: '\u03b1 (.10^-6/°C)',
    //   state_name: 'Abride',
    // },
    {
      name: 'Sboulon_2eme_cat',
      label: 'Contrainte admissible boulon (MPa): ',
      placeholder: 'Sboul (MPa)',
      state_name: 'Sboul'
    },
    {
      name: 'Eh_boul_2eme_cat',
      label: "Module d'Young à la température de 2ème cat (MPa): ",
      placeholder: 'Eh_boul (MPa)',
      state_name: 'Eh_boul'
    },
    {
      name: 'Sy_boul_2eme_cat',
      label: 'Limite elastique boulonnerie à la température de 2ème cat (MPa): ',
      placeholder: 'Sy_boul (MPa)',
      state_name: 'Sy_boul'
    }
  ]
  const inputProps_3ecat = [
    {
      name: 'temperature_3eme_cat',
      label: 'Température (°C): ',
      placeholder: 'Tc (°C)',
      state_name: 'Tc'
    },
    {
      name: 'Pression_3eme_cat',
      label: 'Pression (MPa): ',
      placeholder: 'Pc (MPa)',
      state_name: 'Pc'
    },
    {
      name: 'Effort_axial_3eme_cat',
      label: 'Effort axial (N): ',
      placeholder: 'Fa (N)',
      state_name: 'Fa'
    },
    {
      name: 'Moment_flexion_3eme_cat',
      label: 'Moment flexion (N.mm): ',
      placeholder: 'Mf (N.mm)',
      state_name: 'Mf'
    },
    {
      name: 'Sbride_3eme_cat',
      label: 'Contrainte admissible bride (MPa): ',
      placeholder: 'Sbride (MPa)',
      state_name: 'Sbride'
    },
    {
      name: 'Sboulon_3eme_cat',
      label: 'Contrainte admissible boulon (MPa): ',
      placeholder: 'Sboul (MPa)',
      state_name: 'Sboul'
    },
    {
      name: 'Eh_boul_3eme_cat',
      label: "Module d'Young à la température de 3ème cat (MPa): ",
      placeholder: 'Eh_boul (MPa)',
      state_name: 'Eh_boul'
    },
    {
      name: 'Sy_boul_3eme_cat',
      label: 'Limite elastique boulonnerie à la température de 3ème cat (MPa): ',
      placeholder: 'Sy_boul (MPa)',
      state_name: 'Sy_boul'
    }
  ]
  const inputProps_4ecat = [
    {
      name: 'temperature_4eme_cat',
      label: 'Température (°C): ',
      placeholder: 'Tc (°C)',
      state_name: 'Tc'
    },
    {
      name: 'Pression_4eme_cat',
      label: 'Pression (MPa): ',
      placeholder: 'Pc (MPa)',
      state_name: 'Pc'
    },
    {
      name: 'Effort_axial_4eme_cat',
      label: 'Effort axial (N): ',
      placeholder: 'Fa (N)',
      state_name: 'Fa'
    },
    {
      name: 'Moment_flexion_4eme_cat',
      label: 'Moment flexion (N.mm): ',
      placeholder: 'Mf (N.mm)',
      state_name: 'Mf'
    },
    {
      name: 'Sbride_4eme_cat',
      label: 'Contrainte admissible bride (MPa): ',
      placeholder: 'Sbride (MPa)',
      state_name: 'Sbride'
    },
    {
      name: 'Sboulon_4eme_cat',
      label: 'Contrainte admissible boulon (MPa): ',
      placeholder: 'Sboul (MPa)',
      state_name: 'Sboule'
    },
    {
      name: 'Eh_boul_4eme_cat',
      label: "Module d'Young à la température de 4ème cat (MPa): ",
      placeholder: 'Eh_boul (MPa)',
      state_name: 'Eh_boul'
    },
    {
      name: 'Sy_boul_4eme_cat',
      label: 'Limite elastique boulonnerie à la température de 4ème cat (MPa): ',
      placeholder: 'Sy_boul (MPa)',
      state_name: 'Sy_boul'
    }
  ]
  const inputProps_EH = [
    {
      name: 'temperature_EH',
      label: 'Température (°C): ',
      placeholder: 'T (°C)',
      state_name: 'Tc'
    },
    {
      name: 'Pression_EH',
      label: 'Pression (MPa): ',
      placeholder: 'P (MPa)',
      state_name: 'Pc'
    },
    {
      name: 'Effort_axial_EH',
      label: 'Effort axial (N): ',
      placeholder: 'Fa (N)',
      state_name: 'Fa'
    },
    {
      name: 'Moment_flexion_EH',
      label: 'Moment flexion (N.mm): ',
      placeholder: 'Mf (N.mm)',
      state_name: 'Mf'
    },
    {
      name: 'Sybride_EH',
      label: 'Limite élastique bride (MPa): ',
      placeholder: 'Sybride (MPa)',
      state_name: 'Sybride'
    },
    {
      name: 'Sboulon_EH',
      label: 'Contrainte admissible boulon (MPa): ',
      placeholder: 'Sboul (MPa)',
      state_name: 'Sboul'
    },
    {
      name: 'Eh_boul_EH',
      label: "Module d'Young à la température d'EH (MPa): ",
      placeholder: 'Eh_boul (MPa)',
      state_name: 'Eh_boul'
    },
    {
      name: 'Sy_boul_EH',
      label: "Limite elastique boulonnerie à la température d'EH (MPa): ",
      placeholder: 'Sy_boul (MPa)',
      state_name: 'Sy_boul'
    }
  ]

  useEffect(() => {
    const recoverDatas = async () => {
      const storageData = JSON.parse(sessionStorage.getItem('donnee'))
      if (storageData.chargement) {
        setButtonStatus(!buttonStatus)
        setFormData(storageData.chargement)
        props.changeMenuStatus()
        props.addData(storageData.chargement)
        setLoading(true)
      } else {
        setLoading(true)
      }
    }
    recoverDatas()
  }, [])

  // fonction de validaion du formulaire

  const handleClick = async () => {
    if (!buttonStatus) {
      try {
        const values = await form.validateFields()
        setButtonStatus(!buttonStatus)
        props.changeMenuStatus('chargement')
        props.addData(formData)
        let datas = JSON.parse(sessionStorage.getItem('donnee'))
        sessionStorage.setItem('donnee', JSON.stringify({...datas, chargement: formData}))
      } catch (errorInfo) {
        console.log('Failed:', errorInfo)
      }
    } else {
      props.changeMenuStatus('chargement')
      setButtonStatus(!buttonStatus)
    }
  }
  if (loading) {
    console.log(formData)

    return (
      <Layout>
        <Divider orientation='center'>Chargements et situations</Divider>
        <Content style={styles.content}>
          {/* formulaire situation de calcul */}
          <Form
            form={form}
            style={styles.form}
            labelAlign='left'
            labelWrap
            labelCol={{span: LabelColValue}}
            wrapperCol={{span: WrapperColValue}}>
            <Form.Item name={'calcul'}>
              <Checkbox checked={true} disabled={true}>
                Calcul
              </Checkbox>
            </Form.Item>
            {inputProps_calcul.map((prop, e) => (
              <Form.Item
                name={prop.name}
                initialValue={parseFloat(formData.categorie_0[prop.state_name])}
                key={e}
                label={prop.label}
                rules={[{required: true, message: 'entrer une valeur'}]}>
                <InputNumber
                  placeholder={prop.placeholder}
                  disabled={buttonStatus}
                  style={styles.input}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categorie_0: {
                        ...formData.categorie_0,
                        [prop.state_name]: e
                      }
                    })
                  }
                  value={formData.categorie_0[prop.state_name]}
                />
              </Form.Item>
            ))}
          </Form>

          {/* formulaire 2eme catégorie */}
          <Form
            form={form}
            style={styles.form}
            labelAlign='left'
            labelWrap
            labelCol={{span: LabelColValue}}
            wrapperCol={{span: WrapperColValue}}>
            <Form.Item name={'2e_cat'}>
              <Checkbox
                checked={formData.categorie_2.check}
                initialValue={formData.categorie_2.check}
                disabled={buttonStatus}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    ...(formData.categorie_2.check = e.target.checked)
                  })
                }}>
                2eme catégorie (service)
              </Checkbox>
            </Form.Item>
            {inputProps_2ecat.map((prop, e) => (
              <Form.Item
                key={e}
                name={prop.name}
                label={prop.label}
                initialValue={parseFloat(formData.categorie_2[prop.state_name])}
                rules={[
                  {
                    required: formData.categorie_2.check,
                    message: 'entrer une valeur'
                  }
                ]}>
                <InputNumber
                  placeholder={prop.placeholder}
                  style={styles.input}
                  disabled={buttonStatus || !formData.categorie_2.check}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categorie_2: {
                        ...formData.categorie_2,
                        [prop.state_name]: e
                      }
                    })
                  }
                  value={formData.categorie_2[prop.state_name]}
                />
              </Form.Item>
            ))}
          </Form>

          {/* formulaire 3eme catégorie */}
          <Form
            form={form}
            style={styles.form}
            labelAlign='left'
            labelWrap
            labelCol={{span: LabelColValue}}
            wrapperCol={{span: WrapperColValue}}>
            <Form.Item name={'3e_cat'}>
              <Checkbox
                checked={formData.categorie_3.check}
                initialValue={formData.categorie_3.check}
                disabled={buttonStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...(formData.categorie_3.check = e.target.checked)
                  })
                }>
                3eme catégorie
              </Checkbox>
            </Form.Item>
            {inputProps_3ecat.map((prop, e) => (
              <Form.Item
                key={e}
                name={prop.name}
                label={prop.label}
                initialValue={parseFloat(formData.categorie_3[prop.state_name])}
                rules={[
                  {
                    required: formData.categorie_3.check,
                    message: 'entrer une valeur'
                  }
                ]}>
                <InputNumber
                  placeholder={prop.placeholder}
                  disabled={buttonStatus || !formData.categorie_3.check}
                  style={styles.input}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categorie_3: {
                        ...formData.categorie_3,
                        [prop.state_name]: e
                      }
                    })
                  }
                  value={formData.categorie_3[prop.state_name]}
                />
              </Form.Item>
            ))}
          </Form>

          {/* formulaire quatrieme catégorie */}
          <Form
            form={form}
            style={styles.form}
            labelAlign='left'
            labelWrap
            labelCol={{span: LabelColValue}}
            wrapperCol={{span: WrapperColValue}}>
            <Form.Item name={'4e_cat'}>
              <Checkbox
                checked={formData.categorie_4.check}
                disabled={buttonStatus}
                initialValue={formData.categorie_4.check}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...(formData.categorie_4.check = e.target.checked)
                  })
                }>
                4eme catégorie
              </Checkbox>
            </Form.Item>
            {inputProps_4ecat.map((prop, e) => (
              <Form.Item
                key={e}
                name={prop.name}
                label={prop.label}
                initialValue={parseFloat(formData.categorie_3[prop.state_name])}
                rules={[
                  {
                    required: formData.categorie_4.check,
                    message: 'entrer une valeur'
                  }
                ]}>
                <InputNumber
                  placeholder={prop.placeholder}
                  disabled={buttonStatus || !formData.categorie_4.check}
                  style={styles.input}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categorie_4: {
                        ...formData.categorie_4,
                        [prop.state_name]: e
                      }
                    })
                  }
                  value={formData.categorie_4[prop.state_name]}
                />
              </Form.Item>
            ))}
          </Form>

          {/* formulaire épreuve hydraulique */}
          <Form
            form={form}
            style={styles.form}
            labelAlign='left'
            labelWrap
            labelCol={{span: LabelColValue}}
            wrapperCol={{span: WrapperColValue}}>
            <Form.Item name={'EH'}>
              <Checkbox
                checked={formData.categorie_EH.check}
                initialValue={formData.categorie_EH.check}
                disabled={buttonStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...(formData.categorie_EH.check = e.target.checked)
                  })
                }>
                Epreuve hydraulique
              </Checkbox>
            </Form.Item>
            {inputProps_EH.map((prop, e) => (
              <Form.Item
                key={e}
                name={prop.name}
                label={prop.label}
                initialValue={parseFloat(formData.categorie_EH[prop.state_name])}
                rules={[
                  {
                    required: formData.categorie_EH.check,
                    message: 'entrer une valeur'
                  }
                ]}>
                <InputNumber
                  placeholder={prop.placeholder}
                  disabled={buttonStatus || !formData.categorie_EH.check}
                  style={styles.input}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categorie_EH: {
                        ...formData.categorie_EH,
                        [prop.state_name]: e
                      }
                    })
                  }
                  value={formData.categorie_EH[prop.state_name]}
                />
              </Form.Item>
            ))}
          </Form>
        </Content>
        <Row justify='space-around'>
          <Button type='primary' onClick={() => handleClick()} style={{marginTop: 15}}>
            {buttonStatus ? 'Modifier' : 'Valider'}
          </Button>
        </Row>
      </Layout>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeMenuStatus: function () {
      dispatch({type: 'chargement'})
    },
    addData: function (data) {
      dispatch({type: 'add_chargement', data: data})
    }
  }
}
function mapStateToProps(state) {
  return {menuStatusDisplay: state.menuStatus}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chargement)
