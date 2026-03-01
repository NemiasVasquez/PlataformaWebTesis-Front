export type ValidationType = 'alfa' | 'numerico' | 'alfanumerico' | 'url';

export const validarContenidoInput = (
  value: string,
  type: ValidationType,
  maxLength: number = 0
): string => {
  let pattern: RegExp;

  switch (type) {
    case 'alfa':
      pattern = /[^A-Z\s]/gi;
      break;
    case 'numerico':
      pattern = /[^0-9]/g;
      break;
    case 'alfanumerico':
      pattern = /[^A-Z0-9\s]/gi;
      break;
  }

  const clean = type === 'url' ? value : value.toUpperCase().replace(pattern, '');
  return maxLength > 0 ? clean.slice(0, maxLength) : clean;
};
