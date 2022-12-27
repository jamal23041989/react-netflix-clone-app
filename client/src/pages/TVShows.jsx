import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { firebaseAuth } from '../utils/firebase-config'
import { fetchMovies, getGenres } from '../store/netflixSlice'
import { SelectGenre } from '../components/SelectGenre'
import { Slider } from '../components/Slider'
import { Navbar } from '../components/Navbar'

export const TVShows = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState(undefined)
  const movies = useSelector(state => state.netflix.movies)
  const genres = useSelector(state => state.netflix.genres)
  const genresLoaded = useSelector(state => state.netflix.genresLoaded)
  const dataLoading = useSelector(state => state.netflix.dataLoading)

  useEffect(() => {
    if (!genres.length) dispatch(getGenres())
  }, [dispatch, genres.length])

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ genres, type: 'tv' }))
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
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <Slider movies={movies} />
        ) : (
          <h1 className="not-available">No TV Shows avaialble for the selected genre. Please select a different genre.</h1>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`
