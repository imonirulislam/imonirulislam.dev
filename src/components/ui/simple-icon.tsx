import React from "react";

interface SimpleIconProps {
  icon: {
    title: string;
    slug: string;
    hex: string;
    path: string;
  };
  className?: string;
  color?: string;
}

export const SimpleIcon = ({ icon, className, color }: SimpleIconProps) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill={color || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
};
