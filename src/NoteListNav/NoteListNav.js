import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton';
import NotefulContext from '../NotefulContext';
import { countNotesForFolder } from '../notes-helpers';
import ApiService from '../service/api-service'
import './NoteListNav.css';

export default class NoteListNav extends React.Component {
  static contextType = NotefulContext;


  handleClickDelete(id) {
    ApiService.deleteFolder(id) 
    .then(() => {
      this.context.deleteFolder(id)
      .then(() => {
        this.props.history.push('/')
      })
    })
    .catch(error => {
      this.context.setError(error)
    })
  }

  render() {
    const { folders = [], notes = [] } = this.context;
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder => (
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.folder_name}
                <button
                className='folder__delete'
                type='button'
                onClick={() => {
                  this.handleClickDelete(folder.id);
                }}
              >
                <FontAwesomeIcon icon='trash-alt' />
              </button>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    );
  }
}
