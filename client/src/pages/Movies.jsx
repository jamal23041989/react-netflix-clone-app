import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { onAuthStateChanged } from 'firebase/auth'

import { firebaseAuth } from '../utils/firebase-config'
import { fetchMovies, getGenres } from '../store/netflixSlice'
import { SelectGenre } from '../components/SelectGenre'
import { Slider } from '../components/Slider'
import { NotAvailable } from '../components/NotAvailable'
import { Navbar } from '../components/Navbar'

export const Movies = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState(undefined)
  const movies = useSelector(state => state.netflix.movies)
  const genres = useSelector(state => state.netflix.genres)
  const genresLoaded = useSelector(state => state.netflix.genresLoaded)

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ genres, type: 'movie' }))
  }, [genresLoaded, dispatch, genres])

  onAuthStateChanged(firebaseAuth, currentUser => {
    if (currentUser) setUser(currentUser.uid)
    else navigate('/login')
  })

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  )
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`
