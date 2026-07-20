import { motion } from 'framer-motion'
import { useState } from 'react'

/**
 * Enhanced Form Field Component
 * Features:
 * - Smooth focus animations
 * - Error state feedback
 * - Success validation
 * - Accessibility labels
 * - Responsive styling
 */
export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled,
  rows,
  maxLength,
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [isValid, setIsValid] = useState(null)

  const handleChange = (e) => {
    onChange?.(e)
    // Simple validation
    if (type === 'email') {
      setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value))
    } else if (required && type !== 'tel') {
      setIsValid(e.target.value.length > 0)
    }
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const inputClass = `
    w-full bg-transparent border-b py-3
    font-body text-sm text-[var(--color-text-primary)]
    placeholder:text-[var(--color-text-secondary)]/40
    focus:outline-none transition-all duration-200
    theme-transition
    ${error ? 'border-red-500' : isFocused ? 'border-[var(--theme-accent)]' : 'border-[rgba(138,138,138,0.2)]'}
  `

  const Field = rows ? 'textarea' : 'input'

  return (
    <div className="flex flex-col gap-2">
      <motion.label
        className="text-[10px] tracking-[0.25em] uppercase flex items-center gap-1"
        style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
        animate={{ opacity: isFocused ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
      >
        {label}
        {required && (
          <motion.span
            style={{ color: 'var(--theme-accent)' }}
            animate={{ scale: isFocused ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
          >
            *
          </motion.span>
        )}
      </motion.label>

      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Field
          type={Field === 'textarea' ? undefined : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={inputClass}
          style={{ borderColor: error ? '#ef4444' : isFocused ? 'var(--theme-accent)' : 'rgba(138,138,138,0.2)' }}
          required={required}
        />

        {/* Validation indicator */}
        {isValid !== null && !isFocused && (
          <motion.div
            className="absolute right-0 top-3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className={isValid ? 'text-green-500' : 'text-red-500'}>
              {isValid ? '✓' : '✗'}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.p
          className="text-xs"
          style={{ color: '#ef4444' }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}

      {/* Helper text */}
      {maxLength && (
        <motion.p
          className="text-xs"
          style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
          animate={{ opacity: isFocused ? 0.8 : 0.5 }}
        >
          {value?.length || 0} / {maxLength}
        </motion.p>
      )}
    </div>
  )
}
