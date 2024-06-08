import Image from "next/image";

export default function StarRating({rating}) {
  const stars = new Array(rating).fill(0);
  return (
    <>
      {stars?.map((star, index) => (
        <Image
          key={index}
          src={`/assets/star.svg`}
          alt="star image"
          width={20}
          height={20}
        />
      ))}
    </>
  );
}
