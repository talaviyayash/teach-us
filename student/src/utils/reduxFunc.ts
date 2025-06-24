import type { RootState } from '@/redux/store'

export const getModal =
  (name: string) =>
  (state: RootState): boolean =>
    state?.modal?.[name]

export const getLoader =
  (name: string) =>
  (state: RootState): boolean =>
    state?.loader?.[name]

export const getApiData =
  (name: string) =>
  (state: RootState): any =>
    state?.api?.[name]

export const getData =
  (name: string) =>
  (state: RootState): any =>
    state?.data?.[name]

export const getFlag =
  (name: string) =>
  (state: RootState): any =>
    state?.app?.flag?.[name]
