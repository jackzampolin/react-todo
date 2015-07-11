var React = require('react');
var Firebase = require('firebase')
var rootUrl = 'https://brewdoctor-react.firebaseio.com/'

module.exports = React.createClass({
  getInitialState () {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false,
    }
  },
  componentWillMount () {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key)
  },
  render () {
    return <div className='input-group'>
      <span className='input-group-addon'>
        <input
          onChange={this.handleDoneChange}
          checked={this.state.done}
          type='checkbox'
        />
      </span>
      <input
        type='text'
        className='form-control'
        disabled={this.state.done}
        value={this.state.text}
        onChange={this.handleTextChange}
      />
      <span className='input-group-btn'>
        {this.changesButtons()}
        <button
          className='btn btn-default'
          onClick={this.handleDeleteClick}
        >
          Delete
        </button>
      </span>
    </div>
  },
  changesButtons () {
    if(!this.state.textChanged) {
      return null
    } else {
      return [
        <button
          onClick={this.handleSaveClick}
          className='btn btn-default'>
          Save
        </button>,
        <button
          onClick={this.handleUndoClick}
          className='btn btn-default'>
          Undo
        </button>
      ]
    };
  },
  handleSaveClick (event) {
    this.fb.update({text: this.state.text})
    this.setState({textChanged: false})
  },
  handleUndoClick (event) {
    this.setState({
      text: this.props.item.text,
      textChanged: false,
    })
  },
  handleDoneChange (event) {
    var update = {done: event.target.checked};
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick (event) {
    this.fb.remove();
  },
  handleTextChange (event) {
    this.setState({
      text: event.target.value,
      textChanged: true,
    })
  },
})