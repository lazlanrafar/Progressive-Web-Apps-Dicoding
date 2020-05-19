function resultKlasemen(data){
    var tabelKlasemen = ''
    data.standings.forEach(function (klasemen) {
        var dataKlasemen = ''
    
        klasemen.table.forEach(function (club) {
          club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));
            
            dataKlasemen += `
            <ul class="collection">
                <li class="collection-item avatar">
                    <img src="${club.team.crestUrl}" alt="" class="circle">
                    <span class="title">${club.team.name}</span><br>
                    <p>Peringkat : ${club.position}</p>
                    <table>
                        <thead>
                            <tr>
                                <th class="center-align">Play</th>
                                <th class="center-align">Won</th>
                                <th class="center-align">Draw</th>
                                <th class="center-align">Lost</th>
                                <th class="center-align">GF</th>
                                <th class="center-align">Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="center-align">${club.playedGames}</td>
                                <td class="center-align">${club.won}</td>
                                <td class="center-align">${club.draw}</td>
                                <td class="center-align">${club.lost}</td>
                                <td class="center-align">${club.goalsFor}</td>
                                <td class="center-align">${club.points}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            `
        })
        tabelKlasemen += dataKlasemen
    });

    document.getElementById("data-klasement").innerHTML = tabelKlasemen;
}