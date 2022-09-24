/**
 * 語尾を変換する
 * @param convertText 
 * @returns 
 */
export const convert = (convertText: string): string => {
    return nyanConvert(convertText)
}

/**
 * 語尾に「にゃ」をつける(末尾の '!'. '?', '。'を考慮)
 * - やってられない! => やってられないにゃ!
 * - 電車早く詰めろ! => 電車早く詰めろにゃ!
 * - 出社の意味はなんなの? => 出社の意味は何なのにゃ?
 * - マスク嫌だ => マスク嫌だにゃ
 * @param convertText 
 */
const nyanConvert = (convertText: string): string => {
    const NYAN_SUFFIX = 'にゃ'
    const markList = ['!','！', '?','？', '。']

    /** '!','?', '。'が最初に現れる位置 */
    const firstMarkIndex = convertText.split('').findIndex(c => markList.includes(c))
    const textPartEndIndex = firstMarkIndex === -1 ? Infinity : firstMarkIndex
    /** 'やってられない' */ 
    const textPart = convertText.slice(0, textPartEndIndex)
    /** '!' */
    const markPart = convertText.slice(textPartEndIndex)
    return textPart + NYAN_SUFFIX + markPart
}

/**
 * 
 "value": [
     {
         "guchiText": "やってられないにゃ!"
        },
        "{guchiText: \"電車早く詰めろ!\"}",
        "{guchiText: \"暑い!\"}",
        "{guchiText: \"出社の意味はなんなの?\"}",
        "{guchiText: \"めんどくさい\"}",
        "{guchiText: \"やめてくれー\"}",
        "{guchiText: \"眠い\"}",
        "{guchiText: \"マスク嫌だ\"}"
    ],
*/