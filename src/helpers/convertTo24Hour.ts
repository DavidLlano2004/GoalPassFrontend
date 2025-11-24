export const convertTo24Hour = (time12h: string) => {
  if (!time12h) return "";
  
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");
  
  if (hours === "12") {
    hours = modifier === "AM" ? "00" : "12";
  } else if (modifier === "PM") {
    hours = String(parseInt(hours, 10) + 12);
  }
  
  return `${hours.padStart(2, "0")}:${minutes}:00`;
};