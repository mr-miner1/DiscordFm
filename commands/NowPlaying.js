/* eslint-disable */
const NowPlaying = async (username) =>{
  const true_username = powercord.pluginManager.get("DiscordFm").settings.get("accountname")
  const layout = powercord.pluginManager.get("DiscordFm").settings.get("Layout")
  const bgimage = powercord.pluginManager.get("DiscordFm").settings.get("BackgroundImage")
  console.log("[owo]" + this.entityID)
  let time = 0;
  setInterval(() =>{time= time+=0.1},100)
    if (username[0] == undefined){
      username = true_username;
    }
    let recenttracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&format=json`);
    recenttracks = await recenttracks.json();
    recenttracks = recenttracks["recenttracks"].track;
    let currenttrack = recenttracks[0];
    let currenttrack_artist = currenttrack.artist["#text"];
    let currenttrack_album = currenttrack.album["#text"];
    let currenttrack_name = currenttrack.name;
    let current_image = currenttrack.image[2]["#text"];
    let image_size;
    let thumbnail_size;
    if (bgimage == false){
      image_size = 0
      thumbnail_size = 100
    }else{
      image_size = 100
      thumbnail_size = 0
    }
    let track_info = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=b37f440eb014ba5804a5ebf3027447ec&artist=${currenttrack_artist}&username=${username}&track=${currenttrack_name}&format=json`);
    track_info = await track_info.json();
    let track_url = track_info.track.url
    let artist_url = track_info.track.artist["url"];
    let track_user_plays = track_info.track["userplaycount"];
    let track_total_plays = track_info.track["playcount"];
    let track_play_percent = track_user_plays / track_total_plays * 100
    let track_loved = track_info.track.userloved;
    let track_duration = track_info.track.duration
    let track_play_time = track_duration/3600000;
    if (track_play_time*track_user_plays > 1){
      let number = layout == "cozy" ? 0 : 1
      track_play_time = track_play_time*track_user_plays
      track_play_time = ` | ${track_play_time.toFixed(number)}hrs`
    } else{
      track_play_time = ""
    }
    track_play_percent = ` | ${track_play_percent.toFixed(1)}%`
    if (track_play_percent == ` | 0.0%`){
      track_play_percent = ``
    }
    if (track_loved == 1){
      track_loved = "🤍 ";
    } else{
      track_loved = "";
    }
    console.log("Command took",time.toFixed(1),"to execute")
    if (layout == "compact"){
    return {
      result: {
        type: "rich",
        provider: {
          name: `Now Playing`,
          url:`https://last.fm/user/${username}/library`
        },
        author: {
          name: currenttrack_name,
          url: track_url
        },
        title: `by ${currenttrack_artist}`,
        url: artist_url,
        description: `on ${currenttrack_album}`,
        color:13580355,

        image:{url:current_image, height: image_size, width: image_size},
        thumbnail: {url: current_image, height: thumbnail_size, width: thumbnail_size},
        footer: {
          text: `${track_loved}${track_user_plays} Plays | ${track_total_plays} Total Plays${track_play_percent}${track_play_time}`,
        },
      },
    }
  } else if  (layout == "cozy"){
    return {
      result: {
        type: "rich",
        fields:[{
          name: `Song`,
          value:`[${currenttrack_name}](${track_url})`,
          inline:false
        },
        {
          name: `Album`,
          value:`${currenttrack_album}`,
          inline:true
        },
        {
          name: `Artist`,
          value:`[${currenttrack_artist}](${artist_url})`,
          inline:false
        }
      ],
        color:13580355,
        image:{url:current_image, height: image_size, width: image_size},
        thumbnail: {url: current_image, height: thumbnail_size, width: thumbnail_size},
        footer: {
          text: `${track_loved}${track_user_plays} Plays | ${track_total_plays} Total Plays${track_play_time}`,
        },
      },
    }
  }
};
  module.exports = { NowPlaying } 



//   let geniusapi = await fetch(`https://api.genius.com/search?q=${currenttrack_name}&access_token=JKrnckDfcL0OfjTNXTSd42KU5ccoFScFRc2pz94PVPaf9aaLchyQA3VU4TidiSp2`)
//     geniusapi = await geniusapi.json()
//     genius_title = geniusapi.response.hits[0].result.title
//     genius_url = `/${currenttrack_artist.split(" ").join("-")}-${currenttrack_name.split(" ").join("-")}-lyrics`
//     setTimeout(buttonbuilder = () =>{
//     let get_embeds = document.getElementsByClassName("embedFull-2tM8--")
//     for (const i in get_embeds) {
//       if (get_embeds[i].style.cssText == "border-color: hsl(0, calc(var(--saturation-factor, 1) * 61.1%), 51.6%);"){
//         let embed = get_embeds[i]
//         if (embed.id !== "lyricembed"){
//         let lyricsbtn = document.createElement("a");
//         let lyricsbtnclass = document.createAttribute("class");
//         let lyricsbtnlink = document.createAttribute("href")
//         let target = document.createAttribute("target")
//         let lyric_embed = document.createAttribute("id")
//         lyric_embed.value = "lyricembed";
//         lyricsbtnclass.value = "lyricsbtn";
//         lyricsbtnlink.value = `https://genius.com${genius_url}`
//         target.value = "_blank"
//           console.log(lyricsbtn, lyricsbtn.classList, lyricsbtn.className)
//             lyricsbtn.setAttributeNode(lyricsbtnclass);
//             lyricsbtn.setAttributeNode(lyricsbtnlink);
//             lyricsbtn.setAttributeNode(target)
//             embed.appendChild(lyricsbtn);
//             embed.setAttributeNode(lyric_embed)
//     } 
//   }
// }
// },0)