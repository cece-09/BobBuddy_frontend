import { ToastState, ToastType } from "@/types/toast"
import { atom } from "recoil"

export const toastState = atom<ToastState<ToastType> | undefined>({
  key: "toastState",
  default: undefined,
})
