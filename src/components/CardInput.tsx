import { Grid, TextField } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

interface cardInputProps {
  children?: JSX.Element[] | JSX.Element
}
interface infoState {
  number: {
    value: string
    isValid: boolean
  }
  date: {
    value: string
    isValid: boolean
  }
  cvv: {
    value: string
    isValid: boolean
  }
  amount: {
    value: string
    isValid: boolean
  }
}
type buttonState = 'normal' | 'error' | 'success'

export default function CardInput(props: cardInputProps): JSX.Element {
  const defaultInfoState: infoState = {
    number: { value: '', isValid: true },
    date: { value: '', isValid: true },
    cvv: { value: '', isValid: true },
    amount: { value: '', isValid: true },
  }
  const [info, setInfo] = React.useState<infoState>(defaultInfoState)
  const [dataHint, setDataHint] = React.useState<string | null>('')
  const [buttonState, setButtonState] = React.useState<buttonState>('normal')

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let number: string = event.target.value.trim()
    let newInfo: infoState = Object.assign({}, info)

    if (number.length !== 16 || isNaN(+number) || !Number.isInteger(+number)) {
      newInfo.number.isValid = false
    } else {
      newInfo.number.value = number
      newInfo.number.isValid = true
    }
    setInfo(newInfo)
  }
  const handleCVVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let cvv: string = event.target.value.trim()
    let newInfo: infoState = Object.assign({}, info)

    if (cvv.length !== 3 || isNaN(+cvv) || !Number.isInteger(+cvv)) {
      newInfo.cvv.isValid = false
    } else {
      newInfo.cvv.isValid = true
      newInfo.cvv.value = cvv
    }
    setInfo(newInfo)
  }
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newInfo: infoState = Object.assign({}, info)
    let date = event.target.value.trim()
    date = date + (date.length === 2 && info.date.value.length !== 3 ? '/' : '')
    newInfo.date.value = date

    if (
      date &&
      +date.split('/')[0] > 0 &&
      +date.split('/')[0] < 13 &&
      +date.split('/')[1] < 3000 &&
      +date.split('/')[1] > 2020
    ) {
      newInfo.date.isValid = true
    } else {
      newInfo.date.isValid = false
    }

    setInfo(newInfo)
  }
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newInfo: infoState = Object.assign({}, info)
    let amount = event.target.value.trim()

    if (isNaN(+amount) || !Number.isInteger(+amount) || amount.length === 0) {
      newInfo.amount.isValid = false
    } else {
      newInfo.amount.value = amount
      newInfo.amount.isValid = true
    }
    setInfo(newInfo)
  }
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (
      info.number.isValid &&
      info.cvv.isValid &&
      info.date.isValid &&
      info.amount.isValid
    ) {
      setButtonState('success')
      post({
        number: info.number.value,
        date: info.date.value,
        cvv: info.cvv.value,
        amount: info.amount.value,
      })
    } else {
      setButtonState('error')
    }

    event.preventDefault()
  }
  async function post(data: Object) {
    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Request complited`, data)
      })
      .catch((err) => {
        console.error(`Error occurred while posting data ${err}`)
      })
  }

  return (
    <form onSubmit={submitHandler} name="cardForm">
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <TextField
            id="cardNumber"
            label="Card number"
            variant="outlined"
            fullWidth
            required
            onChange={handleNumberChange}
            error={!info.number.isValid}
            helperText={info.number.isValid ? null : '16-digit number'}
            name="cardNumber"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="expDate"
            label="Date of expiration"
            variant="outlined"
            onFocus={() => {
              setDataHint('mm/yyyy')
            }}
            onBlur={() => {
              setDataHint(null)
            }}
            onChange={handleDateChange}
            value={info.date.value}
            helperText={dataHint}
            required
            error={!info.date.isValid}
            fullWidth
            name="expDate"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="cvv"
            label="CVV"
            variant="outlined"
            fullWidth
            required
            onChange={handleCVVChange}
            error={!info.cvv.isValid}
            helperText={info.cvv.isValid ? null : 'Invalid format'}
            name="cvv"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="amount"
            label="Amount"
            variant="outlined"
            fullWidth
            required
            onChange={handleAmountChange}
            error={!info.amount.isValid}
            helperText={info.amount.isValid ? null : 'Invalid format'}
            name="amount"
          />
        </Grid>

        <Grid item xs={0} sm />
        <Grid container item xs={12} sm={6} justifyContent="center">
          <Button type="submit" state={buttonState}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={0} sm />
      </Grid>
    </form>
  )
}

const Button = styled.button<buttonProps>`
   {
    background-color: ${({ state }) =>
      state === 'normal'
        ? '#aa3fdc'
        : state === 'error'
        ? '#f04557'
        : '#48ea59'};
    border: none;
    height: 44px;
    color: #fff;
    border-radius: 6px;
    width: 100%;
    font-size: 1.05em;
    cursor: pointer;
    transition: background-color 0.1s ease-in;

    &:hover {
      opacity: 0.9;
    }
    &:active {
      transform: scale(0.97);
    }
    &:focus {
      opacity: 0.9;
      outline: none;
    }
  }
`
interface buttonProps extends React.HTMLProps<HTMLButtonElement> {
  state: buttonState
}
