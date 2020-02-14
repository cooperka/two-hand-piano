import React from 'react';

import { api } from './src/constants';

// Docs: https://github.com/react-static/react-static/blob/master/docs/config.md
export default {
  siteRoot: api.SITE_ROOT,
  basePath: api.BASE_PATH,

  /* eslint-disable react/prop-types */
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />

        <title>Two-hand piano</title>

        {/* Favicon: https://realfavicongenerator.net/ */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link rel="manifest" href="site.webmanifest" />
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#444444" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="application-name" content="Two-hand piano" />
        <meta name="theme-color" content="#444444" />

        {/* Facebook Open Graph markup: https://developers.facebook.com/tools/debug/og/object/ */}
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${api.SITE_ROOT}${api.BASE_PATH}/images/fb-preview.png`}
        />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        {/* For MUI */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />

        {/* Google Analytics - Global site tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GKL6DDD6BV"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={getGoogleAnalyticsScript()}
        />
      </Head>

      <Body>
        <noscript>You need to enable JavaScript to run this app.</noscript>

        {children}
      </Body>
    </Html>
  ),
  /* eslint-enable */
};

function getGoogleAnalyticsScript() {
  return htmlify(`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-GKL6DDD6BV');
  `);
}

/** Returns an object that can be passed to `dangerouslySetInnerHTML`. */
function htmlify(html) {
  return {
    __html: html,
  };
}
