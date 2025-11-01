import { describe, expect, it } from 'vitest';
import { calculatePlan } from '../src/lib/calc';

describe('calculatePlan', () => {
  it('рассчитывает ИМТ и прогноз для средней активности', () => {
    const result = calculatePlan({ height: 170, weight: 80, age: 35, gender: 'female', activity: 'medium' });
    expect(result.bmi).toBeCloseTo(27.7);
    expect(result.minLoss).toBeCloseTo(2.0);
    expect(result.maxLoss).toBeCloseTo(4.0);
  });

  it('учитывает активность при прогнозе', () => {
    const low = calculatePlan({ height: 165, weight: 70, age: 30, gender: 'female', activity: 'low' });
    const high = calculatePlan({ height: 165, weight: 70, age: 30, gender: 'female', activity: 'high' });
    expect(low.minLoss).toBeLessThan(high.minLoss);
    expect(low.maxLoss).toBeLessThan(high.maxLoss);
  });

  it('бросает ошибку при некорректных данных', () => {
    expect(() => calculatePlan({ height: 0, weight: 70, age: 25, gender: 'male', activity: 'medium' })).toThrow();
  });
});
