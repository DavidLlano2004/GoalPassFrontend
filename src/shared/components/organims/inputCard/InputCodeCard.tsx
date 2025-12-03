import React from "react";
import { Controller } from "react-hook-form";

export const InputCodeCard = ({ control }: { control: any }) => {
  return (
    <Controller
      name="CVV"
      control={control}
      rules={{
        required: "Requerido",
        validate: (value) => {
          if (value.length !== 3) {
            return "Debe tener 3 dígitos";
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
            placeholder="CVV"
            maxLength={3}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              field.onChange(value);
            }}
            onKeyDown={(e) => {
              const allowedKeys = [8, 9, 27, 13, 46, 37, 39, 35, 36];

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
