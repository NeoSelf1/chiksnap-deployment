import { photographers_mu } from '@/data/database';
import Image from 'next/image';
const PhotographerDetailsPage = ({ params }: { params: { id: string } }) => {
  // In a real application, you would fetch the photographer's details based on the id
  const photographer = photographers_mu[parseInt(params.id)];

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-6">
          <Image
            src={photographer.profileImg}
            alt={photographer.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="ml-4">
            <h2 className="title-1">{photographer.name}</h2>
            <p className="body-3 text-gray-600">{photographer.instagramId}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {photographer.workImages?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Work ${index + 1}`}
              width={240}
              height={150}
              objectFit="cover"
            />
          ))}
        </div>
        <h3 className="title-2 mb-2">제공 서비스</h3>
        <ul className="list-disc list-inside">
          {photographer.services.map((service, index) => (
            <li key={index} className="body-2">
              {service}
            </li>
          ))}
        </ul>
        <a
          href={`https://www.instagram.com/${photographer.instagramId.slice(
            1,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary block text-center mt-6"
        >
          인스타그램으로 연락하기
        </a>
      </div>
    </div>
  );
};

export default PhotographerDetailsPage;
