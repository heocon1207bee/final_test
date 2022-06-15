import { useState } from "react";
const Footer = ({messages, handleLang}) => {
  const [currentLang, setCurrentLang] = useState('en')

  const handleVi = () => {
    const lang = 'vi'
    setCurrentLang(lang)
    handleLang(lang)
  }
  const handleEn = () => {
    const lang = 'en'
    setCurrentLang(lang)
    handleLang(lang)
  }
    return (
      <div>
        <h3>{messages('madeByMindX')}</h3>
        <div>
          <span>{messages('availableOn')}</span>
          <span 
          className={["languague-picker", (currentLang==='vi'&&'selected')].join(' ')}
          onClick={handleVi}>🇻🇳</span>
          <span 
          className={["languague-picker", (currentLang==='en'&&'selected')].join(' ')}
          onClick={handleEn}>🇺🇸</span>
        </div>
      </div>
    );
  };
  
  export default Footer;
  