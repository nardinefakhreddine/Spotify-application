import React from 'react';
import { Link } from 'react-router-dom';

function ArtistsResult  ({ artists }){
    return (
        <div className="artists-container">
            {artists.items
                ? artists.items.map((artist) => {
                      // console.log(artist);

                    const stars = parseInt(artist.popularity / 20);
                    console.log(artist.popularity);

                      return (
                          <div
                              className='col-sm-6" ml-auto mr-auto mb-5 artist'
                              style={{ cursor: 'pointer' }}
                              key={artist.id}
                          >
                              <Link style={{textDecoration:'none'}}
                                  to={{
                                      pathname: `/${artist.id}`,
                                      state: {
                                          artist: artist,
                                      },
                                  }}
                              >
                                  <div
                                      className='card'
                                      style={{
                                          maxWidth: '20rem',
                                          minWidth: '20rem',
                                      }}
                                  >
                                      <img
                                          className='card-img-top'
                                          src={
                                              artist.images[0]
                                                  ? artist.images[0].url
                                                  : null
                                          }
                                          alt='Artist'
                                          style={{ height: '18rem' }}
                                      />
                                      <div className='card-body'>
                                          <h5 className='card-title'>
                                              {artist.name}
                                          </h5>
                                          <p className='card-text'>
                                              {artist.followers.total} followers
                                          </p>
                                          <p
                                              className='card-text'
                                              style={{ fontSize: '1.5rem' }}
                                          >
                                              {'★'.repeat(stars) +
                                                  '☆'.repeat(5 - stars)}
                                          </p>
                                      </div>
                                  </div>
                              </Link>
                          </div>
                      );
                  })
                : null}
        </div>
    );
};

export default ArtistsResult;
