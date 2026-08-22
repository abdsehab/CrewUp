import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', to, onClick, type = 'button', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-dark-bg";
  
  const variants = {
    primary: "bg-brand text-dark-bg hover:bg-brand-hover px-6 py-3",
    secondary: "bg-transparent border border-dark-border text-light hover:border-brand hover:text-brand px-6 py-3",
    ghost: "bg-transparent text-light hover:text-brand px-4 py-2",
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
