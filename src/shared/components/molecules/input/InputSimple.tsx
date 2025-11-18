import { Input } from "@heroui/react";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  nameRegister: string;
  validations?: any;
  label?: string;
  endContent?: React.ReactNode;
  startContent?: React.ReactNode;
  type?: string;
  defaultValue?: string | number;
  valueAsNumber?: boolean;
  uppercase?: boolean;
  isDisabled?: boolean;
  [key: string]: any;
}

export const InputSimple = ({
  control,
  nameRegister,
  validations,
  label = "Escriba",
  endContent,
  startContent,
  type = "text",
  defaultValue = "",
  valueAsNumber = false,
  uppercase = false,
  isDisabled = false,
  ...rest
}: Props) => {
  return (
    <Controller
      name={nameRegister}
      control={control}
      rules={validations}
      defaultValue={defaultValue}
      render={({ field, fieldState }: any) => (
        <Input
          size="md"
          startContent={startContent}
          label={label}
          variant="bordered"
          value={field.value || ""}
          onChange={(e) => {
            const val = e.target.value;
            field.onChange(
              valueAsNumber ? (val === "" ? null : Number(val)) : val
            );
          }}
          isDisabled={isDisabled}
          onBlur={field.onBlur}
          ref={field.ref}
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error?.message}
          classNames={{
            base: "w-full",
            inputWrapper: `border bg-gray-2-custom border-gray-1-custom data-[focus=true]:border-blue-1-custom data-[focus=true]:shadow data-[focus=true]:shadow-blue-1-custom  rounded-[15px] p-1 px-5`,
            label: "font-semibold text-[#929292]",
            input: `text-white text-base ${uppercase && "uppercase"}`,
          }}
          type={type}
          endContent={endContent}
          {...rest}
        />
      )}
    />
  );
};
