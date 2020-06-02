import React from "react"
import styled from "styled-components"
import { Timeline, Tween } from "react-gsap"

export const ParallaxImageText = styled.div`
  padding-top: calc(${({ theme }) => theme?.navbar?.height} + 20px);
  font-family: "Nothing you could do";
  font-size: 36px;
  font-weight: bold;
  color: rgb(160, 216, 123);
  position: relative;
  text-shadow: 0px 1px 1px black;
  text-align: center;
  @media (max-width: ${({ theme }) => theme?.bpoints[0]}px) {
    font-size: 2.5em;
  }
`

export const AppParallaxText = ({ text }) => {
  return (
    <ParallaxImageText>
      <Timeline>
        {text.map(({ words, animate, animation, color }) => {
          return <div key={words} style={{ color }}>
              {words}
            </div>
        })}
      </Timeline>
    </ParallaxImageText>
  )
}
