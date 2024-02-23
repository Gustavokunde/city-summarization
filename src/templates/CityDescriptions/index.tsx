interface CityTemplateProps {
  image: string;
  name: string;
  description: string;
}

const CityDescriptions = ({ image, name, description }: CityTemplateProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt={name + "image"} />
      <p>{description}</p>
    </div>
  );
};

export default CityDescriptions;
