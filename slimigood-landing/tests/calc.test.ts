import { describe, expect, it } from 'vitest';
import { calculateBMI, calculateProjection, getBmiCategory } from '../src/lib/calc';

describe('calculateBMI', () => {
  it('calculates bmi for given values', () => {
    expect(calculateBMI(170, 68)).toBe(23.5);
  });

  it('throws on invalid input', () => {
    expect(() => calculateBMI(0, 70)).toThrowError('Height and weight must be positive numbers');
  });
});

describe('calculateProjection', () => {
  it('returns consistent projection for medium activity', () => {
    const result = calculateProjection({ height: 168, weight: 74, age: 32, sex: 'female', activity: 'medium' });
    expect(result.bmi).toBe(26.2);
    expect(result.weeklyLossRange).toEqual([0.5, 1]);
    expect(result.totalLossRange).toEqual([2, 4]);
    expect(result.projection).toContain('Умеренный режим');
  });

  it('adapts weekly loss by activity', () => {
    const low = calculateProjection({ height: 165, weight: 80, age: 40, sex: 'female', activity: 'low' });
    const high = calculateProjection({ height: 165, weight: 80, age: 40, sex: 'female', activity: 'high' });
    expect(low.weeklyLossRange[0]).toBeLessThan(high.weeklyLossRange[0]);
    expect(high.weeklyLossRange[1]).toBeGreaterThan(low.weeklyLossRange[1]);
  });
});

describe('getBmiCategory', () => {
  it('matches ranges correctly', () => {
    expect(getBmiCategory(18)).toBe('Недостаточный вес');
    expect(getBmiCategory(25)).toBe('Избыточный вес');
    expect(getBmiCategory(36)).toBe('Ожирение II степени');
  });
});
