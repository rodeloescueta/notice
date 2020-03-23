# qrph

## Project Setup
```
npm install
```

## Compiles and Hot-reloads for Development
```
nodemon --exec npm run start
```

## Deploy Code to AWS Server
```
npm run deploy
```

## API Headers
```
Key: x-api-key
Value: jvcJvWfyHceWpbL3gpl9eTepW57LRo7FUwoVKL20
```

## HTTP Requests / API Routes
```
Get: https://vq341jdhih.execute-api.us-east-2.amazonaws.com/prod/api/sample_get?userId=delo
```
```
Post: https://vq341jdhih.execute-api.us-east-2.amazonaws.com/prod/api/sample_post?userId=delo
```
```
Put: https://vq341jdhih.execute-api.us-east-2.amazonaws.com/prod/api/sample_put?userId=delo
```
```
Delete: https://vq341jdhih.execute-api.us-east-2.amazonaws.com/prod/api/sample_delete?userId=delo
```

## Local Project Setup
#### AWS Dynamodb Local
```
1. Download and Install: Java Runtime Environment (JRE)
2. Download and Extract: Dynamodb local @ https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
3. `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`
4. Access at http://localhost:8000/shell/
```

#### Create table
`npm run create-database`
