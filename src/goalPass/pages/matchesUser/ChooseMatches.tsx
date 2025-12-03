import { motion } from "framer-motion";
import { Images } from "../../../assets/images/ImagesProvider";
import { CardInfoMatchUser } from "../../components/molecules/cards/CardInfoMatchUser";
import { useQueryMatches } from "../../hooks";
import { Spinner } from "@heroui/spinner";
import { ComponentEmptyMatchSale } from "../../components/organims/ComponentEmptyMatchSale";
const { ImageBgAuth } = Images;

export const ChooseMatches = () => {
  const { getMatchesQuery } = useQueryMatches();

  const filterDataMatches = getMatchesQuery.data?.matches.filter(
    (match) => match.state === "en_venta"
  );

  return (
    <div
      style={{
        background: `url(${ImageBgAuth})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="overflow-hidden flex-1 flex flex-col"
    >
      <div
        className={`flex-1 overflow-y-auto sm:px-6 pb-6 sm:pt-16 pt-6 px-4 bg-black/50 ${getMatchesQuery.isLoading && "flex flex-col"}`}
      >
        {getMatchesQuery.isLoading ? (
          <div className="flex-1 flex justify-center items-center">
            <Spinner size="lg" color="white" label="Cargando..." />
          </div>
        ) : (
          <motion.div
            className=" w-full max-w-[1123px] m-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filterDataMatches?.length === 0 ? (
              <>
                <div className="flex flex-col justify-center items-center mb-10">
                  <h1 className="text-[28px] font-extrabold">
                    Próximos partidos
                  </h1>
                  <p className="text-[18px] font-light">
                    Estadio palogrande - Manizales
                  </p>
                </div>
                <ComponentEmptyMatchSale />
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[28px] font-extrabold">
                    Próximos partidos
                  </h1>
                  <p className="text-[18px] font-light">
                    Estadio palogrande - Manizales
                  </p>
                </div>

                <div className="mt-10 flex-1 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 auto-rows-auto">
                  {filterDataMatches?.map((match) => (
                    <CardInfoMatchUser key={match.id} match={match} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
