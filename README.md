# Underdog
Underdog is a multi-vendor e-commerce website project that focuses on equity and sustainability. Locally and minority owned businesses can register their business onto the website in order to promote themselves, and can list their products and services for users to directly purchase. Users can search the website with their own customised tags and categories in order to find the businesses, products, or services that align with their own personal values.

Client:  

```
cd Underdog\client\viteapp  
npm i  
npm run dev
```

Server:  

```
cd Underdog\server  
npm i  
npm start  
```

## Stripe

Underdog is currently using stripe's test mode so there is no actual payment information going through. This means you can test out creation of accounts and purchasing of products/services as much as you want.

## Onboarding
The onboarding process will ask for some identifying information, however this can mostly be fake test information. All the information that you input can be fake apart from the website link, this has to be a real website link such as a linkedin profile. You may also be asked to provide various sensitive information such as a passport/drivers license, however there is a test mode button that allows you to bypass this requirement.

## Payment
When it comes to payment you can enter a fake name and the following card information:  
Card number: 2424 2424 2424 2424  
Expiry date: 12/30  
CVV: 000  
Any other information can be made up e.g Email address: test@example.com
