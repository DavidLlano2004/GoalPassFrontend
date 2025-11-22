import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useEffect, useState, type ReactNode } from "react";

type ModalCustomProps = {
  isOpen?: boolean;
  onClose?: () => void;
  isDeleteModal?: boolean;
  isLoadingButton?: boolean;
  onSubmitModal?: () => void;
  textButton?: string;
  children?: ReactNode;
  titleModal?: string;
};

export const ModalCustom = ({
  isOpen = false,
  onClose,
  isDeleteModal = false,
  isLoadingButton = false,
  onSubmitModal,
  textButton,
  children,
  titleModal,
}: ModalCustomProps) => {
  const [placement, setPlacement] = useState<
    "top" | "center" | "bottom" | "auto" | "top-center" | "bottom-center"
  >("top");

  useEffect(() => {
    const updatePlacement = () => {
      if (window.innerWidth < 768) {
        setPlacement("bottom");
      } else {
        setPlacement("top");
      }
    };

    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    return () => window.removeEventListener("resize", updatePlacement);
  }, []);

  return (
    <>
      <Modal
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
        placement={placement}
      >
        <ModalContent className="p-2 bg-black-2-custom max-w-[500px]">
          {(onClose) => (
            <>
              {!isDeleteModal && (
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center">
                    <div className="bg-green-1-custom w-2 h-6"></div>
                    <p className="font-sembold text-white">{titleModal}</p>
                  </div>
                </ModalHeader>
              )}

              <ModalBody>{children}</ModalBody>
              {textButton && (
                <ModalFooter>
                  <Button
                    onPress={onClose}
                    className={` h-[45px] ${
                      isDeleteModal
                        ? "bg-black-custom text-white"
                        : "bg-gray-2-custom text-white "
                    }  rounded-3xl text-base px-10`}
                  >
                    <span
                      className="absolute inset-0 rounded-3xl p-0.5"
                      style={{
                        background: "linear-gradient(to top, #00C853, #0038A8)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    ></span>
                    Cancelar
                  </Button>
                  <Button
                    isLoading={isLoadingButton}
                    onPress={onSubmitModal}
                    className={` h-12 ${
                      !isDeleteModal
                        ? "bg-linear-to-r from-blue-1-custom to-green-1-custom text-white"
                        : "bg-transparent text-black-custom  border border-black-custom "
                    }  rounded-3xl text-base px-10`}
                  >
                    {textButton}
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
