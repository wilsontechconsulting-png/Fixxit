export const GAS_SAFETY_WARNING =
  "Smell gas? Leave right away and take everyone with you. Don't flip switches, use appliances, light anything, or start a car. Once you're safely outside and away from the building, call 911 and your gas company's emergency line. Don't go back in until they say it's safe."

export const FIRE_SAFETY_WARNING =
  'If you see fire, leave and call 911 from a safe place. If you see sparks or smell burning, shut off the breaker only if it is safe.'

export const EMERGENCY_TYPES = [
  {
    id: 'water_leak',
    label: 'Water leak or flooding',
    tip: 'Shut off the main water valve if you can do so safely. Stay away from standing water near electrical outlets.',
    alertFirst: false,
  },
  {
    id: 'gas_smell',
    label: 'Gas smell',
    tip: '',
    alertFirst: true,
  },
  {
    id: 'electrical',
    label: 'Electrical (sparks, burning smell, power out)',
    tip: 'If you see sparks or smell burning, shut off the breaker if it is safe. If there is fire, leave and call 911. Stay away from downed power lines.',
    alertFirst: true,
  },
  {
    id: 'no_heat',
    label: 'No heat',
    tip: 'Check that the thermostat has power. If you smell gas, leave right away, take everyone with you, and call 911 and your gas company from outside. Don\'t flip switches, light anything, or go back in until they say it\'s safe.',
    alertFirst: false,
  },
  {
    id: 'no_ac',
    label: 'No AC',
    tip: 'This can be serious in extreme heat. Stay as cool as you can and avoid overexertion while you reach a pro.',
    alertFirst: false,
  },
  {
    id: 'sewer_backup',
    label: 'Sewer backup',
    tip: 'Avoid contact with sewage, and avoid running water until a pro can look at it.',
    alertFirst: false,
  },
  {
    id: 'roof_leak',
    label: 'Roof leak or storm damage',
    tip: 'Stay clear of damaged areas, downed lines, and anything that looks unstable.',
    alertFirst: false,
  },
  {
    id: 'other',
    label: 'Other',
    tip: 'If anyone is in immediate danger, leave and call 911. Then tell us briefly what is going on so we can route you to the right pro.',
    alertFirst: false,
  },
] as const

export type EmergencyTypeId = (typeof EMERGENCY_TYPES)[number]['id']

export function isEmergencyType(value: string): value is EmergencyTypeId {
  return EMERGENCY_TYPES.some((item) => item.id === value)
}

export function emergencyTypeById(id: string) {
  return EMERGENCY_TYPES.find((item) => item.id === id)
}

export function emergencyLabel(id: string): string {
  return emergencyTypeById(id)?.label ?? id
}
