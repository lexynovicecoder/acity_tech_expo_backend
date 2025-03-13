import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import OnboardingScreen from "./components/OnboardingScreen";
import UserTypeScreen from "./components/UserTypeScreen";
import CustomerAuthScreen from "./components/CustomerAuthScreen";
import FacialRecognitionScreen from "./components/FacialRecognitionScreen";
import HomeScreen from "./components/HomeScreen";
import RanksScreen from "./components/RanksScreen";
import ChallengesScreen from "./components/ChallengesScreen";
import ActivitiesScreen from "./components/ActivitiesScreen";
import FeedScreen from "./components/FeedScreen";  
import SettingsScreen from "./components/SettingsScreen";
import ProfileScreen from "./components/ProfileScreen";
import CollaboratorDashboard from "./components/CollaboratorDashboard";
import axios from "axios"; 
function App() {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextScreen, setNextScreen] = useState(null);
  const [userData, setUserData] = useState({
    username: "RecycleKing",
    avatar: "EcoWarrior",
    level: 8,
    points: 2756
  });

  const changeScreen = (screen) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setNextScreen(screen);

      // Delay the actual screen change until fade-out completes
      setTimeout(() => {
        setCurrentScreen(screen);
        setIsAnimating(false);
      }, 100); // Adjust time to match animation duration
    }
  };

  const handleSplashComplete = () => {
    changeScreen("onboarding");
  };

  const handleAcceptMission = () => {
    changeScreen("userType");
  };

  const handleLearnMore = () => {
    changeScreen("learnMore");
  };

  const handleSelectCustomer = () => {
    changeScreen("customerAuth");
  };

  const handleSelectCollaborator = () => {
    changeScreen("collaboratorDashboard");
  };

  const handleCustomerAuthComplete = () => {
    changeScreen("facialRecognition");
  };

  const handleFacialRecognitionComplete = () => {
    changeScreen("home");
  };

  const handleFacialRecognitionBack = () => {
    changeScreen("customerAuth");
  };

  const handleHomeNavigation = (screen) => {
    changeScreen(screen);
  };

  const handleBackToHome = () => {
    changeScreen("home");
  };

  const handleBackToUserType = () => {
    changeScreen("userType");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onComplete={handleSplashComplete} />;
      case "onboarding":
        return <OnboardingScreen onAcceptMission={handleAcceptMission} onLearnMore={handleLearnMore} />;
      case "userType":
        return <UserTypeScreen onSelectCustomer={handleSelectCustomer} onSelectCollaborator={handleSelectCollaborator} />;
      case "customerAuth":
        return <CustomerAuthScreen onContinue={handleCustomerAuthComplete} />;
      case "facialRecognition":
        return <FacialRecognitionScreen onComplete={handleFacialRecognitionComplete} onBack={handleFacialRecognitionBack} />;
      case "home":
        return <HomeScreen 
                 onNavigate={handleHomeNavigation} 
                 userData={userData}
               />;
      case "ranks":
        return <RanksScreen 
                 userData={userData} 
                 onBack={handleBackToHome} 
               />;
      case "challenges":
        return <ChallengesScreen 
                 userData={userData} 
                 onBack={handleBackToHome} 
               />;
      case "activities":
        return <ActivitiesScreen 
                 userData={userData} 
                 onBack={handleBackToHome} 
               />;
      case "feed":
        return <FeedScreen 
                 userData={userData} 
                 onBack={handleBackToHome} 
               />;
      case "settings":
        return <SettingsScreen 
                  userData={userData} 
                  onBack={handleBackToHome}
                  onUpdateUserData={setUserData} 
                 />; 
      case "profile":
        return <ProfileScreen 
                   userData={userData} 
                   onBack={handleBackToHome}
                   onUpdateUserData={setUserData} 
                  />;
      case "collaboratorDashboard":
        return <CollaboratorDashboard 
                  onBack={handleBackToUserType}
                />;                   
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  return (
    <>
      <style jsx>{`
        .app-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0c4a6e;
          transition: opacity 0.5s ease-in-out;
          opacity: ${isAnimating ? 0 : 1};
        }
      `}</style>

      <div className="app-container">{renderScreen()}</div>
    </>
  );
}

export default App;