import {
  BookOpenIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CubeTransparentIcon,
  HomeIcon,
  PaintBrushIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Introduction', href: '/docs/introduction', icon: HomeIcon },
      { title: 'Installation', href: '/docs/installation', icon: CommandLineIcon },
    ],
  },
  {
    title: 'Core Concepts',
    links: [
      { title: 'Examples', href: '/docs/examples', icon: CodeBracketIcon },
      { title: 'Theming', href: '/docs/themes', icon: PaintBrushIcon },
    ],
  },
  {
    title: 'Reference',
    links: [
      { title: 'API Reference', href: '/docs/api', icon: BookOpenIcon },
    ],
  },
];
