import { PhotoView } from "react-photo-view";
import Containar from "../containar/Containar";

const Gallery = () => {
  const images = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?cs=srgb&dl=pexels-seven11nash-380769.jpg&fm=jpg",
      alt: "Image 1",
    },
    {
      id: 2,
      src: "https://plus.unsplash.com/premium_photo-1661879435429-a396d927c686?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2ZmaWNlJTIwc3BhY2V8ZW58MHx8MHx8fDA%3D",
      alt: "Image 2",
    },
    {
      id: 3,
      src: " https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 3",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1498409785966-ab341407de6e?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 4",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 5",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 6",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1461701204332-2aa3db5b20c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 7",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 8",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Image 9",
    },
  ];

  return (
    <div>
      <Containar>
        <h1 className="text-3xl my-10 font-bold">Our Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center gap-2">
          {images.map((image) => (
            <PhotoView key={image.id} src={image?.src}>
              <img
                src={image?.src}
                alt="company gallery photo"
                className="w-full md:w-80 h-48 object-cover"
              />
            </PhotoView>
          ))}
        </div>
      </Containar>
    </div>
  );
};

export default Gallery;
