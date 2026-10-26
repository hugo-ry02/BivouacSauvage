import { useState } from 'react';
import type {
  Hebergement,
  ScreenName,
  ReservationConfirmation,
} from './types';
import hebergementsData from './data/hebergements.json';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AccueilScreen } from './components/screens/AccueilScreen';
import { ExplorerScreen } from './components/screens/ExplorerScreen';
import { ReservationScreen } from './components/screens/ReservationScreen';
import { ConfirmationScreen } from './components/screens/ConfirmationScreen';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('accueil');
  const [selectedHebergement, setSelectedHebergement] = useState<Hebergement | null>(null);
  const [confirmationData, setConfirmationData] = useState<ReservationConfirmation | null>(null);

  const hebergements = hebergementsData as Hebergement[];

  const handleNavigate = (screen: ScreenName) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectForBooking = (hebergement: Hebergement) => {
    setSelectedHebergement(hebergement);
    setCurrentScreen('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmReservation = (confirmation: ReservationConfirmation) => {
    setConfirmationData(confirmation);
    setCurrentScreen('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-ground text-text-main">
      <Navbar currentScreen={currentScreen} onNavigate={handleNavigate} />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {currentScreen === 'accueil' && (
          <AccueilScreen
            hebergements={hebergements}
            onNavigate={handleNavigate}
            onSelectHebergement={handleSelectForBooking}
          />
        )}

        {currentScreen === 'explorer' && (
          <ExplorerScreen
            hebergements={hebergements}
            onSelectForBooking={handleSelectForBooking}
          />
        )}

        {currentScreen === 'reservation' && (
          <ReservationScreen
            hebergements={hebergements}
            preSelectedHebergement={selectedHebergement}
            onConfirmReservation={handleConfirmReservation}
            onCancel={() => handleNavigate('explorer')}
          />
        )}

        {currentScreen === 'confirmation' && confirmationData && (
          <ConfirmationScreen
            confirmation={confirmationData}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
