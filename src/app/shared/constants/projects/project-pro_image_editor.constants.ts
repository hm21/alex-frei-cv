import svgLogo from 'src/assets/img/projects/pro_image_editor/pro_image_editor-logo.svg';
import { ProjectDetails } from '../../../features/portfolio/interfaces/portfolio.interfaces';

export const PROJECT_PRO_IMAGE_EDITOR: { type: string } & ProjectDetails = {
  type: $localize`Flutter open source`,
  title: 'pro_image_editor',
  subtitle: $localize`A Flutter widget designed for image editing on any device.`,
  logo: svgLogo,
  description: $localize`
    The ProImageEditor is a Flutter widget designed for image editing. It provides a flexible and convenient way to integrate image editing capabilities 
    into Flutter projects. The editor has a great hit detection ensuring that drawing actions are triggered only when the user actively hovers over the drawing area. 
    Furthermore, the editor is highly customizable, allowing for complete adaptation to specific project requirements, and it offers effortless translation capabilities, 
    simplifying the localization process.<br/>
    Of course, the editor also supports multi-threading, where it run in dart native as isolated task and in the web inside web workers.
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
  demoUrl: 'https://hm21.github.io/pro_image_editor',
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
    frontend: ['Flutter', 'Dart'],
    other: ['Github-Actions'],
  },
};
