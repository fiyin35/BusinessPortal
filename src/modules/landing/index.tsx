import React from "react";

import { Link } from "react-router-dom";
import './index.scss';
import  Logo from "../../assets/images/logo.png"
import  LogoSm from "../../assets/images/logo-sm.png"
import  HeroImg from "../../assets/images/hero.png"
import  HeroTwo from "../../assets/images/hero2.png"


const LandingHeader = ()=>{
  return(
    <div className="landing-header">
      <div className="heading-wrap">
        <div className="logo-wrap">
          
          <picture>
            <source
              srcSet={LogoSm}
              media="(max-width: 1024px)"
            />
            <source
              srcSet={Logo}
              media="(min-width: 1025px)"
            />
            <img
              src={Logo}
              alt="Banklingo Logo"
            />
          </picture>
        </div>
        <Link className="link-btn-gray signin btn" to="/account/sign-in">Sign In</Link>
      </div>
    </div>
  )
}

const LandingHero = ()=>{

  return (
    <div className="hero-wrap">
      <div className="hero-content">
        <h2 className="hero-headline">
          Limitless Core Banking <br/> for everybody
        </h2>
        <div className="hero-msg">
          Our core banking solution is the one-stop for all your banking and payment operations
        </div>
        <div className="hero-ctas">
          <Link className="link-btn btn" to="/account/create-account">Create Account</Link>
          <Link className="link-btn-gray btn" to="/request-demo">Request Demo</Link>
        </div>
      </div>
      <div className="hero-img">
        <picture>
          <source
            srcSet={HeroTwo}
            media="(max-width: 1024px)"
          />
          <source
            srcSet={HeroImg}
            media="(min-width: 1025px)"
          />
          <img
            src={HeroImg}
            alt=""
          />
        </picture>
      </div>
    </div>
  )
}

export const LandingPage = () => {
  return (
        <div className="landing-container">
            <LandingHeader/>
            <LandingHero/>
        </div>
  );
};