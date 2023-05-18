# Immismart UI (NextJs, Auth0, SSR + Caching included)

This example shows how you can use `@auth0/nextjs-auth` to easily add authentication support to your Next.js application. It tries to cover a few topics:

- Signing in
- Signing out
- Loading the user on the server side and adding it as part of SSR ([`pages/advanced/ssr-profile.js`](pages/advanced/ssr-profile.js))
- Loading the user on the client side and using fast/cached SSR pages ([`pages/index.js`](pages/index.js))
- API Routes which can load the current user ([`pages/api/me.js`](pages/api/me.js))
- Using hooks to make the user available throughout the application ([`lib/user.js`](lib/user.js))

Read more: [https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
  cd immismart-ui
  npm install
  npx husky install
  npm run dev
```

## Configuring Auth0

1. Go to the [Auth0 dashboard](https://manage.auth0.com/) and create a new application of type _Regular Web Applications_ and make sure to configure the following
2. Go to the settings page of the application
3. Configure the following settings:

- _Allowed Callback URLs_: Should be set to `http://localhost:3000/api/callback` when testing locally or typically to `https://myapp.com/api/callback` when deploying your application.
- _Allowed Logout URLs_: Should be set to `http://localhost:3000/` when testing locally or typically to `https://myapp.com/` when deploying your application.

4. Save the settings

### Set up environment variables

To connect the app with Auth0, you'll need to add the settings from your Auth0 application as environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then, open `.env.local` and add the missing environment variables:

- `NEXT_PUBLIC_AUTH0_DOMAIN` - Can be found in the Auth0 dashboard under `settings`. (Should be prefixed with `https://`)
- `NEXT_PUBLIC_AUTH0_CLIENT_ID` - Can be found in the Auth0 dashboard under `settings`.
- `AUTH0_CLIENT_SECRET` - Can be found in the Auth0 dashboard under `settings`.
- `NEXT_PUBLIC_BASE_URL` - The base url of the application.
- `NEXT_PUBLIC_REDIRECT_URI` - The relative url path where Auth0 redirects back to.
- `NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI` - Where to redirect after logging out.
- `SESSION_COOKIE_SECRET` - A unique secret used to encrypt the cookies, has to be at least 32 characters. You can use [this generator](https://generate-secret.vercel.app/32) to generate a value.
- `SESSION_COOKIE_LIFETIME` - How long a session lasts in seconds. The default is 2 hours.

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

## Setting up your environment to reap max benefits

To make eslint errors visible in VSCode, you need to install the ESLint plugin[https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint].

I also recommend you tell VSCode to auto-fix eslint errors on save. To do so, create a .vscode/settings.json file with the following content:

// .vscode/settings.json

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

Now let's configure VSCode to actually format our code on save according to our prettier configuration file. To do so, install VSCode's prettier plugin[https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode].

Then, you can tell VSCode to format the code on save, by editing our .vscode/settings.json file:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // Add those two lines:
  "editor.formatOnSave": true, // Tell VSCode to format files on save
  "editor.defaultFormatter": "esbenp.prettier-vscode" // Tell VSCode to use Prettier as default file formatter
}
```

While the above isn't necessary, it's nice to have so you don't wind up with a large commit and 50 lint errors before you can push. We will enforce code style, formatting, spellchecking, etc with Husky[https://typicode.github.io/husky/#/]

# Use this tool to see what next will be returning to the client

(Next Code Elimination Tool)[https://next-code-elimination.vercel.app/]

# SERVER COMPONENT VS CLIENT COMPONENT

React Server Components allow you to natively render HTML from a React component on the server. It uses HTTP streaming to progressively render a web page on the server. With React Server Components, you can stream HTML from an edge function immediately and progressively show updates as your data comes in.

Also, we can fetch data directly inside a React Server Component without using getStaticProps or getServerSideProps. And when React Server Components are rendered, they require zero client-side JavaScript. This results in fewer kilobytes for the end user to download and faster page rendering.

In Next 12, you can opt in to this experiential feature by configuring your next.config.js file:

```json
{
  "experimental": {
    "concurrentFeatures": true,
    "serverComponents": true
  }
}
```

To create a React Server Component in Next, we simply append .sever.js to a component’s filename. Also, to create a client component, we append .client.js to the component’s filename.

## Bot-aware ISR fallback -

This is important to understand what this is and why it's crucial to our entire architecture

# Incremental Static Regeneration[https://vercel.com/docs/concepts/next.js/incremental-static-regeneration]

or ISR, enables us to incrementally update static pages after we have built our site without needing to rebuild the whole site. With ISR, static pages are generated dynamically at runtime instead of build time.

When using ISR, Next.js determines the pages to be generated by static site generation using the paths returned from the getStaticPath function. So if we return the paths to the 1,000 most viewed articles, these pages are generated at build time.

The other pages in our application can be generated on demand by using fallback:blocking or fallback:true.

fallback:blocking is preferred because when a request is made to a page that has not been generated, Next will server-render that page the first time and serve subsequent requests from the cache.

But when using fallback:true, Next.js will immediately serve a static page on the first request with a loading state. And when the data finishes loading, Next will re-render the page and cache the data.

However, with the Bot-Aware ISR fallback feature, Next.js will automatically server-render ISR pages when using fallback: true for web crawlers such as search bots. But Next will still serve a static page with a loading state to noncrawler user agents. Thus, this prevents crawlers from indexing loading states.

# Going to Production

Before we take our Next.js application to production, it is _imperative_ that we follow these guidelines in order to provide the best user experience. These aren't just reccomendations. These are gospel.

## In General

- Use caching wherever possible.
- Ensure your database and backend are deployed in the same region.
- Aim to ship the least amount of JavaScript possible.
- Defer loading heavy JavaScript bundles until needed.
- Ensure logging is set up.
- Ensure error handling is set up.
- Configure the 404 (Not Found) and 500 (Error) pages.
- Ensure you are measuring performance.
- Run Lighthouse[https://developers.google.com/web/tools/lighthouse] to check for performance, best practices, accessibility, and SEO.
- For best results, use a production build of
  Next.js and use incognito in your browser so results aren't affected by extensions.
- (Review Supported Browsers and Features)[https://nextjs.org/docs/basic-features/supported-browsers-features].
- Improve performance using:
  - (next/image and Automatic Image Optimization)[https://nextjs.org/docs/basic-features/image-optimization]
  - (Automatic Font Optimization)[https://nextjs.org/docs/basic-features/font-optimization]
  - (Script Optimization)[https://nextjs.org/docs/basic-features/script]
- Improve (loading performance)[https://nextjs.org/docs/going-to-production#loading-performance]

# Caching

Caching improves response times and reduces the number of requests to external services. Next.js automatically adds caching headers to immutable assets served from `/\_next/static` including JavaScript, CSS, static images, and other media.

`Cache-Control: public, max-age=31536000, immutable`

`Cache-Control` headers set in `next.config.js` will be overwritten in production to ensure that static assets can be cached effectively. If you need to revalidate the cache of a page that has been statically generated, you can do so by setting revalidate in the page's `getStaticProps` function. If you're using `next/image`, there are also (specific caching rules)[https://nextjs.org/docs/basic-features/image-optimization#caching] for the default Image Optimization loader.

_Note_: When running your application locally with next dev, your headers are overwritten to prevent caching locally.

`Cache-Control: no-cache, no-store, max-age=0, must-revalidate`

You can also use caching headers inside `getServerSideProps` and API Routes for dynamic responses. For example, using `stale-while-revalidate`[https://web.dev/stale-while-revalidate/].

```js
// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: {},
  };
}
```

By default, `Cache-Control` headers will be set differently depending on how your page fetches data.

    If the page uses `getServerSideProps` or `getInitialProps`, it will use the default `Cache-Control` header set by next start in order to prevent accidental caching of responses that cannot be cached. If you want a different cache behavior while using `getServerSideProps`, use `res.setHeader('Cache-Control', 'value_you_prefer')` inside of the function as shown above.
    If the page is using getStaticProps, it will have a `Cache-Control` header of `s-maxage=REVALIDATE_SECONDS`, `stale-while-revalidate`, or if revalidate is not used , `s-maxage=31536000`, `stale-while-revalidate` to cache for the maximum age possible.

    Note: Your deployment provider must support caching for dynamic responses. If you are self-hosting, you will need to add this logic yourself using a key/value store like Redis. If you are using Vercel, Edge Caching works without configuration.

# Reducing JavaScript Size

To reduce the amount of JavaScript sent to the browser, you can use the following tools to understand what is included inside each JavaScript bundle:

    - Import Cost[https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost] – Display the size of the imported package
      inside VSCode.
    - Package Phobia[https://packagephobia.com/] – Find the cost of adding a new dev dependency to your project.
    - Bundle Phobia[https://bundlephobia.com/] - Analyze how much a dependency can increase bundle sizes.
    - Webpack Bundle Analyzer[https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer] – Visualize size of webpack output files with an interactive, zoomable treemap.

Each file inside your pages/ directory will automatically be code split into its own JavaScript bundle during next build. We WILL be using Dynamic Imports[https://nextjs.org/docs/advanced-features/dynamic-import] to lazy-load components and libraries. For example, you might want to defer loading your modal code until a user clicks the open button.

# Refetching Data Strategy

Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.

To use ISR, add the `revalidate` prop to `getStaticProps`:

```js
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export default Blog;
```

When a request is made to a page that was pre-rendered at build time, it will initially show the cached page.

- Any requests to the page after the initial request and before 10 seconds are also cached and instantaneous.
- After the 10-second window, the next request will still show the cached (stale) page
- Next.js triggers a regeneration of the page in the background.
- Once the page generates successfully, Next.js will invalidate the cache and show the updated page. If the background regeneration
  fails, the old page would still be unaltered.

When a request is made to a path that hasn’t been generated, Next.js will server-render the page on the first request. Future requests will serve the static file from the cache. ISR on Vercel persists the cache globally and handles rollbacks. (We will have to handle this ourselves in aws unfortunately but Vercel is not worth the cost)

# On-demand Revalidation (Beta)

If you set a revalidate time of 60, all visitors will see the same generated version of your site for one minute. The only way to invalidate the cache is from someone visiting that page after the minute has passed.

Starting with v12.1.0, Next.js supports on-demand Incremental Static Regeneration to manually purge the Next.js cache for a specific page. This makes it easier to update your site when:

- Content from your headless CMS is created or updated
- Ecommerce metadata changes (price, description, category, reviews, etc.)

Inside `getStaticProps`, you do not need to specify revalidate to use on-demand revalidation. If revalidate is omitted, Next.js will use the default value of false (no revalidation) and only `revalidate` the page on-demand when `unstable_revalidate` is called.

# Using On-Demand Revalidation

First, create a secret token only known by your Next.js app. This secret will be used to prevent unauthorized access to the revalidation API Route. You can access the route (either manually or with a webhook) with the following URL structure:

`https://<your-site.com>/api/revalidate?secret=<token>`

