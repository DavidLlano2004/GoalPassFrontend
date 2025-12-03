import { useCallback } from "react";

export function useFormatNumber() {
  const formatNumber = useCallback((value: number | string) => {
    if (value === null || value === undefined) return "";

    const number = typeof value === "string" ? Number(value) : value;

    return number.toLocaleString("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, []);

  return { formatNumber };
}
