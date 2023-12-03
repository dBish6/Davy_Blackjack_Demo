import { defineStyleConfig } from "@chakra-ui/react";

export const inputStyles = defineStyleConfig({
  variants: {
    primary: {
      field: {
        bgColor: "transparent",
        borderWidth: "1px",
        borderColor: "borderD",
        _hover: {
          boxShadow: "lg",
        },
        _groupHover: {
          boxShadow: "lg",
        },
        _focusVisible: {
          outline: "none",
        },
        _focus: {
          borderColor: "p500",
          boxShadow: "lg",
        },
        transition: "0.38s ease",
      },
    },
  },
});
