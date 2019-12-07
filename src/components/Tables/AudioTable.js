import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Popup from 'reactjs-popup'
import audioService from '../../services/audioService'
import Player from '../Player'

const AudioTable = ({ setData, data, render }) => {
  const [inEdit, setInEdit] = useState(null)
  const [name, setName] = useState('')
  const [creator, setCreator] = useState('')
  const [url, setUrl] = useState('')
  const columns = [
    {
      name: 'creator',
      selector: 'creator',
      sortable: true,
    },
    {
      name: 'name',
      selector: 'name',
      sortable: true,
    },
  ]

  if (!render) return null

  const edit = (event) => {
    event.preventDefault()
    const newAudio = {
      ...inEdit,
      name,
      creator,
    }
    audioService.update(newAudio, inEdit.id)
      .then((updated) => {
        const newData = data.map((audio) => {
          if (audio === inEdit) return updated
          return audio
        })
        setData(newData)
      })
    setInEdit(null)
    setName('')
    setCreator('')
  }
  return (
    <div>
      <Popup modal open={Boolean(inEdit)} onClose={() => setInEdit(null)}>
        <form onSubmit={edit}>
          New name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          <br />
          New creator:
          <input type="text" value={creator} onChange={(event) => setCreator(event.target.value)} />
          <br />
          <button type="submit">edit</button>
        </form>
      </Popup>
      <DataTable onRowDoubleClicked={(item) => setInEdit(item)} selectableRows title="Audio (click to play)" columns={columns} data={data}
        onRowClicked={(item) => setUrl(item.url)} />
      <Player url={url} />
    </div>
  )
}

export default AudioTable
