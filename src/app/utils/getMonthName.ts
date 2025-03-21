import capitalize from "@/app/utils/capitalize";

function getMonthName(month: number) {
  const d = new Date();
  d.setMonth(month - 1);
  const monthName = d.toLocaleString("pt-BR", { month: "long" });
  return capitalize(monthName);
}

export default getMonthName;
