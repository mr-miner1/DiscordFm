/* eslint-disable */
let page = 1;
const TrackInfo = async (args) => {
  const username = powercord.pluginManager.get("DiscordFm").settings.get("accountname")
  const layout = powercord.pluginManager.get("DiscordFm").settings.get("Layout")
  const bgimage = powercord.pluginManager.get("DiscordFm").settings.get("BackgroundImage")
  let time = 0;
  setInterval(() =>{time= time+=0.1},100)
  let genius_url;
  let genius_title;
  let image_size
  let thumbnail_size
  const buttonbuilder = () =>{
    setTimeout(() =>{
      let get_embeds = document.getElementsByClassName("embedFull-2tM8--")
      for (const i in get_embeds) {
        if (get_embeds[i].style.cssText == "border-color: hsl(340, calc(var(--saturation-factor, 1) * 61.1%), 51.6%);"){
          let embed = get_embeds[i]
          if (embed.id !== "lyricembed"){
          let lyricsbtn = document.createElement("a");
          let lyricsbtnclass = document.createAttribute("class");
          let lyricsbtnlink = document.createAttribute("href")
          let target = document.createAttribute("target")
          let lyric_embed = document.createAttribute("id")
          lyric_embed.value = "lyricembed";
          lyricsbtnclass.value = "lyricsbtn";
          lyricsbtnlink.value = `https://genius.com${genius_url}`
          target.value = "_blank"
              lyricsbtn.setAttributeNode(lyricsbtnclass);
              lyricsbtn.setAttributeNode(lyricsbtnlink);
              lyricsbtn.setAttributeNode(target)
              embed.appendChild(lyricsbtn);
              embed.setAttributeNode(lyric_embed)
      } 
    }
  }
  },0)
  }
  if (bgimage == false){
    image_size = 0
    thumbnail_size = 100
  }else{
    image_size = 100
    thumbnail_size = 0
  }


  let track_name;
  let artist_name
    let track_last_played;
    // if no track or artist is mentioned give info about current track
    if (args == ""){
      //get current track
    let recenttracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&format=json`);
    recenttracks = await recenttracks.json();
    recenttracks = recenttracks["recenttracks"];
    recenttracks = recenttracks["track"];
    let currenttrack = recenttracks[0];
    let currenttrack_artist = currenttrack.artist["#text"];
    track_name = currenttrack
    artist_name = currenttrack_artist
    let currenttrack_album = currenttrack.album["#text"];
    let currenttrack_name = currenttrack.name;
    let current_image = currenttrack.image[2]["#text"];
    if (currenttrack["@attr"] !== undefined){
      track_last_played = "Currently Playing";
    } else{
      track_last_played = currenttrack.date["#text"]
      track_last_played = track_last_played.split(",")
      track_last_played = track_last_played[0]
    }
  
    //get information on track
    let track_info = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=b37f440eb014ba5804a5ebf3027447ec&artist=${currenttrack_artist}&username=${username}&track=${currenttrack_name}&format=json`);
    track_info = await track_info.json();
    let track_url = track_info.track.url
    let artist_url = track_info.track.artist["url"];
    let track_user_plays = track_info.track["userplaycount"];
    let track_total_plays = track_info.track["playcount"];
    let track_play_percent = track_user_plays / track_total_plays * 100
    let track_loved = track_info.track["userloved"];
    let track_duration = track_info.track.duration
    let track_play_time;
    track_play_time = track_duration/3600000;
    if (track_play_time*track_user_plays > 1){
      track_play_time = track_play_time*track_user_plays
      track_play_time = ` | ${track_play_time.toFixed(1)}hrs`
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
  
  
    // Get scrobbles and rank
    let toptracksapi = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=${1000}&format=json`);
    page = 1;
    toptracksapi = await toptracksapi.json();
    let toptrackz = toptracksapi.toptracks.track;
    total_tracks = toptracksapi.toptracks["@attr"].total;
    let top_total_pages = toptracksapi.toptracks["@attr"].totalPages
    let toptrack_rank;
    for (let i = 0; i < total_tracks; i++) {
      let toptrack_number = toptrackz[i]["@attr"].rank;
      if (toptrack_number < 1000){
      let toptrack_name = toptrackz[i].name;
      if (toptrack_name.toLowerCase() == track_name.name.toLowerCase()){
        toptrack_rank = toptrackz[i]["@attr"].rank;
        break
      } 
    } else if (i == page*1000 && top_total_pages > page){
        // console.log("ran")
        page+=1;
        let stop = false;
        toptracksapi = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=${1000}&page=${page}&format=json`);
        toptracksapi = await toptracksapi.json();
        for (let i = 0; i < total_tracks - 1000; i++) {
            toptrackz = toptracksapi.toptracks.track;
            toptrack_number = toptrackz[i];
            if (toptrack_number !== undefined){
            toptrack_name = toptrack_number.name;
            // console.log(toptrack_number.name)
            if (toptrack_name.toLowerCase() == track_name.toLowerCase()){
              toptrack_rank = toptrack_number["@attr"].rank;
              // console.log("found!")
              stop = true;
            }
          } else if (stop == true){
            break
          }
        }
        if (stop == true){
          break
        }
      }
    }
  let geniusapi = await fetch(`https://api.genius.com/search?q=${track_name.name}&access_token=JKrnckDfcL0OfjTNXTSd42KU5ccoFScFRc2pz94PVPaf9aaLchyQA3VU4TidiSp2`)
  geniusapi = await geniusapi.json()
  genius_title = geniusapi.response.hits[0].result.title
  genius_url = `/${artist_name.split(" ").join("-")}-${track_name.name.split(" ").join("-")}-lyrics`
  buttonbuilder()
  
    //embed
    console.log("command took",time.toFixed(1),"s to execute")
    if ( layout == "compact"){
    return {
      result: {
        type: "rich",
        provider: {
          name: `${track_last_played}`,
        },
        author: {
          name: currenttrack_name,
          url: track_url
        },
        title: `by ${currenttrack_artist}`,
        url: artist_url,
        description: `on ${currenttrack_album}\n#${toptrack_rank} out of ${total_tracks} songs`,
        color:13580394,
        thumbnail: { url: current_image, height: thumbnail_size, width: thumbnail_size },
        image: {url: current_image, height: image_size, width: image_size},
        footer: {
          text: `${track_loved}${track_user_plays} Plays | ${track_total_plays} Total Plays${track_play_percent}${track_play_time}`,
        }, 
      },
    }
  } else if (layout == "cozy"){
    return{
      result: {
        type: "rich",
        provider: {
          name: `${track_last_played}`,
        },
        color:13580394,
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
        },
        {
          value: `#${toptrack_rank} out of ${total_tracks} songs`,
          inline: true
        }
      ],
        thumbnail: { url: current_image, height: thumbnail_size, width: thumbnail_size },
        image: {url: current_image, height: image_size, width: image_size},
        footer: {
          text: `${track_loved}${track_user_plays} Plays | ${track_total_plays} Total Plays${track_play_percent}${track_play_time}`,
        },
      },
    }
  }
}
    //if arguements are given:
    
    
  
    
    else{
      //seperate artist and song name
      let argsdash = false;
      track_name = [];
      artist_name = [];
      for (let i in args) {
      if (argsdash == false && args[i] !== "-"){
        track_name.push(args[i])
      } else if (args[i] == "-"){
        argsdash = true;
      }else if (argsdash == true){
        artist_name.push(args[i])
      }}
      let genius_track_name = track_name.join("-")
      let genius_artist_name = artist_name.join("-")
      track_name = track_name.join(" ")
      artist_name = artist_name.join(" ")
      //get track information
      let track_url
      let artist_url
      let track_image;
      let track_album;
      let track_user_plays;
      let track_total_plays
      let track_play_percent;
      let track_loved;
      let toptrack_rank;
      let total_tracks;
      let track_play_time;
      if (track_name !== undefined && artist_name !== undefined){
        let track_info = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=b37f440eb014ba5804a5ebf3027447ec&artist=${artist_name}&username=${username}&track=${track_name}&format=json`);
        track_info = await track_info.json();
        if (track_info.track == undefined){
          return{
            result: `**Invalid Song Error!**\nthe song or the artist or the syntax is entered was wrong\nplease check that your meant to enter "${track_name} - ${artist_name}"\nthe correct syntax is **.TrackInfo SONG_NAME - ARTIST_NAME**\n||if you feel this is an bug please contact mr_miner#6969||`
          }
        } 
        track_url = track_info.track.url
        artist_url = track_info.track.artist.url;
        track_user_plays = track_info.track.userplaycount;
        track_total_plays = track_info.track.playcount;
        track_play_percent = track_user_plays / track_total_plays * 100
        let track_duration = track_info.track.duration
        track_play_time = track_duration/3600000;
        if (track_play_time*track_user_plays > 1){
          track_play_time = track_play_time*track_user_plays
          track_play_time = ` | ${track_play_time.toFixed(1)}hrs`
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
  
  
  
        //get track plays and rank
        let toptracksapi = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=${1000}&format=json`);
        page = 1;
        toptracksapi = await toptracksapi.json();
        let toptrackz = toptracksapi.toptracks.track;
        total_tracks = toptracksapi.toptracks["@attr"].total;
        let top_total_pages = toptracksapi.toptracks["@attr"].totalPages
        for (let i = 0; i <= total_tracks; i++) {
          let toptrack_number;
          if (i < 1000){
          toptrack_number = toptrackz[i];
          // console.log(toptrack_number)
          if (toptrack_number == undefined){

          }
          let toptrack_name = toptrack_number.name;
          if (toptrack_name.toLowerCase() == track_name.toLowerCase()){
            toptrack_rank = toptrack_number["@attr"].rank;
            break
          } 
          // console.log(i == page*1000)
        } else if (top_total_pages >= page){
          // console.log("ran")
            page+=1;
            let stop = false;
            toptracksapi = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=${1000}&page=${page}&format=json`);
            toptracksapi = await toptracksapi.json();
            toptrackz = toptracksapi.toptracks.track;
            for (let i = 0; i < total_tracks; i++) {
                toptrack_number = toptrackz[i];
                // console.log(toptrack_number)
                if (toptrack_number !== undefined){
                toptrack_name = toptrack_number.name;
                // console.log(toptrack_rank, toptrack_name)
                if (toptrack_name.toLowerCase() == track_name.toLowerCase()){
                  toptrack_rank = toptrack_number["@attr"].rank;
                  stop = true;
                  // console.log(toptrack_rank, toptrack_name, i)
                }
              } else if (stop == true){
                page = 1
                // console.log(i, page)
                break
              }
            }
            if (stop == true){
              page = 1
              break
            }
          }
        }
  
  
  
          //get track album and image
          
          //if track is found on page one
          page = 1;
          let recenttracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=${200}&format=json`);
          recenttracks = await recenttracks.json();
          recenttracks = recenttracks["recenttracks"];
          let recenttracksattr = recenttracks["@attr"]
          recenttracks = recenttracks["track"];
          let total_pages = recenttracksattr.totalPages
          for (let i in recenttracks) {
            let trackcheck = recenttracks[i].name
            if (trackcheck.toLowerCase() == track_name.toLowerCase()){
              track_album = recenttracks[i].album["#text"]
              track_image = recenttracks[i].image[2]["#text"];
              // console.log(track_image)
              if (recenttracks[i]["@attr"] !== null){
                track_last_played = recenttracks[i].date["#text"]
                track_last_played = track_last_played.split(",")
                track_last_played = track_last_played[0]
              } else{
                track_last_played = "Currently Playing";
              }
              break
            } 
            
  
  
            //if track is not found on page 1
            else if (i == page*199){
              stop = false
              for (let i = 2; i < total_pages; i++) {
                page = i
                recenttracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=${200}&page=${page}&format=json`)
                recenttracks = await recenttracks.json();
                recenttracks = recenttracks["recenttracks"];
                recenttracksattr = recenttracks["@attr"]
                recenttracks = recenttracks["track"];
                // console.log(recenttracks)
                for (let c in recenttracks) {
                  trackcheck = recenttracks[c].name
                  // console.log(trackcheck, track_name, c)
                  if (trackcheck.toLowerCase() == track_name.toLowerCase()){
                  // console.log("hey")
                  track_album = recenttracks[c].album["#text"]
                  track_image = recenttracks[c].image[2]["#text"];
                  // console.log(track_album, track_image)
                  stop = true;
                  track_last_played = recenttracks[c].date["#text"]
                  // console.log(track_last_played)
                  track_last_played = track_last_played.split(",")
                  track_last_played = track_last_played[0]
                  let geniusapi = await fetch(`https://api.genius.com/search?q=${track_name.name}&access_token=JKrnckDfcL0OfjTNXTSd42KU5ccoFScFRc2pz94PVPaf9aaLchyQA3VU4TidiSp2`)
                  geniusapi = await geniusapi.json()
                  genius_title = geniusapi.response.hits[0].result.title
                  genius_url = `/${genius_artist_name}-${genius_track_name}-lyrics`
                  buttonbuilder()
                  console.log("command took",time.toFixed(1),"s to execute")
                  // console.log(toptrack_rank, track_image)
                  if (layout == "compact"){
                  return {
                    result: {
                      type: "rich",
                      author: {
                        name: `${track_name}`,
                        url: track_url
                      },
                      title: `by ${artist_name}`,
                      description: `on ${track_album}\n#${toptrack_rank} out of ${total_tracks} songs`,
                      color:13580354,
                      footer: {
                        text: `${track_loved}${track_user_plays} Plays | ${track_total_plays} Total Plays${track_play_percent}${track_play_time}`,
                      },
                      provider: {
                        name: `${track_last_played}`,
                      },
                      color:13580394,
                      thumbnail: { url: track_image, height: thumbnail_size, width: thumbnail_size },
                      image: {url: track_image, height: image_size, width: image_size},
                    },
                  };
                } else if (layout == "cozy"){
                  return{
                    result: {
                      type: "rich",
                      provider: {
                        name: `${track_last_played}`,
                      },
                      color:13580394,
                      fields:[{
                        name: `Song`,
                        value:`[${track_name}](${track_url})`,
                        inline:false
                      },
                      {
                        name: `Album`,
                        value:`${track_album}`,
                        inline:true
                      },
                      {
                        name: `Artist`,
                        value:`[${artist_name}](${artist_url})`,
                        inline:false
                      },
                      {
                        value: `#${toptrack_rank} out of ${total_tracks} songs`,
                        inline: true
                      }
                    ],
                      thumbnail: { url: track_image, height: thumbnail_size, width: thumbnail_size },
                      image: {url: track_image, height: image_size, width: image_size},
                      footer: {
                        text: `${track_loved}${track_user_plays} Plays | ${track_total_plays} Total Plays${track_play_percent}${track_play_time}`,
                      },
                    },
                  }
                }
              }
                if (stop == true){
                  // page = 1;
                  break
                }}
              }
              if (stop == true){
                // page = 1
                break
              }}
            }
            }
            let geniusapi = await fetch(`https://api.genius.com/search?q=${track_name.name}&access_token=JKrnckDfcL0OfjTNXTSd42KU5ccoFScFRc2pz94PVPaf9aaLchyQA3VU4TidiSp2`)
            geniusapi = await geniusapi.json()
            genius_title = geniusapi.response.hits[0].result.title
            genius_url = `/${genius_artist_name}-${genius_track_name}-lyrics`
            buttonbuilder()
            //return embed
            console.log("command took",time.toFixed(1),"s to execute")
            // console.log(track_name, track_image)
            if (track_image !== undefined){
              if (layout == "compact"){
                return {
                  result: {
                    type: "rich",
                    author: {
                      name: `${track_name}`,
                      url: track_url
                    },
                    title: `by ${artist_name}`,
                    description: `on ${track_album}\n#${toptrack_rank} out of ${total_tracks} songs`,
                    color:13580394,
                    footer: {
                      text: `${track_loved}${track_user_plays} Plays | ${track_total_plays} Total Plays${track_play_percent}${track_play_time}`,
                    },
                    provider: {
                      name: `${track_last_played}`,
                    },
                    color:13580394,
                    thumbnail: { url: track_image, height: thumbnail_size, width: thumbnail_size },
                    image: {url: track_image, height: image_size, width: image_size},
                  },
                };
              } else if (layout == "cozy"){
                return{
                  result: {
                    type: "rich",
                    provider: {
                      name: `${track_last_played}`,
                    },
                    color:13580394,
                    fields:[{
                      name: `Song`,
                      value:`[${track_name}](${track_url})`,
                      inline:false
                    },
                    {
                      name: `Album`,
                      value:`${track_album}`,
                      inline:true
                    },
                    {
                      name: `Artist`,
                      value:`[${artist_name}](${artist_url})`,
                      inline:false
                    },
                    {
                      value: `#${toptrack_rank} out of ${total_tracks} songs`,
                      inline: true
                    }
                  ],
                    thumbnail: { url: track_image, height: thumbnail_size, width: thumbnail_size },
                    image: {url: track_image, height: image_size, width: image_size},
                    footer: {
                      text: `${track_loved}${track_user_plays} Plays | ${track_total_plays} Total Plays${track_play_percent}${track_play_time}`,
                    },
                  },
                }
              }
            }else{
              return {
                result: {
                type: "rich",
                    provider: {
                      name: `${track_last_played}`,
                    },
                author: {
                  name: `${track_name}`,
                  url: track_url
                },
                title: `by ${artist_name}`,
                url: artist_url,
                // description: `(run .FastTrackInfo for unheard tracks)`,
                color:13580354,
                // image:{url:"https://cdn.discordapp.com/avatars/678541597654253600/4cb2b0c198e7d3c1cf213b477a820a0c.png", height: 100, width: 100},
                footer: {
                  text: `${track_loved}${track_user_plays} Plays | ${track_total_plays} Total Plays${track_play_percent}${track_play_time}`,
                },
                fields:[{
                  value:`${username} hasn't heard this track`,
                  inline:false
                }]
              },
            }
            }
      }
}
  

  module.exports = { TrackInfo }