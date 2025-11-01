export type ActivityLevel = 'low' | 'medium' | 'high';

export interface CalcInput {
  height: number; // cm
  weight: number; // kg
  age: number;
  sex: 'female' | 'male';
  activity: ActivityLevel;
}

export interface CalcResult {
  bmi: number;
  bmiCategory: string;
  weeklyLossRange: [number, number];
  totalLossRange: [number, number];
  projection: string;
}

const activityFactor: Record<ActivityLevel, number> = {
  low: 0.9,
  medium: 1,
  high: 1.1
};

const bmiCategories = [
  { max: 18.5, label: 'Недостаточный вес' },
  { max: 24.9, label: 'Норма' },
  { max: 29.9, label: 'Избыточный вес' },
  { max: 34.9, label: 'Ожирение I степени' },
  { max: 39.9, label: 'Ожирение II степени' },
  { max: Infinity, label: 'Ожирение III степени' }
];

export const calculateBMI = (height: number, weight: number) => {
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight must be positive numbers');
  }
  const heightMeters = height / 100;
  return Number((weight / (heightMeters * heightMeters)).toFixed(1));
};

export const getBmiCategory = (bmi: number) => {
  const matched = bmiCategories.find((category) => bmi <= category.max);
  return matched ? matched.label : 'Неопределено';
};

const computeWeeklyLoss = (activity: ActivityLevel) => {
  const baseMin = 0.5;
  const baseMax = 1.0;
  const factor = activityFactor[activity];
  return [Number((baseMin * factor).toFixed(1)), Number((baseMax * factor).toFixed(1))] as [number, number];
};

export const calculateProjection = (input: CalcInput): CalcResult => {
  const bmi = calculateBMI(input.height, input.weight);
  const bmiCategory = getBmiCategory(bmi);
  const [weeklyMin, weeklyMax] = computeWeeklyLoss(input.activity);
  const totalMin = Number((weeklyMin * 4).toFixed(1));
  const totalMax = Number((weeklyMax * 4).toFixed(1));
  const projection =
    input.activity === 'high'
      ? 'Готовы к активной перезагрузке: усиливаем режим и следим за восстановлением.'
      : input.activity === 'medium'
      ? 'Умеренный режим со сбалансированным рационом и мягкими нагрузками.'
      : 'Стартуем без перегрузок: питание + лёгкая активность, чтобы привыкнуть.';

  return {
    bmi,
    bmiCategory,
    weeklyLossRange: [weeklyMin, weeklyMax],
    totalLossRange: [totalMin, totalMax],
    projection
  };
};
