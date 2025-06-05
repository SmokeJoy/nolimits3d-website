import React, { useState } from 'react';
import WhatsAppButton from './WhatsAppButton';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contatti" className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Pronto a stampare?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Inviaci il tuo file STL o semplicemente un'idea.
          Ti risponderemo con un preventivo personalizzato in poche ore.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Richiedi via email</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Descrivi il tuo progetto..."
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-accent hover:bg-accent-light text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {status === 'sending' ? 'Invio...' : 'Invia richiesta'}
              </button>
              {status === 'success' && (
                <p className="text-green-500 mt-2">Richiesta inviata! Ti risponderemo presto.</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 mt-2">Errore nell'invio. Riprova più tardi.</p>
              )}
            </form>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Preferisci WhatsApp?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Contattaci direttamente su WhatsApp per una risposta immediata
            </p>
            <WhatsAppButton 
              text="Richiedi su WhatsApp" 
              message="Ciao NoLimits3D, vorrei un preventivo per..."
              className="text-lg"
              showIcon={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;