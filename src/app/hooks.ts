import { RefObject, useCallback } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

type DOMRectProperty = keyof Omit<DOMRect, 'toJSON'>

/** 
 * 要素の高さを取得するカスタムフック  
 * 参考: https://zenn.dev/tm35/articles/7ac0a932c15ef8
 */
export const useGetElementProperty = <T extends HTMLElement>(
    elementRef: RefObject<T>
) => {
    const getElementProperty = useCallback(
        (targetProperty: DOMRectProperty): number => {
            const clientRect = elementRef.current?.getBoundingClientRect()
            if (!clientRect) return 0
            console.log(`clientRect[targetProperty]: ${clientRect[targetProperty]}`)
            return clientRect[targetProperty]
        },
        [elementRef]
    )

    return getElementProperty
}
