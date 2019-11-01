import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotefulContext from '../NotefulContext';
import AddFolder from '../addFolder/addFolder';
import AddNote from '../addNote/addNote';
import config from '../config';
import './App.css';
import EditNote from '../EditNote/EditNote'

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteNote = noteId => {
      console.log('deleting notes')
   const newNotes = this.state.notes.filter(note => note.id !== noteId);
   this.setState({notes: [newNotes]});
  }
 


  handleAddNote = newNote => {
    this.setState({notes: [...this.state.notes, newNote]});
  };

  handleUpdateNote = updatedNote => {
      let id = parseInt(updatedNote.id)
    this.setState({notes : this.state.notes.map(note => (
        note.id !== id) ? note : updatedNote)
    })
}

  handleAddFolder = newFolder => {
    this.setState({folders : [...this.state.folders, newFolder]});
  };

  handleDeleteFolder = folderId => {
    this.setState({
      folders: this.state.folders.filter(folder => folder.id !== folderId)
    });
  };

  handleUpdateFolder = newFolder => {
    this.setState({
      folders: this.state.folders.map(folder =>
        folder.id !== newFolder.id ? folder : newFolder
      )
    });
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path='/note/:noteId' component={NotePageNav} />
        <Route path='/add-folder' component={AddFolder} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route exact path='/note/:noteId' component={NotePageMain} />
        <Route exact path='/add-note' component={AddNote} />
        <Route exact path='/note/edit-note/:noteId' component={EditNote}/>
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      error: this.state.error,
      deleteNote: this.handleDeleteNote,
      addNote: this.handleAddNote,
      updateNote: this.handleUpdateNote,
      deleteFolder: this.handleDeleteFolder,
      addFolder: this.handleAddFolder,
      updateFolder: this.handleUpdateFolder,
      setError: this.setError,
      clearError: this.clearError
    };
    return (
      <NotefulContext.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>{' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>{this.renderMainRoutes()}</main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
