/**
 * 語尾を変換する
 * @param convertText 
 * @returns 
 */
export const convert = (convertText: string, suffix: string): string => {
    const markList = ['!','！', '?','？', '。']

    /** '!','?', '。'が最初に現れる位置 */
    const firstMarkIndex = convertText.split('').findIndex(c => markList.includes(c))
    const textPartEndIndex = firstMarkIndex === -1 ? Infinity : firstMarkIndex
    /** 'やってられない' */ 
    const textPart = convertText.slice(0, textPartEndIndex)
    /** '!' */
    const markPart = convertText.slice(textPartEndIndex)
    return textPart + suffix + markPart
}