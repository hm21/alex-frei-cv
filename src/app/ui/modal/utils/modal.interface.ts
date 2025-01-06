export interface ModalImagePreviewData {
  title: string;
  subtitle: string;
  items: {
    src: string;
    alt: string;
    ratio: string;
    backgroundColor?: string;
  }[];
}
