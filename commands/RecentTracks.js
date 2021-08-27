/* eslint-disable */
const RecentTracks = async (args) =>{
  const true_username = powercord.pluginManager.get("DiscordFm").settings.get("accountname")
  const bgimage = powercord.pluginManager.get("DiscordFm").settings.get("BackgroundImage")
  let page;
  let username;
  let image_size;
  let thumbnail_size;
  if (args[0] == null && args[0] != parseInt(args[0])){
    page = "1";
    username = true_username
  }else if (args[1] != null && args[0] == parseInt(args[0])){
    page = args[0]
    username = args[1]
  }else if (args[0] != null && args[1] == null && args[0] == parseInt(args[0])){
    page = args[0]
    username = true_username
  }else if (args[0] != parseInt(args[0])){
    page = "1"
    username = args[0]
  }
  if (bgimage == false){
    image_size = 0
    thumbnail_size = 100
  }else{
    image_size = 100
    thumbnail_size = 0
  }
  let limit = 10;
  let item;
  let item0;
  let item1;
  let item2;
  let item3;
  let item4;
  let item5;
  let item6;
  let item7;
  let item8;
  let item9;
  let recenttracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=${limit}&page=${page}&format=json`);
  recenttracks = await recenttracks.json();
  recenttracks = recenttracks["recenttracks"];
  let total_pages = recenttracks["@attr"].totalPages
  recenttracks = recenttracks["track"];
  let track_when
    for (let i = 1; i < 11; i++) {
      track_image =  recenttracks[(Math.random()*9).toFixed(0)].image[2]["#text"]
      track_when = recenttracks[0].date["#text"]
      track_when = track_when.split(",")
      track_when = track_when[0]
      item = `${i}. ${recenttracks[i-1].name} - ${recenttracks[i-1].artist["#text"]}`
      if (i == 1){
        item0 = item
      } else if (i == 2){
        item1 = item
      }else if (i == 3){
        item2 = item
      }else if (i == 4){
        item3 = item
      }else if (i == 5){
        item4 = item
      } else if (i == 6){
        item5 = item
      }else if (i == 7){
        item6 = item
      }else if (i == 8){
        item7 = item
      }else if (i == 9){
        item8 = item
      } else if (i == 10){
        item9 = item
        break
      }
  }
  return {
    result: {
      type: "rich",
      provider: {
        name: `Recent Tracks`,
        url:`https://last.fm/user/${username}/library/tracks`
      },
      image:{url:track_image, height: image_size, width: image_size},
      thumbnail: {url: track_image, height: thumbnail_size, width: thumbnail_size},
      description: `${item0}\n${item1}\n${item2}\n${item3}\n${item4}\n${item5}\n${item6}\n${item7}\n${item8}\n${item9}`,
      color: 13580364,
      footer: {
        text: `Page ${page} of ${total_pages-1} • ${track_when}`
      }
    },
  }
}
module.exports = { RecentTracks }