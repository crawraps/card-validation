import React from 'react'
import { Container } from '@mui/material'
import CardInput from './components/CardInput'

function App(): JSX.Element {
  return (
    <Container style={{ marginTop: 100 }} maxWidth="sm">
      <CardInput />
    </Container>
  )
}

export default App
