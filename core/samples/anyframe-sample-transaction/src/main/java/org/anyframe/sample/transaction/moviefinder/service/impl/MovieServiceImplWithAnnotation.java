/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.sample.transaction.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.domain.Movie;
import org.anyframe.sample.exception.MovieException;
import org.anyframe.sample.transaction.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * This MovieServiceImpl class is an Implementation class to provide movie crud
 * functionality.
 * 
 * @author Sooyeon Park
 */

@Service("annotationMovieService")
//@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImplWithAnnotation implements MovieService {

	@Inject
	@Named("txMovieDao")
	private MovieDao movieDao;

	public void create(Movie movie) throws RuntimeException {
		movieDao.create(movie);
	}

	public void remove(String movieId) throws Exception {
		movieDao.remove(movieId);
	}

	public int update(Movie movie) throws RuntimeException {
		return movieDao.update(movie);
	}

	public Movie get(String movieId) throws Exception {
		return movieDao.get(movieId);
	}

	@Transactional(rollbackFor = { MovieException.class }, propagation = Propagation.REQUIRED)
	public void updateMovieList(Movie newMovie, Movie updateMovie)
			throws Exception {
		String movieName = "";

			movieName = newMovie.getTitle();
			create(newMovie);

			movieName = updateMovie.getTitle();
			int result = update(updateMovie);
			if (result <= 0) {
				throw new MovieException("fail to update with wrong movieid.");
			}
			throw new MovieException("are u ok?");


	}
}
