import React, { Component } from 'react';
import './App.css';

const escapeRegExp = (str = '') => (
     str.replace(/[-[\]{}\(\)*?.,\\^$|#\s]/g, '\$&')
);

class Word extends Component{
    constructor(props,context){
        super(props,context)
    }
    highlight(reg='', children=''){
        var isValid = true;
        try {
            new RegExp(`(${escapeRegExp(reg)})`, 'gi');
        } catch(e) {
            isValid = false;
        }

        if(!isValid){ return children}
        // if((reg.match(/[\\\[]$/g)||[]).length %2 == 1) return children
        // console.log(escapeRegExp(reg))
        const patt = new RegExp(`(${escapeRegExp(reg)})`, 'gi');
        // const patt = new RegExp(reg, 'gi');
        const parts = String(children).split(patt);
        console.log(patt)
        console.log(parts)
        if (reg) {
            return parts.map((part, index) => (
                patt.test(part) ? <mark key={index}>{part}</mark> : part
            ));
        } else {
            return children;
        }
    }
    render(){
        return(
          <h1>{this.highlight(this.props.regex,"(416)555-3456.")}
          </h1>
        )
    }
}
class App extends Component {
    constructor(props,context){
        super(props,context)
        this.state={
            regex:'\(416\)'
        }
        this.getRegex = this.getRegex.bind(this)
    }
    getRegex(){
        this.setState({
            regex: document.getElementById("inputRegex").value
        })
    }
    render() {
      return (
        <div className="App">
            <input type="text" id="inputRegex" onChange={this.getRegex}/>
          <Word regex={this.state.regex}/>
        </div>
      );
    }
}

export default App;
