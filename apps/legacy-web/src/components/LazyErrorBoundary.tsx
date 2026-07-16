import React, { Component, ErrorInfo, ReactNode } from 'react';
import LoadingFallback from './LoadingFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  retryCount: number;
}

class LazyErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  public state: State = {
    hasError: false,
    retryCount: 0
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, retryCount: 0 };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`LazyErrorBoundary caught an error in ${this.props.componentName || 'component'}:`, error, errorInfo);
    
    // Track the error for analytics if needed
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lazy_component_error', {
        event_category: 'Error',
        event_label: this.props.componentName || 'unknown_component',
        value: this.state.retryCount
      });
    }
  }

  private handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        retryCount: prevState.retryCount + 1
      }));
      
      // Force a small delay to avoid immediate retry
      setTimeout(() => {
        // This will trigger a re-render and potentially reload the component
        this.forceUpdate();
      }, 500);
    }
  };

  public render() {
    if (this.state.hasError) {
      // Show custom fallback or default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const canRetry = this.state.retryCount < this.maxRetries;
      const componentName = this.props.componentName || 'questo componente';
      
      return (
        <LoadingFallback
          type="error"
          message={
            canRetry 
              ? `Errore nel caricamento di ${componentName}. ${this.maxRetries - this.state.retryCount} tentativi rimanenti.`
              : `Non è stato possibile caricare ${componentName} dopo ${this.maxRetries} tentativi. Ricarica la pagina per riprovare.`
          }
          onRetry={canRetry ? this.handleRetry : undefined}
        />
      );
    }

    return this.props.children;
  }
}

export default LazyErrorBoundary; 