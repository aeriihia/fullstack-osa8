import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const all_authors = useQuery(ALL_AUTHORS)
  const all_books = useQuery(ALL_BOOKS)

  if (all_authors.loading || all_books.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={all_authors.data.allAuthors} />

      <Books show={page === 'books'} books={all_books.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
