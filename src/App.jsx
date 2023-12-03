/* Blackjack Game v1.5.15

   Author: David Bishop
   Creation Date: March 27, 2023
*/

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

// *Design Imports*
import {
  Box,
  chakra,
  Flex,
  Image,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import tableImg from "./assets/images/Blackjack_Table_AdobeStock.jpeg";
import backOfCard from "./assets/images/back_of_card.png";
import { motion } from "framer-motion";
import fadeInAnimations from "./utils/animations/fadeIn";

// *Custom Hooks Imports*
import useChangeBackground from "./hooks/useChangeBackground";
import useCardSoundEffect from "./hooks/useCardSoundEffect";
import useDealerTurn from "./hooks/useDealerTurn";

// *Utility Import*
import waitForAceDecision from "./utils/waitForAceDecision";

// *Component Imports*
import GameStartModal from "./components/modals/GameStartModal";
import CashInModal from "./components/modals/cashInModal";
import Header from "./components/partials/header/Header";
import Dealer from "./components/Dealer";
import Player from "./components/player/Player";
import AcePrompt from "./components/AcePrompt";
import FloatingBet from "./components/popups/Bet";
import WinnerPopup from "./components/popups/Winner";
import RulesOverlay from "./components/rulesOverlay/RulesOverlay";
import Footer from "./components/partials/Footer";

// *Redux Imports*
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_SCORE,
  DETERMINE_WINNER,
  DEALER_TURN,
} from "./redux/blackjackSlice";
import {
  selectGameType,
  selectDealerCards,
  selectDealerFaceDownScore,
  selectDealerScore,
  selectDealerTurn,
  selectDealerStanding,
  selectDealerHasNatural,
  selectPlayerCards,
  selectPlayerBet,
  selectPlayerScore,
  selectPlayerInitialHit,
  selectPlayerStanding,
  selectPlayerHasNatural,
  selectStreak,
  selectWallet,
  selectWinner,
} from "./redux/blackjackSelectors";

