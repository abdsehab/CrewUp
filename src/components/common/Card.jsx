
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-dark-surface border border-dark-border rounded-xl shadow-xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Card;
