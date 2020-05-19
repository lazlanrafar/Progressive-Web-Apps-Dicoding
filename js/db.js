function databasePromise(idb){
    var dbPromise = idb.open("lar-football", 1, function(upgradeDb) {
        var matchesObjectStore = upgradeDb.createObjectStore("pertandingan", {
            keyPath: "id"
        });
        matchesObjectStore.createIndex("timKandang", "match.homeTeam.name", {
            unique: false
        });
        matchesObjectStore.createIndex("timTandang", "match.awayTeam.name", {
            unique: false
        });
    });
    return dbPromise;
}
  
function saveForLater(data) {
    var storeName = "pertandingan";
    var dataToCreate = {
            id: data.match.id,
            head2head: {
                numberOfMatches: data.head2head.numberOfMatches,
                totalGoals: data.head2head.totalGoals,
                homeTeam: {
                    wins: data.head2head.homeTeam.wins,
                    draws: data.head2head.homeTeam.draws,
                    losses: data.head2head.homeTeam.losses
                },
                awayTeam: {
                    wins: data.head2head.awayTeam.wins,
                    draws: data.head2head.awayTeam.draws,
                    losses: data.head2head.awayTeam.losses
                }
            },
            match: {
                utcDate: data.match.utcDate,
                venue: data.match.venue,
                matchday: data.match.matchday,
                homeTeam: {
                    name: data.match.homeTeam.name
                },
                awayTeam: {
                    name: data.match.awayTeam.name
                }
            }
        }
    console.log("data " + dataToCreate);
    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, "readwrite");
        tx.objectStore(storeName).put(dataToCreate);
  
        return tx.complete;
    }).then(function() {
            console.log("Match berhasil di simpan.");
        });
}
  
function cekData(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve("data favorit")
                } else {
                    reject("bukan data favorit")
                }
            });
    });
}
  
function deleteDatafav(storeName, data) {
    databasePromise(idb).then(function (db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        console.log("deleteDataPlayerfav: cek id= " + data);
        store.delete(data);
        return tx.complete;
    }).then(function () {
        console.log('Item deleted');
        document.getElementById("iconFav").innerHTML = "favorite_border";
        M.toast({
            html: 'Data berhasil dihapus dari favorit!'
        });
    }).catch(function () {
        M.toast({
            html: 'terjadi kesalahan'
        });
    });
}
  
function getDataById(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}
  
function getAllData() {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction("pertandingan", "readonly");
                var store = tx.objectStore("pertandingan");
                return store.getAll();
            })
            .then(function (data) {
                resultMatchSaved(data);
            });
    });
}
  
function getSavedDataById(dataType) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));
  
    getDataById("pertandingan", idParam).then(function (match) {
        resultDetailMatchJSON(match);
    });
}
  
  