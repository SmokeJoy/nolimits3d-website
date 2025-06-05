import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Clock, Palette, Settings, Shield, Truck } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'generale' | 'materiali' | 'tempi' | 'tecnico' | 'costi';
  icon: React.ReactNode;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'tutti' | 'generale' | 'materiali' | 'tempi' | 'tecnico' | 'costi'>('tutti');

  const faqItems: FAQItem[] = [
    // DOMANDE GENERALI
    {
      id: 1,
      question: "Quanto costa una stampa 3D?",
      answer: "Il costo dipende da dimensioni, materiale e complessità. La maggior parte dei progetti varia tra 10€ e 60€. Oggetti semplici partono da 8€, mentre progetti complessi possono arrivare a 100€+. Scrivici per un preventivo gratuito personalizzato!",
      category: 'generale',
      icon: <HelpCircle className="w-5 h-5 text-blue-500" />
    },
    {
      id: 2,
      question: "Come funziona il processo di preventivo?",
      answer: "Invia la tua idea tramite il form di contatto con descrizione, foto o disegni. Riceverai un preventivo dettagliato entro 2 ore lavorative con costi, tempi e specifiche tecniche. Preventivo sempre gratuito e senza impegno!",
      category: 'generale',
      icon: <Clock className="w-5 h-5 text-green-500" />
    },
    {
      id: 3,
      question: "Posso stampare oggetti su misura?",
      answer: "Certamente! Accettiamo file personalizzati (.STL, .OBJ) o possiamo aiutarti a crearli da zero grazie al nostro servizio di modellazione CAD. Realizziamo prototipi, gadget personalizzati, ricambi e qualsiasi idea tu abbia in mente.",
      category: 'generale',
      icon: <Settings className="w-5 h-5 text-purple-500" />
    },

    // MATERIALI
    {
      id: 4,
      question: "Quali materiali usate per stampare?",
      answer: "Utilizziamo PLA, PETG, ABS, ASA, TPU e materiali tecnici specializzati. Ogni materiale ha caratteristiche specifiche: PLA per dettagli fini, PETG food-safe, ABS per resistenza, TPU per flessibilità. Ti consigliamo sempre il migliore per il tuo progetto.",
      category: 'materiali',
      icon: <Palette className="w-5 h-5 text-orange-500" />
    },
    {
      id: 5,
      question: "Stampate anche in multicolore?",
      answer: "Sì! Grazie alle nostre macchine ACE Pro e al sistema HueForge, realizziamo oggetti fino a 8 colori/materiali diversi in una singola stampa. Perfetto per loghi aziendali, personaggi anime, progetti artistici e regali personalizzati.",
      category: 'materiali',
      icon: <Palette className="w-5 h-5 text-pink-500" />
    },
    {
      id: 6,
      question: "Il PLA è sicuro per uso alimentare?",
      answer: "Il PLA standard non è certificato per contatto alimentare diretto. Per applicazioni alimentari utilizziamo PETG Food-Safe certificato, perfetto per bicchieri, contenitori e utensili da cucina.",
      category: 'materiali',
      icon: <Shield className="w-5 h-5 text-green-600" />
    },

    // TEMPI E CONSEGNE
    {
      id: 7,
      question: "Quanto tempo richiede una stampa?",
      answer: "I tempi vanno da 24 a 72 ore in base alla complessità: oggetti semplici 24-48h, progetti medi 48-72h, progetti complessi 3-5 giorni lavorativi. I progetti urgenti possono essere prioritizzati su richiesta con servizio Express.",
      category: 'tempi',
      icon: <Clock className="w-5 h-5 text-blue-600" />
    },
    {
      id: 8,
      question: "Come funziona la consegna?",
      answer: "Consegna GRATUITA a mano in tutta la Ciociaria per ordini sopra 20€. Per altre zone, spedizione tracciata in 1-2 giorni lavorativi. Ritiro gratuito presso il nostro laboratorio a Frosinone su appuntamento.",
      category: 'tempi',
      icon: <Truck className="w-5 h-5 text-green-600" />
    },
    {
      id: 9,
      question: "Posso vedere esempi di progetti già fatti?",
      answer: "Certo! Visita la nostra sezione Gallery del sito oppure dai un'occhiata alle nostre pagine social @nolimits_3d_print. Postiamo regolarmente foto e time-lapse dei progetti realizzati per i nostri clienti.",
      category: 'tempi',
      icon: <Clock className="w-5 h-5 text-purple-600" />
    },

    // ASPETTI TECNICI
    {
      id: 10,
      question: "Quali sono le dimensioni massime di stampa?",
      answer: "Dipende dalla stampante: Kobra 3 (25x25x30cm), Creality K1 (22x22x22cm), ACE Pro Multicolore (25x25x30cm). Per oggetti più grandi possiamo suddividerli in parti da assemblare successivamente.",
      category: 'tecnico',
      icon: <Settings className="w-5 h-5 text-gray-600" />
    },
    {
      id: 11,
      question: "Che risoluzione/qualità ottengo?",
      answer: "Utilizziamo layer height da 0.1mm a 0.3mm in base alle esigenze. Layer da 0.1-0.15mm per dettagli fini e miniature, 0.2mm per qualità standard, 0.3mm per stampe rapide. Qualità professionale garantita.",
      category: 'tecnico',
      icon: <Settings className="w-5 h-5 text-blue-600" />
    },
    {
      id: 12,
      question: "Stampate anche per aziende o scuole?",
      answer: "Sì! Lavoriamo con PMI, scuole e FabLab per prototipi industriali, utensili personalizzati, modelli didattici, workshop e progetti educativi. Offriamo sconti per ordini ricorrenti e progetti educativi.",
      category: 'tecnico',
      icon: <Settings className="w-5 h-5 text-green-600" />
    },

    // COSTI
    {
      id: 13,
      question: "Come calcolate i prezzi?",
      answer: "Il prezzo è basato su: quantità di materiale utilizzato, tempo di stampa, complessità del progetto, tipo di materiale e finitura richiesta. Preventivo sempre gratuito e trasparente, senza costi nascosti.",
      category: 'costi',
      icon: <HelpCircle className="w-5 h-5 text-yellow-600" />
    },
    {
      id: 14,
      question: "Ci sono costi minimi o nascosti?",
      answer: "Nessun costo nascosto! Il preventivo include tutto: materiali, stampa, rimozione supporti, pulizia finale. Non abbiamo ordini minimi, anche per un singolo pezzo piccolo. Pagamento alla consegna disponibile.",
      category: 'costi',
      icon: <Shield className="w-5 h-5 text-green-600" />
    },
    {
      id: 15,
      question: "Accettate pagamenti dopo la consegna?",
      answer: "Sì! Puoi pagare alla consegna/ritiro con contanti, bonifico o carte. Per progetti di valore elevato possiamo valutare anche pagamenti rateizzati. Massima flessibilità per i nostri clienti.",
      category: 'costi',
      icon: <HelpCircle className="w-5 h-5 text-blue-600" />
    }
  ];

  const categories = [
    { id: 'tutti' as const, label: 'Tutte le FAQ', icon: '❓', count: faqItems.length },
    { id: 'generale' as const, label: 'Generale', icon: '🏠', count: faqItems.filter(item => item.category === 'generale').length },
    { id: 'materiali' as const, label: 'Materiali', icon: '🧬', count: faqItems.filter(item => item.category === 'materiali').length },
    { id: 'tempi' as const, label: 'Tempi & Consegne', icon: '⏰', count: faqItems.filter(item => item.category === 'tempi').length },
    { id: 'tecnico' as const, label: 'Aspetti Tecnici', icon: '⚙️', count: faqItems.filter(item => item.category === 'tecnico').length },
    { id: 'costi' as const, label: 'Costi & Pagamenti', icon: '💰', count: faqItems.filter(item => item.category === 'costi').length }
  ];

  const filteredItems = selectedCategory === 'tutti' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Domande Frequenti
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Trova tutte le risposte sui nostri servizi di stampa 3D FDM. 
            <span className="text-green-600 dark:text-green-400 font-bold"> Non trovi quello che cerchi? Contattaci!</span>
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
              >
                <div className="flex items-center">
                  {item.icon}
                  <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {item.question}
                  </h3>
                </div>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <div className="pl-8 pt-2 border-l-2 border-green-500">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-green-50 dark:bg-green-900/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Non hai trovato la risposta che cercavi?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Il nostro team è sempre disponibile per rispondere alle tue domande specifiche
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/393770918590"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              💬 Chatta su WhatsApp
            </a>
            <a
              href="mailto:nolimits.3d.print@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              📧 Invia Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 