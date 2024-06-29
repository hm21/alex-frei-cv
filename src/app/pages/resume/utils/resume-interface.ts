/**
 * Represents an item in the resume timeline.
 */
export interface ResumeTimelineItem {
  /**
   * The date of the timeline item.
   */
  date: string;
  
  /**
   * The end date of the timeline item (optional).
   */
  endDate?: Date;
  
  /**
   * The title of the timeline item.
   */
  title: string;
  
  /**
   * Additional message for the timeline item (optional).
   */
  msg?: string;
}

/**
 * Represents a skill item.
 */
export interface SkillItem {
  /**
   * The name of the skill.
   */
  name: string;
  
  /**
   * The skill level (a number representing the proficiency).
   */
  skillLevel: number;
}
