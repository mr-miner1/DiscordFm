/* eslint-disable */
const Streak = async (username) => {
    const true_username = powercord.pluginManager.get("DiscordFm").settings.get("accountname")
    const layout = powercord.pluginManager.get("DiscordFm").settings.get("Layout")
    const bgimage = powercord.pluginManager.get("DiscordFm").settings.get("BackgroundImage")
    if (username[0] == undefined){
        username = true_username;
    }
    let recenttracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=1000&format=json`);
    recenttracks = await recenttracks.json();
    recenttracks = recenttracks["recenttracks"];
    if (recenttracks == undefined){
        return{result:'**Invalid Usernamer Error!**\nUsername"'+username+'"was not found!\n||if you feel this is an bug please contact mr_miner#6969||'}
    }
    recenttracks = recenttracks["track"];
    if (bgimage == false){
        image_size = 0
        thumbnail_size = 100
      }else{
        image_size = 100
        thumbnail_size = 0
      }
    let track_name
    let album_name
    let artist_name
    let track_image
    let track_url
    let tstop = false
    let alstop = false
    let arstop = false
    let currenttrack = recenttracks[0];
    let currenttrack_name = currenttrack.name
    let currenttrack_artist = currenttrack.artist["#text"] 
    let currenttrack_album = currenttrack.album["#text"]
    let track_streak = 0
    let album_streak = 0
    let artist_streak = 0
    for (const i in recenttracks) {
        if (currenttrack_name == recenttracks[i].name){
            track_streak +=1
            track_name = recenttracks[i].name
            track_image = recenttracks[i].image[3]["#text"]
            track_url = recenttracks[i].url
        }else{
            tstop = true;
        }if (currenttrack_album == recenttracks[i].album["#text"]){
            album_streak +=1
            album_name = recenttracks[i].album["#text"]
        }else{
            alstop = true;
        }if (currenttrack_artist == recenttracks[i].artist["#text"]){
            artist_streak +=1
            artist_name = recenttracks[i].artist["#text"]
        }else{
            arstop = true;
        }
        if (tstop == true && alstop == true && arstop == true){
            if (layout == "compact"){
                return {
                  result: {
                    type: "rich",
                    provider: {
                      name: `Streak`,
                      url:`https://last.fm/user/${username}/library`
                    },
                    author: {
                      name: `${track_name} - ${track_streak}`,
                      url: track_url
                    },
                    title: `${artist_name} - ${artist_streak}`,
                    description: `${album_name} - ${album_streak}`,
                    color:13587355,
            
                    image:{url: track_image, height: image_size, width: image_size},
                    thumbnail: {url: track_image, height: thumbnail_size, width: thumbnail_size},
                  },
                }
            } else if  (layout == "cozy"){
                return {
                  result: {
                    type: "rich",
                    provider: {
                        name: `Streak`,
                        url:`https://last.fm/user/${username}/library`
                    },
                    fields:[{
                      name: `${track_name}`,
                      value:`${track_streak} Streak Plays`,
                      inline:false
                    },
                    {
                      name: `${album_name}`,
                      value:`${album_streak} Streak Plays`,
                      inline:true
                    },
                    {
                      name: `${artist_name}`,
                      value:`${artist_streak} Streak Plays`,
                      inline:false
                    }
                  ],
                    color:13587355,
                    image:{url:track_image, height: image_size, width: image_size},
                    thumbnail: {url: track_image, height: thumbnail_size, width: thumbnail_size},
                  },
                }
            break
            }
        }
    }
}
module.exports = { Streak } 