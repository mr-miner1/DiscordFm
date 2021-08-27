/* eslint-disable */
const TopAlbums = async (args) =>{
  const true_username = powercord.pluginManager.get("DiscordFm").settings.get("accountname")
  const bgimage = powercord.pluginManager.get("DiscordFm").settings.get("BackgroundImage")
  let page;
  let username;
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
    let topalbumsapi = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&page=${page}&limit=${limit}&format=json`);
    topalbumsapi = await topalbumsapi.json();
    console.log(topalbumsapi)
    let total_pages = topalbumsapi.topalbums["@attr"].totalPages
    let topalbums = topalbumsapi.topalbums.album;
    let album_image
        for (let i = 1; i < 11; i++) {
            // console.log(topalbums)
            album_image =  topalbums[(Math.random()*9).toFixed(0)].image[2]["#text"]
          item = `${topalbums[i-1]["@attr"].rank}. ${topalbums[i-1].name} - ${topalbums[i-1].artist.name} [${topalbums[i-1].playcount}]`
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
            name: `Top Albums`,
            url: `https://www.last.fm/user/${username}/library/albums`
          },
          author: {
            // name: `last.fm/user/${username}/library`,
            // url: `https://www.last.fm/user/${username}/library/albums?page=${Math.floor(page / 5)}`
          },
          description: `${item0}\n${item1}\n${item2}\n${item3}\n${item4}\n${item5}\n${item6}\n${item7}\n${item8}\n${item9}`,
          color: 13580864,
          footer: {
            text: `Page ${page} of ${total_pages-1}`
          },
          thumbnail: { url: album_image, height: thumbnail_size, width: thumbnail_size },
          image: { url: album_image, height: image_size, width: image_size }
        },
    }
}
module.exports = { TopAlbums }