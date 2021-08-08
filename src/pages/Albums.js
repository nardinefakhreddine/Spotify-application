import React, { useEffect, useState } from 'react';
import { Redirect ,Link , useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';

function Albums (props) {
    const [albums, setAlbums] = useState([]);
    let history = useHistory();
    const match = useRouteMatch('/:id');
    let artistID = match.params.id;;
    
   console.log("artistid:"+artistID);

    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            }).then((res) => {
                setAlbums(res.data);
                console.log(res.data.items);
            }).catch((err) => {
                
                    localStorage.removeItem('token');
                    history.push('/login')
            });
    }, [artistID]);

   

    return (
        <div className='row row-cols-auto ml-auto mr-auto mt-5'>
            {albums.items
                ? albums.items.map((album) => {

                      return (
                          <div
                              className='col-sm-6" ml-auto mr-auto mb-5'
                              key={album.id}
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
                                          album.images[0]
                                              ? album.images[0].url
                                              : null
                                      }
                                      alt='Artist'
                                      style={{ height: '18rem' }}
                                  />
                                  <div className='card-body'>
                                      <h5 className='card-title'>
                                          {album.name}
                                      </h5>
                                      <p
                                          className='card-text'
                                          style={{ fontSize: '0.8rem' }}
                                      >
                                          {album.artists.map((artist) => {
                                              return <>{artist.name}</>;
                                          })}
                                      </p>
                                      <p className='card-text'>
                                          {album.release_date}
                                      </p>
                                      <p className='card-text'>
                                          {album.total_tracks} tracks
                                      </p>
                                  </div>
                                  <div
                                      class='card-footer '
                                      style={{ textAlign: 'center' }}
                                  >
                                      <a
                                          href={album.external_urls.spotify}
                                          target='_blank'
                                          rel='noreferrer'
                                      >
                                          Preview on Spotify
                                      </a>
                                  </div>
                              </div>
                          </div>
                      );
                  })
                : null}
        </div>
    );
};

export default Albums;
