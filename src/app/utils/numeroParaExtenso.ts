
const numeroParaExtenso = (numero: number): string => {
  const numeros: { [key: number]: string; } = {
    1: 'um',
    2: 'dois',
    3: 'três',
    4: 'quatro',
    5: 'cinco',
    6: 'seis',
    7: 'sete',
    8: 'oito',
    9: 'nove',
    10: 'dez',
    11: 'onze',
    12: 'doze',
    13: 'treze',
    14: 'quatorze',
    15: 'quinze',
    16: 'dezesseis',
    17: 'dezessete',
    18: 'dezoito',
    19: 'dezenove',
    20: 'vinte',
    21: 'vinte e um',
    22: 'vinte e dois',
    23: 'vinte e três',
    24: 'vinte e quatro',
    25: 'vinte e cinco',
    26: 'vinte e seis',
    27: 'vinte e sete',
    28: 'vinte e oito',
    29: 'vinte e nove',
    30: 'trinta',
    31: 'trinta e um'
  };

  return numeros[numero] || '';
};

export default numeroParaExtenso;