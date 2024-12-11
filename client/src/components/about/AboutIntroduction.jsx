import farmer1 from "../../assets/About/farmer-1.jpg";
import leaf1 from "../../assets/About/Leaf-1.svg";
import Containar from "../containar/Containar";
const AboutIntroduction = () => {
  return (
    <div>
      <Containar>
        <div className="my-24 w-full flex flex-col  lg:flex-row justify-between items-center md:gap-10">
          <div className="lg:w-1/2">
            <h4 className="text-xl font-bold text-[#F4A51D]">
              Welcome to{" "}
              <span className="text-primary">Agro Infusion Limeted!</span>
            </h4>
            <h1 className="text-4xl font-semibold my-4 mb-8">
              We are building a better future
            </h1>
            <p className="text-lg leading-9 text-gray-500">
              Many farmers would like to transition to organic agriculture in
              theory, but in practice face a number of barriers to transition.
              Among them, weed management, the cost of transitioning, and the
              recordkeeping requirements are the most daunting, according to
              transitioning farmers.<br></br>
              <br></br> Fortunately, myriad public and private initiatives
              support farmers who are making the transition. The US Department
              of Agriculture, for example, offers a cost-share program via
              county FSA offices, financial and technical assistance through
              NRCS EQUIP program, and rental payments for on-farm conservation
              areas.
              <br></br>
              <br></br> Additional funding through the newly formed Organic and
              Transitional Education and Certification Program (OTECP) supports
              transitioning farmers affected by the pandemic via financial
              assistance.
            </p>
          </div>
          <div className="relative">
            <img
              src={farmer1}
              className="h-[450px] md:h-[900px] w-full rounded-lg object-cover"
            ></img>
            <img
              src={leaf1}
              className="absolute bottom-2 -left-28  rotate-180"
            ></img>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default AboutIntroduction;
