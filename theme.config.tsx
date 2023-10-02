import Image from "next/image";
import { useRouter } from "next/router";
import { DocsThemeConfig } from "nextra-theme-docs";

const rootUrl = "https://tiken.vercel.app";

const config: DocsThemeConfig = {
  primaryHue: 5,
  primarySaturation: 85,
  logo: (
    <>
      <Image src="/logo.svg" width={32} height={32} alt="logo" />
      <span style={{ marginLeft: ".4em", fontWeight: 800 }}>UniNote</span>
    </>
  ),
  project: {
    link: "https://github.com/unishigure/tiken",
  },
  chat: {
    link: "https://misskey.io/clips/9gzvpkm352",
    icon: (
      <svg width="32" height="32" viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M454.821,253.582L273.256,435.14c-11.697,11.697-25.124,20.411-39.484,26.235 c-21.529,8.729-45.165,10.928-67.755,6.55c-22.597-4.378-44.054-15.25-61.597-32.784c-11.69-11.69-20.396-25.118-26.227-39.484 c-8.729-21.529-10.929-45.165-6.55-67.748c4.386-22.597,15.25-44.055,32.778-61.596l203.13-203.13 c7.141-7.134,15.299-12.43,24.035-15.969c13.1-5.318,27.516-6.656,41.263-3.994c13.769,2.677,26.798,9.27,37.498,19.963 c7.133,7.134,12.423,15.292,15.968,24.035c5.318,13.092,6.657,27.502,3.987,41.264c-2.67,13.762-9.262,26.783-19.955,37.498 L213.261,363.064c-2.534,2.528-5.375,4.364-8.436,5.61c-4.571,1.851-9.661,2.335-14.495,1.396 c-4.848-0.954-9.355-3.225-13.15-7.006c-2.534-2.534-4.364-5.368-5.603-8.429c-1.865-4.571-2.342-9.668-1.402-14.495 c0.947-4.841,3.225-9.355,7.005-13.149l175.521-175.528l-29.616-29.617l-175.528,175.52c-6.536,6.536-11.505,14.182-14.801,22.313 c-4.941,12.195-6.166,25.473-3.702,38.202c2.449,12.73,8.686,24.989,18.503,34.799c6.543,6.55,14.182,11.519,22.305,14.809 c12.202,4.948,25.473,6.165,38.21,3.702c12.722-2.449,24.989-8.678,34.806-18.511L439.97,195.602 c11.142-11.149,19.571-24.113,25.167-37.917c8.394-20.717,10.48-43.314,6.294-64.971c-4.179-21.643-14.73-42.432-31.46-59.155 c-11.149-11.142-24.114-19.571-37.918-25.166c-20.717-8.401-43.314-10.48-64.971-6.301c-21.643,4.186-42.431,14.737-59.155,31.468 L74.803,236.695c-15.713,15.691-27.552,33.931-35.426,53.352c-11.817,29.154-14.765,60.97-8.863,91.462 c5.888,30.478,20.717,59.696,44.29,83.254c15.698,15.713,33.931,27.552,53.36,35.426c29.146,11.811,60.97,14.758,91.455,8.863 c30.478-5.895,59.696-20.717,83.254-44.29l181.566-181.564L454.821,253.582z"
        />
      </svg>
    ),
  },
  docsRepositoryBase: "https://github.com/unishigure/tiken",
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    toggleButton: true,
    defaultMenuCollapseLevel: 1
  },
  editLink: { text: null },
  toc: {
    backToTop: true,
  },
  navigation: false,
  gitTimestamp: function GitTimestamp({ timestamp }) {
    return (
      <>
        Last updated on{" "}
        <time dateTime={timestamp.toISOString()}>
          {timestamp.toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </time>
      </>
    );
  },
  footer: {
    text: <p> © {new Date().getFullYear()} unishigured </p>,
  },
  useNextSeoProps() {
    const { asPath, defaultLocale, locale } = useRouter();

    const url =
      rootUrl + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    let titleTemplate = "";
    if (asPath !== "/") {
      titleTemplate = "%s - UniNote";
    } else {
      titleTemplate = "UniNote";
    }

    return {
      titleTemplate: titleTemplate,
      description: "Tiken note :)",
      openGraph: {
        url: url,
        description: "Tiken note ;)",
        images: [
          {
            url: rootUrl + "/logo.png",
            width: 750,
            height: 750,
            alt: "logo",
            type: "image/png",
          },
        ],
        type: "blog",
        locale: "ja_JP",
      },
      twitter: {
        cardType: "summary_large_image",
      },
    };
  },
  head: () => {
    return (
      <>
        <link rel="icon" href="/logo.svg" />
        <meta property="twitter:description" content="Tiken note :o"></meta>
        <meta property="twitter:image" content={rootUrl + "/image.png"} />
        <meta charSet="utf-8" />
      </>
    );
  },
};

export default config;
