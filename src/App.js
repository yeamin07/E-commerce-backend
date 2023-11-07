import './App.css'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const [title, setTitle] = useState('')
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

  if (isLoading) {
    return <h1 className='App'>Loading.....</h1>
  }
  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type='submit' >Create note</button>
      </form>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <button onClick={() => deleteNoteMutation.mutate(item.id)} >Remove note</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App