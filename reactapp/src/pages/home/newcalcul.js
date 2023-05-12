import 'sanitize.css'
import React from 'react'
import Localisation from './localisation'
import {Menu, Layout} from 'antd'
import {connect} from 'react-redux'
import Bride from './bride'
import Boulon from './boulon'
import Chargement from './chargements'
import Joint from './joint'
import Resultat from './resultat'
import Login from './login'
import Nav from '../nav'
import 'antd/dist/antd.min.css'

const {Header, Sider} = Layout

function App(props) {

  let menuItems = [
    {
      label: <a href='#localisation'>Localisation</a>,
      key: 10,
      disabled: props.menuStatusDisplay.localisationStatus
    },
    {
      label: <a href='#bride'>Geometrie</a>,
      key: 11,
      disabled: props.menuStatusDisplay.geometrieStatus
    },
    {
      label: <a href='#boulon'>Boulonnerie</a>,
      key: 12,
      disabled: props.menuStatusDisplay.boulonnerieStatus
    },
    {
      label: <a href='#chargement'>Chargement</a>,
      key: 13,
      disabled: props.menuStatusDisplay.chargementStatus
    },
    {
      label: <a href='#joint'>Joint</a>,
      key: 14,
      disabled: props.menuStatusDisplay.jointStatus
    }
  ]


  if (!sessionStorage.getItem('user')) {
    return <Login />
  } else {
    return (
      <Layout>
        <Layout
          style={{
            position: 'fixed',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 1
          }}>
          <Nav selectedKey={['1']} />
        </Layout>

        <Layout>
          <Sider
            style={{
              position: 'fixed',
              width: '100%',
              top: 46,
              left: 0,
              zIndex: 1
            }}
            width={200}
            className='site-layout-background'>
            <Menu
              mode='inline'
              defaultSelectedKeys={['7']}
              defaultOpenKeys={[`Données d'entrée`]}
              style={{
                height: '100vh'
              }}
              items={[
                {
                  key: 7,
                  label: `Données d'entrée`,
                  children: menuItems
                },
                {
                  key: 8,
                  label: <a href='#resultat'>Résultats</a>,
                  disabled: props.menuStatusDisplay.finishStatus
                }
              ]}
            />
          </Sider>

          <Layout style={{marginLeft: 200, height: 'auto', minHeight: '100vh'}}>
            <div id='localisation'>
              <Localisation />
            </div>
            {!props.menuStatusDisplay.geometrieStatus ||props.result.couple? (
              <div className='site-layout-background' id='bride'>
                <Bride />
              </div>
            ) : (
              ''
            )}
            {!props.menuStatusDisplay.boulonnerieStatus||props.result.couple ? (
              <div id='boulon'>
                <Boulon />
              </div>
            ) : (
              ''
            )}
            {!props.menuStatusDisplay.chargementStatus||props.result.couple ? (
              <div id='chargement'>
                <Chargement />
              </div>
            ) : (
              ''
            )}
            {!props.menuStatusDisplay.jointStatus ||props.result.couple? (
              <div id='joint'>
                <Joint />
              </div>
            ) : (
              ''
            )}
            {!props.menuStatusDisplay.calculStatus ? (
              <div id='resultat'>
                <Resultat />
              </div>
            ) : (
              ''
            )}
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {menuStatusDisplay: state.menuStatus, user: state.user, result:state.result}
}

export default connect(mapStateToProps, null)(App)
