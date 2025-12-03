import React from "react";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { ButtonSimple } from "../../../../shared/components/molecules/buttons/ButtonSimple";
import type { Ticket } from "../../../interfaces/getMyTickets.interface";
const { IconQrLgBlack, IconQrOutlineWhite } = Icons;

interface Props {
  stateTicket: boolean;
  ticket: Ticket;
}

export const CardTicketProfile = ({ stateTicket = true, ticket }: Props) => {
  const formattedBirthday = ticket?.match?.match_date
    ? new Date(ticket?.match?.match_date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formatTo12Hour = (time: string) => {
    if (!time) return "";

    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    if (hour === 0) hour = 12;

    const hourFormatted = String(hour).padStart(2, "0");

    return `${hourFormatted}:${minute} ${ampm}`;
  };

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
        <h1 className="text-[20px] font-bold text-center">
          {ticket.match.local.name} vs {ticket.match.visitor.name}
        </h1>

        <div className=" flex gap-5 flex-wrap">
          <div className="flex items-center gap-2">
            <i className="fi fi-tr-calendar-day flex text-[14px]"></i>
            <p className="text-[14px]">{formattedBirthday}</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="fi fi-tr-clock-five flex text-[14px]"></i>
            <p className="text-[14px]">
              {formatTo12Hour(ticket.match.match_hour)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <i className="fi fi-tr-court-sport flex text-[14px]"></i>
          <p className="text-[14px]">{ticket.match.stadium}</p>
        </div>

        <div className="sm:flex-row flex-col flex items-start gap-6 sm:w-auto w-full">
          <div className="flex items-center gap-2">
            <i className="fi fi-rr-marker flex text-[14px]"></i>
            <p className="text-[14px]">
              {ticket.msp?.stand?.name}
            </p>
          </div>
          <p className="text-[14px]">{ticket?.seat_info}</p>
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
