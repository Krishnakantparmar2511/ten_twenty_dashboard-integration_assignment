interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' ;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  type = 'button',
  variant = 'primary',
  fullWidth = true,
  disabled = false
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400"
  };
  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${widthStyle}`}
    >
      {text}
    </button>
  );
};