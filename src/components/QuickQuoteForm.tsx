import React, { useState, useCallback, useMemo } from 'react';
import { Send, CheckCircle, AlertCircle, Clock, Sparkles, Zap, Star } from 'lucide-react';

// Dichiarazione per gtag (Google Analytics)
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters: Record<string, string>) => void;
  }
}

interface QuickQuoteFormProps {
  className?: string;
}

interface FormData {
  email: string;
  name: string;
  description: string;
  urgency: string;
}

interface ValidationErrors {
  email?: string;
  name?: string;
  description?: string;
}

// Utility per sanitizzazione input
const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 1000);
};

// Validazione email più robusta
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Rate limiting semplice (localStorage)
const isRateLimited = (): boolean => {
  const lastSubmission = localStorage.getItem('lastQuoteSubmission');
  if (!lastSubmission) return false;
  
  const timeDiff = Date.now() - parseInt(lastSubmission);
  return timeDiff < 60000; // 1 minuto tra le richieste
};

const QuickQuoteForm: React.FC<QuickQuoteFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    description: '',
    urgency: 'standard'
  });
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [focusField, setFocusField] = useState<string>('');

  // Validazione in tempo reale
  const validateForm = useCallback((data: FormData): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    
    if (!data.name || data.name.length < 2) {
      newErrors.name = 'Il nome deve contenere almeno 2 caratteri';
    } else if (data.name.length > 50) {
      newErrors.name = 'Il nome non può superare i 50 caratteri';
    }
    
    if (!data.email) {
      newErrors.email = 'Email obbligatoria';
    } else if (!isValidEmail(data.email)) {
      newErrors.email = 'Email non valida';
    }
    
    if (!data.description || data.description.length < 10) {
      newErrors.description = 'Descrizione troppo breve (minimo 10 caratteri)';
    } else if (data.description.length > 500) {
      newErrors.description = 'Descrizione troppo lunga (massimo 500 caratteri)';
    }
    
    return newErrors;
  }, []);

  // Caratteri rimanenti per description
  const remainingChars = useMemo(() => {
    return 500 - formData.description.length;
  }, [formData.description]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (isRateLimited()) {
      setStatus('error');
      setMessage('Troppe richieste. Attendi 1 minuto prima di inviare un nuovo preventivo.');
      return;
    }
    
    // Validazione form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setStatus('sending');
    setErrors({});

    try {
      // Sanitizzazione dati
      const sanitizedData = {
        email: sanitizeInput(formData.email),
        name: sanitizeInput(formData.name),
        description: sanitizeInput(formData.description),
        urgency: formData.urgency,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 100)
      };

      // SOLUZIONE SICURA: Invio via WhatsApp invece di FormSubmit
      const whatsappMessage = encodeURIComponent(
        `🎯 NUOVO PREVENTIVO NoLimits3D\n\n` +
        `👤 Nome: ${sanitizedData.name}\n` +
        `📧 Email: ${sanitizedData.email}\n` +
        `⏰ Urgenza: ${sanitizedData.urgency}\n\n` +
        `📝 Descrizione progetto:\n${sanitizedData.description}\n\n` +
        `🕒 Inviato: ${new Date().toLocaleString('it-IT')}`
      );
      
      const whatsappURL = `https://wa.me/393770918590?text=${whatsappMessage}`;
      
      // Simula l'invio con successo e reindirizza a WhatsApp
      setStatus('success');
      setMessage('Perfetto! Ti stiamo reindirizzando su WhatsApp per completare l\'invio.');
      setFormData({ email: '', name: '', description: '', urgency: 'standard' });
      
      // Salva timestamp per rate limiting
      localStorage.setItem('lastQuoteSubmission', Date.now().toString());
      
      // Analytics (se disponibile)
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'quote_whatsapp_redirect', {
          event_category: 'engagement',
          event_label: sanitizedData.urgency
        });
      }
      
      // Reindirizza a WhatsApp dopo 2 secondi
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 2000);
    } catch (error) {
      console.error('Errore invio preventivo:', error);
      setStatus('error');
      setMessage('Errore nell\'invio. Verifica la connessione o contattaci su WhatsApp.');
    }

    setTimeout(() => setStatus('idle'), 8000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Rimuovi errore del campo se l'utente sta correggendo
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className={`glass-card rounded-3xl p-8 border-2 border-green-500/20 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 ${className}`}>
      {/* Header MAGNETICO */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-green-400 neon-glow mr-3" />
            <div className="absolute inset-0 w-8 h-8 bg-green-400/20 rounded-full animate-ping"></div>
          </div>
          <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            🎨 REALIZZA LA TUA IDEA
      </h3>
          <div className="relative ml-3">
            <Zap className="w-8 h-8 text-yellow-400 neon-glow" />
            <div className="absolute inset-0 w-8 h-8 bg-yellow-400/20 rounded-full animate-ping"></div>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-lg font-bold text-pink-400 animate-pulse mb-2">
            💝 "Hai un'IDEA? Trasformala in REALTÀ!" 💝
          </p>
          <p className="text-base text-cyan-400 font-semibold">
            🎁 Il regalo perfetto è quello che crei TU! 🎁
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-6 text-sm font-semibold">
          <div className="flex items-center glass-card px-4 py-2 rounded-full border border-green-500/30">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-green-400">GRATUITO</span>
          </div>
          <div className="flex items-center glass-card px-4 py-2 rounded-full border border-emerald-500/30">
            <Clock className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-emerald-400">2 ORE</span>
          </div>
          <div className="flex items-center glass-card px-4 py-2 rounded-full border border-green-400/30">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-green-500">OGGETTO UNICO</span>
          </div>
        </div>
      </div>
      
      {/* Success Message SPETTACOLARE */}
      {status === 'success' && (
        <div className="mb-8 p-6 glass-card bg-green-500/10 border-2 border-green-500/50 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 animate-pulse"></div>
          <div className="relative flex items-start">
            <div className="relative mr-4">
              <CheckCircle className="w-8 h-8 text-green-400 neon-glow" />
              <div className="absolute inset-0 w-8 h-8 bg-green-400/30 rounded-full animate-ping"></div>
            </div>
            <div>
              <p className="text-green-300 font-bold text-lg mb-2">🎉 PREVENTIVO INVIATO CON SUCCESSO! 🎉</p>
              <p className="text-green-400 text-base">{message}</p>
              <p className="text-green-300 text-sm mt-2 font-medium">
                ⚡ Riceverai una risposta dettagliata con prezzi e tempi di consegna!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message DRAMMATICO */}
      {status === 'error' && (
        <div className="mb-8 p-6 glass-card bg-red-500/10 border-2 border-red-500/50 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 animate-pulse"></div>
          <div className="relative flex items-start">
            <div className="relative mr-4">
              <AlertCircle className="w-8 h-8 text-red-400 neon-glow" />
              <div className="absolute inset-0 w-8 h-8 bg-red-400/30 rounded-full animate-ping"></div>
            </div>
            <div>
              <p className="text-red-300 font-bold text-lg mb-2">⚠️ ERRORE TEMPORANEO</p>
              <p className="text-red-400 text-base">{message}</p>
              <p className="text-red-300 text-sm mt-2 font-medium">
                📱 Contattaci su WhatsApp: +39 377 091 8590
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome Field MAGNETICO */}
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
              👤 Nome Completo *
            </label>
            <div className={`relative transition-all duration-300 ${focusField === 'name' ? 'scale-105' : ''}`}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
                onFocus={() => setFocusField('name')}
                onBlur={() => setFocusField('')}
              required
                maxLength={50}
                className={`input-hypnotic text-white placeholder-gray-400 ${
                  errors.name 
                    ? 'border-red-500 focus:border-red-400 shadow-red-500/20' 
                    : 'border-green-500/30 focus:border-green-400'
                }`}
                placeholder="Mario Rossi"
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/5 to-emerald-500/5 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </div>
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-400 font-medium flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>
          
          {/* Email Field MAGNETICO */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
              📧 Email *
            </label>
            <div className={`relative transition-all duration-300 ${focusField === 'email' ? 'scale-105' : ''}`}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
                onFocus={() => setFocusField('email')}
                onBlur={() => setFocusField('')}
              required
                maxLength={254}
                className={`input-hypnotic text-white placeholder-gray-400 ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-400 shadow-red-500/20' 
                    : 'border-green-500/30 focus:border-green-400'
                }`}
                placeholder="mario.rossi@email.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/5 to-emerald-500/5 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </div>
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-400 font-medium flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Urgency Select SPETTACOLARE */}
        <div className="relative">
          <label htmlFor="urgency" className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider flex items-center">
            <Clock className="w-4 h-4 mr-2 text-emerald-400" />
            ⏰ Tempi di Produzione FDM
          </label>
          <div className={`relative transition-all duration-300 ${focusField === 'urgency' ? 'scale-105' : ''}`}>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
              onFocus={() => setFocusField('urgency')}
              onBlur={() => setFocusField('')}
              className="input-hypnotic text-white cursor-pointer"
          >
              <option value="standard" className="bg-gray-800 text-white">🏭 Standard (3-5 giorni lavorativi) - Progetti complessi</option>
              <option value="simple" className="bg-gray-800 text-white">⚡ Veloce (48-72 ore) - Oggetti semplici</option>
              <option value="urgent" className="bg-gray-800 text-white">🚨 Express (24-48 ore) - Solo geometrie basic</option>
          </select>
          </div>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            💡 Tempi di lavorazione FDM effettiva in base alla complessità geometrica. 
            La spedizione richiede 1-2 giorni aggiuntivi in tutta Italia.
          </p>
        </div>

        {/* Description Field IPNOTIZZANTE */}
        <div className="relative">
          <label htmlFor="description" className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
            📝 Descrizione Progetto *
          </label>
          <div className={`relative transition-all duration-300 ${focusField === 'description' ? 'scale-105' : ''}`}>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
              onFocus={() => setFocusField('description')}
              onBlur={() => setFocusField('')}
            required
              rows={5}
              maxLength={500}
              className={`input-hypnotic text-white placeholder-gray-400 resize-none ${
                errors.description 
                  ? 'border-red-500 focus:border-red-400 shadow-red-500/20' 
                  : 'border-green-500/30 focus:border-green-400'
              }`}
              placeholder="🎯 Descrivi la tua IDEA: che oggetto vorresti creare? Per chi è? Che colori preferisci? Hai foto o disegni da cui partire? Raccontaci tutto quello che hai in mente!"
              aria-describedby={errors.description ? 'description-error' : 'char-count'}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/5 to-emerald-500/5 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            {errors.description ? (
              <p id="description-error" className="text-sm text-red-400 font-medium flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            ) : (
              <div></div>
            )}
            <p id="char-count" className={`text-xs font-medium ${remainingChars < 50 ? 'text-orange-400' : 'text-gray-400'}`}>
              {remainingChars} caratteri rimanenti
            </p>
          </div>
        </div>

        {/* Submit Button MAGNETICO SUPREMO */}
        <div className="relative">
        <button
          type="submit"
            disabled={status === 'sending' || Object.keys(errors).length > 0}
            className="btn-magnetic w-full text-white font-black py-6 px-8 rounded-2xl text-lg md:text-xl flex items-center justify-center shadow-2xl hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
            aria-label="Invia richiesta di preventivo"
        >
          {status === 'sending' ? (
            <>
                <div className="relative mr-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <div className="absolute inset-0 animate-ping rounded-full h-6 w-6 border border-white/30"></div>
                </div>
                ⏳ INVIO IN CORSO...
            </>
          ) : (
            <>
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform neon-glow" />
                🚀 INVIA PREVENTIVO GRATUITO
                <Send className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </button>
        </div>
      </form>

      {/* Trust Footer SPETTACOLARE */}
      <div className="mt-8 p-6 glass-card rounded-2xl border border-green-500/20 text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          <p className="text-lg font-bold text-green-400">🔒 DATI PROTETTI AL 100%</p>
          <div className="w-3 h-3 bg-green-400 rounded-full ml-2 animate-pulse"></div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          <strong>⚡ Risposta garantita entro 2 ore lavorative</strong><br/>
          📊 Preventivo dettagliato via email • 🛡️ Privacy assoluta<br/>
          🚫 Non condivideremo mai i tuoi dati con terze parti
        </p>
        
        {/* BONUS Consegna Gratuita */}
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-blue-300 font-bold text-base mb-2">
            🚗 <span className="text-blue-400">CONSEGNA GRATUITA</span> in CIOCIARIA! 🚗
          </p>
          <p className="text-blue-200 text-sm">
            Per ordini sopra 20€ consegniamo a mano GRATIS in tutta la Ciociaria<br/>
            📍 <strong>Frosinone e dintorni</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickQuoteForm; 