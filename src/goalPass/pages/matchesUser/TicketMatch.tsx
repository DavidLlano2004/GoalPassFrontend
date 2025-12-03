import { motion } from "framer-motion";
import { Images } from "../../../assets/images/ImagesProvider";
import { Icons } from "../../../assets/icons/IconsProvider";
import { ButtonSimple } from "../../../shared/components/molecules/buttons/ButtonSimple";
import { useNavigate, useParams } from "react-router";
import { paths } from "../../../routes/paths";
import { useQueryTransaction } from "../../hooks/useQueryTransaction.hook";
import { Spinner } from "@heroui/spinner";
import { useFormatNumber } from "../../../shared/hooks/useFormatNumber";
import QRCode from "react-qr-code";

const { ImageBgAuth, LogoAppSm } = Images;
const { IconSuccessBuy } = Icons;

export const TicketMatch = () => {
  const { id } = useParams();
  const { formatNumber } = useFormatNumber();
  const { getTransactionDetailQuery } = useQueryTransaction(id!);
  const navigate = useNavigate();

  const formattedBirthday = getTransactionDetailQuery.data?.response?.match
    ?.match_date
    ? new Date(
        getTransactionDetailQuery.data?.response?.match?.match_date
      ).toLocaleDateString("es-ES", {
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
    <div
      style={{
        background: `url(${ImageBgAuth})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="overflow-hidden flex-1 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto py-6 px-4 bg-black/50 flex flex-col">
        {getTransactionDetailQuery.isLoading ? (
          <div className="flex-1 justify-center items-center flex">
            <Spinner size="lg" color="white" label="Cargando..." />
          </div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-2 items-center">
              <span>
                <img className="w-[100px]" src={IconSuccessBuy} alt="" />
              </span>
              <p className="font-bold text-[28px]">¡Compra exitosa!</p>
            </div>

            <div className=" mt-8 w-full flex flex-col items-center justify-center">
              <div className=" max-w-[1000px] w-full min-h-[1123px] rounded-[15px] bg-black-2-custom mb-8">
                <div className="w-full h-[110px] rounded-tr-[15px] rounded-tl-[15px] bg-linear-to-l from-green-1-custom to-blue-1-custom grid place-items-center">
                  <div className="flex items-center gap-4">
                    <img
                      className="sm:w-20 w-[72px]"
                      src={LogoAppSm}
                      alt="LogoAppSm"
                    />
                    <p className="font-bold sm:text-[28px] text-[24px]">
                      GoalPass
                    </p>
                  </div>
                </div>

                <div className="py-10 sm:px-16 px-8">
                  <div className=" mt-4 lg:flex-row flex-col flex items-center justify-center sm:gap-12 gap-6">
                    <div className="flex flex-col justify-center items-center gap-2  min-w-[200px]">
                      <span>
                        <img
                          className="h-[85px]"
                          src={
                            getTransactionDetailQuery.data?.response?.match
                              ?.local?.image_url
                          }
                          alt=""
                        />
                      </span>
                      <p className="  text-[20px]">
                        {
                          getTransactionDetailQuery.data?.response?.match?.local
                            ?.name
                        }
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[32px] font-extrabold">VS</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2  min-w-[200px]">
                      <span>
                        <img
                          className="h-[85px]"
                          src={
                            getTransactionDetailQuery.data?.response?.match
                              ?.visitor?.image_url
                          }
                          alt=""
                        />
                      </span>
                      <p className="  text-[20px]">
                        {
                          getTransactionDetailQuery.data?.response?.match
                            ?.visitor?.name
                        }
                      </p>
                    </div>
                  </div>
                  <div className=" flex sm:gap-10 gap-4 flex-wrap mt-10 justify-center">
                    <div className="flex items-center gap-2">
                      <i className="fi fi-tr-calendar-day flex text-[16px]"></i>
                      <p className="text-[14px]">{formattedBirthday}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fi fi-tr-clock-five flex text-[16px]"></i>
                      <p className="text-[14px]">
                        {formatTo12Hour(
                          getTransactionDetailQuery.data?.response?.match
                            ?.match_hour ?? ""
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fi fi-tr-court-sport flex text-[16px]"></i>
                      <p className="text-[14px]">
                        {
                          getTransactionDetailQuery.data?.response?.match
                            ?.stadium
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fi fi-rr-marker flex text-[16px]"></i>
                      <p className="text-[14px]">
                        {
                          getTransactionDetailQuery.data?.response?.ticket[0]
                            ?.msp?.stand?.name
                        }
                      </p>
                    </div>
                  </div>
                  <div className="w-full max-w-[260px] h-[260px] bg-white rounded-[15px] m-auto my-20 flex justify-center items-center">
                    <QRCode
                      value={
                        getTransactionDetailQuery.data?.response?.ticket[0]
                          ?.ticket_code ?? ""
                      }
                      size={200}
                    />
                  </div>
                  <div>
                    <h1 className=" font-bold text-[18px]">
                      Detalles de la boleta
                    </h1>
                    <div className="w-full rounded-[15px] bg-gray-2-custom h-auto mt-4 p-12 flex flex-col gap-8">
                      <div className="flex items-center justify-between flex-wrap">
                        <p className="font-light text-[18px]">Ubicación:</p>
                        <p className="text-[18px] font-semibold">
                          {
                            getTransactionDetailQuery.data?.response?.ticket[0]
                              ?.msp?.stand?.name
                          }
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-light text-[18px]">
                          Cantidad de boletas:
                        </p>
                        <p className="text-[18px] font-semibold">
                          x{" "}
                          {
                            getTransactionDetailQuery.data?.response
                              ?.number_tickets
                          }
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-light text-[18px]">
                          Precio unitario:
                        </p>
                        <p className="text-[18px] font-semibold">
                          ${" "}
                          {formatNumber(
                            getTransactionDetailQuery.data?.response?.ticket[0]
                              ?.price ?? 0
                          )}
                        </p>
                      </div>
                      <div className="h-0.5 bg-linear-to-l from-green-1-custom to-blue-1-custom"></div>
                      <div className="flex items-center justify-between">
                        <p className="font-light text-[18px]">Total pagado:</p>
                        <p className="text-[18px] font-semibold">
                          ${" "}
                          {formatNumber(
                            getTransactionDetailQuery.data?.response
                              ?.total_amount ?? 0
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ButtonSimple
                actionButton={() => navigate(paths.LayoutGoalPass)}
                textButton="Comprar más boletas"
                widthButton="max-w-[248px] w-full"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
