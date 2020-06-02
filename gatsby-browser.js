require("normalize.css")
require("typeface-teko")
require("typeface-nothing-you-could-do")
require("nprogress/nprogress.css")

const { theme } = require("./src/theme")
const { setConfiguration } = require("react-grid-system")

setConfiguration({
  gridColumns: 12,
  breakpoints: theme.bpoints,
})
