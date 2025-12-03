import React, { useEffect, useMemo, useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { motion } from "framer-motion";

import { paths } from "../../../../../routes/paths";
import { generatePath, useNavigate } from "react-router";
import type { Stand } from "../../../Matches";
import { useMutationTicket } from "../../../../hooks/useMutationTicket.hook";
import { useMutationTransaction } from "../../../../hooks/useMutationTransaction.hook";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../../../redux/hooks/reduxHooks";

interface Props {
  soccerStandInfo: Stand;
  matchId: string;
  standPriceId: string;
}

export const StepsPayment = ({
  soccerStandInfo,
  matchId,
  standPriceId,
}: Props) => {
  const { id: userId } = useAppSelector((state) => state.auth);
  const { createTicketMutation } = useMutationTicket();
  const { createTransactionMutation } = useMutationTransaction();
  const [currentSection, setCurrentSection] = useState(0);
  const [numberTickets, setNumberTickets] = useState(1);
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return soccerStandInfo.price * numberTickets;
  }, [soccerStandInfo.price, numberTickets]);

  const handlePayment = () => {
    createTransactionMutation.mutate(
      {
        id_users: userId,
        id_matches: matchId,
        total_amount: totalPrice,
        number_tickets: numberTickets,
      },
      {
        onSuccess: (transactionData) => {
          // Paso 2: Una vez creada la transacción, crear los tickets
          createTicketMutation.mutate(
            {
              id_users: userId,
              id_matches: matchId,
              id_match_stand_price: standPriceId,
              id_transaction: transactionData.transaction.id,
              price: soccerStandInfo.price,
              quantity: numberTickets,
            },
            {
              onSuccess: () => {
                // Paso 3: Navegar al ticket después de crear todo
                const path = generatePath(paths.TicketMatch, {
                  id: transactionData.transaction.id,
                });
                navigate(path);
              },
            }
          );
        },
      }
    );
  };

  const isLoadingPayment =
    createTicketMutation.isPending || createTransactionMutation.isPending;

  const STEPS_PAYMENT = {
    0: (
      <Step1
        actionPay={() => setCurrentSection(1)}
        soccerStandInfo={soccerStandInfo}
        totalPrice={totalPrice}
        numberTickets={numberTickets}
        setNumberTickets={setNumberTickets}
      />
    ),
    1: (
      <Step2
        actionPayEnd={() => handlePayment()}
        actionBack={() => setCurrentSection(0)}
        soccerStandName={soccerStandInfo.stand_name}
        totalPrice={totalPrice}
        numberTickets={numberTickets}
        loadingButtonPay={isLoadingPayment}
      />
    ),
  };

  return (
    <div className="mt-5">
      {Object.entries(STEPS_PAYMENT).map(([dataId, dataComponent]) => {
        const data = currentSection === Number(dataId);
        return data ? (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            key={dataId}
          >
            {dataComponent}
          </motion.div>
        ) : null;
      })}
    </div>
  );
};
