const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export function formatDateExtenso(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  const monthNames = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  const monthName = monthNames[parseInt(month) - 1];
  
  return `${day} de ${monthName} de ${year}`;
}

export default formatDate;
