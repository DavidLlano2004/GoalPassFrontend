import { useCallback } from "react";

export const useCapitalizeWord = () => {
  const capitalized = useCallback((word: string) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase();
  }, []);

  return { capitalized };
};
