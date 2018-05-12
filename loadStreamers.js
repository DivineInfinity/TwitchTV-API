let results = [];
let userUrl = "https://wind-bow.gomix.me/twitch-api/users/";
let streamUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
let channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/";
let streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let currentlyStreaming = [];


function loadStreams() {
  $('#streamers').html('');

  $loader = $("#loading");

  makeRequest(0);

}

function displayResults() {
  for (let i = 0; i < results.length; i++) {
    let bio = results[i].bio;
    let livestream = currentlyStreaming[i].stream;
    let profileLink = "https://www.twitch.tv/" + results[i].name;
    let channel = { status: "--" };
    if (bio == null || bio == "null")
      bio = "--";
    if (livestream == null || bio == "null")
      livestream = "Not streaming";
    else{
      channel = currentlyStreaming[i].channel;
    }
    $('#streamers')
      .append("<div class='container box mybox'><div><img src=" + results[i].logo + " height='100' width='100' /></div><a class='is-link' href=" + profileLink + " target='_blank'>" + results[i].display_name +
        "</a><p class='has-text-black is-primary'>" + results[i].bio + "</p><div><span> Streaming: " + livestream.game + " </span><span>Status: " + channel.status + "</span></div></div> ");
  }


}

function makeRequest(streamerIndex) {

  if (streamers.length == streamerIndex) {
    console.log("makeRequests Success", results);
    displayResults();
    return;
  }

  let streamer = streamers[streamerIndex];
  console.log(streamer);

  $.ajax({
    type: 'GET',
    url: userUrl + streamer + "?callback=?",
    async: false,
    dataType: 'json',
    success: function (data) {
      results.push(data);
      checkIfStreaming(streamer);
    },
    error: function (errorMessage) {
      results.push({});
      console.error("makeRequest Error", "user", errorMessage);
    },
    complete: function () {
      makeRequest(++streamerIndex);
    }
  });
}

function checkIfStreaming(streamer) {
  $.ajax({
    type: 'GET',
    url: streamUrl + streamer + "?callback=?",
    async: false,
    dataType: 'json',
    success: function (data) {
      currentlyStreaming.push(data);
    },
    error: function (errorMessage) {
      results.push({});
      console.error("streaming Error", "user", errorMessage);
    },
    complete: function () {
      return;
    }
  });
}
