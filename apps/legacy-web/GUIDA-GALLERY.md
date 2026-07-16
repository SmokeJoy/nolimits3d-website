# 📸 Guida per Aggiungere Immagini alla Gallery

## 🎯 **Come Aggiungere Una Nuova Immagine**

### **Passo 1: Preparare l'Immagine**
1. Scegli l'immagine dalla cartella `Sorgernti/immagini/`
2. Guarda bene cosa rappresenta (prototipo, gadget, o ricambio)
3. Scegli un nome descrittivo (es: `spider-man-bust.jpg`, `green-cars.jpg`)

### **Passo 2: Copiare l'Immagine**
Apri il terminale PowerShell e digita:
```powershell
Copy-Item "Sorgernti\immagini\NOME_FILE_ORIGINALE.jpg" "public\images\NUOVO_NOME.jpg"
```

**Esempio:**
```powershell
Copy-Item "Sorgernti\immagini\IMG-20250603-WA0024.jpg" "public\images\spider-man-bust.jpg"
```

### **Passo 3: Aggiungere alla Gallery**
Apri il file `src/components/Gallery.tsx` e aggiungi la tua immagine nel punto giusto:

## 📋 **Template da Copiare**

### **Per PROTOTIPI:**
```javascript
{
  id: 3, // Numero progressivo
  title: "Busto Spider-Man",
  description: "Busto dettagliato di Spider-Man stampato in alta definizione",
  category: 'prototipi',
  imageUrl: '/images/spider-man-bust.jpg',
  tags: ['Supereroi', 'Dettagliato', 'PLA']
},
```

### **Per GADGET:**
```javascript
{
  id: 4, // Numero progressivo  
  title: "Macchinine Verdi",
  description: "Serie di macchinine decorative per bambini",
  category: 'gadget',
  imageUrl: '/images/green-cars.jpg',
  tags: ['Giocattoli', 'Serie', 'Colorato']
},
```

### **Per RICAMBI:**
```javascript
{
  id: 5, // Numero progressivo
  title: "Ingranaggio Meccanico", 
  description: "Pezzo di ricambio per macchina industriale",
  category: 'ricambi',
  imageUrl: '/images/gear-part.jpg',
  tags: ['Industriale', 'Meccanico', 'Precisione']
},
```

## 🔧 **Dove Aggiungere il Codice**

Nel file `src/components/Gallery.tsx`, cerca questa sezione:
```javascript
const galleryItems: GalleryItem[] = [
  // PROTOTIPI - Solo quelli sicuramente corretti
  {
    id: 1,
    title: "Torre Eiffel Miniatura",
    // ...
  },

  // GADGET - Solo quelli sicuramente corretti  
  {
    id: 2,
    title: "Stampe Personalizzate SPI",
    // ...
  },

  // ⬇️ AGGIUNGI QUI LE TUE NUOVE IMMAGINI ⬇️
  
];
```

## 🎨 **Suggerimenti per i Tag**

### **Tag per Prototipi:**
- `['Architettura', 'Dettagliato', 'PLA']`
- `['Meccanico', 'Funzionale', 'PETG']`
- `['Artistico', 'Scultura', 'Premium']`
- `['Testing', 'Validazione', 'ABS']`

### **Tag per Gadget:**
- `['Giocattoli', 'Divertente', 'Colorato']`
- `['Anime', 'Personaggi', 'Collezionabile']`
- `['Decorativo', 'Casa', 'Design']`
- `['Personalizzato', 'Regalo', 'Unico']`

### **Tag per Ricambi:**
- `['Industriale', 'Meccanico', 'Precisione']`
- `['Automotive', 'Motori', 'Funzionale']`
- `['Elettronica', 'Custodie', 'Protezione']`
- `['Su misura', 'Sostituzione', 'Durevole']`

## ✅ **Checklist Prima di Salvare**

- [ ] L'immagine è copiata in `public/images/`
- [ ] Il nome file è descrittivo e senza spazi
- [ ] La categoria è corretta (prototipi/gadget/ricambi)
- [ ] L'ID è un numero progressivo unico
- [ ] Il titolo descrive bene l'oggetto
- [ ] La descrizione è accattivante
- [ ] I tag sono pertinenti (massimo 3)
- [ ] Ho aggiunto la virgola dopo la parentesi graffa `},`

## 💡 **Esempio Completo**

Se hai una foto di Goku da Dragon Ball:

1. **Comando:**
```powershell
Copy-Item "Sorgernti\immagini\IMG-20250603-WA0031.jpg" "public\images\goku-action-figure.jpg"
```

2. **Codice da aggiungere:**
```javascript
{
  id: 6,
  title: "Goku Action Figure",
  description: "Action figure di Goku da Dragon Ball Z con dettagli fedeli all'anime",
  category: 'gadget',
  imageUrl: '/images/goku-action-figure.jpg',
  tags: ['Dragon Ball', 'Anime', 'Collezionabile']
},
```

## 🚀 **Come Testare**

Dopo aver aggiunto l'immagine:
1. Salva il file `Gallery.tsx`
2. Il sito si aggiorna automaticamente
3. Vai alla sezione Gallery
4. Controlla che l'immagine appaia nella categoria giusta
5. Clicca per aprire il lightbox e verificare

---

**🎯 Consiglio:** Aggiungi una immagine alla volta e testala prima di procedere con la successiva! 