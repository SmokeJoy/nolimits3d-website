import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, Tag, Search, Filter } from '../icons';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { MaterialsComparisonTable } from '../components/MaterialsComparisonTable';
import { TroubleshootingTables } from '../components/TroubleshootingTables';
import { DfAMTables } from '../components/DfAMTables';
import { FinishingTechniquesTable, ProcessParametersTable, SafetyToolsTable } from '../components/PostProcessingTables';
import { KlipperCalibrationsTable, HardwareDiagnosticsTable, FirmwareConfigTable } from '../components/KlipperMaintenanceTables';
import { blogPosts, type BlogPost } from '../content/blog';

// Custom link component for ReactMarkdown
const CustomLink = ({ href, children, ...props }: any) => {
  // Check if it's an internal link
  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return (
      <Link to={href} className="internal-link" {...props}>
        {children}
      </Link>
    );
  }
  
  // External link
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

const categories = ["Tutti", "materiali", "troubleshooting", "Design", "Post-Processing", "Manutenzione"];

// Enhanced Structured Data Schema per TechArticle (separato)
const createArticleSchema = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.seoTitle || post.title,
  "datePublished": `${post.date}T00:01:00+02:00`,
  "dateModified": `${post.date}T12:00:00+02:00`,
  "author": {
    "@type": "Person",
    "name": post.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "NoLimits3D",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nolimits3d.it/images/logo.jpg"
    }
  },
  "description": post.seoDescription || post.excerpt,
  "wordCount": post.content.split(' ').length,
  "image": [`https://nolimits3d.it${post.image}`],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://nolimits3d.it/blog/${post.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
  },
  "url": `https://nolimits3d.it/blog/${post.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
});

// FAQ Schema separato per DfAM
const createFAQSchema = (post: BlogPost) => {
  if (post.id !== 3) return null; // Solo per articolo DfAM
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quanto deve essere spessa una parete per essere resistente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Per una parete strutturale, una buona regola è progettarla con uno spessore di almeno 1.2-1.6 mm. Questo corrisponde a 3-4 passaggi di un ugello standard da 0.4 mm, creando un guscio solido e robusto. Per pareti non portanti, il minimo assoluto è circa 0.8 mm (2 perimetri)."
        }
      },
      {
        "@type": "Question", 
        "name": "Che tolleranza devo lasciare tra due pezzi che si incastrano?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dipende dal tipo di accoppiamento e dalla precisione della tua stampante. Come punto di partenza, prevedi un gioco di 0.2-0.3 mm per un accoppiamento a scorrimento e 0.1 mm o meno per un accoppiamento a pressione. Stampa sempre dei campioni di prova per validare le tolleranze."
        }
      },
      {
        "@type": "Question",
        "name": "Come posso rendere un pezzo il più resistente possibile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ci sono tre azioni chiave: 1. Orienta il pezzo correttamente per allineare le forze al piano XY. 2. Aumenta il numero di perimetri (walls) nello slicer a 3 o 4. Questo ha un impatto maggiore sulla resistenza rispetto all'aumento della densità di riempimento. 3. Aggiungi raccordi (fillets) generosi a tutti gli angoli interni e alle basi delle feature per distribuire lo stress."
        }
      },
      {
        "@type": "Question",
        "name": "Cos'è l'ottimizzazione topologica e mi serve davvero?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'ottimizzazione topologica è un processo software che calcola la forma più efficiente per un pezzo basandosi sui carichi che deve sopportare. Rimuove tutto il materiale non necessario, creando strutture ultra-leggere e resistenti. Per l'hobbista medio non è indispensabile, ma per applicazioni ingegneristiche avanzate (droni, robotica, motorsport) è una tecnologia rivoluzionaria."
        }
      },
      {
        "@type": "Question",
        "name": "È meglio aumentare l'infill o il numero di perimetri per la resistenza?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Per la maggior parte delle applicazioni, aumentare il numero di perimetri è molto più efficace che aumentare la densità di riempimento. Un guscio esterno più spesso (3-5 perimetri) contribuisce molto di più alla resistenza a flessione e impatto rispetto a un infill più denso, a parità di materiale e tempo di stampa."
        }
      }
    ]
  };
};

// Helper function to render content with React components
const renderContent = (content: string) => {
  const markdownComponents = {
    a: CustomLink,
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl font-black mb-6 mt-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8 text-green-400">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-green-300">
        {children}
      </h3>
    ),
    img: ({ src, alt }: any) => (
      <img 
        src={src} 
        alt={alt || "Immagine illustrativa per la guida stampa 3D"}
        width="800"
        height="450"
        decoding="async"
        loading="lazy"
        role={src?.includes('diagramma') ? 'img' : undefined}
        className="w-full rounded-lg shadow-lg my-6"
      />
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full glass-card rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="px-4 py-3 text-left text-green-400 font-semibold border-b border-green-500/30">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-3 border-b border-gray-700/50">
        {children}
      </td>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-green-500 pl-4 my-6 italic text-gray-300">
        {children}
      </blockquote>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-800 px-2 py-1 rounded text-green-400">
        {children}
      </code>
    ),
    pre: ({ children }: any) => (
      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-6">
        {children}
      </pre>
    )
  };

  // Handle multiple table types
  const tablePlaceholders = [
    { placeholder: '[MATERIALS_COMPARISON_TABLE]', component: <MaterialsComparisonTable key="materials-table" /> },
    { placeholder: '[DIAGNOSTIC_TABLE]', component: <TroubleshootingTables.DiagnosticTable key="diagnostic-table" /> },
    { placeholder: '[PARAMETER_TABLE]', component: <TroubleshootingTables.ParameterTable key="parameter-table" /> },
    { placeholder: '[CHECKLIST_TABLE]', component: <TroubleshootingTables.ChecklistTable key="checklist-table" /> },
    { placeholder: '[DESIGN_GUIDELINES_TABLE]', component: <DfAMTables.DesignGuidelinesTable key="design-guidelines-table" /> },
    { placeholder: '[MATERIAL_ANISOTROPY_TABLE]', component: <DfAMTables.MaterialAnisotropyTable key="material-anisotropy-table" /> },
    { placeholder: '[OPTIMIZATION_STRATEGIES_TABLE]', component: <DfAMTables.OptimizationStrategiesTable key="optimization-strategies-table" /> },
    { placeholder: '[FINISHING_TECHNIQUES_TABLE]', component: <FinishingTechniquesTable key="finishing-techniques-table" /> },
    { placeholder: '[PROCESS_PARAMETERS_TABLE]', component: <ProcessParametersTable key="process-parameters-table" /> },
    { placeholder: '[SAFETY_TOOLS_TABLE]', component: <SafetyToolsTable key="safety-tools-table" /> },
    { placeholder: '[KLIPPER_CALIBRATIONS_TABLE]', component: <KlipperCalibrationsTable key="klipper-calibrations-table" /> },
    { placeholder: '[HARDWARE_DIAGNOSTICS_TABLE]', component: <HardwareDiagnosticsTable key="hardware-diagnostics-table" /> },
    { placeholder: '[FIRMWARE_CONFIG_TABLE]', component: <FirmwareConfigTable key="firmware-config-table" /> }
  ];

  let processedContent = content;
  const components: JSX.Element[] = [];
  
  // Process each table placeholder
  tablePlaceholders.forEach((table, index) => {
    if (processedContent.includes(table.placeholder)) {
      const parts = processedContent.split(table.placeholder);
      processedContent = parts[0] + `___TABLE_${index}___` + parts[1];
      components.push(table.component);
    }
  });
  
  // Split content by table markers and render alternating content/components
  const contentParts = processedContent.split(/___TABLE_\d+___/);
  const result: JSX.Element[] = [];
  
  contentParts.forEach((part, index) => {
    if (part.trim()) {
      result.push(
        <ReactMarkdown key={`content-${index}`} components={markdownComponents}>
          {part}
        </ReactMarkdown>
      );
    }
    
    // Insert component after each content part (except the last)
    if (index < components.length) {
      result.push(components[index]);
    }
  });
  
  return <>{result}</>;
};

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Tutti" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    if (!post) return null;

    // Generate separated structured data schemas
    const articleSchema = createArticleSchema(post);
    const faqSchema = createFAQSchema(post);

    return (
      <>
        <SEOHead
          title={post.seoTitle || post.title}
          description={post.seoDescription || post.excerpt}
          image={post.image}
          url={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          type="article"
          article={{
            publishedTime: post.date,
            modifiedTime: post.date,
            author: post.author,
            tags: post.tags
          }}
          structuredData={articleSchema}
        />
        
        {/* Separate script blocks for Article and FAQ schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
        
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema)
            }}
          />
        )}
        
        <main className="pt-20">
          <article className="py-20">
            <div className="section-container max-w-4xl mx-auto">
              {/* Breadcrumbs per singolo articolo */}
              <Breadcrumbs 
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: post.title, current: true }
                ]}
                className="mb-8"
              />
              
              <button
                onClick={() => setSelectedPost(null)}
                className="mb-8 flex items-center text-green-400 hover:text-green-300 transition-colors"
              >
                ← Torna al Blog
              </button>

              <header className="mb-12">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="glass-card px-3 py-1 rounded-full text-sm border border-green-500/30">
                    <Tag className="w-3 h-3 inline mr-1" />
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('it-IT')}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {post.readTime} di lettura
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                    {post.title}
                  </span>
                </h1>

                {post.image && (
                  <img
                    src={post.image}
                    alt={`${post.title} - Guida completa NoLimits3D`}
                    width="1200"
                    height="628"
                    decoding="async"
                    fetchpriority="high"
                    className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
                  />
                )}
              </header>

              <div className="prose prose-lg prose-invert max-w-none">
                {renderContent(post.content)}
              </div>





              <div className="mt-12 pt-8 border-t border-gray-700">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="glass-card px-3 py-1 rounded-full text-sm border border-green-500/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="glass-card p-6 rounded-xl border border-green-500/30">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">
                    Ti è piaciuto questo articolo?
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Condividilo con altri maker e aiuta la community a crescere!
                  </p>
                  <div className="flex gap-4">
                    <Link
                      to="/contatti"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                    >
                      Contattaci per domande
                    </Link>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-2 rounded-lg transition-all duration-300"
                    >
                      Altri articoli
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Blog Stampa 3D - Guide, Tutorial e Consigli Professionali"
        description="Scopri guide complete, tutorial approfonditi e consigli professionali per la stampa 3D. Materiali, troubleshooting, design e molto altro dal team NoLimits3D."
        url="/blog"
      />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="section-container">
            {/* Breadcrumbs per pagina blog principale */}
            <Breadcrumbs 
              items={[
                { label: 'Blog', current: true }
              ]}
              className="mb-12"
            />
            
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Blog Stampa 3D
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Guide complete, tutorial approfonditi e consigli professionali per diventare un vero esperto di stampa 3D
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-12 flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cerca articoli..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-400"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <Filter className="text-gray-400 w-5 h-5" />
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedPost(post.id)}
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={`${post.title} - Anteprima articolo NoLimits3D`}
                        width="400"
                        height="225"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('it-IT')}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Nessun articolo trovato
                </h3>
                <p className="text-gray-400">
                  Prova a modificare i filtri di ricerca o le categorie selezionate.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog; 