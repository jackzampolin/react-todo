var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase')
var Header = require('./header')
var List = require('./list')
var rootUrl = 'https://brewdoctor-react.firebaseio.com/'

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState () {
    return {
      items: {},
      loaded: false,
    }
  },
  componentWillMount () {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  render () {
    return <div className='row panel panel-default'>
      <div className='col-md-8 col-md-offset-2'>
        <h2 className='text-center'>
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr/>
        <div className={'content ' + (this.state.loaded ? 'loaded' : '')}>
          <List items={this.state.items} />
          {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  handleDataLoaded () {
    this.setState({loaded: true})
  },
  deleteButton () {
    if(!this.state.loaded) {
      return ''
    } else if (!this.state.items) {
      return ''
    } else {
      return <div className='text-center clear-complete'>
        <hr/>
        <button
          type='button'
          onClick={this.handleClearButton}
          className='btn btn-default'>
          Clear Completed
        </button>
      </div>
    }
  },
  handleClearButton () {
    for(var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  }
});

React.render(<App {...{}} />, document.querySelector('.container'));
