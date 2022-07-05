from web3 import Web3, HTTPProvider

#Replace with your Alchemy API key:
apiKey = "nDOH1SHTshYg3AN0BbRMu8UMi5nDE3-K"

# Initialize a Web3.py instance
w3 = Web3(Web3.HTTPProvider('https://eth-goerli.g.alchemy.com/v2/'+apiKey))

# Query the blockchain (replace example parameters)
balance = w3.eth.get_balance("0xE169e837EF942C0C3da61A62C79E4090441D4c33") 

# Print the output to console
print(balance)