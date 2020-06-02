import "../styles/global.scss"
import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Navbar, NavbarLayoutMulti, NavbarItem, MobileMenu } from "@custom-lib"

import { Controller, Scene } from "react-scrollmagic"

import Img from "gatsby-image"
import { Footer } from "../components/footer"
import { ThemeProvider } from "styled-components"
import { theme } from "../theme.js"
import { ScreenClassProvider } from "react-grid-system"
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock"

import styled from "styled-components"

// Style alterations
const NavItemInner = styled.div`
  text-align: center;
  padding: 2px 4px;
  position: relative;
  z-index: 1;
  &:after {
    pointer-events: none;
    content: "";
    z-index: 0;
    position: absolute;
    bottom: -5px;
    transform: translateY(7px);
    opacity: 0;
    left: 0;
    right: 0;
    border-bottom: 3px solid #0a98d8;
    transition: all 0.3s;
  }
  &:hover:after,
  .active-link &:after {
    pointer-events: none;
    content: "";
    opacity: 1;
    transform: translateY(0);
  }
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`

const PAGES = [
  { path: "/", name: "Home", desktop: true, mobile: true },
  { path: "/our-menu", name: "Our menu", desktop: true, mobile: true },
  { path: "/find-us", name: "Find us", desktop: true, mobile: true },
]



const MobileMenuWithContent = ({ isOpen }) => {
  return (
    <MobileMenu isOpen={isOpen}>
      {PAGES.filter(page => page.mobile).map(page => (
        <MenuLink key={page.path} to={page.path} style={{ margin: "15px" }}>
          {page.name}
        </MenuLink>
      ))}
    </MobileMenu>
  )
}

const navbarMenuContent = () => {
  return PAGES.filter(page => page.desktop).map(page => (
    <MenuLink to={page.path} activeClassName="active-link" key={page.name}>
      <NavbarItem key={page.path}>
        <NavItemInner>{page.name}</NavItemInner>
      </NavbarItem>
    </MenuLink>
  ))
}

MobileMenuWithContent.propTypes = {
  isOpen: PropTypes.bool,
}

const Layout = ({ children, pageContext }) => {
  console.log(pageContext)
  const [burgerMenuIsActive, burgerMenuToggleActive] = useState(false)
  const openMenu = useRef()

  // close the menu when the page changes
  useEffect(() => {
    burgerMenuToggleActive(false)
  }, [children])

  // Close the mobile menu if the screen is resized while the menu is open
  useEffect(() => {
    const handleResize = () => burgerMenuToggleActive(false)
    if (typeof window !== "undefined")
      window.addEventListener("resize", handleResize)
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("resize", handleResize)
    }
  })

  // ensure the main screen can't be scrolled when the menu is open
  useEffect(() => {
    let targetElement = openMenu
    if (burgerMenuIsActive) {
      disableBodyScroll(targetElement)
    } else {
      enableBodyScroll(targetElement)
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [burgerMenuIsActive])

  const data = useStaticQuery(graphql`
    query GlobalLayoutQuery {
      siteData: markdownRemark(
        frontmatter: { templateKey: { eq: "site-data" } }
      ) {
        frontmatter {
          socialmedia
          addressLine
          phoneNumber
          email
          badges {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      altLogo: file(relativePath: { eq: "alt-logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <ScreenClassProvider>
        <Controller>
          <Scene
            classToggle="second-color"
            triggerHook="0"
            offset={pageContext.special ? "-50px" : "50px"}
          >
            {progress => (
              <div>
                <Navbar
                  style={{
                    boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.125)",
                    letterSpacing: "1px",
                    paddingRight: "30px",
                    fontSize: "1em",
                  }}
                  burgerMenuStyle="spin"
                  burgerMenuIsActive={burgerMenuIsActive}
                  toggleMenu={() => burgerMenuToggleActive(!burgerMenuIsActive)}
                >
                  <NavbarLayoutMulti
                    itemsPosition="right"

                    mobileMenu={
                      <MobileMenuWithContent isOpen={burgerMenuIsActive} />
                    }
                  >
                    {navbarMenuContent()}
                  </NavbarLayoutMulti>
                </Navbar>
              </div>
            )}
          </Scene>
        </Controller>
        {children}
        <Footer siteData={data.siteData.frontmatter} />
      </ScreenClassProvider>
    </ThemeProvider>
  )
}

export default Layout
