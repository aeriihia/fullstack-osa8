import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const all_authors = useQuery(ALL_AUTHORS)
  const all_books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded
      window.alert("New book added: " + book.author.name + ", " + book.title + ", " + book.published + ", " + book.genres.join(", "))
    }
  })

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
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} authors={all_authors.data.allAuthors} token={token} />

      <Books show={page === 'books'} books={all_books.data.allBooks} />

      {!token && <LoginForm show={page === 'login'} setPage={setPage} setToken={setToken} />}

      {token && <NewBook show={page === 'add'} />}

      {token && <Recommend show={page === 'recommend'} books={all_books.data.allBooks} user={user.data.me} />}
    </div>
  )
}

export default App
