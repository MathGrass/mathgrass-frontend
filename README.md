# MathGrass - Frontend
## Usage
Change the file *./config/serverConfig.ts* to make the prototype config suite your needs - see *Prototyping*.
Then, run ```npm install && npm run start ``` to resolve the dependencies and start the webpack dev server.

## State Management
As of now, the state of the whole application is managed in *./state/applicationState.tsx*.
Handle all requests to the server there.

## Prototyping
In the very next future, developers shall be able to instantiate the application with a constructor which accepts a config object.
For the prototyping phase, please adapt *./config/serverConfig.ts* before starting the dev server.

## License
This project is licensed under the MIT license. Please see [LICENSE](./LICENSE).