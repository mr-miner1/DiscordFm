/* eslint-disable */
const { Plugin } = require("powercord/entities");
module.exports = class DiscordFm extends Plugin {
  async startPlugin() {
    const { TrackInfo } = require("./commands/TrackInfo");
    const { NowPlaying } = require("./commands/NowPlaying");
    const { RecentTracks } = require("./commands/RecentTracks");
    const { TopTracks } = require("./commands/TopTracks");
    const { TopAlbums } = require("./commands/TopAlbums");
    const { ArtistInfo } = require("./commands/ArtistInfo");
    const { Streak } = require("./commands/Streak");
    const Settings = require("./settings");
    const layout = powercord.pluginManager
      .get("DiscordFm")
      .settings.get("Layout");
    const color = powercord.pluginManager
      .get("DiscordFm")
      .settings.get("color");
    if (color !== undefined) {
      document.body.style.cssText = `--accent-color: #${color.toString(16)}`;
    } else {
      document.body.style.cssText = `--accent-color: #d63c3c`;
    }
    if (layout == "compact") {
      this.loadStylesheet("./styles/compact.scss");
    }
    if (layout == "cozy") {
      this.loadStylesheet("./styles/cozy.scss");
    }
    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: this.manifest.name,
      render: Settings,
    });
    powercord.api.commands.registerCommand({
      command: "NowPlaying",
      aliases: ["np"],
      description: "Information on the track you are currently playing (np)",
      usage: "{c} [optional:username]",
      executor: async (args) => {
        return NowPlaying(args);
      },
    }),
      powercord.api.commands.registerCommand({
        //todo: error handling
        command: "TrackInfo",
        aliases: ["ti"],
        description:
          "Get a BUTTLOAD of information on a track (ti)\n[can take upwards of 2mins if you've never heard the track or heard it months ago]",
        usage:
          "{c} [song - artist or no arguments for info on the track that is currently playing]",
        executor: (args) => {
          return TrackInfo(args);
        },
      }),
      powercord.api.commands.registerCommand({
        command: "RecentTracks",
        aliases: ["rt"],
        description: "get your recently played tracks",
        usage: "{c} [optional:pagenumber{'space'}username]",
        executor: async (args) => {
          return RecentTracks(args);
        },
      }),
      powercord.api.commands.registerCommand({
        command: "TopTracks",
        aliases: ["tt"],
        description: "Get your all time favorite tracks (tt)",
        usage: "{c} [optional:pagenumber{'space'}username]",
        executor: async (args) => {
          return TopTracks(args);
        },
      }),
      powercord.api.commands.registerCommand({
        command: "TopAlbums",
        aliases: ["tal"],
        description: "Get your top albums (tal)",
        usage: "{c} [optional:pagenumber{'space'}username]",
        executor: (args) => {
          return TopAlbums(args);
        },
      }),
      powercord.api.commands.registerCommand({
        command: "ArtistInfo",
        aliases: ["ai"],
        description: "Get information on a specified artist",
        usage: "{c} [optional:artist]",
        executor: (args) => {
          return ArtistInfo(args);
        },
      }),
      powercord.api.commands.registerCommand({
        command: "Streak",
        description: "Get song/album/artist streaks",
        usage: "{c} [optional:username]",
        executor: (args) => {
          return Streak(args);
        },
      });
  }
  pluginWillUnload() {
    for (const command of [
      `NowPlaying`,
      `TrackInfo`,
      `RecentTracks`,
      `TopTracks`,
      `TopAlbums`,
      `ArtistInfo`,
      `Streak`,
    ]) {
      powercord.api.commands.unregisterCommand(command);
    }
    powercord.api.settings.unregisterSettings(this.entityID);
  }
};
