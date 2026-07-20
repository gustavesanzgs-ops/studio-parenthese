import { motion } from 'framer-motion'
import { useState } from 'react'

/**
 * Premium Form Field Component
 * Features:
 * - Floating label animation
 * - Animated underline (gradient slide)
 * - Enhanced focus states with background blur
 * - Success/error animations
 * - Character counter with progress
 * - Accessibility optimized
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
  const isFilled = value && value.length > 0

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

  const Field = rows ? 'textarea' : 'input'
  const progress = maxLength ? (value?.length || 0) / maxLength : null

  const labelVariants = {
    floating: {
      y: '-1.75rem',
      scale: 0.75,
      opacity: 0.8,
    },
    resting: {
      y: '0rem',
      scale: 1,
      opacity: isFocused ? 1 : 0.6,
    },
  }

  const underlineVariants = {
    empty: { scaleX: 0, x: '-50%' },
    focused: { scaleX: 1, x: '0%' },
  }

  const containerVariants = {
    empty: { backgroundColor: 'transparent' },
    focused: { backgroundColor: 'rgba(var(--theme-accent-rgb, 255, 90, 0), 0.04)' },
    filled: { backgroundColor: 'rgba(var(--theme-accent-rgb, 255, 90, 0), 0.02)' },
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Floating Label */}
      <motion.label
        className="text-[11px] tracking-[0.2em] uppercase flex items-center gap-1 cursor-text"
        initial={false}
        animate={isFocused || isFilled ? 'floating' : 'resting'}
        variants={labelVariants}
        style={{ color: 'var(--color-text-secondary)' }}
        transition={{ duration: 0.3, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {label}
        {required && (
          <motion.span
            style={{ color: 'var(--theme-accent)' }}
            animate={{ scale: isFocused ? 1.3 : 1, opacity: isFocused ? 1 : 0.6 }}
            transition={{ duration: 0.2 }}
          >
            *
          </motion.span>
        )}
      </motion.label>

      {/* Input Container */}
      <motion.div
        className="relative"
        initial={false}
        animate={isFocused ? 'focused' : isFilled ? 'filled' : 'empty'}
        variants={containerVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
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
            className={`
              w-full bg-transparent border-b py-3 px-0
              font-body text-sm text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-secondary)]/30
              focus:outline-none transition-colors duration-200
              theme-transition
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-b-[#ef4444]' : 'border-b-[rgba(138,138,138,0.2)]'}
            `}
            style={{
              borderBottomColor: error ? '#ef4444' : isFocused ? 'var(--theme-accent)' : 'rgba(138,138,138,0.2)',
            }}
            required={required}
          />

          {/* Animated Underline */}
          <motion.div
            className="absolute bottom-0 left-1/2 w-full h-0.5 origin-center"
            initial={false}
            animate={isFocused ? 'focused' : 'empty'}
            variants={underlineVariants}
            transition={{ duration: 0.3, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            style={{
              background: error
                ? '#ef4444'
                : `linear-gradient(90deg, var(--theme-accent), var(--theme-accent) 50%, rgba(var(--theme-accent-rgb), 0) 100%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Validation Indicator */}
          {isValid !== null && !isFocused && (
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isValid ? (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </motion.div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            className="text-xs mt-2"
            style={{ color: '#ef4444' }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}

        {/* Character Counter with Progress */}
        {maxLength && (
          <motion.div className="mt-2 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex-1 h-1 bg-[rgba(138,138,138,0.1)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent)]/60"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min((progress || 0) * 100, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}>
              {value?.length || 0} / {maxLength}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
