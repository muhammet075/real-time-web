# CryptoAbi

## Description
CryptoAbi voor het real-time-web project is een mobiele applicatie waarbij de gebruiker de huidige informatie van crypto coins kan inzien. Zoals de huidige prijs, market cap & laatste update. De gebruiker kan de chat rooms joinen en chatten met andere gebruikers. Per specifieke coin wordt er een chat room aangemaakt. Bij de chatrooms is er geen limiet met een maximaal aantal users, Multi-user support.
<br/><br/>

## Live Demo Heroku 🚀
<a href="https://realtimeweb-cmd.herokuapp.com/">https://realtimeweb-cmd.herokuapp.com/</a>
<br/><br/>

## Concept schetsen
Voor het project real-time-web heb ik 10 schetsen gemaakt om een app te ontwikkelen.
<img src="https://i.ibb.co/mSc2kQ9/schetsen1.jpg" alt="schets" width="400px">
<img src="https://i.ibb.co/2sLz5HK/schetsen2.jpg" alt="schets" width="400px">
1. Crypto app met een realtime chatroom
2. Crypto app met realtime grafieken
3. Crypto app met meerdere realtime chatrooms
4. Sport app met realtime uitslagen
5. Valuta app met realtime grafieken
6. Realtime chat app
7. Realtime tekenen app
8. Video app met realtime process bars
9. Nieuws app met realtime paginas
10. Realtime boter-kaas-en-eieren app
<br/><br/>

## 3x Concept wireflows
1. Crypto app met een realtime chatroom
<img src="https://i.ibb.co/M7zw3S9/schetsapp1.png" alt="wireflow" width="400px">
<br/>
2. Crypto app met realtime grafieken
<img src="https://i.ibb.co/T1Qz3CP/schetsapp2.png" alt="wireflow" width="300px">
<br/>
3. Realtime tekenen app
<img src="https://i.ibb.co/tMXQy7r/schetsapp3.png" alt="wireflow" width="300px">
<br/><br/>

## MoSCoW tabel
### Must have
* Chatroom ✅
* Data renderen van uit de API ✅

### Should have
* Meerdere chatrooms maken ✅  
* Data uit de API designen ✅
* Prive chatrooms

### Could have
* Tekstballonnen in de chatroom van links naar rechts laten gaan
* Aantal online gebruikers laten zien die in de chatrooms zijn

### Would like to have
* Realtime crypto grafieken
<br/><br/>

## Data sets
<img src="https://static.coingecko.com/s/coingecko-logo-63f24b60e1d2d526c141fee733ad2a39fbce7dabedd187a0dba95220396ce9a0.png" alt="coingecko" width="200px">
Voor dit project heb ik als external data source de opensource <a href="https://www.coingecko.com/en/api">Coingecko API</a> gebruikt. De data die ik meekrijg per specifieke coin zijn bijvoorbeeld de prijzen, symbolen, iconen, updates etc. Die worden op de homepagina weergegeven. Voor de chatrooms met socket.io wordt ook data gebruikt.
<br/><br/>
De Data van de coins wordt geloopt in de index pagina. Daar ziet de gebruiker aparte container blokken van elke specifieke coin en de gebruiker kan daar informatie over de coin lezen. Vervolgens stop ik alle data in de localstorage en de localstorage data haal ik op in de chatrooms pagina. Daar loop ik weer door alle data heen die in de localstorage zitten en vandaar maak ik aparte formulieren van om de chatrooms te joinen. Hierdoor zijn er meerdere chatrooms. Per chatroom zijn kunnen er users joinen zonder een limiet.

<br/><br/>
<img src="https://i.ibb.co/yq2D1mp/datamodel.png" alt="datamodel" width="500px">
<br/><br/>

## Data Cycle Diagram
### API Diagram
<img src="https://i.ibb.co/S3LWrDM/datacyclediagram2.png" alt="datacyclediagram" width="500px">
De Client doet eerst een get request voor de url / (dus naar de home pagina gaan). Vervolgens doet de server een api call bij de andere server waar de API zich bevindt. Vervolgens verstuurd de server de data van de API naar mijn NodeJS Server. Vervolgens verstuurt mijn NodeJS server de data naar de Client.
<br/>

### Real Time Events
<img src="https://i.ibb.co/y4DZ11s/datacyclediagram1.png" alt="datacyclediagram" width="700px">
Hierboven in de diagram voor de chatrooms met socket.io, zie je hoe de data wordt verstuurd van de server naar de client. Je ziet ook welke data modellen er worden gebruikt. 
<br/><br/>


## Features List
* Zoeken & Filteren
* Crypto gegevens bekijken
* Chatrooms joinen
* Chatten
<br/><br/>

## Dependencies
* NodeJS
* Express
* EJS
* Express-EJS-Layouts
* Socket.io
* Node-Fetch
* HTML, CSS & JS
* <a href="https://fontawesome.com/">Font Awesome</a>
* <a href="https://www.coingecko.com/en/api/documentation">Coingecko Crypto API</a>
* <a href="https://storyset.com/">Storyset Illustrations</a>
<br/>


## Installeren
1. Clone de repository<br/>
```
  git clone https://github.com/muhammet075/real-time-web
```

2. Navigeer naar het project<br/>
```
 cd real-time-web
```

3. Installeer NPM<br/>
```
  npm install
```

4. Start de app<br/>
```
  npm start
```
