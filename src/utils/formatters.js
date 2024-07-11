export const formatNumber = (num) => {
  if (num < 0.01) {
    return num.toFixed(6);  // Show 6 decimal places for very small numbers
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

export const formatPercentage = (num) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'always'
  }).format(num) + '%';
};
