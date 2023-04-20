import { defineStore } from "pinia";

// 文字
export type Strings = {
    topnav_list: string,
    topnav_chart: string,
    topnav_setting: string,
}

// 状態
type State = {
    strings: Strings
};

// 日本語
const strings_jp: Strings = {
    topnav_list: "家計簿",
    topnav_chart: "状況",
    topnav_setting: "設定",
}

// 英語
const strings_en_us: Strings = {
    topnav_list: "List",
    topnav_chart: "Chart",
    topnav_setting: "Setting",
}

export const useStringsStore = defineStore({
    id: "strings",
    state: (): State => {
        return {
            strings: {
                topnav_list: "",
                topnav_chart: "",
                topnav_setting: ""
            }
        }
    },
    actions: {
        // 言語を設定
        setLocal(locale: string): void {
            this.strings = 
                locale === "ja" ? strings_jp :
                locale === "en-US" ? strings_en_us :
                strings_jp;
        }
    }
});