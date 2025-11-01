import { describe, expect, it } from 'vitest';
import { calculateBmi, runCalc } from '../src/lib/calc';

describe('calculateBmi', () => {
  it('computes BMI with one decimal', () => {
    expect(calculateBmi(170, 68)).toBe(23.5);
  });

  it('throws for invalid input', () => {
    expect(() => calculateBmi(0, 50)).toThrowError('Height and weight must be positive');
  });
});

describe('runCalc', () => {
  it('produces forecast in safe range for moderate input', () => {
    const result = runCalc({ heightCm: 168, weightKg: 74, age: 33, gender: 'female', activity: 'medium' });
    expect(result.forecast.min).toBeGreaterThanOrEqual(1.5);
    expect(result.forecast.max).toBeLessThanOrEqual(10);
    expect(result.category).toBe('Избыток веса');
  });

  it('boosts forecast for high BMI', () => {
    const result = runCalc({ heightCm: 165, weightKg: 98, age: 41, gender: 'female', activity: 'low' });
    expect(result.forecast.min).toBeGreaterThan(3);
    expect(result.forecast.max).toBeGreaterThan(result.forecast.min);
  });

  it('reduces forecast for normal BMI', () => {
    const result = runCalc({ heightCm: 180, weightKg: 72, age: 29, gender: 'male', activity: 'high' });
    expect(result.forecast.max).toBeLessThan(6);
    expect(result.category).toBe('Здоровый диапазон');
  });
});
