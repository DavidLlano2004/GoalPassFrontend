import { Controller } from "react-hook-form";

interface Props {
  control: any;
}

export const InputNumberCard = ({ control }: Props) => {
  const detectCardType = (number: string) => {
    const cleaned = number.replace(/\D/g, "");

    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";

    return "unknown";
  };

  return (
    <Controller
      name="numberCard"
      control={control}
      rules={{
        required: "Requerido",
        validate: (value) => {
          const cleaned = value.replace(/\s/g, "");

          if (cleaned.length !== 16) {
            return "Debe tener 16 dígitos";
          }

          return true;
        },
      }}
      render={({ field, fieldState: { error } }: any) => {
        const cardType = detectCardType(field.value || "");

        return (
          <div className="flex flex-col">
            <div className="relative">
              <input
                {...field}
                className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2 pr-12"
                type="text"
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  value = value.substring(0, 16);
                  const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                  field.onChange(formatted);
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
              {/* 
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {cardType === "visa" && (
                  <span className="text-blue-500 font-bold text-xs">VISA</span>
                )}
                {cardType === "mastercard" && (
                  <span className="text-red-500 font-bold text-xs">MC</span>
                )}
                {cardType === "amex" && (
                  <span className="text-blue-400 font-bold text-xs">AMEX</span>
                )}
              </div> */}
            </div>

            {error && (
              <p className="text-red-500 text-xs mt-1 pl-2">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};
