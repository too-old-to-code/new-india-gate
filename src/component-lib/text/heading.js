import styled from "styled-components"

export const Heading = styled.h3`
  text-align: center;
  color: ${({ theme, color }) => color || theme?.textbox?.headingColor};
`
