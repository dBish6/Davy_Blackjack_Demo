// *Design Import*
import { Button } from "@chakra-ui/react";

// *Custom Hooks Import*
import useDisableScroll from "../../../hooks/useDisableScroll";

// *Component Imports*
import ModalTemplate from "../ModalTemplate";
import MyHeading from "../../MyHeading";
import CashInForm from "./CashInForm";

// *Redux Imports*
import { useDispatch } from "react-redux";
import { SET_WALLET } from "../../../redux/blackjackSlice";

const CashInModelIndex = (props) => {
  const dispatch = useDispatch();

  useDisableScroll(props.show.cashIn, 810);

  return (
    <ModalTemplate
      show={props.show.cashIn}
      setShow={props.setShow}
      objName="cashIn"
      isUsingKeyboard={props.isUsingKeyboard}
      animation={{ type: "down", y: "-400%" }}
      maxW="298px"
    >
      <Button
        onClick={() => props.setShow({ ...props.show, cashIn: false })}
        variant="exit"
        position="absolute"
        top="-8px"
        right="-8px"
      >
        &#10005;
      </Button>
      <MyHeading fontSize="2rem" mb="1.5rem" text="Cash In" />

      <CashInForm
        dispatch={dispatch}
        SET_WALLET={SET_WALLET}
        show={props.show}
        setShow={props.setShow}
      />
    </ModalTemplate>
  );
};

export default CashInModelIndex;
