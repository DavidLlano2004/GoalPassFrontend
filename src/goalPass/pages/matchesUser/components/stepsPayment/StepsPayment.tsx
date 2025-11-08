import React, { useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { paths } from "../../../../../routes/paths";
import { generatePath, useNavigate } from "react-router";

export const StepsPayment = () => {
  const { control } = useForm();
  const [currentSection, setCurrentSection] = useState(0);
  const navigate = useNavigate();

  const navigateInfoMatch = () => {
    const id = 1;
    const path = generatePath(paths.TicketMatch, { id });
    navigate(path);
  };

  const STEPS_PAYMENT = {
    0: <Step1 actionPay={() => setCurrentSection(1)} />,
    1: (
      <Step2
        actionPayEnd={() => navigateInfoMatch()}
        actionBack={() => setCurrentSection(0)}
        control={control}
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
