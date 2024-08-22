import Image from 'next/image';
import IsChecked from '@/data/whiteCheck.svg';
import { MoodImage } from '@/types';

interface MoodImageGroupProps {
  images: MoodImage[];
  selectedMoods: number[];
  toggleMood: (id: number) => void;
}

const MoodImageGroup = ({
  images,
  selectedMoods,
  toggleMood,
}: MoodImageGroupProps) => {
  return (
    <div className="flex flex-col space-y-1 w-1/3">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative cursor-pointer rounded-md overflow-hidden"
          onClick={() => toggleMood(image.id)}
        >
          <Image
            src={image.src}
            alt={image.alt}
            layout="responsive"
            width={220}
            height={220}
            objectFit="cover"
            className="w-full h-auto"
          />
          {selectedMoods.includes(image.id) && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <Image src={IsChecked} alt={'checked'} width={20} height={20} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoodImageGroup;
