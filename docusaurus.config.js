import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Awesome-Rubrics',
  tagline: 'A curated hub for rubric papers, tools, datasets, and surveys.',
  favicon: 'img/logo.svg',
  url: 'https://qiyandeng.github.io',
  baseUrl: '/Awesome-Rubrics/',
  organizationName: 'qiyandeng',
  projectName: 'Awesome-Rubrics',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/qiyandeng/Awesome-Rubrics/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      navbar: {
        title: 'Awesome-Rubrics',
        logo: {
          alt: 'Awesome-Rubrics logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Survey',
          },
          {
            href: 'https://github.com/qiyandeng/Awesome-Rubrics',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Introduction', to: '/docs/intro'},
              {label: 'Awesome List', to: '/docs/awesome-list'},
              {label: 'Contributing', to: '/docs/contributing'},
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'Repository',
                href: 'https://github.com/qiyandeng/Awesome-Rubrics',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Awesome-Rubrics.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
