import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// *Design Imports*
import {
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { CgDollar } from "react-icons/cg";

const CashInForm = (props) => {
  const formRef = useRef(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      deposit: "",
    },
  });

  return (
    <chakra.form
      onSubmit={handleSubmit(() => {
        props.dispatch(props.SET_WALLET(parseInt(watch("deposit"))));
        props.setShow({ ...props.show, gameStart: false });
        formRef.current.reset();
      })}
      ref={formRef}
    >
      <FormControl isInvalid={errors.deposit}>
        <FormLabel htmlFor="deposit">
          Amount<chakra.span color="r400"> *</chakra.span>
        </FormLabel>
        <HStack>
          <Icon as={CgDollar} position="absolute" left="0.5rem" color="g500" />
          <Input
            {...register("deposit", {
              required: "Enter a value of how much to deposit.",
              min: {
                value: 5,
                message: "Please deposit at least $5.",
              },
              maxLength: {
                value: 5,
                message: "Please don't deposit more then $10,000!",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a number.",
              },
            })}
            id="deposit"
            name="deposit"
            autoComplete="off"
            variant="primary"
            h="48px"
            marginInlineStart="0px !important"
            paddingInline="1.5rem 1rem"
          />
        </HStack>
        <ErrorMessage
          errors={errors}
          name="deposit"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>

      <Button type="submit" variant="primary" mt="1.5rem" w="100%">
        Deposit
      </Button>
    </chakra.form>
  );
};

export default CashInForm;
