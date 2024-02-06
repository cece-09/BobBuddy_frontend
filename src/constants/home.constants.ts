import { BottomNavbarItem } from "@/types/common.types"

const BottomNavbarItemList: BottomNavbarItem[] = [
  { icon: "home_rounded", text: "랜덤매칭", link: "/home" },
  { icon: "graphic_eq_rounded", text: "매칭방", link: "/match" },
  { icon: "person_rounded", text: "프로필", link: "/profile" },
  { icon: "settings_rounded", text: "설정", link: "/setting" },
]

export default BottomNavbarItemList
