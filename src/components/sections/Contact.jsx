import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import TextReveal from '@/components/effects/TextReveal'


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
      const response = await fetch('https://formspree.io/f/mgogaqaj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          entreprise: formData.entreprise,
          personnes: formData.personnes,
          budget: formData.budget,
          projet: formData.projet,
        }),
      })

      if (response.ok) {
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
      } else {
        alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.')
      }
    } catch (error) {
      console.error('Form send error:', error)
      alert('Erreur de connexion. Veuillez réessayer.')
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

          {/* Form Progress Indicator */}
          {!submitted && (
            <motion.div
              className="mb-8 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Progression du formulaire
                </span>
                <span
                  className="text-xs font-display"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  {Math.round(
                    ((Object.values(formData).filter((v) => v && v.length > 0).length) / 8) * 100
                  )}
                  %
                </span>
              </div>
              <div className="w-full h-1.5 bg-[rgba(138,138,138,0.1)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent)]/60"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${Math.round(
                      ((Object.values(formData).filter((v) => v && v.length > 0).length) / 8) * 100
                    )}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          )}

          {/* Formulaire */}
          {submitted ? (
            <motion.div
              className="flex flex-col items-start gap-6 py-16"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              {/* Success animation */}
              <motion.span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'var(--theme-accent)' }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h3
                className="font-display text-2xl"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Message envoyé.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Nous reviendrons vers vous sous 48h ouvrées. Merci de votre intérêt pour Studio Parenthèse!
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
                <FormField
                  label="Prénom"
                  name="prenom"
                  type="text"
                  placeholder="Votre prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Nom"
                  name="nom"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email / Téléphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Téléphone"
                  name="telephone"
                  type="tel"
                  placeholder="+33 6 00 00 00 00"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Entreprise / Nombre de personnes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  label="Entreprise"
                  name="entreprise"
                  type="text"
                  placeholder="Nom de votre entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                />
                <FormField
                  label="Nombre de personnes"
                  name="personnes"
                  type="number"
                  placeholder="Ex : 20"
                  value={formData.personnes}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Budget */}
              <FormField
                label="Budget total (ou par participant selon le projet)"
                name="budget"
                type="text"
                placeholder="Ex : 10 000 €"
                value={formData.budget}
                onChange={handleChange}
                required
              />

              {/* Projet */}
              <FormField
                label="Parlez-nous de votre projet"
                name="projet"
                type="textarea"
                placeholder="Décrivez votre projet, l'occasion, le lieu souhaité, vos envies…"
                rows={5}
                value={formData.projet}
                onChange={handleChange}
                maxLength={2000}
                required
              />

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
