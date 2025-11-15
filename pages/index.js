import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Hola Mundo - Next.js</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, Roboto, sans-serif'}}>
        <h1>Hola Mundo desde Next.js 🎉</h1>
      </main>
    </>
  )
}
