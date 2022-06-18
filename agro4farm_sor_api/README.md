# SOR API

SOR API is a simple REST API made using Next.JS and Prisma. It is used for Agro4Farm mobile application simple search engine functionality.

## API provides 3 types of search:

- Find by name
- Find by crop
- Find by disease/pest

## Example API call

Call:
```
localhost:3000/api/findName?name=azyl
```

Response
```
[{"id":1316,"nazwa":"Azyl 250 SC","nrzezw":"R-146/2017","terminzezw":"2022-12-31T00:00:00.000Z","termindosprzedazy":"2023-06-30T00:00:00.000Z","termindostosowania":"2024-06-30","rodzaj":"Fungicyd","substancja_czynna":"azoksystrobina - 250 g","uprawa":"pszenica ozima","agrofag":"mączniak prawdziwy, brunatna plamistość, rdza brunatna, septorioza paskowana liści, septorioza plew, fuzarioza kłosów","dawka":"Maksymalna /zalecana dawka dla jednorazowego zastosowania: 1,0 l/ha.","termin":"Środek należy stosować głównie zapobiegawczo lub natychmiast po zaobserwowaniu pierwszych objawów chorób, od początku fazy, gdy 1 kolanko jest co najmniej 1 cm nad węzłem krzewienia do końca fazy kwitnienia (BBCH 31-69).","nazwa_grupy":"ROŚLINY ROLNICZE","maloobszarowe":null,"zastosowanie":"profesjonalne"}, ...]
```

# Project setup
 
In project folder, run command to install all dependencies:
```
npm install
```

In project folder, run command to start app on localhost:
```
npm run dev
```

#

## Troubleshooting

In project folder, delete **node_modules** folder:
```
rm -r /node_modules
```

Then reinstall dependencies using:
```
npm install
```

Restart the development server:
```
npm run dev
```