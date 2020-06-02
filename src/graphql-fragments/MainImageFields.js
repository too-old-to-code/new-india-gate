import { graphql } from "gatsby"

export const mainImageFields = graphql`
  fragment MainImageFields on MarkdownRemark {
    frontmatter {
      mainImage {
        title
        callToAction
        description
        desktop {
          xPos
          yPos
          image {
            childImageSharp {
              fluid(maxWidth: 2000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        mobile {
          xPos
          yPos
          image {
            childImageSharp {
              fluid(maxWidth: 1500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
