import HotelService from "../common/HotelService";
import ParallaxScrolling from "../common/ParallaxScrolling";
import RoomCarousel from "../common/RoomCarousel";
import HeaderMain from "../layout/HeaderMain";

function Home() {
  return (
    <section>
      <HeaderMain />
      <div className="container">
        <RoomCarousel />
        <ParallaxScrolling />
        <HotelService />
        <ParallaxScrolling />
      </div>
    </section>
  );
}

export default Home;
