// *Design Imports*
import { Text, chakra } from "@chakra-ui/react";

// *Redux Imports*
import { useSelector } from "react-redux";
import { selectWallet } from "../redux/blackjackSelectors";

const GetBalance = (props) => {
  const wallet = useSelector(selectWallet);

  return (
    <Text aria-label="Balance" variant="blackjack" {...props}>
      Balance:{" "}
      <chakra.span color={wallet === 0 ? "r500" : "g500"} fontWeight="500">
        {wallet === null ? "$0" : `$${wallet}`}
      </chakra.span>
    </Text>
  );
};

export default GetBalance;
