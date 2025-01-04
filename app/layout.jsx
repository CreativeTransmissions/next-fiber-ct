import { Layout } from '@/components/dom/Layout'
import NavBar from '@/components/navigation/NavBar.jsx';
import { roboto } from './fonts'

import '@/global.css'
import '@/globals.css'

export const metadata = {
  title: 'Creative Transmissions',
  description: 'Full Stack Development Services. 3D, Web, VR, and Blockchain.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <meta charSet="utf-8" />
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Layout><NavBar />{children}</Layout>
      </body>
    </html>
  )
}
