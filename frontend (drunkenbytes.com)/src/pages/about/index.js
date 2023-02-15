import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import AboutPage from '@/app/components/templates/aboutPage/AboutPage';

const About = props => {
  return (
    <DefaultLayout>
      <AboutPage props={props} />
    </DefaultLayout>
  );
};

export default About;
