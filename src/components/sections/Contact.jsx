import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import Button from '@/components/ui/Button'
import TextReveal from '@/components/effects/TextReveal'

// Initialize EmailJS
emailjs.init('zoPYARcdPfKrTmnW0')

const inputBase = `
  w-full bg-transparent border-b py-3
  font-body text-sm text-[var(--color-text-primary)]
  placeholder:text-[var(--color-text-secondary)]/40
  focus:outline-none focus:border-[var(--theme-accent)]
  transition-colors duration-500
  theme-transition
`

const borderDefault = { borderColor: 'rgba(138,138,138,0.2)' }

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] tracking-[0.25em] uppercase flex items-center gap-1"
        style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--theme-accent)' }}>*</span>
        )}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    personnes: '',
    budget: '',
    projet: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const messageContent = `
Prénom: ${formData.prenom}
Nom: ${formData.nom}
Email: ${formData.email}
Téléphone: ${formData.telephone}
Entreprise: ${formData.entreprise}
Nombre de personnes: ${formData.personnes}
Budget: ${formData.budget}

Projet:
${formData.projet}
      `

      await emailjs.send('service_38wqrsc', 'template_pzj8x18', {
        name: `${formData.prenom} ${formData.nom}`,
        message: messageContent,
        time: new Date().toLocaleString('fr-FR'),
      })
      setSubmitted(true)
      setFormData({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        entreprise: '',
        personnes: '',
        budget: '',
        projet: '',
      })
    } catch (error) {
      console.error('Email send error:', error)
      alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="relative min-h-screen py-section px-6 md:px-12">
      {/* Glow background */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--theme-accent)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-5xl mx-auto w-full">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.span
            className="text-xs tracking-[0.3em] uppercase block mb-8"
            style={{ color: 'var(--color-text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Contact
          </motion.span>
          <TextReveal as="h1" className="font-display text-display-lg mb-6" style={{ textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--color-text-primary)' }}>Créons</span>
            <span
              className="ml-3 transition-colors duration-700"
              style={{ color: 'var(--theme-accent)', fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif", textTransform: 'none' }}
            >
              votre univers
            </span>
          </TextReveal>
          <motion.p
            className="font-body text-lg max-w-xl leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Voyage, anniversaire, séminaire, demande en mariage…
            Racontez-nous votre projet — nous écrirons la suite.
          </motion.p>
        </div>

        {/* Grid : infos + formulaire */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">

          {/* Colonne gauche — infos */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <span
                className="text-[10px] tracking-[0.3em] uppercase block mb-3"
                style={{ color: 'var(--theme-accent)', opacity: 0.8 }}
              >
                Email
              </span>
              <a
                href="mailto:studioparenthese1@gmail.com"
                className="text-sm transition-colors duration-500 hover:text-[var(--theme-accent)]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                studioparenthese1@gmail.com
              </a>
            </div>
            <div>
              <span
                className="text-[10px] tracking-[0.3em] uppercase block mb-3"
                style={{ color: 'var(--theme-accent)', opacity: 0.8 }}
              >
                Délai de réponse
              </span>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Sous 48h ouvrées
              </p>
            </div>
            <div
              className="pt-10 border-t"
              style={{ borderColor: 'rgba(138,138,138,0.12)' }}
            >
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
              >
                Les champs marqués d'un{' '}
                <span style={{ color: 'var(--theme-accent)' }}>*</span>{' '}
                sont obligatoires.
              </p>
            </div>
          </motion.div>

          {/* Formulaire */}
          {submitted ? (
            <motion.div
              className="flex flex-col items-start gap-6 py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--theme-accent)' }}
              />
              <h3
                className="font-display text-2xl"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Message envoyé.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Nous reviendrons vers vous sous 48h ouvrées.
              </p>
            </motion.div>
          ) : (
            <form
              name="contact"
              method="POST"
              netlify
              netlifyHoneypot="bot-field"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p style={{ display: 'none' }}>
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </p>
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
              >

              {/* Prénom / Nom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field label="Prénom" required>
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Votre prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className={inputBase}
                    style={borderDefault}
                  />
                </Field>
                <Field label="Nom" required>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Votre nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className={inputBase}
                    style={borderDefault}
                  />
                </Field>
              </div>

              {/* Email / Téléphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field label="Email" required>
                  <input
                    type="email"
                    name="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputBase}
                    style={borderDefault}
                  />
                </Field>
                <Field label="Téléphone" required>
                  <input
                    type="tel"
                    name="telephone"
                    placeholder="+33 6 00 00 00 00"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className={inputBase}
                    style={borderDefault}
                  />
                </Field>
              </div>

              {/* Entreprise / Nombre de personnes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field label="Entreprise">
                  <input
                    type="text"
                    name="entreprise"
                    placeholder="Nom de votre entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    className={inputBase}
                    style={borderDefault}
                  />
                </Field>
                <Field label="Nombre de personnes" required>
                  <input
                    type="number"
                    name="personnes"
                    placeholder="Ex : 20"
                    min="1"
                    value={formData.personnes}
                    onChange={handleChange}
                    required
                    className={inputBase}
                    style={borderDefault}
                  />
                </Field>
              </div>

              {/* Budget */}
              <Field label="Budget total (ou par participant selon le projet)" required>
                <input
                  type="text"
                  name="budget"
                  placeholder="Ex : 10 000 €"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className={inputBase}
                  style={borderDefault}
                />
              </Field>

              {/* Projet */}
              <Field label="Parlez-nous de votre projet" required>
                <textarea
                  name="projet"
                  placeholder="Décrivez votre projet, l'occasion, le lieu souhaité, vos envies…"
                  rows={5}
                  value={formData.projet}
                  onChange={handleChange}
                  required
                  className={`${inputBase} resize-none`}
                  style={borderDefault}
                />
              </Field>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le projet'}
                </Button>
              </div>
              </motion.div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
