// frontend/src/components/shared/Input/Input.jsx
import PropTypes from 'prop-types'

export default function Input({
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  required = false,
  className = ''
}) {
  const id = name || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors
          ${error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string
}