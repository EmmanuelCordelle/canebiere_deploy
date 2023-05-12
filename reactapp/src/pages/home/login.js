import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Layout, Input, Button, Form, Row, Typography} from 'antd'

function Login(props) {
  const [Nni, SetNni] = useState()
  const [password, SetPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const [form] = Form.useForm()
  const {Text} = Typography

  const Style = {
    input: {width: 120, margin: 5},
    layout: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
  }

  const handleClick = async () => {
    try {
      const values = await form.validateFields()

      const rawResponse = await fetch('users/sign-in', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `Nni=${Nni}&password=${password}`
      })
      const response = await rawResponse.json()

      if (response.result) {
        props.addUser(response.findUser)
        sessionStorage.setItem('user', response.findUser.token)
        console.log('response finduser', response.findUser)
        setErrorMessage()
      } else {
        console.log(response.messageError)
        setErrorMessage(response.messageError)
      }
    } catch (errorInfo) {
      console.log(errorInfo)
    }
  }
  return (
    <Layout style={Style.layout}>
      <Form form={form} labelAlign='left' labelCol={{span: 18}}>
        <Form.Item name={'Nni'} label='NNI:' rules={[{required: true, message: 'Entrez votre NNI'}]}>
          <Input
            placeholder='NNI'
            minLength={6}
            maxLength={6}
            onChange={(e) => SetNni(e.target.value)}
            value={Nni}
            style={Style.input}
          />
        </Form.Item>

        <Form.Item
          name={'Password'}
          label='Mot de passe'
          rules={[{required: true, message: 'Entrez votre mot de passe'}]}>
          <Input
            placeholder='Password'
            type='password'
            onChange={(e) => SetPassword(e.target.value)}
            value={password}
            style={Style.input}
          />
        </Form.Item>
        <Text type='danger'>{errorMessage}</Text>
        <Row justify='space-around'>
          <Button type='primary' onClick={() => handleClick()} style={{marginTop: 15}}>
            Valider
          </Button>
        </Row>
      </Form>
    </Layout>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: function (user) {
      dispatch({type: 'addUser', user: user})
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
