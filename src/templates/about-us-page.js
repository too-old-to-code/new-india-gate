import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { AppParallaxText } from "../components/parallax-image-text"
import { PaddedBox, FlexBox, Heading, PreviewSafeImage } from "@custom-lib"
import { AppParallax } from "../components/app-parallax"
import { AppTextBox } from "../components/app-text-box"
import styled from "styled-components"

const InnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  @media (max-width: ${({ theme }) => theme?.bpoints[0]}px) {
    justify-content: center;
  }
`

const ProfileFlexBox = styled(FlexBox)`
  @media (max-width: ${({ theme }) => theme?.breakpoints?.maxMobile}) {
    flex-direction: column;
    font-size: 1em;
    justify-content: center !important;
    padding: 10px;
  }
`

const Profile = ({ profile }) => {
  return (
    <div
      css={`
        width: 300px;
        position: relative;
        border: 2px solid white;
        padding: 30px;
        padding-bottom: 0px;
        background: var(--not-quite-white);
        align-self: stretch;
        margin: 0 30px;
        margin-top: 80px;
        margin-bottom: 50px;
        @media (max-width: ${({ theme }) => theme?.breakpoints?.maxMobile}) {
          align-self: inherit;
          margin-left: 0;
          margin-right: 0;
        }
      `}
    >
      <div
        key={profile.employee.name}
        css={`
          position: relative;
          top: -80px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #708080;
        `}
      >
        <div
          css={`
            width: 200px;
            border-radius: 50%;
            border: solid 2px var(--not-quite-white);
            overflow: hidden;
            transition: all 0.5s;
            &:hover {
              filter: grayscale(0%);
            }
          `}
        >
          <PreviewSafeImage
            image={profile.employee.thumbnail}
            alt={profile.employee.name}
            position={[50, 50]}
          />
        </div>
      </div>
      <div
        css={`
          position: relative;
          top: -50px;
          text-align: center;
        `}
      >
        <p
          css={`
            font-size: 1.1em;
            font-weight: bold;
            margin: 3px;
            color: var(--not-quite-black);
          `}
        >
          {profile.employee.name}
        </p>
        <p
          css={`
            font-size: 1.1em;
            font-style: italic;
            margin: 3px;
          `}
        >
          {profile.employee.position}
        </p>
        <div>
          <p
            css={`
              color: var(--not-quite-black);
            `}
          >
            {profile.employee.blurb}
          </p>
        </div>
      </div>

      <div
        css={`
          position: absolute;
          left: 0;
          right: 0;
          bottom: -10px;
          text-align: center;
        `}
      >
        <Link
          to={profile.slug}
          css={`
            background: #0a99d8;
            color: white;
            padding: 15px;
            border: none;
            margin: auto;
            text-decoration: none;
          `}
        >
          Read more
        </Link>
      </div>
    </div>
  )
}

export const AboutUsPageTemplate = ({
  mainImage,
  intro,
  ourTeam,
  employees,
}) => {
  return (
    <React.Fragment>
      <AppParallax mainImage={mainImage}>
        <InnerContainer>
          <AppParallaxText text={mainImage?.text} />
        </InnerContainer>
      </AppParallax>
      <PaddedBox horizontal="40" vertical="40">
        <AppTextBox heading={intro.heading} text={intro.text} />
      </PaddedBox>
      <PaddedBox
        horizontal="40"
        vertical="40"
        style={{ background: "#06426a" }}
      >
        <Heading as="h2" color="white">
          Our people offer unrivalled service and knowledge
        </Heading>
      </PaddedBox>
      <PaddedBox horizontal="40" vertical="40">
        <AppTextBox heading={ourTeam.heading} text={ourTeam.text} />
      </PaddedBox>
      <ProfileFlexBox
        horizontalPad="40"
        fontSize="1em"
        direction="row"
        justify="space-around"
        style={{ background: "#06426a", flexWrap: "wrap" }}
      >
        {employees.map(employee => (
          <Profile profile={employee} key={employee.employee.name} />
        ))}
      </ProfileFlexBox>
    </React.Fragment>
  )
}

const AboutUsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { edges } = data.allMarkdownRemark
  const employees = edges.map(edge => ({
    slug: edge.node.fields.slug,
    employee: edge.node.frontmatter,
  }))
  console.log(employees)

  return (
    <AboutUsPageTemplate
      mainImage={frontmatter.mainImage}
      intro={frontmatter.introduction}
      ourTeam={frontmatter.ourTeam}
      employees={employees}
    />
  )
}

export default AboutUsPage

export const PageQuery = graphql`
  query AboutUsPageTemplate {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "profile" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            blurb
            name
            position
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "about-us-page" } }) {
      ...IntroFields
      ...MainImageFields
      ...OurTeamFields
    }
  }
`

AboutUsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}
