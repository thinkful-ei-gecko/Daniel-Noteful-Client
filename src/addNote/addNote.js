import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'
import ApiService from '../service/api-service'


export default class AddNote extends React.Component {
	 static contextType = NotefulContext

	 state = {
      error: null,
      note_name: '',
      content: '',
      folder_id: '',
	 }

 handleSubmit = ev => {
   ev.preventDefault()
   let note_name = this.state.note_name
   let content = this.state.content
   let folder_id = this.state.folder_id
	 ApiService.addNote(note_name, content, folder_id)
			 .then(note => {
					this.context.addNote(note)
			 }).then(() => {
         this.props.history.goBack();
       })
			 .catch(error => {
					this.context.setError(error)
			 })
 }

 updateName = ev => {
   this.setState({note_name: ev.target.value})
 }

 updateContent = ev => {
   this.setState({content: ev.target.value})
 }

 updateFolder = ev => {
   this.setState({folder_id: ev.target.value})
 }


  render() {
    return (
      <NotefulForm className="Noteful-form" onSubmit={this.handleSubmit}>
        <label htmlFor="note_name" className="Nf">Note Title
          <input type="text" id="note_name" name="note_name" className="Nf" placeholder="TO-DO" value={this.state.note_name} onChange={this.updateName}>        
          </input>
        </label>
        <label htmlFor="content" className="Nf">Content
          <input type="textarea" id="content" name="content" className="Nf" placeholder="What is your note about?" value={this.state.content} onChange={this.updateContent}>        
          </input>
        </label>
        <label htmlFor="folder_id" className="Nf">Where are you going to keep your note?
        <select
            className="Nf"
            name="folder_id"
            id="folder_id"
            value={this.state.folder_id}
            onChange={this.updateFolder}
          >
            <option value={''}>...</option>
            {this.context.folders.map((folder, index) => {
              return (
                <option value={folder.id} key={index}>
                  {folder.folder_name}
                </option>
              );
            })}
          </select>
        </label>

        <button className='Nf' type='submit'>Add Note</button>
      </NotefulForm>
    )
  }
}
