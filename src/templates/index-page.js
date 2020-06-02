import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { AppParallaxText } from "../components/parallax-image-text"
import {
  CheckerDuo,
  PopIn,
  FlexBox,
  Heading,
  PreviewSafeImage,
} from "@custom-lib"
import styled from "styled-components"
import { AppParallax } from "../components/app-parallax"
import { AppTextWithBullets } from "../components/app-text-with-bullets"
import Img from 'gatsby-image'

const MarginOnMobile = styled.div`
  @media (max-width: ${({ theme }) => theme?.bpoints[0]}px) {
    margin: 20px 5px;
  }
`

const TextOnStroke = ({image}) => {
  return (
    <div css={`
      position: relative;
      width: 300px;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
    `}>
      <PreviewSafeImage
        image={image}
        alt="brush stroke"
        style={{position: 'absolute', width: '100%'}}
      />
      <h1 css={`
        z-index: 1;
        position: relative;
        text-align: center;
        font-family: "Nothing you could do";
        font-size: 42px;
        font-weight: bold;
        color: #FDFFA7;
        // text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black;

      `}>India Gate Restaurant</h1>
    </div>
  )
}

const InnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  @media (max-width: ${({ theme }) => theme?.bpoints[0]}px) {
    justify-content: center;
    align-items: flex-end;
  }
`

const CallToAction = styled(Link)`
  padding: 10px 20px;
  font-size: 1.2em;
  border-radius: 0;
  border: none;
  // background-color: #0a98d8;
  background-color: rgb(6, 66, 106);
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme?.bpoints[0]}px) {
    min-width: 150px;
    // height: 60px;
    font-size: 1.5em;
    margin-bottom: 50px;
  }
`

export const IndexPageTemplate = ({
  mainImage,
  intro,
  categoryPitches,
  bulletPoints,
  brush
}) => {
  console.log(brush)
  return (
    <React.Fragment>
      <AppParallax mainImage={mainImage}>
      <InnerContainer>
          <TextOnStroke image={brush}/>
          </InnerContainer>

        <InnerContainer>
          <CallToAction to="/contact-us">{mainImage.callToAction}</CallToAction>
        </InnerContainer>
      </AppParallax>
      <AppTextWithBullets intro={intro} bulletPoints={bulletPoints} />

      {categoryPitches &&
        categoryPitches.map((pitch, index) => {
          return (
            <MarginOnMobile key={pitch.title}>
              <CheckerDuo
                image={
                  <PreviewSafeImage
                    image={pitch.image}
                    alt={pitch.title}
                    position={[50, 50]}
                  />
                }
                height="350px"
                textPosition={index % 2 === 0 ? "right" : "left"}
                backgroundColor="rgba(50,70,80, .85)"
              >
                <FlexBox
                  verticalPad="50"
                  horizontalPad="40"
                  style={{ color: "var(--not-quite-white)" }}
                >
                  <PopIn>
                    <div style={{ maxWidth: "400px" }}>
                      <Heading
                        as="h2"
                        style={{ margin: 0, color: "var(--not-quite-white)" }}
                      >
                        {pitch.title}
                      </Heading>
                      <p>{pitch.text}</p>
                    </div>
                  </PopIn>
                </FlexBox>
              </CheckerDuo>
            </MarginOnMobile>
          )
        })}
    </React.Fragment>
  )
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <IndexPageTemplate
      mainImage={frontmatter.mainImage}
      intro={frontmatter.introduction}
      categoryPitches={frontmatter.categorypitch}
      bulletPoints={frontmatter.bulletPoints}
      brush={data.brush}
    />
  )
}

export default IndexPage

export const PageQuery = graphql`
  query IndexPageTemplate {
    brush: file(relativePath: { eq: "brush-stroke.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      ...MainImageFields
      ...IntroFields
      ...CategorypitchFields
      ...BulletPointsFields
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}
