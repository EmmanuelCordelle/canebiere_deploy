import React from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function Nav(props) {
  const MenuItems = [
    <Menu.Item key='1'>
      <Link to='/'>Nouveau calcul</Link>
    </Menu.Item>,
    <Menu.Item key='2'>
      <Link to='/search'>Rechercher une etude</Link>
    </Menu.Item>,
    <Menu.Item key='3'>
      <Link to='/help'>Aide</Link>
    </Menu.Item>,
    <Menu.Item key='4'>
      <Link to='/logout'>Deconnexion</Link>
    </Menu.Item>
  ]

  if (props.user.type === 'admin') {
    MenuItems.push(
      <Menu.Item key='5'>
        <Link to='/admin'>Admin</Link>
      </Menu.Item>
    )
  }

  return (
    <nav>
      <Menu theme='dark' mode='horizontal' selectedKeys={props.selectedKey}>
        {MenuItems}
      </Menu>
    </nav>
  )
}

function mapStateToProps(state) {
  return {user: state.user}
}

export default connect(mapStateToProps, null)(Nav)
