'use client';

import { Photographer } from '@/types';
import { RecoilRoot, atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const previouslySelectedState = atom<number[]>({
  key: 'previouslySelected',
  default: [],
  effects: [persistAtom],
});

export const photographersSortByMoodState = atom<Photographer[][]>({
  key: 'photographersSortByMood',
  default: [],
  effects: [persistAtom],
});

export const finalPhotographerIdsState = atom<number[]>({
  key: 'finalPhotographerIds',
  default: [],
  effects: [persistAtom],
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
