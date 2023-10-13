import Banner from "../../../components/client/banner";

export default function Home(props) {
  const banners = [
    {
      image: "",
    },
    {
      image: "",
    },
    {
      image: "",
    },
  ];
  return (
    <>
      <Banner images={banners} />
    </>
  );
}
