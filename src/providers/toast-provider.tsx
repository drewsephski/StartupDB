'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function ToastProvider() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-gray-800 group-[.toaster]:text-gray-50 group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-gray-300',
          actionButton: 'group-[.toast]:bg-blue-500 group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-gray-500 group-[.toast]:text-white',
        },
      }}
    />
  );
}
