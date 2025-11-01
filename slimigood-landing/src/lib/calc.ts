export type Gender = 'female' | 'male';
export type ActivityLevel = 'low' | 'medium' | 'high';

export interface CalcInput {
  height: number; // cm
  weight: number; // kg
  age: number;
  gender: Gender;
  activity: ActivityLevel;
}

export interface CalcResult {
  bmi: number;
  bmiCategory: string;
  minLoss: number;
  maxLoss: number;
  projectedWeight: [number, number];
}

const BMI_CATEGORIES: Array<{ max: number; label: string }> = [
  { max: 18.5, label: 'Недостаточный вес' },
  { max: 25, label: 'Норма' },
  { max: 30, label: 'Избыточный вес' },
  { max: Infinity, label: 'Ожирение' }
];

const ACTIVITY_MULTIPLIER: Record<ActivityLevel, number> = {
  low: 0.9,
  medium: 1,
  high: 1.1
};

export const calculatePlan = ({ height, weight, activity }: CalcInput): CalcResult => {
  if (height <= 0 || weight <= 0) {
    throw new Error('Некорректные данные');
  }
  const meters = height / 100;
  const bmiRaw = weight / (meters * meters);
  const bmi = Number(bmiRaw.toFixed(1));
  const bmiCategory = BMI_CATEGORIES.find((item) => bmi < item.max)?.label ?? '—';

  const activityMultiplier = ACTIVITY_MULTIPLIER[activity];
  const baseMin = 0.5;
  const baseMax = 1.0;
  const weeklyMin = baseMin * activityMultiplier;
  const weeklyMax = baseMax * activityMultiplier;
  const weeks = 4;
  const minLoss = Number((weeklyMin * weeks).toFixed(1));
  const maxLoss = Number((weeklyMax * weeks).toFixed(1));

  const projectedWeight: [number, number] = [
    Number((weight - maxLoss).toFixed(1)),
    Number((weight - minLoss).toFixed(1))
  ];

  return { bmi, bmiCategory, minLoss, maxLoss, projectedWeight };
};
