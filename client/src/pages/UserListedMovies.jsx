import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { onAuthStateChanged } from 'firebase/auth'

import { getUsersLikedMovies } from '../store/netflixSlice'
import { firebaseAuth } from '../utils/firebase-config'
import { Card } from '../components/Card'
import { Navbar } from '../components/Navbar'

export const UserListedMovies = () => {
  const movies = useSelector(state => state.netflix.movies)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [email, setEmail] = useState(undefined)

  onAuthStateChanged(firebaseAuth, currentUser => {
    if (currentUser) setEmail(currentUser.email)
    else navigate('/login')
  })

  useEffect(() => {
    if (email) dispatch(getUsersLikedMovies(email))
  }, [email, dispatch])

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => (
            <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
          ))}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`
