export function generateHalfHourSlotsWithLunchBreak(initHours, endHours) {
  const slots = [];
  const current = new Date(initHours);
  const lunchStart = new Date(current);
  lunchStart.setHours(12, 0, 0, 0);
  const lunchEnd = new Date(current);
  lunchEnd.setHours(13, 0, 0, 0);

  while (current < endHours) {
    // Se estiver dentro do horário de almoço, pula para o final do almoço
    if (current >= lunchStart && current < lunchEnd) {
      current.setTime(lunchEnd.getTime());
      continue;
    }
    // Adiciona um novo slot
    slots.push(new Date(current));
    // Avança 30 minutos
    current.setMinutes(current.getMinutes() + 30);
  }
  return slots;
}
