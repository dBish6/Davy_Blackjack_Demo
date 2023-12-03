import { extendTheme } from "@chakra-ui/react";

// *Component Imports*
import { buttonStyles as Button } from "./components/buttonStyles";
import { linkStyles as Link } from "./components/linkStyles";
import { inputStyles as Input } from "./components/inputStyles";

// Blackjack Theme
const blackjackTheme = extendTheme({
  // Global Overrides
  styles: {
    global: {
      body: {
        bg: "none",
        color: "dwordMain",
        overflowX: "hidden !important",
      },
    },
  },
  components: {
    Text: {
      variants: {
        blackjack: {
          color: "wMain",
          textShadow: "2px 1px 0px #000000",
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "p400",
        fontWeight: "400",
      },
      variants: {
        blackjack: {
          color: "wMain",
          textShadow: "2px 1px 0px #000000",
        },
      },
    },
    Container: {
      baseStyle: {
        padding: "0",
      },
    },
    FormLabel: {
      baseStyle: {
        mb: "6px",
      },
    },
    Divider: {
      baseStyle: {
        border: "1px solid borderD",
      },
    },
    Button,
    Link,
    Input,
  },
  colors: {
    // Primary Colours
    p400: "#FEC422",
    p500: "#FFBB00",

    // Background Dark
    bd300: "#8A93A7",
    bd400: "#778197",
    bd700: "#424B5E",
    bd800: "#323948",

    // Accent 1
    g500: "#49B563",
    g600: "#3E9A53",

    // Accent 2
    r400: "#EA8180",
    r500: "#E35855",
    r600: "#DC302D",

    // Whites
    wMain: "#F4F4F4",

    // Blacks
    bMain: "#363636",

    dwordMain: "#E0E2EA",

    borderD: "rgba(244, 244, 244, 0.2)",
  },
  fonts: {
    body: `'Hind Siliguri', sans-serif`,
    heading: `'Lobster', cursive`,
    roboto: `'Roboto', sans-serif`,
    fugaz: `'Fugaz One', cursive`,
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default blackjackTheme;
