import { imageEditorLogo } from '../logos';
import { ProjectDetails } from '../portfolio-interfaces';

export const PROJECT_PRO_IMAGE_EDITOR: { type: string } & ProjectDetails = {
  type: $localize`Flutter open source`,
  title: 'pro_image_editor',
  subtitle: $localize`A Flutter widget designed for image editing on any device.`,
  logo: imageEditorLogo,
  description: $localize`
    The ProImageEditor is a Flutter widget designed for image editing. It provides a flexible and convenient way to integrate image editing capabilities 
    into Flutter projects. The editor has a great hit detection ensuring that drawing actions are triggered only when the user actively hovers over the drawing area. 
    Furthermore, the editor is highly customizable, allowing for complete adaptation to specific project requirements, and it offers effortless translation capabilities, 
    simplifying the localization process.<br/>
    Of course, the editor also supports multi-threading, where it run in dart native as isolated task and in the web inside web workers.
    `,
  images: [
    {
      path: 'assets/img/pro_image_editor/grounded-design',
      alt: `Grounded-Design`,
      ratio: '1 / 1.524',
      isGif: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/pro_image_editor/frosted-glass-design',
      alt: `Frosted-Glass-Design`,
      ratio: '1 / 1.524',
      isGif: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/pro_image_editor/whatsapp-design',
      alt: `Whatsapp-Design`,
      ratio: '1 / 1.524',
      isGif: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/pro_image_editor/paint-editor',
      alt: `Paint-Editor`,
      ratio: '1 / 1.524',
      isGif: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/pro_image_editor/text-editor',
      alt: `Text-Editor`,
      ratio: '1 / 1.524',
      isGif: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/pro_image_editor/crop-rotate-editor',
      alt: `Crop-Rotate-Editor`,
      ratio: '1 / 1.524',
      isGif: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/pro_image_editor/filter-editor',
      alt: `Filter-Editor`,
      ratio: '1 / 1.524',
      isGif: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/pro_image_editor/emoji-editor',
      alt: `Emoji-Editor`,
      ratio: '1 / 1.524',
      isGif: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/pro_image_editor/sticker-editor',
      alt: `Sticker-Widget-Editor`,
      ratio: '1 / 1.524',
      isGif: true,
      backgroundColor: '#000000',
    },
    /* {
      path: 'assets/img/pro_image_editor/blur-editor',
      alt: `Blur-Editor`,
      ratio: '1 / 1.524',
      isGif: true,
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
    frontend: [
      {
        name: 'Flutter',
      },
      {
        name: 'Dart',
      },
    ],
    other: [
      {
        name: 'Github-Actions',
      },
    ],
  },
};
