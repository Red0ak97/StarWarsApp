import { Component } from 'react';
import propTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import StarWarsServices from '../../services/StarWarsServices';
import clone from '../../resources/img/Clone.jpg'; // Запасное изображение

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1,
        charEnded: false,
        selectedCharId: null, // ID выбранного персонажа
    }

    starWarsServices = new StarWarsServices();

    componentDidMount() {
        console.log("CharList: Component mounted. Requesting initial page.");
        this.onRequest(this.state.offset);
    }

    onRequest = (offset) => {
        console.log(`CharList: Requesting page ${offset}`);
        if (offset === 1) {
            this.setState({ loading: true });
        } else {
            this.setState({ newItemLoading: true });
        }
        this.starWarsServices.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        });
    }

    onCharListLoaded = (data) => {
        console.log(`CharList: Received data for page ${this.state.offset}:`, data);
        const {results, next} = data;

        let ended = false;
        if (!next) {
            ended = true;
        }

        this.setState(({offset, charList}) => {
            const newCharListMap = new Map();
            charList.forEach(char => newCharListMap.set(char.id, char));
            // Фильтруем, если _transformPeople может вернуть null или ID
            results.filter(char => char !== null && char.id !== null).forEach(char => newCharListMap.set(char.id, char));
            const updatedCharList = Array.from(newCharListMap.values());

            return {
                charList: updatedCharList,
                loading: false,
                newItemLoading: false,
                offset: offset + 1,
                charEnded: ended
            };
        });
    }

    onError = () => {
        console.log("CharList: An error occurred during data fetch.");
        this.setState({
            error: true,
            loading: false,
            newItemLoading: false
        });
    }

    renderItems(arr) {
        if (arr.length === 0) return null;

        const { selectedCharId } = this.state;

        const items = arr.map((item) => {
            // --- Генерация URL изображения УБРАНА, так как API не предоставляет ---

            if (!item || !item.id) {
                console.error("CharList: Encountered item without valid ID:", item);
                return null;
            }

            const isSelected = item.id === selectedCharId;
            const itemClasses = `char__item ${isSelected ? 'char__item_selected' : ''}`;

            return (
                <li
                    className={itemClasses}
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.setState({ selectedCharId: item.id });
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            e.preventDefault();
                            this.props.onCharSelected(item.id);
                            this.setState({ selectedCharId: item.id });
                        }
                    }}
                        >
                        {/* Используем clone.jpg, так как API не дает изображений */}
                        <img src={clone} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                </li>
            );
        }).filter(item => item !== null);

        return items.length > 0 ? (
            <ul className='char__grid'>
                {items}
            </ul>
        ) : null;
    }

    render() {
        const { charList, loading, error, offset, newItemLoading, charEnded } = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || charList.length === 0) ? items : null;

        return (
            <div className='char__list'>
                {errorMessage}
                {spinner}
                {content}
                <button
                    className='button button__main button__long'
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className='inner'>load more</div>
                </button>
            </div>
        )
    }

    static propTypes = {
        onCharSelected: propTypes.func.isRequired
    }
}

export default CharList;