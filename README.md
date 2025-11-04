# Urheilija II

JavaScript-palvelinsovellus, joka tarjoaa REST-rajapinnan kautta tiedon urheilijoista.

Olen suunnitellut ja toteuttanut express.js-kirjaston avulla REST-rajapinnan, jossa on CRUD-toiminnot mariadb-tietokantaan.

sportsdb.sql on tietokannan luova skripti ja kayttaja.sql-skriptissä on käyttäjän luominen ja käyttöoikeudet tietokantaan.

Sovelluksen backend löytyy server-kansiosta ja frontend on athletes-frontend -kansiossa.

Frontendin olen toteuttanut Reactilla. Arkkitehtuurina käytin ContextAPI:ia sovellettuna funktionaalisiin komponentteihin.
