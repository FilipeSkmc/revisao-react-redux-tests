import React, { Component } from 'react';
import Loading from '../components/Loading';
import CharacterCard from '../components/CharacterCard';
import { Link } from 'react-router-dom';
import './Menu.css';
import { connect } from 'react-redux';
import { fetchCharactersForAdd } from '../redux/actions';

class Menu extends Component {
  componentDidMount() {    
    const { dispatch } = this.props;
    dispatch(fetchCharactersForAdd());
  }

  render() {
    const { characters } = this.props;

    if (characters.length === 0) return <div className="box"><Loading /></div>;
    

    return (
      <div className='box'>
        <Link to='/favorites'>Favorites</Link>
        <h1>Personagens</h1>
        <div className="menu-container">
        { characters.map((character) => (
            <CharacterCard
              key={ character.id }
              image={ character.image }
              name={ character.name }
              id={ character.id }
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  characters: state.data.characters,
  favorites: state.data.favorites,
})

export default connect(mapStateToProps)(Menu);