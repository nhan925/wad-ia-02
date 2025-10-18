/**
 * Reusable Button Component
 */
const Button = ({ value, onClick, className = '', span = 1, children, disabled = false }) => (
  <button
    className={`
      px-5 py-4 text-xl font-semibold rounded-lg
      transition-all duration-150 ease-in-out
      hover:scale-[1.02] active:scale-95
      focus:outline-none focus:ring-2 focus:ring-white/30
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      ${className}
    `}
    onClick={onClick}
    disabled={disabled}
    style={{ gridColumn: span > 1 ? `span ${span}` : 'auto' }}
  >
    {children || value}
  </button>
);

export default Button;
