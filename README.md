This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started with Zach's Submission

Please install all necessary packages first

```bash
npm install
```

Next add a .env.local file with your Github secret that allows you to make network calls locally.


If you need help creating the Github token, [see this document ](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). If you are having issues, please also see [this NextJS documentation](https://nextjs.org/docs/basic-features/environment-variables) on local envs. Of course, you are always welcome to reach out to me directly if you are having any issues (Leigh can connect you with me.).

Second, run the development server:

```bash
npm run dev
# or
yarn
 dev
```

Things I would have added in or done differently:

* Used REST API instead of GraphQL
* Made UI sharper by changing title to a logo and converting result list into cards with descriptions of repos
* Added toggle to allow user to switch between searching for orgs and individual accounts 
* Deployed to AWS using Serverless
* Added SSO using NextAuth
* Added autocomplete feature ,so that user sees potential list of searches that they could make
* Added end-to-end testing using Cypress (this would allow me to simulate user clicks and unit testing)
* Change current pagination feature to used numbered pages (requires more logic with Github GraphQL calls)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
