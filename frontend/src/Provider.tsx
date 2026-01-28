import { HeroUIProvider, ToastProvider } from '@heroui/react'
import type { ReactNode } from 'react'

interface ProviderProps {
  children: ReactNode
}

export function Provider({ children }: ProviderProps) {
  return (
    <HeroUIProvider>
      {children}
      <ToastProvider
        placement="top-right"
        toastProps={{
          hideCloseButton: false,
          shouldShowTimeoutProgress: true,
        }}
        regionProps={{
          classNames: {
            base: 'z-[9999]',
          },
        }}
      />
    </HeroUIProvider>
  )
}
