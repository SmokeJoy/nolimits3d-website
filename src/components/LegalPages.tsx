import React, { useState } from 'react';
import { Shield, FileText, Cookie, ChevronRight, Calendar, Mail, Phone } from 'lucide-react';

interface LegalSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const LegalPages: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'privacy' | 'terms' | 'cookies'>('privacy');

  const legalSections: Record<string, LegalSection> = {
    privacy: {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: <Shield className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">1. Informazioni Generali</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              La presente Privacy Policy descrive le modalità di trattamento dei dati personali degli utenti 
              che consultano il sito web <strong>NoLimits3D</strong> e utilizzano i nostri servizi di stampa 3D.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Titolare del trattamento:</strong> Andrea Scalia - NoLimits3D<br/>
                <strong>Sede legale:</strong> Via Dante Alighieri, 03100 Frosinone (FR)<br/>
                <strong>Email:</strong> nolimits.3d.print@gmail.com<br/>
                <strong>Telefono:</strong> +39 377 091 8590
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">2. Tipologie di Dati Raccolti</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>Dati di contatto:</strong> nome, cognome, email, numero di telefono</li>
              <li><strong>Dati del progetto:</strong> descrizioni tecniche, file 3D, specifiche</li>
              <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo</li>
              <li><strong>Cookie:</strong> tecnici e di funzionalità (no profilazione)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">3. Finalità del Trattamento</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Erogazione dei servizi di stampa 3D richiesti</li>
              <li>Gestione di richieste di preventivo e supporto clienti</li>
              <li>Invio di comunicazioni commerciali e offerte (previo consenso)</li>
              <li>Adempimenti fiscali e contabili</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">4. Base Giuridica</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Il trattamento si basa su:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>Esecuzione contrattuale</strong> per i servizi richiesti</li>
              <li><strong>Consenso</strong> dell'utente per comunicazioni promozionali</li>
              <li><strong>Legittimo interesse</strong> del titolare per la sicurezza e il miglioramento del sito</li>
              <li><strong>Obblighi legali</strong> (es. contabilità, fiscalità)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">5. Diritti dell'Interessato</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">Ogni utente può esercitare i seguenti diritti:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Accesso ai propri dati personali</li>
              <li>Rettifica o cancellazione</li>
              <li>Limitazione del trattamento</li>
              <li>Portabilità dei dati</li>
              <li>Opposizione al trattamento per motivi legittimi</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-3">
              Per esercitare tali diritti, è possibile contattarci via email o telefono.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">6. Conservazione dei Dati</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>Dati contrattuali:</strong> conservati per la durata necessaria all'adempimento degli obblighi legali</li>
              <li><strong>Dati di progetto:</strong> cancellati su richiesta del cliente dopo il completamento del lavoro</li>
              <li><strong>Comunicazioni promozionali:</strong> fino a revoca del consenso</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">7. Sicurezza dei Dati</h3>
            <p className="text-gray-600 dark:text-gray-300">
              NoLimits3D adotta misure tecniche e organizzative appropriate per proteggere i dati personali 
              da accessi non autorizzati, perdita, distruzione o divulgazione. I file 3D dei clienti sono 
              trattati con massima riservatezza e non condivisi con terzi.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>La tua privacy è la nostra priorità:</strong> Trattiamo i tuoi dati con la massima cura e trasparenza. 
              Per qualsiasi dubbio o richiesta, contattaci direttamente.
            </p>
          </div>
        </div>
      )
    },

    terms: {
      id: 'terms',
      title: 'Termini di Servizio',
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">1. Oggetto</h3>
            <p className="text-gray-600 dark:text-gray-300">
              I presenti Termini di Servizio disciplinano l'utilizzo dei servizi di stampa 3D 
              offerti da NoLimits3D e l'accesso al relativo sito web.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">2. Servizi Offerti</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Stampa 3D FDM con materiali PLA, PETG, ASA, TPU</li>
              <li>Stampa multicolore fino a 8 materiali (sistema ACE Pro)</li>
              <li>Prototipazione rapida e produzione di oggetti personalizzati</li>
              <li>Consulenza tecnica per ottimizzazione progetti</li>
              <li>Servizi di modellazione 3D da zero</li>
              <li>Post-processing e assemblaggio componenti</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">3. Processo di Ordinazione</h3>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Invio richiesta di preventivo tramite form, WhatsApp o email</li>
              <li>Analisi tecnica del progetto e valutazione fattibilità</li>
              <li>Invio preventivo dettagliato entro 2 ore lavorative</li>
              <li>Conferma ordine da parte del cliente</li>
              <li>Pagamento alla consegna o secondo accordi</li>
              <li>Produzione e controlli qualità</li>
              <li>Consegna o ritiro presso laboratorio</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">4. Tempi di Consegna</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>Progetti semplici:</strong> 24-48 ore</li>
              <li><strong>Progetti multicolore:</strong> 48-72 ore</li>
              <li><strong>Progetti complessi:</strong> 3-5 giorni lavorativi</li>
              <li><strong>Consegna Ciociaria:</strong> GRATUITA per ordini sopra 20€</li>
              <li><strong>Spedizioni nazionali:</strong> 1-2 giorni lavorativi aggiuntivi</li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              I tempi sono indicativi e possono variare in base alla complessità del progetto
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">5. Pagamenti e Fatturazione</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>Modalità accettate:</strong> Contanti, bonifico bancario, carte di credito/debito</li>
              <li><strong>Termini:</strong> Pagamento alla consegna o ritiro (no anticipi richiesti)</li>
              <li><strong>Fatturazione:</strong> Fattura elettronica entro 24h dalla consegna</li>
              <li><strong>Progetti di valore elevato:</strong> Pagamenti rateizzati valutabili caso per caso</li>
              <li><strong>Nessun costo nascosto:</strong> Il preventivo include tutto (materiali, stampa, pulizia)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">6. Garanzie e Qualità</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Garanzia di Conformità</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Se il prodotto non rispetta quanto concordato nel preventivo, sarà corretto gratuitamente.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Controlli Qualità</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ogni stampa viene ispezionata per verificare precisione dimensionale e qualità superficiale.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Limitazioni</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Non copriamo danni da uso improprio, modifiche successive o normale usura.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">7. Proprietà Intellettuale</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              I file 3D forniti dal cliente rimangono di sua proprietà. NoLimits3D si impegna a:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Non condividere, rivendere o utilizzare i file per altri scopi</li>
              <li>Cancellare i file dopo il completamento del progetto (su richiesta)</li>
              <li>Mantenere la massima riservatezza su progetti sensibili</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>La tua soddisfazione è la nostra priorità:</strong> Lavoriamo sempre per superare le tue aspettative. 
              Per qualsiasi problema, contattaci immediatamente per trovare la soluzione migliore.
            </p>
          </div>
        </div>
      )
    },

    cookies: {
      id: 'cookies',
      title: 'Cookie Policy',
      icon: <Cookie className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">1. Cosa sono i Cookie</h3>
            <p className="text-gray-600 dark:text-gray-300">
              I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo 
              quando visiti il nostro sito web. Ci aiutano a fornire una migliore esperienza utente.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">2. Tipologie di Cookie Utilizzati</h3>
            
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-green-600 mb-2">Cookie Tecnici Necessari</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Essenziali per il funzionamento del sito. Includono sessioni utente, 
                  carrello acquisti, preferenze di sicurezza.
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Base giuridica: Necessità tecnica - Nessun consenso richiesto
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-blue-600 mb-2">Cookie di Funzionalità</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Memorizzano preferenze utente come lingua, tema, impostazioni personalizzate.
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Base giuridica: Consenso - Gestibili dal pannello preferenze
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-purple-600 mb-2">Cookie Analitici</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Google Analytics per statistiche anonime di utilizzo del sito.
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Base giuridica: Consenso - Completamente anonimizzati
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">3. Gestione delle Preferenze</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Puoi gestire le tue preferenze sui cookie in qualsiasi momento:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Tramite il banner cookie alla prima visita</li>
              <li>Dalle impostazioni del tuo browser</li>
              <li>Contattandoci direttamente</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">4. Cookie di Terze Parti</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">Servizio</th>
                    <th className="px-4 py-2 text-left">Finalità</th>
                    <th className="px-4 py-2 text-left">Durata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2">Google Analytics</td>
                    <td className="px-4 py-2">Statistiche anonime</td>
                    <td className="px-4 py-2">24 mesi</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2">WhatsApp Widget</td>
                    <td className="px-4 py-2">Chat di supporto</td>
                    <td className="px-4 py-2">Sessione</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>La tua privacy è importante:</strong> Utilizziamo solo cookie necessari 
              per fornire i nostri servizi e migliorare la tua esperienza.
            </p>
          </div>
        </div>
      )
    }
  };

  const navItems = [
    { id: 'privacy' as const, label: 'Privacy Policy', icon: <Shield className="w-4 h-4" /> },
    { id: 'terms' as const, label: 'Termini di Servizio', icon: <FileText className="w-4 h-4" /> },
    { id: 'cookies' as const, label: 'Cookie Policy', icon: <Cookie className="w-4 h-4" /> }
  ];

  return (
    <section id="legal" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Informazioni Legali
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Trasparenza e conformità normativa per la tua tranquillità.
            <span className="text-green-600 dark:text-green-400 font-bold"> Privacy e sicurezza garantite.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Documenti Legali
              </h3>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-l-4 border-green-500'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3 flex-1">{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </nav>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Per questioni legali:
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>nolimits.3d.print@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+39 377 091 8590</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
              <div className="flex items-center mb-6">
                {legalSections[activeSection].icon}
                <h2 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                  {legalSections[activeSection].title}
                </h2>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                {legalSections[activeSection].content}
              </div>

              {/* Last Updated */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Ultimo aggiornamento: Giugno 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Hai domande sui nostri termini?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Siamo sempre disponibili per chiarimenti su privacy, termini di servizio e cookie policy
          </p>
          <a
            href="mailto:nolimits.3d.print@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            📧 Contatta il nostro team legale
          </a>
        </div>
      </div>
    </section>
  );
};

export default LegalPages; 