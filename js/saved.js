function resultMatchSaved(data) {

    var dataMatchFavHtml = '';
    data.forEach(function (data) {
  
    dataMatchFavHtml += `
        <div class="col s12 m6 l6">
            <div class="card">
                <div class="card-content">

                    <h5 id="matchDay" class="center-align">Matchday: ${data.match.matchday}</h5>
                    <div id="kickOff" class="center-align">Kick Off: ${data.match.utcDate}</div>

                    <div class="row" style="margin:20px">
                        <div class="col s5 right-align truncate">
                            <span id="homeTeamName" class="blue-text text-darken-2">${data.match.homeTeam.name}</span>
                        </div>
                        <div class="col s2 center-align">
                            VS
                        </div>
                        <div class="col s5 left-align truncate">
                            <span id="awayTeamName" class="blue-text text-darken-2">${data.match.awayTeam.name}</span>
                        </div>
                    </div>

                    <div id="venue" class="center-align">${data.match.venue}</div>

                    <div class="row center">
                        <hr size="5px">
                        <h6 class="center-align">Head To Head </h6>
                        <div class="center-align" id="numberOfMatches">Number Of Matches: ${data.head2head.numberOfMatches}</div>
                        <div class="center-align" id="totalGoals">total Goals: ${data.head2head.totalGoals}</div>

                        <div class="col s4 right-align">
                            <span id="homeTeamWins" class="blue-text text-darken-2">${data.head2head.homeTeam.wins}</span>
                        </div>
                        <div class="col s4">WINS</div>
                            <div class="col s4 left-align">
                                <span id="awayTeamWins" class="blue-text text-darken-2">${data.head2head.awayTeam.wins}</span>
                            </div>

                        <div class="col s4 right-align">
                            <span id="homeTeamDraws" class="blue-text text-darken-2">${data.head2head.homeTeam.draws}</span>
                        </div>
                        <div class="col s4">DRAWS</div>
                            <div class="col s4 left-align">
                                <span id="awayTeamDraws" class="blue-text text-darken-2">${data.head2head.awayTeam.draws}</span>
                            </div>

                        <div class="col s4 right-align">
                            <span id="homeTeamLosses" class="blue-text text-darken-2">${data.head2head.homeTeam.losses}</span>
                        </div>
                        <div class="col s4">LOSSES</div>
                            <div class="col s4 left-align">
                                <span id="awayTeamLosses" class="blue-text text-darken-2">${data.head2head.awayTeam.losses}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `});
    document.getElementById("divFavorit").innerHTML = dataMatchFavHtml;
  }