import { ButtonSimple } from "../../../../../shared/components/molecules/buttons/ButtonSimple";
import { InputSimple } from "../../../../../shared/components/molecules/input/InputSimple";
interface Props {
  control: any;
  actionBack: () => void;
  actionPayEnd: () => void;
}
export const Step2 = ({ control, actionBack, actionPayEnd }: Props) => {
  return (
    <>
      <div className="rounded-[15px] w-full min-h-[130px] bg-gray-2-custom p-6 gap-2 flex flex-col">
        <div className="flex items-center justify-between">
          <p className="font-light text-[16px]">Ubicación</p>
          <p className="text-[16px] font-semibold">Occidental</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-light text-[16px]">Cantidad</p>
          <p className="text-[16px] font-semibold">1 boleta(s)</p>
        </div>
        <div className="w-full h-px bg-linear-to-l from-green-1-custom to-blue-1-custom my-2"></div>
        <div className="flex items-center justify-between">
          <p className="font-light text-[16px]">Total</p>
          <p className="text-[16px] font-semibold">$45,000</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <InputSimple
          control={control}
          nameRegister="name"
          label="Nombre"
          validations={{ required: "El nombre es requerido" }}
        />
        <InputSimple
          control={control}
          nameRegister="name"
          label="Correo electrónico"
          validations={{ required: "El nombre es requerido" }}
        />
        <InputSimple
          control={control}
          nameRegister="name"
          label="N° Identificación"
          validations={{ required: "El nombre es requerido" }}
        />
        <InputSimple
          control={control}
          nameRegister="name"
          label="N° Tarjeta de crédito"
          validations={{ required: "El nombre es requerido" }}
        />
      </div>
      <div className="mt-8 flex gap-4">
        <ButtonSimple
          actionButton={actionBack}
          borderGradient
          textButton="Volver"
          widthButton="w-full"
          heightButton="h-[45px]"
          bgColorButton="bg-gray-2-custom"
        />
        <ButtonSimple
          actionButton={actionPayEnd}
          textButton="Pagar"
          widthButton="w-full"
          heightButton="h-[45px]"
        />
      </div>
    </>
  );
};
