import './string.extensions';

describe('String.prototype.truncate', () => {
    it('should truncate the string to the specified maximum length', () => {
        const str = 'Hello, World!';
        expect(str.truncate(5)).toBe('Hello');
    });

    it('should return the original string if it is shorter than the maximum length', () => {
        const str = 'Hi';
        expect(str.truncate(5)).toBe('Hi');
    });

    it('should return the original string if it is equal to the maximum length', () => {
        const str = 'Hello';
        expect(str.truncate(5)).toBe('Hello');
    });

    it('should return an empty string if the maximum length is 0', () => {
        const str = 'Hello';
        expect(str.truncate(0)).toBe('');
    });

    it('should handle strings with special characters', () => {
        const str = 'Hello, 世界!';
        expect(str.truncate(7)).toBe('Hello, ');
    });

    it('should handle empty strings', () => {
        const str = '';
        expect(str.truncate(5)).toBe('');
    });

    it('should handle negative maximum length by returning an empty string', () => {
        const str = 'Hello';
        expect(str.truncate(-1)).toBe('');
    });
});