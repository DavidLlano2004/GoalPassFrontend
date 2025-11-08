interface Props {
  titleCard: string;
  subtitleCard: string;
  iconCard: string;
  className?: string;
}
export const CardStepsInit = ({
  titleCard,
  subtitleCard,
  iconCard,
  className,
}: Props) => {
  return (
    <div
      className={`min-h-[225px] rounded-[15px]  bg-linear-to-b from-blue-1-custom to-green-1-custom p-px ${className}`}
    >
      <div className="w-full h-full bg-gray-2-custom rounded-[15px] top-0 flex flex-col gap-2 items-center justify-center p-6">
        <div className="w-[60px] h-[60px] rounded-[10px] bg-black-2-custom grid place-items-center">
          <i className={`${iconCard} flex text-white text-[26px]`}></i>
        </div>
        <p className="text-white font-bold text-[20px] text-center">
          {titleCard}
        </p>
        <p className="font-light text-center">{subtitleCard}</p>
      </div>
    </div>
  );
};
