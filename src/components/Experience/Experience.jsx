import React from "react";
import "./Experience.css";
import { Experiences } from "../../assets/constants/constant";
import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
const Experience = () => {
  const experiences = Experiences;
  return (
    <>
      <div
        className="p-5 text-center mt-20 border-b border-gray-300"
        id="experience"
      >
        <h2 className="font-inter text-[#353639] font-bold text-4xl lg:text-6xl ">
          What I’ve been up to professionally ?
        </h2>
        <div className="p-5 mt-20">
          {experiences &&
            experiences.map((experience, index) => (
              <VerticalTimeline lineColor="#b0b0b0" key={index} animate={true}>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.3)", // More opaque to stand out on light background
                    backdropFilter: "blur(8px)", // Frosted glass effect
                    WebkitBackdropFilter: "blur(8px)", // For Safari
                    borderRadius: "15px", // Slightly rounded corners for smooth look
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", // Softer shadow for subtle depth
                    border: "1px solid rgba(255, 255, 255, 0.2)", // Light border for emphasis
                    padding: "20px",
                  }}
                  contentArrowStyle={{ borderRight: "7px solid  whitesmoke" }}
                  date={experience.year}
                  iconStyle={{
                    background: "white",
                    color: "#fff",
                    border: "#b0b0b0",
                  }}
                  icon={
                    <img
                      src={experience.logo}
                      className="h-full p-0.5 rounded-full border border-[#b0b0b0] "
                    />
                  }
                  lineColor={"black"}
                  position={index % 2 === 0 ? "left" : "right"}
                >
                  <h3 className="vertical-timeline-element-title font-serif font-bold text-[#333]">
                    {experience.role} ,{" "}
                    <span className="text-[#333]">{experience.company}</span>
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle text-sm text-[#2c3e50]">
                    {" "}
                    ({experience.location})
                  </h4>
                  <p className="text-[#555] p-5 text-left">
                    {experience.description.map((dsc) => (
                      <ul className="list-disc p-2 ">
                        <li className="text-xs font-mono">{dsc}</li>
                      </ul>
                    ))}
                  </p>
                </VerticalTimelineElement>
              </VerticalTimeline>
            ))}
        </div>
      </div>
    </>
  );
};

export default Experience;
