export const AUTHTOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTI0ODNmODE3MTA3ZDFmZDYyYTk2NzBmMTAwMjhiYSIsInN1YiI6IjY1ZDRhMzRlMjNkMjc4MDE3Y2Y0Yzk5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NMp9vedRYPPMpLFyTqWHXgLS2g1Fq-oLaZhOoVQdTgw';
export const MOVIELIST = {'Now Playing' : 'now_playing', 'Popular' : 'popular', 'Top Rated' : 'top_rated', 'Upcoming': 'upcoming' };
export const TMDBURL = 'https://api.themoviedb.org/3';
export const TMDBIMAGEBASEPATH = 'https://image.tmdb.org/t/p/w500/';
export const OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTHTOKEN
    }
  };
export const LOGINFAILED = 'Login failed, please try again after some time';

export const CDN_IMAGE_URL = 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/splash/intro.png';

export const QR_CODE_ALT_NOTE = 'If you are facing any issues with the OTP, as an alternate you can scan the below QRCode to get the OTP to login.';

export const RAZOR_PAY_KEY_ID = 'rzp_test_7Ki2UaYoN5vrSk';

export const PAYMENT_IN_CURRENCY = 'INR';

export const PAYMENT_PREFILL_DATA = {
  NAME: 'Asif Shaik',
  EMAIL: 'asif.testshaik@gmail.com'
}

export const VOICE_COMMAND_NOT_MATCH = 'voice command not recognized. Please say Go to Shopping or Go to Checkout';

export const VOICE_COMMAND_CHECKOUT = 'Going to Checkout';

export const VOICE_COMMAND_SHOPPING = 'Going to Shopping';

