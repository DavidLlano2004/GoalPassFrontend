import { Avatar, Select, SelectItem } from "@heroui/react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface Option {
  key: string | number;
  label: string;
}

interface SelectSimpleProps<T extends FieldValues> {
  control: Control<T>;
  nameRegister: Path<T>;
  validations?: any;
  label?: string;
  options?: any[];
  placeholder?: string;
  searchEnabled?: boolean;
  iconItem?: boolean;
  keyOption?: string | null;
  labelOption: string;
  uppercase: boolean;
  onSelectionChange?: (selected: string | number) => void;
  [key: string]: any;
}

export const SelectSimple = <T extends FieldValues>({
  control,
  nameRegister,
  validations,
  label = "Seleccione una opción",
  options = [],
  placeholder = "",
  searchEnabled = true,
  keyOption = null,
  labelOption,
  uppercase = false,
  iconItem = false,
  onSelectionChange: onExternalChange,
  ...rest
}: SelectSimpleProps<T>) => {
  const dataSelect: Option[] =
    options?.map((option) => ({
      key: keyOption ? option[keyOption] : option,
      label: option[labelOption],
    })) ?? [];

  const endData = keyOption != null ? dataSelect : options;

  return (
    <Controller
      name={nameRegister}
      control={control}
      rules={validations}
      render={({ field, fieldState }) => (
        <Select
          size="md"
          label={label}
          placeholder={placeholder}
          selectedKeys={field.value ? [field.value] : []}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0];
            field.onChange(selected);
            if (onExternalChange) onExternalChange(selected);
          }}
          onBlur={field.onBlur}
          ref={field.ref}
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error?.message}
          variant="bordered"
          classNames={{
            base: "w-full",
            trigger: `border bg-gray-2-custom border-gray-1-custom data-[focus=true]:border-blue-1-custom data-[focus=true]:shadow data-[focus=true]:shadow-blue-1-custom  rounded-[15px] p-1 px-5`,
            label: "font-semibold text-[#929292]",
            value: `text-white text-base ${uppercase && "uppercase"}`,
            
          }}
          {...rest}
        >
          {endData?.map((opt: Option) => (
            <SelectItem
              startContent={
                iconItem ? (
                  <Avatar
                    alt="icons_teams_soccers"
                    className="w-6 h-6"
                    src={opt?.iconSelect}
                  />
                ) : (
                  " "
                )
              }
              key={opt.key}
              value={opt.key}
            >
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};
