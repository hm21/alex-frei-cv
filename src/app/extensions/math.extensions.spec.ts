import './math.extensions';

describe('Math.randomNextInt', () => {
    it('should generate a random integer between the specified min (inclusive) and max (exclusive) values', () => {
        const min = 1;
        const max = 10;
        const result = Math.randomNextInt(max, min);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThan(max);
    });

    it('should use 0 as the default min value if min is not provided', () => {
        const max = 10;
        const result = Math.randomNextInt(max);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(max);
    });

    it('should throw an error if min is greater than or equal to max', () => {
        const min = 10;
        const max = 5;
        expect(() => Math.randomNextInt(max, min)).toThrowError();
    });
});