export type Gender = 'male' | 'female';
export type ActivityLevel = 'low' | 'medium' | 'high';

export interface CalcInput {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: Gender;
  activity: ActivityLevel;
}

export interface CalcResult {
  bmi: number;
  category: string;
  forecast: {
    min: number;
    max: number;
  };
  advice: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const calculateBmi = (heightCm: number, weightKg: number): number => {
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Height and weight must be positive');
  }
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
};

const bmiCategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Ниже нормы';
  if (bmi < 25) return 'Здоровый диапазон';
  if (bmi < 30) return 'Избыток веса';
  return 'Ожирение';
};

const activityMultiplier: Record<ActivityLevel, number> = {
  low: 0.9,
  medium: 1,
  high: 1.1
};

export const runCalc = (input: CalcInput): CalcResult => {
  const bmi = calculateBmi(input.heightCm, input.weightKg);
  const category = bmiCategory(bmi);

  const baseWeeklyMin = 0.5;
  const baseWeeklyMax = 1.0;
  const weeks = 4;
  const activityBoost = activityMultiplier[input.activity];

  const bmiBoost = bmi >= 30 ? 1.2 : bmi >= 27 ? 1.1 : bmi <= 22 ? 0.8 : 1;
  const genderAdjustment = input.gender === 'male' ? 1.05 : 1;

  const rawMin = baseWeeklyMin * weeks * activityBoost * bmiBoost * genderAdjustment;
  const rawMax = baseWeeklyMax * weeks * activityBoost * bmiBoost * genderAdjustment;

  const forecast = {
    min: Number(clamp(rawMin, 1.5, 8).toFixed(1)),
    max: Number(clamp(rawMax, 2.5, 10).toFixed(1))
  };

  const advice =
    category === 'Здоровый диапазон'
      ? 'Сфокусируйтесь на тонусе и закреплении привычек — программа мягко высветит зоны роста.'
      : 'Программа построена вокруг контроля аппетита, рациона и метаболической поддержки.';

  return {
    bmi,
    category,
    forecast,
    advice
  };
};
