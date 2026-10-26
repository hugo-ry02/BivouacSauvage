import React from 'react';
import type { ReservationConfirmation, ScreenName } from '../../types';
import { Button } from '../ui/Button/Button';
import {
  CheckCircle2,
  Calendar,
  Users,
  Compass,
  Printer,
  ArrowRight,
  MapPin,
  Trees,
} from 'lucide-react';

interface ConfirmationScreenProps {
  confirmation: ReservationConfirmation;
  onNavigate: (screen: ScreenName) => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  confirmation,
  onNavigate,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Carte principale de confirmation */}
      <div className="rounded-3xl bg-surface-white border border-surface-border p-6 sm:p-10 shadow-lg text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-100 px-3 py-1 text-xs font-bold text-forest-800 mb-2">
            Réservation n° {confirmation.reference}
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-forest-950">
            Votre séjour sauvage est confirmé !
          </h1>
          <p className="mt-2 text-sm sm:text-base text-text-muted max-w-lg mx-auto">
            Merci {confirmation.prenom}, votre bon de séjour a été envoyé à l'adresse{' '}
            <strong className="text-text-main font-semibold">{confirmation.email}</strong>.
          </p>
        </div>

        {/* Récapitulatif structuré */}
        <div className="rounded-2xl bg-surface-ground border border-surface-border p-5 text-left space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-subtle flex items-center gap-1.5 border-b border-surface-border pb-2.5">
            <Trees className="w-4 h-4 text-forest-700" aria-hidden="true" />
            Détails de votre hébergement
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-text-muted">Éco-hébergement :</span>
              <div className="font-bold text-sm text-text-main mt-0.5">
                {confirmation.hebergementNom}
              </div>
            </div>

            <div>
              <span className="text-text-muted">Dates réservées :</span>
              <div className="font-bold text-sm text-text-main mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-forest-700" aria-hidden="true" />
                Du {confirmation.dateArrivee} au {confirmation.dateDepart} ({confirmation.nbNuits} nuit{confirmation.nbNuits > 1 ? 's' : ''})
              </div>
            </div>

            <div>
              <span className="text-text-muted">Voyageurs :</span>
              <div className="font-bold text-text-main mt-0.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-forest-700" aria-hidden="true" />
                {confirmation.nbVoyageurs} personne(s){' '}
                {confirmation.avecAnimaux ? '• Avec animal de compagnie' : ''}
              </div>
            </div>

            <div>
              <span className="text-text-muted">Montant total réglé / dû sur place :</span>
              <div className="font-display text-lg font-extrabold text-forest-900 mt-0.5">
                {confirmation.totalGeneral} € TTC
              </div>
            </div>
          </div>

          {confirmation.optionMicroAventure && (
            <div className="rounded-xl bg-forest-100/60 p-3 text-xs text-forest-800 flex items-center gap-2">
              <Compass className="w-4 h-4 text-forest-700 shrink-0" aria-hidden="true" />
              <span>
                <strong>Pack Immersion Sauvage inclus :</strong> Votre guide vous contactera la veille pour fixer l'heure du rendez-vous crépusculaire.
              </span>
            </div>
          )}
        </div>

        {/* Accès & Itinéraire */}
        <div className="rounded-2xl border border-dashed border-forest-300 bg-forest-50/50 p-5 text-left text-xs text-forest-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-forest-950">
            <MapPin className="w-4 h-4 text-accent-600" aria-hidden="true" />
            Accès au domaine de Verzy
          </div>
          <p className="text-forest-800 leading-relaxed">
            Parc Naturel Régional de la Montagne de Reims — D34, 51380 Verzy.  
            Parking sécurisé en lisière de bois avec bornes de recharge solaire. Arrivée conseillée entre 16h et 19h pour profiter de la lumière du couchant.
          </p>
        </div>

        {/* Actions : Impression + Retour */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-surface-border">
          <Button
            variant="secondary"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4" aria-hidden="true" />}
          >
            Imprimer mon bon de séjour
          </Button>

          <Button
            variant="primary"
            onClick={() => onNavigate('accueil')}
            rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
          >
            Retourner à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};
