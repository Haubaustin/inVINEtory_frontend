import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  
    return (
        <div className="Footer">
            <a href="https://www.linkedin.com/in/austin-haubenschild-211472169/" 
                className="footerIcon" 
                target="_blank" 
                rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="3x" />
            </a>
            <a href="https://github.com/Haubaustin"
                className="footerIcon" 
                target="_blank" 
                rel="noreferrer">
                <FontAwesomeIcon icon={faGithubSquare} size="3x" />
            </a>
        </div>
    )
}
export default Footer