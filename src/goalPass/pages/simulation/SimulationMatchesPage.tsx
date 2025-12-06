import { CardMatchSimulation } from "../../components/molecules/cards/CardMatchSimulation";
import type { Match } from "../../interfaces/getMatches.interfacce";

interface Props {
  actionCard?: (match: any) => void;
  matches: Match[];
}

export const SimulationMatchesPage = ({
  actionCard = () => {},
  matches,
}: Props) => {
  return (
    <div className=" grid lg:grid-cols-2 grid-cols-1 mt-4 gap-4">
      {matches?.map((match) => (
        <CardMatchSimulation
          key={match?.id}
          match={match}
          actionCard={() => actionCard(match)}
        />
      ))}
    </div>
  );
};
