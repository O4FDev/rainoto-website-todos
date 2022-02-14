# [Rainoto](https://rainoto.com/)

Rainoto is a todo app for children. It encoourages children to complete tasks on time by providing cute pets with unique traits upon completion. 

## Appendix
- [Rainoto](#rainoto)
  - [Appendix](#appendix)
  - [Technology Overview](#technology-overview)
  - [Deployment](#deployment)
  - [What I have learnt](#what-i-have-learnt)
  - [Charity Notice](#charity-notice)

## Technology Overview

For this project I used NextJS, TailwindCSS, RestAPIs, Git, Clerk (Authentication), MongoDB, ExpressJS, and Amazon Web Services, and Vercel. 

I opted for NextJS over ReactJS due to its easier developer, deployment, and integration experiences. 

## Deployment

You will need to sign up for the following services:
- Clerk
- *Vercel*
- *Amazon Web Services*

If you wish to clone our backend at https://github.com/O4FDev/rainoto-mongodb you should also sign up for MongoDB to save time later.


Firstly, you should clone the repo and install the dependencies using the command `cd rainoto-website-todos && npm install` you should then create a .env.local file using `touch .env.local` or by creating the file in the root of rainoto-website-todos

Place your frontend key for clerk using the following example for direction: `NEXT_PUBLIC_CLERK_FRONTEND_API=key`

Once you get to this step you will be able to run the repo locally using `npm run dev`.

Deploying through Vercel will allow you to host it and deploy Clerk to production. 

## What I have learnt

This project was created in a day and night, giving myself more time to go back I would have focused more strongly on: securing the backend to ensure it is ready for production, accessibility, and user experience. 

Developing this project has given me experience with deploying to AWS and Vercel, as well as interacting with many different SDKs. 

I'm currently working on updating the application to get it into a production ready state by adding comments, better backend authentication, vercel deployment checklist, and improved accessibility. 

## Charity Notice

As a quick sidenote, I heavily rely on visual representations of Koala Bears. In 2022 due to droughts and wildfires in Australia many of our favourite animals are now endangered [please consider donating to the charity in this link to help.]("https://www.ifaw.org/uk")