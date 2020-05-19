const api_token = '7d7beab94ccd41b0829e484e500677fd';
const kode_liga = 2021; //id liga inggris

const base_url = "https://api.football-data.org/v2/";
const endpoint_klasemen = `${base_url}competitions/${kode_liga}/standings?standingType=TOTAL`;
const endpoint_pertandingan_upcoming = `${base_url}competitions/${kode_liga}/matches?status=FINISHED`;
const endpoint_pertandingan_detail = `${base_url}matches/`;

const fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_token
        }
    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    }else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}
  
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}
  
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

function getKlasement(){
    if('caches' in window){
        caches.match(endpoint_klasemen).then(function(response){
            if(response){
                response.json().then(function(data){
                    resultKlasemen(data);
                    console.dir("getKlasemen" + data);
                });
            }
        });
    }

    fetchApi(endpoint_klasemen)
        .then(status)
        .then(json)
        .then(function(data){
            console.log(data)
            //mengirim data ke /js/klasemen.js
            resultKlasemen(data)
        }).catch(error);
}

function getMatch(){
    return new Promise(function (resolve, reject){

        if ('caches' in window) {
            caches.match(endpoint_pertandingan_upcoming).then(function (response) {
              if (response) {
                response.json().then(function (data) {
                    resultMatch(data);
                    resolve(data);
                });
              }
            });
        }

        fetchApi(endpoint_pertandingan_upcoming)
            .then(status)
            .then(json)
            .then(function(data){
                resultMatch(data);
                resolve(data);
            }).catch(error);
    });
}

function getMatchById(){
    return new Promise(function (resolve, reject){
        //ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if('caches' in window){
            caches.match(endpoint_pertandingan_detail + idParam).then(function(response){
                if(response){
                    response.json().then(function(data){
                        resultDetailMatchJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_pertandingan_detail + idParam)
            .then(status)
            .then(json)
            .then(function (data){
                resultDetailMatchJSON(data);
                resolve(data);
            }).catch(error);
    });
}