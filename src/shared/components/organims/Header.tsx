import { useDisclosure } from "@heroui/react";
import { Images } from "../../../assets/images/ImagesProvider";
import { MenuSm } from "./menuSm/MenuSm";
import { ButtonSimple } from "../molecules/buttons/ButtonSimple";
import { MenuAccountButton } from "./menuAccountButton/MenuAccountButton";
import { useAppSelector } from "../../../redux/hooks/reduxHooks";
const { LogoAppSm } = Images;

export const Header = () => {
  const { name, email } = useAppSelector((state: any) => state.auth);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      className="bg-black-2-custom h-20 w-full border-b flex justify-between items-center px-4"
      style={{
        borderImage: "linear-gradient(to left, #00C853, #0038A8) 1",
      }}
    >
      <div className="w-full  flex items-center justify-between sm:hidden">
        <div className=" flex-1">
          <ButtonSimple
            actionButton={() => onOpen()}
            startContent={
              <i className="fi fi-tr-bars-staggered text-white text-[30px] flex"></i>
            }
            widthButton="min-w-0 w-auto !p-1"
            bgColorButton="bg-transparent"
          />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <MenuAccountButton name={name} email={email} />
      </div>

      <MenuSm isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
