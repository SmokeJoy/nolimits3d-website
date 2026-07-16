import React from 'react';
import SEOHead from '../components/SEOHead';

const Legal: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | NoLimits3D"
        description="Consulta la nostra Privacy Policy per capire come trattiamo i tuoi dati personali. La tua privacy è la nostra priorità."
        url="https://nolimits3d.store/legal"
      />
      <main id="main-content" className="focus:outline-none">
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="section-container">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Ultimo aggiornamento: 13 Luglio 2025</p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Titolare del Trattamento</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                NoLimits3D di [Nome Cognome], con sede in Via Dante Alighieri, 03100 Frosinone (FR), P.IVA [Numero P.IVA], è il titolare del trattamento dei dati personali raccolti su questo sito.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Dati Personali Raccolti</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Raccogliamo i seguenti dati personali quando utilizzi i nostri servizi:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li><strong className="font-semibold">Dati di contatto:</strong> Nome, cognome, indirizzo email, numero di telefono forniti tramite il modulo di contatto o di preventivo.</li>
                <li><strong className="font-semibold">Dati di navigazione:</strong> Indirizzi IP, tipo di browser, sistema operativo, pagine visitate e altri dati relativi alla tua interazione con il sito, raccolti tramite cookie.</li>
                <li><strong className="font-semibold">File e dati di progetto:</strong> File 3D (es. STL, STEP) e informazioni relative ai progetti che ci invii per la realizzazione di un preventivo o di una stampa.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Finalità del Trattamento</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I tuoi dati sono trattati per le seguenti finalità:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li>Fornire i nostri servizi di stampa 3D e prototipazione.</li>
                <li>Elaborare preventivi e rispondere alle tue richieste.</li>
                <li>Migliorare il nostro sito e i nostri servizi tramite analisi statistiche aggregate.</li>
                <li>Adempiere agli obblighi di legge e fiscali.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Base Giuridica del Trattamento</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Il trattamento dei tuoi dati si basa sul tuo consenso (es. quando compili un modulo), sulla necessità di eseguire un contratto di cui sei parte (es. un ordine di stampa) e sul nostro legittimo interesse a migliorare i nostri servizi.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Condivisione dei Dati</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I tuoi dati non saranno diffusi. Potranno essere comunicati a terzi solo se necessario per l'erogazione del servizio (es. corrieri per la spedizione) o se richiesto dalla legge.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Conservazione dei Dati</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I dati saranno conservati per il tempo strettamente necessario a conseguire gli scopi per cui sono stati raccolti e per adempiere agli obblighi di legge.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. I Tuoi Diritti</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In qualità di interessato, hai il diritto di accedere ai tuoi dati, chiederne la rettifica, la cancellazione o la limitazione del trattamento. Puoi inoltre opporti al trattamento e richiedere la portabilità dei dati. Per esercitare i tuoi diritti, puoi contattarci all'indirizzo email: <a href="mailto:nolimits.3d.print@gmail.com" className="text-green-500 hover:underline">nolimits.3d.print@gmail.com</a>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Cookie Policy</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Il nostro sito utilizza cookie tecnici e di analisi per migliorare la tua esperienza di navigazione. Per maggiori informazioni, consulta la nostra Cookie Policy completa [Link alla Cookie Policy se separata].
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">9. Modifiche a questa Policy</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ci riserviamo il diritto di aggiornare questa Privacy Policy in qualsiasi momento. Ti invitiamo a consultare periodicamente questa pagina per rimanere informato.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Legal;