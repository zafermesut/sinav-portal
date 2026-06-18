import { RootLayout } from '@payloadcms/next/layouts'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from '../../importMap'
import configPromise from '@payload-config'
import React from 'react'
import type { ServerFunctionClient } from 'payload'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) =>
  RootLayout({
    children,
    config: configPromise,
    importMap,
    serverFunction: handleServerFunctions as unknown as ServerFunctionClient,
  })

export default Layout
