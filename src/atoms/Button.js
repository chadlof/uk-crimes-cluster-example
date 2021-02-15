import styled from 'styled-components/macro'

const ButtonWrapper = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid gray;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`
export const Button = (props) => {
  const { name, value, setValue } = props


    return(
        <ButtonWrapper onClick={() => setValue(!value)} variant="outline-primary">{name}</ButtonWrapper>
    )
}