Next, add the secret as an Environment Variable to your application. Finally, create the revalidation API Route:

```js
// pages/api/revalidate.js

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.unstable_revalidate('/path-to-revalidate');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
```

(Check out this Demo)[https://on-demand-isr.vercel.app/] see on-demand revalidation in action and provide feedback.

# Testing on-demand ISR during development

When running locally with next dev, getStaticProps is invoked on every request. To verify your on-demand ISR configuration is correct, you will need to create a production build and start the production server:

```bash
  $ next build
  $ next start
```

Then, you can confirm that static pages have successfully revalidated.

# Error handling and revalidation

If there is an error inside getStaticProps when handling background regeneration, or you manually throw an error, the last successfully generated page will continue to show. On the next subsequent request, Next.js will retry calling getStaticProps.

```js
export async function getStaticProps() {
  // If this request throws an uncaught error, Next.js will
  // not invalidate the currently shown page and
  // retry getStaticProps on the next request.
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  if (!res.ok) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }

  // If the request was successful, return the posts
  // and revalidate every 10 seconds.
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
```

# Self-hosting ISR

Incremental Static Regeneration (ISR) works on self-hosted Next.js sites out of the box when you use `next start`.

You can use this approach when deploying to container orchestrators such as Kubernetes[https://kubernetes.io/] or HashiCorp Nomad[https://www.nomadproject.io/]. By default, generated assets will be stored in-memory on each pod. This means that each pod will have its own copy of the static files. Stale data may be shown until that specific pod is hit by a request.

To ensure consistency across all pods, you can disable in-memory caching. This will inform the Next.js server to only leverage assets generated by ISR in the file system.

You can use a shared network mount in your Kubernetes pods (or similar setup) to reuse the same file-system cache between different containers. By sharing the same mount, the `.next` folder which contains the next/image cache will also be shared and re-used.

To disable in-memory caching, set `isrMemoryCacheSize to 0` in your `next.config.js` file:

```js
module.exports = {
  experimental: {
    // Defaults to 50MB
    isrMemoryCacheSize: 0,
  },
};
```

    Note: You might need to consider a race condition between multiple pods trying to update the cache at the same time, depending on how your shared mount is configured.

# (Dynamic Routing)[https://nextjs.org/docs/basic-features/data-fetching/get-static-paths]

# (API Routes)[https://nextjs.org/docs/basic-features/typescript#api-routes]

# (Serverless Architecture in AWS using S3, Lambda, Cloudfront)[https://github.com/serverless-nextjs/serverless-next.js/#architecture]
