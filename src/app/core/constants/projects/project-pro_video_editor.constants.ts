import { ProjectDetails } from 'src/app/features/portfolio/types/project.type';
import svgLogo from 'src/assets/img/projects/pro_image_editor/pro_image_editor-logo.svg';

export const PROJECT_PRO_VIDEO_EDITOR: { type: string } & ProjectDetails = {
  id: 'proVideoEditor',
  type: $localize`Flutter open source`,
  title: 'pro_video_editor',
  subtitle: $localize`A native-code Flutter video editor with trimming, cropping, and effects across platforms.`,
  logo: svgLogo,
  description: $localize`ProVideoEditor is a native-code Flutter plugin for advanced video editing across all major platforms. 
   It offers features like trimming, cropping, scaling, rotation, flipping, and adding visual effects or overlays, all implemented
   using platform-native APIs for maximum performance and compatibility.<br/>
   Unlike FFmpeg-based solutions, this editor is optimized for real-time responsiveness and supports concurrent processing, 
   making it ideal for demanding video editing tasks in mobile and desktop applications.
    `,
  gitStats: {
    repoName: 'pro_video_editor',
  },
  images: [
    {
      path: 'assets/img/projects/pro_video_editor/Grounded-Editor/Grounded-Editor',
      alt: ``,
      ratio: '1 / 1.8986',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/pro_video_editor/Paint-Editor-Grounded/Paint-Editor-Grounded',
      alt: ``,
      ratio: '1 / 1.8986',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/pro_video_editor/Crop-Rotate-Editor/Crop-Rotate-Editor',
      alt: ``,
      ratio: '1 / 1.8986',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/pro_video_editor/Tune-Editor/Tune-Editor',
      alt: ``,
      ratio: '1 / 1.8986',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/pro_video_editor/Filter-Editor/Filter-Editor',
      alt: ``,
      ratio: '1 / 1.8986',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/pro_video_editor/Emoji-Editor/Emoji-Editor',
      alt: ``,
      ratio: '1 / 1.8986',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/pro_video_editor/Main-Editor/Main-Editor',
      alt: ``,
      ratio: '1 / 1.8986',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/pro_video_editor/Paint-Editor/Paint-Editor',
      alt: ``,
      ratio: '1 / 1.8986',
      backgroundColor: '#000000',
    },
  ],
  thumbnailPath: 'assets/img/projects/pro_video_editor/thumbnail/thumbnail',
  githubUrl: 'https://github.com/hm21/pro_video_editor',
  website: [
    {
      title: `pub.dev`,
      url: 'https://pub.dev/packages/pro_video_editor',
    },
    {
      title: $localize`Github-Page`,
      url: 'https://github.com/hm21/pro_video_editor',
    },
  ],
  install: 'flutter pub add pro_video_editor',
  technology: {
    highlight: ['Flutter', 'Swift', 'Kotlin', 'C++'],
    frontend: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'C++'],
    other: ['Github-Actions'],
  },
};
