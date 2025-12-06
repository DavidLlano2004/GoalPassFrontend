import { ComponentEmpty } from "../../../../shared/components/molecules/empty/ComponentEmpty";
import { CardAssitMatchesUser } from "../../../components/molecules/cards/CardAssitMatchesUser";

export const MyHistory = ({ matches }: any) => {
  return (
    <div className="flex-1 max-h-full overflow-hidden flex flex-col">
      <h1 className="font-bold text-[18px] mt-2">Partidos asistidos</h1>

      <div className="flex-1 flex flex-col mt-6 gap-4">
        {matches?.length > 0 ? (
          matches?.map((match: any) => (
            <CardAssitMatchesUser key={match?.match_id} match={match} />
          ))
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <ComponentEmpty
              textSize="text-[16px]"
              iconSize="text-[50px]"
              textComponentEmpty="Sin asistencia a partidos"
            />
          </div>
        )}
      </div>
    </div>
  );
};
