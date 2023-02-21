import React, { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState(props.books)

  useEffect(() => {
    let allGenres = ['all genres']
    for (let b of props.books) {
      for (let g of b.genres) {
        if (!allGenres.includes(g)) {
          allGenres.push(g)
        }
      }
    }
    setGenres(allGenres)
  }, [])

  if (!props.show) {
    return null
  }

  const selectGenre = (g) => {
    setGenre(g)
    if (g === 'all genres') {
      setBooks(props.books)
    } else {
      setBooks(props.books.filter((b) => b.genres.includes(g)))
    }
  }

  return (
    <div>
      <h2>books</h2>
      <div>in genre <b>{genre}</b></div>
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
      <div>
        {genres.map((g) => (<button key={g} onClick={() => selectGenre(g)}>{g}</button>))}
      </div>
    </div>
  )
}

export default Books
