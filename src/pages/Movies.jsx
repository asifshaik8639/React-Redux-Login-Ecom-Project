import React, { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import {AUTHTOKEN, MOVIELIST, TMDBURL, TMDBIMAGEBASEPATH, OPTIONS} from '../utils/Constants';
import MovieTrailer from '../components/movies/MovieTrailer';
import ModalContainer from '../components/movies/ModalContainer';
import SearchBar from '../components/SearchBar';
import { usePaginationContext } from '../context/PaginationContextWrapper';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple, lightGreen, indigo } from '@mui/material/colors';



const Movies = () => {

  const [selectedOption, setSelectedOption] = useState('now_playing');
  const [moviesResponseList, setMoviesResponseList] = useState([]);
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const [searchText, setSearchText] = useState(null);

  let {
    isSideBarOpen,
    setSideBarOpen  } = usePaginationContext();


  const onMovieCategoryFilterHandler = (event) => {
    setSelectedOption(MOVIELIST[event.target.textContent]);
  };

  const selectedMovieOnClickHandler = (event, item) => {
    setSelectedMovieID(item.id);
  };

  useEffect(() => {

    setMoviesResponseList([]);     
      fetch(`${TMDBURL}/movie/${selectedOption}?language=en-US&page=1`, OPTIONS)
        .then(response => response.json())
        .then(response => {
            setMoviesResponseList(response.results);
        })
        .catch(err => console.error(err));
  }, [selectedOption]);

  useEffect(() => {
        setMoviesResponseList([]);
        if(!!searchText && searchText !== '') {
            fetch(`${TMDBURL}/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`, OPTIONS)
            .then(response => response.json())
            .then(response => {
                setMoviesResponseList(response.results);
            })
            .catch(err => console.error(err));
        }

  }, [searchText]);

  const onSearchTextChangeHandler = (searchText) => {
    setSearchText(searchText);
  };

  const onMenuClickHandler = (event) => {
    console.log('onMenuClickHandler isMenuOn', isSideBarOpen);
        if(isSideBarOpen) {
            setSideBarOpen(false);
        } else {
            setSideBarOpen(true);
        }
  };

  const onSortHandler = (event) => {

  };

  return (
    <>
        <SearchBar onSortHandler={onSortHandler}
                onMenuClickHandler={onMenuClickHandler}
            sendinputTextVal={(searchTextVal) => onSearchTextChangeHandler(searchTextVal.trim())}
        />
        <div className='flabel-container align-center-cls'>
            <h4>Movie Lists </h4>
            {
                Object.keys(MOVIELIST).map((item, index)=> {
                    return  <div key={`flabel`+index} 
                                    className='filter-label-cls'
                                    onClick={(e)=> onMovieCategoryFilterHandler(e)}
                                    >
                                {item}
                            </div>
                })
            }
        </div>
    
        <div className='movies-list-container-cls'>
            {
                moviesResponseList.length <= 0 ?
                <div key='filter-data' className='flabel-container '>
                {
                    (
                        // Display skeletons while data is loading
                        Array.from({ length: 6 }).map((_, index) => (
                            <div className='flex-item-cls'
                                key={`${index}flex-item`} >
                                <Skeleton key={index} variant="rectangular" width={200} 
                                height={300} style={{ margin: 10 }} />
                            </div>
                        ))
                    )
                }
                </div>
                :
                <div key='filter-data' className='flabel-container align-items-center'>
                    {
                        (moviesResponseList?.map((item, index)=> {
                            return  <div className='flex-item-cls movie-item-cls'
                                        key={`${index}flex-item`} 
                                        onClick={(e) => selectedMovieOnClickHandler(e, item)}>
                                        {
                                            item.poster_path !== null ?
                                            <img className='prod-img-cls' 
                                            key={`${index}image`} 
                                            src={`${TMDBIMAGEBASEPATH}${item.poster_path}`} />
                                            :
                                            <Avatar className='prod-img-cls' 
                                                    key={`${index}image`} 
                                                    sx={{ bgcolor: 'brown', width: 200, height:200 }}>Image Not available</Avatar>
                                        }
                                        <div className='prodcut-title-cls'
                                            key={`${index}title`} >
                                            {item.title}
                                        </div>
                                    </div>
                        }))
                    }
                </div>
            }
            {
                <ModalContainer selectedMovieID={selectedMovieID} />
            }
        </div>
    </>
    
  )
}

export default Movies;