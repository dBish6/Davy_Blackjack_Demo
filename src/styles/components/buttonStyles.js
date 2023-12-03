import { defineStyleConfig } from "@chakra-ui/react";

export const buttonStyles = defineStyleConfig({
  variants: {
    primary: {
      bgColor: "bd400",
      color: "dwordMain",
      boxShadow: "md",
      _hover: {
        bgColor: "bd300",
        color: "wMain",
        boxShadow: "lg",
      },
      _focusVisible: {
        bgColor: "bd300",
        color: "wMain",
        borderWidth: "1px",
        borderColor: "p500",
        boxShadow: "lg",
      },
      _active: {
        bgColor: "g500",
      },
      transition: "0.38s ease",
    },
    secondary: (props) => ({
      bgColor: "transparent",
      color: "dwordMain",
      borderWidth: "1px",
      borderColor: "borderD",
      boxShadow: "md",
      _hover: {
        bgColor: "bd400",
        color: "wMain",
        boxShadow: "lg",
      },
      _focusVisible: {
        bgColor: "bd400",
        color: "wMain",
        borderWidth: props.is_invalid === "true" && "1px", // is_invalid is from Davy Blackjack.
        borderColor: props.is_invalid === "true" && "p500",
        boxShadow: "lg",
      },
      _active: {
        bgColor: "g500",
      },
      transition: "0.38s ease",
    }),
    transparency: {
      bgColor: "transparent",
      color: "dwordMain",
      opacity: "0.7",
      _hover: {
        opacity: "0.85",
        color: "wMain",
      },
      _active: {
        opacity: "1",
      },
      transition: "0.38s ease",
    },

    exit: {
      bgColor: "r500",
      color: "dwordMain",
      _hover: {
        bgColor: "r600",
        color: "wMain",
        boxShadow: "lg",
      },
      _active: {
        opacity: 0.6,
      },
      transition: "0.38s ease",
    },

    blackjackBlue: {
      position: "relative",
      bgColor: "rgba(69, 112, 228, 0.9)",
      color: "rgba(0, 0, 0, 0.75)",
      borderWidth: "1px",
      borderBottomWidth: "3px",
      borderColor: "rgba(0, 0, 0, 0.75)",
      boxShadow: "md",
      _hover: {
        bgColor: "#4570E4",
        color: "#000",
        borderColor: "#000",
        boxShadow: "lg",
      },
      _focusVisible: {
        bgColor: "#4570E4",
        color: "#000",
        borderColor: "#000",
        boxShadow: "lg",
        outline: "auto",
      },
      _active: {
        bgColor: "#1E4ECF",
        borderBottomWidth: "2px",
        top: "2px",
      },
    },
    blackjackWhite: {
      position: "relative",
      bgColor: "#ECECEC",
      color: "rgba(0, 0, 0, 0.75)",
      borderWidth: "1px",
      borderBottomWidth: "3px",
      borderColor: "rgba(0, 0, 0, 0.75)",
      boxShadow: "md",
      _hover: {
        bgColor: "#F4F4F4",
        color: "#000",
        borderColor: "#000",
        boxShadow: "lg",
      },
      _focusVisible: {
        bgColor: "#F4F4F4",
        color: "#000",
        borderColor: "#000",
        boxShadow: "lg",
        outline: "auto",
      },
      _active: {
        bgColor: "#FFF",
        borderBottomWidth: "2px",
        top: "2px",
      },
    },
    blackjackGreen: {
      position: "relative",
      bgColor: "rgba(73, 181, 99, 0.9)",
      color: "rgba(0, 0, 0, 0.75)",
      borderWidth: "1px",
      borderBottomWidth: "3px",
      borderColor: "rgba(0, 0, 0, 0.75)",
      boxShadow: "md",
      _hover: {
        bgColor: "g500",
        color: "#000",
        borderColor: "#000",
        boxShadow: "lg",
      },
      _focusVisible: {
        bgColor: "g500",
        color: "#000",
        borderColor: "#000",
        boxShadow: "lg",
        outline: "auto",
      },
      _active: {
        bgColor: "g600",
        borderBottomWidth: "2px",
        top: "2px",
      },
    },
    blackjackRed: {
      position: "relative",
      bgColor: "rgba(227, 88, 85, 0.9)",
      color: "rgba(0, 0, 0, 0.75)",
      borderWidth: "1px",
      borderBottomWidth: "3px",
      borderColor: "rgba(0, 0, 0, 0.75)",
      boxShadow: "md",
      _hover: {
        bgColor: "r500",
        color: "#000",
        borderColor: "#000",
        boxShadow: "lg",
      },
      _focusVisible: {
        bgColor: "r500",
        color: "#000",
        borderColor: "#000",
        boxShadow: "lg",
        outline: "auto",
      },
      _active: {
        bgColor: "r600",
        borderBottomWidth: "2px",
        top: "2px",
      },
    },
  },
});
