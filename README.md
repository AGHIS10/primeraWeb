# PrimeraWeb — Hola Mundo con Next.js

Proyecto Next.js mínimo que muestra un "Hola Mundo". Pensado para desplegar en Vercel.

Instrucciones rápidas:

- Instalar dependencias

```bash
cd /Users/agustinaguilera/Desarrollo/web/primeraWeb
npm install
```

- Iniciar servidor de desarrollo

```bash
npm run dev
# luego abrir http://localhost:3000
```

- Desplegar en Vercel

Opción A (rápida, vía web):

- Conectar tu repositorio GitHub en https://vercel.com/import
- Seleccionar el repositorio y desplegar (Vercel detecta Next.js automáticamente).

Opción B (CLI):

```bash
# instalar la CLI si no la tienes
npm i -g vercel
cd /Users/agustinaguilera/Desarrollo/web/primeraWeb
vercel
```

Vercel detectará que es un proyecto Next.js y usará los comandos `build` y `start`.
