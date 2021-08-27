/* eslint-disable */
let note1 = "";
const { React } = require('powercord/webpack');
const { Category, SwitchItem, TextInput, RadioGroup, ColorPickerInput } = require('powercord/components/settings');
module.exports = class Settings extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = { opened: false };
      }
    render() {
        const { getSetting, toggleSetting, updateSetting } = this.props

        return (
            <div className="DiscordFmSettings">
                <TextInput 
                    defaultValue={getSetting("accountname", "")} 
                    onChange={(v) => {updateSetting("accountname", v)}}>
                    Last.fm Username
                </TextInput>
                <RadioGroup
                    onChange={(v) => {updateSetting('Layout', v.value) 
                    note1 = <span className="Restart">Restart Required</span>}}
                    value={getSetting('Layout', "compact")}
                    options={[
                    {
                        name: 'Compact',
                        desc: 'Compact Discord Embed',
                        value: "compact",
                    },
                    {
                        name: 'Cozy',
                        desc: 'Cozy Discord Embed',
                        value: "cozy",
                    }
                    ]}
                    note={note1}>
                    Layout
                </RadioGroup>
                <Category
                        name='Customize'
                        // description="Customize Your Embeds"
                        opened={this.state.opened}
                        onChange={() => this.setState({ opened: !this.state.opened })}
                        >
                    <SwitchItem
                        value={this.props.getSetting('BackgroundImage', false)}
                        onChange={() => {this.props.toggleSetting('BackgroundImage', false);}}
                        note="Have the album cover in the embed's background">
                        Image In Background
                    </SwitchItem>
                    <ColorPickerInput
                    default = {parseInt("d63c3c", 16)}
                    onChange={
                        (v) => {updateSetting("color", v)
                        document.body.style.cssText = `--accent-color: #${v.toString(16)}`;
                    }}
                    >
                        Accent Color
                    </ColorPickerInput>
                    <span className={"soon"}>More Customization Coming Soon!</span>
                </Category>
            </div>
        );
    }
};