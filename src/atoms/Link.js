import styled from 'styled-components/macro'
import { Link as RRLink } from "react-router-dom";

const LinkWrapper = styled.div`
  color: #14417b;
  text-decoration: none;
  margin:8px;
`
export const Link = (props) => {
    const { name, to } = props
    return(
        <LinkWrapper>
          <RRLink to={to}>{name}</RRLink>
        </LinkWrapper>
    )
}