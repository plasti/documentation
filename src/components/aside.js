import React from 'react';
import Loader from './loader'
import {post, url} from '../utiles';
// aside

export default class Aside extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      menu: []
    }
  }

  componentDidMount() {
    post({action: 'get_menu'}).then(data =>  {
      let menu = data.menu
      this.setState({menu: menu, loading: false})
    })
  }

  render() {
    return (
      <aside className="menu-left">
        {this.state.loading ? (<Loader repeat={15} />) : (
          <>
            {this.state.menu.map((item, i) => (
              <>
                {item.type == 'simple' ? (<a key={i} href="#" onClick={() => console.log(item.content)}>{item.title}</a>) : (
                  <details key={i}>
                    <summary>{item.title}</summary>
                    {item.items.map((subitem, e) => (
                      <a key={String(i+'_'+e)} onClick={() => console.log(subitem.content)} href="#">{subitem.title}</a>
                    ))}
                  </details>
                )}
              </>
            ))}
          </>
        )}
      </aside>
    )
  }
}