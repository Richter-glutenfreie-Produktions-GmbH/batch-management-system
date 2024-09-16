<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a> ·
  <a href="#more-supabase-examples"><strong>More Examples</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>

## Features

-   Works across the entire [Next.js](https://nextjs.org) stack
    -   App Router
    -   Pages Router
    -   Middleware
    -   Client
    -   Server
    -   It just works!
-   supabase-ssr. A package to configure Supabase Auth to use cookies
-   Styling with [Tailwind CSS](https://tailwindcss.com)
-   Components with [shadcn/ui](https://ui.shadcn.com/)
-   Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
    -   Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Then you'll need a Doppler project to manage your secrets ([doppler.com](https://www.doppler.com/)).

3. Create a Next.js app using the Supabase Starter template npx command

    ```bash
    pnpm dlx create-next-app -e with-supabase
    ```

4. Use `cd` to change into the app's directory

    ```bash
    cd name-of-new-app
    ```

5. Delete `.env.local.example`. We'll use Doppler to inject the secrets for use.

6. Install and setup [Doppler CLI](https://docs.doppler.com/docs/install-cli).

7. You can now run the Next.js local development server:

    ```bash
    doppler run -- pnpm dev
    ```

    The starter kit should now be running on [localhost:3000](http://localhost:3000/). Secrets get injected by Doppler.

8. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

-   [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
-   [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
-   [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)

## License

Licensed under the GNU General Public License v3.0, Copyright © trueberryless.

See [LICENSE](https://github.com/trueberryless-org/mutanuq/blob/main/LICENSE) for more information.
