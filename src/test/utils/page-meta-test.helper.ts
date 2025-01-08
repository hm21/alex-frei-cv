export function runPageMetaTests(getComponent: () => any) {
  it('should have a defined title', () => {
    expect(getComponent()['pageMeta'].title).toBeDefined();
  });

  it('should have a title with a length between 15 and 64 characters', () => {
    expect(getComponent()['pageMeta'].title.length).toBeGreaterThanOrEqual(15);
    expect(getComponent()['pageMeta'].title.length).toBeLessThanOrEqual(64);
  });

  it('should have a defined description', () => {
    expect(getComponent()['pageMeta'].description).toBeDefined();
  });

  it('should have a description with a length between 25 and 160 characters', () => {
    expect(
      getComponent()['pageMeta'].description.length,
    ).toBeGreaterThanOrEqual(25);
    expect(getComponent()['pageMeta'].description.length).toBeLessThanOrEqual(
      160,
    );
  });
}
