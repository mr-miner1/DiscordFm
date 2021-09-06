/* eslint-disable */
// name
// artist url
// image
// playcounts (maybe listeners)
// 0th tag
// buttons for top artist tracks and top artist albums possibly?
const ArtistInfo = async (artist) => {
    const username = powercord.pluginManager.get("DiscordFm").settings.get("accountname")
    const layout = powercord.pluginManager.get("DiscordFm").settings.get("Layout")
    const bgimage = powercord.pluginManager.get("DiscordFm").settings.get("BackgroundImage")
    let artist_link;
    let artist_name;
    let artist_plays;
    let artist_total_plays;
    let artist_listeners;
    let artist_tags;
    let image_size;
    let thumbnail_size;
    let artist_id;
    let album_image;
    let errorcheck = 0;
    if (bgimage == false){
      image_size = 0
      thumbnail_size = 100
    }else{
      image_size = 100
      thumbnail_size = 0
    }
    const info = async () => {
        let infoapi = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&username=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&format=json`) 
        infoapi = await infoapi.json()
        if (infoapi.error == 6){ 
            errorcheck = 6;
        }else{
        infoapi = infoapi.artist
        artist_link = infoapi.url
        artist_image = infoapi.image[1]["#text"]
        artist_name = infoapi.name
        artist_plays = infoapi.stats.userplaycount
        artist_total_plays = infoapi.stats.playcount
        artist_listeners = infoapi.stats.listeners
        artist_tags = infoapi.tags.tag;
        let artist_tags_length = artist_tags.length
        artist_tags = Math.random()*artist_tags_length
        artist_tags = infoapi.tags.tag[artist_tags.toFixed(0)]
        }
    }
        const image = async () => {
            let topalbums = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=b37f440eb014ba5804a5ebf3027447ec&limit=30&format=json`)
            topalbums = await topalbums.json()
            album_image =  topalbums.topalbums.album[(Math.random()*29).toFixed(0)].image[2]["#text"]
    }
    if (artist[0] != undefined){
    artist = artist.join(" ")
    let infoapi = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&username=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&format=json`) 
    infoapi = await infoapi.json()
    await info()
    if (errorcheck == 0){
       await image()
       }
    } else{
        let recenttracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=b37f440eb014ba5804a5ebf3027447ec&format=json`);
        recenttracks = await recenttracks.json();
        recenttracks = recenttracks["recenttracks"].track;
        artist = recenttracks[0].artist["#text"]; 
        await info()
        await image()
    }
    if ( layout == "compact" && errorcheck == 0){
        return {
          result: {
            type: "rich",
            provider: {
              name: `Artist Info`,
            },
            title: `${artist_name}`,
            url: artist_link,
            description: `${artist_plays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Plays\n${artist_total_plays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Total Plays\n${artist_listeners.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Listeners`,
            color:13588394,
            thumbnail: { url: album_image, height: thumbnail_size, width: thumbnail_size },
            image: {url: album_image, height: image_size, width: image_size},
            footer: {
              text: `${artist_tags.name}`,
            }, 
          },
        }
    } else if (layout == "cozy" && errorcheck == 0){
        return{
            result: {
                type: "rich",
                provider: {
                    name: `Artist Info`,
                  },
                fields:[{
                  name: `Artist`,
                  value:`[${artist_name}](${artist_link})`,
                  inline:false
                },
                {
                  name: `${username}'s Plays`,
                  value:`${artist_plays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
                  inline:true
                },
                {
                  name: `Total Plays`,
                  value:`${artist_total_plays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
                  inline:false
                },
                {
                    name: `Listeners`,
                    value:`${artist_listeners.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
                    inline:false
                },
            ],
            color:13588394,
            thumbnail: { url: album_image, height: thumbnail_size, width: thumbnail_size },
            image: {url: album_image, height: image_size, width: image_size},
        },
    }
 } else if (errorcheck == 6){
        return{ 
            result: `**Invalid Artist Error!**\nthe artist entered was wrong\nplease check that your meant to enter "${artist}"\n||if you feel this is an bug please contact mr_miner#6969||`
        }
    }
}
// let time = 0;
// setInterval(() =>{time= time+=0.1},100)
// let sex = await fetch(`https://musicbrainz.org/ws/2/artist/4e4ebde4-0c56-4dec-844b-6c73adcdd92d?fmt=json&inc=url-rels`)
// sex = await sex.json()
// console.log(time, sex)
module.exports = { ArtistInfo } 