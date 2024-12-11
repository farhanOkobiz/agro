import { useState } from "react";
import Containar from "../containar/Containar";

const values = [
  {
    id: 1,
    valuesType: "Expert",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5931DU1WQFwYz0I2LQ3HKAHpicjmiWPwyg&s",
    discription:
      "Expertise and insightful evidence-based solutions are at the heart of everything we do. Expertise and insightful evidence-based solutions are at the heart of everything we do. Expertise and insightful evidence-based solutions are at the heart of everything we do. Expertise and insightful evidence-based solutions are at the heart of everything we do.",
  },
  {
    id: 2,
    valuesType: "Grounded",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5931DU1WQFwYz0I2LQ3HKAHpicjmiWPwyg&s",
    discription:
      "Our teams and partners work closely with local communities, engaging them in every level of decision-making. Our teams and partners work closely with local communities, engaging them in every level of decision-making. Our teams and partners work closely with local communities, engaging them in every level of decision-making. Our teams and partners work closely with local communities, engaging them in every level of decision-making.",
  },
  {
    id: 3,
    valuesType: "Impactful",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5931DU1WQFwYz0I2LQ3HKAHpicjmiWPwyg&s",
    discription:
      "We deliver long-lasting change for farmers, their families and their environments. We deliver long-lasting change for farmers, their families and their environments. We deliver long-lasting change for farmers, their families and their environments. We deliver long-lasting change for farmers, their families and their environments. We deliver long-lasting change for farmers, their families and their environments.",
  },
  {
    id: 4,
    valuesType: "Bold",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5931DU1WQFwYz0I2LQ3HKAHpicjmiWPwyg&s",
    discription:
      "We model innovative approaches and are not afraid to challenge trategies that are failing. We model innovative approaches and are not afraid to challenge trategies that are failing. We model innovative approaches and are not afraid to challenge trategies that are failing.We model innovative approaches and are not afraid to challenge trategies that are failing.",
  },
];

const AboutValues = () => {
  const [value, setValue] = useState(values[0]);

  const handelValues = (id) => {
    setValue(values[id - 1]);
  };
  return (
    <div className="bg-[#FBF7F0] md:py-12">
      <Containar>
        <div className="lg:my-16 p-4">
          <div className="my-6">
            <h2 className="text-4xl font-bold mb-6 text-primary">Our Values</h2>
            <p className="w-full md:w-4/5 lg:w-3/5 leading-7 text-lg text-gray-500">
              Global Agro Resources Incorporation is an agro-based company in
              Bangladesh dealing various agriculture products including Sesame
              Seeds, Sesame Oil, Peanut, Peanut Oil, Yellow Maize, Fresh
              Potatoes, Raw Jute, Jute bags and other agriculture products as
              well. Visit our website www.garibd.com for more information.
            </p>
          </div>
          <div className="">
            <div className="flex flex-col md:flex-row">
              <div className="md:basis-1/3 mx- mb-10 md:mb-0 text-left flex flex-col">
                {values.map((value) => (
                  <div key={value.id} onClick={() => handelValues(value.id)}>
                    <button className="text-xl font-serif  hover:text-[#F4A51D] text-primary font-semibold">
                      {value?.valuesType}
                    </button>
                    <hr className="divider border-1 my-10"></hr>
                  </div>
                ))}
              </div>
              <div className="md:basis-2/3 flex flex-col md:flex-row gap-2">
                <div className="md:basis-1/2">
                  <img
                    className="h-[360px] lg:h-[440px] w-[400px] object-cover rounded-md"
                    src={value?.img}
                    alt=""
                    srcSet=""
                  />
                </div>
                <div className="md:basis-1/2 pt- text-left">
                  <h2 className="text-2xl mb-3 font-semibold text-primary">
                    {value?.valuesType}
                  </h2>
                  <p className="text-md leading-7 text-lg text-gray-500">
                    {value?.discription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default AboutValues;
