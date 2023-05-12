import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Layout, Button, Divider, Modal, message} from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons';
import Tableaux from './tableaux_resultats'
import {PDFDownloadLink, Document, Page, Text, StyleSheet, View} from '@react-pdf/renderer'
import {jsPDF} from 'jspdf'
import Template_PDF from '../../data/template_pdf'

const style = {
  Table: {
    marginTop: '2%'
  }
}
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

function Resultat(props) {
  const [exportStatus, setExportStatus] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  // creation d'un pdf
  
  const generate = () => {
    let doc = new jsPDF('p', 'px', 'a4')
    doc.setFontSize(2)

    //doc.setFontSize(1)
    doc.html(document.querySelector('#tableaux_test'), {
      callback: function (pdf) {
        pdf.save('mypdf.pdf')
      }
    })
  }

  const MyDoc = () => (
    <Document>
      <Page size='A4'>
        <View style={styles.section}>
          <Text>TEST</Text>
          <Tableaux result={props.result} datas={props.datas} />
        </View>
      </Page>
    </Document>
  )

  
  //fonction de création d'un nouvel indice
  const update=async()=>{

      const rawResponse = await fetch('/save-update', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `datas=${JSON.stringify(props.datas)}&result=${JSON.stringify(props.result)}&user=${props.token}`
      })
      const response=await rawResponse.json()
      if(response){
        messageApi.open({
          type: 'success',
          content: 'Etude mise à jour',
        })
      }
    }

  
  // modale de création d'indice si une étude existe déjà lors de la sauvegarde
  const showConfirm= ()=>{
    Modal.confirm({
      title:"Une étude existe déjà sur ce cet équipement, voulez-vous créer un nouvel indice?",
      icon:<ExclamationCircleFilled/>,
      onOk(){
        update()
      }
      
    })
  }

  // fonction de sauvegarde
  const handleClickSave = async () => {
    const rawResponse = await fetch('/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `datas=${JSON.stringify(props.datas)}&result=${JSON.stringify(props.result)}&user=${props.token}`
    })
    const response=await rawResponse.json()
    if(!response){
      showConfirm()

    }else{
      messageApi.open({
        type: 'success',
        content: 'Etude sauvegardée',
      });
    }

  }

  const exporter = async () => {
    //const pdf_send = <Tableaux />

    }

    //setExportStatus(true)
  

  return (
    <Layout
    style={{
      display: 'flex',
      
      justifyContent: 'center',
      alignItems: 'center',
      //width: '100%',
      paddingTop: '2%'
    }}>
      <Divider orientation='center'>Resultats</Divider>
      <Tableaux result={props.result} datas={props.datas} />
      {/* <Template_PDF result={props.result} datas={props.datas} /> */}

      {contextHolder}
      <Button type='primary' onClick={() => handleClickSave()} style={{marginTop: 15}}>
        Sauvegarder
      </Button>

      <Button type='primary' onClick={() => exporter()} style={{marginTop: 15}}>
        Exporter PDF
      </Button>

      <div>
        <PDFDownloadLink document={<MyDoc />} fileName='test.pdf'>
          download
        </PDFDownloadLink>
      </div>
    </Layout>
  )
}

function mapStateToProps(state) {
  return {
    menuStatusDisplay: state.menuStatus,
    datas: state.data,
    result: state.result,
    token: state.user
  }
}

export default connect(mapStateToProps, null)(Resultat)
