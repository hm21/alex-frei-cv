export interface ModalImagePreviewData {
  title: string;
  subtitle: string;
  items: ModalPreviewItem[];
}

export interface ModalPreviewItem {
  path: string;
  alt: string;
  ratio?: string;
  backgroundColor?: string;
  isVideo?: boolean;
}
