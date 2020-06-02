import React from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"

export const PreviewSafeImage = ({
  image,
  alt = "image",
  position = [70, 100],
  style
}) => {
  const [x, y] = position
  return image.childImageSharp ? (
    <Img
      fluid={image.childImageSharp.fluid}
      alt={alt}
      style={style}
      imgStyle={{ objectFit: "cover", objectPosition: `${x}% ${y}%` }}
    />
  ) : (
    <img
      src={image}
      alt={alt}
      style={{
        ...style,
        objectFit: "cover",
        objectPosition: `${x}% ${y}%`,
        height: "100%",
        width: "100%",
      }}
    />
  )
}

PreviewSafeImage.propTypes = {
  image: PropTypes.any,
  alt: PropTypes.string,
  position: PropTypes.array,
  style: PropTypes.any
}
