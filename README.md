# Install project

### To run project use  npm run dev 

### Endponts
 ##### GET /artists - get artists list
 
 - response:  {result : all artists [] , message: string}
 
#####  POST /artists - add artist
 - req.body: {name : string, image: File | string | undefined, info: string}
 - response:  {result : IArtist , message: string}
 
##### GET /albums - get albums (you can send GET/albums?artistID and get all albums of this artist)
 - response:  {result : all albums [] , message: string}
 
##### POST /albums - add album
 - req.body: {artist : ARTIST ID , image: File | string | undefined, name: string, releaseYear: string}
 - response:  {result : IAlbum , message: string}

##### GET /albums/:id - get info aabout album by sending its ID as params
- response:  {result : album , message: string}
##### GET /tracks - get all Tracks (u can send a GET /tracks?albumID and get all tracks witch belongs to sended album)
- response:  {result : AllTracks , message: string}

##### POST /tracks - add track
 - req.body: {name : string, duration:  string, album: AlbumID}
 - response:  {result : track , message: string}

##### POST /users - register new user 
- req.body: {username : string, password:  string}
 - response:  {result : user , message: string}

##### POST /users/sessions - user login 
- req.body: {username : string, password:  string}
 - response:  {result : user , message: string} if username and password right

##### POST /track_history 
- req.body: {track_id : string}
- header - Authorization = token
-  response:  {result : user , message: string}



