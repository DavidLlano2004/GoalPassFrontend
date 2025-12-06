// hooks/useFormatNumber.ts
export const useFormatNumberWord = () => {
  const formatNumber = (value: number): string => {
    if (value === 0) return "0";
    
    const absValue = Math.abs(value);
    
    if (absValue >= 1000000) {
      // Millones
      const millions = value / 1000000;
      return `${millions % 1 === 0 ? millions : millions.toFixed(1)}M`;
    } 
    
    if (absValue >= 1000) {
      // Miles
      const thousands = value / 1000;
      return `${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}K`;
    }
    
    // Menor a 1000, devolver como número entero
    return value.toLocaleString('es-CO', {
      maximumFractionDigits: 0
    });
  };

  const formatCurrency = (value: number, currency: string = 'COP'): string => {
    if (value === 0) return `$0`;
    
    const absValue = Math.abs(value);
    
    if (absValue >= 1000000) {
      // Millones
      const millions = value / 1000000;
      const formatted = millions % 1 === 0 ? millions : millions.toFixed(1);
      return `$${formatted}M`;
    } 
    
    if (absValue >= 1000) {
      // Miles
      const thousands = value / 1000;
      const formatted = thousands % 1 === 0 ? thousands : thousands.toFixed(1);
      return `$${formatted}K`;
    }
    
    // Menor a 1000
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return { formatNumber, formatCurrency };
};