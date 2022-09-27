import React from 'react';
import {post, url} from '../utiles';

export default class ImagenComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extension: null,
      imagen: null,
      w: 0,
      r: 0,
      mTop: 0,
      mLeft: 0,
      mRight: 0,
      mBottom: 0,
    };
  }

  componentDidMount() {
    if(this.props.content != null) {
      let parser = new DOMParser()
      let doc = parser.parseFromString(atob(this.props.content), 'text/html')
      let img = doc.body.lastElementChild
      let url = img.getAttribute('src')
      let w = img.style.width.replace('px', '');
      let r = img.style.borderRadius.replace('px', '');
      let mTop = img.style.marginTop.replace('px', '');
      let mLeft = img.style.marginLeft.replace('px', '');
      let mRight = img.style.marginRight.replace('px', '');
      let mBottom = img.style.marginBottom.replace('px', '');
      this.setState({
        w: w,
        r: r,
        mTop: mTop,
        mLeft: mLeft,
        mRight: mRight,
        mBottom: mBottom,
        imagen: url
      })
    }
  }



  selectImage(e) {
    if (!e.target.files || !e.target.files[0]) return;
    const setImg = img => {
      let extension = e.target.files[0].name.split('.').pop().toLowerCase()
      let image = new Image();
      image.src = img;
      this.setState({imagen: img, extension: extension})
      image.onload = () => {
        this.setState({w: image.width, h: image.height})
      }
    }
    const FR = new FileReader();
    FR.addEventListener("load", function(evt) {
      setImg(evt.target.result);
    }); 
    FR.readAsDataURL(e.target.files[0]);
  }

  clearImg() {
    this.setState({
      imagen: null,
      w: 0,
      r: 0,
      mTop: 0,
      mBottom: 0,
    })
  }

  insert() {
    if(this.props.content != null) {
      let html = '<img src="'+this.state.imagen+'" style="width: '+this.state.w+'px; height: auto; border-radius: '+this.state.r+'px; margin-top: '+this.state.mTop+'px; margin-left: '+this.state.mLeft+'px; margin-right: '+this.state.mRight+'px; margin-bottom: '+this.state.mBottom+'px"/>';
      this.props.onInsert(html)
      this.clearImg()
    }else {
      if(this.state.imagen != null) {
        post({
          action: 'upload',
          name: 'img.'+this.state.extension,
          file: this.state.imagen,
        }).then(data => {
          if(data.status) {
            let html = '<img src="'+url+'/'+data.data+'" style="width: '+this.state.w+'px; height: auto; border-radius: '+this.state.r+'px; margin-top: '+this.state.mTop+'px; margin-left: '+this.state.mLeft+'px; margin-right: '+this.state.mRight+'px; margin-bottom: '+this.state.mBottom+'px"/>';
            this.props.onInsert(html, data.data)
            this.clearImg()
          } 
        })
      }
    }
  }

  render() {
    return (
      <div className="RichEditor-root">
        <div className="header-editor">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div className="camp">
              <span>Tamaño</span>
              <input type="number" value={this.state.w} name="w" onChange={(e) => {console.log(e.target.value); this.setState({w: e.target.value})}} />
            </div>
            <div className="camp">
              <span>Radius</span>
              <input type="number" value={this.state.r} name="r" onChange={(e) => this.setState({r: e.target.value})} />
            </div>
            <div className="camp">
              <span>Margin Top</span>
              <input type="number" value={this.state.mTop} name="mTop" onChange={(e) => this.setState({mTop: e.target.value})} />
            </div>
            <div className="camp">
              <span>Margin Left</span>
              <input type="number" value={this.state.mLeft} name="mTop" onChange={(e) => this.setState({mLeft: e.target.value})} />
            </div>
            <div className="camp">
              <span>Margin Right</span>
              <input type="number" value={this.state.mRight} name="mTop" onChange={(e) => this.setState({mRight: e.target.value})} />
            </div>
            <div className="camp">
              <span>Margin bottom</span>
              <input type="number" value={this.state.mBottom} name="mBottom" onChange={(e) => this.setState({mBottom: e.target.value})} />
            </div>
          </div>
        </div>
        <div>
          {this.state.imagen == null && (
            <label className="load-image">
              Cargar imagen
              <input type="file" accept="image/*" onChange={(e) => this.selectImage(e)}/>
            </label>
          )}
          {this.state.imagen != null && (
            <img src={this.state.imagen} style={{
              width: this.state.w+'px',
              height: 'auto',
              borderRadius: this.state.r+'px',
              marginTop: this.state.mTop+'px',
              marginLeft: this.state.mLeft+'px',
              marginRight: this.state.mRight+'px',
              marginBottom: this.state.mBottom+'px'
            }}/>
          )}

        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span className="msg-editor"></span>
          <div>
            {(this.state.imagen != null && this.props.content == null) && (
              <a className="btn-inser" href="#" onClick={() => this.clearImg()}>Borrar</a>
            )}
            <a className="btn-inser" href="#" onClick={(e) => {e.preventDefault(); this.insert()}}>Insertar</a>
          </div>
        </div>
      </div>
    );
  }
}