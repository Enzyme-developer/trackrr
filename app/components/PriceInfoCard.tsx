import Image from "next/image";
import Icon from "./Icon";

interface Props {
  title: string;
  iconSrc: string;
  value: string;
}

const PriceInfoCard = ({ title, iconSrc, value }: Props) => {
  return (
    <div className={`price-info_card`}>
      <p className="text-base text-black-100">{title}</p>

      <div className="flex gap-1">
        <Icon name={iconSrc} />

        <p className="text-2xl font-bold text-black">{value}</p>
      </div>
    </div>
  );
};

export default PriceInfoCard;
