import React, { useState } from 'react'

const EditForm = ({ items, setItems, inEdit, setInEdit }) => {
  const [newName, setNewName] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newCreator, setNewCreator] = useState('')
  const [newUrl, setNewUrl] = useState('')

  if (!inEdit) return <div />
  const isBook = Boolean(inEdit.author)
  const isAudio = Boolean(inEdit.creator && inEdit.url)
  const editAudio = () => {
    const newList = items.map((item) => {
      if (item === inEdit) {
        return {
          ...item,
          name: newName,
          creator: newCreator,
          url: newUrl,
        }
      }
      return item
    })
    setItems(newList)
    setInEdit(null)
    setNewName('')
    setNewCreator('')
    setNewUrl('')
  }
  const editBook = () => {
    const newList = items.map((item) => {
      if (item === inEdit) {
        return {
          ...item,
          name: newName,
          author: newAuthor,
        }
      }
      return item
    })
    setItems(newList)
    setInEdit(null)
    setNewName('')
    setNewAuthor('')
  }

  if (isBook) {
    return (
      <form onSubmit={editBook}>
        <Input label="name" value={newName} set={setNewName} id="bookName" />
        <Input label="author" value={newAuthor} set={setNewAuthor} id="bookAuthor" />
        <button type="submit" id="submitBook">edit</button>
        <button type="button" onClick={() => setInEdit(null)}>cancel</button>
      </form>
    )
  }

  if (isAudio) {
    return (
      <form onSubmit={editAudio}>
        <Input label="name" value={newName} set={setNewName} id="audioName" />
        <Input label="creator" value={newCreator} set={setNewCreator} id="audioCreator" />
        <Input label="url" value={newUrl} set={setNewUrl} id="audioUrl" />
        <button type="submit" id="submitAudio">edit</button>
        <button type="button" onClick={() => setInEdit(null)}>cancel</button>
      </form>
    )
  }
  return <div />
}

const Input = ({ label, value, set, id }) => (
  <div>
    {`${label}: `}
    <input id={id} type="text" value={value} onChange={(event) => set(event.target.value)} />
  </div>
)

export default EditForm
