/*jslint browser: true*/
/*global $, jQuery, alert*/

var FantasyStats = {};

FantasyStats.collect = function () {
    "use strict";
    var playerRow = jQuery(".pncPlayerRow"),
        players   = [],
        realRows  = function () {

            playerRow.each(function () {
                if (jQuery(this).eq(0).children().eq(7).text() !== "--") {
                    players.push(this);
                }
            });

            return players;

        };

    return realRows();

};


FantasyStats.getStats = function () {
    var totalPoints = totalRebounds = totalSteals = totalAssists =
        totalThrees = totalBlocks = totalMinutes = 0;

    var fgAttempt = fgMade = ftAttempt = ftMade = 0;
        
    var playerArray = FantasyStats.collect();
    
    jQuery.each(playerArray, function () {
      totalPoints   += parseFloat(jQuery(this).find("td").eq(-5).text());
      totalBlocks   += parseFloat(jQuery(this).find("td").eq(-6).text());
      totalSteals   += parseFloat(jQuery(this).find("td").eq(-7).text());
      totalAssists  += parseFloat(jQuery(this).find("td").eq(-8).text());
      totalRebounds += parseFloat(jQuery(this).find("td").eq(-9).text());
      totalThrees   += parseFloat(jQuery(this).find("td").eq(-10).text());
      totalMinutes  += parseFloat(jQuery(this).find("td").eq(-15).text());
      
      //alert(jQuery(this).find("td").eq(-14).text());
      fgAttempt += FantasyStats.parseAttempts(jQuery(this).find("td").eq(-14).text());
      fgMade += FantasyStats.parseMade(jQuery(this).find("td").eq(-14).text());
      ftAttempt += FantasyStats.parseAttempts(jQuery(this).find("td").eq(-12).text());
      ftMade += FantasyStats.parseMade(jQuery(this).find("td").eq(-12).text());
    });
    
    alert(totalPoints.toFixed(1) + " points\n" +
           totalBlocks.toFixed(1) + " blocks\n" +
           totalSteals.toFixed(1) + " steals\n" +
           totalAssists.toFixed(1) + " assists\n" +
           totalRebounds.toFixed(1) + " rebounds\n" +
           totalThrees.toFixed(1) + " threes\n" +
           FantasyStats.getPercentage(fgMade, fgAttempt) + " fg %\n" +
           FantasyStats.getPercentage(ftMade, ftAttempt) + " ft %\n" +
           totalMinutes.toFixed(1) + " minutes");

}

FantasyStats.parseAttempts = function (fraction) {
  return parseFloat(fraction.split("/")[1]);
}

FantasyStats.parseMade = function (fraction) {
  return parseFloat(fraction.split("/")[0]);
}

FantasyStats.getPercentage = function (made, attempted) {
  return ((made / attempted) * 100).toFixed(3);
}

FantasyStats.getStats()
