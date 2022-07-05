# Digital Wave Technical Test
This is a sample blockchain contract for a technical test 

In this ReadMe file I will be answering the questions asked in the PDF shared with me 

1)

*  I will storing the message on the creation of the smart contract on the blockchain directly. We are able to add whatever field we want inside of the contract that we are creating (here I am saving the message and the creator). In this case we don't need to query our database to save the data. The blockchain is directly responsible for that so that we have one source of truth. 

- We are able to update the existing message, the only problem is that it takes some time to update on the blockchain. Thats why we are not going to make it on the main thread, rather create a separate thread and return 200 OK for the sender. 

2. 
- A typical solution for accessing off chain data is with Ethereum Oracles https://ethereum.org/en/developers/docs/oracles/#:~:text=Oracles%20are%20data%20feeds%20that,settle%20payments%20based%20on%20events. The problem that accessing off chain data projects is (quoting from link mentioned above): 
> "As we mentioned, Ethereum transactions cannot access off-chain data directly. At the same time, relying on a single source of truth to provide data is insecure and invalidates the decentralization of a smart contract. This is known as the oracle problem." 

3. 
- No question here to answer, but I want to mention that I was originally fetching the external data through my **server.js** file. Basically fetching the data when creating a smart contract from the external API and then feeding the blockchain with the data fetched. Later stage I discovered that Ethereum Oracles can solve this problem, so I created an Oracle contract and I replaced the fetching with the external API there. 

4. 
- Mainly we use unit, integration, or e2e tests depending on the scope of the test. Optimally we should have all 3 tests set for each additional feature we have. For smart contracts its a bit more complicated, thats why there is http://getwaffle.io and https://github.com/sc-forks/solidity-coverage that can help us cover and check if that the smart contract is acting the way it should. 
- I have noticed that we can use **remix** to actually test our smart contracts. I am still not sure if this actually makes sense, but quite sure we have alternatives. 

5. 
- There's a lot of thing to consider to make sure this project have no security risks. First of all we have to add authentication/authorization for the REST api endpoints. Second, the env variables (that contains the keys for the project) are currently saved on local, not on github for sure. We have to make sure we are not leaking any of those keys so we have to save them somewhere safe when we deploy. We also might have implementation risks, meaning that our smart contract is implemented in a way that can be exploited and used in an unintended behaviour. 







