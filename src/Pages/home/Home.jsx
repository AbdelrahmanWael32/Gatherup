import CarouselHome from "./Components/CarouselHome";
import Category from "./Components/Category";

const Home = () => {
  return (
    <div className="w-full px-14 md:px-20 lg:px-28 xl:px-40">
      <CarouselHome></CarouselHome>
      <Category></Category>
    </div>
  );
};

export default Home;
