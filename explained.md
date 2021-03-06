# Introducing, LIRI

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.



### LIRI Commands

LIRI can take the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Does

1. `node liri.js concert-this <artist/band name here>`

![Concert This](/screenshots/concert-this)

   * This searches the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

![Spotify This](/screenshots/spotify-this-song)

   * This shows the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then we default to "The Sign" by Harry Styles.

3. `node liri.js movie-this '<movie name here>'`

![Movie This](/screenshots/movie-this)

   * This outputs the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, we output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`

![Do What It Says](/screenshots/do-what-it-says)

   * Using the `fs` Node package, LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands.
