import { motion } from "framer-motion";
import { usePasswordValidation } from "../../../hooks/usePasswordValidation";

interface Props {
  password: string;
}

export const ValidatePassword = ({ password }: Props) => {
  const passwordStrength = usePasswordValidation(password);

  if (!password) return null;

  const barWidth =
    passwordStrength.level === "Débil"
      ? "33%"
      : passwordStrength.level === "Media"
      ? "66%"
      : "100%";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-2 flex flex-col gap-1"
    >
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-1 rounded-full"
          style={{
            width: barWidth,
            backgroundColor: passwordStrength.color,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};
