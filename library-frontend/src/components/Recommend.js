import React, { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (props.user && props.user.favoriteGenre) {
      setGenre(props.user.favoriteGenre)
      setBooks(props.books.filter((b) => b.genres.includes(props.user.favoriteGenre)))
    }
  }, [])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>{genre}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
