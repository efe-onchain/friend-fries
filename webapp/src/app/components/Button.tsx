import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "outline" | "ghost" | "solid";
  size?: "small" | "medium" | "large" | "icon";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "solid",
  size = "medium",
}) => {
  const baseStyles = "rounded-md text-center focus:outline-none";

  const variantStyles = {
    solid: "bg-black text-white hover:bg-gray-800",
    outline: "bg-transparent border border-black text-black hover:bg-gray-100",
    ghost: "bg-transparent text-black hover:bg-gray-100",
  };

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
    icon: "p-2 w-8 h-8 flex items-center justify-center",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
};
