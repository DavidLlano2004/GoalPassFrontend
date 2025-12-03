import { Spinner } from "@heroui/spinner";
import { CardTicketProfile } from "../../../components/molecules/cards/CardTicketProfile";
import { useQueryTickets } from "../../../hooks";
import { ComponentEmpty } from "../../../../shared/components/molecules/empty/ComponentEmpty";

export const MyTickets = () => {
  const { getMyTickets } = useQueryTickets("");
  return (
    <div className="flex-1 max-h-full overflow-hidden flex flex-col">
      <h1 className="font-bold text-[18px] mt-2">Boletas activas</h1>
      <div
        className={`max-h-full overflow-y-auto flex-1 flex flex-col gap-6 mt-6 pr-4 ${getMyTickets.isLoading && "justify-center items-center"}`}
      >
        {getMyTickets.isLoading ? (
          <div className="flex-1 justify-center items-center flex">
            <Spinner size="lg" color="white" />
          </div>
        ) : getMyTickets.data?.tickets.length === 0 ? (
          <div className="flex-1 justify-center items-center flex">
            <ComponentEmpty
              textSize="text-[16px]"
              iconSize="text-[50px]"
              textComponentEmpty={"Aún no tienes boletas"}
            />
          </div>
        ) : (
          getMyTickets.data?.tickets.map((ticket) => (
            <CardTicketProfile
              key={ticket.id}
              stateTicket={ticket.state === "vendido"}
              ticket={ticket}
            />
          ))
        )}
      </div>
    </div>
  );
};
