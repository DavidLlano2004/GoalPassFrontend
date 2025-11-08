import { Button } from "@heroui/button";
import React from "react";

interface Props {
  textButton?: string;
  widthButton?: string;
  bgColorButton?: string;
  colorTextButton?: string;
  borderGradient?: boolean;
  isDisabled?: boolean;
  heightButton?: string;
  roundedButton?: string;
  actionButton?: () => void;
  startContent?: React.ReactNode;
}

export const ButtonSimple = ({
  textButton,
  widthButton,
  startContent,
  bgColorButton = "bg-linear-to-r from-blue-1-custom to-green-1-custom",
  colorTextButton = "text-white",
  heightButton = "h-[50px]",
  actionButton = () => {},
  borderGradient = false,
  roundedButton = "rounded-[15px]",
  isDisabled = false,
}: Props) => {
  return (
    <Button
      isDisabled={isDisabled}
      onPress={actionButton}
      startContent={startContent}
      className={` ${heightButton} ${roundedButton} ${widthButton} ${bgColorButton} ${colorTextButton} text-[16px] font-bold  `}
    >
      {textButton}

      {borderGradient && (
        <span
          className={`absolute inset-0 ${roundedButton} p-0.5`}
          style={{
            background: "linear-gradient(to top, #00C853, #0038A8)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        ></span>
      )}
    </Button>
  );
};
