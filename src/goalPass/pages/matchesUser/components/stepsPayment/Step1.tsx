import { useMemo, useState } from "react";
import { ButtonSimple } from "../../../../../shared/components/molecules/buttons/ButtonSimple";
import type { Stand } from "../../../Matches";
import { useFormatNumber } from "../../../../../shared/hooks/useFormatNumber";

interface Props {
  actionPay: () => void;
  soccerStandInfo: Stand;
  totalPrice?: number;
  numberTickets?: number;
  setNumberTickets: (value: number) => void;
}

export const Step1 = ({
  actionPay,
  soccerStandInfo,
  totalPrice,
  numberTickets = 1,
  setNumberTickets,
}: Props) => {
  const { formatNumber } = useFormatNumber();

  const addTickets = () => {
    setNumberTickets(numberTickets + 1);
  };

  const removeTickets = () => {
    setNumberTickets(numberTickets - 1);
  };

  

  return (
    <>
      <div className=" rounded-[15px] bg-gray-2-custom w-full h-[78px] py-4 px-6 flex flex-col justify-center">
        <p className="text-[14px] font-light">Grada seleccionada</p>
        <p className="font-bold text-base">{soccerStandInfo.stand_name}</p>
      </div>
      <div className="mt-8">
        <p className="text-[16px] font-light">Cantidad de boletas</p>
        <div className="flex mt-2 items-center gap-8">
          <ButtonSimple
            startContent={
              <i className="fi fi-rr-minus-small text-[20px] text-white flex"></i>
            }
            roundedButton="rounded-[4px]"
            borderGradient
            widthButton="min-w-0 w-[30px]"
            heightButton="h-[30px]"
            bgColorButton="bg-gray-2-custom"
            actionButton={removeTickets}
            isDisabled={numberTickets === 1}
          />
          <p className="font-bold text-[22px]">{numberTickets}</p>
          <ButtonSimple
            startContent={
              <i className="fi fi-rr-plus-small text-[20px] text-white flex"></i>
            }
            roundedButton="rounded-[4px]"
            borderGradient
            widthButton="min-w-0 w-[30px]"
            heightButton="h-[30px]"
            bgColorButton="bg-gray-2-custom"
            actionButton={addTickets}
            isDisabled={numberTickets === 10}
          />
        </div>
      </div>
      <div className="border-b border-t mt-6 py-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="font-light text-[16px]">Precio unitario</p>
          <p className="text-[16px] font-semibold">
            $ {formatNumber(soccerStandInfo.price)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-light text-[16px]">Boletas</p>
          <p className="text-[16px] font-semibold">x {numberTickets}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 mb-6">
        <p className="font-light text-[16px]">Total</p>
        <p className="text-[16px] font-semibold">
          $ {formatNumber(totalPrice || 0)}
        </p>
      </div>
      <ButtonSimple
        startContent={
          <i className="fi fi-tr-wallet-arrow text-[20px] text-white flex"></i>
        }
        actionButton={() => actionPay()}
        textButton="Continuar con el pago"
        widthButton="w-full"
      />
    </>
  );
};
