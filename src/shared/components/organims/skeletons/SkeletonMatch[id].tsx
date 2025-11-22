import { Skeleton } from "@heroui/skeleton";

export const SkeletonInfoOneMatch = () => {
  return (
    <div className="overflow-y-auto flex-1 sm:p-6 p-4 flex flex-col">
      {/* Botón Volver */}
      <Skeleton className="rounded-xl w-[170px] h-[25px] bg-[#8C8C90]" />

      <div className="w-full max-w-[1123px] mx-auto">
        {/* Card principal del partido */}
        <div className="bg-black-2-custom w-full h-auto relative rounded-[15px] mt-6 flex justify-between items-center py-6 px-10">
          <div className="w-full flex lg:flex-row flex-col justify-between">
            <div className="flex sm:flex-row flex-col items-center gap-10 flex-1">
              {/* Fecha y ubicación móvil */}
              <div className="flex sm:hidden gap-3 justify-center mt-6 flex-wrap">
                <Skeleton className="rounded-lg w-[180px] h-4 bg-[#8C8C90]" />
                <Skeleton className="rounded-lg w-[180px] h-4 bg-[#8C8C90]" />
              </div>

              {/* Equipo Local */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <Skeleton className="rounded-full w-[85px] h-[85px] bg-[#8C8C90]" />
                <Skeleton className="rounded-lg w-[120px] h-5 bg-[#8C8C90] mt-2" />
              </div>

              {/* VS y fecha/ubicación desktop */}
              <div className="flex flex-col items-center flex-[1.2]">
                <Skeleton className="rounded-lg w-[50px] h-[25px] bg-[#8C8C90]" />
                <div className="sm:flex flex-col hidden gap-1 justify-center mt-6">
                  <Skeleton className="rounded-lg w-[180px] h-3.5 bg-[#8C8C90]" />
                  <Skeleton className="rounded-lg w-[120px] h-3.5 bg-[#8C8C90] mt-1" />
                </div>
              </div>

              {/* Equipo Visitante */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <Skeleton className="rounded-full w-[85px] h-[85px] bg-[#8C8C90]" />
                <Skeleton className="rounded-lg w-[140px] h-5 bg-[#8C8C90] mt-2" />
              </div>
            </div>

            {/* Chip de estado y ventas */}
            <div className="flex flex-col justify-between lg:items-end items-center flex-1 lg:mt-0 mt-6 lg:gap-0 gap-3">
              <Skeleton className="rounded-lg w-[120px] h-[30px] bg-[#8C8C90]" />
              <div className="flex flex-col items-end">
                <Skeleton className="rounded-lg w-[100px] h-5 bg-[#8C8C90]" />
                <Skeleton className="rounded-lg w-[120px] h-4 bg-[#8C8C90] mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid de contenido */}
        <div className="flex lg:flex-row flex-col gap-4 mt-4">
          {/* Mapa del estadio */}
          <div className="bg-black-2-custom flex-[1.35] h-auto rounded-[15px] p-8 lg:order-1 order-2">
            <div className="flex items-center gap-3">
              <Skeleton className="rounded-lg w-[20px] h-5 bg-[#8C8C90]" />
              <Skeleton className="rounded-lg w-[180px] h-[24px] bg-[#8C8C90]" />
            </div>

            {/* Cards de tribunas */}
            <div className="mt-8 flex flex-col gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-full min-h-[90px] bg-gray-2-custom rounded-[15px] p-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="rounded-full w-[50px] h-[50px] bg-[#8C8C90]" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="rounded-lg w-[100px] h-[18px] bg-[#8C8C90]" />
                      <Skeleton className="rounded-lg w-[80px] h-3.5 bg-[#8C8C90]" />
                    </div>
                  </div>
                  <Skeleton className="rounded-lg w-[100px] h-[25px] bg-[#8C8C90]" />
                </div>
              ))}

              {/* Card de estadísticas */}
              <div className="w-full sm:h-[100px] min-h-[100px] rounded-[15px] bg-gray-2-custom flex sm:justify-between justify-center sm:gap-0 gap-4 items-center px-10 sm:py-0 py-10 flex-wrap">
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="rounded-lg w-[90px] h-3.5 bg-[#8C8C90]" />
                  <Skeleton className="rounded-lg w-[60px] h-[24px] bg-[#8C8C90]" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="rounded-lg w-[90px] h-3.5 bg-[#8C8C90]" />
                  <Skeleton className="rounded-lg w-[60px] h-[24px] bg-[#8C8C90]" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="rounded-lg w-[110px] h-3.5 bg-[#8C8C90]" />
                  <Skeleton className="rounded-lg w-[70px] h-[24px] bg-[#8C8C90]" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar derecho */}
          <div className="flex-1 flex flex-col gap-4 lg:order-2 order-1">
            {/* Card superior vacía */}
            <Skeleton className="rounded-[15px] h-[340px] bg-[#8C8C90] sm:order-1 order-2" />

            {/* Card de acciones */}
            <div className="bg-black-2-custom rounded-[15px] min-h-[295px] p-8 sm:order-2 order-1">
              <Skeleton className="rounded-lg w-[120px] h-[24px] bg-[#8C8C90]" />

              <div className="mt-6 flex flex-col gap-6">
                {[1, 2, 3].map((item) => (
                  <Skeleton
                    key={item}
                    className="rounded-[15px] min-w-[190px] w-full h-[45px] bg-[#8C8C90]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
