import { defineStyleConfig } from "@chakra-ui/react";

export const linkStyles = defineStyleConfig({
  baseStyle: {
    transition: "0.3s ease",
    _hover: {
      textDecoration: "none",
    },
  },
  variants: {
    simple: {
      position: "relative",
      opacity: "0.75",
      _hover: {
        opacity: "1",
        textDecoration: "underline",
        textDecorationColor: "p500",
      },
      _active: {
        top: "1.5px",
      },
    },

    blackjackDropdown: (props) => ({
      w: "100%",
      textAlign: "center",
      p: "6px 1rem",
      _hover: {
        bgColor:
          props.mobile === "true"
            ? "rgba(244, 244, 244, 0.7)"
            : "rgba(244, 244, 244, 0.6)",
      },
      _focusVisible: {
        bgColor:
          props.mobile === "true"
            ? "rgba(244, 244, 244, 0.7)"
            : "rgba(244, 244, 244, 0.6)",
      },
    }),
  },
});
