## About

Amazon clone created with Nextjs and TailwindCss.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- [x] SSR with Nextjs
- [x] Authentication using NextAuth and Google Login
- [x] Stripe checkout
- [x] Firestore database to store orders
- [x] Redux Toolkit to manage basket

## Getting Started

First, run the npm install or yarn.

You will need to create a Google cloud project and add authorization for the project. Then add your public and private keys to the env file.

You will need to setup Firebase and Firestore. Creating a permissions.json file and a firebase.config file to connect the app.

You will need to create an account with Stripe and grab your api keys and put them in your env file.

Then start the server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
