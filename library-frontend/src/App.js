import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery, useApolloClient } from '@apollo/client'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const all_authors = useQuery(ALL_AUTHORS)
  const all_books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  if (all_authors.loading || all_books.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} authors={all_authors.data.allAuthors} token={token} />

      <Books show={page === 'books'} books={all_books.data.allBooks} />

      {!token && <LoginForm show={page === 'login'} setPage={setPage} setToken={setToken} />}

      {token && <NewBook show={page === 'add'} />}
    </div>
  )
}

export default App
