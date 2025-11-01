import { describe, expect, it } from 'vitest';
import { calculateBMI, calculateProjection, getBmiCategory } from '../src/lib/calc';

describe('calculateBMI', () => {
  it('returns BMI with one decimal', () => {
    expect(calculateBMI(170, 70)).toBe(24.2);
  });

  it('throws on invalid height', () => {
    expect(() => calculateBMI(0, 70)).toThrow();
  });
});

describe('getBmiCategory', () => {
  it('detects normal range', () => {
    expect(getBmiCategory(23.4)).toBe('Норма');
  });
});

describe('calculateProjection', () => {
  it('returns projected weekly and total loss', () => {
    const result = calculateProjection({
      heightCm: 168,
      weightKg: 78,
      age: 33,
      sex: 'female',
      activity: 'medium'
    });
    expect(result.bmi).toBe(27.6);
    expect(result.totalMinKg).toBeGreaterThan(0);
    expect(result.totalMaxKg).toBeGreaterThan(result.totalMinKg);
  });
});
