const fs = require('fs');
const axios = require('axios');

const LASTFM_API_KEY = '5d56831696a358806660091aa5410a2f';
const LASTFM_USER = 'hellomikko';

axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json`)
.then(response => {
    const track = response.data.recenttracks.track[0];
    const content = fs.readFileSync('./README.md', 'utf8');
    const updated = content.replace(
        /<!-- RECENTLY_PLAYED:START -->([^<]*)<!-- RECENTLY_PLAYED:END -->/,
        `<!-- RECENTLY_PLAYED:START -->\n- Song: **${track.name}**\n- Artist: **${track.artist['#text']}**\n- Album: **${track.album['#text']}**\n<!-- RECENTLY_PLAYED:END -->`
    );
    fs.writeFileSync('./README.md', updated, 'utf8');
})
.catch(error => {
    console.log(error);
});
