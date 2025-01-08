describe('Number Extensions', () => {
    it('should return the ceiling of the number', () => {
        const num = 4.5;
        expect(num.ceil()).toBe(5);
    });

    it('should return the absolute value of the number', () => {
        const num = -5;
        expect(num.abs()).toBe(5);
    });

    it('should return the floor of the number', () => {
        const num = 4.5;
        expect(num.floor()).toBe(4);
    });

    it('should return the rounded value of the number', () => {
        const a = 4.7;
        const b = 4.1;
        expect(a.round()).toBe(5);
        expect(b.round()).toBe(4);
    });

    it('should pad the number with leading characters', () => {
        const num = 123;
        expect(num.padStart(5, '0')).toBe('00123');
    });

    it('should pad the number with trailing characters', () => {
        const num = 123;
        expect(num.padEnd(5, '0')).toBe('12300');
    });
});