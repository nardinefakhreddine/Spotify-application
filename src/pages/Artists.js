import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ArtistsResult from '../components/ArtistsResult';
import { FaSearch } from "react-icons/fa";
  
function Artists  ()  {
    const [back, setBack] = useState(false);
    const [search, setSearch] = useState(null);
    const [artists, setArtists] = useState([]);
   
    const handleSearch = (e) => {
        setSearch(e.target.value);
        sessionStorage.setItem('search', e.target.value);
        searchA(e, search);
    };


    useEffect(() => {
        let savedSearch = sessionStorage.getItem('search');
        if (savedSearch) {
            setSearch(savedSearch);
            searchA(null, savedSearch);
        }
      
    }, []);

    if (back) return <Redirect to='/login' />;

   

    function searchA (e, searchParam){
        e?.preventDefault();
        axios
            .get(
                `https://api.spotify.com/v1/search?q=${searchParam}&type=artist`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            .then( (res) => {
                 setArtists(res.data.artists);
            })
            .catch((err) => {
                console.log(err.message);
                    sessionStorage.removeItem('token');
                    setBack(true);
                
            });
    };
  
    return (
        <div className=' artists-page-container'>
            <form onSubmit={searchA}>
                <div className='form-items'>
                    <div className='input-group'>
                        <input
                            type='search'
                            className='form-control form-control-lg'
                            placeholder='Search for an artist…'
                            onfocus="this.placeholder = ''"
                            onChange={(e) => handleSearch(e)}
                        />

                        < div type='submit' className='btn'>
                            <FaSearch className="search-button"/>
                        </div>
                    </div>
                </div>
            </form>

            <ArtistsResult artists={artists} />
        </div>
    );
};

export default Artists;
