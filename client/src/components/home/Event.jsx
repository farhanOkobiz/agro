import React, { useEffect, useState } from "react";
import Containar from "../containar/Containar";
import { Link } from "react-router-dom";
import event1 from "../../assets/event/event1.jpg";
import event2 from "../../assets/event/event2.jpg";
import { MdOutlineWatchLater } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import api from "../axios/Axios";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    try {
      const response = await api.get(`/events?limit=5`);
      // console.log(`response`, response);

      setEvents(response.data?.data);
      if (response.data?.data?.doc?.length > 0) {
        getSingleEvent(response.data?.data?.doc[0]._id); // Get the first event
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch a single event by ID
  const getSingleEvent = async (id) => {
    try {
      const response = await api.get(`/events/${id}`);
      // console.log(`Single Event response`, response);
      setSingleEvent(response.data?.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    return `
    ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}, 
    ${date.getDate()} ${date.toLocaleString("en-US", {
      month: "short",
    })}, ${date.getFullYear()}`;
  };

  return (
    <div className="font-robo pt-[90px]">
      <Containar>
        <div className="sticky top-10">
          <div>
            <h4 className="uppercase text-[16px] sm:text-[20px] font-bold text-primary tracking-wide leading-7 sm:leading-[58px]">
              Our Events
            </h4>
            <h2 className="text-[24px] sm:text-[36px] font-semibold leading-8 sm:leading-[48px] mt-2.5 text-text">
              Our Upcoming Agriculture Events
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-12 sm:gap-9">
            <div className="col-span-12 sm:col-span-7">
              <div className="h-[200px] sm:h-[375px] w-full relative">
                <Link to={`/events/${events?.doc?.[0]?._id}`}>
                  <img
                    className="w-full h-full object-cover rounded-2xl"
                    src={events?.doc?.[0]?.photo}
                  />
                </Link>
                <div className="absolute -top-[53px] text-[14px] font-bold flex justify-center items-center px-5 py-5 text-center right-6 w-[106px] h-[106px] bg-primary border-[8px] border-white rounded-full text-white">
                  <h4>{formatDate(events?.doc?.[0]?.startingDate)}</h4>
                </div>
              </div>
              <div className="mt-[45px]">
                <Link
                  to={`/events/${events?.doc?.[0]?._id}`}
                  className="text-[20px] sm:text-[32px] text-text leading-[22px] font-semibold"
                >
                  {events?.doc?.[0]?.heading}
                </Link>
                <h4 className="mt-3 sm:mt-8 mb-2 text-[16px] text-text font-medium">
                  Location:{" "}
                  <span className="ml-2 text-gray-600 font-normal">
                    {events?.doc?.[0]?.location}
                  </span>
                </h4>
                <h4 className="mt-1.5 mb-4 text-[16px] text-text font-medium">
                  Time:{" "}
                  <span className="ml-2 text-gray-600 font-normal">
                    {formatDateWithTime(events?.doc?.[0]?.startingDate)}
                  </span>
                </h4>
                <p
                  className="text-[14px] line-clamp-6 leading-7 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: events?.doc?.[0]?.details?.replace(/<[^>]+>/g, ""),
                  }}
                ></p>

                <div>
                  <Link
                    className="inline-block mt-5 text-white text-[17px] font-semibold px-[33px] py-[10px] bg-primary rounded-md"
                    to={`/events/${events?.doc?.[0]?._id}`}
                  >
                    Know More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-5 mt-10 sm:mt-0 sticky top-24">
              <div>
                <div className="flex justify-between mb-5 bg-primary py-3 px-4 rounded-md text-white">
                  <h3>All Events</h3>
                  <Link to={"/events"}>View All</Link>
                </div>
                <div className="flex h-full flex-col gap-y-5">
                  {events?.doc?.map((event, index) => (
                    <Link key={event?._id} to={`/events/${event?._id}`}>
                      <div className={`grid grid-cols-12 gap-x-5 ${events.doc.length != index+1 && "border-b"}  pb-4`}>
                        <div className="col-span-4 ">
                          <div className="w-full sm:h-[100px]">
                            <img
                              className="w-full h-full rounded-lg object-cover"
                              src={event?.photo}
                            />
                          </div>
                        </div>
                        <div className="col-span-8 ">
                          <div>
                            <h3 className="text-[17px] font-semibold text-text">
                              {event?.heading}
                            </h3>
                            <div className="flex items-center flex-wrap text-[13px] mt-1 text-gray-600">
                              <div className="flex items-center gap-x-1 mr-2">
                                <MdOutlineWatchLater />{" "}
                                <span>
                                  {formatDateWithTime(event?.startingDate)}
                                </span>
                              </div>{" "}
                              |
                              <div className="flex items-center gap-x-1 ml-1">
                                <RiMapPinLine />{" "}
                                <span className="line-clamp-1">
                                  {event?.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Event;
