# bitgo-sa

This is an example application which reads streaming data from the twitter API and then compares the sentiment of the tweets in time series graphs

## Getting Started

The basic requirements are Node.js installed. It was originally developed using node v10.15.3 but anything v6 or newer _should_ work

### Installing

```
npm install
```

## Running the application

To run the application in production mode, there is the following command:

```
npm run server
```

To run the application in debug mode, use:

```
npm run server:debug
```

## Running the tests

There are rudimentary tests for the client and server. There are options to run just the client, the server, or all the tests

```
npm run test:client
npm run test:server
npm test
```

## Coding Convention

I took the liberty of using the coding convention I am familiar with. The configuration options use snake case which lines up with the twitter API. However, in the code I opt to use camelCase which I feel follows JavaScript convention.

I used the default settings for `prettier` (except for the use of single quotes) in order to simplify the style of my code.

Additionally, I leverage the `debug` module which enables me to conditionally turn on/off debugging based upon an environment variable.

## Configuration

There is currently a config.js file that stores constants and other configuration options. There is an `update_interval` value that allows the user to batch updates sent to the client. If the value is unset (or not present), then the updates will occur in real-time with no batching.

## Architectural Overview

I lack the time/ability to use ASCII to draw out the architecture, so I'll do my best to describe it in words.

### Server

The server is a single endpoint API which will load the React bundle. There is also an exposed websocket endpoint which is used to stream the updates from the server to the client. Upon startup, two ports are opened, an http port to serve the bundle and a websocket port to handle websocket communication. Immediately upon start-up we start stream and processing tweets and sending that to the client.

There are really two main files that are used to stream and process the incoming tweets.

#### TweetStream

`TweetStream` is an event emitter and will subscribe to the twitter API and will emit an event every `update_interval`. It stores the updates as an object in order to quickly add additional updates if multiple updates arrive during the `update_interval`. An array of objects will be emitted with the object type being:

```
{
  time: Date,
  key: string,
  count: number,
  score: number
}
```

Currently the count is not used, but future work could be done to display this information.

#### TweetProcessing

`TweetProcessing` is a set of stand-alone functions used to extract the full-text and to figure out which keyword is relevant for the tweet.

### Client

There are a number of components that were written for the client. There is a container which manages state and the updates coming from the server. The remaining components are presentation components responsible for displaying the data.

#### AppContainer

`AppContainer` is a container component responsible for opening up the websocket connection to the server and processing the updates. It uses the `useReducer` React hook to manage state.

#### TweetReducer

`TweetReducer` is a reusable reducer which effectively will append new updates to the component state. The state is indexed by keyword and each entry into the object contains an array of time/score tuples.

#### App

`App` is the top-level presentational component. Its main responsibility is to set up the layout and render the different graphs.

#### Graph

`Graph` is another presentation component that simply will take data in data and display a graph
