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

    this.state = { input: '', category: '' };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
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

  categoryChange(e) {
    this.setState({ category: e.target.value});
  }
  /**
   * On submit handler for submitting form
   * @param  {object} e - Event object
   */
  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state);
    
    this.setState({ input: '', category: '' });
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
  
      <input type="text" onChange={this.categoryChange} className='statusDropdown' placeholder='Status' name="status" list="status"/>
      <datalist id="status">
        <option value="Personal"> </option>
        <option value="Work"> </option>
        <option value="Important"> </option>
        </datalist>
        <div className='addItemBar padding'></div>
        <button onClick={this.onSubmit}className='itemBarButton'>+</button>
      </form>
      
    </div>
    );
  }
}

export default TodoForm;
