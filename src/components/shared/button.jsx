const Button = ({ children, variant = "primary", size = "md", loading }) => {
  const base = "px-4 py-2 rounded font-semibold";
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    danger: "bg-red-500 text-white",
  };

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]}`}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;