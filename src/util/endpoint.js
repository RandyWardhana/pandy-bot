const AnimeSearch = (uri) => {
  return encodeURI(`${process.env.MYANIMELIST_URI}/search/anime?q=${uri.join(' ')}&limit=1`)
}

const CovidSearch = (country, todayDate) => {
  return encodeURI(`${process.env.COVID_URI}/country/${country}/status/Confirmed/date/${todayDate}`)
}

const GifSearch = (uri) => {
  return encodeURI(`${process.env.TENOR_URI}/search?q=${uri.join(' ')}&limit=1&random=1&key=${process.env.TENOR_API_KEY}`)
}

const MangaSearch = (uri) => {
  return encodeURI(`${process.env.MYANIMELIST_URI}/search/manga?q=${uri.join(' ')}&limit=1`)
}

const SeiyuuSearch = (uri) => {
  return encodeURI(`${process.env.MYANIMELIST_URI}/search/people?q=${uri.join(' ')}&limit=1`)
}

const VtuberSearch = (uri) => {
  return encodeURI(`${process.env.VTUBER_URI}/Search/List?query=${uri.join(' ')}&limit=1`)
}

const VtuberAvatar = (id) => {
  return encodeURI(`${process.env.VTUBER_URI}/Articles/Details?ids=${id}`)
}

const VtuberDetail = (id) => {
  return encodeURI(`${process.env.VTUBER_URI}/Articles/AsSimpleJson?id=${id}`)
}

const WaifuSearch = (uri) => {
  return encodeURI(`${process.env.MYANIMELIST_URI}/search/character?q=${uri.join(' ')}&limit=1`)
}

const YoutubeSearch = (uri) => {
  return encodeURI(`${process.env.YOUTUBE_URI}/search?part=snippet&maxResult=1&order=relevance&q=${uri.join(' ')}&type=channel&key=${process.env.YOUTUBE_API_KEY}`)
}

const YoutubeDetail = (channelId) => {
  return encodeURI(`${process.env.YOUTUBE_URI}/channels?part=snippet,statistics&key=${process.env.YOUTUBE_API_KEY}&id=${channelId}`)
}

export { 
  AnimeSearch, CovidSearch, GifSearch, MangaSearch, SeiyuuSearch,
  VtuberSearch, VtuberAvatar, VtuberDetail, WaifuSearch, YoutubeSearch,
  YoutubeDetail
 }