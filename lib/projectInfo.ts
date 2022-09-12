export interface ProjectInfo {
  title: string;
  tags?: string[];
  slug: string;
}

export function getProjectInfo(meta: any): ProjectInfo {
  return {
    slug: meta.slug,
    title: meta.title,
    tags: meta.tags && meta.tags.split(","),
  };
}

export interface ProjectStyle {
  light: string;
  dark: string;
  darkest: string;
  isDarkColorScheme: boolean;
  getTextColor: () => string;
  getBgColor: () => string;
}

export function getProjectStyle(meta: any): ProjectStyle {
  const isDarkColorScheme = meta.colorScheme === "dark";
  return {
    light: meta.colorLight,
    dark: meta.colorDark,
    darkest: meta.colorDarkest,
    isDarkColorScheme: isDarkColorScheme,
    getTextColor: () => (isDarkColorScheme ? meta.colorLight : meta.colorDark),
    getBgColor: () => (isDarkColorScheme ? meta.colorDark : meta.colorLight),
  };
}

export function getProjectCover(slug: string) {
  return `/project-assets/${slug}/${slug}-cover.jpg`;
}

export function getProjectLogo(slug: string) {
  return `/project-assets/${slug}/${slug}-logo.png`;
}
