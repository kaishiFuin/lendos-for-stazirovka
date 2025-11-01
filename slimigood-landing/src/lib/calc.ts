export type Sex = 'female' | 'male';
export type ActivityLevel = 'low' | 'medium' | 'high';

export interface CalcInput {
  heightCm: number;
  weightKg: number;
  age: number;
  sex: Sex;
  activity: ActivityLevel;
}

export interface CalcResult {
  bmi: number;
  category: string;
  weeklyMinKg: number;
  weeklyMaxKg: number;
  totalMinKg: number;
  totalMaxKg: number;
  advisory: string;
}

export function calculateBMI(heightCm: number, weightKg: number): number {
  if (heightCm <= 0) throw new Error('Height must be positive');
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Недостаточный вес';
  if (bmi < 25) return 'Норма';
  if (bmi < 30) return 'Избыточный вес';
  if (bmi < 35) return 'Ожирение I';
  if (bmi < 40) return 'Ожирение II';
  return 'Ожирение III';
}

function activityFactor(activity: ActivityLevel): number {
  switch (activity) {
    case 'high':
      return 1.15;
    case 'medium':
      return 1.05;
    default:
      return 1;
  }
}

function sexFactor(sex: Sex): number {
  return sex === 'male' ? 1.05 : 1;
}

function ageFactor(age: number): number {
  if (age < 30) return 1.05;
  if (age < 50) return 1;
  return 0.95;
}

export function calculateProjection(input: CalcInput): CalcResult {
  const bmi = calculateBMI(input.heightCm, input.weightKg);
  const category = getBmiCategory(bmi);
  const baseMin = 0.5;
  const baseMax = 1.0;
  const intensity = activityFactor(input.activity) * sexFactor(input.sex) * ageFactor(input.age);
  const weeklyMin = Number((baseMin * intensity).toFixed(1));
  const weeklyMax = Number((baseMax * intensity).toFixed(1));
  const totalMin = Number((weeklyMin * 4).toFixed(1));
  const totalMax = Number((weeklyMax * 4).toFixed(1));

  const advisory = (() => {
    if (bmi >= 30) return 'Фокус на устойчивом снижении и контроле питания.';
    if (bmi >= 25) return 'Комбинируем питание и мягкую активность.';
    if (bmi >= 18.5) return 'Сохраняем баланс и не допускаем дефицита.';
    return 'Увеличьте калорийность и наблюдайтесь у специалиста.';
  })();

  return {
    bmi,
    category,
    weeklyMinKg: weeklyMin,
    weeklyMaxKg: weeklyMax,
    totalMinKg: totalMin,
    totalMaxKg: totalMax,
    advisory
  };
}
