"use client"
import { RecoilRoot } from "recoil";
import SigninPage from "./login/page";

export default function MainPage() {
  return (
    <RecoilRoot>
      <SigninPage />
    </RecoilRoot>
  )
}
