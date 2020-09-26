
import axios from 'axios';
const querystring = require('querystring');

//only used to fill the player model
export async function post(data){
  console.log(data);
  const queryString = querystring.stringify({
    player_score : data.player_score,
    targets_appeared : data.targets_appeared,
    targets_hit : data.targets_hit
  })
  console.log(querystring);
  await axios.post(`http://localhost:8000/post-score/?player_score=${data.player_score}&targets_appeared=${data.targets_appeared}`)
  .catch(function (error){
    console.log(`Something went wrong - ${error}`);
  });
}
