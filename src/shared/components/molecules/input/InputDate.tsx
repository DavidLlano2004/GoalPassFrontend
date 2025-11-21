
import { I18nProvider } from "@react-aria/i18n";
import { parseDate } from "@internationalized/date";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { DatePicker } from "@heroui/react";

interface ControlledDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  defaultValue?: string;
}

export default function ControlledDatePicker<T extends FieldValues>({
  control,
  name,
  label = "Fecha de cumpleaños",
  isRequired = false,
  isDisabled = false,
  defaultValue = "",
  errorMessage,
}: ControlledDatePickerProps<T>) {

    const calendarToDateString = (calendarDate: any): string | null => {
    if (
      !calendarDate ||
      !calendarDate.year ||
      !calendarDate.month ||
      !calendarDate.day
    ) {
      return null;
    }

    const year = calendarDate.year;
    const month = String(calendarDate.month).padStart(2, "0");
    const day = String(calendarDate.day).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const stringToCalendarDate = (dateString: string | null) => {
    if (!dateString) return null;

    try {
      return parseDate(dateString);
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
        required: isRequired,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <I18nProvider locale="es">
          <DatePicker
            value={stringToCalendarDate(value)}
            onChange={(newDate: any) => {
              const formatted = calendarToDateString(newDate);
              onChange(formatted);
            }}
            defaultValue={defaultValue}
            showMonthAndYearPickers
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
              errorMessage: "text-red-500 text-sm mt-1",
            }}
          />
        </I18nProvider>
      )}
    />
  );
}
