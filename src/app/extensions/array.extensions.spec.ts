import './array.extensions';

describe('Array Extensions', () => {
    let arr: number[];
    let strArr: string[];

    beforeEach(() => {
        arr = [1, 2, 3, 4, 5];
        strArr = ['apple', 'banana', 'cherry'];
    });

    it('isEmpty should return true for an empty array', () => {
        expect([].isEmpty).toBe(true);
    });

    it('isEmpty should return false for a non-empty array', () => {
        expect(arr.isEmpty).toBe(false);
    });

    it('isNotEmpty should return false for an empty array', () => {
        expect([].isNotEmpty).toBe(false);
    });

    it('isNotEmpty should return true for a non-empty array', () => {
        expect(arr.isNotEmpty).toBe(true);
    });

    it('getFirstItem should return the first item of the array', () => {
        expect(arr.getFirstItem()).toBe(1);
    });

    it('getFirstItem should return undefined for an empty array', () => {
        expect([].getFirstItem()).toBeUndefined();
    });

    it('getLastItem should return the last item of the array', () => {
        expect(arr.getLastItem()).toBe(5);
    });

    it('getLastItem should return undefined for an empty array', () => {
        expect([].getLastItem()).toBeUndefined();
    });

    it('updateLastItem should update the last item of the array', () => {
        arr.updateLastItem(10);
        expect(arr.getLastItem()).toBe(10);
    });

    it('updateLastItem should throw an error for an empty array', () => {
        expect(() => ([] as number[]).updateLastItem(10)).toThrowError();
    });

    it('removeByIndex should remove the item at the specified index', () => {
        arr.removeByIndex(2);
        expect(arr).toEqual([1, 2, 4, 5]);
    });

    it('removeDuplicates should remove duplicate items from the array', () => {
        const dupArr = [1, 2, 2, 3, 4, 4, 5];
        expect(dupArr.removeDuplicates()).toEqual([1, 2, 3, 4, 5]);
    });

    it('toNumberedList should convert an array of strings to a numbered list', () => {
        expect(strArr.toNumberedList()).toBe('1. apple\n2. banana\n3. cherry\n');
    });

    it('toNumberedList should throw an error if array contains non-string items', () => {
        expect(() => arr.toNumberedList()).toThrowError();
    });

    it('toMultipleLineList should convert an array of strings to a multiple line list', () => {
        expect(strArr.toMultipleLineList()).toBe('apple\nbanana\ncherry\n');
    });

    it('toMultipleLineList should throw an error if array contains non-string items', () => {
        expect(() => arr.toMultipleLineList()).toThrowError();
    });

    it('clear should remove all items from the array', () => {
        arr.clear();
        expect(arr).toEqual([]);
    });
});