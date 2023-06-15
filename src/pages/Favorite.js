// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CharacterCard from '../components/CharacterCard';
import { connect } from 'react-redux';
import './Menu.css';
import { Link } from 'react-router-dom';

class Favorite extends Component {
  render() {
    const { favorites } = this.props;
    
    return (
      <div className='box'>
        <Link to='/menu'>Menu</Link>
        <h1>Favoritos</h1>
        <div className="menu-container">
        { (favorites.length === 0) ? (
          <p>Nenhum Favorito</p>
        ) : (
            favorites.map((character) => (
              <CharacterCard
                key={ character.id }
                image={ character.image }
                name={ character.name }
                id={ character.id }
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favorites: state.data.favorites,
})

export default connect(mapStateToProps)(Favorite);