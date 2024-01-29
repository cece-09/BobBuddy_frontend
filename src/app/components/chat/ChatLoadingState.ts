import { atom } from "recoil"

const chatLoadingState = atom<boolean>({
  key: "chatLoadingState",
  default: false,
})

export default chatLoadingState
