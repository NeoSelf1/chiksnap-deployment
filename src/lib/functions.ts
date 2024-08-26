import { photoData, photographerData } from '@/data/database';
import { MoodType, Photographer } from '@/types';

export const sortPhotographersByMood = ({
  types,
  moods,
}: {
  types: number[];
  moods: (MoodType | undefined)[];
}) => {
  const filteredPhotographerByType = photographerData.filter((item) =>
    types.some((type: any) => item.types.includes(type)),
  );

  const photoMoodMap = new Map(
    photoData.map((photo) => [photo.id, photo.mood]),
  );

  const photographerMoodCounts = filteredPhotographerByType.map(
    (photographer) => {
      const moodCounts = new Map<number, number>();
      // 모든 사진작가들에 대해,
      for (const imageId of photographer.works) {
        //순회하는 사진작가 작품 이미지의 무드를
        const mood = photoMoodMap.get(imageId);
        if (mood !== undefined) {
          // moodId,
          moodCounts.set(mood, (moodCounts.get(mood) || 0) + 1);
        }
      }
      return { photographer, moodCounts };
    },
  );

  const moodSortedPhotographers = moods.map((mood) =>
    [...photographerMoodCounts]
      .sort(
        (a, b) =>
          (b.moodCounts.get(mood!) || 0) - (a.moodCounts.get(mood!) || 0),
      )
      .map((item) => item.photographer),
  );
  return moodSortedPhotographers;
};

export const sortPhotographers = ({
  previouslySelected,
  sortedPhotographers,
  _moods,
}: {
  previouslySelected: number[];
  sortedPhotographers: Photographer[][];
  _moods: number[];
}) => {
  const selectedPhotographerIds: number[] = [];
  const modifiedSortedPhotographers = sortedPhotographers.map((arr) => [
    ...arr,
  ]);

  while (selectedPhotographerIds.length < 3) {
    let selectedInThisRound = false;

    for (let i = 0; i < _moods.length; i++) {
      if (modifiedSortedPhotographers[i].length > 0) {
        const photographerIndex = modifiedSortedPhotographers[i].findIndex(
          (photographer) =>
            !previouslySelected.includes(photographer.id) &&
            !selectedPhotographerIds.includes(photographer.id),
        );

        if (photographerIndex !== -1) {
          const [selectedPhotographer] = modifiedSortedPhotographers[i].splice(
            photographerIndex,
            1,
          );
          selectedPhotographerIds.push(selectedPhotographer.id);
          selectedInThisRound = true;
          break;
        }
      }
    }

    if (!selectedInThisRound) break; // 모든 mood에 대해 새로운 사진작가를 찾지 못한 경우
  }

  return {
    selectedPhotographerIds,
    modifiedSortedPhotographers,
  };
};
