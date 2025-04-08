// components/ui/use-toast.ts

import { toast as hotToast } from "sonner"

export function useToast() {
  return {
    toast: (props: { title: string; description?: string }) => {
      hotToast(props.title, { description: props.description })
    },
  }
}
