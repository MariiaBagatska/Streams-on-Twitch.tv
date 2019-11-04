$(document).ready(
    function () {
 
        var arrOfChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "RaidTheTomb"];
        var urlForApi = "https://wind-bow.glitch.me/twitch-api/streams/";
        var urlForChannel = "https://www.twitch.tv/";

    // creation of arrays for apis and urls
        var arrOfApi = []; 
        var arrOfLinksToChannels = [];
        for (var i = 0; i < arrOfChannels.length; i++) {
            arrOfApi.push(urlForApi + arrOfChannels[i]);
            arrOfLinksToChannels.push(urlForChannel + arrOfChannels[i]);
        }       

    // creation of parameters for functions
        for (var i = 0; i < arrOfApi.length; i++) {
            var api = arrOfApi[i];
            var index = i;
            createAjaxRequest(api, index);
        }
  
        function createAjaxRequest (api, index) {
            $.ajax (
                {
                    type: "GET",
                    url: api,
                    dataType: "jsonp",
                    success: function(responseData) { 
                        showChannels(responseData, index)
                    },// -function mediator to conduct index-parameter and responsedata from ajax
                    error: errorMessage,  
                }
            );
        }
   
        function showChannels(responseData, index) {
        //for online channels
            if (responseData.stream != null) {
                var logoOfChannel = responseData.stream.channel.logo;
                var channelName = responseData.stream.channel.display_name;
                var linkToChannel = responseData.stream.channel.url;
                var streamDescription = responseData.stream.channel.status; 
                $("#content-online").prepend("<p><img src=" + logoOfChannel + " alt='logotype'>" + "<b>" + "<a href=" + linkToChannel + " target='_blank'>" + channelName + "</a></b>" +  "<i> Online </i>"  + streamDescription + "</p>");
            }
            else {
                offlineChannels(index);
            }
        }
        
        function errorMessage () {
            document.alert("error");
        }
  
        function offlineChannels(index) {
            var channelName = arrOfChannels[index];
            var linkToChannel = arrOfLinksToChannels[index];
            var logoOfChannel = "https://farm5.staticflickr.com/4782/38877831640_1a8ecc6280_m.jpg";
            $("#content-offline").prepend("<p><img src=" + logoOfChannel + " alt='logotype'>" + "<a href=" + linkToChannel + " target='_blank'> " + channelName + "</a>" + "<i> Offline </i>" + "</p>");
        }
  
        // choose all/onile/offline channels
        $("#online").click(function(){$("#content-online").show();
        $("#content-offline").hide();});
        $("#offline").click(function(){$("#content-online").hide();
        $("#content-offline").show();});
        $("#all").click(function(){ $("#content-online").show();
        $("#content-offline").show();});  
    }
);