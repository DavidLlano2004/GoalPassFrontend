import { useState } from "react";
import { ButtonSimple } from "../../../../shared/components/molecules/buttons/ButtonSimple";
import { useForm } from "react-hook-form";
import { FormEditProfile } from "../../../components/molecules/forms/FormEditProfile";

export const MyInformation = () => {
  const [valueBirthday, setValueBirthday] = useState();
  const [isEdit, setIsEdit] = useState(true);
  const { control } = useForm();
  console.log(valueBirthday);

  return (
    <>
      <div className="flex justify-between items-center flex-wrap sm:gap-0 gap-4">
        <h1 className="font-bold text-[18px]">Información personal</h1>
        <ButtonSimple
          actionButton={() => setIsEdit((prev) => !prev)}
          startContent={
            <i
              className={`fi fi-rr-${
                !isEdit ? "paper-plane-top" : "edit"
              } paper-plane-top text-[16px] text-white flex`}
            ></i>
          }
          borderGradient
          textButton={!isEdit ? "Enviar" : "Editar perfil"}
          widthButton="max-w-[191px] w-full"
          heightButton="h-[45px]"
          bgColorButton="bg-gray-2-custom"
        />
      </div>
      <FormEditProfile
        control={control}
        setValuePicker={setValueBirthday}
        valuePicker={valueBirthday}
        edit={isEdit}
      />
    </>
  );
};
