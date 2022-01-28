/* eslint-disable */
const true_username = powercord.pluginManager.get("DiscordFm").settings.get("accountname")
const TopTracks = async (args) => {
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
    let limit = 10;
    let toptracksapi = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=${limit}&page=${page}&format=json`);
    toptracksapi = await toptracksapi.json();
    let total_pages = toptracksapi.toptracks["@attr"].totalPages
    let toptracks = toptracksapi.toptracks["track"];
    let track_play_time;
        for (let i = 1; i < 11; i++) {
            let track_user_plays = toptracks[i-1].playcount
            let track_duration = toptracks[i-1].duration
            track_play_time = track_duration/3600;
            if (track_play_time*track_user_plays > 1){
                track_play_time = track_play_time*track_user_plays
                track_play_time = ` [${track_play_time.toFixed(1)}hrs]`
              } else{
                track_play_time = ""
              }
          item = `${toptracks[i-1]["@attr"].rank}. ${toptracks[i-1].name} - ${toptracks[i-1].artist.name} [${toptracks[i-1].playcount}]${track_play_time}`
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
      // setTimeout(nextpage = () =>{
    //     let get_embeds = document.getElementsByClassName("embedFull-2tM8--")
    //     for (const i in get_embeds) {
    //       if (get_embeds[i].style.cssText == "border-color: hsl(352, calc(var(--saturation-factor, 1) * 61.1%), 51.6%);"){
    //         let embed = get_embeds[i]
    //         let onclick = `TopTracks(${parseInt(page)+1})`;
    //         if (embed.id !== "nextembed"){
    //         let nextbtn = document.createElement("div");
    //         let nextbtnclass = document.createAttribute("class");
    //         let next_embed = document.createAttribute("id")
    //         next_embed.value = "nextembed";
    //         nextbtnclass.value = "nextbtn";
    //         nextbtn.setAttributeNode(nextbtnclass);
    //         embed.appendChild(nextbtn);
    //         embed.setAttributeNode(next_embed)
    //         nextbtn.addEventListener("click", async () =>{
    //           console.log("hi")
    //           return TopTracks()
    //         }) 
    //     }
    //   }
    // }
    // },0)
      return {
        result: {
          type: "rich",
          provider: {
            name: `Top Tracks`,
            url: ""
          },
          author: {
            // name: `last.fm/user/${username}/library`,
            // url: `https://www.last.fm/user/${username}/library/tracks?page=${Math.floor(page / 5)}`
          },
          description: `${item0}\n${item1}\n${item2}\n${item3}\n${item4}\n${item5}\n${item6}\n${item7}\n${item8}\n${item9}`,
          color: 13581064,
          footer: {
            text: `Page ${page} of ${total_pages-1}`
          }
        },
    }
}
module.exports = { TopTracks }