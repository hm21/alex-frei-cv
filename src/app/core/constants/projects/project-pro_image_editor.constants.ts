import { ProjectDetails } from 'src/app/features/portfolio/types/project.type';
import svgLogo from 'src/assets/img/projects/pro_image_editor/pro_image_editor-logo.svg';

export const PROJECT_PRO_IMAGE_EDITOR: { type: string } & ProjectDetails = {
  id: 'proImageEditor',
  type: $localize`Flutter open source`,
  title: 'pro_image_editor',
  subtitle: $localize`A powerful, customizable Flutter image editor with multi-threading, localization, and a rich set of editing tools.`,
  logo: svgLogo,
  description: $localize`The ProImageEditor is a versatile Flutter widget that enables seamless image editing within applications. 
  It offers a comprehensive suite of tools, including painting, text insertion, cropping, filtering, and more. <br/>
  The editor supports multi-threading through Dart isolates and web workers, ensuring efficient performance across platforms.<br/>
  With customizable UI elements, localization support, and various design themes, ProImageEditor provides developers with a 
  flexible and user-friendly solution for integrating image editing capabilities into their Flutter projects. 
    `,
  gitStats: {
    repoName: 'pro_image_editor',
  },
  images: [
    {
      path: 'assets/videos/projects/pro_image_editor/grounded-design.mp4',
      alt: `Grounded-Design`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/frosted-glass-design.mp4',
      alt: `Frosted-Glass-Design`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/whatsapp-design.mp4',
      alt: `Whatsapp-Design`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/ai-commands.mp4',
      alt: `AI-Commands`,
      ratio: '1 / 1.526',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/ai-remove-background.mp4',
      alt: `AI-Remove-Background`,
      ratio: '1 / 1.526',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/ai-replace-background.mp4',
      alt: `AI-Replace-Background`,
      ratio: '1 / 1.526',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/paint-editor.mp4',
      alt: `Paint-Editor`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/text-editor.mp4',
      alt: `Text-Editor`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/crop-rotate-editor.mp4',
      alt: `Crop-Rotate-Editor`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/filter-editor.mp4',
      alt: `Filter-Editor`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/emoji-editor.mp4',
      alt: `Emoji-Editor`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/pro_image_editor/sticker-editor.mp4',
      alt: `Sticker-Widget-Editor`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    },
    /* {
      path: 'assets/videos/projects/pro_image_editor/blur-editor.mp4',
      alt: `Blur-Editor`,
      ratio: '1 / 1.524',
      isVideo: true,
      backgroundColor: '#000000',
    }, */
  ],
  thumbnailPath: 'assets/img/projects/pro_image_editor/thumbnail/thumbnail',
  demoUrl: 'https://hm21.github.io/pro_image_editor',
  githubUrl: 'https://github.com/hm21/pro_image_editor',
  website: [
    {
      title: `pub.dev`,
      url: 'https://pub.dev/packages/pro_image_editor',
    },
    {
      title: $localize`Github-Page`,
      url: 'https://github.com/hm21/pro_image_editor',
    },
  ],
  install: 'flutter pub add pro_image_editor',
  technology: {
    highlight: ['Flutter', 'Dart', 'Kotlin', 'AI-Integration'],
    frontend: ['Flutter', 'Dart', 'Kotlin'],
    other: ['Github-Actions'],
  },
};
