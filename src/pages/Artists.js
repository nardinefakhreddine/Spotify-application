import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect , useHistory } from 'react-router-dom';
import ArtistsResult from '../components/ArtistsResult';
import { FaSearch } from "react-icons/fa";
  
function Artists  ()  {
    let history = useHistory();
    const [search, setSearch] = useState(null);
    const [artists, setArtists] = useState([]);
   
    const handleSearch = (e) => {
        setSearch(e.target.value);
        localStorage.setItem('search', e.target.value);
        searchA(e, search);
    };


    useEffect(() => {
        let savedSearch = localStorage.getItem('search');
        if (savedSearch) {
            setSearch(savedSearch);
            searchA(null, savedSearch);
        }
      
    }, []);

   
   

    function searchA (e, searchParam){
        e?.preventDefault();
        axios
            .get(
                `https://api.spotify.com/v1/search?q=${searchParam}&type=artist`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then( (res) => {
                setArtists(res.data.artists);
                console.log(artists);
            })
            .catch((err) => {
                console.log(err.message);

                if (err.message.includes('401')) {
                    localStorage.removeItem('token');
                    history.push('/login')
                }
                    
                   
                
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
                            placeholder='Search for an artist???'
                           
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
