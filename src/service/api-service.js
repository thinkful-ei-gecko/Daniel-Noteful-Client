import config from '../config'

const ApiService = {
  getNotes() {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => 
      !res.ok ? res.json().then(e => Promise.reject(e)) :res.json())
  },

  getFolders() {
    return fetch(`${config.API_ENDPOINT}/folders`, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => 
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json())
  },


	 addNote(note_name, content, folder_id) {
			return fetch(`${config.API_ENDPOINT}/notes`, {
				 method: `POST`, 
				 headers: {
						'content-type': 'application/json'
				 },
				 body: JSON.stringify({
					 note_name,
					 content,
					 folder_id,
				 })
			}).then(res => 
				 !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
	 },

	 deleteNote(id) {
			return fetch(`${config.API_ENDPOINT}/notes/${id}`, {
				 method: `DELETE`, 
				 headers: {
						'content-type': 'application/json'
				 }
			})
	 },


	 updateNote(updatedNote, id) {
			return fetch(`${config.API_ENDPOINT}/notes/${id}`, {
				 method: `PATCH`, 
				 headers: {
						'content-type': 'application/json'
				 }, 
				 body: JSON.stringify({updatedNote})
			})
	 }, 


	 addFolder(newFolder) {
			return fetch(`${config.API_ENDPOINT}/folders`, {
				 method: `POST`, 
				 headers: {
						'content-type': 'application/json'
				 },
				 body: JSON.stringify({folder_name: newFolder})
			}).then(res => 
				 !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()

			)
	 },
	 
	 deleteFolder(id) {
	 		return fetch(`${config.API_ENDPOINT}/folders/${id}`, {
				 method: `DELETE`, 
				 headers: {
						'content-type': 'application/json'
				 },
			})
	 },

	 UpdateFolder(newFolder) {
			return fetch(`${config.API_ENDPOINT}/folders/${newFolder.id}`, {
				 method: `PATCH`, 
				 headers: {
						'content-type': 'application/json'
				 },
			}).then(res => 
				 !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
	 }
}

export default ApiService
