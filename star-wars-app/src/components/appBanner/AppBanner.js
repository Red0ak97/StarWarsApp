import './appBanner.scss';
import starwars from '../../resources/img/StarWars.png';
import starWarsLogo from '../../resources/img/StarWars_logo.png';

const AppBanner = () => {
    return (
        <div className="app__banner">
            <img src={starwars} alt="StarWars"/>
            <div className="app__banner-text">
                New comics every week!<br/>
                Stay tuned!
            </div>
            <img src={starWarsLogo} alt="starWars logo"/>
        </div>
    )
}

export default AppBanner;