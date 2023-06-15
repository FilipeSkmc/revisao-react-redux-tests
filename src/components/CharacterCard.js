import React, { Component } from 'react'
import './CharacterCard.css';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions';

class CharacterCard extends Component {
  state = {
    isChecked: false,
  }

  handleClick = (checked) => {
    const { name, id, image, dispatch } = this.props;
    
    if (!checked) {
      dispatch(addFavorite({ name, id, image }));
    } else {
      dispatch(removeFavorite({ name, id, image }));
    }
  }

  render() {
    const { image, name, id, favorites } = this.props;
    const checked = favorites.some((fav) => fav.id === id)
    
    return (
      <section className="cartoon-card">
        <img src={image} alt={name} className="cartoon-card__image" />
        <h2 className="cartoon-card__name">{name}</h2>
        <button
          onClick={ () => this.handleClick(checked) }
        >
          { checked ? 'Desfavoritar' : 'Favoritar' }
        </button>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  favorites: state.data.favorites,
})

export default connect(mapStateToProps)(CharacterCard);