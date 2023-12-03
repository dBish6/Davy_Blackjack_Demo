// *Design Imports*
import { Text, VStack, Link } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// *Component Import*
import Options from "./Options";

const Dropdown = (props) => {
  return (
    <>
      <AnimatePresence>
        {props.showDropdown && (
          <VStack
            role="menu"
            aria-label="Menu"
            as={motion.div}
            initial={{
              y: "30px",
              opacity: 0,
              transition: {
                duration: 0.38,
                type: "tween",
              },
            }}
            animate={{
              y: "0",
              opacity: 1,
              transition: {
                duration: 0.48,
                type: "tween",
              },
            }}
            exit={{
              y: "30px",
              opacity: 0,
              transition: {
                duration: 0.38,
                type: "tween",
              },
            }}
            position="absolute"
            top="1.5rem"
            right={{ base: "-3rem", md: "-3rem", xl: "unset" }}
            w="max-content"
            bgColor={
              props.isSmallerThan481 ? "#DBDBDB" : "rgba(244, 244, 244, 0.5)"
            }
            borderWidth="1px"
            borderColor="rgb(0, 0, 0)"
            borderRadius="6px"
            zIndex="dropdown"
          >
            {props.show.options ? (
              <Options
                toggleMute={props.toggleMute}
                show={props.show}
                setShow={props.setShow}
                clicked={props.clicked}
                setClicked={props.setClicked}
                isSmallerThan481={props.isSmallerThan481}
              />
            ) : (
              <>
                <Link
                  data-group
                  tabIndex="0"
                  id="navigable"
                  onClick={() => window.history.back(-1)}
                  variant="blackjackDropdown"
                  mobile={props.isSmallerThan481.toString()}
                  borderTopRadius="6px"
                >
                  <Text
                    fontSize="18px"
                    fontWeight={props.isSmallerThan481 ? "600" : "500"}
                    color="wMain"
                    opacity={props.isSmallerThan481 ? "1" : "0.8"}
                    textShadow="1px 1px 0px #000"
                    _groupHover={{
                      opacity: "1",
                    }}
                  >
                    Go Back
                  </Text>
                </Link>

                <Link
                  data-group
                  tabIndex="0"
                  id="navigable"
                  onClick={() => props.setShow({ ...props.show, cashIn: true })}
                  variant="blackjackDropdown"
                  mobile={props.isSmallerThan481.toString()}
                >
                  <Text
                    fontSize="18px"
                    fontWeight={props.isSmallerThan481 ? "600" : "500"}
                    color="wMain"
                    opacity={props.isSmallerThan481 ? "1" : "0.8"}
                    textShadow="1px 1px 0px #000"
                    _groupHover={{
                      opacity: "1",
                    }}
                  >
                    Cash In
                  </Text>
                </Link>

                <Link
                  data-group
                  tabIndex="0"
                  id="navigable"
                  onClick={() =>
                    props.setShow({
                      ...props.show,
                      gameStart: true,
                      canCancel: true,
                    })
                  }
                  variant="blackjackDropdown"
                  mobile={props.isSmallerThan481.toString()}
                >
                  <Text
                    fontSize="18px"
                    fontWeight={props.isSmallerThan481 ? "600" : "500"}
                    color="wMain"
                    opacity={props.isSmallerThan481 ? "1" : "0.8"}
                    textShadow="1px 1px 0px #000"
                    _groupHover={{
                      opacity: "1",
                    }}
                  >
                    Change Mode
                  </Text>
                </Link>

                <Link
                  data-group
                  tabIndex="0"
                  id="navigable"
                  onClick={() =>
                    props.setShow({
                      ...props.show,
                      options: true,
                    })
                  }
                  variant="blackjackDropdown"
                  mobile={props.isSmallerThan481.toString()}
                >
                  <Text
                    fontSize="18px"
                    fontWeight={props.isSmallerThan481 ? "600" : "500"}
                    color="wMain"
                    opacity={props.isSmallerThan481 ? "1" : "0.8"}
                    textShadow="1px 1px 0px #000"
                    _groupHover={{
                      opacity: "1",
                    }}
                  >
                    Options
                  </Text>
                </Link>

                <Link
                  data-group
                  tabIndex="0"
                  id="navigable"
                  onClick={() => props.setShow({ ...props.show, rules: true })}
                  variant="blackjackDropdown"
                  mobile={props.isSmallerThan481.toString()}
                >
                  <Text
                    fontSize="18px"
                    fontWeight={props.isSmallerThan481 ? "600" : "500"}
                    color="wMain"
                    opacity={props.isSmallerThan481 ? "1" : "0.8"}
                    textShadow="1px 1px 0px #000"
                    _groupHover={{
                      opacity: "1",
                    }}
                  >
                    Rules
                  </Text>
                </Link>

                <Link
                  data-group
                  href="https://github.com/dBish6/Quest_Casino_Full-Stack_App"
                  isExternal
                  variant="blackjackDropdown"
                  mobile={props.isSmallerThan481.toString()}
                  borderBottomRadius="6px"
                >
                  <Text
                    fontSize="18px"
                    fontWeight={props.isSmallerThan481 ? "600" : "500"}
                    color="wMain"
                    opacity={props.isSmallerThan481 ? "1" : "0.8"}
                    textShadow="1px 1px 0px #000"
                    _groupHover={{
                      opacity: "1",
                    }}
                  >
                    GitHub
                  </Text>
                </Link>
              </>
            )}
          </VStack>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dropdown;