function App() {
  // Other
  const { fadeInVar2 } = fadeInAnimations(0.8),
    [show, setShow] = useState({
      gameStart: false,
      canCancel: false,
      cashIn: false,
      options: false,
      rules: false,
    }),
    [isUsingKeyboard, setIsUsingKeyboard] = useState(false),
    [isWidthSmallerThan1429] = useMediaQuery("(max-width: 1429px)"),
    [isHeightSmallerThan844] = useMediaQuery("(max-height: 844px)"),
    dispatch = useDispatch(),
    gameType = useSelector(selectGameType),
    winner = useSelector(selectWinner);

  // Dealer
  const [dealerViewWidthOnMoreCards, setDealerViewWidthOnMoreCards] =
      useState("30.6vw"),
    dealerTurn = useDealerTurn(),
    dealerCards = useSelector(selectDealerCards),
    dealerFaceDownScore = useSelector(selectDealerFaceDownScore),
    dealerScore = useSelector(selectDealerScore),
    isDealerTurn = useSelector(selectDealerTurn),
    dealerStanding = useSelector(selectDealerStanding),
    dealerHasNatural = useSelector(selectDealerHasNatural);

  // Player
  const [playerViewWidthOnMoreCards, setPlayerViewWidthOnMoreCards] =
      useState("30.6vw"),
    [animate, setAnimate] = useState({ playerBet: false, winStreak: false }),
    [showAcePrompt, setShowAcePrompt] = useState(false),
    [madeAceDecision, setMadeAceDecision] = useState(false),
    [secureAceOnNatural, setSecureAceOnNatural] = useState(false),
    [wants11, setWants11] = useState(0),
    playerCards = useSelector(selectPlayerCards),
    playerBet = useSelector(selectPlayerBet),
    playerScore = useSelector(selectPlayerScore),
    hasPlayerHit = useSelector(selectPlayerInitialHit),
    playerStanding = useSelector(selectPlayerStanding),
    playerHasNatural = useSelector(selectPlayerHasNatural),
    winStreak = useSelector(selectStreak),
    wallet = useSelector(selectWallet);

  useChangeBackground(tableImg);
  const toggleMute = useCardSoundEffect(playerCards, dealerCards);

  useEffect(() => {
    setShow({ ...show, gameStart: true, canCancel: false });
  }, []);

  // To capture if the user is using the keyboard to navigate to set listeners when needed.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab" || event.key === "Escape") {
        setIsUsingKeyboard(true);
        document.removeEventListener("keydown", handleKeyDown);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // *Main Game Logic*
  // Updates Dealer's Score
  useEffect(() => {
    if (dealerCards.length > 0) {
      // For slideCard variant animation.
      setDealerViewWidthOnMoreCards(
        parseFloat(dealerViewWidthOnMoreCards.slice(0, 4)) - 0.85 + "vw"
      );

      dispatch(UPDATE_SCORE({ player: false, wants11: 11 }));
    }
  }, [dealerCards]);

  // Updates Player's Score
  useEffect(() => {
    if (playerCards.length > 0) {
      if (
        playerCards[0].face === "A" &&
        !playerHasNatural &&
        !madeAceDecision
      ) {
        // To not update the score for the ace, but update for the second card.
        dispatch(UPDATE_SCORE({ player: true, wants11: 0 }));
      } else {
        waitForAceDecision(showAcePrompt).then(() => {
          !winner && dispatch(UPDATE_SCORE({ player: true, wants11: wants11 }));

          if (wants11 > 0) setWants11(0);
        });
      }
    } else {
      // If the player starts a new game in the middle of a game and ace prompt is showing.
      setShowAcePrompt(false);
    }
  }, [playerCards, showAcePrompt]);

  useEffect(() => {
    if (playerCards.length > 0) {
      // For slideCard variant animation.
      setPlayerViewWidthOnMoreCards(
        parseFloat(playerViewWidthOnMoreCards.slice(0, 4)) - 0.85 + "vw"
      );

      // For slideCardResponsive variant animation.
      if (isWidthSmallerThan1429 || isHeightSmallerThan844) {
        document.body.style.overflow = "hidden";
        const animationDuration = setTimeout(() => {
          document.body.style.overflow = "unset";
        }, 1300);
        return () => clearTimeout(animationDuration);
      }
    }
  }, [playerCards]);

  // When the player is standing.
  useEffect(() => {
    if (playerStanding && !dealerStanding && !winner) {
      const turnDuration = setTimeout(() => {
        dealerTurn();
      }, 2500);
      return () => clearTimeout(turnDuration);
    }
  }, [playerStanding, dealerStanding, dealerScore]);

  // Determines the winner when it is dealers turn and when there is a update to his score.
  useEffect(() => {
    if (dealerCards.length > 1 && isDealerTurn) {
      if (playerScore === 21 && !playerHasNatural && !dealerHasNatural) {
        // If the player has 21 and no one has naturals, wait until the dealer is done hitting
        // until a bust or a blackjack before determining the winner.
        !winner && dealerScore >= 21 && dispatch(DETERMINE_WINNER());
      } else if (playerScore === 21 && !dealerHasNatural) {
        // If the player has 21 and the player does have a natural, wait for the dealers turn (2500ms) to be over then
        // DETERMINE_WINNER because Davy Blackjack is a little bit different; the one who doesn't have a natural has one chance.
        const waitForTurn = setTimeout(() => {
          !winner && dispatch(DETERMINE_WINNER());
        }, 2600);
        return () => clearTimeout(waitForTurn);
      } else {
        !winner && dispatch(DETERMINE_WINNER());
      }
    }
  }, [isDealerTurn, dealerScore, dealerStanding]);

  // Resets on winner.
  useEffect(() => {
    if (winner !== null) {
      setDealerViewWidthOnMoreCards("30.6vw");
      setPlayerViewWidthOnMoreCards("30.6vw");
      setMadeAceDecision(false);
    }
  }, [winner]);

  // Naturals Checks
  useEffect(() => {
    if (dealerHasNatural && playerHasNatural) {
      // If the dealer and the player has natural, end the game by DEALER_TURN.
      dispatch(DEALER_TURN(true));
    } else if (dealerHasNatural && hasPlayerHit) {
      // I had to put this here below because when the dealer has a natural, it just a sudden didn't work right for me.
      // So, if the player gets a ace on their only hit, the showAcePrompt would be false on the first render; the showAcePrompt useEffect
      // ran at the same time, which caused the waitForAceDecision() to resolve when it wasn't supposed to.
      if (
        playerCards[2].image.includes("ace") &&
        !showAcePrompt &&
        !secureAceOnNatural
      ) {
        setSecureAceOnNatural(true);
        return;
      }
      // If the dealer has natural, player has one hit and could be an ace.
      waitForAceDecision(showAcePrompt).then(() => {
        dispatch(DEALER_TURN(true));
        setSecureAceOnNatural(false);
      });
    } else if (playerHasNatural) {
      dispatch(DEALER_TURN(true));
      const turnDuration = setTimeout(() => {
        dealerTurn();
      }, 2500);
      return () => clearTimeout(turnDuration);
    }
  }, [dealerHasNatural, playerHasNatural, showAcePrompt, hasPlayerHit]);

  return (
    <>
      <Box
        aria-label="Structure"
        display="grid"
        gridTemplateRows="auto 1fr auto"
        h="100vh"
        p={{
          base: "1.75rem 1.5rem 1rem 1.5rem",
          md: "1.75rem 3rem 1rem 3rem",
          xl: "1.75rem 5rem 1rem 5rem",
        }}
      >
        <Header
          gameType={gameType}
          show={show}
          setShow={setShow}
          toggleMute={toggleMute}
          isUsingKeyboard={isUsingKeyboard}
          setIsUsingKeyboard={setIsUsingKeyboard}
        />

        {gameType && (
          <>
            <chakra.main
              aria-label="Playing Area"
              display="grid"
              gridAutoRows="auto 1fr auto"
            >
              <Flex
                position="relative"
                alignSelf="flex-start"
                justify="center"
                align="center"
              >
                <Dealer
                  dealerCards={dealerCards}
                  dealerViewWidthOnMoreCards={dealerViewWidthOnMoreCards}
                  dealerFaceDownScore={dealerFaceDownScore}
                  dealerScore={dealerScore}
                  backOfCard={backOfCard}
                  dealerStanding={dealerStanding}
                  isWidthSmallerThan1429={isWidthSmallerThan1429}
                  isHeightSmallerThan844={isHeightSmallerThan844}
                />
                <Image
                  src={backOfCard}
                  alt="Card Deck"
                  as={motion.img}
                  variants={fadeInVar2}
                  initial={["hidden", { x: "31.55vw" }]}
                  animate={["visible", { x: "31.55vw" }]}
                  display={
                    isWidthSmallerThan1429 || isHeightSmallerThan844
                      ? "none"
                      : "initial"
                  }
                  position="absolute"
                  top="0"
                  maxW="130px"
                  minH="189px"
                  filter="drop-shadow(1px 0px 0px #000000) drop-shadow(0px 1px 0px #000000)"
                />
              </Flex>

              <WinnerPopup winner={winner} />

              <VStack alignSelf="flex-end" justify="center" align="center">
                <AcePrompt
                  showAcePrompt={showAcePrompt}
                  setMadeAceDecision={setMadeAceDecision}
                  winner={winner}
                  setShowAcePrompt={setShowAcePrompt}
                  setWants11={setWants11}
                  isDealerTurn={isDealerTurn}
                />
                <Player
                  playerCards={playerCards}
                  playerViewWidthOnMoreCards={playerViewWidthOnMoreCards}
                  playerBet={playerBet}
                  playerScore={playerScore}
                  setAnimate={setAnimate}
                  hasPlayerHit={hasPlayerHit}
                  wallet={wallet}
                  showAcePrompt={showAcePrompt}
                  setShowAcePrompt={setShowAcePrompt}
                  winner={winner}
                  gameType={gameType}
                  dealerHasNatural={dealerHasNatural}
                  playerHasNatural={playerHasNatural}
                  isWidthSmallerThan1429={isWidthSmallerThan1429}
                  isHeightSmallerThan844={isHeightSmallerThan844}
                />
              </VStack>

              <RulesOverlay
                show={show}
                setShow={setShow}
                isUsingKeyboard={isUsingKeyboard}
              />
              {gameType === "Match" && (
                <FloatingBet
                  playerBet={playerBet}
                  animate={animate}
                  setAnimate={setAnimate}
                />
              )}
            </chakra.main>
            <Footer
              gameType={gameType}
              winStreak={winStreak}
              animate={animate}
              setAnimate={setAnimate}
            />
          </>
        )}
      </Box>

      <GameStartModal
        show={show}
        setShow={setShow}
        gameType={gameType}
        wallet={wallet}
        playerCards={playerCards}
        winner={winner}
        isUsingKeyboard={isUsingKeyboard}
      />
      <CashInModal
        show={show}
        setShow={setShow}
        isUsingKeyboard={isUsingKeyboard}
      />
    </>
  );
}

export default App;
