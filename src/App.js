import React, { useState, useEffect } from 'react'

const App = ({ booklist }) => {
    const [books, setBooks] = useState(booklist)
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const addBook = (event) => {
        event.preventDefault()
        setBooks(books.concat(
            {
                name,
                author,
            },
        ))
    }

    return (
        <div>
            <form onSubmit={addBook}>
                <div>
          Title:
                    {' '}
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
          Author:
                    {' '}
                    <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
                </div>
                <div>
                    <button type="submit">add book</button>
                </div>
            </form>

            <ul>
                {books.map((book) => <li key={book.id}>{book.name}</li>)}
            </ul>
        </div>
    )
}


export default App
