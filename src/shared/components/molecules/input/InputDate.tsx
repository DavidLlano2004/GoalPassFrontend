import { I18nProvider } from "@react-aria/i18n";
import { parseDate, parseDateTime, now } from "@internationalized/date";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { DatePicker } from "@heroui/react";

interface ControlledDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  withTime?: boolean; // Nueva prop para incluir hora
  hideTimeZone?: boolean;
  hourCycle?: 12 | 24;
}

export default function ControlledDatePicker<T extends FieldValues>({
  control,
  name,
  label = "Fecha de cumpleaños",
  isRequired = false,
  isDisabled = false,
  errorMessage,
  withTime = false, // Por defecto solo fecha
  hideTimeZone = true,
  hourCycle = 12,
}: ControlledDatePickerProps<T>) {
  // Convertir CalendarDate/ZonedDateTime a string
  const calendarToString = (calendarDate: any): string | null => {
    if (!calendarDate) return null;

    try {
      if (withTime) {
        // Formato con hora: "2025-11-22T14:30:00"
        const year = calendarDate.year;
        const month = String(calendarDate.month).padStart(2, "0");
        const day = String(calendarDate.day).padStart(2, "0");
        const hour = String(calendarDate.hour || 0).padStart(2, "0");
        const minute = String(calendarDate.minute || 0).padStart(2, "0");
        const second = String(calendarDate.second || 0).padStart(2, "0");

        return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
      } else {
        // Solo fecha: "2025-11-22"
        const year = calendarDate.year;
        const month = String(calendarDate.month).padStart(2, "0");
        const day = String(calendarDate.day).padStart(2, "0");

        return `${year}-${month}-${day}`;
      }
    } catch (error) {
      console.error("Error converting calendar to string:", error);
      return null;
    }
  };

  // Convertir string a CalendarDate/ZonedDateTime
  const stringToCalendar = (dateString: string | null) => {
    if (!dateString) return null;

    try {
      if (withTime) {
        // Parsear fecha con hora
        return parseDateTime(dateString);
      } else {
        // Parsear solo fecha
        return parseDate(dateString);
      }
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: isRequired ? "Este campo es requerido" : false,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <I18nProvider locale="es">
          <DatePicker
            value={stringToCalendar(value)}
            onChange={(newDate: any) => {
              const formatted = calendarToString(newDate);
              onChange(formatted);
            }}
            showMonthAndYearPickers
            hideTimeZone={hideTimeZone}
            hourCycle={withTime ? hourCycle : undefined}
            {...(withTime && {
              placeholderValue: now("America/Bogota"),
            })}
            label={label}
            variant="bordered"
            isDisabled={isDisabled}
            isInvalid={!!error}
            errorMessage={error?.message || errorMessage}
            classNames={{
              base: "w-full",
              inputWrapper: `border bg-gray-2-custom border-gray-1-custom data-[focus=true]:border-blue-1-custom data-[focus=true]:shadow data-[focus=true]:shadow-blue-1-custom rounded-[15px] p-1 px-5 ${
                error ? "border-red-500" : ""
              }`,
              label: "font-semibold text-[#929292]",
              input: "!text-white text-base",
              calendarContent: "bg-gray-2-custom",
              timeInput: "bg-gray-2-custom",
              timeInputLabel: "!text-white",
              errorMessage: "text-[#F31260] text-xs mt-[1px]",
            }}
          />
        </I18nProvider>
      )}
    />
  );
}
