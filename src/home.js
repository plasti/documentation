import React from 'react';
import {post} from './utiles';

export default class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    post({action: 'get_config'}).then(data =>  {
      if(data.config.title != '') {

      }else {
        this.props.navigate('/install');
      }
    })
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="loading">
          <span>Cargando...</span>
        </div>
      )
    }else {
      return (
        <div className="instalacion">
          <h1>Bienvenido</h1>        
        </div>
      )
    }
  }
}

