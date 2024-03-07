import { icons } from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  onclick?: () => void;
}

const Icon = ({ name, color = "purple", size = 24, onclick }: IconProps) => {
  const LucideIcon = icons[name as keyof typeof icons];

  if (!LucideIcon) {
    console.error(`Icon '${name}' not found`);
    return null;
  }

  return (
    <LucideIcon
      color={color}
      size={size}
      onClick={onclick}
      className="cursor-pointer"
    />
  );
};

export default Icon;
