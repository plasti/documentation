import React from 'react';
import {post, url} from '../utiles';

export default class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      url_video: '',
    };
  }


  componentDidMount() {
    if(this.props.content != null) {
      let parser = new DOMParser()
      let doc = parser.parseFromString(atob(this.props.content), 'text/html')
      let new_url = doc.body.lastElementChild.children[0].getAttribute('src')
      this.setState({url_video: new_url})
    }
  }

  insert() {
    if(this.state.url_video != null) {
      let html = '<div class="video"><iframe src="'+this.state.url_video+'" frameborder="0"></iframe></div>'
      this.props.onInsert(html)
      this.setState({url_video: null, url: ''})
    }
  }

  getLinkEmbeb() {
    let link = this.state.url
    let new_url = null
    if(link.indexOf('youtu.be') > -1) {
      new_url = 'https://www.youtube.com/embed/'+link.split('youtu.be/')[1]
    }else if(link.indexOf('www.youtube.com/watch?') > -1) {
      new_url = link.split('www.youtube.com/watch?v=')[1]
      if(new_url.indexOf('&list=') > -1) {
        new_url = new_url.split('&list=')[0]
      }
      new_url = 'https://www.youtube.com/embed/'+new_url
    }else if(link.indexOf('<iframe') > -1) {
      let parser = new DOMParser()
      let doc = parser.parseFromString(link, 'text/html')
      new_url = doc.body.lastElementChild.getAttribute('src')
    }else {
      alert('Link no válido', 'danger')
    }
    if(new_url != null) {
      this.setState({url_video: new_url})
    }
  }


  render() {
    return (
      <div className="RichEditor-root">
        <div className="header-editor">
          <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            <span>URL del video ( Youtube ) :</span>
            <input
              style={{width: '50%', marginLeft: 15}}
              className="url-input"
              onChange={(e) => this.setState({url: e.target.value})}
              type="text"
              value={this.state.url}
            />
            <span className="RichEditor-styleButton" onMouseDown={() => this.getLinkEmbeb()}>Verificar</span>
          </div>
        </div>
        <div>
          {(this.state.url_video != null && this.state.url_video != '') && (
            <div className="video">
              <iframe src={this.state.url_video} frameBorder="0"></iframe>
            </div>
          )}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span className="msg-editor"></span>
          <div>
            {(this.state.url_video != null && this.state.url_video != '') && (
              <a className="btn-inser" href="#" onClick={(e) => {e.preventDefault(); this.insert()}}>Insertar</a>
            )}
          </div>
        </div>
      </div>
    );
  }
}