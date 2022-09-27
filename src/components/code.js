import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {post, url} from '../utiles';

export default class CodeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      language: 'js',
    };
    this.langs = {
      'ino': 'Arduino',
      'sh': 'Bash',
      'c': 'C',
      'css': 'CSS',
      'go': 'GO',
      'ini': 'Ini',
      'java': 'Java',
      'js': 'JavaScript',
      'webmanifest': 'JSON ',
      'kt': 'Kotlin',
      'less': 'Less',
      'html': 'HTML',
      'xml': 'XML',
      'svg': 'SVG ',
      'objc': 'C ',
      'perl': 'Perl',
      'php': 'PHP',
      'py': 'Python',
      'r': 'R',
      'regex': 'Regex',
      'rb': 'Ruby',
      'sass': 'Sass',
      'scss': 'Scss',
      'sql': 'SQL',
      'swift': 'Swift',
      'ts': 'Typescript',
      'yml': 'Yaml',
    }
  }

  componentDidMount() {
    if(this.props.content != null) {
      this.setState({code: atob(this.props.content), language: this.props.lang})
    }
  }


  insert() {
    this.props.onInsert({code: this.state.code, lang: this.state.language, tag_lang: this.langs[this.state.language]})
    this.setState({code: null})
  }

  render() {
    return (
      <div className="RichEditor-root">
        <div className="header-editor">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div className="camp">
              <select name="language" style={{width: 120}} onChange={(e) => this.setState({language: e.target.value})} value={this.state.language}>
                <option value="ino">Arduino</option>
                <option value="sh">Bash</option>
                <option value="c">C</option>
                <option value="css">CSS</option>
                <option value="go">GO</option>
                <option value="ini">Ini</option>
                <option value="java">Java</option>
                <option value="js">JavaScript</option>
                <option value="webmanifest">JSON </option>
                <option value="kt">Kotlin</option>
                <option value="less">Less</option>
                <option value="html">HTML</option>
                <option value="xml">XML</option>
                <option value="svg">SVG </option>
                <option value="objc">Objective-C </option>
                <option value="perl">Perl</option>
                <option value="php">PHP</option>
                <option value="py">Python</option>
                <option value="r">R</option>
                <option value="regex">Regex</option>
                <option value="rb">Ruby</option>
                <option value="sass">Sass</option>
                <option value="scss">Scss</option>
                <option value="sql">SQL</option>
                <option value="swift">Swift</option>
                <option value="ts">Typescript</option>
                <option value="yml">Yaml</option>
              </select>
            </div>
          </div>
        </div>
        <div className="editor-code" data-color-mode="dark">
        <CodeEditor
          value={this.state.code}
          language={this.state.language}
          placeholder="// Tu código aquí."
          onChange={(evn) => this.setState({code: evn.target.value})}
          padding={17}
          style={{
            fontSize: 17,
            backgroundColor: "#f5f5f5",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span className="msg-editor"></span>
          <div>
            {this.state.code != null && this.state.code != '' && (<a className="btn-inser" href="#" onClick={(e) => {e.preventDefault(); this.insert()}}>Insertar</a>)}
          </div>
        </div>
      </div>
    );
  }
}