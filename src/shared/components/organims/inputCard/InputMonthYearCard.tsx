import React from "react";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
}
export const InputMonthYearCard = ({ control }: Props) => {
    
  const formatExpiryDate = (value: string) => {
    // Remover todo excepto números
    let cleaned = value.replace(/\D/g, "");

    // Limitar a 4 dígitos (MMAA)
    cleaned = cleaned.substring(0, 4);

    if (cleaned.length >= 2) {
      // Validar y formatear mes
      let month = cleaned.substring(0, 2);

      // Si el primer dígito es mayor a 1, agregar 0 adelante
      if (cleaned.length === 1 && parseInt(cleaned) > 1) {
        month = "0" + cleaned;
        cleaned = month;
      }

      // Limitar mes a 12
      if (parseInt(month) > 12) {
        month = "12";
      }

      // Si hay más de 2 dígitos, agregar el slash
      if (cleaned.length > 2) {
        const year = cleaned.substring(2, 4);
        return `${month}/${year}`;
      }

      return month;
    }

    return cleaned;
  };
  return (
    // En tu componente:
    <Controller
      name="expiry_date"
      control={control}
      rules={{
        required: "Requerido",
        pattern: {
          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
          message: "Formato inválido (MM/AA)",
        },
        validate: (value) => {
          const [month, year] = value.split("/");
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;

          const inputYear = parseInt(year);
          const inputMonth = parseInt(month);

          if (inputYear < currentYear) {
            return "Tarjeta expirada";
          }

          if (inputYear === currentYear && inputMonth < currentMonth) {
            return "Tarjeta expirada";
          }

          return true;
        },
      }}
      render={({ field, fieldState: { error } }: any) => (
        <div className="flex flex-col">
          <input
            {...field}
            className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
            type="text"
            placeholder="MM/AA"
            maxLength={5}
            onChange={(e) => {
              const formatted = formatExpiryDate(e.target.value);
              field.onChange(formatted);
            }}
            onKeyDown={(e) => {
              const allowedKeys = [8, 9, 27, 13, 46, 37, 39]; // backspace, tab, esc, enter, delete, arrows

              if (
                allowedKeys.includes(e.keyCode) ||
                (e.ctrlKey && ["a", "c", "v", "x"].includes(e.key))
              ) {
                return;
              }

              if (!/^\d$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1 pl-2">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};
