/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import modalAnimations from "../../utils/animations/modalAnimations";

import useKeyboardHelper from "../../hooks/useKeyboardHelper";

const ModalTemplate = (props) => {
  const {
    show,
    setShow,
    animation,
    objName,
    isUsingKeyboard,
    noExit,
    loading,
    children,
    ...rest
  } = props;

  const modalRef = useRef(null);
  const { modelBackdrop, modelFadeDown, modelFadeUp } =
    modalAnimations(animation);

  const {
    handleKeyEscape,
    initializeKeyboardLock,
    handleKeyboardLockOnElement,
  } = useKeyboardHelper();

  useEffect(() => {
    if (show && isUsingKeyboard) {
      const modalElement = modalRef.current;

      const { firstFocusableElement, lastFocusableElement } =
        initializeKeyboardLock(modalRef);
      setTimeout(() => {
        firstFocusableElement.focus();
      }, 500);

      const keyboardListenerWrapper = (event) => {
        handleKeyEscape(event, { setShow, objKey: objName });
        handleKeyboardLockOnElement(event, {
          firstFocusableElement,
          lastFocusableElement,
        });
      };

      modalElement.addEventListener("keydown", keyboardListenerWrapper);
      return () =>
        modalElement.removeEventListener("keydown", keyboardListenerWrapper);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* *Backdrop* */}
          <Box
            aria-label="Backdrop"
            as={motion.div}
            variants={modelBackdrop}
            animate={modelBackdrop.visible}
            initial={modelBackdrop.hidden}
            exit={modelBackdrop.hidden}
            key="backdrop"
            onClick={() => {
              if (noExit === true) {
                return;
              } else {
                objName
                  ? setShow((prev) => ({
                      ...prev,
                      [objName]: false,
                    }))
                  : setShow(false);
              }
            }}
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="100vw"
            minH="100vh"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            backdropBlur="2px"
            zIndex="overlay"
            pointerEvents={loading && "none"}
          />

          {/* *Modal* */}
          <Container
            tabIndex="-1"
            aria-label="Modal"
            as={motion.div}
            variants={animation.type === "down" ? modelFadeDown : modelFadeUp}
            ref={modalRef}
            animate={
              animation.type === "down"
                ? modelFadeDown.visible
                : modelFadeUp.visible
            }
            initial={
              animation.type === "down"
                ? modelFadeDown.hidden
                : modelFadeUp.hidden
            }
            exit={
              animation.type === "down"
                ? modelFadeDown.hidden
                : modelFadeUp.exit
            }
            key="modal"
            zIndex="modal"
            position="fixed"
            top="50%"
            left="50%"
            p="1.5rem"
            backgroundColor="bd700"
            borderWidth="1px"
            borderColor="borderD"
            borderRadius="6px"
            {...rest}
          >
            {children}
          </Container>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalTemplate;
