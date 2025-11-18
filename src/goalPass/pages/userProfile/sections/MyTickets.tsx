import { CardTicketProfile } from "../../../components/molecules/cards/CardTicketProfile";

export const MyTickets = () => {
  return (
    <div className="flex-1 max-h-full overflow-hidden flex flex-col">
      <h1 className="font-bold text-[18px] mt-2">Boletas activas</h1>
      <div className=" max-h-full overflow-y-auto flex-1 flex flex-col gap-6 mt-6 pr-4">
        <CardTicketProfile stateTicket />
        <CardTicketProfile stateTicket={false} />
      </div>
    </div>
  );
};
