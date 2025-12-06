import { motion } from "framer-motion";
import { Images } from "../../../assets/images/ImagesProvider";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { CardEventSimulation } from "../../components/molecules/cards/CardEventSimulation";
import { useQuerySimulation } from "../../hooks/useQuerySimulation.hooks";
import { Spinner } from "@heroui/spinner";
const { ImageNacional, ImageOnceCaldas } = Images;

interface Props {
  setCurrentSection?: (section: number) => void;
  matchId: string;
}

export const SimulationResults = ({
  setCurrentSection = () => {},
  matchId,
}: Props) => {
  const { getSimulationMatchQuery } = useQuerySimulation(matchId);

  if (getSimulationMatchQuery.isFetching) {
    <div className="flex-1 w-full max-w-[1123px] mx-auto flex justify-center items-center">
      <Spinner size="lg" color="white" label="Cargando..." />
    </div>;
  }

  console.log("====================================");
  console.log(getSimulationMatchQuery.data?.data);
  console.log("====================================");

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 grid gap-4 flex-wrap"
    >
      {/* Marcador */}
      <div className="w-full min-h-[230px] sm:py-0 py-8 rounded-[15px] bg-black-2-custom col-span-full flex justify-center items-center">
        <div className="flex sm:flex-row flex-col items-center w-full lg:gap-18 gap-6">
          <div className="flex flex-col items-end flex-1 ">
            <div className="flex flex-col items-center gap-3">
              <span>
                <img
                  className="h-20"
                  src={
                    getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                      ?.team?.image_url
                  }
                  alt=""
                />
              </span>
              <p className="font-semibold text-[18px] text-center">
                {
                  getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                    ?.team?.name
                }
              </p>
            </div>
          </div>
          <div className="">
            <p className="font-bold text-[30px]">3 - 0</p>
          </div>
          <div className="flex flex-col items-start flex-1 ">
            <div className="flex flex-col items-center gap-3">
              <span>
                <img
                  className="h-20"
                  src={
                    getSimulationMatchQuery.data?.data?.simulation?.stats
                      ?.visitor?.team?.image_url
                  }
                  alt=""
                />
              </span>
              <p className="font-semibold text-[18px] text-center">
                {
                  getSimulationMatchQuery.data?.data?.simulation?.stats?.visitor
                    ?.team?.name
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posesión */}
      <div className="w-full min-h-[220px] rounded-[15px] bg-black-2-custom p-8">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-10 h-10 rounded-lg bg-green-1-custom grid place-items-center ">
            <i className="fi fi-tr-heart-rate flex text-[20px]"></i>
          </div>
          <p className="text-white font-bold text-[20px]">Posesión de balón</p>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <p className="text-[14px] text-white font-normal">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                  ?.team?.name
              }
            </p>
            <p className="text-[14px] text-white font-normal">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                  ?.possession
              }
            </p>
          </div>
          <div className="w-full bg-[#676767] rounded-lg h-2 my-1">
            <div
              style={{
                width:
                  getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                    ?.possession,
              }}
              className=" bg-linear-to-r from-blue-1-custom to-green-1-custom rounded-lg h-2"
            ></div>
          </div>
        </div>
        <div className=" mt-5">
          <div className="flex justify-between items-center">
            <p className="text-[14px] text-white font-normal">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.visitor
                  ?.team?.name
              }
            </p>
            <p className="text-[14px] text-white font-normal">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.visitor
                  ?.possession
              }
            </p>
          </div>
          <div className="w-full bg-[#676767] rounded-lg h-2 my-1">
            <div
              style={{
                width:
                  getSimulationMatchQuery.data?.data?.simulation?.stats?.visitor
                    ?.possession,
              }}
              className="bg-linear-to-r from-blue-1-custom to-green-1-custom rounded-lg h-2"
            ></div>
          </div>
        </div>
      </div>

      {/* Tarjetas */}
      <div className="w-full min-h-[220px] rounded-[15px] bg-black-2-custom p-8">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-10 h-10 rounded-lg bg-green-1-custom grid place-items-center ">
            <i className="fi fi-rr-exclamation flex text-[20px]"></i>
          </div>
          <p className="text-white font-bold text-[20px]">Tarjetas</p>
        </div>
        <div className=" mt-6">
          <div className="flex items-center justify-between">
            <p className="font-normal">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                  ?.team?.name
              }
            </p>
            <div className="flex gap-3">
              <div className=" flex flex-col items-center">
                <p>
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                      ?.yellow_cards
                  }
                </p>
                <div className="w-3.5 h-[18px] rounded-xs bg-yellow-1-custom"></div>
              </div>
              <div className=" flex flex-col items-center">
                <p>
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                      ?.red_cards
                  }
                </p>

                <div className="w-3.5 h-[18px] rounded-xs bg-red-1-custom"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="font-normal">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.visitor
                  ?.team?.name
              }
            </p>
            <div className="flex gap-3">
              <div className=" flex flex-col items-center">
                <p>
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats
                      ?.visitor?.yellow_cards
                  }
                </p>
                <div className="w-3.5 h-[18px] rounded-xs bg-yellow-1-custom"></div>
              </div>
              <div className=" flex flex-col items-center">
                <p>
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats
                      ?.visitor?.red_cards
                  }
                </p>

                <div className="w-3.5 h-[18px] rounded-xs bg-red-1-custom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiros al arco */}
      <div className="w-full min-h-[220px] rounded-[15px] bg-black-2-custom p-8 xl:col-span-1 col-span-full">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-10 h-10 rounded-lg bg-green-1-custom grid place-items-center ">
            <i className="fi fi-ts-target flex text-[20px]"></i>
          </div>
          <p className="text-white font-bold text-[20px]">Tiros al arco</p>
        </div>
        <div className=" mt-6">
          <div className="flex items-center justify-between">
            <p className="font-normal">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                  ?.team?.name
              }
            </p>
            <p className="text-[20px] font-bold">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                  ?.shots_on_goal
              }
            </p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="font-normal">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.visitor
                  ?.team?.name
              }
            </p>
            <p className="text-[20px] font-bold">
              {
                getSimulationMatchQuery.data?.data?.simulation?.stats?.visitor
                  ?.shots_on_goal
              }
            </p>
          </div>
        </div>
      </div>

      {/* Goles por tiempo */}
      <div className="w-full min-h-[300px] rounded-[15px] bg-black-2-custom col-span-full p-8">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-10 h-10 rounded-lg bg-green-1-custom grid place-items-center ">
            <i className="fi fi-tr-clock-three flex text-[20px]"></i>
          </div>
          <p className="text-white font-bold text-[20px]">Goles por tiempo</p>
        </div>
        <div className=" mt-8 grid lg:grid-cols-2 grid-cols-1 gap-8">
          <div className=" h-auto">
            <p className="font-light">Primer tiempo</p>
            <div className="mt-2 flex flex-col gap-4">
              <div className="w-full bg-gray-2-custom h-[52px] rounded-[15px] py-3 px-8 flex justify-between items-center">
                <p className="font-bold">
                  {" "}
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                      ?.team?.name
                  }
                </p>
                <p className="font-bold">
                  {" "}
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                      ?.goals_by_half?.first_half
                  }
                </p>
              </div>
              <div className="w-full bg-gray-2-custom h-[52px] rounded-[15px] py-3 px-8 flex justify-between items-center">
                <p className="font-bold">
                  {" "}
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats
                      ?.visitor?.team?.name
                  }
                </p>
                <p className="font-bold">
                  {" "}
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats
                      ?.visitor?.goals_by_half?.first_half
                  }
                </p>
              </div>
            </div>
          </div>
          <div className=" h-auto">
            <p className="font-light">Segundo tiempo</p>
            <div className="mt-2 flex flex-col gap-4">
              <div className="w-full bg-gray-2-custom h-[52px] rounded-[15px] py-3 px-8 flex justify-between items-center">
                <p className="font-bold">
                  {" "}
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats?.local
                      ?.team?.name
                  }
                </p>
                <p className="font-bold">1</p>
              </div>
              <div className="w-full bg-gray-2-custom h-[52px] rounded-[15px] py-3 px-8 flex justify-between items-center">
                <p className="font-bold">
                  {" "}
                  {
                    getSimulationMatchQuery.data?.data?.simulation?.stats
                      ?.visitor?.team?.name
                  }
                </p>
                {
                  getSimulationMatchQuery.data?.data?.simulation?.stats?.visitor
                    ?.goals_by_half?.second_half
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eventos */}
      <div className="w-full max-h-[550px] rounded-[15px] bg-black-2-custom col-span-full p-8 flex flex-col">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-10 h-10 rounded-lg bg-green-1-custom grid place-items-center ">
            <i className="fi fi-tr-users flex text-[20px]"></i>
          </div>
          <p className="text-white font-bold text-[20px]">Eventos</p>
        </div>

        <div className="mt-6 flex-1 overflow-y-auto flex flex-col gap-4 pr-4">
          {getSimulationMatchQuery.data?.data?.timeline?.events?.map((event) => (
            <CardEventSimulation key={event?.id} eventInfo={event} />
          ))}
        </div>
      </div>

      <div className="col-span-full grid place-items-center">
        <ButtonSimple
          actionButton={() => setCurrentSection(0)}
          startContent={
            <i className="fi fi-rr-football text-[20px] text-white flex"></i>
          }
          textButton="Simular otro partido"
          widthButton="w-auto max-w-[243px] w-full"
          heightButton="h-[50px]"
        />
      </div>
    </motion.div>
  );
};
