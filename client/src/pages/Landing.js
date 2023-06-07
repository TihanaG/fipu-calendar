import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        FIPU <span>Calendar</span> App
                    </h1>
                    <p>I'm baby literally tumeric gastropub tbh selvage. Farm-to-table af kogi artisan scenester master cleanse man braid hammock paleo vegan selvage single-origin coffee YOLO lomo actually.</p>
                    <Link to='/register' className="btn btn-hero">
                        Login/Register
                    </Link>
                </div>
                <img src={main} alt="Calendar" className="img main-img" />
            </div>
        </Wrapper>
    )
}
export default Landing