import { atom } from "recoil"

const chatLoadingState = atom({
  key: "chatLoadingState",
  default: false,
})

export default chatLoadingState
