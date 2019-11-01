import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NotefulContext from '../NotefulContext';
import ApiService from '../service/api-service';

export default class AddFolder extends React.Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      }
    };
  }

  updateName = ev => {
    this.setState({ name: { value: ev.target.value, touched: true } });
  }

  handleSubmit = ev => {
    ev.preventDefault();
    let name = this.state.name.value;
    ApiService.addFolder(name)
      .then(folder => {
        this.context.addFolder(folder);
      }).then(() => {
        this.props.history.push('/')
      })
      .catch(error => {
        this.context.setError(error);
      });  
  };

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return (
        <p>'Name is required'</p>
      )
    }
  }

  render() {
    return (
      <NotefulForm className='Noteful-form' onSubmit={this.handleSubmit}>
        <label className='Noteful-form' htmlFor='folder_name'>
          Folder Name
          <input
            className='Noteful-form'
            id='folder_name'
            value = {this.state.name.value}
            name='folder_name'
            placeholder='new name'
            onChange={this.updateName}
          ></input>
        </label>
        <div>
          {this.validateName()}
        </div>
        <button className='Noteful-form' type='submit'>
          Add folder
        </button>
      </NotefulForm>
    );
  }
}
