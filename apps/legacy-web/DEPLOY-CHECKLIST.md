# 🚀 DEPLOY CHECKLIST - NoLimits3D

## ✅ PRIMA DEL DEPLOY (Day 1)

### 🌐 **Dominio e SSL**
- [ ] Acquista dominio `nolimits3d.it` (Namecheap/OVH)
- [ ] Configura DNS su Cloudflare
- [ ] Punta A record: `@` → IP del VPS
- [ ] Attiva SSL "Full (strict)" in Cloudflare
- [ ] Verifica HTTPS funzionante

### 📊 **Google Analytics Setup**
1. [ ] Crea proprietà GA4 su analytics.google.com
2. [ ] Copia il Measurement ID (formato: G-XXXXXXXXX)
3. [ ] Sostituisci `G-XXXXXXX` in `index.html` (riga ~155)
4. [ ] Verifica tracking in tempo reale

### 🍪 **Cookie Banner Test**
- [ ] Apri sito in modalità incognito
- [ ] Verifica banner cookie si mostra
- [ ] Testa "Accetta tutti" / "Rifiuta"
- [ ] Verifica link "Preferenze Cookie" nel footer

## ✅ CONTENUTI DA AGGIORNARE (Day 1 sera)

### 👥 **Testimonials Reali**
Invia su WhatsApp ai tuoi primi 3 clienti:

```
Ciao [NOME]! 👋 
Sto lanciando il sito ufficiale di NoLimits3D. 
Potresti lasciarmi un feedback breve (max 50 parole) 
sul lavoro che ho fatto per te? 

Mi servirebbe anche una foto dell'oggetto stampato 
se possibile. Grazie! 🙏
```

Poi aggiorna `src/components/Testimonials.tsx`:
- [ ] Nome reale cliente 1
- [ ] Nome reale cliente 2  
- [ ] Nome reale cliente 3
- [ ] Feedback reali
- [ ] Foto oggetti (opzionale)

### 💼 **Partita IVA** (quando disponibile)
- [ ] Aggiorna Footer.tsx riga ~89
- [ ] Aggiorna Privacy Policy in Legal.tsx (la route `/legal` live -- `LegalPages.tsx` non era referenziato da nessuna route ed è stato rimosso)
- [ ] Aggiorna structured data nel Footer

## ✅ BUILD E DEPLOY (Day 2)

### 🔧 **Build Produzione**
```bash
npm run build
npm run preview  # Test build locale
```

### 📋 **Test Finale Cross-Browser**
- [ ] Chrome desktop + mobile
- [ ] Safari iOS
- [ ] Firefox desktop
- [ ] Edge desktop
- [ ] Test form preventivo
- [ ] Test WhatsApp widget
- [ ] Test Gallery lightbox

### ⚡ **Performance Check**
- [ ] Lighthouse score ≥ 90 mobile
- [ ] Lighthouse score ≥ 95 desktop
- [ ] PageSpeed Insights test
- [ ] GTmetrix score A

## ✅ SEO E MARKETING (Day 2)

### 🗂️ **File SEO** (✅ già pronti)
- [x] robots.txt creato
- [x] sitemap.xml generato
- [x] Meta tags ottimizzati
- [x] Structured data LocalBusiness

### 🏢 **Google My Business**
- [ ] Registra account business.google.com
- [ ] Categoria: "Servizio di stampa 3D"
- [ ] Indirizzo: Via Dante Alighieri, Frosinone
- [ ] Telefono: +39 377 091 8590
- [ ] Orari: Lu-Ve 9:00-18:00
- [ ] Verifica via postcard

### 🔍 **Google Search Console**
- [ ] Aggiungi proprietà nolimits3d.it
- [ ] Verifica proprietà
- [ ] Invia sitemap.xml
- [ ] Richiedi indicizzazione homepage

## ✅ GO-LIVE FINALE

### 🚀 **Deploy Comando**
```bash
# Build finale
npm run build

# Deploy su server/hosting
rsync -av dist/ user@server:/var/www/nolimits3d.it/
# oppure upload via FTP/cPanel
```

### ✅ **Test Post-Deploy**
- [ ] Sito raggiungibile via HTTPS
- [ ] Form preventivo funzionante
- [ ] WhatsApp apre correttamente  
- [ ] Cookie banner si mostra
- [ ] Analytics traccia visite
- [ ] Lighthouse score ≥ 90
- [ ] Tutte le immagini si caricano
- [ ] Video time-lapse funzionanti

## 🎉 **LANCIO UFFICIALE**

### 📱 **Annuncio Social**
```
🎉 È ONLINE il sito ufficiale di NoLimits3D! 

🌐 nolimits3d.it
📱 Preventivi in 2 ore
🚚 Consegna gratis in Ciociaria
🎨 Oggetti unici su misura

#Stampa3D #NoLimits3D #Frosinone #Ciociaria
```

### 📊 **Monitoraggio**
- [ ] Google Analytics attivo
- [ ] Google Search Console monitoraggio
- [ ] Prima settimana: check errori 404
- [ ] Backup settimanale

---

## 🛟 **TROUBLESHOOTING**

### Cookie Banner non appare?
- Verifica rete: tarteaucitron.js caricato
- Console browser: errori JavaScript?
- Cache: svuota cache browser

### GA4 non traccia?
- ID corretto in index.html?
- Real-time reports: traffico visibile?
- AdBlocker disabilitato per test?

### Lighthouse score basso?
- Compressione immagini
- Minificazione già automatica (Vite)
- CDN Cloudflare attivo?

---

**✅ Completato tutto? CONGRATULAZIONI! 🎉**  
**Il tuo sito NoLimits3D è LIVE e pronto per acquisire clienti!** 