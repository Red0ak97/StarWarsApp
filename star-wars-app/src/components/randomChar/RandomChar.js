import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import StarWarsServices from '../../services/StarWarsServices';

import './randomChar.scss';
import thor from '../../resources/img/Chewbacca.jpeg';
import droids from '../../resources/img/Droids.png';


class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
        
    }

    starWarsServices = new StarWarsServices();

    componentDidMount() {
        this.updatePeople();
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading:false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updatePeople = () => {
        const id = Math.floor(Math.random() * (80-1) + 1);
        this.onCharLoading();
        this.starWarsServices
            .getCharacters(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }


    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

            return (
                <div className="randomchar">
                    {errorMessage}
                    {spinner}
                    {content}
                    <div className="randomchar__static">
                        <p className="randomchar__title">
                            Random character for today!<br/>
                            Do you want to get to know him better?
                        </p>
                        <p className="randomchar__title">
                            Or choose another one
                        </p>
                        <button onClick={this.updatePeople} className="button button__main">
                            <div  className="inner">try it</div>
                        </button>
                        <img src={droids} alt="mjolnir" className="randomchar__decoration"/>
                    </div>
                </div>
            )
    }
}

const View = ({char}) => {
    const{name, url, homeworld} = char;
    return (
        <div className="randomchar__block">
            <img src={thor} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>      
                    <div className="randomchar__btns">
                    <a href={url} className="button button__main">
                         <div className="inner">homepage</div>
                    </a>
                    <a href={homeworld} className="button button__secondary">
                          <div className="inner">homeworld</div>
                    </a>
                 </div>
              </div>
          </div>
    ) 
}

export default RandomChar;