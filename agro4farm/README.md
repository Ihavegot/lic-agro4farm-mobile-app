# Agro4Farm - React-native app for farmers

## Versions

- [Node v16.14.1](https://nodejs.org/en/)
- [React v17.0.1](https://reactjs.org)
- [React-native v0.64.3](https://reactnative.dev)
- [Expo 44.0.6](https://expo.dev)

#

## Functionalities

- [Weather forecast - Openweather API](https://openweathermap.org)
- [Expo location](https://docs.expo.dev/versions/latest/sdk/location/)
- [Navigation](https://reactnavigation.org)
- [UI Kitten](https://akveo.github.io/react-native-ui-kitten/)

#

## Project setup
 
In project folder, run command to install all dependencies:
```
npm install
```

In project folder, run command to start metro controller:
```
expo start
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

Restart the development server and instruct the bundlers to clear their caches
```
expo start --clear
```