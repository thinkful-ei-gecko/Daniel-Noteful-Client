import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotefulContext from '../NotefulContext'
import ApiService from '../service/api-service'
import './Note.css'


export default class Note extends React.Component {
  static contextType = NotefulContext;

  handleClickDelete(id) {
    ApiService.deleteNote(id)
    .then(() => {
      this.context.deleteNote(id)
      })
    .catch(error => {
      this.context.setError(error)
    })
  }


  render() {
    const { name, id} = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={() =>{this.handleClickDelete(id)}}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
      </div>
    )
  }
}
