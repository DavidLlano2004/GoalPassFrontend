// usePasswordValidation.js
import { useEffect, useState } from "react";

export const usePasswordValidation = (password: string) => {
  const [passwordStrength, setPasswordStrength] = useState({
    level: "",
    color: "",
    valid: false,
  });

  useEffect(() => {
    if (!password) {
      setPasswordStrength({ level: "", color: "", valid: false });
      return;
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[+*#@!$%^&()\-_=]/.test(password);
    const noDoubleSymbol = !/[+*#@!$%^&()\-_=]{2,}/.test(password);
    const lengthValid = password.length >= 8;

    const score = [
      hasUpper,
      hasNumber,
      hasSymbol,
      noDoubleSymbol,
      lengthValid,
    ].filter(Boolean).length;

    if (score <= 3) {
      setPasswordStrength({ level: "Débil", color: "#ef4444", valid: false });
      return;
    }

    if (score === 4) {
      setPasswordStrength({ level: "Media", color: "#f59e0b", valid: true });
      return;
    }

    if (score === 5) {
      setPasswordStrength({ level: "Fuerte", color: "#22c55e", valid: true });
      return;
    }
  }, [password]);

  return passwordStrength;
};
