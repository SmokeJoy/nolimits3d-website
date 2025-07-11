import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert segment to readable name
      let name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Special cases for common paths
      switch (segment) {
        case 'chi-siamo':
          name = 'Chi Siamo';
          break;
        case 'galleria':
          name = 'Galleria';
          break;
        case 'contatti':
          name = 'Contatti';
          break;
        case 'blog':
          name = 'Blog & Guide';
          break;
        case 'legal':
          name = 'Informazioni Legali';
          break;
        case 'materiali-stampa-3d':
          name = 'Materiali per Stampa 3D';
          break;
        case 'problemi-stampa-3d':
          name = 'Problemi Stampa 3D';
          break;
        case 'dfam-design-stampa-3d':
          name = 'DfAM Design per Stampa 3D';
          break;
        case 'post-processing-stampa-3d':
          name = 'Post-Processing Stampa 3D';
          break;
        case 'manutenzione-klipper-stampante-3d':
          name = 'Manutenzione Klipper Stampante 3D';
          break;
        default:
          break;
      }

      breadcrumbs.push({
        name,
        url: currentPath,
        isCurrentPage: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav 
      className={`flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            )}
            
            {item.isCurrentPage ? (
              <span 
                className="font-medium text-gray-900 dark:text-gray-100"
                aria-current="page"
              >
                {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                {item.name}
              </span>
            ) : (
              <Link
                to={item.url}
                className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center"
              >
                {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 