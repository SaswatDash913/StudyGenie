import React from 'react'
import NavLandingPage from '../components/NavLandingPage'
import '../style/LandingPage.css'
import FeatureHiglightLanding from '../components/FeatureHiglightLanding'
import HowItWorks from '../components/HowItWorks'
import ContactMe from '../components/ContactMe'
function LandingPage() {
  return (
    <div className='LandingPage-main'>
        <div className='LandingPage-inner'>
            <div className='nav-landingpage'>
              <NavLandingPage />
            </div>
            <div className='feature-landing'>
              <FeatureHiglightLanding />
            </div>
            <div className='working-landing'>
              <HowItWorks />
            </div>
            <div className='whygenie-landing'>
              <ContactMe />
            </div>
        </div>
    </div>
  )
}

export default LandingPage
