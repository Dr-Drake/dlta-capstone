import { RiTodoFill } from "react-icons/ri";
import { 
    MdQuiz, MdOutlinePassword, MdFoodBank , 
    MdOutlineCurrencyExchange, MdOutlineSentimentSatisfied, 
    MdNoEncryptionGmailerrorred, MdOutlineTimer, MdDraw
} from "react-icons/md";
import { 
    BsFillCalculatorFill, BsFillChatQuoteFill, 
    BsQrCode, BsTranslate, BsFileEarmarkTextFill, BsBrowserChrome,
    BsWechat, BsYoutube
} from 'react-icons/bs'
import { TiWeatherCloudy } from "react-icons/ti";
import { GrDocumentImage, GrMapLocation } from "react-icons/gr";
import { AiOutlineNumber } from 'react-icons/ai';
import { TbMovie } from "react-icons/tb";
import { SiRiotgames, SiGithub } from "react-icons/si";
import { IoIosBody } from "react-icons/io";
import { RiGamepadFill } from "react-icons/ri";
import { FaBlog } from "react-icons/fa";

export type IconHash = typeof iconHash;

const iconHash = {
    "React Todo-list": <RiTodoFill size={35}/>,
    "React Quiz App": <MdQuiz size={35}/>,
    "React Calculator": <BsFillCalculatorFill size={35}/>,
    "Password Generator": <MdOutlinePassword size={35}/>,
    "Quotes Generator": <BsFillChatQuoteFill size={35}/>,
    "Recipes App": <MdFoodBank size={35}/>,
    "Weather App": <TiWeatherCloudy size={35}/>,
    "QR Code Generator": <BsQrCode size={35}/>,
    "Currency Converter": <MdOutlineCurrencyExchange size={35}/>,
    "Text Sentiment Analyzer": <MdOutlineSentimentSatisfied size={35}/>,
    "Image-To-Text Converter": <GrDocumentImage size={35}/>,
    "Language Translator App": <BsTranslate size={35}/>,
    "Sudoku Solver App": <AiOutlineNumber size={35}/>,
    "Movie Recommendation System": <TbMovie size={35}/>,
    "Rock-paper Scissors App": <SiRiotgames size={35}/>,
    "Text Extractor": <BsFileEarmarkTextFill size={35}/>,
    "File Encryption Program": <MdNoEncryptionGmailerrorred size={35}/>,
    "Web Scraper App": <BsBrowserChrome size={35}/>,
    "Chat App": <BsWechat size={35}/>,
    "BMI Calculator": <IoIosBody size={35}/>,
    "Phaser Simple Game": <RiGamepadFill size={35}/>,
    "React Pomodoro Timer": <MdOutlineTimer size={35}/>,
    "YT Video Downloader": <BsYoutube size={35}/>,
    "GitHub Authentication Service App": <SiGithub size={35}/>,
    "Volunteer Locator App": <GrMapLocation size={35}/>,
    "Blog App": <FaBlog size={35}/>,
    "ASCII Art Generator": <MdDraw size={35}/>,
    // "Rock-paper Scissors App": <TbMovie size={35}/>,
    
}

export function getIcon(projectName: keyof typeof iconHash) {
    return iconHash[projectName] || <RiTodoFill size={35}/>;
}