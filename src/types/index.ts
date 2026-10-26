export type HebergementType = 'dome' | 'cabane' | 'tente' | 'roulotte';

export type EcoCategory = 'solaire' | 'poele' | 'bain_nordique' | 'compost' | 'zero_dechet';

export interface Hebergement {
  id: string;
  slug: string;
  nom: string;
  type: HebergementType;
  typeLabel: string;
  accroche: string;
  description: string;
  capacite: number;
  surface_m2: number;
  hauteur_sol_m: number;
  prix_par_nuit: number;
  note: number;
  nb_avis: number;
  animaux_acceptes: boolean;
  equipements: string[];
  eco_labels: EcoCategory[];
  image_principale: string;
  images_secondaires: string[];
  disponible: boolean;
}

export type SortOption = 'prix-asc' | 'prix-desc' | 'note-desc' | 'capacite-asc';

export interface FilterState {
  type: 'all' | HebergementType;
  minCapacite: number;
  maxPrix: number;
  animauxOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
}

export interface ReservationData {
  hebergementId: string;
  dateArrivee: string;
  dateDepart: string;
  nbVoyageurs: number;
  avecAnimaux: boolean;
  optionMicroAventure: boolean;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  remarques?: string;
}

export interface ReservationConfirmation extends ReservationData {
  reference: string;
  dateCreation: string;
  prixParNuit: number;
  nbNuits: number;
  totalHebergement: number;
  totalOption: number;
  totalGeneral: number;
  hebergementNom: string;
}

export type ScreenName = 'accueil' | 'explorer' | 'detail' | 'reservation' | 'confirmation';
