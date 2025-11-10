import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="/"> {/* Ссылка на главную страницу */}
                    <span>StarWars</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    {/* Заменил <a> на <button> и добавил onClick для примера */}
                    <li><button onClick={() => alert('Characters section')}>Characters</button></li>
                    <li><button onClick={() => alert('Comics section')}>Comics</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;