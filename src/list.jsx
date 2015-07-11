var React = require('react');
var ListItem = require('./listitem')

module.exports = React.createClass({
  render () {
    return <div>
      {this.renderList()}
    </div>
  },
  renderList () {
    if (!this.props.items) {
      return <h4 className='text-center'>
        Add a To-Do to get started
      </h4>
    } else {
      var children = [];
      for(var key in this.props.items){
        var item = this.props.items[key];
        item.key = key;

        children.push(
          <ListItem
            item={item}
            key={key}
          />
        )
      };
      return children;
    }
  },
})