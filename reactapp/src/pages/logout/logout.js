import React from 'react'
import {Navigate} from 'react-router-dom'
import {connect} from 'react-redux'

function Logout(props) {
  sessionStorage.clear()
  props.addUser()
  return <Navigate to='/'></Navigate>
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: function () {
      dispatch({type: 'logout'})
    },
  }
}

export default connect(null, mapDispatchToProps)(Logout)
