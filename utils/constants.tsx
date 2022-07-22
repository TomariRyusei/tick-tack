import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy, GiLipstick, GiDeadWood } from "react-icons/gi";
import { FaPaw, FaMedal, FaGamepad } from "react-icons/fa";

export const topics = [
  {
    name: "coding",
    value: "プログラミング",
    icon: <BsCode />,
  },
  {
    name: "comedy",
    value: "お笑い",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "gaming",
    value: "ゲーム",
    icon: <FaGamepad />,
  },
  {
    name: "food",
    value: "スイーツ",
    icon: <GiCakeSlice />,
  },
  {
    name: "dance",
    value: "ダンス",
    icon: <GiGalaxy />,
  },
  {
    name: "beauty",
    value: "美容",
    icon: <GiLipstick />,
  },
  {
    name: "animals",
    value: "動物",
    icon: <FaPaw />,
  },
  {
    name: "nature",
    value: "自然",
    icon: <GiDeadWood />,
  },
  {
    name: "sports",
    value: "スポーツ",
    icon: <FaMedal />,
  },
];

export const footerList1 = ["About", "Store", "Contact"];
export const footerList2 = ["Advertise", "Developers"];
export const footerList3 = [
  "Help",
  "Privacy",
  "Creator Portal",
  "Community Guidelines",
];
