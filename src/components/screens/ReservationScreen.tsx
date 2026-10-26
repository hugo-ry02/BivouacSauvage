import React, { useState } from 'react';
import type {
  Hebergement,
  ReservationConfirmation,
} from '../../types';
import { InputField } from '../ui/Input/InputField';
import { Button } from '../ui/Button/Button';
import {
  Calendar,
  Users,
  Dog,
  ShieldCheck,
  Compass,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface ReservationScreenProps {
  hebergements: Hebergement[];
  preSelectedHebergement: Hebergement | null;
  onConfirmReservation: (confirmation: ReservationConfirmation) => void;
  onCancel: () => void;
}

interface FormErrors {
  hebergementId?: string;
  dateArrivee?: string;
  dateDepart?: string;
  nbVoyageurs?: string;
  animaux?: string;
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
}

export const ReservationScreen: React.FC<ReservationScreenProps> = ({
  hebergements,
  preSelectedHebergement,
  onConfirmReservation,
  onCancel,
}) => {
  // Calcul de dates par défaut (demain et surlendemain)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);

  const formatDateForInput = (d: Date) => d.toISOString().split('T')[0];

  const [selectedId, setSelectedId] = useState<string>(
    preSelectedHebergement?.id || hebergements[0]?.id || ''
  );
  const [dateArrivee, setDateArrivee] = useState(formatDateForInput(tomorrow));
  const [dateDepart, setDateDepart] = useState(formatDateForInput(dayAfterTomorrow));
  const [nbVoyageurs, setNbVoyageurs] = useState(2);
  const [avecAnimaux, setAvecAnimaux] = useState(false);
  const [optionMicroAventure, setOptionMicroAventure] = useState(false);

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [remarques, setRemarques] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hébergement actuellement sélectionné
  const currentHebergement =
    hebergements.find((h) => h.id === selectedId) || hebergements[0];

  // Calcul dérivé du nombre de nuits
  const calcNights = () => {
    const start = new Date(dateArrivee);
    const end = new Date(dateDepart);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nbNuits = calcNights();
  const prixParNuit = currentHebergement ? currentHebergement.prix_par_nuit : 0;
  const totalHebergement = nbNuits * prixParNuit;
  const prixOptionMicroAventure = 45;
  const totalOption = optionMicroAventure ? nbVoyageurs * prixOptionMicroAventure : 0;
  const totalGeneral = totalHebergement + totalOption;

  // Validation formulaire
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!selectedId) {
      newErrors.hebergementId = 'Veuillez sélectionner un éco-hébergement.';
    }

    if (!dateArrivee) {
      newErrors.dateArrivee = "La date d'arrivée est requise.";
    }

    if (!dateDepart) {
      newErrors.dateDepart = 'La date de départ est requise.';
    } else if (nbNuits <= 0) {
      newErrors.dateDepart = 'La date de départ doit être postérieure à la date d\'arrivée.';
    }

    if (currentHebergement && nbVoyageurs > currentHebergement.capacite) {
      newErrors.nbVoyageurs = `Cet hébergement ne peut accueillir que ${currentHebergement.capacite} personnes au maximum.`;
    }

    if (currentHebergement && avecAnimaux && !currentHebergement.animaux_acceptes) {
      newErrors.animaux = `Les animaux ne sont pas admis dans cet hébergement pour des raisons de sécurité.`;
    }

    if (!prenom.trim()) {
      newErrors.prenom = 'Le prénom est obligatoire.';
    }

    if (!nom.trim()) {
      newErrors.nom = 'Le nom de famille est obligatoire.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Veuillez saisir une adresse e-mail valide (ex: julien@domaine.fr).';
    }

    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!telephone.trim()) {
      newErrors.telephone = 'Le numéro de téléphone est obligatoire pour votre accueil.';
    } else if (!phoneRegex.test(telephone.replace(/\s+/g, ''))) {
      newErrors.telephone = 'Veuillez entrer un numéro de téléphone valide à 10 chiffres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Focus sur le premier champ avec erreur pour l'accessibilité
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorKey);
      el?.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulation de validation réseau instantanée
    setTimeout(() => {
      const reference = `BV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const confirmation: ReservationConfirmation = {
        hebergementId: selectedId,
        hebergementNom: currentHebergement.nom,
        dateArrivee,
        dateDepart,
        nbVoyageurs,
        avecAnimaux,
        optionMicroAventure,
        prenom,
        nom,
        email,
        telephone,
        remarques,
        reference,
        dateCreation: new Date().toLocaleDateString('fr-FR'),
        prixParNuit,
        nbNuits,
        totalHebergement,
        totalOption,
        totalGeneral,
      };
      setIsSubmitting(false);
      onConfirmReservation(confirmation);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* En-tête */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-600 mb-2">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          Écran d'action & réservation
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-forest-950">
          Finalisez votre séjour sauvage
        </h1>
        <p className="mt-2 text-sm sm:text-base text-text-muted">
          Pas de frais cachés, réservation directe avec notre domaine éco-responsable de Verzy.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne Formulaire (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Étape 1 : Choix de l'hébergement */}
            <div className="rounded-2xl bg-surface-white border border-surface-border p-5 sm:p-6 shadow-xs">
              <h2 className="font-display text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-700 text-xs font-bold text-surface-ground">
                  1
                </span>
                <span>Choix de l'éco-hébergement</span>
              </h2>

              <div className="space-y-3">
                <label htmlFor="hebergementId" className="block text-sm font-semibold text-text-main">
                  Hébergement souhaité
                </label>
                <select
                  id="hebergementId"
                  value={selectedId}
                  onChange={(e) => {
                    setSelectedId(e.target.value);
                    const selected = hebergements.find((h) => h.id === e.target.value);
                    if (selected && !selected.animaux_acceptes && avecAnimaux) {
                      setAvecAnimaux(false);
                    }
                  }}
                  className="w-full rounded-xl border border-surface-border bg-surface-ground px-3.5 py-3 text-sm font-medium text-text-main focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-700/20 min-h-[44px] cursor-pointer"
                >
                  {hebergements.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.nom} ({h.typeLabel}) — {h.prix_par_nuit} € / nuit (Max {h.capacite} pers.)
                    </option>
                  ))}
                </select>

                {currentHebergement && (
                  <div className="flex items-center gap-4 pt-3 border-t border-surface-border text-xs text-text-muted">
                    <img
                      src={currentHebergement.image_principale}
                      alt={currentHebergement.nom}
                      className="h-12 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-bold text-text-main">{currentHebergement.nom}</div>
                      <div className="text-text-muted">
                        Capacité max : {currentHebergement.capacite} personnes • Animaux :{' '}
                        {currentHebergement.animaux_acceptes ? 'Bienvenus' : 'Non acceptés'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Étape 2 : Dates et Voyageurs */}
            <div className="rounded-2xl bg-surface-white border border-surface-border p-5 sm:p-6 shadow-xs">
              <h2 className="font-display text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-700 text-xs font-bold text-surface-ground">
                  2
                </span>
                <span>Dates du séjour & Voyageurs</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Date d'arrivée"
                  type="date"
                  id="dateArrivee"
                  value={dateArrivee}
                  onChange={(e) => setDateArrivee(e.target.value)}
                  isRequired
                  error={errors.dateArrivee}
                />

                <InputField
                  label="Date de départ"
                  type="date"
                  id="dateDepart"
                  value={dateDepart}
                  onChange={(e) => setDateDepart(e.target.value)}
                  isRequired
                  error={errors.dateDepart}
                />
              </div>

              {nbNuits > 0 && (
                <div className="mt-3 text-xs font-semibold text-forest-700 bg-forest-50 p-2.5 rounded-lg inline-flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-forest-700" aria-hidden="true" />
                  <span>
                    Durée sélectionnée : {nbNuits} nuit{nbNuits > 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {/* Voyageurs et Options */}
              <div className="mt-4 pt-4 border-t border-surface-border space-y-4">
                <div>
                  <label htmlFor="nbVoyageurs" className="block text-sm font-semibold text-text-main mb-1">
                    Nombre de personnes
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      id="nbVoyageurs"
                      value={nbVoyageurs}
                      onChange={(e) => setNbVoyageurs(Number(e.target.value))}
                      className="rounded-xl border border-surface-border bg-surface-ground px-3.5 py-2.5 text-sm font-semibold text-text-main min-h-[44px] cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} voyageur{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>

                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Users className="w-4 h-4 text-forest-700" aria-hidden="true" />
                      Capacité max de cet hébergement : {currentHebergement?.capacite}
                    </span>
                  </div>
                  {errors.nbVoyageurs && (
                    <p className="text-xs text-red-600 font-medium mt-1">{errors.nbVoyageurs}</p>
                  )}
                </div>

                {/* Option Animaux */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-surface-border bg-surface-ground hover:bg-forest-50/50 transition-colors cursor-pointer min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={avecAnimaux}
                      onChange={(e) => setAvecAnimaux(e.target.checked)}
                      disabled={!currentHebergement?.animaux_acceptes}
                      className="mt-1 h-4 w-4 rounded border-surface-border text-forest-700 focus:ring-forest-700"
                    />
                    <div className="flex-1 text-xs">
                      <span className="font-bold text-text-main flex items-center gap-1.5">
                        <Dog className="w-4 h-4 text-amber-700" aria-hidden="true" />
                        Je viens avec mon animal de compagnie (gratuit)
                      </span>
                      <span className="text-text-muted block mt-0.5">
                        {currentHebergement?.animaux_acceptes
                          ? 'Terrain sécurisé et gamelles fournies à votre arrivée.'
                          : 'Attention : cet hébergement suspendu n\'autorise pas les animaux.'}
                      </span>
                    </div>
                  </label>
                  {errors.animaux && (
                    <p className="text-xs text-red-600 font-medium mt-1">{errors.animaux}</p>
                  )}
                </div>

                {/* Option Micro-Aventure */}
                <div>
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-surface-border bg-surface-ground hover:bg-forest-50/50 transition-colors cursor-pointer min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={optionMicroAventure}
                      onChange={(e) => setOptionMicroAventure(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-surface-border text-forest-700 focus:ring-forest-700"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-text-main flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-forest-700" aria-hidden="true" />
                          Pack « Immersion Sauvage »
                        </span>
                        <span className="font-bold text-accent-700">+45 € / pers.</span>
                      </div>
                      <span className="text-text-muted block mt-0.5">
                        Randonnée nocturne avec guide naturaliste + panier apéritif 100% bio marnais.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Étape 3 : Coordonnées du contact */}
            <div className="rounded-2xl bg-surface-white border border-surface-border p-5 sm:p-6 shadow-xs">
              <h2 className="font-display text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-700 text-xs font-bold text-surface-ground">
                  3
                </span>
                <span>Coordonnées pour confirmation</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Prénom"
                  id="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Ex : Julien"
                  isRequired
                  error={errors.prenom}
                />

                <InputField
                  label="Nom de famille"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex : Dupont"
                  isRequired
                  error={errors.nom}
                />

                <InputField
                  label="Adresse e-mail"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="julien.dupont@exemple.fr"
                  helperText="Votre bon de réservation vous sera transmis par mail."
                  isRequired
                  error={errors.email}
                />

                <InputField
                  label="Numéro de téléphone"
                  type="tel"
                  id="telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  helperText="Pour vous guider à votre arrivée en forêt."
                  isRequired
                  error={errors.telephone}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="remarques" className="block text-sm font-semibold text-text-main mb-1">
                  Besoins particuliers ou heure approximative d'arrivée (optionnel)
                </label>
                <textarea
                  id="remarques"
                  rows={3}
                  value={remarques}
                  onChange={(e) => setRemarques(e.target.value)}
                  placeholder="Ex : Arrivée en train à la gare de Reims vers 18h, navette souhaitée..."
                  className="w-full rounded-xl border border-surface-border bg-surface-ground p-3 text-sm text-text-main placeholder:text-text-subtle focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-700/20"
                />
              </div>
            </div>
          </div>

          {/* Colonne Récapitulatif Tarifaire Devis (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-surface-white border border-surface-border p-6 shadow-sm space-y-5">
              <h3 className="font-display text-lg font-bold text-text-main border-b border-surface-border pb-3">
                Récapitulatif de votre devis
              </h3>

              {currentHebergement && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center text-text-muted">
                    <span>Hébergement</span>
                    <span className="font-bold text-text-main">{currentHebergement.nom}</span>
                  </div>

                  <div className="flex justify-between items-center text-text-muted">
                    <span>Durée</span>
                    <span className="font-semibold text-text-main">
                      {nbNuits} nuit{nbNuits > 1 ? 's' : ''} ({prixParNuit} € / nuit)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-text-muted">
                    <span>Voyageurs</span>
                    <span className="font-semibold text-text-main">{nbVoyageurs} personne(s)</span>
                  </div>

                  {avecAnimaux && (
                    <div className="flex justify-between items-center text-text-muted">
                      <span>Animal de compagnie</span>
                      <span className="font-semibold text-emerald-700">Inclus (0 €)</span>
                    </div>
                  )}

                  {optionMicroAventure && (
                    <div className="flex justify-between items-center text-text-muted">
                      <span>Pack Immersion Sauvage</span>
                      <span className="font-semibold text-text-main">
                        {nbVoyageurs} x 45 € = {totalOption} €
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Total TTC */}
              <div className="border-t border-surface-border pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-text-main">Total séjour TTC</span>
                  <div className="text-right">
                    <span className="font-display text-2xl font-extrabold text-forest-900">
                      {totalGeneral} €
                    </span>
                    <span className="block text-[11px] text-text-muted">Taxe de séjour incluse</span>
                  </div>
                </div>
              </div>

              {/* Bouton de confirmation de formulaire */}
              <div className="pt-2 space-y-3">
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
                  className="shadow-md shadow-accent-600/20"
                >
                  Confirmer la réservation
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={onCancel}
                >
                  Revenir au catalogue
                </Button>
              </div>

              {/* Réassurance éco */}
              <div className="rounded-xl bg-forest-50 p-3 text-xs text-forest-800 flex items-start gap-2 border border-forest-100">
                <ShieldCheck className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Paiement sans avance immédiate. Annulation gratuite jusqu'à 7 jours avant le séjour.
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
