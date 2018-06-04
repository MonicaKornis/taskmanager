import React from 'react';
import { ApprovalIcon, HeartOutlineIcon } from 'mdi-react';

const noop = () => {};

/**
 * TodoForm component
 * @class
 */
class TodoForm extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todo-form';

  /**
   * Prop Types
   * @static
   */
  static propTypes = {
    onSubmit: React.PropTypes.func,
  };

  static defaultProps = {
    onSubmit: noop,
  };

  /**
   * Constructor
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = { input: '', status: '' };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.statusChange = this.statusChange.bind(this);
  }

  /**
   * On change handler for input field
   * @param  {object} e - Event object
   */
  onChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  statusChange(e) {
    this.setState({ status: e.target.value});
  }
  /**
   * On submit handler for submitting form
   * @param  {object} e - Event object
   */
  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state.input);

    this.setState({ input: '' });
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
    <div>
      <form onSubmit={this.onSubmit} className='itemBarForm'>
        <input className='addItemBar'
          onChange={this.onChange}
          placeholder="Add new todo..."
          value={this.state.input}>
          
      </input>
  
      <input type="text" onChange={this.statusChange} className='statusDropdown' placeholder='Status' name="status" list="status"/>
      <datalist id="status">
        <option value="Personal"> </option>
        <option value="Work"> </option>
        <option value="Important"> </option>
        </datalist>
          
        <button onClick={this.onSubmit}className='itemBarButton'>+</button>
      </form>
      
    </div>
    );
  }
}

export default TodoForm;
