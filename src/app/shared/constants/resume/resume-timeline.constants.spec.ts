import { PROJECT_PRO_IMAGE_EDITOR } from 'src/app/shared/constants/projects/project-pro_image_editor.constants';
import { PROJECT_SNAPTAB } from 'src/app/shared/constants/projects/project-snaptab.constants';
import { PROJECT_WAIO } from 'src/app/shared/constants/projects/project-waio.constants';
import { RESUME_TIMELINE_ITEMS } from './resume-timeline.constants';

describe('RESUME_TIMELINE_ITEMS', () => {
  it('should have a defined structure', () => {
    expect(Array.isArray(RESUME_TIMELINE_ITEMS)).toBeTruthy();
    expect(RESUME_TIMELINE_ITEMS.length).toBeGreaterThan(0);
  });

  it('should have valid properties for each item', () => {
    RESUME_TIMELINE_ITEMS.forEach((item) => {
      expect(item.date).toBeDefined();
      expect(item.title).toBeDefined();
      expect(item.msg).toBeDefined();
      if (item.more) {
        expect(item.more.label).toBeDefined();
        expect(
          item.more.projectDetails || item.more.imagePreview,
        ).toBeDefined();
      }
    });
  });

  it('should contain specific projects', () => {
    const projects = RESUME_TIMELINE_ITEMS.map(
      (item) => item.more?.projectDetails,
    );
    expect(projects).toContain(PROJECT_SNAPTAB);
    expect(projects).toContain(PROJECT_PRO_IMAGE_EDITOR);
    expect(projects).toContain(PROJECT_WAIO);
  });

  it('should have title length <= 30 characters', () => {
    RESUME_TIMELINE_ITEMS.forEach((item) => {
      expect(item.title.length).toBeLessThanOrEqual(30);
    });
  });

  it('should have message length <= 250 characters', () => {
    RESUME_TIMELINE_ITEMS.forEach((item) => {
      expect(item.msg?.length ?? 0).toBeLessThanOrEqual(250);
    });
  });
});
