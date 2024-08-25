import Image from 'next/image';
import IsChecked from '@/data/whiteCheck.svg';
import { SnapImage } from '@/types';
import { shimmer, toBase64 } from '@/lib/utils';

interface MoodImageGroupProps {
  images: SnapImage[];
  selectedMoods: number[];
  toggleMood: (id: number) => void;
}

const MoodImageGroup = ({
  images,
  selectedMoods,
  toggleMood,
}: MoodImageGroupProps) => {
  return (
    <div className="flex flex-col w-1/3 space-y-1">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative overflow-hidden cursor-pointer rounded-md"
          onClick={() => toggleMood(image.id)}
        >
          <Image
            src={image.url}
            alt={image.id.toString()}
            width={200}
            height={200}
            className="object-cover w-full h-auto"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(120, 120),
            )}`}
          />

          {selectedMoods.includes(image.id) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <Image src={IsChecked} alt={'checked'} width={20} height={20} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoodImageGroup;
