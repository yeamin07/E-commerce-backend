import './App.css'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


const App = () => {
  const [title, setTitle] = useState('')
  const [editableNotes, setEditableNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const client = useQueryClient()

  const fetchAllNotes = async () => {
    const res = await fetch(`http://localhost:5000/notes`)
    return await res.json()
  }

  const createNote = async () => {
    const newNote = {
      id: Date.now() + '',
      title: title
    }
    const res = await fetch(`http://localhost:5000/notes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    return await res.json()
  }

  const removeNote = async (id) => {
    const res = await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE'
    })
    return await res.json()
  }

  const { data, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchAllNotes
  })

  const noteCreateMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await client.invalidateQueries(['notes'])
      setTitle('')
    },
  })

  const deleteNoteMutation = useMutation({
    mutationFn: removeNote,
    onSuccess: async () => {
      await client.invalidateQueries(['notes'])
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title) {
      return alert('Please fill in the title.');
    }
    noteCreateMutation.mutate()
  }


  const editHandler = (id) => {
    const toBeEditedNotes = data.find(item => item.id === id)
    setEditableNotes(toBeEditedNotes)
    setTitle(toBeEditedNotes.title)
    setIsUpdate(true)
  }

  const updateHandler = async (note) => {
    const res = await fetch(`http://localhost:5000/notes/${note.id}`,{
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({title:note.title})
    })
    return await res.json()
  }

  const updateMutation = useMutation({
    mutationFn:(note) => updateHandler(note),
    onSuccess: async () => {
      await client.invalidateQueries(['notes'])
    },
  })

  const updateSubmit = (e) => {
  e.preventDefault()
  updateMutation.mutate(editableNotes)
  setIsUpdate(false)
  }


  if (isLoading) {
    return <h1 className='App'>Loading.....</h1>
  }
  return (
    <div className='App'>
      <form >
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type='submit' onClick={isUpdate ? (e) => updateSubmit(e) : (e) => handleSubmit(e)}>
          {isUpdate ? "Update Note" : "Create Note"}
        </button>
      </form>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <button onClick={() => editHandler(item.id)}>Edit</button>
            <button onClick={() => deleteNoteMutation.mutate(item.id)} >Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App














