import { createContext, useContext, useState, useCallback, useEffect } from 'react'
const ThemeContext = createContext(null)
const PEXELS = (id, w = 800, h = 500) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&dpr=1`

export const themes = {
  default: {
    id: 'default',
    name: 'GENESIS',
    description: 'L\'identité brute du studio — là où tout commence',
    image: PEXELS(27530474),
    heroImage: PEXELS(4722576, 1920, 1080),
    colors: {
      bg: '#1a1a1a',
      text: '#f5f2eb',
      accent: '#ff5a00',
    },
  },
  secrets: {
    id: 'secrets',
    name: 'La Maison des Secrets',
    wordFont: "'Aachen', serif",
    genre: 'Cohabitation & manipulation',
    tagline: 'Méfiez-vous des apparences…',
    description: 'Vos invités partagent une villa. Chacun porte un rôle caché — rival, allié, imposteur. Missions secrètes, confessions et révélations scandent le week-end jusqu\'au vote final.',
    image: PEXELS(6957083),
    heroImage: PEXELS(6957083, 1920, 1080),
    cardImages: [6957083, 8723253, 4497546, 29693417, 13562772, 6957083].map(id => PEXELS(id)),
    colors: {
      bg: '#130810',
      text: '#f5ede0',
      accent: '#ff1493',
    },
    elements: [
      { label: 'Villa secrète', note: 'Lieu isolé dont l\'identité est tenue secrète jusqu\'au jour J' },
      { label: 'Confessionnal', note: 'Espace intime pour révéler secrets et stratégies à la caméra' },
      { label: 'Missions scellées', note: 'Enveloppes distribuées chaque matin avec objectifs cachés' },
      { label: 'Tableau des secrets', note: 'Les révélations s\'accumulent et se dévoilent au fil du week-end' },
      { label: 'Vote anonyme', note: 'Chaque joueur choisit qui éliminer — en secret, sans retour possible' },
      { label: 'Soirée de révélations', note: 'Dénouement final orchestré avec retournements de situation' },
    ],
  },
  archipel: {
    id: 'archipel',
    name: 'L\'Archipel',
    wordFont: "'Bungee', sans-serif",
    genre: 'Survie & alliances',
    tagline: 'À la fin, il n’en restera qu’un.',
    description: 'Divisés en tribus rivales, vos invités affrontent épreuves physiques, défis stratégiques et nuits de négociation. Chaque conseil élimine un joueur. Un seul survivra.',
    image: PEXELS(1629159),
    heroImage: PEXELS(1629159, 1920, 1080),
    cardImages: [1629159, 6623948, 1367192, 6669388, 1629159, 1367192].map(id => PEXELS(id)),
    colors: {
      bg: '#110d08',
      text: '#f5ede0',
      accent: '#D97A3A',
    },
    elements: [
      { label: 'Totem tribal', note: 'Sculpté en bois, symbole de la tribu victorieuse à chaque épreuve' },
      { label: 'Feu de camps', note: 'Cérémonies nocturnes d\'élimination à la lueur des flammes' },
      { label: 'Épreuves physiques', note: 'Sur rondins, eau et obstacles naturels — force, équilibre, vitesse' },
      { label: 'Colliers d\'immunité', note: 'Artisanat protecteur — celui qui le porte est intouchable au conseil' },
      { label: 'Conseil nocturne', note: 'Délibération à la bougie, vote gravé sur ardoise, élimination publique' },
      { label: 'Épreuve d\'orientation', note: 'Randonnée scénarisée avec mission à déchiffrer en chemin' },
    ],
  },
  royaumes: {
    id: 'royaumes',
    name: 'Les Royaumes',
    wordFont: "'Cinzel', serif",
    genre: 'Stratégie & conquête',
    tagline: 'Le trône ne se partage pas.',
    description: 'Chaque invité dirige une faction. Alliances diplomatiques, mariages de circonstance, coups d\'état et banquets scénarisés — le destin du royaume se joue en un week-end.',
    image: PEXELS(18705787),
    heroImage: PEXELS(18705787, 1920, 1080),
    cardImages: [35510522, 34958015, 18705787, 28811398, 29887906, 18705787].map(id => PEXELS(id)),
    colors: {
      bg: '#141210',
      text: '#f0ebe0',
      accent: '#c9a227',
    },
    elements: [
      { label: 'Carte du royaume', note: 'Parchemin du territoire à conquérir — chaque faction y tient sa part' },
      { label: 'Sceaux de cire', note: 'Alliances scellées à la cire rouge, trahisons signées de votre main' },
      { label: 'Blasons de faction', note: 'Identité visuelle propre à chaque maison, clan ou royaume' },
      { label: 'Banquet scénarisé', note: 'Repas médiéval avec complots de table, discours et coup de théâtre' },
      { label: 'Duels diplomatiques', note: 'Négociations face-à-face — conclure une alliance ou la briser net' },
      { label: 'Proclamation finale', note: 'Couronnement ou défaite — le destin du royaume révélé en grande pompe' },
    ],
  },
  arene: {
    id: 'arene',
    name: 'Le Grand Tournoi',
    wordFont: "'Anton', sans-serif",
    genre: 'Tournoi & dystopie',
    tagline: 'Survivre ne suffit pas. Il faut gagner.',
    description: 'Sélectionnés par district, vos invités s\'affrontent en jeux de survie scénarisés. Entraînements, alliances éphémères, joute finale — une seule équipe sort victorieuse.',
    image: PEXELS(12359933),
    heroImage: PEXELS(12359933, 1920, 1080),
    cardImages: [17842693, 35393324, 37128999, 11111676, 7358924, 18588227].map(id => PEXELS(id)),
    colors: {
      bg: '#0f0a0a',
      text: '#f5f0f0',
      accent: '#dc2626',
    },
    elements: [
      { label: 'Cérémonie de sélection', note: 'Tirage au sort par district — chaque participant reçoit son destin' },
      { label: 'Kit de survie', note: 'Équipement personnalisé remis à chaque concurrent avant les jeux' },
      { label: 'Épreuves d\'adresse', note: 'Tir, course, agilité, stratégie — chaque défi élimine ou classe' },
      { label: 'Classement en direct', note: 'Tableau visible de tous, mis à jour après chaque épreuve' },
      { label: 'Alliance secrète', note: 'Option de pactiser — mais chaque alliance peut se retourner contre vous' },
      { label: 'Joute finale', note: 'Grand final scénarisé où tout peut basculer en une seule décision' },
    ],
  },
  enquete: {
    id: 'enquete',
    name: 'Enquête Nocturne',
    wordFont: "'Special Elite', cursive",
    genre: 'Mystère & déduction',
    tagline: 'Quelqu\'un dans cette pièce ment.',
    description: 'Un crime s\'est produit. Chaque invité endosse un rôle — enquêteur, suspect, complice. Interrogatoires, faux alibis et retournements mènent à la révélation finale.',
    image: PEXELS(17887829),
    heroImage: PEXELS(17887829, 1920, 1080),
    cardImages: [18867525, 17887829, 5503359, 18867525, 17887829, 5503359].map(id => PEXELS(id)),
    colors: {
      bg: '#0a0f18',
      text: '#e8eaf0',
      accent: '#6080ff',
    },
    elements: [
      { label: 'Dossier d\'enquête', note: 'Chaque invité reçoit son dossier personnel scellé à l\'arrivée' },
      { label: 'Scène de crime', note: 'Espace reconstitué avec indices, fausses pistes et pièces à conviction' },
      { label: 'Fiche de personnage', note: 'Rôle caché — innocent, coupable, témoin clé ou complice silencieux' },
      { label: 'Interrogatoires', note: 'Face-à-face scénarisés en huis clos, sous pression dramatique' },
      { label: 'Alibis & contre-vérités', note: 'Mécaniques de déduction — qui ment ? qui dit vrai ? tout peut basculer' },
      { label: 'Révélation finale', note: 'Dénouement théâtralisé avec retournements, aveux et dernier coup de scène' },
    ],
  },
  odyssee: {
    id: 'odyssee',
    name: 'L\'Odyssée',
    wordFont: "'Caveat', cursive",
    genre: 'Road adventure',
    tagline: 'La destination est une surprise.',
    description: 'Vos invités ne connaissent ni le programme ni la destination. Chaque étape révèle une mission inédite, un lieu imprévu, une rencontre scénarisée — jusqu\'au point d\'orgue.',
    image: PEXELS(2715061),
    heroImage: PEXELS(2715061, 1920, 1080),
    cardImages: [2715061, 1899236, 2715061, 1899236, 2715061, 1899236].map(id => PEXELS(id)),
    colors: {
      bg: '#2a2318',
      text: '#f5f0e6',
      accent: '#ff7a30',
    },
    elements: [
      { label: 'Roadbook mystérieux', note: 'Programme révélé étape par étape — la destination reste inconnue' },
      { label: 'Missions par escales', note: 'Défi unique débloqué à chaque étape, à l\'arrivée au lieu' },
      { label: 'Escales secrètes', note: 'Lieux préparés et réservés à l\'avance, inconnus des participants' },
      { label: 'Rencontres scénarisées', note: 'Personnages intégrés au parcours comme de vraies rencontres' },
      { label: 'Carte au trésor', note: 'Progression visuelle du voyage — chaque étape dévoile la suivante' },
      { label: 'Point d\'orgue final', note: 'Dénouement surprise au dernier lieu — le moment le plus inoubliable' },
    ],
  },
}
export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const changeTheme = useCallback((themeId) => {
    if (themeId === currentTheme || !themes[themeId]) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentTheme(themeId)
      document.documentElement.setAttribute('data-theme', themeId)
    }, 150)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1650)
  }, [currentTheme])
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])
  const value = {
    currentTheme,
    themeData: themes[currentTheme],
    themes,
    changeTheme,
    isTransitioning,
  }
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
