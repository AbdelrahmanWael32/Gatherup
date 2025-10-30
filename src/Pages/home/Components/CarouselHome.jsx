import { Carousel, Typography, Button } from "@material-tailwind/react";

const CarouselHome = () => {
  return (
    <div className="h-80 py-5">
      <Carousel className="rounded-xl">
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center sm:w-3/5 md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-xl sm:text-2xl md:text-3xl"
              >
                Get your music fix with festival!!!
              </Typography>

              <div className="flex justify-center gap-2">
                <Button size="lg" color="white">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center sm:w-3/5 md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-xl sm:text-2xl md:text-3xl"
              >
                Get your music fix with festival!!!
              </Typography>

              <div className="flex justify-center gap-2">
                <Button size="lg" color="white">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselHome;
