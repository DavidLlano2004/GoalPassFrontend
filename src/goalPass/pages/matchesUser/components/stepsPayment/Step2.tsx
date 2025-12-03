import { useForm } from "react-hook-form";
import { ButtonSimple } from "../../../../../shared/components/molecules/buttons/ButtonSimple";
import { ComponentInputCard } from "../../../../../shared/components/organims/inputCard/ComponentInputCard";
import { useFormatNumber } from "../../../../../shared/hooks/useFormatNumber";
interface Props {
  actionBack: () => void;
  actionPayEnd: () => void;
  soccerStandName: string;
  totalPrice: number;
  numberTickets: number;
  loadingButtonPay: boolean;
}
export const Step2 = ({
  actionBack,
  actionPayEnd,
  soccerStandName,
  totalPrice,
  numberTickets,
  loadingButtonPay,
}: Props) => {
  const { control, handleSubmit } = useForm();

  const { formatNumber } = useFormatNumber();

  return (
    <>
      <div className="rounded-[15px] w-full min-h-[130px] bg-gray-2-custom p-6 gap-2 flex flex-col">
        <div className="flex items-center justify-between">
          <p className="font-light text-[16px]">Ubicación</p>
          <p className="text-[16px] font-semibold">{soccerStandName}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-light text-[16px]">Cantidad</p>
          <p className="text-[16px] font-semibold">{numberTickets} boleta(s)</p>
        </div>
        <div className="w-full h-px bg-linear-to-l from-green-1-custom to-blue-1-custom my-2"></div>
        <div className="flex items-center justify-between">
          <p className="font-light text-[16px]">Total</p>
          <p className="text-[16px] font-semibold">
            $ {formatNumber(totalPrice)}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <ComponentInputCard control={control} />
      </div>
      <form onSubmit={handleSubmit(actionPayEnd)} className="mt-8 flex gap-4">
        <ButtonSimple
          actionButton={actionBack}
          borderGradient
          textButton="Volver"
          widthButton="w-full"
          heightButton="h-[45px]"
          bgColorButton="bg-gray-2-custom"
          type="button"
        />
        <ButtonSimple
          textButton="Pagar"
          widthButton="w-full"
          heightButton="h-[45px]"
          type="submit"
          isLoading={loadingButtonPay}
        />
      </form>
    </>
  );
};
