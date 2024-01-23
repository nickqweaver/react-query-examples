"use client"
// import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "../../tailwind.css"
import { useState } from "react"
import { NextUIProvider } from "@nextui-org/react"

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  )
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        {props.children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextUIProvider>
  )
}
