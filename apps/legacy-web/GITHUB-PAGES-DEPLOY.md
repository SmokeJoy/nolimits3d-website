# 🚀 Deploy NoLimits3D su GitHub Pages

## ✅ Files già configurati

- [x] `.github/workflows/deploy.yml` - GitHub Actions per deploy automatico
- [x] `public/CNAME` - Dominio personalizzato `nolimits3d.store`
- [x] `vite.config.ts` - Configurazione ottimizzata per GitHub Pages
- [x] Meta tags aggiornati con nuovo dominio
- [x] Sitemap e robots.txt aggiornati
- [x] Build testata e funzionante

---

## 📋 Passi per il deploy

### 1. Creare repository GitHub
```bash
# Se non esiste già il repository
git init
git add .
git commit -m "Initial commit: NoLimits3D website ready for GitHub Pages"

# Creare repo su GitHub (es: nolimits3d-website)
git remote add origin git@github.com:TUO-USERNAME/nolimits3d-website.git
git branch -M main
git push -u origin main
```

### 2. Abilitare GitHub Pages
1. Vai su **GitHub → Repository → Settings → Pages**
2. **Source**: `GitHub Actions`
3. **Custom domain**: `nolimits3d.store`
4. **Enforce HTTPS**: ✅ spunta

### 3. Configurare DNS in Cloudflare

| Record | Nome     | Tipo    | Contenuto             | Proxy     |
|--------|----------|---------|----------------------|-----------|
| Apex   | @        | A       | 185.199.108.153      | DNS only  |
| Apex   | @        | A       | 185.199.109.153      | DNS only  |
| Apex   | @        | A       | 185.199.110.153      | DNS only  |
| Apex   | @        | A       | 185.199.111.153      | DNS only  |
| WWW    | www      | CNAME   | nolimits3d.store     | DNS only  |
| n8n    | n8n      | CNAME   | (già esistente)      | Proxied   |

**⚠️ IMPORTANTE**: 
- Usa **DNS only** (grigio) per @ e www
- Mantieni **Proxied** (arancione) solo per n8n
- Non toccare il tunnel Cloudflare per n8n

### 4. Redirect www → root (opzionale)
**Cloudflare → Rules → Redirect Rules**:
```
IF   Hostname equals "www.nolimits3d.store"
THEN 302 → https://nolimits3d.store/$1
```

---

## 🔍 Test e verifica

### Deploy automatico
Il push su `main` trigger automaticamente:
1. Build con Vite
2. Deploy su GitHub Pages
3. Sito live su `https://nolimits3d.store`

### Comandi di verifica
```bash
# Test HTTPS
curl -I https://nolimits3d.store
# Dovrebbe restituire: HTTP/2 200

# Test redirect www
curl -I https://www.nolimits3d.store
# Dovrebbe restituire: 302 → nolimits3d.store

# Test n8n (non dovrebbe cambiare)
curl -I https://n8n.nolimits3d.store
# Dovrebbe funzionare come prima
```

---

## 📊 SEO e Analytics

### Google Analytics
1. Vai su [analytics.google.com](https://analytics.google.com)
2. Crea proprietà per `nolimits3d.store`
3. Copia il **Measurement ID** (formato: G-XXXXXXXXX)
4. Sostituisci `G-XXXXXXX` in `index.html` (linee 137 e 153)
5. Commit e push → redeploy automatico

### Google Search Console
1. Vai su [search.google.com/search-console](https://search.google.com/search-console)
2. Aggiungi proprietà `nolimits3d.store`
3. Verifica con file HTML o DNS
4. Invia sitemap: `https://nolimits3d.store/sitemap.xml`

### Google My Business
1. Registra su [business.google.com](https://business.google.com)
2. **Nome**: NoLimits3D
3. **Categoria**: Servizio di stampa 3D
4. **Indirizzo**: Via Dante Alighieri, 03100 Frosinone, FR
5. **Telefono**: +39 377 091 8590
6. **Sito**: https://nolimits3d.store

---

## 🎉 Checklist finale

- [ ] Repository creato e codice pushato
- [ ] GitHub Pages abilitato con dominio personalizzato
- [ ] DNS Cloudflare configurato (DNS only)
- [ ] HTTPS attivo e certificate approved
- [ ] Sito raggiungibile su https://nolimits3d.store
- [ ] Form preventivo funzionante
- [ ] WhatsApp button funzionante
- [ ] Cookie banner visibile
- [ ] Google Analytics configurato (sostituire G-XXXXXXX)
- [ ] n8n.nolimits3d.store ancora funzionante

---

## 🛟 Troubleshooting

### "Certificate pending"
- Verifica che i record DNS puntino agli IP GitHub
- Attendi 5-15 minuti per propagazione DNS
- Controlla che sia "DNS only" non "Proxied"

### Build fallisce
```bash
# Test locale
npm run build
npm run preview

# Controllo errori
npm run lint:check
```

### n8n non funziona più
- Verifica che il record CNAME per `n8n` sia ancora Proxied
- Il tunnel Cloudflare deve rimanere attivo
- Non modificare la configurazione n8n esistente

---

**🚀 Tutto pronto per il lancio!**
Una volta completati questi passi, il sito sarà live su `https://nolimits3d.store` con deploy automatico ad ogni modifica. 