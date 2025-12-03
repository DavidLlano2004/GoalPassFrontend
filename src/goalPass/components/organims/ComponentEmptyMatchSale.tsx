export const ComponentEmptyMatchSale = () => {
  return (
    <div className=" bg-black-2-custom rounded-[15px] py-12 lg:px-20 px-8 w-full max-w-[800px] mx-auto">
      <div className=" flex flex-col justify-center items-center gap-2">
        <div className="w-[100px] h-[100px] rounded-full bg-linear-to-b from-blue-1-custom to-green-1-custom grid place-items-center">
          <i className="fi fi-sr-ticket flex text-white text-[45px]"></i>
        </div>
        <h1 className="lg:text-[28px] text-[24px] font-bold text-center">
          ¡Próximante nuevos partidos!
        </h1>
        <p className="font-light lg:text-[18px] text-[16px] text-center xl:w-[60%] w-full">
          Aún no hay partidos programados para la venta de boletas.
          ¡Mantente atento a nuestras próximas actualizaciones!
        </p>
      </div>
    </div>
  );
};
