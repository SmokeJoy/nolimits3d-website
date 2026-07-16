import React from 'react';
import { Star } from '../icons';

// 🚨 TODO PRIMA DEL LANCIO: Sostituire con testimonials reali
// Per raccogliere: invia WhatsApp ai primi 3 clienti:
// "Ciao! Potresti lasciarmi un feedback breve (max 50 parole) sul lavoro che ho fatto per te? 
//  Mi servirebbe anche una foto dell'oggetto stampato se possibile. Grazie!"

const testimonials = [
  {
    name: "Marco Rossi", // 👈 SOSTITUIRE con nome reale cliente
    role: "Architetto", // 👈 SOSTITUIRE con professione/azienda
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100", // 👈 SOSTITUIRE con foto oggetto o avatar cliente
    text: "Precisione millimetrica nei prototipi architettonici. Servizio impeccabile!", // 👈 SOSTITUIRE con feedback reale
    project: "Prototipo architettonico", // 👈 AGGIUNGERE tipo progetto
    rating: 5 // 👈 Mantenere 5 stelle
  },
  {
    name: "Laura Bianchi", // 👈 SOSTITUIRE
    role: "Designer", // 👈 SOSTITUIRE
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100", // 👈 SOSTITUIRE
    text: "Ho trovato il partner ideale per realizzare i miei progetti. Veloci e professionali.", // 👈 SOSTITUIRE
    project: "Gadget personalizzati", // 👈 AGGIUNGERE
    rating: 5
  },
  {
    name: "Giuseppe Verdi", // 👈 SOSTITUIRE
    role: "Ingegnere Meccanico", // 👈 SOSTITUIRE
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100", // 👈 SOSTITUIRE
    text: "Qualità eccezionale per i pezzi di ricambio. Tempi di consegna rispettati al 100%.", // 👈 SOSTITUIRE
    project: "Componenti meccanici", // 👈 AGGIUNGERE
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Cosa dicono i nostri clienti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;