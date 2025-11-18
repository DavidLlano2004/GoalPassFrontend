import React from "react";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { ButtonSimple } from "../../../../shared/components/molecules/buttons/ButtonSimple";
const { IconQrLgBlack, IconQrOutlineWhite } = Icons;

interface Props {
  stateTicket: boolean;
}

export const CardTicketProfile = ({ stateTicket = true }: Props) => {
  return (
    <div className="w-full bg-gray-2-custom rounded-[15px] lg:flex-row flex-col flex items-center p-8 gap-5">
      <div className="flex flex-col gap-1">
        <div className="bg-white w-[100px] h-[100px] rounded-[15px] grid place-items-center">
          <img src={IconQrLgBlack} alt="" />
        </div>
        <div
          className={`${
            stateTicket ? "bg-green-1-custom " : "bg-red-1-custom "
          } w-[100px] min-h-5 p-1.5 rounded-[15px] flex justify-center items-center gap-1`}
        >
          <i
            className={`${
              stateTicket ? "fi fi-ts-check-circle" : "fi fi-tr-circle-xmark"
            }  text-sm flex`}
          ></i>
          <p className="font-semibold text-sm">
            {stateTicket ? "Válida" : "Inválida"}
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col ${
          stateTicket ? "justify-between lg:gap-0 gap-8" : "gap-3"
        }  lg:items-start items-center h-full `}
      >
        <h1 className="text-[20px] font-bold">
          Once caldas vs Atletico nacional
        </h1>
        <div className=" flex gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
            <p className="text-[14px]">15 Nov 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fi fi-tr-clock-five flex text-[14px]"></i>
            <p className="text-[14px]">08:00 am</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fi fi-tr-court-sport flex text-[14px]"></i>
            <p className="text-[14px]">Estadio Palogrande</p>
          </div>
        </div>
        <div className="sm:flex-row flex-col flex items-center gap-6">
          <div className="flex items-center gap-2">
            <i className="fi fi-rr-marker flex text-[14px]"></i>
            <p className="text-[14px]">Occidental</p>
          </div>
          <p className="text-[14px]">Fila 12 - Asiento 45</p>
        </div>
        {stateTicket && (
          <ButtonSimple
            startContent={<img className="w-4" src={IconQrOutlineWhite} />}
            textButton="Ver qr"
            widthButton="w-full lg:min-w-0 lg:w-[120px] lg:min-h-0 lg:h-[30px]"
            roundedButton="lg:rounded-[8px]"
          />
        )}
      </div>
    </div>
  );
};
