import { Component } from 'react';
import propTypes from 'prop-types';

import StarWarsServices from '../../services/StarWarsServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
import chewbacca from '../../resources/img/Chewbacca.jpeg';

class CharInfo extends Component{

    state = {
        char: null,
        loading: false,
        error: false,
        
    }

    starWarsServices = new StarWarsServices();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch(err, info) {
        console.log(err, info);
        this.setState({error: true});
    }

    updateChar = () => {
        const {charId} = this.props;

        if (!charId) { 
        // Если charName отсутствует, не делаем запрос.
        this.setState({ char: null, loading: false, error: false });
        return; 
    }

        this.onCharLoading();

        this.starWarsServices
            .getCharacters(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
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

    render() {
            const {char, loading, error} = this.state;

            const skeleton = char || loading || error ? null : <Skeleton/>; 
            const errorMessage = error ? <ErrorMessage/> : null;
            const spinner = loading ? <Spinner/> : null;
            const content = !(loading || error || !char) ? <View char={char}/> : null;
            return (
                <div className="char__info">
                    {skeleton}
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            )
    }
}

const View = ({char}) => {
    const {name, url,homeworld} = char;
    return(
        <>
        <div className="char__basics">
                        <img src={chewbacca} alt={name}/>
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homeworld} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={url} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </>            
    )

}



export default CharInfo;