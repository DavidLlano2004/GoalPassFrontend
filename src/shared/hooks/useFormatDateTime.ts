import { useMemo } from "react";

export const useFormatDateTime = (isoString: string | undefined) => {
  const { date, hour } = useMemo(() => {
    if (!isoString) return { date: "", hour: "" };

    const d = new Date(isoString);

    // Formatear fecha -> DD/MM/YYYY
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    // Formatear hora -> hh:mm AM/PM
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const formattedHour = `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;

    return {
      date: formattedDate,
      hour: formattedHour,
    };
  }, [isoString]);

  return { date, hour };
};
