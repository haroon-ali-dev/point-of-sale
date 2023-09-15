# :shopping_cart: Point of Sale
Experience seamless point of sale management with a versatile website and mobile app. Effortlessly handle products, orders, and payments.

## :computer: Demo
https://github.com/haroon-ali-dev/point-of-sale/assets/87202358/b5401fa2-d532-49a7-bd10-d86338f01c27

## Tech Stack
HTML, CSS, JavaScript, React.js, Next.js, PostgreSQL, React Native, Stripe.

## Automated Tests
- Admin Panel
    - Unit tests with Jest.
    - Integration tests with Jest and Supertest.
    - End-to-End tests with Cypress.

## Features
- Register and login in admin panel.
- Create, view, update and delete products in admin panel.
- Login in mobile tablet app.
- Add and remove products from cart using product ID in mobile tablet app with automatic quantity calculation.
- Pay for order in mobile tablet app using debit card with Stripe.
- View orders in admin panel including order items.

## Utilization
- Admin panel fully responsive.
- Data fetching SSR in Next.js for products and orders in admin panel.
- Authentication with JWT.
- Stripe payments.
- Mobile tablet app for Android.

## Deployment
- Back end (Next.js) deployed to Vercel.
- Admin panel front end (Next.js) deployed to Vercel.
- PostgreSQL database deployed to Vercel.
- Mobile Tablet App deployed to Expo.

## Deployment Links
- Deployed Admin Panel: https://point-of-sale-tau.vercel.app/
- Deployed Mobile Tablet App: https://expo.dev/accounts/haroon-ali-dev/projects/point-of-sale/builds/690dea34-ecbd-4ded-8812-dca94c46d3f0

## How To Test Mobile Tablet App
**ANDROID ONLY**
- Make sure you have registered an account in admin panel and added at least one product.
- Visit Mobile Tablet App link.
- Click 'Install'.
- Scan QR code with your **android** tablet (will open link in tablet browser).
- Click 'Install' in tablet browser.
- Download APK file and install.
- Launch installed app.
- Login with account you registered with in admin panel.
