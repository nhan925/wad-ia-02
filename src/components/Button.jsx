/**
 * Reusable Button Component
 */
const Button = ({ value, onClick, className = '', span = 1, children, disabled = false }) => (
  <button
    className={`
      px-3 md:px-5 py-3 md:py-4 text-sm md:text-base font-semibold rounded-lg
      transition-all duration-150 ease-in-out
      hover:scale-[1.02] active:scale-95 active:opacity-60
      focus:outline-none
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
