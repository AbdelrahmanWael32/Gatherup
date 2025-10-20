import CarouselHome from "./Components/CarouselHome";
import Category from "./Components/Category";
import PopularPicks from "./Components/PopularPicks";

const Home = () => {
  return (
    <div className="w-full px-14 md:px-20 lg:px-28 xl:px-40">
      <CarouselHome></CarouselHome>
      <Category></Category>
      <PopularPicks></PopularPicks>
    </div>
  );
};

export default Home;
