/**
 * The mode of the progress spinner, which determines how progress is visually represented.
 * - 'determinate': The spinner displays a specific percentage of progress based on the `value` input (from 0 to 100).
 * - 'indeterminate': The spinner does not represent a specific percentage and spins continuously to indicate an ongoing process without a defined end.
 */
export type ProgressSpinnerMode = 'determinate' | 'indeterminate';
