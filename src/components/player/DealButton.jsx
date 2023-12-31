// *Design Imports*
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import fadeInAnimations from "../../utils/animations/fadeIn";

// *Custom Hooks Imports*
import useStartGame from "../../hooks/useStartGame";
import useDeal from "../../hooks/useDeal";

const DealButton = (props) => {
  const { fadeInVar2 } = fadeInAnimations(0.9, 0.2),
    startGame = useStartGame(),
    deal = useDeal();

  return (
    <Button
      tabIndex="1"
      as={motion.button}
      variants={fadeInVar2}
      initial="hidden"
      animate="visible"
      onClick={() => {
        new Promise((resolve) => {
          if (props.playerCards.length > 0) {
            startGame();
            // Waits for card exit animation.
            setTimeout(() => {
              resolve();
            }, 1280);
          } else {
            resolve(startGame());
          }
        }).then(() => deal());
      }}
      isDisabled={props.isDealerTurn || props.showcaseRunning}
      aria-disabled={props.isDealerTurn || props.showcaseRunning}
      variant="blackjackBlue"
      w="235px"
      fontSize="18px"
    >
      Deal
    </Button>
  );
};

export default DealButton;
