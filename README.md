# nestjs-azure-ad-auth

## Azure Ad Auth setup

1. Login to https://portal.azure.com/#home
2. Create a new app registration ![azure-ad-setup-1.png](./azure-ad-setup-1.png) ![azure-ad-setup-2.png](./azure-ad-setup-2.png)
3. Note down the "Application (client) ID" and "Directory (tenant) ID" values. ![azure-ad-setup-3.png](./azure-ad-setup-3.png)
4. Under the "Authentication" section, add a new platform of type "Web" and set the redirect URI to http://localhost:3000/auth/callback. ![azure-ad-setup-4.png](./azure-ad-setup-4.png)
5. Under the "Certificates & secrets" section, add a new client secret and note down the value. ![azure-ad-setup-5.png](./azure-ad-setup-5.png) 

## Run
1. Go to the backend [auth.strategy](./back/src/auth.strategy.ts) and set
```
identityMetadata: 'https://login.microsoftonline.com/[tenantID]/.well-known/openid-configuration',
clientID: 'c0a3815e...9bba',
tenantID: 'f8cdef31...255a',
clientSecret: '8a076e41...ca57',
```
2. Go to the frontend [auth.js](./front/src/config/auth.js) and set
```
const clientId = 'c0a3815...9bba';
const tenantId = 'f8cdef3...255a';
```
3. Run back
```
cd ./back
npm i
npm run start
```
4. Run front
```
cd ./front
npm i
npm run start
```
5. Open http://localhost:8080/ in browser 
